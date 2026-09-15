"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Waveform } from "./waveform";
import { useT } from "@/lib/awaaz-store";
import { CIRCLE_ROOMS, type CircleRoom } from "@/data/circles";
import { useAwaaz } from "@/lib/awaaz-store";
import {
  ChevronLeft,
  ShieldCheck,
  Users,
  Star,
  AudioLines,
  HeartCrack,
  LifeBuoy,
  Hand,
  Phone,
  Volume2,
} from "lucide-react";

function RoomCard({ room, onOpen }: { room: CircleRoom; onOpen: () => void }) {
  const { t, langName } = useT();
  return (
    <Card className="p-4 transition-colors hover:border-primary/40">
      <button type="button" onClick={onOpen} className="w-full text-start" aria-label={t("a11y.openRoom", { name: t(room.name) })}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold">{t(room.name)}</p>
              {room.live && (
                <Badge className="gap-1.5 bg-destructive/90 text-white">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                  {t("circles.live", { n: room.speakingNow })}
                </Badge>
              )}
              {room.privacy === "anonymous" && <Badge variant="secondary">{t("circles.anonymous")}</Badge>}
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground" dir="auto">
              {room.nativeName}
            </p>
            <p className="mt-1.5 text-sm">{t(room.topic)}</p>
            <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
              {room.languages.map((l) => (
                <Badge key={l} variant="outline" className="font-normal">{langName(l)}</Badge>
              ))}
              <span className="inline-flex items-center gap-1 py-0.5 text-muted-foreground">
                <Users className="h-3 w-3" aria-hidden="true" /> {room.members}
              </span>
            </div>
          </div>
          <AudioLines className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        </div>
      </button>
    </Card>
  );
}

function RoomView({ room, onBack }: { room: CircleRoom; onBack: () => void }) {
  const { t, langName } = useT();
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    if (!playingId) return;
    const stop = setTimeout(() => setPlayingId(null), 4000);
    return () => clearTimeout(stop);
  }, [playingId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="min-h-11" onClick={onBack}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" /> {t("circles.room.back")}
        </Button>
      </div>

      {/* Escalation banner — always visible, always one tap */}
      <div
        className="flex flex-wrap items-center gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4"
        role="alert"
      >
        <LifeBuoy className="h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
        <p className="min-w-0 flex-1 text-sm">
          <span className="font-medium">{t("circles.escalation.1")}</span>{" "}
          <span className="text-muted-foreground">{t("circles.escalation.2")}</span>
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="destructive" className="min-h-11">
            <Phone className="me-1 h-4 w-4" aria-hidden="true" /> {t("circles.escalation.cta")}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4 pb-3 sm:p-5 sm:pb-3">
          <CardTitle className="text-base sm:text-lg">
            {t(room.name)}
            <span className="mt-1 block text-sm font-normal text-muted-foreground" dir="auto">
              {room.nativeName}
            </span>
          </CardTitle>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" />
              {t("circles.moderator", { name: t(room.moderator) })}
            </Badge>
            {room.live && (
              <Badge className="gap-1.5 bg-destructive/90 text-white">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" /> {t("circles.liveTag")}
              </Badge>
            )}
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Users className="h-3 w-3" aria-hidden="true" /> {t("circles.members", { n: room.members })}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-4 pt-2 sm:p-5 sm:pt-2">
          {/* safe-by-design chips */}
          <div className="flex flex-wrap gap-1.5">
            {[
              t("circles.safety.voiceOnly"),
              t("circles.safety.noDm"),
              t("circles.safety.noImages"),
              t("circles.safety.noVideo"),
              t("circles.safety.moderated"),
              t("circles.safety.escalation"),
            ].map((c) => (
              <Badge key={c} variant="outline" className="gap-1 text-xs font-normal">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" /> {c}
              </Badge>
            ))}
          </div>

          {room.messages.length > 0 ? (
            <div className="max-h-96 space-y-3 overflow-y-auto scroll-thin pe-1" aria-label={t("a11y.roomConversation")}>
              {room.messages.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPlayingId(playingId === m.id ? null : m.id)}
                  className="flex w-full gap-3 rounded-xl p-2 text-start transition-colors hover:bg-muted/60"
                  aria-label={t("a11y.playNote", { speaker: m.speaker, duration: m.duration })}
                >
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
                    {m.speaker.charAt(0)}
                    {m.role === "moderator" && (
                      <Star className="absolute -bottom-0.5 -end-0.5 h-4 w-4 rounded-full bg-background fill-chart-2 text-chart-2" aria-hidden="true" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className={m.role === "moderator" ? "font-semibold text-chart-2" : "font-medium text-foreground"}>
                        {m.speaker}
                      </span>
                      {m.role === "moderator" && <Badge variant="secondary" className="text-[10px]">{t("circles.modTag")}</Badge>}
                      <span>{langName(m.language)}</span>
                      <span>{m.duration}</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-3">
                      <Waveform
                        bars={22}
                        active={playingId === m.id}
                        className="h-7 w-36 shrink-0"
                        seed={m.id.length + 5}
                        label={t("a11y.waveform")}
                      />
                      <span className="text-xs text-primary">
                        {playingId === m.id ? t("circles.playing") : t("circles.tapToPlay")}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed" dir="auto">{m.native}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{t(m.text)}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground">
              <HeartCrack className="h-5 w-5 shrink-0" aria-hidden="true" />
              {t("circles.quiet")}
            </div>
          )}

          {/* participation bar */}
          <div className="flex items-center justify-between gap-3 rounded-xl border p-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-full" aria-label={t("a11y.raiseHand")}>
                <Hand className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button variant="default" size="icon" className="h-11 w-11 rounded-full" aria-label={t("a11y.speak")}>
                <Volume2 className="h-5 w-5" aria-hidden="true" />
              </Button>
              <p className="text-xs text-muted-foreground">
                {room.live ? t("circles.listening") : t("circles.roomOpens")}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="min-h-11" onClick={onBack}>
              {t("circles.leave")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        {t("circles.footer")}
      </p>
    </div>
  );
}

export function CirclesView() {
  const { t } = useT();
  const setTab = useAwaaz((s) => s.setTab);
  const [openRoom, setOpenRoom] = useState<string | null>(null);
  const room = CIRCLE_ROOMS.find((r) => r.id === openRoom);

  if (room) {
    return <RoomView room={room} onBack={() => setOpenRoom(null)} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">{t("circles.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("circles.intro")}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {CIRCLE_ROOMS.map((r) => (
          <RoomCard key={r.id} room={r} onOpen={() => { setOpenRoom(r.id); setTab("circles"); }} />
        ))}
      </div>

      <Card className="bg-secondary/70">
        <CardContent className="flex items-start gap-3 p-4 sm:p-5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            {t("circles.whyAudio")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
