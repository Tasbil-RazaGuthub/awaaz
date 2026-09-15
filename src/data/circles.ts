export interface CircleMessage {
  id: string;
  speaker: string;
  role: "member" | "moderator";
  language: string;
  duration: string;
  native: string;
  /** i18n key for the English translation line */
  text: string;
}

export interface CircleRoom {
  id: string;
  /** i18n key for the room name */
  name: string;
  nativeName: string;
  /** i18n key for the topic line */
  topic: string;
  members: number;
  live: boolean;
  speakingNow: number;
  languages: string[];
  /** literal moderator name, or an i18n key (circles.r3.moderator / circles.r4.moderator) */
  moderator: string;
  privacy: "open" | "anonymous";
  messages: CircleMessage[];
}

export const CIRCLE_ROOMS: CircleRoom[] = [
  {
    id: "r1",
    name: "circles.r1.name",
    nativeName: "گھر کا پنڈ — گوجرانوالہ",
    topic: "circles.r1.topic",
    members: 24,
    live: true,
    speakingNow: 3,
    languages: ["Punjabi", "Urdu"],
    moderator: "Sardar Ali",
    privacy: "open",
    messages: [
      {
        id: "m1",
        speaker: "Khalid Mehmood",
        role: "member",
        language: "Punjabi",
        duration: "0:12",
        native: "وصولی ہو گئی؟ وڈیے نے تنخواہ بھیجی؟",
        text: "circles.r1.msg1",
      },
      {
        id: "m2",
        speaker: "Imran",
        role: "member",
        language: "Punjabi",
        duration: "0:08",
        native: "جی بھابھی نوں پہنچ گئی، کل گھر فون کریں گے۔",
        text: "circles.r1.msg2",
      },
      {
        id: "m3",
        speaker: "Sardar Ali",
        role: "moderator",
        language: "Urdu",
        duration: "0:20",
        native: "بھائیو، کیمپ کلینک میں جمعرات کو فلو کی ویکسین ہے۔ جو جانا چاہے، میں نال ہو سکتا ہوں۔",
        text: "circles.r1.msg3",
      },
    ],
  },
  {
    id: "r2",
    name: "circles.r2.name",
    nativeName: "نئے باپ",
    topic: "circles.r2.topic",
    members: 11,
    live: false,
    speakingNow: 0,
    languages: ["Urdu", "Bengali"],
    moderator: "Javed Iqbal",
    privacy: "open",
    messages: [
      {
        id: "m1",
        speaker: "Rafiq",
        role: "member",
        language: "Bengali",
        duration: "0:18",
        native: "আমার মেয়ে হয়েছে, কিন্তু আমি ছুঁতে পারি না।",
        text: "circles.r2.msg1",
      },
      {
        id: "m2",
        speaker: "Javed Iqbal",
        role: "moderator",
        language: "Urdu",
        duration: "0:24",
        native: "رفیق بھائی، یہ غم زیادہ دیر نہ رکھیں۔ ایک وائس نوٹ ریکارڈ کریں — بیبی سلیپ کے بعد سنیں گے۔",
        text: "circles.r2.msg2",
      },
    ],
  },
  {
    id: "r3",
    name: "circles.r3.name",
    nativeName: "دکھ سنانے کا حلقہ",
    topic: "circles.r3.topic",
    members: 8,
    live: false,
    speakingNow: 0,
    languages: ["Multilingual"],
    moderator: "circles.r3.moderator",
    privacy: "open",
    messages: [],
  },
  {
    id: "r4",
    name: "circles.r4.name",
    nativeName: "صحت بحالی",
    topic: "circles.r4.topic",
    members: 12,
    live: true,
    speakingNow: 1,
    languages: ["Urdu", "Hindi", "Pashto"],
    moderator: "circles.r4.moderator",
    privacy: "anonymous",
    messages: [
      {
        id: "m1",
        speaker: "Member (voice only)",
        role: "member",
        language: "Urdu",
        duration: "0:31",
        native: "تین مہینے ہو گئے۔ مشکل دن آتے ہیں، خاص کر تنخواہ نہ آنے پر۔",
        text: "circles.r4.msg1",
      },
    ],
  },
  {
    id: "r5",
    name: "circles.r5.name",
    nativeName: "جمعہ کی تلاوت",
    topic: "circles.r5.topic",
    members: 63,
    live: false,
    speakingNow: 0,
    languages: ["Arabic", "Urdu"],
    moderator: "Imam Yusuf",
    privacy: "open",
    messages: [],
  },
  {
    id: "r6",
    name: "circles.r6.name",
    nativeName: "दिवाली की तैयारी",
    topic: "circles.r6.topic",
    members: 30,
    live: true,
    speakingNow: 2,
    languages: ["Hindi"],
    moderator: "Anil Kumar",
    privacy: "open",
    messages: [],
  },
];
