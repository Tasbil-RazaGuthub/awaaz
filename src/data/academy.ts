export interface LessonStep {
  title: string;
  detail: string;
}

export interface Quiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  badge: string;
  category: "first-aid" | "heat" | "hygiene" | "medication";
  summary: string;
  steps: LessonStep[];
  quiz: Quiz;
}

export const LESSONS: Lesson[] = [
  {
    id: "l1",
    title: "If a co-worker falls from scaffolding",
    minutes: 4,
    badge: "First Responder",
    category: "first-aid",
    summary:
      "The first 10 minutes decide whether he reaches the hospital alive. Learn the sequence before you ever need it.",
    steps: [
      {
        title: "1. Do not move him",
        detail:
          "Falls from height can break the spine. Moving him wrongly can turn a survivable injury into paralysis. Secure the area first.",
      },
      {
        title: "2. Shout for the site medic",
        detail: "Call 998 (UAE ambulance) and your site supervisor. Speak slowly; say 'worker fell from height' first.",
      },
      {
        title: "3. Check breathing",
        detail:
          "Look at the chest, listen at the mouth. If he is not breathing, start chest compressions — 100 per minute, centre of the chest.",
      },
      {
        title: "4. Stop visible bleeding",
        detail: "Press firmly on any bleeding wound with a clean cloth. Keep pressure until help arrives.",
      },
      {
        title: "5. Keep him warm and talk to him",
        detail: "Cover with a blanket. Talk in your language so he stays calm and awake.",
      },
      {
        title: "6. Tell the paramedics what you saw",
        detail: "How far he fell, where he landed, how long he was unconscious. Two sentences can save him.",
      },
    ],
    quiz: {
      question: "Your co-worker falls and is awake but says his neck hurts. What do you do?",
      options: [
        "Help him stand up and walk to the shade",
        "Keep him still, call 998, and hold his head steady",
        "Give him water and wait 30 minutes",
      ],
      correctIndex: 1,
      explanation:
        "Neck pain after a fall means possible spinal injury. The only safe move is no move — stabilise and call the ambulance.",
    },
  },
  {
    id: "l2",
    title: "Heatstroke: recognise and respond",
    minutes: 3,
    badge: "Heat Guardian",
    category: "heat",
    summary: "Confusion, no sweating, hot dry skin — you have minutes, not hours. Practise until it is reflex.",
    steps: [
      {
        title: "1. Know the three signs",
        detail: "Confusion or strange behaviour, skin hot and dry (sweating has stopped), body temperature very high.",
      },
      {
        title: "2. Move to shade and strip",
        detail: "Get him to shade immediately, remove outer clothing, wet the skin with any water you have.",
      },
      {
        title: "3. Fan continuously",
        detail: "Airflow over wet skin cools fastest. Two men fanning beats one man panicking.",
      },
      {
        title: "4. Call 998 while cooling",
        detail: "Never 'wait to see'. Heatstroke kills within the hour.",
      },
      {
        title: "5. Nothing by mouth if confused",
        detail: "A confused worker can choke on water. Only give sips if he is fully awake.",
      },
    ],
    quiz: {
      question: "Which is the strongest sign that it is heatstroke, not just exhaustion?",
      options: [
        "He is sweating heavily and thirsty",
        "He is confused and his skin is hot and dry",
        "His legs are cramping",
      ],
      correctIndex: 1,
      explanation:
        "Heavy sweating and cramps mean heat exhaustion — serious but recoverable. Confusion with dry hot skin means sweating has failed: heatstroke. Cool him NOW.",
    },
  },
  {
    id: "l3",
    title: "Handwashing in the camp",
    minutes: 2,
    badge: "Hygiene Hero",
    category: "hygiene",
    summary: "Six camp 'touch points' carry most infections — the bus rail, the canteen, the shared phone charger.",
    steps: [
      {
        title: "1. Twenty seconds, water and soap",
        detail: "Plain soap works. Sing the first two lines of any song you know — that is twenty seconds.",
      },
      {
        title: "2. Wash before eating, always",
        detail: "Hands touch the bus rail, money, tools, and then your roti. Break that chain.",
      },
      {
        title: "3. After the washroom and after coughing",
        detail: "During the current flu alert, wash after coughing into your hand as well.",
      },
      {
        title: "4. Keep a small soap at your bunk",
        detail: "The shared bathroom soap runs out exactly when it is needed. Own soap = no excuse.",
      },
    ],
    quiz: {
      question: "During the flu alert, when should you wash your hands?",
      options: [
        "Only before eating",
        "Before eating, after the washroom, and after coughing or sneezing",
        "Once a day after shift",
      ],
      correctIndex: 1,
      explanation:
        "During an outbreak, every hand-to-face moment is a risk. Three wash moments cover almost all of them.",
    },
  },
  {
    id: "l4",
    title: "Medicine safety: painkillers are not candy",
    minutes: 4,
    badge: "Medicine Wise",
    category: "medication",
    summary:
      "What mixing painkillers, alcohol, and 'energy' tablets really does to your liver and your family's future.",
    steps: [
      {
        title: "1. One type of painkiller at a time",
        detail:
          "Taking paracetamol AND ibuprofen AND 'extra strength' together can overload the liver. Doctors at the clinic will tell you what is safe — ask, it is free.",
      },
      {
        title: "2. Alcohol plus painkillers damages the liver",
        detail:
          "The liver processes both. Together, they cause silent damage that appears years later as liver disease.",
      },
      {
        title: "3. Sleeping pills from a friend are dangerous",
        detail:
          "Doses that suit a big man can stop breathing in another. Never share prescription medicine — and mixing sleeping pills with alcohol can be fatal.",
      },
      {
        title: "4. Addiction starts as 'just to sleep'",
        detail:
          "Using codeine or opioid painkillers to sleep or to forget stress builds dependence within weeks. The Addiction Recovery circle is anonymous — just listen at first.",
      },
    ],
    quiz: {
      question: "A friend offers you his sleeping pills because you cannot sleep after night shift. What is the safest answer?",
      options: [
        "Take half — a small dose is safe",
        "Refuse, and ask a doctor — the voice consult costs almost nothing",
        "Take one tonight and give one back tomorrow",
      ],
      correctIndex: 1,
      explanation:
        "Prescription doses are personal. A doctor can find what is actually wrong with your sleep — safely, in your own language, for about five cents.",
    },
  },
];

