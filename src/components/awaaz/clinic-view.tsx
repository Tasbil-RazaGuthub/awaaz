"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Waveform } from "./waveform";
import { useT } from "@/lib/awaaz-store";
import { DOCTORS, CONSULT_SCRIPT, type Doctor } from "@/data/doctors";
import { SYMPTOM_OPTIONS, DURATION_OPTIONS, REDFLAG_OPTIONS, evaluateTriage, type TriageResult } from "@/data/triage";
import { PERSONA } from "@/data/persona-alerts";
import {
  Mic,
  Stethoscope,
  ShieldCheck,
  PhoneOff,
  ChevronLeft,
  BadgeCheck,
  MapPin,
  Volume2,
  CircleDollarSign,
  Gauge,
  HeartPulse,
  Ambulance,
} from "lucide-react";

type Phase = "triage" | "match" | "consult" | "summary";

interface TriageAnswers {
  symptoms: string[];
  duration: string | null;
  redflags: string[];
}

function toggle(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

function Chip({ selected, children, onClick }: { selected: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${
        selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}

export function ClinicView() {
  const { t, langName } = useT();
  const [phase, setPhase] = useState<Phase>("triage");
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<TriageAnswers>({ symptoms: [], duration: null, redflags: [] });
  const [result, setResult] = useState<TriageResult | null>(null);
  const [langFilter, setLangFilter] = useState("any");
  const [genderFilter, setGenderFilter] = useState("any");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [consultSeconds, setConsultSeconds] = useState(0);
  const [visibleTurns, setVisibleTurns] = useState(1);
  const [micOn, setMicOn] = useState(true);

  // consult timer
  useEffect(() => {
    if (phase !== "consult") return;
    const timer = setInterval(() => setConsultSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // reveal consult turns over time (simulated voice flow)
  useEffect(() => {
    if (phase !== "consult") return;
    const reveal = setInterval(() => {
      setVisibleTurns((n) => (n < CONSULT_SCRIPT.length ? n + 1 : n));
    }, 2600);
    return () => clearInterval(reveal);
  }, [phase]);

  const runTriage = () => {
    const r = evaluateTriage(answers.symptoms, answers.duration ?? "today", answers.redflags);
    setResult(r);
    if (r.route === "tele-consult") {
      setPhase("match");
    }
  };

  const reset = () => {
    setPhase("triage");
    setStep(1);
    setAnswers({ symptoms: [], duration: null, redflags: [] });
    setResult(null);
    setSelectedDoctor(null);
    setConsultSeconds(0);
    setVisibleTurns(1);
    setMicOn(true);
  };

  const filteredDoctors = DOCTORS.filter(
    (d) =>
      (langFilter === "any" || d.languages.includes(langFilter)) &&
      (genderFilter === "any" || d.gender === genderFilter),
  );

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const routeColor =
    result?.color === "red"
      ? "border-destructive/40 bg-destructive/5"
      : result?.color === "amber"
        ? "border-chart-2/50 bg-chart-2/10"
        : "border-primary/40 bg-primary/5";

  return (
    <div className="space-y-6">
      {/* Phase 1 — Triage */}
      {phase === "triage" && (
        <section aria-labelledby="triage-heading" className="space-y-4">
          <div>
            <h2 id="triage-heading" className="text-lg font-semibold">
              {t("clinic.title")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("clinic.intro")}
            </p>
          </div>

          <Card>
            <CardContent className="space-y-4 p-4 sm:p-6">
              {step === 1 && (
                <div className="space-y-3">
                  <p className="font-medium">{t("clinic.q1")}</p>
                  <div className="flex flex-wrap gap-2">
                    {SYMPTOM_OPTIONS.map((o) => (
                      <Chip key={o.id} selected={answers.symptoms.includes(o.id)} onClick={() => setAnswers((a) => ({ ...a, symptoms: toggle(a.symptoms, o.id) }))}>
                        {t(o.key)}
                      </Chip>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mic className="h-4 w-4" aria-hidden="true" /> {t("clinic.q1.mic")}
                    </div>
                    <Button className="min-h-11" size="sm" disabled={answers.symptoms.length === 0} onClick={() => setStep(2)}>
                      {t("clinic.continue")}
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <p className="font-medium">{t("clinic.q2")}</p>
                  <div className="flex flex-wrap gap-2">
                    {DURATION_OPTIONS.map((o) => (
                      <Chip key={o.id} selected={answers.duration === o.id} onClick={() => setAnswers((a) => ({ ...a, duration: o.id }))}>
                        {t(o.key)}
                      </Chip>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="min-h-11" onClick={() => setStep(1)}>
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" /> {t("clinic.back")}
                    </Button>
                    <Button className="min-h-11" size="sm" disabled={!answers.duration} onClick={() => setStep(3)}>
                      {t("clinic.continue")}
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <p className="font-medium">{t("clinic.q3")}</p>
                  <div className="flex flex-wrap gap-2">
                    {REDFLAG_OPTIONS.map((o) => (
                      <Chip key={o.id} selected={answers.redflags.includes(o.id)} onClick={() => setAnswers((a) => ({ ...a, redflags: toggle(a.redflags, o.id) }))}>
                        {t(o.key)}
                      </Chip>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="min-h-11" onClick={() => setStep(2)}>
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" /> {t("clinic.back")}
                    </Button>
                    <Button className="min-h-11" size="sm" disabled={answers.redflags.length === 0} onClick={runTriage}>
                      {t("clinic.getResult")}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground">
            {t("clinic.disclaimer")}
          </p>
        </section>
      )}

      {/* Triage result — non-tele-consult routes */}
      {phase === "triage" && result && result.route !== "tele-consult" && (
        <Card className={routeColor}>
          <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              {result.route === "in-person" ? (
                <Ambulance className="h-5 w-5 text-destructive" aria-hidden="true" />
              ) : (
                <HeartPulse className="h-5 w-5 text-primary" aria-hidden="true" />
              )}
              {t(result.title)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-2 sm:p-5 sm:pt-2">
            <p className="text-sm leading-relaxed text-muted-foreground">{t(result.reason)}</p>
            <ul className="space-y-1.5 rounded-lg bg-muted/60 p-3">
              {result.advice.map((a) => (
                <li key={a} className="text-sm">• {t(a)}</li>
              ))}
            </ul>
            <div className="flex gap-2">
              <Button size="sm" className="min-h-11" variant={result.route === "in-person" ? "destructive" : "outline"} onClick={reset}>
                {t(result.cta)}
              </Button>
              <Button size="sm" variant="ghost" className="min-h-11" onClick={reset}>
                {t("clinic.startOver")}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Phase 2 — Doctor match */}
      {phase === "match" && result && (
        <section aria-labelledby="match-heading" className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id="match-heading" className="text-lg font-semibold">
                {result.route === "tele-consult" ? t("clinic.match.ready") : t("clinic.title")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{t(result.reason)}</p>
            </div>
            <Button variant="ghost" size="sm" className="min-h-11 shrink-0" onClick={reset}>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" /> {t("clinic.match.back")}
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select value={langFilter} onValueChange={setLangFilter}>
              <SelectTrigger className="min-h-11 w-40" aria-label={t("a11y.filterLang")}>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">{t("clinic.filter.lang.any")}</SelectItem>
                {["Urdu", "Punjabi", "Bengali", "Hindi", "Pashto", "Arabic", "Nepali"].map((l) => (
                  <SelectItem key={l} value={l}>{langName(l)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="min-h-11 w-36" aria-label={t("a11y.filterGender")}>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">{t("clinic.filter.gender.any")}</SelectItem>
                <SelectItem value="female">{t("clinic.filter.gender.f")}</SelectItem>
                <SelectItem value="male">{t("clinic.filter.gender.m")}</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="ms-auto">
              {t("clinic.match.formula")}
            </Badge>
          </div>

          <div className="space-y-3">
            {filteredDoctors.map((d) => (
              <Card key={d.id} className="p-4 sm:p-5">
                <div className="flex flex-wrap items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      d.gender === "female" ? "bg-chart-4/20 text-chart-4" : "bg-primary/15 text-primary"
                    }`}
                  >
                    {d.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{d.name}</p>
                      {d.matchScore >= 90 && (
                        <Badge className="gap-1 bg-primary text-primary-foreground">
                          <BadgeCheck className="h-3 w-3" aria-hidden="true" /> {t("clinic.match.score", { n: d.matchScore })}
                        </Badge>
                      )}
                      {d.gccBased && <Badge variant="secondary">{t("clinic.match.inGcc")}</Badge>}
                      {d.volunteer && <Badge variant="secondary">{t("clinic.match.volunteer")}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("clinic.match.basedIn", { specialty: t(d.specialty), city: d.basedIn })}
                      {d.homeDistrict === PERSONA.homeDistrict && (
                        <span className="font-medium text-primary"> · {t("clinic.match.district", { district: d.homeDistrict })}</span>
                      )}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {d.languages.map((l) => (
                        <Badge key={l} variant="outline" className="text-xs font-normal">{langName(l)}</Badge>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{t(d.availability, { time: d.availTime })}</p>
                  </div>
                  <Button size="sm" className="min-h-11 self-center" onClick={() => { setSelectedDoctor(d); setPhase("consult"); }}>
                    <Mic className="me-1 h-4 w-4" aria-hidden="true" /> {t("clinic.match.voiceConsult")}
                  </Button>
                </div>
              </Card>
            ))}
            {filteredDoctors.length === 0 && (
              <Card className="p-6 text-center text-sm text-muted-foreground">
                {t("clinic.match.none")}
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Phase 3 — Voice consult */}
      {phase === "consult" && selectedDoctor && (
        <section aria-label={t("a11y.consultInProgress")} className="space-y-4">
          <Card className="border-primary/40">
            <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Stethoscope className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold leading-tight">{selectedDoctor.name}</p>
                    <p className="text-xs text-muted-foreground">{t("consult.sub", { specialty: t(selectedDoctor.specialty) })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <CircleDollarSign className="h-3 w-3" aria-hidden="true" /> {t("consult.cost")}
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Gauge className="h-3 w-3" aria-hidden="true" /> {t("consult.data")}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 p-4 pt-2 sm:p-5 sm:pt-2">
              {/* live waveform + timer */}
              <div className="flex flex-col items-center gap-3 rounded-xl bg-primary/5 p-6">
                <Waveform bars={32} active className="h-12 w-full max-w-xs justify-center" label={t("a11y.liveWave")} />
                <p className="font-mono text-sm text-muted-foreground">{t("consult.connected", { time: fmt(consultSeconds) })}</p>
                <div className="flex items-center gap-3">
                  <Button
                    variant={micOn ? "default" : "outline"}
                    size="icon"
                    className="h-11 w-11 rounded-full"
                    aria-pressed={micOn}
                    aria-label={micOn ? t("a11y.mute") : t("a11y.unmute")}
                    onClick={() => setMicOn((m) => !m)}
                  >
                    <Mic className="h-5 w-5" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="min-h-11 rounded-full"
                    onClick={() => setPhase("summary")}
                  >
                    <PhoneOff className="me-1 h-4 w-4" aria-hidden="true" /> {t("consult.end")}
                  </Button>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  {t("consult.cameraNote")}
                </p>
              </div>

              {/* voice-note transcript */}
              <div className="max-h-96 space-y-3 overflow-y-auto scroll-thin pe-1" aria-live="polite">
                {CONSULT_SCRIPT.slice(0, visibleTurns).map((turn, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${turn.speaker === "worker" ? "flex-row-reverse" : ""}`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                      {turn.speaker === "doctor" ? selectedDoctor.initials : PERSONA.avatarInitials}
                    </div>
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 ${
                        turn.speaker === "worker" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div className="mb-1.5 flex items-center gap-2 text-xs opacity-80">
                        <Volume2 className="h-3 w-3" aria-hidden="true" />
                        <span>{turn.name}</span>
                        <span>{turn.duration}</span>
                      </div>
                      <Waveform
                        bars={18}
                        active={i === visibleTurns - 1}
                        className="h-4"
                        seed={i + 11}
                        barClassName={turn.speaker === "worker" ? "bg-primary-foreground/70" : "bg-primary/60"}
                      />
                      <p className="mt-2 text-sm leading-relaxed" dir="auto" lang="ur">
                        {turn.urdu}
                      </p>
                      <p className="mt-1 text-xs opacity-75" dir="ltr">
                        {t(turn.text)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Phase 4 — Summary */}
      {phase === "summary" && selectedDoctor && (
        <section aria-labelledby="summary-heading" className="space-y-4">
          <Card className="border-primary/40">
            <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
              <CardTitle id="summary-heading" className="flex items-center gap-2 text-base sm:text-lg">
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                {t("summary.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 pt-2 sm:p-5 sm:pt-2">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: t("summary.doctor"), value: selectedDoctor.name },
                  { label: t("summary.duration"), value: t("summary.duration.value", { time: fmt(consultSeconds) }) },
                  { label: t("summary.cost"), value: t("summary.cost.value") },
                  { label: t("summary.followup"), value: t("summary.followup.value") },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-muted/60 p-3">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-sm font-medium">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-muted/60 p-3">
                <p className="mb-1.5 text-sm font-medium">{t("summary.advice")}</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• {t("summary.advice1")}</li>
                  <li>• {t("summary.advice2")}</li>
                  <li>• {t("summary.advice3")}</li>
                  <li>• {t("summary.advice4")}</li>
                </ul>
              </div>

              <div className="rounded-lg border p-3">
                <p className="mb-1.5 flex items-center gap-2 text-sm font-medium">
                  <Volume2 className="h-4 w-4 text-primary" aria-hidden="true" /> {t("summary.saved")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("summary.saved.detail", { language: langName(selectedDoctor.languages[0]) })}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="min-h-11" onClick={reset}>
                  {t("summary.another")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/70">
            <CardContent className="flex items-start gap-3 p-4 sm:p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                {t("summary.impact", { name: PERSONA.name })}
              </p>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}
