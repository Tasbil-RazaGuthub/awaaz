"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useT } from "@/lib/awaaz-store";
import {
  STATS_TILES,
  ALERTS_BY_AREA,
  ROUTING_OUTCOMES,
  CONSULTS_BY_LANGUAGE,
  EARLY_WARNING_SERIES,
  EARLY_WARNING_NOTE,
} from "@/data/stats";
import { BarChart3, ShieldCheck, Megaphone, Landmark } from "lucide-react";

export function DataView() {
  const { t } = useT();

  const routingConfig = {
    route: { label: t("data.series.routing") },
  } satisfies ChartConfig;

  const alertsConfig = {
    alerts: { label: t("data.series.alerts") },
  } satisfies ChartConfig;

  const languageConfig = {
    consults: { label: t("data.series.consults") },
  } satisfies ChartConfig;

  const earlyConfig = {
    reports: { label: t("data.early.legend1") },
    alert: { label: t("data.early.legend2") },
    formal: { label: t("data.early.legend3") },
  } satisfies ChartConfig;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">{t("data.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("data.intro")}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="secondary" className="gap-1">
            <ShieldCheck className="h-3 w-3" aria-hidden="true" /> {t("data.badge1")}
          </Badge>
          <Badge variant="outline">{t("data.badge2")}</Badge>
        </div>
      </div>

      {/* stat tiles */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:gap-4">
        {STATS_TILES.map((tile) => (
          <Card key={tile.label} className="p-4">
            <p className="text-xs text-muted-foreground">{t(tile.label)}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-primary">{tile.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{t(tile.detail)}</p>
          </Card>
        ))}
      </div>

      {/* early warning line chart — the flagship story */}
      <Card>
        <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Megaphone className="h-5 w-5 text-primary" aria-hidden="true" />
            {t("data.early.title")}
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("data.early.desc")}
          </p>
        </CardHeader>
        <CardContent className="p-4 pt-2 sm:p-5 sm:pt-2">
          <ChartContainer config={earlyConfig} className="aspect-auto h-64 w-full">
            <LineChart data={EARLY_WARNING_SERIES} margin={{ left: -20, right: 12, top: 8 }}>
              <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="reports"
                stroke="var(--color-chart-2)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--color-chart-2)" }}
                name={t("data.early.legend1")}
              />
              <Line
                type="stepAfter"
                dataKey="alert"
                stroke="var(--color-chart-1)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "var(--color-chart-1)" }}
                name={t("data.early.legend2")}
              />
              <Line
                type="stepAfter"
                dataKey="formal"
                stroke="var(--color-chart-4)"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={{ r: 4, fill: "var(--color-chart-4)" }}
                name={t("data.early.legend3")}
              />
            </LineChart>
          </ChartContainer>
          <p className="mt-3 rounded-lg bg-primary/5 p-3 text-sm text-muted-foreground">{t(EARLY_WARNING_NOTE)}</p>
        </CardContent>
      </Card>

      {/* routing outcomes + consults by language */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
            <CardTitle className="text-base sm:text-lg">{t("data.routing.title")}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("data.routing.desc")}
            </p>
          </CardHeader>
          <CardContent className="p-4 pt-2 sm:p-5 sm:pt-2">
            <ChartContainer config={routingConfig} className="mx-auto aspect-auto h-56 max-w-xs">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie data={ROUTING_OUTCOMES} dataKey="value" nameKey="route" innerRadius={55} outerRadius={85} paddingAngle={4} strokeWidth={0}>
                  {ROUTING_OUTCOMES.map((entry) => (
                    <Cell key={entry.route} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
              {ROUTING_OUTCOMES.map((r) => (
                <li key={r.route} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.fill }} aria-hidden="true" />
                  {t("data.routing.legendItem", { route: t(r.route), value: r.value })}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
            <CardTitle className="text-base sm:text-lg">{t("data.bylang.title")}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("data.bylang.desc")}
            </p>
          </CardHeader>
          <CardContent className="p-4 pt-2 sm:p-5 sm:pt-2">
            <ChartContainer config={languageConfig} className="aspect-auto h-56 w-full">
              <BarChart data={CONSULTS_BY_LANGUAGE} margin={{ left: -28, right: 8, top: 4 }}>
                <XAxis dataKey="language" tickLine={false} axisLine={false} fontSize={13} interval={0} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="consults" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} name={t("data.series.consults")} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* alerts by area */}
      <Card>
        <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
          <CardTitle className="text-base sm:text-lg">{t("data.byarea.title")}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2 sm:p-5 sm:pt-2">
          <ChartContainer config={alertsConfig} className="aspect-auto h-56 w-full">
            <BarChart data={ALERTS_BY_AREA} margin={{ left: -28, right: 8, top: 4 }}>
              <XAxis dataKey="area" tickLine={false} axisLine={false} fontSize={11} interval={0} angle={-18} height={52} textAnchor="end" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="alerts" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} name={t("data.series.alerts")} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* advocacy framing */}
      <Card className="bg-secondary/70">
        <CardContent className="flex items-start gap-4 p-4 sm:p-5">
          <Landmark className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="font-medium">{t("data.advocacy.title")}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {t("data.advocacy.body")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
