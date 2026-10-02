"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAwaaz, useT } from "@/lib/awaaz-store";
import { SYMPTOM_REPORT_OPTIONS, type HealthAlert, type Severity } from "@/data/persona-alerts";
import {
  DEMO_ALERTS,
  DEMO_CARE_OPTIONS,
  DEMO_DOCTOR,
  DEMO_GOV_NOTE,
  DEMO_MODERATOR,
  DEMO_SOURCE_ROWS,
  demoAiSummary,
  type DemoCareId,
} from "@/data/demo";
import { BADGES, CAMP_LEADERBOARD, CIVIC_PETITIONS, ECO_CHALLENGE, LESSONS } from "@/data/academy";
import {
  PlayCircle,
  Smartphone,
  Info,
  AlertTriangle,
  ThermometerSun,
  Wind,
  Heart,
  Users,
  ShieldCheck,
  Landmark,
  CheckCircle2,
  Mic,
  Bot,
  Send,
  BadgeCheck,
  HeartPulse,
  Phone,
  MapPin,
  WifiOff,
  GraduationCap,
  Flame,
  Award,
  Trophy,
  TreePine,
  PenLine,
  ChevronLeft,
  RotateCcw,
} from "lucide-react";

const TOTAL_STEPS = 5;

const SEVERITY_BORDER: Record<Severity, string> = {
  high: "border-l-4 border-l-destructive",
  medium: "border-l-4 border-l-chart-2",
  low: "border-l-4 border-l-primary",
};

const TYPE_ICON: Record<HealthAlert["type"], React.ReactNode> = {
  outbreak: <ThermometerSun className="h-5 w-5" aria-hidden="true" />,
  occupational: <AlertTriangle className="h-5 w-5" aria-hidden="true" />,
  environmental: <Wind className="h-5 w-5" aria-hidden="true" />,
  seasonal: <Heart className="h-5 w-5" aria-hidden="true" />,
};

const SOURCE_ICON: Record<string, React.ReactNode> = {
  individual: <Users className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />,
  ngo: <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />,
  government: <Landmark className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />,
};

const CARE_ICON: Record<DemoCareId, React.ReactNode> = {
  self: <HeartPulse className="h-4 w-4 text-primary" aria-hidden="true" />,
  online: <Phone className="h-4 w-4 text-primary" aria-hidden="true" />,
  inperson: <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />,
};

/** The judge questions answered on each step. */
const JUDGE_QA: Record<number, [string, string][]> = {
  1: [
    ["demo.s1.q1", "demo.s1.a1"],
    ["demo.s1.q2", "demo.s1.a2"],
    ["demo.s1.q3", "demo.s1.a3"],
  ],
  2: [
    ["demo.s2.q1", "demo.s2.a1"],
    ["demo.s2.q2", "demo.s2.a2"],
    ["demo.s2.q3", "demo.s2.a3"],
  ],
  3: [
    ["demo.s3.q1", "demo.s3.a1"],
    ["demo.s3.q2", "demo.s3.a2"],
    ["demo.s3.q3", "demo.s3.a3"],
  ],
  4: [
    ["demo.s4.q1", "demo.s4.a1"],
    ["demo.s4.q2", "demo.s4.a2"],
  ],
};

/** Every judge question, in order — the step 5 recap. */
const RECAP_QA: [string, string][] = [
  ...JUDGE_QA[1],
  ...JUDGE_QA[3],
  ...JUDGE_QA[4],
];

function StepHeading({ eyebrow, heading, sub }: { eyebrow: string; heading: string; sub: string }) {
  const { t } = useT();
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">{t(eyebrow)}</p>
      <h3 className="mt-0.5 text-base font-semibold sm:text-lg">{t(heading)}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(sub)}</p>
    </div>
  );
}

