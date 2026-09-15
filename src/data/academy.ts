export interface LessonStep {
  /** i18n key for the step title */
  title: string;
  /** i18n key for the step detail */
  detail: string;
}

export interface Quiz {
  /** i18n key for the question */
  question: string;
  /** i18n keys for the options */
  options: string[];
  correctIndex: number;
  /** i18n key for the explanation */
  explanation: string;
}

export interface Lesson {
  id: string;
  /** i18n key */
  title: string;
  minutes: number;
  /** i18n key for the badge name (badge.*) */
  badge: string;
  category: "first-aid" | "heat" | "hygiene" | "medication";
  /** i18n key */
  summary: string;
  steps: LessonStep[];
  quiz: Quiz;
}

export const LESSONS: Lesson[] = [
  {
    id: "l1",
    title: "academy.l1.title",
    minutes: 4,
    badge: "badge.firstResponder",
    category: "first-aid",
    summary: "academy.l1.summary",
    steps: [
      { title: "academy.l1.step1.title", detail: "academy.l1.step1.detail" },
      { title: "academy.l1.step2.title", detail: "academy.l1.step2.detail" },
      { title: "academy.l1.step3.title", detail: "academy.l1.step3.detail" },
      { title: "academy.l1.step4.title", detail: "academy.l1.step4.detail" },
      { title: "academy.l1.step5.title", detail: "academy.l1.step5.detail" },
      { title: "academy.l1.step6.title", detail: "academy.l1.step6.detail" },
    ],
    quiz: {
      question: "academy.l1.quiz.q",
      options: ["academy.l1.quiz.opt1", "academy.l1.quiz.opt2", "academy.l1.quiz.opt3"],
      correctIndex: 1,
      explanation: "academy.l1.quiz.explain",
    },
  },
  {
    id: "l2",
    title: "academy.l2.title",
    minutes: 3,
    badge: "badge.heatGuardian",
    category: "heat",
    summary: "academy.l2.summary",
    steps: [
      { title: "academy.l2.step1.title", detail: "academy.l2.step1.detail" },
      { title: "academy.l2.step2.title", detail: "academy.l2.step2.detail" },
      { title: "academy.l2.step3.title", detail: "academy.l2.step3.detail" },
      { title: "academy.l2.step4.title", detail: "academy.l2.step4.detail" },
      { title: "academy.l2.step5.title", detail: "academy.l2.step5.detail" },
    ],
    quiz: {
      question: "academy.l2.quiz.q",
      options: ["academy.l2.quiz.opt1", "academy.l2.quiz.opt2", "academy.l2.quiz.opt3"],
      correctIndex: 1,
      explanation: "academy.l2.quiz.explain",
    },
  },
  {
    id: "l3",
    title: "academy.l3.title",
    minutes: 2,
    badge: "badge.hygieneHero",
    category: "hygiene",
    summary: "academy.l3.summary",
    steps: [
      { title: "academy.l3.step1.title", detail: "academy.l3.step1.detail" },
      { title: "academy.l3.step2.title", detail: "academy.l3.step2.detail" },
      { title: "academy.l3.step3.title", detail: "academy.l3.step3.detail" },
      { title: "academy.l3.step4.title", detail: "academy.l3.step4.detail" },
    ],
    quiz: {
      question: "academy.l3.quiz.q",
      options: ["academy.l3.quiz.opt1", "academy.l3.quiz.opt2", "academy.l3.quiz.opt3"],
      correctIndex: 1,
      explanation: "academy.l3.quiz.explain",
    },
  },
  {
    id: "l4",
    title: "academy.l4.title",
    minutes: 4,
    badge: "badge.medicineWise",
    category: "medication",
    summary: "academy.l4.summary",
    steps: [
      { title: "academy.l4.step1.title", detail: "academy.l4.step1.detail" },
      { title: "academy.l4.step2.title", detail: "academy.l4.step2.detail" },
      { title: "academy.l4.step3.title", detail: "academy.l4.step3.detail" },
      { title: "academy.l4.step4.title", detail: "academy.l4.step4.detail" },
    ],
    quiz: {
      question: "academy.l4.quiz.q",
      options: ["academy.l4.quiz.opt1", "academy.l4.quiz.opt2", "academy.l4.quiz.opt3"],
      correctIndex: 1,
      explanation: "academy.l4.quiz.explain",
    },
  },
];

export interface BadgeData {
  id: string;
  /** i18n key for the badge label */
  label: string;
  earned: boolean;
}

export const BADGES: BadgeData[] = [
  { id: "b1", label: "badge.hygieneHero", earned: true },
  { id: "b2", label: "badge.streak7", earned: true },
  { id: "b3", label: "badge.cough", earned: true },
  { id: "b4", label: "badge.firstResponder", earned: false },
  { id: "b5", label: "badge.heatGuardian", earned: false },
  { id: "b6", label: "badge.medicineWise", earned: false },
];

export const CAMP_LEADERBOARD = [
  { rank: 1, camp: "Sonapur Camp A", lessons: 312 },
  { rank: 2, camp: "Musaffah Camp C", lessons: 288 },
  { rank: 3, camp: "Labour City 5", lessons: 241 },
  { rank: 4, camp: "Al Quoz Block B", lessons: 219 },
  { rank: 5, camp: "Industrial Area 4", lessons: 187 },
];

export const ECO_CHALLENGE = {
  /** i18n key */
  title: "academy.eco.title",
  joined: 214,
  goal: 500,
  camps: 3,
  /** i18n key */
  treeNote: "academy.eco.tree",
  progressPct: 43,
};

export const CIVIC_PETITIONS = [
  {
    id: "p1",
    /** i18n key */
    title: "academy.p1.title",
    /** i18n key */
    authority: "academy.p1.authority",
    signatures: 18420,
    target: 25000,
    /** i18n key */
    summary: "academy.p1.summary",
  },
  {
    id: "p2",
    /** i18n key */
    title: "academy.p2.title",
    /** i18n key */
    authority: "academy.p2.authority",
    signatures: 864,
    target: 1500,
    /** i18n key */
    summary: "academy.p2.summary",
  },
];
