export interface Doctor {
  id: string;
  name: string;
  initials: string;
  /** i18n key for the specialty (spec.*) */
  specialty: string;
  gender: "male" | "female";
  basedIn: string;
  homeDistrict: string;
  languages: string[];
  matchScore: number; // vs persona Imran (Urdu + Punjabi, Gujranwala)
  /** i18n key template for availability (doctor.avail.*) */
  availability: string;
  /** time range substituted into the availability template */
  availTime: string;
  volunteer: boolean;
  gccBased: boolean;
}

export const DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Ayesha Raza",
    initials: "AR",
    specialty: "spec.family",
    gender: "female",
    basedIn: "Lahore, Pakistan",
    homeDistrict: "Gujranwala",
    languages: ["Urdu", "Punjabi", "English"],
    matchScore: 96,
    availability: "doctor.avail.vol.today",
    availTime: "18:00–20:00 GST",
    volunteer: true,
    gccBased: false,
  },
  {
    id: "d2",
    name: "Dr. Muhammad Iqbal",
    initials: "MI",
    specialty: "spec.internal",
    gender: "male",
    basedIn: "Lahore, Pakistan",
    homeDistrict: "Sheikhupura",
    languages: ["Urdu", "Punjabi", "English"],
    matchScore: 91,
    availability: "doctor.avail.vol.today",
    availTime: "17:00–19:00 GST",
    volunteer: true,
    gccBased: false,
  },
  {
    id: "d3",
    name: "Dr. Hassan Al Marzooqi",
    initials: "HM",
    specialty: "spec.family",
    gender: "male",
    basedIn: "Sharjah, UAE",
    homeDistrict: "Sharjah",
    languages: ["Arabic", "Urdu", "English"],
    matchScore: 72,
    availability: "doctor.avail.gcc.today",
    availTime: "16:00–18:00 GST",
    volunteer: false,
    gccBased: true,
  },
  {
    id: "d4",
    name: "Dr. Abdul Basit",
    initials: "AB",
    specialty: "spec.occ",
    gender: "male",
    basedIn: "Peshawar, Pakistan",
    homeDistrict: "Charsadda",
    languages: ["Pashto", "Urdu", "English"],
    matchScore: 74,
    availability: "doctor.avail.vol.tomorrow",
    availTime: "10:00–12:00 GST",
    volunteer: true,
    gccBased: false,
  },
  {
    id: "d5",
    name: "Dr. Farida Akter",
    initials: "FA",
    specialty: "spec.community",
    gender: "female",
    basedIn: "Dhaka, Bangladesh",
    homeDistrict: "Tangail",
    languages: ["Bengali", "Urdu", "Hindi"],
    matchScore: 63,
    availability: "doctor.avail.vol.today",
    availTime: "20:00–22:00 GST",
    volunteer: true,
    gccBased: false,
  },
  {
    id: "d6",
    name: "Dr. Sunita Sharma",
    initials: "SS",
    specialty: "spec.counsel",
    gender: "female",
    basedIn: "Delhi, India",
    homeDistrict: "Delhi",
    languages: ["Hindi", "Punjabi"],
    matchScore: 58,
    availability: "doctor.avail.vol.today",
    availTime: "19:00–21:00 GST",
    volunteer: true,
    gccBased: false,
  },
  {
    id: "d7",
    name: "Dr. Nabin Thapa",
    initials: "NT",
    specialty: "spec.general",
    gender: "male",
    basedIn: "Kathmandu, Nepal",
    homeDistrict: "Dhading",
    languages: ["Nepali", "Hindi", "English"],
    matchScore: 48,
    availability: "doctor.avail.vol.tomorrow",
    availTime: "12:00–14:00 GST",
    volunteer: true,
    gccBased: false,
  },
  {
    id: "d8",
    name: "Dr. Rajesh Kumar",
    initials: "RK",
    specialty: "spec.general",
    gender: "male",
    basedIn: "Kochi, India",
    homeDistrict: "Thrissur",
    languages: ["Hindi", "Malayalam", "English"],
    matchScore: 55,
    availability: "doctor.avail.vol.today",
    availTime: "21:00–23:00 GST",
    volunteer: true,
    gccBased: false,
  },
];

export interface ConsultTurn {
  speaker: "doctor" | "worker";
  name: string;
  urdu: string;
  /** i18n key for the English translation line (consult.script*) */
  text: string;
  duration: string;
}

export const CONSULT_SCRIPT: ConsultTurn[] = [
  {
    speaker: "doctor",
    name: "Dr. Ayesha Raza",
    urdu: "السلام علیکم عمران بھائی۔ میں ڈاکٹر عائشہ ہوں، گوجرانوالہ سے۔ آج آپ کو بخار اور کھانسی کیسا ہے؟",
    text: "consult.script1",
    duration: "0:14",
  },
  {
    speaker: "worker",
    name: "Imran",
    urdu: "بخار رات کو تھا، سویہ لیا۔ دن میں ہلکی کھانسی ہے اور جسم درد ہے۔",
    text: "consult.script2",
    duration: "0:09",
  },
  {
    speaker: "doctor",
    name: "Dr. Ayesha Raza",
    urdu: "سینے میں درد یا سانس میں تکلیف تو نہیں؟ ناک سے پانی بھی نہیں؟",
    text: "consult.script3",
    duration: "0:08",
  },
  {
    speaker: "worker",
    name: "Imran",
    urdu: "جی نہیں، بس کھانسی اور کمزوری ہے۔",
    text: "consult.script4",
    duration: "0:05",
  },
  {
    speaker: "doctor",
    name: "Dr. Ayesha Raza",
    urdu: "اچھا۔ یہ سیزن کا فلو لگتا ہے۔ پانی زیادہ پیو، آرام کرو، اور ہر ۶ گھنٹے بعد پیراسٹامول لے سکتے ہو اگر بخار ۳۸ درجے سے زیادہ ہو۔ تین دن میں بہتر نہ ہو تو دوبارہ ملنا۔",
    text: "consult.script5",
    duration: "0:26",
  },
];
