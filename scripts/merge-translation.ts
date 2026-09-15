#!/usr/bin/env bun
/**
 * merge-translation.ts — Awaaz translation workflow CLI.
 *
 * Commands:
 *   --template [--lang <code>]      Print a blank translation template (markdown) to stdout.
 *   --list                          List registered locales + translation completion stats.
 *   --check <file.md>               Validate a filled translation file (no writes).
 *   --lang <code> <file.md>         Merge a filled translation file into
 *       [--label "Native"] [--english "English"] [--rtl]
 *                                   src/i18n/locales/<code>.ts — creates the file
 *                                   if needed and registers new languages in
 *                                   src/i18n/index.ts.
 *
 * Run with:  bun scripts/merge-translation.ts <command> ...
 *
 * This is a pure data tool: the only app import is `en` from src/i18n/en.ts
 * (plus node built-ins and dynamic imports of locale files). No React/Next.
 */

import { en } from "../src/i18n/en";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// ---------------------------------------------------------------------------
// Paths — resolved relative to this script, so the tool works from any cwd.
// ---------------------------------------------------------------------------

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(SCRIPT_DIR, "..");
const I18N_DIR = join(PROJECT_ROOT, "src", "i18n");
const EN_PATH = join(I18N_DIR, "en.ts");
const INDEX_PATH = join(I18N_DIR, "index.ts");
const LOCALES_DIR = join(I18N_DIR, "locales");

/** Marker inside src/i18n/index.ts where new locales get registered. */
const MARKER = "// [merge-tool] register new locales above this line";

const EN_KEYS = Object.keys(en); // insertion order == source order in en.ts
const EN_TOTAL = EN_KEYS.length;

/** key -> section name, from the `// ===== Section =====` comments in en.ts. */
const EN_SECTIONS = parseEnSections(readFileSync(EN_PATH, "utf8"));

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function rel(p: string): string {
  const r = relative(PROJECT_ROOT, p);
  return r && !r.startsWith("..") ? r : p;
}

/** `zh-CN` -> `zh_CN`, `ur` -> `ur` — a safe TS identifier for the locale export. */
function safeIdent(code: string): string {
  let ident = code.replace(/[^a-zA-Z0-9_]/g, "_");
  if (!ident || /^[0-9]/.test(ident)) ident = `_${ident}`;
  return ident;
}

/** Escape a string for use inside a double-quoted TS string literal. */
function escTs(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n");
}

/** Unescape a TS double-quoted string literal body. */
function unescTs(s: string): string {
  return s
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");
}

function die(msg: string, code = 1): never {
  console.error(`✗ ${msg}`);
  process.exit(code);
}

function info(msg: string): void {
  console.log(msg);
}

// ---------------------------------------------------------------------------
// en.ts source parsing (section comments + key order)
// ---------------------------------------------------------------------------

function parseEnSections(text: string): Map<string, string> {
  const sections = new Map<string, string>();
  let current = "";
  for (const line of text.split("\n")) {
    const sec = line.match(/^\s*\/\/\s*=+\s*(.*?)\s*=+\s*$/);
    if (sec) {
      current = sec[1].trim();
      continue;
    }
    const key = line.match(/^\s*"((?:[^"\\]|\\.)*)"\s*:/);
    if (key) sections.set(JSON.parse(`"${key[1]}"`), current);
  }
  return sections;
}

// ---------------------------------------------------------------------------
// Markdown parsing (template output AND filled-file input — round-trip)
// ---------------------------------------------------------------------------

/** Values that mean "not translated" in the Translation column. */
const EMPTY_MARKERS = new Set(["", "-", "—", "–", "todo"]);

function isUntranslated(v: string): boolean {
  return EMPTY_MARKERS.has(v.toLowerCase());
}

/** Escape a value for a markdown table cell. */
function mdEscape(s: string): string {
  return s.replace(/\|/g, "\\|").replace(/\r/g, " ").replace(/\n/g, " ");
}

