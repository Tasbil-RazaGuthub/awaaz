"use client";

import { useMemo } from "react";
import { create } from "zustand";
import { makeT, type LangCode, type Translator } from "@/i18n";

export type TabKey = "home" | "clinic" | "circles" | "academy" | "data";

interface AwaazState {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  tab: TabKey;
  setTab: (tab: TabKey) => void;
}

export const useAwaaz = create<AwaazState>((set) => ({
  lang: "en",
  setLang: (lang) => set({ lang }),
  tab: "home",
  setTab: (tab) => set({ tab }),
}));

/**
 * Translation hook: `const { t, dir, langName } = useT()`.
 * Re-created only when the language changes.
 */
export function useT(): Translator {
  const lang = useAwaaz((s) => s.lang);
  return useMemo(() => makeT(lang), [lang]);
}
