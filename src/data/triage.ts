export interface TriageOption {
  id: string;
  /** i18n key for the chip label */
  key: string;
}

export const SYMPTOM_OPTIONS: TriageOption[] = [
  { id: "fever", key: "sym.fever" },
  { id: "cough", key: "sym.cough" },
  { id: "headache", key: "sym.headache" },
  { id: "sore-throat", key: "sym.soreThroat" },
  { id: "body-aches", key: "sym.bodyAches" },
  { id: "rash", key: "sym.rash" },
];

export const DURATION_OPTIONS: TriageOption[] = [
  { id: "today", key: "dur.today" },
  { id: "short", key: "dur.short" },
  { id: "week", key: "dur.week" },
  { id: "long", key: "dur.long" },
];

export const REDFLAG_OPTIONS: TriageOption[] = [
  { id: "chest-pain", key: "rf.chest" },
  { id: "breathing", key: "rf.breathing" },
  { id: "fainting", key: "rf.fainting" },
  { id: "none", key: "rf.none" },
];

export type TriageRoute = "self-care" | "tele-consult" | "in-person";

export interface TriageResult {
  route: TriageRoute;
  /** i18n key */
  title: string;
  /** i18n key */
  reason: string;
  color: "teal" | "amber" | "red";
  /** i18n keys */
  advice: string[];
  /** i18n key */
  cta: string;
}

export function evaluateTriage(symptoms: string[], duration: string, redflags: string[]): TriageResult {
  const has = (id: string) => symptoms.includes(id);
  const redflagged = redflags.some((r) => r !== "none" && r !== "");
  const infectious = has("fever") || has("cough") || has("sore-throat") || has("body-aches");

  if (redflagged) {
    return {
      route: "in-person",
      title: "triage.red.title",
      reason: "triage.red.reason",
      color: "red",
      advice: ["triage.red.advice1", "triage.red.advice2", "triage.red.advice3"],
      cta: "triage.red.cta",
    };
  }

  if (infectious && (duration === "week" || duration === "long")) {
    return {
      route: "in-person",
      title: "triage.long.title",
      reason: "triage.long.reason",
      color: "red",
      advice: ["triage.long.advice1", "triage.long.advice2", "triage.long.advice3"],
      cta: "triage.long.cta",
    };
  }

  if (infectious && (duration === "today" || duration === "short")) {
    return {
      route: "tele-consult",
      title: "triage.tele.title",
      reason: "triage.tele.reason",
      color: "teal",
      advice: ["triage.tele.advice1", "triage.tele.advice2", "triage.tele.advice3"],
      cta: "triage.tele.cta",
    };
  }

  return {
    route: "self-care",
    title: "triage.self.title",
    reason: "triage.self.reason",
    color: "amber",
    advice: ["triage.self.advice1", "triage.self.advice2", "triage.self.advice3"],
    cta: "triage.self.cta",
  };
}