/**
 * Split a markdown table row (`| a | b | c |`) into cells.
 * Handles `\|` escaped pipes inside cells.
 */
function splitTableRow(line: string): string[] {
  let s = line;
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|") && !s.endsWith("\\|")) s = s.slice(0, -1);
  const cells: string[] = [];
  let cur = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "\\" && s[i + 1] === "|") {
      cur += "|"; // unescape escaped pipe
      i++;
    } else if (s[i] === "|") {
      cells.push(cur);
      cur = "";
    } else {
      cur += s[i];
    }
  }
  cells.push(cur);
  return cells;
}

function isSeparatorRow(cells: string[]): boolean {
  return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c.trim()));
}

type ParsedMd = {
  /** key -> translation (rows that actually contain a translation) */
  translated: Record<string, string>;
  /** keys whose row exists but the Translation cell is blank / `-` / `—` / TODO */
  blank: string[];
  /** every key seen in a row, in file order (deduped) */
  allKeys: string[];
};

function parseTranslationMd(text: string): ParsedMd {
  const translated: Record<string, string> = {};
  const blank: string[] = [];
  const allKeys: string[] = [];
  const seen = new Set<string>();

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line.startsWith("|")) continue; // headings / comments / prose are ignored
    const cells = splitTableRow(line);
    if (cells.length < 2) continue;
    if (isSeparatorRow(cells)) continue; // | --- | --- | --- |

    const key = cells[0]
      .trim()
      .replace(/^`+/, "")
      .replace(/`+$/, "")
      .trim();
    if (!key || key.toLowerCase() === "key") continue; // header row: | Key | ... |

    if (!seen.has(key)) {
      seen.add(key);
      allKeys.push(key);
    }

    // Tolerate 3- and 4-column tables: the translation is ALWAYS the last cell.
    const value = cells[cells.length - 1].trim();
    if (isUntranslated(value)) {
      blank.push(key);
      continue;
    }
    translated[key] = value;
  }
  return { translated, blank, allKeys };
}

function readMdFile(mdPath: string): string {
  const abs = resolve(process.cwd(), mdPath);
  if (!existsSync(abs)) die(`File not found: ${mdPath}`);
  return readFileSync(abs, "utf8");
}

// ---------------------------------------------------------------------------
// Locale file parsing / rendering
// ---------------------------------------------------------------------------

/** Fallback parser: read `"key": "value"` pairs from a locale .ts file's text. */
function parseLocaleText(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let m = lines[i].match(/^\s*"((?:[^"\\]|\\.)*)"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,?\s*$/);
    if (m) {
      out[unescapeJson(m[1])] = unescapeJson(m[2]);
      continue;
    }
    m = lines[i].match(/^\s*"((?:[^"\\]|\\.)*)"\s*:\s*'([^']*)'\s*,?\s*$/);
    if (m) {
      out[unescapeJson(m[1])] = m[2];
      continue;
    }
    // value on the following line:  "key":\n    "value",
    m = lines[i].match(/^\s*"((?:[^"\\]|\\.)*)"\s*:\s*$/);
    if (m) {
      const key = unescapeJson(m[1]);
      const next = (lines[i + 1] ?? "").trim();
      const m2 = next.match(/^"((?:[^"\\]|\\.)*)"\s*,?\s*$/);
      if (m2) {
        out[key] = unescapeJson(m2[1]);
        i++;
      }
    }
  }
  return out;
}

function unescapeJson(s: string): string {
  try {
    return JSON.parse(`"${s}"`);
  } catch {
    return s;
  }
}

/**
 * Load an existing locale file. Prefers a dynamic import (robust to any valid
 * TS); falls back to text parsing. Refuses to silently wipe a file it cannot
 * read.
 */
