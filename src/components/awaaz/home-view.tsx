"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAwaaz, useT } from "@/lib/awaaz-store";
import { ALERTS, PERSONA, SYMPTOM_REPORT_OPTIONS, type HealthAlert, type Severity } from "@/data/persona-alerts";
import { Waveform } from "./waveform";
import {
  AlertTriangle,
  ThermometerSun,
  Wind,
  Heart,
  Phone,
  Stethoscope,
  AudioLines,
  GraduationCap,
  BarChart3,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Users,
  Mic,
} from "lucide-react";

const SEVERITY_STYLE: Record<Severity, { badge: string; border: string; icon: React.ReactNode }> = {
  high: {
    badge: "bg-destructive/10 text-destructive border-destructive/30",
    border: "border-l-4 border-l-destructive",
    icon: <AlertTriangle className="h-4 w-4 text-destructive" aria-hidden="true" />,
  },
  medium: {
    badge: "bg-chart-2/15 text-accent-foreground border-chart-2/40",
    border: "border-l-4 border-l-chart-2",
    icon: <Wind className="h-4 w-4 text-accent-foreground" aria-hidden="true" />,
  },
  low: {
    badge: "bg-primary/10 text-primary border-primary/30",
    border: "border-l-4 border-l-primary",
    icon: <Heart className="h-4 w-4 text-primary" aria-hidden="true" />,
  },
};

const TYPE_ICON: Record<HealthAlert["type"], React.ReactNode> = {
  outbreak: <ThermometerSun className="h-5 w-5" aria-hidden="true" />,
  occupational: <AlertTriangle className="h-5 w-5" aria-hidden="true" />,
  environmental: <Wind className="h-5 w-5" aria-hidden="true" />,
  seasonal: <Heart className="h-5 w-5" aria-hidden="true" />,
};

