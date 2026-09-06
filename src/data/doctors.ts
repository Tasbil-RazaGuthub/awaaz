export interface Doctor {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  gender: "male" | "female";
  basedIn: string;
  homeDistrict: string;
  languages: string[];
  matchScore: number; // vs persona Imran (Urdu + Punjabi, Gujranwala)
  availability: string;
  volunteer: boolean;
  gccBased: boolean;
}

export const DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Ayesha Raza",
    initials: "AR",
    specialty: "Family Medicine",
    gender: "female",
    basedIn: "Lahore, Pakistan",
    homeDistrict: "Gujranwala",
    languages: ["Urdu", "Punjabi", "English"],
    matchScore: 96,
    availability: "Volunteer · today 18:00–20:00 GST",
    volunteer: true,
    gccBased: false,
  },
  {
    id: "d2",
    name: "Dr. Muhammad Iqbal",
    initials: "MI",
    specialty: "Internal Medicine",
    gender: "male",
    basedIn: "Lahore, Pakistan",
    homeDistrict: "Sheikhupura",
    languages: ["Urdu", "Punjabi", "English"],
    matchScore: 91,
    availability: "Volunteer · today 17:00–19:00 GST",
    volunteer: true,
    gccBased: false,
  },
  {
    id: "d3",
    name: "Dr. Hassan Al Marzooqi",
    initials: "HM",
    specialty: "Family Medicine",
    gender: "male",
    basedIn: "Sharjah, UAE",
    homeDistrict: "Sharjah",
    languages: ["Arabic", "Urdu", "English"],
    matchScore: 72,
    availability: "In-GCC · today 16:00–18:00 GST",
    volunteer: false,
    gccBased: true,
  },
  {
    id: "d4",
    name: "Dr. Abdul Basit",
    initials: "AB",
    specialty: "Occupational Health",
    gender: "male",
    basedIn: "Peshawar, Pakistan",
    homeDistrict: "Charsadda",
    languages: ["Pashto", "Urdu", "English"],
    matchScore: 74,
    availability: "Volunteer · tomorrow 10:00–12:00 GST",
    volunteer: true,
    gccBased: false,
  },
  {
    id: "d5",
    name: "Dr. Farida Akter",
    initials: "FA",
    specialty: "Community Health",
    gender: "female",
    basedIn: "Dhaka, Bangladesh",
    homeDistrict: "Tangail",
    languages: ["Bengali", "Urdu", "Hindi"],
    matchScore: 63,
    availability: "Volunteer · today 20:00–22:00 GST",
    volunteer: true,
    gccBased: false,
  },
  {
    id: "d6",
    name: "Dr. Sunita Sharma",
    initials: "SS",
    specialty: "Counselling — mental health",
    gender: "female",
    basedIn: "Delhi, India",
    homeDistrict: "Delhi",
    languages: ["Hindi", "Punjabi"],
    matchScore: 58,
    availability: "Volunteer · today 19:00–21:00 GST",
    volunteer: true,
    gccBased: false,
  },
  {
    id: "d7",
    name: "Dr. Nabin Thapa",
    initials: "NT",
    specialty: "General Medicine",
    gender: "male",
    basedIn: "Kathmandu, Nepal",
    homeDistrict: "Dhading",
    languages: ["Nepali", "Hindi", "English"],
    matchScore: 48,
    availability: "Volunteer · tomorrow 12:00–14:00 GST",
    volunteer: true,
    gccBased: false,
  },
  {
    id: "d8",
    name: "Dr. Rajesh Kumar",
    initials: "RK",
    specialty: "General Medicine",
    gender: "male",
    basedIn: "Kochi, India",
    homeDistrict: "Thrissur",
    languages: ["Hindi", "Malayalam", "English"],
    matchScore: 55,
    availability: "Volunteer · today 21:00–23:00 GST",
    volunteer: true,
    gccBased: false,
  },
];

export interface ConsultTurn {
  speaker: "doctor" | "worker";
  name: string;
  urdu: string;
  english: string;
  duration: string;
}

export const CONSULT_SCRIPT: ConsultTurn[] = [
  {
    speaker: "doctor",
    name: "Dr. Ayesha Raza",
    urdu: "السلام علیکم عمران بھائی۔ میں ڈاکٹر عائشہ ہوں، گوجرانوالہ سے۔ آج آپ کو بخار اور کھانسی کیسا ہے؟",
    english: "Hello Imran bhai. I'm Dr. Ayesha, from Gujranwala. How is the fever and cough today?",
    duration: "0:14",
  },
  {
    speaker: "worker",
    name: "Imran",
    urdu: "بخار رات کو تھا، سویہ لیا۔ دن میں ہلکی کھانسی ہے اور جسم درد ہے۔",
    english: "The fever was at night, I took paracetamol. Today a mild cough and body aches.",
    duration: "0:09",
  },
  {
    speaker: "doctor",
    name: "Dr. Ayesha Raza",
    urdu: "سینے میں درد یا سانس میں تکلیف تو نہیں؟ ناک سے پانی بھی نہیں؟",
    english: "Any chest pain or difficulty breathing? Runny nose?",
    duration: "0:08",
  },
  {
    speaker: "worker",
    name: "Imran",
    urdu: "جی نہیں، بس کھانسی اور کمزوری ہے۔",
    english: "No, just the cough and weakness.",
    duration: "0:05",
  },
  {
    speaker: "doctor",
    name: "Dr. Ayesha Raza",
    urdu: "اچھا۔ یہ سیزن کا فلو لگتا ہے۔ پانی زیادہ پیو، آرام کرو، اور ہر ۶ گھنٹے بعد پیراسٹامول لے سکتے ہو اگر بخار ۳۸ درجے سے زیادہ ہو۔ تین دن میں بہتر نہ ہو تو دوبارہ ملنا۔",
    english: "Good — this looks like seasonal flu. Drink plenty of water, rest, and paracetamol every 6 hours if fever goes above 38°C. If not better in 3 days, consult me again.",
    duration: "0:26",
  },
];