async function loadExistingLocale(localePath: string, ident: string): Promise<Record<string, string>> {
  if (!existsSync(localePath)) return {};
  const text = readFileSync(localePath, "utf8");

  let obj: Record<string, string> | undefined;
  try {
    const mod = (await import(pathToFileURL(localePath).href)) as Record<string, unknown>;
    const names = Object.keys(mod).filter(
      (n) => mod[n] !== null && typeof mod[n] === "object" && !Array.isArray(mod[n]),
    );
    const name = names.includes(ident) ? ident : names[0];
    if (name) {
      obj = {};
      for (const [k, v] of Object.entries(mod[name] as Record<string, unknown>)) {
        if (typeof v === "string") obj[k] = v;
      }
    }
  } catch {
    // dynamic import failed (syntax error, missing dep, …) — fall back to text
  }

  if (!obj || Object.keys(obj).length === 0) {
    const parsed = parseLocaleText(text);
    if (Object.keys(parsed).length > 0) return parsed;
  }
  if ((!obj || Object.keys(obj).length === 0) && /"/.test(text)) {
    die(
      `Could not read any keys from existing locale file ${rel(localePath)} — refusing to overwrite it. Fix the file manually and re-run.`,
    );
  }
  return obj ?? {};
}

/** Render a locale .ts file: keys in en.ts order, same section comments, JSON-escaped values. */
function renderLocaleFile(
  code: string,
  englishName: string,
  sourceFileName: string,
  values: Record<string, string>,
): string {
  const L: string[] = [];
  L.push('import type { Locale } from "../en";');
  L.push("");
  L.push(`// ${englishName} (${code}) — merged from ${sourceFileName} at ${new Date().toISOString()}`);
  L.push(`export const ${safeIdent(code)}: Locale = {`);
  let section: string | null = null;
  for (const key of EN_KEYS) {
    if (!(key in values)) continue;
    const sec = EN_SECTIONS.get(key) ?? "";
    if (sec !== section) {
      if (section !== null) L.push("");
      if (sec) L.push(`  // ===== ${sec} =====`);
      section = sec;
    }
    L.push(`  ${JSON.stringify(key)}: ${JSON.stringify(values[key])},`);
  }
  L.push("};");
  L.push("");
  return L.join("\n");
}

// ---------------------------------------------------------------------------
// src/i18n/index.ts parsing + registration
// ---------------------------------------------------------------------------

type LocaleMeta = { code: string; label: string; englishName: string; dir: string };

/** Parse `{ code: "ur", label: "…", englishName: "…", dir: "rtl", … }` entries from index.ts text. */
function parseIndexEntries(text: string): LocaleMeta[] {
  const out: LocaleMeta[] = [];
  const blockRe = /\{[^{}]*\}/g;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(text))) {
    const block = m[0];
    const code = block.match(/\bcode\s*:\s*"([^"]+)"/);
    if (!code) continue; // not a locale entry (type shapes, callbacks, …)
    const label = block.match(/\blabel\s*:\s*"((?:\\.|[^"\\])*)"/);
    const english = block.match(/\benglishName\s*:\s*"((?:\\.|[^"\\])*)"/);
    const dir = block.match(/\bdir\s*:\s*"(ltr|rtl)"/);
    out.push({
      code: code[1],
      label: label ? unescTs(label[1]) : code[1],
      englishName: english ? unescTs(english[1]) : code[1],
      dir: dir ? dir[1] : "ltr",
    });
  }
  return out;
}

function readIndexEntries(): { exists: boolean; entries: LocaleMeta[] } {
  if (!existsSync(INDEX_PATH)) return { exists: false, entries: [] };
  return { exists: true, entries: parseIndexEntries(readFileSync(INDEX_PATH, "utf8")) };
}

type RegisterResult = "registered" | "already" | "skipped";

/**
 * Register a new locale in src/i18n/index.ts:
 *  - import line after the last existing import
 *  - LOCALES array entry directly above the marker comment
 * Tolerant: warns and skips if index.ts or the marker is missing.
 */