export interface BadgeData {
  id: string;
  label: string;
  earned: boolean;
}

export const BADGES: BadgeData[] = [
  { id: "b1", label: "Hygiene Hero", earned: true },
  { id: "b2", label: "7-Day Streak", earned: true },
  { id: "b3", label: "Cough Etiquette", earned: true },
  { id: "b4", label: "First Responder", earned: false },
  { id: "b5", label: "Heat Guardian", earned: false },
  { id: "b6", label: "Medicine Wise", earned: false },
];

export const CAMP_LEADERBOARD = [
  { rank: 1, camp: "Sonapur Camp A", lessons: 312 },
  { rank: 2, camp: "Musaffah Camp C", lessons: 288 },
  { rank: 3, camp: "Labour City 5", lessons: 241 },
  { rank: 4, camp: "Al Quoz Block B", lessons: 219 },
  { rank: 5, camp: "Industrial Area 4", lessons: 187 },
];

export const ECO_CHALLENGE = {
  title: "Walk-to-Work Week",
  joined: 214,
  goal: 500,
  camps: 3,
  treeNote: "Every 30 walked days plants a tree in your home district — diaspora-sponsored",
  progressPct: 43,
};

export const CIVIC_PETITIONS = [
  {
    id: "p1",
    title: "Basic health insurance for camp workers",
    authority: "To: Ministry of Emigration & Employers' Association",
    signatures: 18420,
    target: 25000,
    summary:
      "Camp accommodation should include basic health coverage, not just injury-on-site. Workers who are sick wait until collapse — that costs everyone more.",
  },
  {
    id: "p2",
    title: "Camp clinic open after 19:00",
    authority: "To: Al Quoz accommodation management",
    signatures: 864,
    target: 1500,
    summary: "Shift ends at 18:00. A clinic that closes at 17:00 is a clinic we cannot use.",
  },
];
