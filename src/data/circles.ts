export interface CircleMessage {
  id: string;
  speaker: string;
  role: "member" | "moderator";
  language: string;
  duration: string;
  native: string;
  english: string;
}

export interface CircleRoom {
  id: string;
  name: string;
  nativeName: string;
  topic: string;
  members: number;
  live: boolean;
  speakingNow: number;
  languages: string[];
  moderator: string;
  privacy: "open" | "anonymous";
  description: string;
  messages: CircleMessage[];
}

export const CIRCLE_ROOMS: CircleRoom[] = [
  {
    id: "r1",
    name: "Home Village: Gujranwala",
    nativeName: "گھر کا پنڈ — گوجرانوالہ",
    topic: "Talk in your own dialect with men from your district",
    members: 24,
    live: true,
    speakingNow: 3,
    languages: ["Punjabi", "Urdu"],
    moderator: "Sardar Ali",
    privacy: "open",
    description:
      "Workers from Gujranwala and nearby districts. News from home, who is travelling next, salaam to families.",
    messages: [
      {
        id: "m1",
        speaker: "Khalid Mehmood",
        role: "member",
        language: "Punjabi",
        duration: "0:12",
        native: "وصولی ہو گئی؟ وڈیے نے تنخواہ بھیجی؟",
        english: "Did the transfer come through? Did you send the salary home?",
      },
      {
        id: "m2",
        speaker: "Imran",
        role: "member",
        language: "Punjabi",
        duration: "0:08",
        native: "جی بھابھی نوں پہنچ گئی، کل گھر فون کریں گے۔",
        english: "Yes, sister-in-law received it. We'll call home tomorrow.",
      },
      {
        id: "m3",
        speaker: "Sardar Ali",
        role: "moderator",
        language: "Urdu",
        duration: "0:20",
        native: "بھائیو، کیمپ کلینک میں جمعرات کو فلو کی ویکسین ہے۔ جو جانا چاہے، میں نال ہو سکتا ہوں۔",
        english:
          "Brothers — the camp clinic has flu vaccines on Thursday. Whoever wants to go, I can come along.",
      },
    ],
  },
  {
    id: "r2",
    name: "New Fathers",
    nativeName: "نئے باپ",
    topic: "For men whose first child was born after they left home",
    members: 11,
    live: false,
    speakingNow: 0,
    languages: ["Urdu", "Bengali"],
    moderator: "Javed Iqbal",
    privacy: "open",
    description: "Share the weight of becoming a father from 3,000 km away.",
    messages: [
      {
        id: "m1",
        speaker: "Rafiq",
        role: "member",
        language: "Bengali",
        duration: "0:18",
        native: "আমার মেয়ে হয়েছে, কিন্তু আমি ছুঁতে পারি না।",
        english: "My daughter was born, but I can't hold her.",
      },
      {
        id: "m2",
        speaker: "Javed Iqbal",
        role: "moderator",
        language: "Urdu",
        duration: "0:24",
        native: "رفیق بھائی، یہ غم زیادہ دیر نہ رکھیں۔ ایک وائس نوٹ ریکارڈ کریں — بیبی سلیپ کے بعد سنیں گے۔",
        english: "Rafiq bhai, don't carry this alone. Record a voice note — she can hear it when she grows.",
      },
    ],
  },
  {
    id: "r3",
    name: "Grief Support",
    nativeName: "دکھ سنانے کا حلقہ",
    topic: "For those who lost someone far away",
    members: 8,
    live: false,
    speakingNow: 0,
    languages: ["Multilingual"],
    moderator: "Trained moderator",
    privacy: "open",
    description: "A quiet room, moderated by trained listeners. Speak or just listen.",
    messages: [],
  },
  {
    id: "r4",
    name: "Addiction Recovery",
    nativeName: "صحت بحالی",
    topic: "Anonymous. No names, no judgement.",
    members: 12,
    live: true,
    speakingNow: 1,
    languages: ["Urdu", "Hindi", "Pashto"],
    moderator: "Recovery coach + doctor on call",
    privacy: "anonymous",
    description:
      "For alcohol, opioids, khat. Anonymous voice-only room with a clinical escalation path — a doctor can join privately.",
    messages: [
      {
        id: "m1",
        speaker: "Member (voice only)",
        role: "member",
        language: "Urdu",
        duration: "0:31",
        native: "تین مہینے ہو گئے۔ مشکل دن آتے ہیں، خاص کر تنخواہ نہ آنے پر۔",
        english: "It's been three months. Hard days still come — especially when the salary is late.",
      },
    ],
  },
  {
    id: "r5",
    name: "Friday Recitation",
    nativeName: "جمعہ کی تلاوت",
    topic: "Quran recitation and dua together before Jumu'ah",
    members: 63,
    live: false,
    speakingNow: 0,
    languages: ["Arabic", "Urdu"],
    moderator: "Imam Yusuf",
    privacy: "open",
    description: "A calm room before Friday prayer. Recitation, then duas for families back home.",
    messages: [],
  },
  {
    id: "r6",
    name: "Diwali Preparations",
    nativeName: "दिवाली की तैयारी",
    topic: "Plans, sweets, and photos of last year",
    members: 30,
    live: true,
    speakingNow: 2,
    languages: ["Hindi"],
    moderator: "Anil Kumar",
    privacy: "open",
    description: "Diwali in the camp: who is making sweets, which wall gets the rangoli.",
    messages: [],
  },
];

export const SAFE_DESIGN_BADGES = [
  { label: "No DMs", detail: "Direct messages are off for everyone — requests must go through the room" },
  { label: "No images", label2: "No video", detail: "Voice only. Nothing that can be screenshotted or faked" },
  { label: "Moderated", detail: "Every room has a trained, vetted moderator" },
  { label: "Escalation", detail: "One tap connects distress to a doctor or hotline" },
];
