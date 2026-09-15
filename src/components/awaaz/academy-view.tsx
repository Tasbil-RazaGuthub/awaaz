"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useT } from "@/lib/awaaz-store";
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
  const { t } = useT();
  const [picked, setPicked] = useState<number | null>(null);
  const [earned, setEarned] = useState(false);
  const correct = picked === lesson.quiz.correctIndex;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="min-h-11" onClick={onBack}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" /> {t("academy.lessons.back")}
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4 pb-3 sm:p-5 sm:pb-3">
          <CardTitle className="text-base sm:text-lg">{t(lesson.title)}</CardTitle>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Volume2 className="h-3.5 w-3.5" aria-hidden="true" /> {t("academy.audioMeta", { n: lesson.minutes, badge: t(lesson.badge) })}
          </div>
          <div className="mt-2 flex items-center gap-3 rounded-lg bg-primary/5 p-3">
            <Mic className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <Waveform bars={28} active className="h-6 flex-1" seed={17} />
            <span className="text-xs text-muted-foreground">{t("academy.playing", { lang: "اردو" })}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-2 sm:p-5 sm:pt-2">
          <ol className="space-y-3">
            {lesson.steps.map((s) => (
              <li key={s.title} className="rounded-lg bg-muted/60 p-3">
                <p className="text-sm font-medium">{t(s.title)}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(s.detail)}</p>
              </li>
            ))}
          </ol>

          <div className="rounded-xl border p-4">
            <p className="mb-3 flex items-center gap-2 font-medium">
              <Award className="h-5 w-5 text-primary" aria-hidden="true" /> {t("academy.quiz.title")}
            </p>
            <p className="mb-3 text-sm">{t(lesson.quiz.question)}</p>
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
                    {t(opt)}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="mt-3 space-y-2">
                <p className={`text-sm ${correct ? "text-primary" : "text-destructive"}`}>
                  {correct ? `${t("academy.quiz.correct")} ` : `${t("academy.quiz.wrong")} `}
                  <span className="text-muted-foreground">{t(lesson.quiz.explanation)}</span>
                </p>
                {earned && (
                  <div className="flex items-center gap-3 rounded-lg bg-primary/10 p-3 soft-pulse">
                    <Award className="h-6 w-6 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium">{t("academy.quiz.badge", { badge: t(lesson.badge) })}</p>
                      <p className="text-xs text-muted-foreground">{t("academy.quiz.points")}</p>
                    </div>
                  </div>
                )}
                {!earned && (
                  <Button size="sm" variant="outline" className="min-h-11" onClick={() => setPicked(null)}>
                    {t("academy.quiz.tryAgain")}
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
  const { t } = useT();
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
        <h2 className="text-lg font-semibold">{t("academy.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("academy.intro")}
        </p>
      </div>

      <Card>
        <CardContent className="space-y-4 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-chart-2" aria-hidden="true" />
              <p className="text-sm font-medium">{t("academy.streak")}</p>
            </div>
            <Badge variant="secondary">{t("academy.weekly")}</Badge>
          </div>
          <Progress value={62} aria-label={t("a11y.lessonProgress")} />
          <div className="flex flex-wrap gap-2">
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
        </CardContent>
      </Card>

      {/* lessons */}
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {LESSONS.map((l) => (
          <Card key={l.id} className="p-4 transition-colors hover:border-primary/40">
            <button type="button" className="w-full text-start" onClick={() => setOpenLesson(l.id)} aria-label={t("a11y.openLesson", { title: t(l.title) })}>
              <div className="flex items-start justify-between gap-3">
                <GraduationCap className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="font-semibold leading-snug">{t(l.title)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t(l.summary)}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">{t("academy.minutes", { n: l.minutes })}</Badge>
                    <Badge variant="outline">{t("academy.badgeLabel", { badge: t(l.badge) })}</Badge>
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
            <Trophy className="h-5 w-5 text-chart-2" aria-hidden="true" /> {t("academy.leaderboard.title")}
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
                <span className="text-muted-foreground">{t("academy.leaderboard.lessons", { n: row.lessons })}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            {t("academy.leaderboard.note")}
          </p>
        </CardContent>
      </Card>

      {/* eco-health challenge */}
      <Card className="border-chart-3/40">
        <CardContent className="space-y-3 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <TreePine className="h-5 w-5 text-chart-3" aria-hidden="true" />
              <p className="font-medium">{t(ECO_CHALLENGE.title)}</p>
            </div>
            <Badge variant="secondary">{t("academy.eco.badge", { camps: ECO_CHALLENGE.camps, pct: ECO_CHALLENGE.progressPct })}</Badge>
          </div>
          <Progress value={ECO_CHALLENGE.progressPct} aria-label={t("a11y.ecoProgress")} />
          <p className="text-sm text-muted-foreground">
            {t("academy.eco.detail", { joined: joinedEco ? ECO_CHALLENGE.joined + 1 : ECO_CHALLENGE.joined, goal: ECO_CHALLENGE.goal })}
            {" "}{t(ECO_CHALLENGE.treeNote)}.
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
                  <CheckCircle2 className="me-1 h-4 w-4" aria-hidden="true" /> {t("academy.eco.joined")}
                </>
              ) : (
                <>
                  <Footprints className="me-1 h-4 w-4" aria-hidden="true" /> {t("academy.eco.join")}
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
            <PenLine className="h-5 w-5 text-primary" aria-hidden="true" /> {t("academy.civic.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-2 sm:p-5 sm:pt-2">
          {CIVIC_PETITIONS.map((p) => {
            const signed = signedPetitions.includes(p.id);
            const count = signed ? p.signatures + 1 : p.signatures;
            return (
              <div key={p.id} className="rounded-xl border p-4">
                <p className="font-medium">{t(p.title)}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t(p.authority)}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t(p.summary)}</p>
                <div className="mt-3 space-y-2">
                  <Progress value={(count / p.target) * 100} aria-label={t("a11y.petitionProgress", { count, target: p.target })} />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm">
                      <span className="font-semibold">{count.toLocaleString()}</span>
                      <span className="text-muted-foreground"> {t("academy.civic.count", { target: p.target.toLocaleString() })}{signed && ` · ${t("academy.civic.includingYours")}`}</span>
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
                          <CheckCircle2 className="me-1 h-4 w-4" aria-hidden="true" /> {t("academy.civic.signed")}
                        </>
                      ) : (
                        t("academy.civic.sign")
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          <p className="text-xs text-muted-foreground">
            {t("academy.civic.note")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