/** A framed simulation of what the worker's own screen shows. */
function ScreenFrame({ children }: { children: React.ReactNode }) {
  const { t } = useT();
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
        <Smartphone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {t("demo.screen")}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

/** The meta-commentary panel that answers the judges' questions for the current step. */
function JudgesPanel({ items }: { items: [string, string][] }) {
  const { t } = useT();
  return (
    <aside className="h-fit rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 lg:sticky lg:top-1">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
        <Info className="h-4 w-4 shrink-0" aria-hidden="true" /> {t("demo.judges")}
      </p>
      <div className="mt-3 space-y-3">
        {items.map(([q, a]) => (
          <div key={q}>
            <p className="text-xs font-semibold leading-snug">{t(q)}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{t(a)}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

/** One of the app's live alerts, plus the provenance rows the demonstration adds. */
function DemoAlertCard({ alert, showActions }: { alert: HealthAlert; showActions?: boolean }) {
  const { t } = useT();
  return (
    <Card className={SEVERITY_BORDER[alert.severity]}>
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 shrink-0 text-destructive">{TYPE_ICON[alert.type]}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-snug">{t(alert.title)}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {alert.area} · {t("home.alert.issued", { ago: t(alert.issuedAgo) })}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{t(alert.summary)}</p>

        <div className="rounded-lg bg-muted/60 p-3">
          <p className="text-xs font-semibold">{t("demo.src.title")}</p>
          <ul className="mt-1.5 space-y-1.5">
            {DEMO_SOURCE_ROWS.map((row) => (
              <li key={row.id} className="flex items-start gap-2 text-xs">
                {SOURCE_ICON[row.id]}
                <span>
                  {t(row.label, {
                    n: row.id === "individual" ? alert.reportsCount : alert.verifiedClinics,
                  })}
                  {row.id === "government" && ` — ${t(DEMO_GOV_NOTE[alert.id])}`}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {showActions && (
          <ul className="space-y-1.5 rounded-lg bg-primary/5 p-3">
            {alert.actions.map((action) => (
              <li key={action} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {t(action)}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function StepAlerts() {
  const { t } = useT();
  return (
    <div className="space-y-4">
      <StepHeading eyebrow="demo.step.1" heading="demo.s1.heading" sub="demo.s1.sub" />
      <ScreenFrame>
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-semibold sm:text-base">{t("home.alerts.title")}</h4>
          <Badge variant="outline" className="gap-1.5 border-chart-2/50 bg-chart-2/10 text-accent-foreground">
            <span className="live-dot h-2 w-2 rounded-full bg-destructive" aria-hidden="true" />
            {t("home.alerts.count", { n: DEMO_ALERTS.length })}
          </Badge>
        </div>
        <div className="space-y-3">
          {DEMO_ALERTS.map((alert, i) => (
            <DemoAlertCard key={alert.id} alert={alert} showActions={i === 0} />
          ))}
        </div>
      </ScreenFrame>
    </div>
  );
}

function StepFeelings({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (symptom: string) => void;
}) {
  const { t } = useT();
  return (
    <div className="space-y-4">
      <StepHeading eyebrow="demo.step.2" heading="demo.s2.heading" sub="demo.s2.sub" />
      <ScreenFrame>
        <p className="text-sm font-semibold sm:text-base">{t("demo.s2.q")}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SYMPTOM_REPORT_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onToggle(s)}
              aria-pressed={selected.includes(s)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${
                selected.includes(s)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:bg-muted"
              }`}
            >
              {t(s)}
            </button>
          ))}
        </div>
        <div className="mt-3 flex min-h-8 items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mic className="h-4 w-4 shrink-0" aria-hidden="true" /> {t("clinic.q1.mic")}
          </div>
          {selected.length > 0 && (
            <Badge variant="secondary">{t("demo.s2.selected", { n: selected.length })}</Badge>
          )}
        </div>
      </ScreenFrame>
    </div>
  );
}

function StepAiCare({
  symptoms,
  care,
  onCare,
}: {
  symptoms: string[];
  care: DemoCareId | null;
  onCare: (id: DemoCareId) => void;
}) {
  const { t, langName } = useT();
  const aiSummaryKey = demoAiSummary(symptoms);
  const doctorLangs = DEMO_DOCTOR.languages.map(langName).join(" + ");

  return (
    <div className="space-y-4">
      <StepHeading eyebrow="demo.step.3" heading="demo.s3.heading" sub="demo.s3.sub" />
      <ScreenFrame>
        {/* what the worker reported in step 2 */}
        <div className="rounded-lg bg-muted/60 p-3">
          <p className="text-xs text-muted-foreground">{t("demo.s2.q")}</p>
          <p className="mt-0.5 text-sm font-medium">{symptoms.map((s) => t(s)).join(" · ")}</p>
        </div>

        {/* AI draft — analyzed, but only a draft */}
        <Card className="mt-3 border-primary/30">
          <CardContent className="space-y-2.5 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Bot className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-sm font-semibold">{t("demo.ai.title")}</p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{t(aiSummaryKey)}</p>
            <p className="flex items-center gap-1.5 text-xs font-medium text-primary">
              <Send className="h-3.5 w-3.5 shrink-0 rtl:-scale-x-100" aria-hidden="true" />
              {t("demo.ai.sent")}
            </p>
          </CardContent>
        </Card>

        {/* the human in the loop */}
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {t("demo.mod.title")}
        </p>
        <Card className="mt-1.5">
          <CardContent className="space-y-2.5 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-chart-3/15 text-xs font-bold text-chart-3">
                {DEMO_MODERATOR.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight">{DEMO_MODERATOR.name}</p>
                <p className="text-xs text-muted-foreground">{t(DEMO_MODERATOR.role)}</p>
              </div>
              <Badge className="ms-auto gap-1 border-transparent bg-chart-3 text-primary-foreground">
                <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                {t("demo.mod.approved", { mins: DEMO_MODERATOR.reviewMinutes })}
              </Badge>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{t("demo.mod.note")}</p>
          </CardContent>
        </Card>

        {/* care routing — the worker chooses */}
        <div className="mt-4">
          <p className="text-sm font-semibold sm:text-base">{t("demo.s3.care.q")}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {DEMO_CARE_OPTIONS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => onCare(o.id)}
                aria-pressed={care === o.id}
                className={`rounded-xl border p-3 text-start transition-colors ${
                  care === o.id
                    ? "border-primary bg-primary/10 ring-1 ring-primary/40"
                    : "bg-card hover:bg-muted/60"
                }`}
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  {CARE_ICON[o.id]} {t(o.label)}
                </span>
                <span className="mt-1 block text-xs leading-snug text-muted-foreground">{t(o.hint)}</span>
              </button>
            ))}
          </div>

          {care === "self" && (
            <div className="mt-3 rounded-lg bg-muted/60 p-3 text-sm leading-relaxed text-muted-foreground">
              {t("demo.s3.self.detail")}
            </div>
          )}

          {care === "online" && (
            <div className="mt-3 space-y-2.5 rounded-lg bg-muted/60 p-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chart-4/20 text-sm font-bold text-chart-4">
                  {DEMO_DOCTOR.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <p className="text-sm font-semibold">{DEMO_DOCTOR.name}</p>
                    <Badge className="gap-1 bg-primary text-primary-foreground">
                      <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                      {t("clinic.match.score", { n: DEMO_DOCTOR.matchScore })}
                    </Badge>
                    {DEMO_DOCTOR.volunteer && <Badge variant="secondary">{t("clinic.match.volunteer")}</Badge>}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{doctorLangs}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("demo.s3.online.detail", { time: DEMO_DOCTOR.availTime })}
              </p>
            </div>
          )}

          {care === "inperson" && (
            <div className="mt-3 rounded-lg bg-muted/60 p-3 text-sm leading-relaxed text-muted-foreground">
              {t("demo.s3.inperson.detail")}
            </div>
          )}
        </div>
      </ScreenFrame>
    </div>
  );
}

function StepAcademy() {
  const { t } = useT();
  return (
    <div className="space-y-4">
      <StepHeading eyebrow="demo.step.4" heading="demo.s4.heading" sub="demo.s4.sub" />
      <ScreenFrame>
        {/* offline banner */}
        <div className="flex items-start gap-3 rounded-xl border border-chart-2/50 bg-chart-2/10 p-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-chart-2/20 text-accent-foreground">
            <WifiOff className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium leading-snug">{t("demo.s4.offline")}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{t("demo.s4.cached")}</p>
          </div>
        </div>

        {/* the Academy tab's contents, from the same data the real tab uses */}
        <div className="mt-4 space-y-4">
          <h4 className="text-sm font-semibold sm:text-base">{t("academy.title")}</h4>

          <div className="rounded-xl border p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Flame className="h-4 w-4 text-chart-2" aria-hidden="true" /> {t("academy.streak")}
              </span>
              <Badge variant="secondary">{t("academy.weekly")}</Badge>
            </div>
            <Progress value={62} className="mt-2.5" aria-label={t("a11y.lessonProgress")} />
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {BADGES.map((b) => (
                <Badge
                  key={b.id}
                  variant={b.earned ? "default" : "outline"}
                  className={`gap-1 ${b.earned ? "" : "opacity-50"}`}
                >
                  <Award className="h-3 w-3" aria-hidden="true" />
                  {t(b.label)}
                  {!b.earned && ` · ${t("academy.locked")}`}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {LESSONS.map((l) => (
              <div key={l.id} className="rounded-xl border p-3 transition-colors hover:border-primary/40">
                <div className="flex items-start justify-between gap-3">
                  <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug">{t(l.title)}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(l.summary)}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge variant="secondary">{t("academy.minutes", { n: l.minutes })}</Badge>
                      <Badge variant="outline">{t("academy.badgeLabel", { badge: t(l.badge) })}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border p-3">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Trophy className="h-4 w-4 text-chart-2" aria-hidden="true" /> {t("academy.leaderboard.title")}
            </p>
            <ul className="mt-2 space-y-1.5">
              {CAMP_LEADERBOARD.map((row) => (
                <li
                  key={row.rank}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                    row.camp === "Al Quoz Block B" ? "bg-primary/10 font-medium" : "bg-muted/50"
                  }`}
                >
                  <span>
                    #{row.rank} · {row.camp}
                  </span>
                  <span className="text-muted-foreground">{t("academy.leaderboard.lessons", { n: row.lessons })}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-chart-3/40 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-sm font-medium">
                <TreePine className="h-4 w-4 text-chart-3" aria-hidden="true" /> {t(ECO_CHALLENGE.title)}
              </span>
              <Badge variant="secondary">
                {t("academy.eco.badge", { camps: ECO_CHALLENGE.camps, pct: ECO_CHALLENGE.progressPct })}
              </Badge>
            </div>
            <Progress value={ECO_CHALLENGE.progressPct} className="mt-2.5" aria-label={t("a11y.ecoProgress")} />
          </div>

          <div className="rounded-xl border p-3">
            <p className="flex items-center gap-2 text-sm font-medium">
              <PenLine className="h-4 w-4 text-primary" aria-hidden="true" /> {t("academy.civic.title")}
            </p>
            <div className="mt-2 space-y-2">
              {CIVIC_PETITIONS.map((p) => (
                <div key={p.id} className="rounded-lg border p-3">
                  <p className="text-sm font-medium">{t(p.title)}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t(p.authority)}</p>
                  <Progress
                    value={(p.signatures / p.target) * 100}
                    className="mt-2"
                    aria-label={t("a11y.petitionProgress", { count: p.signatures, target: p.target })}
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{p.signatures.toLocaleString()}</span>{" "}
                    {t("academy.civic.count", { target: p.target.toLocaleString() })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScreenFrame>
    </div>
  );
}

function StepSummary() {
  const { t } = useT();
  return (
    <div className="space-y-4">
      <StepHeading eyebrow="demo.step.5" heading="demo.s5.heading" sub="demo.s5.sub" />
      <ol className="space-y-2.5">
        {RECAP_QA.map(([q, a], i) => (
          <li key={q} className="flex gap-3 rounded-xl border bg-card p-3.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-snug">{t(q)}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{t(a)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * App Demonstration — a guided walkthrough for judges, opened from the
 * header "Demo" button. Shows one worker's journey (alerts → symptom
 * report → AI draft + human moderator → care choice → offline Academy)
 * with the accountability answers alongside every step.
 */
export function AppDemo() {
  const { t, dir } = useT();
  const setTab = useAwaaz((s) => s.setTab);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [care, setCare] = useState<DemoCareId | null>(null);

  const toggleSymptom = (s: string) => {
    setSymptoms((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const restart = () => {
    setStep(1);
    setSymptoms([]);
    setCare(null);
  };

  const handleOpenChange = (o: boolean) => {
    setOpen(o);
    if (o) restart();
  };

  const canContinue = !(step === 2 && symptoms.length === 0) && !(step === 3 && care === null);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="h-11 gap-1.5 border-primary/40 px-3 text-primary hover:bg-primary/10 hover:text-primary"
        onClick={() => handleOpenChange(true)}
        title={t("a11y.demoLaunch")}
      >
        <PlayCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        {t("demo.launch")}
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          dir={dir}
          className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl"
        >
          <DialogHeader className="space-y-2 border-b p-4 pb-3 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pe-8">
              <DialogTitle className="text-base font-bold sm:text-lg">{t("demo.title")}</DialogTitle>
              <Badge variant="secondary" className="tabular-nums">
                {t("demo.stepOf", { n: step, total: TOTAL_STEPS })}
              </Badge>
            </div>
            <DialogDescription className="text-xs leading-relaxed sm:text-sm">
              {t("demo.subtitle")}
            </DialogDescription>
            <Progress
              value={((step - 1) / (TOTAL_STEPS - 1)) * 100}
              className="h-1.5"
              aria-label={t("a11y.demoProgress", { n: step, total: TOTAL_STEPS })}
            />
          </DialogHeader>

          <div className="flex-1 overflow-y-auto scroll-thin p-4 sm:p-6">
            <div
              className={
                step === 5
                  ? ""
                  : "grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_264px]"
              }
            >
              <div className="min-w-0">
                {step === 1 && <StepAlerts />}
                {step === 2 && <StepFeelings selected={symptoms} onToggle={toggleSymptom} />}
                {step === 3 && <StepAiCare symptoms={symptoms} care={care} onCare={setCare} />}
                {step === 4 && <StepAcademy />}
                {step === 5 && <StepSummary />}
              </div>
              {step !== 5 && <JudgesPanel items={JUDGE_QA[step]} />}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 border-t p-4 sm:px-6">
            {step < TOTAL_STEPS ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="min-h-11"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                >
                  <ChevronLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" /> {t("demo.back")}
                </Button>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 w-2 rounded-full ${
                        i + 1 === step ? "bg-primary" : i + 1 < step ? "bg-primary/40" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
                <Button
                  size="sm"
                  className="min-h-11"
                  disabled={!canContinue}
                  onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                >
                  {t("demo.next")}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" className="min-h-11" onClick={restart}>
                  <RotateCcw className="h-4 w-4" aria-hidden="true" /> {t("demo.restart")}
                </Button>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="min-h-11"
                    onClick={() => {
                      handleOpenChange(false);
                      setTab("academy");
                    }}
                  >
                    <GraduationCap className="h-4 w-4" aria-hidden="true" /> {t("demo.explore")}
                  </Button>
                  <Button size="sm" className="min-h-11" onClick={() => handleOpenChange(false)}>
                    {t("demo.finish")}
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