function registerInIndex(
  code: string,
  label: string,
  englishName: string,
  dir: "ltr" | "rtl",
): RegisterResult {
  if (!existsSync(INDEX_PATH)) {
    console.warn(
      `⚠ ${rel(INDEX_PATH)} not found — cannot register "${code}" automatically. Register it manually (import the locale and add it to LOCALES).`,
    );
    return "skipped";
  }
  const text = readFileSync(INDEX_PATH, "utf8");
  if (!text.split("\n").some((l) => l.trim() === MARKER)) {
    console.warn(
      `⚠ Marker line "${MARKER}" not found in ${rel(INDEX_PATH)} — cannot register "${code}" automatically. Register it manually.`,
    );
    return "skipped";
  }
  if (parseIndexEntries(text).some((e) => e.code === code)) return "already";

  const lines = text.split("\n");
  const ident = safeIdent(code);

  // 1. import line — after the last import statement
  const importLine = `import { ${ident} } from "./locales/${code}";`;
  let lastImport = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*import[\s(]/.test(lines[i])) lastImport = i;
  }
  if (lastImport >= 0) lines.splice(lastImport + 1, 0, importLine);
  else lines.unshift(importLine);

  // 2. LOCALES array entry — directly above the marker (last entry before `];`)
  const markerIdx = lines.findIndex((l) => l.trim() === MARKER);
  const entryLine = `  { code: "${code}", label: "${escTs(label)}", englishName: "${escTs(englishName)}", dir: "${dir}", strings: ${ident} },`;
  lines.splice(markerIdx, 0, entryLine);

  writeFileSync(INDEX_PATH, lines.join("\n"));
  return "registered";
}

// ---------------------------------------------------------------------------
// --template
// ---------------------------------------------------------------------------

function renderTemplate(languageName: string): string {
  const L: string[] = [];
  L.push(`# Awaaz translation file — ${languageName}`);
  L.push("");
  L.push("<!--");
  L.push("Awaaz translation workflow:");
  L.push('1. Translate: fill the "Translation" column for every row you want to merge.');
  L.push("2. Keep {placeholders} like {n} exactly as-is — they are filled by the app.");
  L.push("3. Leave a row blank to skip it (English fallback is used at runtime).");
  L.push("4. Merge: bun scripts/merge-translation.ts --lang <code> <this-file.md>");
  L.push('   For a NEW language also pass: --label "Native name" --english "English name" (--rtl for right-to-left).');
  L.push("Generated by scripts/merge-translation.ts — do not rename keys.");
  L.push("-->");
  L.push("");

  let section: string | null = null;
  for (const key of EN_KEYS) {
    const sec = EN_SECTIONS.get(key) ?? "";
    if (sec !== section) {
      if (section !== null) L.push("");
      L.push(`## ${sec || "Other strings"}`);
      L.push("");
      L.push("| Key | English | Translation |");
      L.push("| --- | --- | --- |");
      section = sec;
    }
    L.push(`| ${key} | ${mdEscape(en[key])} | |`);
  }
  return L.join("\n");
}

function cmdTemplate(langCode?: string): number {
  let name = "new language";
  if (langCode) {
    const { entries, exists } = readIndexEntries();
    const found = entries.find((e) => e.code === langCode);
    if (exists && found) name = found.englishName;
    else name = langCode;
  }
  process.stdout.write(renderTemplate(name) + "\n");
  return 0;
}

// ---------------------------------------------------------------------------
// --list
// ---------------------------------------------------------------------------

function countLocaleKeys(code: string): { count: number; file: string | null } {
  if (code === "en") return { count: EN_TOTAL, file: EN_PATH }; // English master lives in en.ts
  const file = join(LOCALES_DIR, `${code}.ts`);
  if (!existsSync(file)) return { count: 0, file: null };
  const matches = readFileSync(file, "utf8").match(/^\s*"([^"]+)"\s*:/gm) ?? [];
  return { count: matches.length, file };
}

