"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLang } from "@/lib/awaaz-store";
import { LESSONS, BADGES, CAMP_LEADERBOARD, ECO_CHALLENGE, CIVIC_PETITIONS, type Lesson } from "@/data/academy";
import { Waveform } from "./waveform";
import {
  GraduationCap,
  Flame,
  Award,
  Trophy,
  TreePine,
  PenLine,
  ChevronLeft,
  Mic,
  CheckCircle2,
  Footprints,
  Volume2,
} from "lucide-react";

function LessonDetail({ lesson, onBack }: { lesson: Lesson; onBack: () => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [earned, setEarned] = useState(false);
  const correct = picked === lesson.quiz.correctIndex;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="min-h-11" onClick={onBack}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Lessons
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4 pb-3 sm:p-5 sm:pb-3">
          <CardTitle className="text-base sm:text-lg">{lesson.title}</CardTitle>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Volume2 className="h-3.5 w-3.5" aria-hidden="true" /> Audio-first · {lesson.minutes} min · badge: {lesson.badge}
          </div>
          <div className="mt-2 flex items-center gap-3 rounded-lg bg-primary/5 p-3">
            <Mic className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <Waveform bars={28} active className="h-6 flex-1" seed={17} />
            <span className="text-xs text-muted-foreground">playing in اردو · 1:12</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-2 sm:p-5 sm:pt-2">
          <ol className="space-y-3">
            {lesson.steps.map((s) => (
              <li key={s.title} className="rounded-lg bg-muted/60 p-3">
                <p className="text-sm font-medium">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
              </li>
            ))}
          </ol>

          <div className="rounded-xl border p-4">
            <p className="mb-3 flex items-center gap-2 font-medium">
              <Award className="h-5 w-5 text-primary" aria-hidden="true" /> Check your reflexes
            </p>
            <p className="mb-3 text-sm">{lesson.quiz.question}</p>
            <div className="space-y-2">
              {lesson.quiz.options.map((opt, i) => {
                const state =
                  picked === null
                    ? "idle"
                    : i === lesson.quiz.correctIndex
                      ? "correct"
                      : i === picked
                        ? "wrong"
                        : "dimmed";
                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={picked !== null}
                    onClick={() => { setPicked(i); if (i === lesson.quiz.correctIndex) setEarned(true); }}
                    className={`w-full rounded-lg border p-3 text-start text-sm transition-colors ${
                      state === "correct"
                        ? "border-primary bg-primary/10"
                        : state === "wrong"
                          ? "border-destructive/50 bg-destructive/10"
                          : state === "dimmed"
                            ? "opacity-50"
                            : "hover:bg-muted"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="mt-3 space-y-2">
                <p className={`text-sm ${correct ? "text-primary" : "text-destructive"}`}>
                  {correct ? "Correct — " : "Not quite — "}
                  <span className="text-muted-foreground">{lesson.quiz.explanation}</span>
                </p>
                {earned && (
                  <div className="flex items-center gap-3 rounded-lg bg-primary/10 p-3 soft-pulse">
                    <Award className="h-6 w-6 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium">Badge earned: {lesson.badge}</p>
                      <p className="text-xs text-muted-foreground">Your camp leaderboard just gained points.</p>
                    </div>
                  </div>
                )}
                {!earned && (
                  <Button size="sm" variant="outline" className="min-h-11" onClick={() => setPicked(null)}>
                    Try again
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AcademyView() {
  const t = useLang();
  const [openLesson, setOpenLesson] = useState<string | null>(null);
  const [signedPetitions, setSignedPetitions] = useState<string[]>([]);
  const [joinedEco, setJoinedEco] = useState(false);
  const lesson = LESSONS.find((l) => l.id === openLesson);

  if (lesson) {
    return <LessonDetail lesson={lesson} onBack={() => setOpenLesson(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* streak + badges header */}
      <div>
        <h2 className="text-lg font-semibold">{t.strings.academyTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Bite-sized voice lessons in your language — first aid, heat, hygiene, medication safety. Badges feed your camp&apos;s leaderboard.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-4 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-chart-2" aria-hidden="true" />
              <p className="text-sm font-medium">7-day streak</p>
            </div>
            <Badge variant="secondary">5 of 8 lessons this week</Badge>
          </div>
          <Progress value={62} aria-label="weekly lesson progress" />
          <div className="flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <Badge
                key={b.id}
                variant={b.earned ? "default" : "outline"}
                className={`gap-1 ${b.earned ? "" : "opacity-50"}`}
              >
                <Award className="h-3 w-3" aria-hidden="true" />
                {b.label}
                {!b.earned && " · locked"}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* lessons */}
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {LESSONS.map((l) => (
          <Card key={l.id} className="p-4 transition-colors hover:border-primary/40">
            <button type="button" className="w-full text-start" onClick={() => setOpenLesson(l.id)} aria-label={`Open lesson ${l.title}`}>
              <div className="flex items-start justify-between gap-3">
                <GraduationCap className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="font-semibold leading-snug">{l.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{l.summary}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">{l.minutes} min</Badge>
                    <Badge variant="outline">Badge: {l.badge}</Badge>
                  </div>
                </div>
              </div>
            </button>
          </Card>
        ))}
      </div>

      {/* camp leaderboard */}
      <Card>
        <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Trophy className="h-5 w-5 text-chart-2" aria-hidden="true" /> Camp leaderboard — this week
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2 sm:p-5 sm:pt-2">
          <ul className="space-y-2">
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
                <span className="text-muted-foreground">{row.lessons} lessons</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Diaspora-sponsored prizes go to the top camp each month — last month: cricket gear for Sonapur.
          </p>
        </CardContent>
      </Card>

      {/* eco-health challenge */}
      <Card className="border-chart-3/40">
        <CardContent className="space-y-3 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <TreePine className="h-5 w-5 text-chart-3" aria-hidden="true" />
              <p className="font-medium">{ECO_CHALLENGE.title}</p>
            </div>
            <Badge variant="secondary">{ECO_CHALLENGE.camps} camps · {ECO_CHALLENGE.progressPct}% to goal</Badge>
          </div>
          <Progress value={ECO_CHALLENGE.progressPct} aria-label="eco challenge progress" />
          <p className="text-sm text-muted-foreground">
            {joinedEco ? ECO_CHALLENGE.joined + 1 : ECO_CHALLENGE.joined} of {ECO_CHALLENGE.goal} workers walking to site this week instead of taking the bus.
            {ECO_CHALLENGE.treeNote}.
          </p>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="min-h-11"
              variant={joinedEco ? "outline" : "default"}
              onClick={() => setJoinedEco((j) => !j)}
              disabled={joinedEco}
            >
              {joinedEco ? (
                <>
                  <CheckCircle2 className="me-1 h-4 w-4" aria-hidden="true" /> Joined — see you at 05:30
                </>
              ) : (
                <>
                  <Footprints className="me-1 h-4 w-4" aria-hidden="true" /> Join the challenge
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* civic advocacy */}
      <Card>
        <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <PenLine className="h-5 w-5 text-primary" aria-hidden="true" /> Raise your voice — civic actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-2 sm:p-5 sm:pt-2">
          {CIVIC_PETITIONS.map((p) => {
            const signed = signedPetitions.includes(p.id);
            const count = signed ? p.signatures + 1 : p.signatures;
            return (
              <div key={p.id} className="rounded-xl border p-4">
                <p className="font-medium">{p.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{p.authority}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                <div className="mt-3 space-y-2">
                  <Progress value={(count / p.target) * 100} aria-label={`petition progress ${count} of ${p.target}`} />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm">
                      <span className="font-semibold">{count.toLocaleString()}</span>
                      <span className="text-muted-foreground"> of {p.target.toLocaleString()} signatures {signed && "· including yours"}</span>
                    </p>
                    <Button
                      size="sm"
                      className="min-h-11"
                      variant={signed ? "outline" : "default"}
                      onClick={() => setSignedPetitions((prev) => [...prev, p.id])}
                      disabled={signed}
                    >
                      {signed ? (
                        <>
                          <CheckCircle2 className="me-1 h-4 w-4" aria-hidden="true" /> Signed
                        </>
                      ) : (
                        "Add my name"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          <p className="text-xs text-muted-foreground">
            Petitions are delivered monthly through partner NGOs and the workers&apos; welfare attaché — the same channel,
            backed by the anonymous numbers on the Data tab.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
