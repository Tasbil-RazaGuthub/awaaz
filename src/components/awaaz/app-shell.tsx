"use client";

import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAwaaz, useT, type TabKey } from "@/lib/awaaz-store";
import { LOCALES } from "@/i18n";
import { HomeView } from "./home-view";
import { ClinicView } from "./clinic-view";
import { CirclesView } from "./circles-view";
import { AcademyView } from "./academy-view";
import { DataView } from "./data-view";
import { AppDemo } from "./demo-view";
import { Home, Stethoscope, AudioLines, GraduationCap, BarChart3, Phone, Languages, GitFork } from "lucide-react";

const TABS: { key: TabKey; navKey: string; icon: React.ReactNode }[] = [
  { key: "home", navKey: "nav.home", icon: <Home className="h-5 w-5" aria-hidden="true" /> },
  { key: "clinic", navKey: "nav.clinic", icon: <Stethoscope className="h-5 w-5" aria-hidden="true" /> },
  { key: "circles", navKey: "nav.circles", icon: <AudioLines className="h-5 w-5" aria-hidden="true" /> },
  { key: "academy", navKey: "nav.academy", icon: <GraduationCap className="h-5 w-5" aria-hidden="true" /> },
  { key: "data", navKey: "nav.data", icon: <BarChart3 className="h-5 w-5" aria-hidden="true" /> },
];

export function AwaazApp() {
  const { t, dir } = useT();
  const { lang, setLang, tab, setTab } = useAwaaz();

  // keep the browser tab title in sync with the language
  useEffect(() => {
    document.title = t("meta.title");
  }, [t]);

  return (
    <div dir={dir} lang={lang} className="flex min-h-screen flex-col bg-background">
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
              <p className="truncate text-xs text-muted-foreground">{t("header.tagline")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <AppDemo />
            <Select value={lang} onValueChange={(v) => setLang(v)}>
              <SelectTrigger
                className="h-11 w-[130px] sm:w-[150px]"
                aria-label={t("a11y.langSelect")}
              >
                <Languages className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOCALES.map((l) => (
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
        <nav className="hidden border-t md:block" aria-label={t("a11y.primary")}>
          <div className="mx-auto max-w-6xl px-4">
            <ul className="flex gap-1">
              {TABS.map(({ key, navKey, icon }) => (
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
                    {t(navKey)}
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
              <Phone className="h-3 w-3" aria-hidden="true" /> {t("footer.ivr")}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <GitFork className="h-3 w-3" aria-hidden="true" /> {t("footer.fork")}
            </Badge>
            <Badge variant="secondary">{t("footer.prototype")}</Badge>
          </div>
          <p className="leading-relaxed">{t("footer.para1")}</p>
          <p className="leading-relaxed">{t("footer.para2")}</p>
        </div>
      </footer>

      {/* Mobile bottom tab nav */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 md:hidden"
        aria-label={t("a11y.primaryMobile")}
      >
        <ul className="mx-auto flex max-w-lg">
          {TABS.map(({ key, navKey, icon }) => (
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
                <span className="truncate" dir="auto">{t(navKey)}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