export function HomeView() {
  const { t, langName } = useT();
  const setTab = useAwaaz((s) => s.setTab);
  const [reported, setReported] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const highAlerts = ALERTS.filter((a) => a.severity !== "low");

  return (
    <div className="space-y-6">
      {/* Greeting + persona */}
      <section className="flex items-start gap-4" aria-label={t("home.greeting")}>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
          {PERSONA.avatarInitials}
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-bold leading-tight sm:text-2xl">{t("home.greeting")}</h1>
          <p className="text-sm text-muted-foreground">{t("home.sub")}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" /> {PERSONA.camp}, {PERSONA.city}
            </span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" /> {t("home.speaks", { langs: PERSONA.languages.map(langName).join(" + ") })}
            </span>
          </div>
        </div>
      </section>

      {/* Active alerts */}
      <section aria-labelledby="alerts-heading">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="alerts-heading" className="text-lg font-semibold">
            {t("home.alerts.title")}
          </h2>
          <Badge variant="outline" className="gap-1.5 border-chart-2/50 bg-chart-2/10 text-accent-foreground">
            <span className="live-dot h-2 w-2 rounded-full bg-destructive" aria-hidden="true" />
            {t("home.alerts.count", { n: ALERTS.filter((a) => a.severity !== "low").length })}
          </Badge>
        </div>

        <div className="space-y-4">
          {highAlerts.map((alert) => (
            <Card key={alert.id} className={SEVERITY_STYLE[alert.severity].border}>
              <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
                <CardTitle className="flex items-start gap-3 text-base sm:text-lg">
                  <span className="mt-0.5 text-destructive">{TYPE_ICON[alert.type]}</span>
                  <span>
                    {t(alert.title)}
                    <span className="mt-1 block text-xs font-normal text-muted-foreground">
                      {alert.area} · {t("home.alert.issued", { ago: t(alert.issuedAgo) })}
                    </span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4 pt-2 sm:p-5 sm:pt-2">
                <p className="text-sm leading-relaxed text-muted-foreground">{t(alert.summary)}</p>

                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="secondary" className="gap-1">
                    <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                    {t("home.alert.verified", { n: alert.verifiedClinics })}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Users className="h-3 w-3" aria-hidden="true" />
                    {t("home.alert.reached", { n: alert.workersReached.toLocaleString() })}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    {t("home.alert.reports", { n: alert.reportsCount })}
                  </Badge>
                </div>

                <ul className="space-y-1.5 rounded-lg bg-muted/60 p-3">
                  {alert.actions.map((action) => (
                    <li key={action} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {t(action)}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Symptom report — feeds the early-warning engine */}
      <section aria-labelledby="report-heading">
        <Card className="border-primary/25">
          <CardHeader className="p-4 pb-3 sm:p-5 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Mic className="h-5 w-5 text-primary" aria-hidden="true" />
              {t("home.report.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-0 sm:p-5 sm:pt-0">
            {reported ? (
              <div className="flex items-start gap-3 rounded-lg bg-primary/10 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium">{t("home.report.thanks")}</p>
                  <p className="text-sm text-muted-foreground">
                    {reported === "sym.feelFine" ? t("home.report.afterFine") : t("home.report.after")}
                  </p>
                  <Button variant="link" size="sm" className="h-auto p-0" onClick={() => { setReported(null); setSelectedSymptoms([]); }}>
                    {t("home.report.again")}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  {t("home.report.intro")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {SYMPTOM_REPORT_OPTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSymptom(s)}
                      aria-pressed={selectedSymptoms.includes(s)}
                      className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${
                        selectedSymptoms.includes(s)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                    >
                      {t(s)}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
                    <Waveform bars={16} className="h-5" seed={3} label={t("a11y.waveform")} />
                    {t("home.report.ivrNote")}
                  </div>
                  <Button
                    className="min-h-11"
                    size="sm"
                    disabled={selectedSymptoms.length === 0}
                    onClick={() => setReported(selectedSymptoms.join(", "))}
                  >
                    {t("home.report.send")}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Pillar quick links */}
      <section aria-labelledby="quicklinks-heading">
        <h2 id="quicklinks-heading" className="mb-3 text-lg font-semibold">
          {t("home.quick.title")}
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { tab: "clinic" as const, icon: <Stethoscope className="h-5 w-5" aria-hidden="true" />, label: t("home.quick.clinic"), hint: t("home.quick.clinic.hint") },
            { tab: "circles" as const, icon: <AudioLines className="h-5 w-5" aria-hidden="true" />, label: t("home.quick.circles"), hint: t("home.quick.circles.hint") },
            { tab: "academy" as const, icon: <GraduationCap className="h-5 w-5" aria-hidden="true" />, label: t("home.quick.academy"), hint: t("home.quick.academy.hint") },
            { tab: "data" as const, icon: <BarChart3 className="h-5 w-5" aria-hidden="true" />, label: t("home.quick.data"), hint: t("home.quick.data.hint") },
          ].map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => setTab(item.tab)}
              className="flex min-h-24 flex-col items-start justify-between rounded-xl border bg-card p-4 text-start shadow-sm transition-colors hover:border-primary/40 hover:bg-muted/60"
            >
              <span className="text-primary">{item.icon}</span>
              <span>
                <span className="block text-sm font-medium leading-snug">{item.label}</span>
                <span className="block text-xs text-muted-foreground">{item.hint}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* IVR banner */}
      <section aria-label="IVR fallback">
        <Card className="bg-secondary/70">
          <CardContent className="flex items-center gap-4 p-4 sm:p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-snug">{t("home.ivr.line")}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t("home.ivr.detail")}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Weekly habit streak */}
      <section aria-label="Weekly streak">
        <Card>
          <CardContent className="space-y-3 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{t("home.streak.title")}</p>
              <Badge variant="secondary">{t("home.streak.badge")}</Badge>
            </div>
            <Progress value={62} aria-label={t("a11y.weeklyGoal")} />
            <p className="text-xs text-muted-foreground">
              {t("home.streak.detail")}
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