function cmdList(): number {
  const { exists, entries } = readIndexEntries();

  info(`English master: ${EN_TOTAL} keys (${rel(EN_PATH)})`);
  if (!exists) {
    console.warn(`⚠ ${rel(INDEX_PATH)} not found — no locales are registered yet.`);
    console.warn(`  Add one with: bun scripts/merge-translation.ts --lang <code> <filled.md> --label "…" --english "…"`);
    return 0;
  }
  if (entries.length === 0) {
    console.warn(`⚠ No LOCALES entries found in ${rel(INDEX_PATH)}.`);
    return 0;
  }

  info(`Registered locales (${entries.length}) in ${rel(INDEX_PATH)}:`);
  info("");
  const w = { code: 8, name: 16, label: 22, dir: 5, done: 14 };
  info(
    `${"code".padEnd(w.code)}${"english name".padEnd(w.name)}${"native label".padEnd(w.label)}${"dir".padEnd(w.dir)}${"translated".padStart(w.done)}   %`,
  );
  for (const e of entries) {
    const { count, file } = countLocaleKeys(e.code);
    const pct = EN_TOTAL === 0 ? 0 : (count / EN_TOTAL) * 100;
    const note = file ? "" : "  (locale file missing — 0 keys)";
    info(
      `${e.code.padEnd(w.code)}${e.englishName.padEnd(w.name)}${e.label.padEnd(w.label)}${e.dir.padEnd(w.dir)}${`${count} / ${EN_TOTAL}`.padStart(w.done)}   ${pct.toFixed(1)}%${note}`,
    );
  }
  return 0;
}

// ---------------------------------------------------------------------------
// --check
// ---------------------------------------------------------------------------

function placeholdersOf(s: string): string[] {
  return s.match(/\{[^{}]+\}/g) ?? [];
}

function cmdCheck(mdPath: string): number {
  const text = readMdFile(mdPath);
  const { translated, blank, allKeys } = parseTranslationMd(text);

  const unknown = allKeys.filter((k) => !(k in en));
  const blankKnown = blank.filter((k) => k in en);
  const present = new Set(allKeys.filter((k) => k in en));
  const missing = EN_KEYS.filter((k) => !present.has(k));

  info(`Checked: ${mdPath}`);
  info(`English master: ${EN_TOTAL} keys · rows in file: ${allKeys.length} · translated: ${Object.keys(translated).length} · left blank: ${blank.length}`);
  info("");

  if (unknown.length > 0) {
    info(`✗ Unknown keys (${unknown.length}) — not in en.ts, they will be skipped on merge:`);
    for (const k of unknown.slice(0, 10)) info(`    ${k}`);
    if (unknown.length > 10) info(`    … and ${unknown.length - 10} more`);
  } else {
    info(`✓ No unknown keys.`);
  }

  if (blankKnown.length > 0) {
    info(`• Blank / — / TODO translations (${blankKnown.length}) — these rows are skipped (English fallback at runtime):`);
    for (const k of blankKnown.slice(0, 10)) info(`    ${k}`);
    if (blankKnown.length > 10) info(`    … and ${blankKnown.length - 10} more`);
  }

  if (missing.length > 0) {
    info(`• Missing keys (${missing.length}) — in en.ts but not in this file. Partial files are fine (English fallback).`);
    for (const k of missing.slice(0, 10)) info(`    ${k}`);
    if (missing.length > 10) info(`    … and ${missing.length - 10} more`);
  }

  // Placeholder sanity check (advisory only — does not affect the exit code).
  const phIssues: string[] = [];
  for (const [k, v] of Object.entries(translated)) {
    if (!(k in en)) continue;
    const missingPh = placeholdersOf(en[k]).filter((p) => !v.includes(p));
    const extraPh = placeholdersOf(v).filter((p) => !en[k].includes(p));
    if (missingPh.length > 0) phIssues.push(`${k}: missing ${missingPh.join(" ")}`);
    else if (extraPh.length > 0) phIssues.push(`${k}: unexpected ${extraPh.join(" ")}`);
  }
  if (phIssues.length > 0) {
    info(`• Placeholder mismatch (${phIssues.length}) — keep {placeholders} exactly as in the English text:`);
    for (const t of phIssues.slice(0, 10)) info(`    ${t}`);
    if (phIssues.length > 10) info(`    … and ${phIssues.length - 10} more`);
  }

  info("");
  if (unknown.length > 0) {
    info(`Result: FAIL — ${unknown.length} unknown key(s). Fix or remove them (only keys that exist in en.ts are mergeable).`);
    return 1;
  }
  info(`Result: OK — no unknown keys. (Blank/missing rows simply keep the English fallback.)`);
  return 0;
}

