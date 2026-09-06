"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Waveform } from "./waveform";
import { useLang } from "@/lib/awaaz-store";
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
  const t = useLang();
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
              {t.strings.clinicTitle}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Answer 3 questions by tapping — or say them by voice. The triage decides who needs to be seen and who just needs to be heard.
            </p>
          </div>

          <Card>
            <CardContent className="space-y-4 p-4 sm:p-6">
              {step === 1 && (
                <div className="space-y-3">
                  <p className="font-medium">1 — What is troubling you today?</p>
                  <div className="flex flex-wrap gap-2">
                    {SYMPTOM_OPTIONS.map((o) => (
                      <Chip key={o.id} selected={answers.symptoms.includes(o.id)} onClick={() => setAnswers((a) => ({ ...a, symptoms: toggle(a.symptoms, o.id) }))}>
                        {o.label}
                      </Chip>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mic className="h-4 w-4" aria-hidden="true" /> Or hold the mic and say it in your language
                    </div>
                    <Button className="min-h-11" size="sm" disabled={answers.symptoms.length === 0} onClick={() => setStep(2)}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <p className="font-medium">2 — Since when?</p>
                  <div className="flex flex-wrap gap-2">
                    {DURATION_OPTIONS.map((o) => (
                      <Chip key={o.id} selected={answers.duration === o.id} onClick={() => setAnswers((a) => ({ ...a, duration: o.id }))}>
                        {o.label}
                      </Chip>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="min-h-11" onClick={() => setStep(1)}>
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Back
                    </Button>
                    <Button className="min-h-11" size="sm" disabled={!answers.duration} onClick={() => setStep(3)}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <p className="font-medium">3 — Any of these right now?</p>
                  <div className="flex flex-wrap gap-2">
                    {REDFLAG_OPTIONS.map((o) => (
                      <Chip key={o.id} selected={answers.redflags.includes(o.id)} onClick={() => setAnswers((a) => ({ ...a, redflags: toggle(a.redflags, o.id) }))}>
                        {o.label}
                      </Chip>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="min-h-11" onClick={() => setStep(2)}>
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Back
                    </Button>
                    <Button className="min-h-11" size="sm" disabled={answers.redflags.length === 0} onClick={runTriage}>
                      Get my result
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground">
            Illustrative routing for the prototype — not a clinically validated tool. In production, rules are reviewed by partner clinicians and adapted per WHO guidance.
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
              {result.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-2 sm:p-5 sm:pt-2">
            <p className="text-sm leading-relaxed text-muted-foreground">{result.reason}</p>
            <ul className="space-y-1.5 rounded-lg bg-muted/60 p-3">
              {result.advice.map((a) => (
                <li key={a} className="text-sm">• {a}</li>
              ))}
            </ul>
            <div className="flex gap-2">
              <Button size="sm" className="min-h-11" variant={result.route === "in-person" ? "destructive" : "outline"} onClick={reset}>
                {result.cta}
              </Button>
              <Button size="sm" variant="ghost" className="min-h-11" onClick={reset}>
                Start over
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
                {result.route === "tele-consult" ? "Your voice consult is ready to book" : "Talk to a doctor"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{result.reason}</p>
            </div>
            <Button variant="ghost" size="sm" className="min-h-11 shrink-0" onClick={reset}>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Triage
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Select value={langFilter} onValueChange={setLangFilter}>
              <SelectTrigger className="min-h-11 w-40" aria-label="Filter doctors by language">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any language</SelectItem>
                {["Urdu", "Punjabi", "Bengali", "Hindi", "Pashto", "Arabic", "Nepali"].map((l) => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="min-h-11 w-36" aria-label="Filter doctors by gender">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any doctor</SelectItem>
                <SelectItem value="female">Female doctor</SelectItem>
                <SelectItem value="male">Male doctor</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="ms-auto">
              Culture match = language + district + gender + religion
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
                          <BadgeCheck className="h-3 w-3" aria-hidden="true" /> {d.matchScore}% match
                        </Badge>
                      )}
                      {d.gccBased && <Badge variant="secondary">In-GCC</Badge>}
                      {d.volunteer && <Badge variant="secondary">Volunteer</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {d.specialty} · based in {d.basedIn}
                      {d.homeDistrict === PERSONA.homeDistrict && (
                        <span className="font-medium text-primary"> · from {d.homeDistrict}, your home district</span>
                      )}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {d.languages.map((l) => (
                        <Badge key={l} variant="outline" className="text-xs font-normal">{l}</Badge>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{d.availability}</p>
                  </div>
                  <Button size="sm" className="min-h-11 self-center" onClick={() => { setSelectedDoctor(d); setPhase("consult"); }}>
                    <Mic className="me-1 h-4 w-4" aria-hidden="true" /> Voice consult
                  </Button>
                </div>
              </Card>
            ))}
            {filteredDoctors.length === 0 && (
              <Card className="p-6 text-center text-sm text-muted-foreground">
                No doctors match these filters — try &quot;Any language&quot;.
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Phase 3 — Voice consult */}
      {phase === "consult" && selectedDoctor && (
        <section aria-label="Voice consultation in progress" className="space-y-4">
          <Card className="border-primary/40">
            <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Stethoscope className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold leading-tight">{selectedDoctor.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedDoctor.specialty} · voice consult</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <CircleDollarSign className="h-3 w-3" aria-hidden="true" /> $0.05 / consult
                  </Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Gauge className="h-3 w-3" aria-hidden="true" /> ≈2.3 MB vs ≈26 MB for video
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 p-4 pt-2 sm:p-5 sm:pt-2">
              {/* live waveform + timer */}
              <div className="flex flex-col items-center gap-3 rounded-xl bg-primary/5 p-6">
                <Waveform bars={32} active className="h-12 w-full max-w-xs justify-center" label="live voice waveform" />
                <p className="font-mono text-sm text-muted-foreground">{fmt(consultSeconds)} · connected</p>
                <div className="flex items-center gap-3">
                  <Button
                    variant={micOn ? "default" : "outline"}
                    size="icon"
                    className="h-11 w-11 rounded-full"
                    aria-pressed={micOn}
                    aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
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
                    <PhoneOff className="me-1 h-4 w-4" aria-hidden="true" /> End consult
                  </Button>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Camera stays off by default — modest, low-data, and cheap. Video only if you and the doctor both agree it is needed.
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
                        {turn.english}
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
                Consultation summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 pt-2 sm:p-5 sm:pt-2">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Doctor", value: selectedDoctor.name },
                  { label: "Duration", value: `${fmt(consultSeconds)} (simulated)` },
                  { label: "Cost", value: "$0.05" },
                  { label: "Follow-up", value: "In 3 days" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-muted/60 p-3">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-sm font-medium">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-muted/60 p-3">
                <p className="mb-1.5 text-sm font-medium">Doctor&apos;s advice</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Seasonal influenza — rest and fluids</li>
                  <li>• Paracetamol 500 mg every 6 hours, only if fever above 38°C</li>
                  <li>• Return immediately if chest pain or breathing trouble starts</li>
                  <li>• Wear a mask in shared spaces — your camp has an active flu alert</li>
                </ul>
              </div>

              <div className="rounded-lg border p-3">
                <p className="mb-1.5 flex items-center gap-2 text-sm font-medium">
                  <Volume2 className="h-4 w-4 text-primary" aria-hidden="true" /> Voice notes saved
                </p>
                <p className="text-xs text-muted-foreground">
                  The full consult is saved as audio notes in {selectedDoctor.languages[0]} — replayable in the app or by calling the IVR line.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="min-h-11" onClick={reset}>
                  Book another consult
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/70">
            <CardContent className="flex items-start gap-3 p-4 sm:p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">
                By keeping minor illness on voice, the camp&apos;s in-person slots stayed free for the ones who needed them — the triage result told {PERSONA.name} exactly which path to take, and the dashboard records the routing outcome anonymously.
              </p>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}
