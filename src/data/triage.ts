export interface TriageOption {
  id: string;
  label: string;
}

export const SYMPTOM_OPTIONS: TriageOption[] = [
  { id: "fever", label: "Fever" },
  { id: "cough", label: "Cough" },
  { id: "headache", label: "Headache" },
  { id: "sore-throat", label: "Sore throat" },
  { id: "body-aches", label: "Body aches" },
  { id: "rash", label: "Skin rash" },
];

export const DURATION_OPTIONS: TriageOption[] = [
  { id: "today", label: "Started today" },
  { id: "short", label: "1–2 days" },
  { id: "week", label: "3–7 days" },
  { id: "long", label: "More than a week" },
];

export const REDFLAG_OPTIONS: TriageOption[] = [
  { id: "chest-pain", label: "Chest pain or pressure" },
  { id: "breathing", label: "Difficulty breathing" },
  { id: "fainting", label: "Fainting or collapse" },
  { id: "none", label: "None of these" },
];

export type TriageRoute = "self-care" | "tele-consult" | "in-person";

export interface TriageResult {
  route: TriageRoute;
  title: string;
  reason: string;
  color: "teal" | "amber" | "red";
  advice: string[];
  cta: string;
}

export function evaluateTriage(symptoms: string[], duration: string, redflags: string[]): TriageResult {
  const has = (id: string) => symptoms.includes(id);
  const redflagged = redflags.some((r) => r !== "none" && r !== "");
  const infectious = has("fever") || has("cough") || has("sore-throat") || has("body-aches");

  if (redflagged) {
    return {
      route: "in-person",
      title: "Seek in-person care NOW",
      reason:
        "Your answers include a warning sign (chest pain, breathing difficulty, or fainting). Voice advice is not enough for this — a doctor must examine you.",
      color: "red",
      advice: [
        "Go to your camp clinic or the nearest emergency room immediately",
        "Ambulance in the UAE: 998 — say it in Urdu if you need to",
        "Do not continue working today",
      ],
      cta: "Show clinic directions",
    };
  }

  if (infectious && (duration === "week" || duration === "long")) {
    return {
      route: "in-person",
      title: "See a doctor in person",
      reason: "Fever or cough lasting more than 3 days should be examined and possibly tested.",
      color: "red",
      advice: [
        "Book the next slot at your camp clinic",
        "Wear a mask on the way",
        "A voice consult can help while you wait",
      ],
      cta: "Show clinic directions",
    };
  }

  if (infectious && (duration === "today" || duration === "short")) {
    return {
      route: "tele-consult",
      title: "A voice consult is recommended",
      reason:
        "Fever with cough for under 3 days, and no warning signs. A doctor who speaks your language should hear your voice — no in-person slot needed, so it stays free for someone who does need it.",
      color: "teal",
      advice: [
        "Matched doctors are available today",
        "Cost: about $0.05 — audio only, low data",
        "If new chest pain or breathing trouble starts, go in person immediately",
      ],
      cta: "Find my doctor",
    };
  }

  return {
    route: "self-care",
    title: "Self-care for today",
    reason:
      "Mild symptoms with no warning signs. Rest today, and check in again tomorrow — the camp has a flu alert active, so keep watching for fever.",
    color: "amber",
    advice: [
      "Rest and drink water",
      "Report again tomorrow — 30 seconds by voice",
      "Wear a mask in shared spaces while the flu alert is active",
    ],
    cta: "Back to home",
  };
}
