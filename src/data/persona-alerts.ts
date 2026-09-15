export interface Persona {
  name: string;
  age: number;
  job: string;
  homeDistrict: string;
  homeCountry: string;
  camp: string;
  city: string;
  country: string;
  languages: string[];
  avatarInitials: string;
}

export const PERSONA: Persona = {
  name: "Imran Yousuf",
  age: 34,
  job: "Scaffold erector",
  homeDistrict: "Gujranwala",
  homeCountry: "Pakistan",
  camp: "Al Quoz Labour Accommodation, Block B",
  city: "Dubai",
  country: "UAE",
  languages: ["Urdu", "Punjabi"],
  avatarInitials: "IY",
};

export type Severity = "high" | "medium" | "low";

export interface HealthAlert {
  id: string;
  type: "outbreak" | "occupational" | "environmental" | "seasonal";
  severity: Severity;
  /** i18n key for the alert title */
  title: string;
  area: string;
  /** i18n key for the alert summary */
  summary: string;
  /** i18n keys for the recommended actions */
  actions: string[];
  /** i18n key for "issued X ago" (e.g. time.ago.2d) */
  issuedAgo: string;
  verifiedClinics: number;
  reportsCount: number;
  workersReached: number;
}

export const ALERTS: HealthAlert[] = [
  {
    id: "a1",
    type: "outbreak",
    severity: "high",
    title: "home.alert1.title",
    area: "Al Quoz 3, Dubai",
    summary: "home.alert1.summary",
    actions: ["home.alert1.action1", "home.alert1.action2", "home.alert1.action3"],
    issuedAgo: "time.ago.2d",
    verifiedClinics: 12,
    reportsCount: 47,
    workersReached: 8300,
  },
  {
    id: "a2",
    type: "occupational",
    severity: "high",
    title: "home.alert2.title",
    area: "Sharjah Industrial Area 4",
    summary: "home.alert2.summary",
    actions: ["home.alert2.action1", "home.alert2.action2", "home.alert2.action3"],
    issuedAgo: "time.ago.6h",
    verifiedClinics: 5,
    reportsCount: 31,
    workersReached: 5100,
  },
  {
    id: "a3",
    type: "environmental",
    severity: "medium",
    title: "home.alert3.title",
    area: "All Dubai industrial zones",
    summary: "home.alert3.summary",
    actions: ["home.alert3.action1", "home.alert3.action2"],
    issuedAgo: "time.ago.3h",
    verifiedClinics: 2,
    reportsCount: 12,
    workersReached: 12400,
  },
  {
    id: "a4",
    type: "seasonal",
    severity: "low",
    title: "home.alert4.title",
    area: "Al Quoz family housing",
    summary: "home.alert4.summary",
    actions: ["home.alert4.action1", "home.alert4.action2"],
    issuedAgo: "time.ago.1d",
    verifiedClinics: 1,
    reportsCount: 4,
    workersReached: 1800,
  },
];

/** i18n keys for the symptom report chips (Home) */
export const SYMPTOM_REPORT_OPTIONS = [
  "sym.fever",
  "sym.cough",
  "sym.headache",
  "sym.soreThroat",
  "sym.bodyAches",
  "sym.heatExhaustion",
  "sym.dizziness",
  "sym.feelFine",
];
