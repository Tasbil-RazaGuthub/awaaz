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
import { useLang } from "@/lib/awaaz-store";
import {
  STATS_TILES,
  ALERTS_BY_AREA,
  ROUTING_OUTCOMES,
  CONSULTS_BY_LANGUAGE,
  EARLY_WARNING_SERIES,
  EARLY_WARNING_NOTE,
} from "@/data/stats";
import { BarChart3, ShieldCheck, Megaphone, Landmark } from "lucide-react";

const routingConfig = {
  route: { label: "Routing" },
} satisfies ChartConfig;

const alertsConfig = {
  alerts: { label: "Alerts" },
} satisfies ChartConfig;

const languageConfig = {
  consults: { label: "Consults" },
} satisfies ChartConfig;

const earlyConfig = {
  reports: { label: "Worker voice reports" },
  alert: { label: "Awaaz alert issued" },
  formal: { label: "Formal surveillance confirms" },
} satisfies ChartConfig;

export function DataView() {
  const t = useLang();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">{t.strings.dataTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Anonymized, aggregated numbers — what workers report, how the platform routes them, and what changes in the camps.
          Anyone can cite it; no one can be identified from it.
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="secondary" className="gap-1">
            <ShieldCheck className="h-3 w-3" aria-hidden="true" /> Simulated prototype data
          </Badge>
          <Badge variant="outline">MIT open data — for advocacy, NGOs, and researchers</Badge>
        </div>
      </div>

      {/* stat tiles */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:gap-4">
        {STATS_TILES.map((tile) => (
          <Card key={tile.label} className="p-4">
            <p className="text-xs text-muted-foreground">{tile.label}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-primary">{tile.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{tile.detail}</p>
          </Card>
        ))}
      </div>

      {/* early warning line chart — the flagship story */}
      <Card>
        <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Megaphone className="h-5 w-5 text-primary" aria-hidden="true" />
            Early warning — voice reports vs. alerts vs. formal confirmation
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            The Al Quoz influenza cluster, week by week. Workers&apos; anonymous voice reports cross the detection
            threshold two weeks before formal surveillance confirms the outbreak.
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
                name="Worker voice reports"
              />
              <Line
                type="stepAfter"
                dataKey="alert"
                stroke="var(--color-chart-1)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "var(--color-chart-1)" }}
                name="Awaaz alert issued"
              />
              <Line
                type="stepAfter"
                dataKey="formal"
                stroke="var(--color-chart-4)"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={{ r: 4, fill: "var(--color-chart-4)" }}
                name="Formal surveillance confirms"
              />
            </LineChart>
          </ChartContainer>
          <p className="mt-3 rounded-lg bg-primary/5 p-3 text-sm text-muted-foreground">{EARLY_WARNING_NOTE}</p>
        </CardContent>
      </Card>

      {/* routing outcomes + consults by language */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
            <CardTitle className="text-base sm:text-lg">Where consults are routed</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              46% of cases never need a doctor — and 38% are resolved by voice. Only 1 in 6 needs the clinic, keeping
              in-person slots free.
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
                  {r.route} — {r.value}%
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
            <CardTitle className="text-base sm:text-lg">Voice consults by language</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              The culture-matching engine in practice — care happens in the worker&apos;s own language, not the clinic&apos;s.
            </p>
          </CardHeader>
          <CardContent className="p-4 pt-2 sm:p-5 sm:pt-2">
            <ChartContainer config={languageConfig} className="aspect-auto h-56 w-full">
              <BarChart data={CONSULTS_BY_LANGUAGE} margin={{ left: -28, right: 8, top: 4 }}>
                <XAxis dataKey="language" tickLine={false} axisLine={false} fontSize={13} interval={0} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="consults" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} name="Consults" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* alerts by area */}
      <Card>
        <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
          <CardTitle className="text-base sm:text-lg">Alerts issued by area — this month</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2 sm:p-5 sm:pt-2">
          <ChartContainer config={alertsConfig} className="aspect-auto h-56 w-full">
            <BarChart data={ALERTS_BY_AREA} margin={{ left: -28, right: 8, top: 4 }}>
              <XAxis dataKey="area" tickLine={false} axisLine={false} fontSize={11} interval={0} angle={-18} height={52} textAnchor="end" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="alerts" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} name="Alerts" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* advocacy framing */}
      <Card className="bg-secondary/70">
        <CardContent className="flex items-start gap-4 p-4 sm:p-5">
          <Landmark className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="font-medium">What this page becomes after the prototype</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              The number a workers&apos; welfare attaché cites in a funding meeting; the evidence an NGO attaches to a
              petition on the Academy tab; the open dataset a researcher forks from the repository. Individual
              privacy is protected by aggregation and anonymization — the design documents define exactly what is
              published and what never leaves the device.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
