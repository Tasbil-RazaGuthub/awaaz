"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAwaaz, useLang, type TabKey } from "@/lib/awaaz-store";
import { LANGUAGES, type LangCode } from "@/data/i18n";
import { HomeView } from "./home-view";
import { ClinicView } from "./clinic-view";
import { CirclesView } from "./circles-view";
import { AcademyView } from "./academy-view";
import { DataView } from "./data-view";
import { Home, Stethoscope, AudioLines, GraduationCap, BarChart3, Phone, Languages, GitFork } from "lucide-react";

const TABS: { key: TabKey; icon: React.ReactNode }[] = [
  { key: "home", icon: <Home className="h-5 w-5" aria-hidden="true" /> },
  { key: "clinic", icon: <Stethoscope className="h-5 w-5" aria-hidden="true" /> },
  { key: "circles", icon: <AudioLines className="h-5 w-5" aria-hidden="true" /> },
  { key: "academy", icon: <GraduationCap className="h-5 w-5" aria-hidden="true" /> },
  { key: "data", icon: <BarChart3 className="h-5 w-5" aria-hidden="true" /> },
];

export function AwaazApp() {
  const t = useLang();
  const { lang, setLang, tab, setTab } = useAwaaz();

  return (
    <div dir={t.dir} lang={lang} className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-xl font-bold leading-none text-primary-foreground">
              <span aria-hidden="true" className="font-sans">آ</span>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
                <span dir="rtl" lang="ur" className="text-lg font-bold leading-none">آواز</span>
                <span className="text-lg font-bold leading-none">Awaaz</span>
              </div>
              <p className="truncate text-xs text-muted-foreground">{t.strings.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select value={lang} onValueChange={(v) => setLang(v as LangCode)}>
              <SelectTrigger
                className="h-11 w-[130px] sm:w-[150px]"
                aria-label="Select app language (8 corridor languages + English)"
              >
                <Languages className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((l) => (
                  <SelectItem key={l.code} value={l.code}>
                    <span dir="auto">{l.label}</span>
                    <span className="ms-2 text-xs text-muted-foreground">{l.englishName}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop tab nav */}
        <nav className="hidden border-t md:block" aria-label="Primary">
          <div className="mx-auto max-w-6xl px-4">
            <ul className="flex gap-1">
              {TABS.map(({ key, icon }) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => setTab(key)}
                    aria-current={tab === key ? "page" : undefined}
                    className={`flex min-h-11 items-center gap-2 border-b-2 px-4 text-sm font-medium transition-colors ${
                      tab === key
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {icon}
                    {t.strings.nav[key as keyof typeof t.strings.nav]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-24 md:pb-8">
        {tab === "home" && <HomeView />}
        {tab === "clinic" && <ClinicView />}
        {tab === "circles" && <CirclesView />}
        {tab === "academy" && <AcademyView />}
        {tab === "data" && <DataView />}
      </main>

      {/* Footer — the honesty layer */}
      <footer className="mt-auto border-t bg-secondary/50">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-6 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Phone className="h-3 w-3" aria-hidden="true" /> IVR: 800-AWAAZ
            </Badge>
            <Badge variant="outline" className="gap-1">
              <GitFork className="h-3 w-3" aria-hidden="true" /> MIT open source — fork it for your corridor
            </Badge>
            <Badge variant="secondary">Prototype · all data simulated</Badge>
          </div>
          <p className="leading-relaxed">
            Awaaz is a competition prototype for the Sydney Innovation Challenge 2026 (SDG 3 — Good Health and
            Well-being). Doctor profiles, triage routing, conversations, and dashboard numbers are illustrative, not
            clinically validated. A real launch requires telehealth licensing, clinical validation of the triage
            rules, trained moderators with a crisis pathway, and health-data privacy compliance across the GCC.
          </p>
          <p className="leading-relaxed">
            The interface is partially localized for the demo — navigation, greetings, and key headings render in all
            8 corridor languages (Urdu, Hindi, Bengali, Arabic, Nepali, Punjabi, Sindhi, Pashto); full localization
            ships with the pilot.
          </p>
        </div>
      </footer>

      {/* Mobile bottom tab nav */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 md:hidden"
        aria-label="Primary mobile"
      >
        <ul className="mx-auto flex max-w-lg">
          {TABS.map(({ key, icon }) => (
            <li key={key} className="flex-1">
              <button
                type="button"
                onClick={() => setTab(key)}
                aria-current={tab === key ? "page" : undefined}
                className={`flex min-h-16 w-full flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${
                  tab === key ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {icon}
                <span className="truncate" dir="auto">{t.strings.nav[key as keyof typeof t.strings.nav]}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
