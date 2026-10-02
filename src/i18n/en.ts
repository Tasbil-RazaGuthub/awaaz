/**
 * Awaaz master English strings — the single source of truth for all UI text.
 *
 * - Keys are stable IDs (e.g. "home.alert1.title"). Never rename a key once shipped.
 * - Values may contain {placeholders} — keep them when translating.
 * - Section comments (`// ===== Section =====`) drive the translation template generator.
 */

export const en = {
  // ===== Global: meta & navigation =====
  "meta.title": "Awaaz — Voice-First Health Companion",
  "nav.home": "Home",
  "nav.clinic": "Clinic",
  "nav.circles": "Circles",
  "nav.academy": "Academy",
  "nav.data": "Data",
  "header.tagline": "Your voice. Your health. Your language.",

  // ===== Global: footer =====
  "footer.ivr": "IVR: 800-AWAAZ",
  "footer.fork": "MIT open source — fork it for your corridor",
  "footer.prototype": "Prototype · all data simulated",
  "footer.para1":
    "Awaaz is a competition prototype for the Sydney Innovation Challenge 2026 (SDG 3 — Good Health and Well-being). Doctor profiles, triage routing, conversations, and dashboard numbers are illustrative, not clinically validated. A real launch requires telehealth licensing, clinical validation of the triage rules, trained moderators with a crisis pathway, and health-data privacy compliance across the GCC.",
  "footer.para2":
    "The interface is fully localized — every screen renders in English and all 8 corridor languages (Urdu, Hindi, Bengali, Arabic, Nepali, Punjabi, Sindhi, Pashto).",

  // ===== Home: greeting =====
  "home.greeting": "Hello, Imran",
  "home.sub": "Stay well today",
  "home.speaks": "Speaks {langs}",

  // ===== Home: alerts =====
  "home.alerts.title": "Active alerts",
  "home.alerts.count": "{n} active near you",
  "home.alert.issued": "issued {ago}",
  "home.alert.verified": "Verified by {n} camp clinics this week",
  "home.alert.reached": "{n} workers reached",
  "home.alert.reports": "{n} voice reports from your area",
  "home.alert1.title": "Influenza cluster — Al Quoz camps",
  "home.alert1.summary":
    "Respiratory illness up 340% in 10 days. 47 workers have reported fever and cough from your block. Lab samples from 3 camps confirm seasonal influenza A.",
  "home.alert1.action1": "Wear a mask in shared areas and on the bus",
  "home.alert1.action2": "Report fever today — 2 minutes by voice",
  "home.alert1.action3": "Hydrate and rest; see a doctor if fever lasts over 2 days",
  "home.alert2.title": "Heatwave — 46°C expected",
  "home.alert2.summary":
    "Midday work ban extended to 10:30–16:00. Heat exhaustion cases up 180% this week among outdoor workers.",
  "home.alert2.action1": "Water every 20 minutes — 250 ml",
  "home.alert2.action2": "Know the heatstroke signs: confusion, no sweating, hot dry skin",
  "home.alert2.action3": "Report dizziness immediately — don't wait",
  "home.alert3.title": "Dust storm advisory",
  "home.alert3.summary":
    "Air quality is 'unhealthy' today. Workers with asthma or a persistent cough should limit outdoor exposure and carry inhalers.",
  "home.alert3.action1": "Wear a mask outdoors",
  "home.alert3.action2": "Asthmatic? Take your inhaler before shift",
  "home.alert4.title": "Hand, foot & mouth near your block",
  "home.alert4.summary":
    "Mild cases reported among children in nearby family housing. Adults rarely get sick, but can carry it home.",
  "home.alert4.action1": "Wash hands before touching children",
  "home.alert4.action2": "No sharing utensils with kids",

  // ===== Home: relative time =====
  "time.ago.2d": "2 days ago",
  "time.ago.6h": "6 hours ago",
  "time.ago.3h": "3 hours ago",
  "time.ago.1d": "1 day ago",

  // ===== Home: symptom report =====
  "home.report.title": "Report how you feel",
  "home.report.intro":
    "Tap what you feel today — anonymous, 30 seconds, and it powers the alerts above for everyone in your camp.",
  "sym.fever": "Fever",
  "sym.cough": "Cough",
  "sym.headache": "Headache",
  "sym.soreThroat": "Sore throat",
  "sym.bodyAches": "Body aches",
  "sym.heatExhaustion": "Heat exhaustion",
  "sym.dizziness": "Dizziness",
  "sym.feelFine": "I feel fine",
  "home.report.ivrNote": "Voice reports work on the IVR line too",
  "home.report.send": "Send report",
  "home.report.thanks": "Thank you. Your report is anonymous.",
  "home.report.afterFine":
    "47 workers reported symptoms in your area this week — your area is under an influenza alert.",
  "home.report.after":
    "48 reports now in your area this week. If a cluster forms, everyone nearby gets a voice alert — like the one above.",
  "home.report.again": "Report again",

  // ===== Home: quick links =====
  "home.quick.title": "Quick links",
  "home.quick.clinic": "Talk to a doctor",
  "home.quick.clinic.hint": "from $0.05",
  "home.quick.circles": "You are not alone",
  "home.quick.circles.hint": "3 rooms live",
  "home.quick.academy": "Learn skills",
  "home.quick.academy.hint": "4 lessons",
  "home.quick.data": "Community data",
  "home.quick.data.hint": "open + anonymized",

  // ===== Home: IVR & streak =====
  "home.ivr.line": "No smartphone? Call 800-AWAAZ — every feature works by voice",
  "home.ivr.detail":
    "Every feature — symptom report, consult booking, lessons, circles — has a phone-number path for feature phones. One shared camp phone serves many workers.",
  "home.streak.title": "This week in Awaaz Academy",
  "home.streak.badge": "7-day streak",
  "home.streak.detail": "5 of 8 daily voice lessons done — 3 more keeps the camp leaderboard rank.",

  // ===== Clinic: triage =====
  "clinic.title": "Talk to a doctor",
  "clinic.intro":
    "Answer 3 questions by tapping — or say them by voice. The triage decides who needs to be seen and who just needs to be heard.",
  "clinic.disclaimer":
    "Illustrative routing for the prototype — not a clinically validated tool. In production, rules are reviewed by partner clinicians and adapted per WHO guidance.",
  "clinic.q1": "1 — What is troubling you today?",
  "sym.rash": "Skin rash",
  "clinic.q1.mic": "Or hold the mic and say it in your language",
  "clinic.continue": "Continue",
  "clinic.q2": "2 — Since when?",
  "dur.today": "Started today",
  "dur.short": "1–2 days",
  "dur.week": "3–7 days",
  "dur.long": "More than a week",
  "clinic.back": "Back",
  "clinic.q3": "3 — Any of these right now?",
  "rf.chest": "Chest pain or pressure",
  "rf.breathing": "Difficulty breathing",
  "rf.fainting": "Fainting or collapse",
  "rf.none": "None of these",
  "clinic.getResult": "Get my result",
  "clinic.startOver": "Start over",

  // ===== Clinic: triage outcomes =====
  "triage.red.title": "Seek in-person care NOW",
  "triage.red.reason":
    "Your answers include a warning sign (chest pain, breathing difficulty, or fainting). Voice advice is not enough for this — a doctor must examine you.",
  "triage.red.advice1": "Go to your camp clinic or the nearest emergency room immediately",
  "triage.red.advice2": "Ambulance in the UAE: 998 — say it in Urdu if you need to",
  "triage.red.advice3": "Do not continue working today",
  "triage.red.cta": "Show clinic directions",
  "triage.long.title": "See a doctor in person",
  "triage.long.reason": "Fever or cough lasting more than 3 days should be examined and possibly tested.",
  "triage.long.advice1": "Book the next slot at your camp clinic",
  "triage.long.advice2": "Wear a mask on the way",
  "triage.long.advice3": "A voice consult can help while you wait",
  "triage.long.cta": "Show clinic directions",
  "triage.tele.title": "A voice consult is recommended",
  "triage.tele.reason":
    "Fever with cough for under 3 days, and no warning signs. A doctor who speaks your language should hear your voice — no in-person slot needed, so it stays free for someone who does need it.",
  "triage.tele.advice1": "Matched doctors are available today",
  "triage.tele.advice2": "Cost: about $0.05 — audio only, low data",
  "triage.tele.advice3": "If new chest pain or breathing trouble starts, go in person immediately",
  "triage.tele.cta": "Find my doctor",
  "triage.self.title": "Self-care for today",
  "triage.self.reason":
    "Mild symptoms with no warning signs. Rest today, and check in again tomorrow — the camp has a flu alert active, so keep watching for fever.",
  "triage.self.advice1": "Rest and drink water",
  "triage.self.advice2": "Report again tomorrow — 30 seconds by voice",
  "triage.self.advice3": "Wear a mask in shared spaces while the flu alert is active",
  "triage.self.cta": "Back to home",

  // ===== Clinic: doctor match =====
  "clinic.match.ready": "Your voice consult is ready to book",
  "clinic.match.back": "Triage",
  "clinic.filter.lang.any": "Any language",
  "clinic.filter.gender.any": "Any doctor",
  "clinic.filter.gender.f": "Female doctor",
  "clinic.filter.gender.m": "Male doctor",
  "clinic.match.formula": "Culture match = language + district + gender + religion",
  "clinic.match.score": "{n}% match",
  "clinic.match.inGcc": "In-GCC",
  "clinic.match.volunteer": "Volunteer",
  "clinic.match.basedIn": "{specialty} · based in {city}",
  "clinic.match.district": "from {district}, your home district",
  "clinic.match.voiceConsult": "Voice consult",
  "clinic.match.none": 'No doctors match these filters — try "Any language".',
  "spec.family": "Family Medicine",
  "spec.internal": "Internal Medicine",
  "spec.occ": "Occupational Health",
  "spec.community": "Community Health",
  "spec.counsel": "Counselling — mental health",
  "spec.general": "General Medicine",
  "doctor.avail.vol.today": "Volunteer · today {time}",
  "doctor.avail.vol.tomorrow": "Volunteer · tomorrow {time}",
  "doctor.avail.gcc.today": "In-GCC · today {time}",

  // ===== Language names =====
  "lang.english": "English",
  "lang.urdu": "Urdu",
  "lang.hindi": "Hindi",
  "lang.bengali": "Bengali",
  "lang.arabic": "Arabic",
  "lang.nepali": "Nepali",
  "lang.punjabi": "Punjabi",
  "lang.sindhi": "Sindhi",
  "lang.pashto": "Pashto",
  "lang.malayalam": "Malayalam",
  "lang.multilingual": "Multilingual",

  // ===== Clinic: voice consult =====
  "consult.sub": "{specialty} · voice consult",
  "consult.cost": "$0.05 / consult",
  "consult.data": "≈2.3 MB vs ≈26 MB for video",
  "consult.connected": "{time} · connected",
  "consult.end": "End consult",
  "consult.cameraNote":
    "Camera stays off by default — modest, low-data, and cheap. Video only if you and the doctor both agree it is needed.",
  "consult.script1": "Hello Imran bhai. I'm Dr. Ayesha, from Gujranwala. How is the fever and cough today?",
  "consult.script2": "The fever was at night, I took paracetamol. Today a mild cough and body aches.",
  "consult.script3": "Any chest pain or difficulty breathing? Runny nose?",
  "consult.script4": "No, just the cough and weakness.",
  "consult.script5":
    "Good — this looks like seasonal flu. Drink plenty of water, rest, and paracetamol every 6 hours if fever goes above 38°C. If not better in 3 days, consult me again.",

  // ===== Clinic: consult summary =====
  "summary.title": "Consultation summary",
  "summary.doctor": "Doctor",
  "summary.duration": "Duration",
  "summary.duration.value": "{time} (simulated)",
  "summary.cost": "Cost",
  "summary.cost.value": "$0.05",
  "summary.followup": "Follow-up",
  "summary.followup.value": "In 3 days",
  "summary.advice": "Doctor's advice",
  "summary.advice1": "Seasonal influenza — rest and fluids",
  "summary.advice2": "Paracetamol 500 mg every 6 hours, only if fever above 38°C",
  "summary.advice3": "Return immediately if chest pain or breathing trouble starts",
  "summary.advice4": "Wear a mask in shared spaces — your camp has an active flu alert",
  "summary.saved": "Voice notes saved",
  "summary.saved.detail":
    "The full consult is saved as audio notes in {language} — replayable in the app or by calling the IVR line.",
  "summary.another": "Book another consult",
  "summary.impact":
    "By keeping minor illness on voice, the camp's in-person slots stayed free for the ones who needed them — the triage result told {name} exactly which path to take, and the dashboard records the routing outcome anonymously.",

  // ===== Circles: list =====
  "circles.title": "You are not alone",
  "circles.intro":
    "Voice-only rooms with people who understand — your district, your language, your situation. Moderated, safe, and impossible to misuse.",
  "circles.liveTag": "LIVE",
  "circles.live": "LIVE · {n} speaking",
  "circles.anonymous": "Anonymous",
  "circles.members": "{n} members",
  "circles.r1.name": "Home Village: Gujranwala",
  "circles.r1.topic": "Talk in your own dialect with men from your district",
  "circles.r1.msg1": "Did the transfer come through? Did you send the salary home?",
  "circles.r1.msg2": "Yes, sister-in-law received it. We'll call home tomorrow.",
  "circles.r1.msg3": "Brothers — the camp clinic has flu vaccines on Thursday. Whoever wants to go, I can come along.",
  "circles.r2.name": "New Fathers",
  "circles.r2.topic": "For men whose first child was born after they left home",
  "circles.r2.msg1": "My daughter was born, but I can't hold her.",
  "circles.r2.msg2": "Rafiq bhai, don't carry this alone. Record a voice note — she can hear it when she grows.",
  "circles.r3.name": "Grief Support",
  "circles.r3.topic": "For those who lost someone far away",
  "circles.r3.moderator": "Trained moderator",
  "circles.r4.name": "Addiction Recovery",
  "circles.r4.topic": "Anonymous. No names, no judgement.",
  "circles.r4.moderator": "Recovery coach + doctor on call",
  "circles.r4.msg1": "It's been three months. Hard days still come — especially when the salary is late.",
  "circles.r5.name": "Friday Recitation",
  "circles.r5.topic": "Quran recitation and dua together before Jumu'ah",
  "circles.r6.name": "Diwali Preparations",
  "circles.r6.topic": "Plans, sweets, and photos of last year",

  // ===== Circles: room detail =====
  "circles.room.back": "Rooms",
  "circles.escalation.1": "Struggling or in crisis? You are not alone.",
  "circles.escalation.2": "A counselor can join privately, in your language, right now.",
  "circles.escalation.cta": "Get help now",
  "circles.moderator": "Moderator: {name}",
  "circles.safety.voiceOnly": "Voice only",
  "circles.safety.noDm": "No DMs",
  "circles.safety.noImages": "No images",
  "circles.safety.noVideo": "No video",
  "circles.safety.moderated": "Moderated",
  "circles.safety.escalation": "One-tap escalation",
  "circles.modTag": "moderator",
  "circles.playing": "playing…",
  "circles.tapToPlay": "tap to play",
  "circles.quiet": "A quiet room right now. Join and just listen — that is allowed here too.",
  "circles.listening": "Listening in… tap the mic to speak",
  "circles.roomOpens": "Room opens at 20:00 GST",
  "circles.leave": "Leave room",
  "circles.footer":
    "Direct messages are off for everyone — friendship requests go through the room, and the moderator approves each one. Nothing here can be screenshotted, faked, or forwarded. That is the design.",
  "circles.whyAudio":
    "Why audio-only? Because voice cannot be screenshotted, filtered, or faked — it removes the entire class of image-based abuse that sank earlier audio social apps, while staying low-bandwidth enough for a shared camp phone.",

  // ===== Academy: header & streak =====
  "academy.title": "Learn skills",
  "academy.intro":
    "Bite-sized voice lessons in your language — first aid, heat, hygiene, medication safety. Badges feed your camp's leaderboard.",
  "academy.streak": "7-day streak",
  "academy.weekly": "5 of 8 lessons this week",
  "academy.locked": "locked",

  // ===== Academy: badges =====
  "badge.hygieneHero": "Hygiene Hero",
  "badge.streak7": "7-Day Streak",
  "badge.cough": "Cough Etiquette",
  "badge.firstResponder": "First Responder",
  "badge.heatGuardian": "Heat Guardian",
  "badge.medicineWise": "Medicine Wise",
  "academy.badgeLabel": "Badge: {badge}",
  "academy.minutes": "{n} min",

  // ===== Academy: lesson list =====
  "academy.l1.title": "If a co-worker falls from scaffolding",
  "academy.l1.summary":
    "The first 10 minutes decide whether he reaches the hospital alive. Learn the sequence before you ever need it.",
  "academy.l2.title": "Heatstroke: recognise and respond",
  "academy.l2.summary": "Confusion, no sweating, hot dry skin — you have minutes, not hours. Practise until it is reflex.",
  "academy.l3.title": "Handwashing in the camp",
  "academy.l3.summary":
    "Six camp 'touch points' carry most infections — the bus rail, the canteen, the shared phone charger.",
  "academy.l4.title": "Medicine safety: painkillers are not candy",
  "academy.l4.summary":
    "What mixing painkillers, alcohol, and 'energy' tablets really does to your liver and your family's future.",

  // ===== Academy: lesson detail (common) =====
  "academy.lessons.back": "Lessons",
  "academy.audioMeta": "Audio-first · {n} min · badge: {badge}",
  "academy.playing": "playing in {lang} · 1:12",
  "academy.quiz.title": "Check your reflexes",
  "academy.quiz.correct": "Correct —",
  "academy.quiz.wrong": "Not quite —",
  "academy.quiz.badge": "Badge earned: {badge}",
  "academy.quiz.points": "Your camp leaderboard just gained points.",
  "academy.quiz.tryAgain": "Try again",

  // ===== Academy: lesson 1 — scaffolding fall =====
  "academy.l1.step1.title": "1. Do not move him",
  "academy.l1.step1.detail":
    "Falls from height can break the spine. Moving him wrongly can turn a survivable injury into paralysis. Secure the area first.",
  "academy.l1.step2.title": "2. Shout for the site medic",
  "academy.l1.step2.detail":
    "Call 998 (UAE ambulance) and your site supervisor. Speak slowly; say 'worker fell from height' first.",
  "academy.l1.step3.title": "3. Check breathing",
  "academy.l1.step3.detail":
    "Look at the chest, listen at the mouth. If he is not breathing, start chest compressions — 100 per minute, centre of the chest.",
  "academy.l1.step4.title": "4. Stop visible bleeding",
  "academy.l1.step4.detail": "Press firmly on any bleeding wound with a clean cloth. Keep pressure until help arrives.",
  "academy.l1.step5.title": "5. Keep him warm and talk to him",
  "academy.l1.step5.detail": "Cover with a blanket. Talk in your language so he stays calm and awake.",
  "academy.l1.step6.title": "6. Tell the paramedics what you saw",
  "academy.l1.step6.detail":
    "How far he fell, where he landed, how long he was unconscious. Two sentences can save him.",
  "academy.l1.quiz.q": "Your co-worker falls and is awake but says his neck hurts. What do you do?",
  "academy.l1.quiz.opt1": "Help him stand up and walk to the shade",
  "academy.l1.quiz.opt2": "Keep him still, call 998, and hold his head steady",
  "academy.l1.quiz.opt3": "Give him water and wait 30 minutes",
  "academy.l1.quiz.explain":
    "Neck pain after a fall means possible spinal injury. The only safe move is no move — stabilise and call the ambulance.",

  // ===== Academy: lesson 2 — heatstroke =====
  "academy.l2.step1.title": "1. Know the three signs",
  "academy.l2.step1.detail":
    "Confusion or strange behaviour, skin hot and dry (sweating has stopped), body temperature very high.",
  "academy.l2.step2.title": "2. Move to shade and strip",
  "academy.l2.step2.detail": "Get him to shade immediately, remove outer clothing, wet the skin with any water you have.",
  "academy.l2.step3.title": "3. Fan continuously",
  "academy.l2.step3.detail": "Airflow over wet skin cools fastest. Two men fanning beats one man panicking.",
  "academy.l2.step4.title": "4. Call 998 while cooling",
  "academy.l2.step4.detail": "Never 'wait to see'. Heatstroke kills within the hour.",
  "academy.l2.step5.title": "5. Nothing by mouth if confused",
  "academy.l2.step5.detail": "A confused worker can choke on water. Only give sips if he is fully awake.",
  "academy.l2.quiz.q": "Which is the strongest sign that it is heatstroke, not just exhaustion?",
  "academy.l2.quiz.opt1": "He is sweating heavily and thirsty",
  "academy.l2.quiz.opt2": "He is confused and his skin is hot and dry",
  "academy.l2.quiz.opt3": "His legs are cramping",
  "academy.l2.quiz.explain":
    "Heavy sweating and cramps mean heat exhaustion — serious but recoverable. Confusion with dry hot skin means sweating has failed: heatstroke. Cool him NOW.",

  // ===== Academy: lesson 3 — handwashing =====
  "academy.l3.step1.title": "1. Twenty seconds, water and soap",
  "academy.l3.step1.detail": "Plain soap works. Sing the first two lines of any song you know — that is twenty seconds.",
  "academy.l3.step2.title": "2. Wash before eating, always",
  "academy.l3.step2.detail": "Hands touch the bus rail, money, tools, and then your roti. Break that chain.",
  "academy.l3.step3.title": "3. After the washroom and after coughing",
  "academy.l3.step3.detail": "During the current flu alert, wash after coughing into your hand as well.",
  "academy.l3.step4.title": "4. Keep a small soap at your bunk",
  "academy.l3.step4.detail": "The shared bathroom soap runs out exactly when it is needed. Own soap = no excuse.",
  "academy.l3.quiz.q": "During the flu alert, when should you wash your hands?",
  "academy.l3.quiz.opt1": "Only before eating",
  "academy.l3.quiz.opt2": "Before eating, after the washroom, and after coughing or sneezing",
  "academy.l3.quiz.opt3": "Once a day after shift",
  "academy.l3.quiz.explain":
    "During an outbreak, every hand-to-face moment is a risk. Three wash moments cover almost all of them.",

  // ===== Academy: lesson 4 — medicine safety =====
  "academy.l4.step1.title": "1. One type of painkiller at a time",
  "academy.l4.step1.detail":
    "Taking paracetamol AND ibuprofen AND 'extra strength' together can overload the liver. Doctors at the clinic will tell you what is safe — ask, it is free.",
  "academy.l4.step2.title": "2. Alcohol plus painkillers damages the liver",
  "academy.l4.step2.detail":
    "The liver processes both. Together, they cause silent damage that appears years later as liver disease.",
  "academy.l4.step3.title": "3. Sleeping pills from a friend are dangerous",
  "academy.l4.step3.detail":
    "Doses that suit a big man can stop breathing in another. Never share prescription medicine — and mixing sleeping pills with alcohol can be fatal.",
  "academy.l4.step4.title": "4. Addiction starts as 'just to sleep'",
  "academy.l4.step4.detail":
    "Using codeine or opioid painkillers to sleep or to forget stress builds dependence within weeks. The Addiction Recovery circle is anonymous — just listen at first.",
  "academy.l4.quiz.q":
    "A friend offers you his sleeping pills because you cannot sleep after night shift. What is the safest answer?",
  "academy.l4.quiz.opt1": "Take half — a small dose is safe",
  "academy.l4.quiz.opt2": "Refuse, and ask a doctor — the voice consult costs almost nothing",
  "academy.l4.quiz.opt3": "Take one tonight and give one back tomorrow",
  "academy.l4.quiz.explain":
    "Prescription doses are personal. A doctor can find what is actually wrong with your sleep — safely, in your own language, for about five cents.",

  // ===== Academy: leaderboard =====
  "academy.leaderboard.title": "Camp leaderboard — this week",
  "academy.leaderboard.lessons": "{n} lessons",
  "academy.leaderboard.note":
    "Diaspora-sponsored prizes go to the top camp each month — last month: cricket gear for Sonapur.",

  // ===== Academy: eco challenge =====
  "academy.eco.title": "Walk-to-Work Week",
  "academy.eco.badge": "{camps} camps · {pct}% to goal",
  "academy.eco.detail": "{joined} of {goal} workers walking to site this week instead of taking the bus.",
  "academy.eco.tree": "Every 30 walked days plants a tree in your home district — diaspora-sponsored",
  "academy.eco.join": "Join the challenge",
  "academy.eco.joined": "Joined — see you at 05:30",

  // ===== Academy: civic petitions =====
  "academy.civic.title": "Raise your voice — civic actions",
  "academy.p1.title": "Basic health insurance for camp workers",
  "academy.p1.authority": "To: Ministry of Emigration & Employers' Association",
  "academy.p1.summary":
    "Camp accommodation should include basic health coverage, not just injury-on-site. Workers who are sick wait until collapse — that costs everyone more.",
  "academy.p2.title": "Camp clinic open after 19:00",
  "academy.p2.authority": "To: Al Quoz accommodation management",
  "academy.p2.summary": "Shift ends at 18:00. A clinic that closes at 17:00 is a clinic we cannot use.",
  "academy.civic.count": "of {target} signatures",
  "academy.civic.includingYours": "including yours",
  "academy.civic.sign": "Add my name",
  "academy.civic.signed": "Signed",
  "academy.civic.note":
    "Petitions are delivered monthly through partner NGOs and the workers' welfare attaché — the same channel, backed by the anonymous numbers on the Data tab.",

  // ===== Data =====
  "data.title": "Community data",
  "data.intro":
    "Anonymized, aggregated numbers — what workers report, how the platform routes them, and what changes in the camps. Anyone can cite it; no one can be identified from it.",
  "data.badge1": "Simulated prototype data",
  "data.badge2": "MIT open data — for advocacy, NGOs, and researchers",
  "data.tile1.label": "Voice consults this month",
  "data.tile1.detail": "across 6 GCC countries",
  "data.tile2.label": "Workers reached by alerts",
  "data.tile2.detail": "in 8 languages",
  "data.tile3.label": "Clinic-verified alerts",
  "data.tile3.detail": "confirmed by partner clinics",
  "data.tile4.label": "Average consult cost",
  "data.tile4.detail": "audio-only, low data",
  "data.early.title": "Early warning — voice reports vs. alerts vs. formal confirmation",
  "data.early.desc":
    "The Al Quoz influenza cluster, week by week. Workers' anonymous voice reports cross the detection threshold two weeks before formal surveillance confirms the outbreak.",
  "data.early.legend1": "Worker voice reports",
  "data.early.legend2": "Awaaz alert issued",
  "data.early.legend3": "Formal surveillance confirms",
  "data.early.note":
    "Awaaz flagged the Al Quoz influenza cluster from worker voice reports in week 3. Formal surveillance confirmed it in week 5 — two weeks later. During those two weeks, 8,300 workers received masks and hydration guidance.",
  "data.routing.title": "Where consults are routed",
  "data.routing.desc":
    "46% of cases never need a doctor — and 38% are resolved by voice. Only 1 in 6 needs the clinic, keeping in-person slots free.",
  "data.route.selfCare": "Self-care",
  "data.route.voice": "Voice consult",
  "data.route.inPerson": "In-person referral",
  "data.routing.legendItem": "{route} — {value}%",
  "data.bylang.title": "Voice consults by language",
  "data.bylang.desc": "The culture-matching engine in practice — care happens in the worker's own language, not the clinic's.",
  "data.series.routing": "Routing",
  "data.series.alerts": "Alerts",
  "data.series.consults": "Consults",
  "data.byarea.title": "Alerts issued by area — this month",
  "data.advocacy.title": "What this page becomes after the prototype",
  "data.advocacy.body":
    "The number a workers' welfare attaché cites in a funding meeting; the evidence an NGO attaches to a petition on the Academy tab; the open dataset a researcher forks from the repository. Individual privacy is protected by aggregation and anonymization — the design documents define exactly what is published and what never leaves the device.",

  // ===== App demonstration =====
  "demo.launch": "Demo",
  "demo.title": "App demonstration",
  "demo.subtitle": "One worker's journey through Awaaz — what he sees, what the AI does, and where humans are in charge.",
  "demo.stepOf": "Step {n} of {total}",
  "demo.screen": "Worker's screen",
  "demo.judges": "For judges",
  "demo.next": "Continue",
  "demo.back": "Back",
  "demo.restart": "Restart",
  "demo.finish": "Close demonstration",
  "demo.explore": "Explore the Academy tab",
  "demo.step.1": "Alerts",
  "demo.step.2": "How you feel",
  "demo.step.3": "AI + human review",
  "demo.step.4": "Offline",
  "demo.step.5": "Summary",

  // ===== App demonstration: step 1 — alerts =====
  "demo.s1.heading": "What the worker sees first",
  "demo.s1.sub": "Imran opens Awaaz before his shift. The most urgent information is already on top — no menus, no chatbot.",
  "demo.src.title": "Where this alert came from",
  "demo.src.individual": "{n} individual voice reports",
  "demo.src.ngo": "Verified by {n} NGO partner clinics",
  "demo.src.government": "Government advisory",
  "demo.src.gov.a1": "Cross-checked with government surveillance — influenza A confirmed in 3 camps",
  "demo.src.gov.a2": "Heat advisory — midday outdoor work ban extended",
  "demo.s1.q1": "What does the worker see first?",
  "demo.s1.a1": "Timestamped health alerts for his camp — in his own language, most urgent first.",
  "demo.s1.q2": "Where did the information come from?",
  "demo.s1.a2": "Three human sources: reports from individual workers, verification by NGO partner clinics, and government advisories. AI never writes an alert.",
  "demo.s1.q3": "How old is it?",
  "demo.s1.a3": "Every alert carries its age — 'issued 2 days ago', 'issued 6 hours ago' — and is re-verified or expires, so workers never see stale data presented as current.",

  // ===== App demonstration: step 2 — symptom report =====
  "demo.s2.heading": "The worker reports how he feels",
  "demo.s2.sub": "Tap or speak — 30 seconds, fully anonymous. Try it: pick what Imran is feeling today.",
  "demo.s2.q": "What are you feeling today?",
  "demo.s2.selected": "{n} selected",
  "demo.s2.q1": "Who is behind a report?",
  "demo.s2.a1": "Nobody identifiable — no name, no ID, no employer. Reports are aggregated by camp block only.",
  "demo.s2.q2": "What if the worker cannot read?",
  "demo.s2.a2": "Every step is voice-first: the same report can be spoken on any phone (IVR: 800-AWAAZ). Literacy is never a barrier.",
  "demo.s2.q3": "How does this connect to the alerts?",
  "demo.s2.a3": "Anonymous reports like this one are the raw material — the 'individual' source you saw in step 1.",

  // ===== App demonstration: step 3 — AI + human review =====
  "demo.s3.heading": "AI analyzes — a human approves",
  "demo.s3.sub": "The report is analyzed instantly. Nothing reaches the worker until a human moderator has reviewed it.",
  "demo.ai.title": "AI triage — draft analysis",
  "demo.ai.flu": "Fever with cough matches the active influenza cluster in this camp (47 reports this week). Draft recommendation: voice consult within 24 hours; mask and hydration guidance now.",
  "demo.ai.heat": "Heat symptoms match the active heatwave alert (46°C expected today). Draft recommendation: hydration protocol, shade breaks, and watch for heatstroke signs.",
  "demo.ai.other": "Symptoms logged and clustered with the camp's weekly reports. No active alert matches. Draft recommendation: self-care guidance and monitor for 48 hours.",
  "demo.ai.fine": "No symptoms reported — logged as a healthy day. This is signal too: it makes anomaly detection for the camp more accurate.",
  "demo.ai.sent": "Draft sent to a human moderator",
  "demo.mod.title": "Human moderator review",
  "demo.mod.role": "Camp clinic nurse · NGO partner clinic",
  "demo.mod.approved": "Reviewed and approved {mins} minutes after the report",
  "demo.mod.note": "The moderator can edit, downgrade, or reject the AI's draft. Nothing reaches the worker unreviewed.",
  "demo.s3.care.q": "How would you like to get help?",
  "demo.s3.care.self": "Self-care",
  "demo.s3.care.self.hint": "Free · voice-guided · works offline",
  "demo.s3.care.online": "Online appointment",
  "demo.s3.care.online.hint": "Voice consult · $0.05 · matched doctor",
  "demo.s3.care.inperson": "In-person meeting",
  "demo.s3.care.inperson.hint": "Camp clinic or ER · for warning signs",
  "demo.s3.self.detail": "A voice-guided plan in the worker's own language: hydration, rest, and exactly which warning signs mean 'see a doctor now'. Free — and it plays offline.",
  "demo.s3.online.detail": "From your home district — a volunteer doctor, available today {time}. Audio-only: $0.05, about 2.3 MB.",
  "demo.s3.inperson.detail": "Camp clinic, Block B — 5 minutes on foot, open until 17:00. Emergency: ambulance 998, nearest ER 12 minutes away.",
  "demo.s3.q1": "What does the AI do?",
  "demo.s3.a1": "It analyzes what's wrong — clusters the symptoms, compares them with active alerts and camp history — drafts a recommendation, and reports to a human moderator.",
  "demo.s3.q2": "What does the AI not do?",
  "demo.s3.a2": "It never issues alerts, never makes a final diagnosis, and never contacts a worker on its own. When confidence is low, it escalates to a human instead of guessing.",
  "demo.s3.q3": "When does a human or approved source enter?",
  "demo.s3.a3": "At every decision point: alerts are issued by clinics, NGOs, and government; the AI's draft here is moderator-approved before the worker sees it; and the Data tab publishes only reviewed, aggregated statistics.",

  // ===== App demonstration: step 4 — offline academy =====
  "demo.s4.heading": "No internet — the Academy keeps working",
  "demo.s4.sub": "Connectivity in labour camps is patchy. Awaaz assumes it will drop.",
  "demo.s4.offline": "Connection lost — showing content downloaded earlier",
  "demo.s4.cached": "Downloaded on camp Wi-Fi · yesterday 21:40",
  "demo.s4.q1": "What happens with no internet?",
  "demo.s4.a1": "Lessons, self-care guides, and the latest alerts are pre-downloaded whenever free Wi-Fi is available — camp kiosk, clinic, bus. Offline, the worker can still learn and revise; only live features like Circles rooms wait for a connection.",
  "demo.s4.q2": "Do lessons need the internet at all?",
  "demo.s4.a2": "No — Academy lessons also play by phone call (IVR: 800-AWAAZ), for workers with no data or a feature phone.",

  // ===== App demonstration: step 5 — summary =====
  "demo.s5.heading": "The demonstration in one screen",
  "demo.s5.sub": "Humans inform. AI assists. Humans approve. And when the network drops, the service degrades gracefully — never silently.",

  // ===== Accessibility labels =====
  "a11y.primary": "Primary",
  "a11y.primaryMobile": "Primary mobile",
  "a11y.langSelect": "Select app language (8 corridor languages + English)",
  "a11y.waveform": "voice waveform",
  "a11y.liveWave": "live voice waveform",
  "a11y.mute": "Mute microphone",
  "a11y.unmute": "Unmute microphone",
  "a11y.openRoom": "Open circle room {name}",
  "a11y.playNote": "Play voice note from {speaker}, {duration}",
  "a11y.openLesson": "Open lesson {title}",
  "a11y.filterLang": "Filter doctors by language",
  "a11y.filterGender": "Filter doctors by gender",
  "a11y.weeklyGoal": "weekly goal progress",
  "a11y.lessonProgress": "weekly lesson progress",
  "a11y.ecoProgress": "eco challenge progress",
  "a11y.petitionProgress": "petition progress {count} of {target}",
  "a11y.roomConversation": "Room conversation",
  "a11y.consultInProgress": "Voice consultation in progress",
  "a11y.demoLaunch": "Open the app demonstration (guided walkthrough)",
  "a11y.demoProgress": "demonstration step {n} of {total}",
} satisfies Record<string, string>;

export type StringKey = keyof typeof en;
export type Locale = Partial<Record<StringKey, string>>;
