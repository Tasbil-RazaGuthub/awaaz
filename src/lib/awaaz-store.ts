"use client";

import { create } from "zustand";
import type { LangCode } from "@/data/i18n";
import { getLang } from "@/data/i18n";

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

export function useLang() {
  const lang = useAwaaz((s) => s.lang);
  return getLang(lang);
}
