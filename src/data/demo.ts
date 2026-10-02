import { ALERTS, type HealthAlert } from "./persona-alerts";
import { DOCTORS, type Doctor } from "./doctors";

/**
 * App Demonstration — data for the guided judge walkthrough.
 *
 * The demo reuses the app's live mock data wherever possible (alerts,
 * symptom chips, doctor matching, Academy content) so the walkthrough
 * always shows the same thing the real tabs show. Demo-only annotations
 * (alert sources, the AI draft, the moderator) are illustrative, like
 * the rest of the prototype.
 */

/** Which of the app's live alerts the demonstration walks through (same data as the Home tab). */
export const DEMO_ALERTS: HealthAlert[] = ALERTS.filter((a) => a.id === "a1" || a.id === "a2");

/** The provenance rows shown under each demo alert — individual, NGO, and government. */
export type DemoSourceId = "individual" | "ngo" | "government";

export interface DemoSourceRow {
  id: DemoSourceId;
  /** i18n key */
  label: string;
}

export const DEMO_SOURCE_ROWS: DemoSourceRow[] = [
  { id: "individual", label: "demo.src.individual" },
  { id: "ngo", label: "demo.src.ngo" },
  { id: "government", label: "demo.src.government" },
];

/** Per-alert government advisory note (i18n key). */
export const DEMO_GOV_NOTE: Record<string, string> = {
  a1: "demo.src.gov.a1",
  a2: "demo.src.gov.a2",
};

/** The human moderator who reviews the AI's draft before anything reaches the worker. */
export const DEMO_MODERATOR = {
  name: "Fatima Sheikh",
  initials: "FS",
  /** i18n key */
  role: "demo.mod.role",
  reviewMinutes: 4,
};

/** Care paths offered once the AI draft is approved — the same three routes the Clinic triage produces. */
export type DemoCareId = "self" | "online" | "inperson";

export interface DemoCareOption {
  id: DemoCareId;
  /** i18n key */
  label: string;
  /** i18n key */
  hint: string;
}

export const DEMO_CARE_OPTIONS: DemoCareOption[] = [
  { id: "self", label: "demo.s3.care.self", hint: "demo.s3.care.self.hint" },
  { id: "online", label: "demo.s3.care.online", hint: "demo.s3.care.online.hint" },
  { id: "inperson", label: "demo.s3.care.inperson", hint: "demo.s3.care.inperson.hint" },
];

/** The doctor the "online appointment" path matches to — the top match from the Clinic tab's list. */
export const DEMO_DOCTOR: Doctor = DOCTORS[0];

/**
 * Deterministic mock AI analysis for the selected symptom i18n keys.
 * Returns the i18n key of the draft the "AI" produces for this report.
 */
export function demoAiSummary(selected: string[]): string {
  const has = (k: string) => selected.includes(k);
  if (has("sym.feelFine")) return "demo.ai.fine";
  if (has("sym.heatExhaustion") || has("sym.dizziness")) return "demo.ai.heat";
  if (
    has("sym.fever") ||
    has("sym.cough") ||
    has("sym.soreThroat") ||
    has("sym.bodyAches") ||
    has("sym.headache")
  ) {
    return "demo.ai.flu";
  }
  return "demo.ai.other";
}
