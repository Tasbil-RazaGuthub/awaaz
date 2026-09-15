/**
 * Awaaz i18n runtime — locale registry + translation function.
 *
 * - Every string in the app resolves through `t(key, vars)`.
 * - Missing keys in a locale fall back to English at runtime,
 *   so partial translations are always safe to ship.
 * - New languages: create `src/i18n/locales/<code>.ts` and register
 *   it in LOCALES (or let scripts/merge-translation.ts do it for you).
 */

import { en, type Locale, type StringKey } from "./en";
import { ur } from "./locales/ur";
import { hi } from "./locales/hi";
import { bn } from "./locales/bn";
import { ar } from "./locales/ar";
import { ne } from "./locales/ne";
import { pa } from "./locales/pa";
import { sd } from "./locales/sd";
import { ps } from "./locales/ps";

export type { Locale, StringKey } from "./en";
export { en } from "./en";

export type LangCode = string;

export interface LocaleMeta {
  code: LangCode;
  /** native name in its own script, shown in the language dropdown */
  label: string;
  englishName: string;
  dir: "ltr" | "rtl";
  strings: Locale;
}

export const LOCALES: LocaleMeta[] = [
  { code: "en", label: "English", englishName: "English", dir: "ltr", strings: en },
  { code: "ur", label: "اردو", englishName: "Urdu", dir: "rtl", strings: ur },
  { code: "hi", label: "हिन्दी", englishName: "Hindi", dir: "ltr", strings: hi },
  { code: "bn", label: "বাংলা", englishName: "Bengali", dir: "ltr", strings: bn },
  { code: "ar", label: "العربية", englishName: "Arabic", dir: "rtl", strings: ar },
  { code: "ne", label: "नेपाली", englishName: "Nepali", dir: "ltr", strings: ne },
  { code: "pa", label: "پنجابی", englishName: "Punjabi", dir: "rtl", strings: pa },
  { code: "sd", label: "سنڌي", englishName: "Sindhi", dir: "rtl", strings: sd },
  { code: "ps", label: "پښتو", englishName: "Pashto", dir: "rtl", strings: ps },
  // [merge-tool] register new locales above this line
];

export type Vars = Record<string, string | number>;

const EN_LOOKUP = en as unknown as Record<string, string>;

export interface Translator {
  code: LangCode;
  dir: "ltr" | "rtl";
  /** translate a key; unknown keys pass through unchanged; missing locale keys fall back to English */
  t(key: string, vars?: Vars): string;
  /** translate a language name like "Urdu" into the current language */
  langName(name: string): string;
}

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const v = vars[name];
    return v === undefined ? match : String(v);
  });
}

export function makeT(code: LangCode): Translator {
  const locale = LOCALES.find((l) => l.code === code) ?? LOCALES[0];
  const lookup = locale.strings as unknown as Record<string, string>;
  return {
    code: locale.code,
    dir: locale.dir,
    t(key: string, vars?: Vars): string {
      const template = lookup[key] ?? EN_LOOKUP[key] ?? key;
      return interpolate(template, vars);
    },
    langName(name: string): string {
      const key = `lang.${name.toLowerCase()}`;
      return lookup[key] ?? EN_LOOKUP[key] ?? name;
    },
  };
}

export function getLocale(code: LangCode): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}
