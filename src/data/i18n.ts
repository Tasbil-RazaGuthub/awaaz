export type LangCode = "en" | "ur" | "hi" | "bn" | "ar" | "ne" | "pa" | "sd" | "ps";

export interface LangStrings {
  nav: { home: string; clinic: string; circles: string; academy: string; data: string };
  greeting: string;
  sub: string;
  tagline: string;
  alertsTitle: string;
  reportFeel: string;
  ivr: string;
  clinicTitle: string;
  circlesTitle: string;
  academyTitle: string;
  dataTitle: string;
  quickLinks: string;
}

export interface Language {
  code: LangCode;
  label: string; // native name in own script
  englishName: string;
  dir: "ltr" | "rtl";
  strings: LangStrings;
}

export const LANGUAGES: Language[] = [
  {
    code: "en",
    label: "English",
    englishName: "English",
    dir: "ltr",
    strings: {
      nav: { home: "Home", clinic: "Clinic", circles: "Circles", academy: "Academy", data: "Data" },
      greeting: "Hello, Imran",
      sub: "Stay well today",
      tagline: "Your voice. Your health. Your language.",
      alertsTitle: "Active alerts",
      reportFeel: "Report how you feel",
      ivr: "No smartphone? Call 800-AWAAZ — every feature works by voice",
      clinicTitle: "Talk to a doctor",
      circlesTitle: "You are not alone",
      academyTitle: "Learn skills",
      dataTitle: "Community data",
      quickLinks: "Quick links",
    },
  },
  {
    code: "ur",
    label: "اردو",
    englishName: "Urdu",
    dir: "rtl",
    strings: {
      nav: { home: "گھر", clinic: "کلینک", circles: "حلقے", academy: "اکیڈمی", data: "ڈیٹا" },
      greeting: "السلام علیکم، عمران",
      sub: "آج صحت مند رہیں",
      tagline: "آپ کی آواز۔ آپ کی صحت۔ آپ کی زبان۔",
      alertsTitle: "فعال الرٹس",
      reportFeel: "اپنی حالت بتائیں",
      ivr: "اسمارٹ فون نہیں ہے؟ 800-AWAAZ پر کال کریں — ہر فیچر آواز سے",
      clinicTitle: "ڈاکٹر سے بات کریں",
      circlesTitle: "آپ اکیلے نہیں ہیں",
      academyTitle: "ہنر سیکھیں",
      dataTitle: "کمیونٹی ڈیٹا",
      quickLinks: "فوری لنکس",
    },
  },
  {
    code: "hi",
    label: "हिन्दी",
    englishName: "Hindi",
    dir: "ltr",
    strings: {
      nav: { home: "होम", clinic: "क्लिनिक", circles: "मंडलियाँ", academy: "अकादमी", data: "डेटा" },
      greeting: "नमस्ते, इमरान",
      sub: "आज स्वस्थ रहें",
      tagline: "आपकी आवाज़। आपका स्वास्थ्य। आपकी भाषा।",
      alertsTitle: "सक्रिय अलर्ट",
      reportFeel: "अपनी स्थिति बताएं",
      ivr: "स्मार्टफ़ोन नहीं है? 800-AWAAZ पर कॉल करें — सब आवाज़ से",
      clinicTitle: "डॉक्टर से बात करें",
      circlesTitle: "आप अकेले नहीं हैं",
      academyTitle: "कौशल सीखें",
      dataTitle: "समुदाय डेटा",
      quickLinks: "त्वरित लिंक",
    },
  },
  {
    code: "bn",
    label: "বাংলা",
    englishName: "Bengali",
    dir: "ltr",
    strings: {
      nav: { home: "হোম", clinic: "ক্লিনিক", circles: "বৃত্ত", academy: "একাডেমি", data: "ডেটা" },
      greeting: "নমস্কার, ইমরান",
      sub: "আজ সুস্থ থাকুন",
      tagline: "আপনার কণ্ঠ। আপনার স্বাস্থ্য। আপনার ভাষা।",
      alertsTitle: "সক্রিয় সতর্কতা",
      reportFeel: "আপনার অবস্থা জানান",
      ivr: "স্মার্টফোন নেই? 800-AWAAZ-এ কল করুন — সব কণ্ঠস্বরে",
      clinicTitle: "ডাক্তারের সাথে কথা বলুন",
      circlesTitle: "আপনি একা নন",
      academyTitle: "দক্ষতা শিখুন",
      dataTitle: "সম্প্রদায়ের ডেটা",
      quickLinks: "দ্রুত লিঙ্ক",
    },
  },
  {
    code: "ar",
    label: "العربية",
    englishName: "Arabic",
    dir: "rtl",
    strings: {
      nav: { home: "الرئيسية", clinic: "العيادة", circles: "الحلقات", academy: "الأكاديمية", data: "البيانات" },
      greeting: "مرحباً عمران",
      sub: "ابقَ بصحة جيدة اليوم",
      tagline: "صوتك. صحتك. لغتك.",
      alertsTitle: "تنبيهات نشطة",
      reportFeel: "أبلغ عن حالتك",
      ivr: "لا هاتف ذكي؟ اتصل على 800-AWAAZ — كل شيء بالصوت",
      clinicTitle: "تحدث إلى طبيب",
      circlesTitle: "أنت لست وحدك",
      academyTitle: "تعلّم مهارات",
      dataTitle: "بيانات المجتمع",
      quickLinks: "روابط سريعة",
    },
  },
  {
    code: "ne",
    label: "नेपाली",
    englishName: "Nepali",
    dir: "ltr",
    strings: {
      nav: { home: "गृह", clinic: "क्लिनिक", circles: "सर्कल", academy: "एकेडेमी", data: "डाटा" },
      greeting: "नमस्ते, इमरान",
      sub: "आज स्वस्थ रहनुहोस्",
      tagline: "तपाईंको आवाज। तपाईंको स्वास्थ्य। तपाईंको भाषा।",
      alertsTitle: "सक्रिय सचेत",
      reportFeel: "तपाईंको अवस्था बताउनुहोस्",
      ivr: "स्मार्टफोन छैन? 800-AWAAZ मा कल गर्नुहोस् — सब आवाजमा",
      clinicTitle: "डाक्टरसँग कुरा गर्नुहोस्",
      circlesTitle: "तपाईं एक्लो हुनुहुन्न",
      academyTitle: "सीप सिक्नुहोस्",
      dataTitle: "समुदाय डाटा",
      quickLinks: "छिटो लिङ्क",
    },
  },
  {
    code: "pa",
    label: "پنجابی",
    englishName: "Punjabi",
    dir: "rtl",
    strings: {
      nav: { home: "گھر", clinic: "کلینک", circles: "حلقے", academy: "اکیڈمی", data: "ڈیٹا" },
      greeting: "سلام، عمران",
      sub: "اج صحت مند رہو",
      tagline: "تسی دی آواز۔ تسی دی صحت۔ تسی دی بولی۔",
      alertsTitle: "موجودہ الرٹس",
      reportFeel: "اپنا حال دسو",
      ivr: "سمارٹ فون نئیں؟ 800-AWAAZ تے کال کرو — سبد آواز نال",
      clinicTitle: "ڈاکٹر نال گل کرو",
      circlesTitle: "تساں اکلے نئیں او",
      academyTitle: "ہنر سکھو",
      dataTitle: "کمیونٹی ڈیٹا",
      quickLinks: "فوری لنکس",
    },
  },
  {
    code: "sd",
    label: "سنڌي",
    englishName: "Sindhi",
    dir: "rtl",
    strings: {
      nav: { home: "گھر", clinic: "کلينڪ", circles: "حلقا", academy: "اڪيڊمي", data: "ڊيٽا" },
      greeting: "سلام، عمران",
      sub: "اڄ صحتمند رهو",
      tagline: "توهان جي آواز۔ توهان جي صحت۔ توهان جي ٻولي۔",
      alertsTitle: "فعال الرٽس",
      reportFeel: "پنهنجي حالت ٻڌايو",
      ivr: "اسمارٽ فون ناھي؟ 800-AWAAZ تي ڪال ڪريو — سڀ آواز سان",
      clinicTitle: "ڊاڪٽر سان ڳالهايو",
      circlesTitle: "توهان اڪيلو ناھيو",
      academyTitle: "هنر سکو",
      dataTitle: "ڪميونٽي ڊيٽا",
      quickLinks: "فوري لنڪس",
    },
  },
  {
    code: "ps",
    label: "پښتو",
    englishName: "Pashto",
    dir: "rtl",
    strings: {
      nav: { home: "کور", clinic: "کلینیک", circles: "حلقې", academy: "اکاډمي", data: "ډاټا" },
      greeting: "سلام، عمران",
      sub: "نن روغ دی",
      tagline: "ستاسو غږ. ستاسو روغتیا. ستاسو ژبه.",
      alertsTitle: "فعال خبرتیاوي",
      reportFeel: "خپل حالت وښایاست",
      ivr: "سمارټ فون نلري؟ 800-AWAAZ ته زنګ ووهئ — هر څه په غږ",
      clinicTitle: "ډاکټر سره خبرې وکړئ",
      circlesTitle: "تاسو یوازې نه یاست",
      academyTitle: "مهارت زده کړئ",
      dataTitle: "د ټولنې ډاټا",
      quickLinks: "ژرلینکونه",
    },
  },
];

export function getLang(code: LangCode): Language {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}