// ---------------------------------------------------------------------------
// --lang (merge)
// ---------------------------------------------------------------------------

async function cmdLang(
  code: string,
  mdPath: string,
  opts: { label?: string; english?: string; rtl: boolean },
): Promise<number> {
  if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(code)) {
    die(`Invalid locale code "${code}" — use short ASCII codes like "ur", "hi", "zh-CN".`, 2);
  }
  const mdText = readMdFile(mdPath);
  const { translated, allKeys } = parseTranslationMd(mdText);
  const localePath = join(LOCALES_DIR, `${code}.ts`);
  const ident = safeIdent(code);
  const dir = opts.rtl ? "rtl" : "ltr";

  // Registration state (from index.ts text)
  const { exists: indexExists, entries } = readIndexEntries();
  const registered = entries.find((e) => e.code === code);
  const englishName = opts.english ?? registered?.englishName ?? code;
  const label = opts.label ?? registered?.label ?? code;

  info(`Merging ${mdPath} → ${rel(localePath)}`);

  // Existing values (import the module; fall back to text parsing)
  const fileExisted = existsSync(localePath);
  const old = await loadExistingLocale(localePath, ident);
  if (fileExisted) info(`  Existing locale found — merging over ${Object.keys(old).length} existing string(s).`);

  // Merge: new values over old, in en.ts order; unknown keys are skipped.
  const final: Record<string, string> = {};
  let newCount = 0;
  let changedCount = 0;
  let unchangedCount = 0;
  for (const k of EN_KEYS) {
    if (k in translated) {
      if (!(k in old)) newCount++;
      else if (old[k] !== translated[k]) changedCount++;
      else unchangedCount++;
      final[k] = translated[k];
    } else if (k in old) {
      final[k] = old[k];
    }
  }
  const mergedCount = newCount + changedCount + unchangedCount;
  const unknown = allKeys.filter((k) => !(k in en));
  const stale = Object.keys(old).filter((k) => !(k in en));
  if (Object.keys(translated).length === 0 && Object.keys(old).length === 0) {
    console.warn(`  ⚠ No translated rows found in ${mdPath} — writing an empty locale.`);
  }

  // Write the locale file
  mkdirSync(LOCALES_DIR, { recursive: true });
  writeFileSync(localePath, renderLocaleFile(code, englishName, basename(mdPath), final));
  info(`✓ ${fileExisted ? "Updated" : "Created"} ${rel(localePath)} — ${Object.keys(final).length} string(s) total`);

  // Register in index.ts if needed
  if (!registered) {
    if (!opts.label) {
      console.warn(`⚠ --label not provided — using "${label}" as the native label in index.ts.`);
    }
    if (!opts.english) {
      console.warn(`⚠ --english not provided — using "${englishName}" as the English name.`);
    }
    const result = registerInIndex(code, label, englishName, dir);
    if (result === "registered") info(`✓ Registered "${code}" in ${rel(INDEX_PATH)} (import + LOCALES entry, dir: ${dir})`);
  }

  // Report
  info(`  Merged ${mergedCount} string(s): ${newCount} new, ${changedCount} changed, ${unchangedCount} unchanged.`);
  if (unknown.length > 0) {
    info(
      `  ⚠ Skipped ${unknown.length} unknown key(s) (not in en.ts): ${unknown.slice(0, 10).join(", ")}${unknown.length > 10 ? " …" : ""}`,
    );
  }
  if (stale.length > 0) {
    info(
      `  ⚠ Dropped ${stale.length} stale key(s) from the old locale (not in en.ts): ${stale.slice(0, 10).join(", ")}${stale.length > 10 ? " …" : ""}`,
    );
  }
  const done = Object.keys(final).length;
  const missingAfter = EN_TOTAL - done;
  if (missingAfter > 0) {
    info(`  ℹ ${missingAfter} key(s) still untranslated — English fallback is used at runtime (fine).`);
  }
  const pct = EN_TOTAL === 0 ? 100 : (done / EN_TOTAL) * 100;
  info(`  Completion: ${done}/${EN_TOTAL} (${pct.toFixed(1)}%)`);
  return 0;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function usage(): string {
  return [
    "Awaaz translation merge tool",
    "",
    "Usage:",
    "  bun scripts/merge-translation.ts --template [--lang <code>]   Print a blank translation template to stdout.",
    "  bun scripts/merge-translation.ts --list                       List registered locales + completion stats.",
    "  bun scripts/merge-translation.ts --check <filled.md>          Validate a filled file (exit 1 on unknown keys).",
    "  bun scripts/merge-translation.ts --lang <code> <filled.md> \\",
    '       [--label "Native name"] [--english "English name"] [--rtl]',
    "                                                                Merge translations into src/i18n/locales/<code>.ts",
    "                                                                (creates + registers new languages).",
    "",
    "Docs: TRANSLATIONS.md",
  ].join("\n");
}

