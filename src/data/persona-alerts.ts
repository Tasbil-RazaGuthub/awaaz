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
  title: string;
  area: string;
  summary: string;
  actions: string[];
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
    title: "Influenza cluster — Al Quoz camps",
    area: "Al Quoz 3, Dubai",
    summary:
      "Respiratory illness up 340% in 10 days. 47 workers have reported fever and cough from your block. Lab samples from 3 camps confirm seasonal influenza A.",
    actions: [
      "Wear a mask in shared areas and on the bus",
      "Report fever today — 2 minutes by voice",
      "Hydrate and rest; see a doctor if fever lasts over 2 days",
    ],
    issuedAgo: "2 days ago",
    verifiedClinics: 12,
    reportsCount: 47,
    workersReached: 8300,
  },
  {
    id: "a2",
    type: "occupational",
    severity: "high",
    title: "Heatwave — 46°C expected",
    area: "Sharjah Industrial Area 4",
    summary:
      "Midday work ban extended to 10:30–16:00. Heat exhaustion cases up 180% this week among outdoor workers.",
    actions: [
      "Water every 20 minutes — 250 ml",
      "Know the heatstroke signs: confusion, no sweating, hot dry skin",
      "Report dizziness immediately — don't wait",
    ],
    issuedAgo: "6 hours ago",
    verifiedClinics: 5,
    reportsCount: 31,
    workersReached: 5100,
  },
  {
    id: "a3",
    type: "environmental",
    severity: "medium",
    title: "Dust storm advisory",
    area: "All Dubai industrial zones",
    summary:
      "Air quality is 'unhealthy' today. Workers with asthma or a persistent cough should limit outdoor exposure and carry inhalers.",
    actions: ["Wear a mask outdoors", "Asthmatic? Take your inhaler before shift"],
    issuedAgo: "3 hours ago",
    verifiedClinics: 2,
    reportsCount: 12,
    workersReached: 12400,
  },
  {
    id: "a4",
    type: "seasonal",
    severity: "low",
    title: "Hand, foot & mouth near your block",
    area: "Al Quoz family housing",
    summary:
      "Mild cases reported among children in nearby family housing. Adults rarely get sick, but can carry it home.",
    actions: ["Wash hands before touching children", "No sharing utensils with kids"],
    issuedAgo: "1 day ago",
    verifiedClinics: 1,
    reportsCount: 4,
    workersReached: 1800,
  },
];

export const SYMPTOM_REPORT_OPTIONS = [
  "Fever",
  "Cough",
  "Headache",
  "Sore throat",
  "Body aches",
  "Heat exhaustion",
  "Dizziness",
  "I feel fine",
];
