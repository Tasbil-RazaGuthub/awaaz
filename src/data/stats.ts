export const STATS_TILES = [
  { label: "Voice consults this month", value: "9,412", detail: "across 6 GCC countries" },
  { label: "Workers reached by alerts", value: "38,210", detail: "in 8 languages" },
  { label: "Clinic-verified alerts", value: "12", detail: "confirmed by partner clinics" },
  { label: "Average consult cost", value: "$0.05", detail: "audio-only, low data" },
];

export const ALERTS_BY_AREA = [
  { area: "Al Quoz (Dubai)", alerts: 12 },
  { area: "Sonapur (Dubai)", alerts: 9 },
  { area: "Musaffah (Abu Dhabi)", alerts: 8 },
  { area: "Industrial Area 4 (Sharjah)", alerts: 15 },
  { area: "Labour City (Doha)", alerts: 10 },
];

export const ROUTING_OUTCOMES = [
  { route: "Self-care", value: 46, fill: "var(--color-chart-1)" },
  { route: "Voice consult", value: 38, fill: "var(--color-chart-2)" },
  { route: "In-person referral", value: 16, fill: "var(--color-chart-4)" },
];

export const CONSULTS_BY_LANGUAGE = [
  { language: "اردو", consults: 3577 },
  { language: "हिन्दी", consults: 2259 },
  { language: "বাংলা", consults: 1412 },
  { language: "العربية", consults: 847 },
  { language: "پنجابی", consults: 565 },
  { language: "नेपाली", consults: 376 },
  { language: "پښتو", consults: 188 },
  { language: "سنڌي", consults: 188 },
];

export const EARLY_WARNING_SERIES = [
  { week: "W1", reports: 40, alert: 0, formal: 0 },
  { week: "W2", reports: 68, alert: 0, formal: 0 },
  { week: "W3", reports: 120, alert: 1, formal: 0 },
  { week: "W4", reports: 210, alert: 1, formal: 0 },
  { week: "W5", reports: 340, alert: 1, formal: 1 },
  { week: "W6", reports: 300, alert: 1, formal: 1 },
];

export const EARLY_WARNING_NOTE =
  "Awaaz flagged the Al Quoz influenza cluster from worker voice reports in week 3. Formal surveillance confirmed it in week 5 — two weeks later. During those two weeks, 8,300 workers received masks and hydration guidance.";
