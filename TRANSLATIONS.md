# Translating Awaaz

Awaaz ships with a **translation merge CLI** (`scripts/merge-translation.ts`) that turns a simple markdown table into a live app language. No code editing required — translators only ever touch one markdown file per language.

All commands run from the repository root with [Bun](https://bun.sh):

```bash
bun scripts/merge-translation.ts <command>
```

## The workflow

```
--template ──▶ fill the "Translation" column ──▶ --check ──▶ --lang
(generate)      (translate in any editor)          (validate)   (merge into the app)
```

1. **Generate** a blank translation file:

   ```bash
   bun scripts/merge-translation.ts --template > my-translation.md
   ```

   The file contains every English string from `src/i18n/en.ts`, grouped by screen (`## Home: alerts`, `## Clinic: triage`, …). Optionally pre-fill the title with a known language: `--template --lang ur` → `# Awaaz translation file — Urdu`.

2. **Translate** — open the markdown file in any editor and fill the last column of each row:

   ```markdown
   | Key | English | Translation |
   | --- | --- | --- |
   | home.greeting | Hello, Imran | السلام علیکم، عمران |
   | home.alerts.count | {n} active near you | {n} فعال الرٹس آپ کے قریب |
   ```

   You can leave rows blank — see [partial translations](#partial-translations--english-fallback).

3. **Validate** (optional but recommended):

   ```bash
   bun scripts/merge-translation.ts --check my-translation.md
   ```

   Reports unknown keys, rows left blank, and keys missing from the file. Exits with code `0` when there are **no unknown keys**, `1` otherwise — safe to use in CI or scripts.

4. **Merge** into the app:

   ```bash
   bun scripts/merge-translation.ts --lang ur my-translation.md
   ```

   This writes `src/i18n/locales/ur.ts` (creating it if needed) and, for brand-new languages, registers the locale in `src/i18n/index.ts` automatically. The tool reports how many strings were merged, how many were skipped, and the completion percentage.

## Commands

| Command | What it does |
| --- | --- |
| `--template` | Print a blank translation template to stdout (redirect with `>` to save it). |
| `--template --lang <code>` | Same, with the language name in the title (if the code is registered). |
| `--list` | Table of all registered locales with `translated/total` key counts and completion %. |
| `--check <file.md>` | Validate a filled file — no writes. Exit `1` only when unknown keys exist. |
| `--lang <code> <file.md>` | Merge the file into `src/i18n/locales/<code>.ts`. |

### `--lang` options

```
bun scripts/merge-translation.ts --lang <code> <file.md> \
  [--label "Native name"] [--english "English name"] [--rtl]
```

- `--label` — the language name in its own script (shown in the language picker), e.g. `"اردو"`.
- `--english` — the English name of the language, e.g. `"Urdu"`.
- `--rtl` — marks the language as right-to-left (default is `ltr`).

`--label` and `--english` are **required for new languages**; if omitted the tool warns and falls back to the locale code itself.

## The markdown format

The template the tool generates is also exactly what the tool parses back — you can round-trip a file freely. Rules the parser follows (be tolerant when hand-editing):

- A row is any line starting with `|`. Header rows (`| Key | … |`) and separator rows (`| --- |`) are ignored.
- **Key** = first cell. **Translation = the last cell** on the row. (A fourth "notes" column in the middle is tolerated — the last cell still wins.)
- Blank cells, `-`, `—`, and `TODO` all mean "not translated" — the row is skipped at merge time.
- If a value contains a literal `|`, escape it as `\|`.
- The HTML comment at the top and `## …` section headings are for humans; they are ignored.
- Don't rename keys — they are stable IDs in `src/i18n/en.ts`. A key that no longer exists in `en.ts` is reported as **unknown** and skipped.

## Placeholders

Some strings contain `{placeholders}` such as `{n}`, `{name}`, `{district}` — the app fills them at runtime:

```markdown
| clinic.match.score | {n}% match | {n}% میچ |
```

**Keep every placeholder exactly as it appears in the English text.** `--check` warns about missing or unexpected placeholders. A missing `{n}` means the number silently disappears from the UI for that language.

## Partial translations & English fallback

A locale file does not need to be complete. At runtime any missing key falls back to the English master string in `src/i18n/en.ts`, so:

- Leave rows you are unsure about blank — you can merge more later.
- Merging is incremental: `--lang ur` **adds/updates** keys; existing translated keys are never removed unless they no longer exist in `en.ts` (such stale keys are reported and dropped).
- `--list` shows each locale's completion, so you can see what still needs work.

## Adding a brand-new language

```bash
bun scripts/merge-translation.ts --template > tamil.md
# … fill the Translation column …
bun scripts/merge-translation.ts --lang ta tamil.md --label "தமிழ்" --english "Tamil" --rtl
```

What the tool does:

1. Creates `src/i18n/locales/ta.ts` (`export const ta: Locale = { … }`) with keys in the same order and section grouping as `en.ts`.
2. Registers the language in `src/i18n/index.ts` — inserts the import line and a `LOCALES` array entry (`{ code: "ta", label: "தமிழ்", englishName: "Tamil", dir: "rtl", strings: ta }`) above the marker comment `// [merge-tool] register new locales above this line`.
3. If `index.ts` or the marker doesn't exist yet, it warns and tells you to register manually — the locale file is still written.

## Overriding the 8 shipped languages

Awaaz ships with ur, hi, bn, ar, ne, pa, sd, ps. They are normal locale files — the same merge command **overwrites matching keys** with your values while keeping everything else:

```bash
bun scripts/merge-translation.ts --lang ur my-corrections.md
```

Use it to correct, refine, or extend any shipped language at any time.

## Notes for maintainers

- The single source of truth is `src/i18n/en.ts`. Add new English strings there (with a `// ===== Section =====` comment for grouping); templates, validation, and locale file ordering all follow it automatically. Never rename a key once shipped.
- The merge tool is a pure data CLI — it imports only `en` from `src/i18n/en.ts` (no React/Next), so it is safe to run anywhere Bun runs.
- Locale files are written with `JSON.stringify`-escaped values, so quotes, pipes, and newlines in translations are always safe.