type Args = {
  mode: string | null;
  positionals: string[];
  label?: string;
  english?: string;
  rtl: boolean;
  langCode?: string;
};

function parseArgs(argv: string[]): Args {
  const args: Args = { mode: null, positionals: [], rtl: false };
  let i = 0;
  while (i < argv.length) {
    const a = argv[i];
    if (a === "--template" || a === "--list" || a === "--check") {
      args.mode = a;
      i++;
    } else if (a === "--lang") {
      // `--template --lang <code>` names the template after a known language;
      // otherwise --lang selects merge mode.
      if (args.mode === "--template" && !args.langCode) {
        const v = argv[i + 1];
        if (v === undefined) die("Missing value for --lang", 2);
        args.langCode = v;
        i += 2;
      } else {
        args.mode = "--lang";
        i++;
      }
    } else if (a === "--label" || a === "--english") {
      const v = argv[i + 1];
      if (v === undefined) die(`Missing value for ${a}`, 2);
      if (a === "--label") args.label = v;
      else args.english = v;
      i += 2;
    } else if (a === "--rtl") {
      args.rtl = true;
      i++;
    } else if (a === "--help" || a === "-h") {
      console.log(usage());
      process.exit(0);
    } else if (a.startsWith("--")) {
      die(`Unknown option: ${a}\n\n${usage()}`, 2);
    } else {
      args.positionals.push(a);
      i++;
    }
  }
  return args;
}

async function main(): Promise<number> {
  const args = parseArgs(process.argv.slice(2));
  if (!args.mode) {
    console.log(usage());
    return args.positionals.length > 0 ? 2 : 0;
  }
  switch (args.mode) {
    case "--template": {
      const lang = args.positionals[0] ?? args.langCode;
      return cmdTemplate(lang);
    }
    case "--list":
      return cmdList();
    case "--check": {
      const file = args.positionals[0];
      if (!file) die(`--check needs a file: --check <filled.md>`, 2);
      return cmdCheck(file);
    }
    case "--lang": {
      const code = args.positionals[0];
      const file = args.positionals[1];
      if (!code || !file) {
        die(`--lang needs a locale code and a file: --lang <code> <filled.md>`, 2);
      }
      return cmdLang(code, file, { label: args.label, english: args.english, rtl: args.rtl });
    }
    default:
      die(`Unhandled mode ${args.mode}`, 2);
  }
}

main().then(
  (code) => {
    process.exitCode = code;
  },
  (err: Error) => {
    console.error(`✗ Unexpected error: ${err?.message ?? err}`);
    process.exitCode = 1;
  },
);
