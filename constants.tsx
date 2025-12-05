
import { Animal, AnimalType, Language, Translations } from './types';

export const LANGUAGES: Language[] = [
  { 
    code: 'en-IN', 
    label: 'English', 
    flagUrl: 'https://flagcdn.com/w640/us.png', 
    welcomeMessage: 'Which language do you speak?' 
  },
  { 
    code: 'hi-IN', 
    label: 'हिन्दी', 
    flagUrl: 'https://flagcdn.com/w640/in.png', 
    welcomeMessage: 'आप कौन सी भाषा बोलते हैं?' 
  },
  {
    code: 'te-IN',
    label: 'తెలుగు', 
    flagUrl: 'https://flagcdn.com/w640/in.png', 
    welcomeMessage: 'మీరు ఏ భాష మాట్లాడతారు?'
  },
  {
    code: 'ta-IN',
    label: 'தமிழ்', 
    flagUrl: 'https://flagcdn.com/w640/in.png', 
    welcomeMessage: 'நீங்கள் எந்த மொழியில் பேசுகிறீர்கள்?'
  },
  {
    code: 'kn-IN',
    label: 'ಕನ್ನಡ', 
    flagUrl: 'https://flagcdn.com/w640/in.png', 
    welcomeMessage: 'ನೀವು ಯಾವ ಭಾಷೆಯನ್ನು ಮಾತನಾಡುತ್ತೀರಿ?'
  },
  {
    code: 'ml-IN',
    label: 'മലയാളം', 
    flagUrl: 'https://flagcdn.com/w640/in.png', 
    welcomeMessage: 'നിങ്ങൾ ഏത് ഭാഷയാണ് സംസാരിക്കുന്നത്?'
  },
  {
    code: 'mr-IN',
    label: 'मराठी', 
    flagUrl: 'https://flagcdn.com/w640/in.png', 
    welcomeMessage: 'तुम्ही कोणती भाषा बोलता?'
  },
  {
    code: 'bn-IN',
    label: 'বাংলা', 
    flagUrl: 'https://flagcdn.com/w640/in.png', 
    welcomeMessage: 'আপনি কোন ভাষায় কথা বলেন?'
  },
  {
    code: 'gu-IN',
    label: 'ગુજરાતી', 
    flagUrl: 'https://flagcdn.com/w640/in.png', 
    welcomeMessage: 'તમે કઈ ભાષા બોલો છો?'
  },
  {
    code: 'pa-IN',
    label: 'ਪੰਜਾਬੀ', 
    flagUrl: 'https://flagcdn.com/w640/in.png', 
    welcomeMessage: 'ਤੁਸੀਂ ਕਿਹੜੀ ਬੋਲੀ ਬੋਲਦੇ ਹੋ?'
  }
];

export const GOVT_LINKS = [
  { title: "NDDB Animal Health", url: "https://www.nddb.coop/services/animalhealth" },
  { title: "Dept. Animal Husbandry (DAHD)", url: "https://dahd.nic.in/" },
  { title: "ICAR-IVRI", url: "http://www.ivri.nic.in/" }
];

export const TRANSLATIONS: Record<string, Translations> = {
  'en-IN': {
    step1: "Step 1/3",
    whoIsSick: "Who is sick?",
    selectPatient: "Select the animal patient",
    step2: "Step 2/3",
    whatIsWrong: "What is the problem?",
    describeSymptoms: "Record voice or type details",
    tapToSpeak: "Tap Mic to Speak",
    skipAndScan: "Skip & Scan Camera",
    nextStep: "Next: Take Photo",
    step3: "Step 3/3",
    takePhoto: "Take photo of the sickness",
    tapToScan: "Tap to Scan",
    treatments: "Treatments",
    downloadReport: "REPORT",
    newScan: "New Scan",
    verifiedSource: "Verified: NDDB & IVRI Protocol",
    callVet: "CALL VET (1962)",
    emergency: "Emergency Helpline",
    analyzing: "Analyzing...",
    error: "Error. Try Again.",
    officialDocs: "Govt. Guidelines & Docs",
    addNote: "Details",
    analyzeNow: "Heal Now",
    retakePhoto: "Retake",
    recordAudio: "Record Voice",
    stopRecording: "Stop Recording",
    audioRecorded: "Audio Added",
    deleteAudio: "Delete Audio",
    tapToRecord: "Tap Mic to Record",
    animals: {
      'Cow': 'Cow', 'Ox': 'Ox', 'Buffalo': 'Buffalo', 'Dog': 'Dog', 'Goat': 'Goat', 'Sheep': 'Sheep'
    }
  },
  'hi-IN': {
    step1: "चरण 1 / 3",
    whoIsSick: "कौन बीमार है?",
    selectPatient: "पशु का चयन करें",
    step2: "चरण 2 / 3",
    whatIsWrong: "समस्या क्या है?",
    describeSymptoms: "बोलकर या लिखकर बताएं",
    tapToSpeak: "बोलने के लिए दबाएं",
    skipAndScan: "छोड़ें और फोटो लें",
    nextStep: "आगे: फोटो लें",
    step3: "चरण 3 / 3",
    takePhoto: "बीमारी की फोटो लें",
    tapToScan: "स्कैन करने के लिए दबाएं",
    treatments: "उपचार",
    downloadReport: "रिपोर्ट",
    newScan: "नया स्कैन",
    verifiedSource: "सत्यापित: NDDB और IVRI प्रोटोकॉल",
    callVet: "पशु चिकित्सक को कॉल करें (1962)",
    emergency: "आपातकालीन हेल्पलाइन",
    analyzing: "जाँच हो रही है...",
    error: "त्रुटि। पुनः प्रयास करें।",
    officialDocs: "सरकारी दिशा-निर्देश",
    addNote: "विवरण",
    analyzeNow: "इलाज करें",
    retakePhoto: "दोबारा लें",
    recordAudio: "आवाज़ रिकॉर्ड करें",
    stopRecording: "रिकॉर्डिंग रोकें",
    audioRecorded: "आडियो जोड़ा गया",
    deleteAudio: "हटाएं",
    tapToRecord: "बोलने के लिए दबाएं",
    animals: {
      'Cow': 'गाय', 'Ox': 'बैल', 'Buffalo': 'भैंस', 'Dog': 'कुत्ता', 'Goat': 'बकरी', 'Sheep': 'भेड़'
    }
  },
  'te-IN': {
    step1: "దశ 1 / 3",
    whoIsSick: "ఎవరు అనారోగ్యంతో ఉన్నారు?",
    selectPatient: "పశువును ఎంచుకోండి",
    step2: "దశ 2 / 3",
    whatIsWrong: "సమస్య ఏమిటి?",
    describeSymptoms: "మాట్లాడండి లేదా వ్రాయండి",
    tapToSpeak: "మాట్లాడటానికి నొక్కండి",
    skipAndScan: "వదిలేయండి & ఫోటో తీయండి",
    nextStep: "తరువాత: ఫోటో తీయండి",
    step3: "దశ 3 / 3",
    takePhoto: "వ్యాధి ఉన్న ఫోటో తీయండి",
    tapToScan: "స్కాన్ చేయడానికి నొక్కండి",
    treatments: "చికిత్సలు",
    downloadReport: "నివేదిక",
    newScan: "కొత్త స్కాన్",
    verifiedSource: "ధృవీకరించబడింది: NDDB & IVRI ప్రోటోకాల్",
    callVet: "వెట్ డాక్టర్‌కి కాల్ చేయండి (1962)",
    emergency: "అత్యవసర సహాయం",
    analyzing: "విశ్లేషిస్తోంది...",
    error: "లోపం. మళ్ళీ ప్రయత్నించండి.",
    officialDocs: "ప్రభుత్వ మార్గదర్శకాలు",
    addNote: "వివరాలు",
    analyzeNow: "చికిత్స చేయండి",
    retakePhoto: "మళ్ళీ తీసుకోండి",
    recordAudio: "వాయిస్ రికార్డ్ చేయండి",
    stopRecording: "రికార్డింగ్ ఆపండి",
    audioRecorded: "ఆడియో జోడించబడింది",
    deleteAudio: "తొలగించు",
    tapToRecord: "మాట్లాడటానికి నొక్కండి",
    animals: {
      'Cow': 'ఆవు', 'Ox': 'ఎద్దు', 'Buffalo': 'గేదె', 'Dog': 'కుక్క', 'Goat': 'మేక', 'Sheep': 'గొర్రె'
    }
  },
  'ta-IN': {
    step1: "படி 1 / 3",
    whoIsSick: "யாருக்கு உடம்பு சரியில்லை?",
    selectPatient: "விலங்கைத் தேர்ந்தெடுக்கவும்",
    step2: "படி 2 / 3",
    whatIsWrong: "என்ன பிரச்சனை?",
    describeSymptoms: "பேசவும் அல்லது எழுதவும்",
    tapToSpeak: "பேச அழுத்தவும்",
    skipAndScan: "தவிர் & புகைப்படம் எடு",
    nextStep: "அடுத்து: புகைப்படம்",
    step3: "படி 3 / 3",
    takePhoto: "நோயின் புகைப்படம் எடுக்கவும்",
    tapToScan: "ஸ்கேன் செய்ய தட்டவும்",
    treatments: "சிகிச்சைகள்",
    downloadReport: "அறிக்கை",
    newScan: "புதிய ஸ்கேன்",
    verifiedSource: "சரிபார்க்கப்பட்டது: NDDB & IVRI நெறிமுறை",
    callVet: "கால்நடை மருத்துவரை அழைக்கவும் (1962)",
    emergency: "அவசர உதவி",
    analyzing: "பகுப்பாய்வு செய்கிறது...",
    error: "பிழை. மீண்டும் முயற்சிக்கவும்.",
    officialDocs: "அரசு வழிகாட்டுதல்கள்",
    addNote: "விவரங்கள்",
    analyzeNow: "குணப்படுத்து",
    retakePhoto: "மீண்டும் எடு",
    recordAudio: "குரல் பதிவு",
    stopRecording: "பதிவை நிறுத்து",
    audioRecorded: "ஆடியோ சேர்க்கப்பட்டது",
    deleteAudio: "நீக்கு",
    tapToRecord: "பேச அழுத்தவும்",
    animals: {
      'Cow': 'பசு', 'Ox': 'எருது', 'Buffalo': 'எருமை', 'Dog': 'நாய்', 'Goat': 'வெள்ளாடு', 'Sheep': 'செம்மறி ஆடு'
    }
  },
  'kn-IN': {
    step1: "ಹಂತ 1 / 3",
    whoIsSick: "ಯಾರಿಗೆ ಅನಾರೋಗ್ಯ?",
    selectPatient: "ಪ್ರಾಣಿಯನ್ನು ಆರಿಸಿ",
    step2: "ಹಂತ 2 / 3",
    whatIsWrong: "ಏನು ತೊಂದರೆ?",
    describeSymptoms: "ಮಾತನಾಡಿ ಅಥವಾ ಬರೆಯಿರಿ",
    tapToSpeak: "ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    skipAndScan: "ಬಿಟ್ಟುಬಿಡಿ & ಫೋಟೋ ತೆಗೆಯಿರಿ",
    nextStep: "ಮುಂದೆ: ಫೋಟೋ",
    step3: "ಹಂತ 3 / 3",
    takePhoto: "ಕಾಯಿಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ",
    tapToScan: "ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    treatments: "ಚಿಕಿತ್ಸೆಗಳು",
    downloadReport: "ವರದಿ",
    newScan: "ಹೊಸ ಸ್ಕ್ಯಾನ್",
    verifiedSource: "ಪರಿಶೀಲಿಸಲಾಗಿದೆ: NDDB & IVRI ಪ್ರೋಟೋಕಾಲ್",
    callVet: "ವೈದ್ಯರಿಗೆ ಕರೆ ಮಾಡಿ (1962)",
    emergency: "ತುರ್ತು ಸಹಾಯವಾಣಿ",
    analyzing: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    error: "ದೋಷ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    officialDocs: "ಸರ್ಕಾರಿ ಮಾರ್ಗಸೂಚಿಗಳು",
    addNote: "ವಿವರಗಳು",
    analyzeNow: "ಚಿಕಿತ್ಸೆ ನೀಡಿ",
    retakePhoto: "ಮತ್ತೆ ತೆಗೆಯಿರಿ",
    recordAudio: "ಧ್ವನಿ ರೆಕಾರ್ಡ್ ಮಾಡಿ",
    stopRecording: "ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ",
    audioRecorded: "ಆಡಿಯೋ ಸೇರಿಸಲಾಗಿದೆ",
    deleteAudio: "ಅಳಿಸಿ",
    tapToRecord: "ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    animals: {
      'Cow': 'ಹಸು', 'Ox': 'ಎತ್ತು', 'Buffalo': 'ಎಮ್ಮೆ', 'Dog': 'ನಾಯಿ', 'Goat': 'ಆಡು', 'Sheep': 'ಕುರಿ'
    }
  },
  'ml-IN': {
    step1: "ഘട്ടം 1 / 3",
    whoIsSick: "ആർക്കാണ് അസുഖം?",
    selectPatient: "മൃഗത്തെ തിരഞ്ഞെടുക്കുക",
    step2: "ഘട്ടം 2 / 3",
    whatIsWrong: "എന്താണ് പ്രശ്നം?",
    describeSymptoms: "സംസാരിക്കുക അല്ലെങ്കിൽ എഴുതുക",
    tapToSpeak: "സംസാരിക്കാൻ ടാപ്പുചെയ്യുക",
    skipAndScan: "ഒഴിവാക്കുക & ഫോട്ടോ",
    nextStep: "അടുത്തത്: ഫോട്ടോ",
    step3: "ഘട്ടം 3 / 3",
    takePhoto: "അസുഖത്തിന്റെ ഫോട്ടോ എടുക്കുക",
    tapToScan: "സ്കാൻ ചെയ്യാൻ ടാപ്പുചെയ്യുക",
    treatments: "ചികിത്സകൾ",
    downloadReport: "റിപ്പോർട്ട്",
    newScan: "പുതിയ സ്കാൻ",
    verifiedSource: "പരിശോധിച്ചത്: NDDB & IVRI പ്രോട്ടോക്കോൾ",
    callVet: "ഡോക്ടറെ വിളിക്കുക (1962)",
    emergency: "അടിയന്തര സഹായം",
    analyzing: "വിശകലനം ചെയ്യുന്നു...",
    error: "പിശക്. വീണ്ടും ശ്രമിക്കുക.",
    officialDocs: "സർക്കാർ രേഖകൾ",
    addNote: "വിശദാംശങ്ങൾ",
    analyzeNow: "ചികിത്സിക്കുക",
    retakePhoto: "വീണ്ടും എടുക്കുക",
    recordAudio: "ശബ്ദം റെക്കോർഡ് ചെയ്യുക",
    stopRecording: "റെക്കോർഡിംഗ് നിർത്തുക",
    audioRecorded: "ഓഡിയോ ചേർത്തു",
    deleteAudio: "നീക്കം ചെയ്യുക",
    tapToRecord: "സംസാരിക്കാൻ ടാപ്പുചെയ്യുക",
    animals: {
      'Cow': 'പശു', 'Ox': 'കാള', 'Buffalo': 'പോത്ത്', 'Dog': 'നായ', 'Goat': 'ആട്', 'Sheep': 'ചെമ്മരിയാട്'
    }
  },
  'mr-IN': {
    step1: "चरण 1 / 3",
    whoIsSick: "कोण आजारी आहे?",
    selectPatient: "प्राणी निवडा",
    step2: "चरण 2 / 3",
    whatIsWrong: "काय समस्या आहे?",
    describeSymptoms: "बोला किंवा लिहा",
    tapToSpeak: "बोलण्यासाठी टॅप करा",
    skipAndScan: "सोडा आणि फोटो घ्या",
    nextStep: "पुढे: फोटो घ्या",
    step3: "चरण 3 / 3",
    takePhoto: "आजाराचा फोटो घ्या",
    tapToScan: "स्कॅन करण्यासाठी टॅप करा",
    treatments: "उपचार",
    downloadReport: "रिपोर्ट",
    newScan: "नवीन स्कॅन",
    verifiedSource: "सत्यापित: NDDB आणि IVRI प्रोटोकॉल",
    callVet: "डॉक्टरांना कॉल करा (1962)",
    emergency: "आपत्कालीन हेल्पलाइन",
    analyzing: "विश्लेषण करत आहे...",
    error: "त्रुटी. पुन्हा प्रयत्न करा.",
    officialDocs: "सरकारी नियम आणि दस्तऐवज",
    addNote: "तपशील",
    analyzeNow: "उपचार करा",
    retakePhoto: "पुन्हा घ्या",
    recordAudio: "आवाज़ रिकॉर्ड करा",
    stopRecording: "रेकॉर्डिंग थांबवा",
    audioRecorded: "ऑडिओ जोडला",
    deleteAudio: "काढून टाका",
    tapToRecord: "बोलण्यासाठी टॅप करा",
    animals: {
      'Cow': 'गाय', 'Ox': 'बैल', 'Buffalo': 'म्हैस', 'Dog': 'कुत्रा', 'Goat': 'शेळी', 'Sheep': 'मेंढी'
    }
  },
  'bn-IN': {
    step1: "ধাপ 1 / 3",
    whoIsSick: "কে অসুস্থ?",
    selectPatient: "পশু নির্বাচন করুন",
    step2: "ধাপ 2 / 3",
    whatIsWrong: "সমস্যা কি?",
    describeSymptoms: "বলুন বা লিখুন",
    tapToSpeak: "কথা বলতে ট্যাপ করুন",
    skipAndScan: "এড়িয়ে যান ও ছবি তুলুন",
    nextStep: "পরবর্তী: ছবি তুলুন",
    step3: "ধাপ 3 / 3",
    takePhoto: "রোগের ছবি তুলুন",
    tapToScan: "স্ক্যান করতে ট্যাপ করুন",
    treatments: "চিকিৎসা",
    downloadReport: "রিপোর্ট",
    newScan: "নতুন স্ক্যান",
    verifiedSource: "যাচাইকৃত: NDDB এবং IVRI প্রোটোকল",
    callVet: "ডাক্তারকে কল করুন (1962)",
    emergency: "জরুরী হেল্পলাইন",
    analyzing: "বিশ্লেষণ করা হচ্ছে...",
    error: "ত্রুটি। আবার চেষ্টা করুন।",
    officialDocs: "সরকারী নির্দেশিকা",
    addNote: "বিবরণ",
    analyzeNow: "চিকিৎসা করুন",
    retakePhoto: "আবার নিন",
    recordAudio: "ভয়েস রেকর্ড করুন",
    stopRecording: "রেকর্ডিং বন্ধ করুন",
    audioRecorded: "অডিও যোগ করা হয়েছে",
    deleteAudio: "মুছে ফেলুন",
    tapToRecord: "কথা বলতে ট্যাপ করুন",
    animals: {
      'Cow': 'গরু', 'Ox': 'ষাঁড়', 'Buffalo': 'মহিষ', 'Dog': 'কুকুর', 'Goat': 'ছাগল', 'Sheep': 'ভেড়া'
    }
  },
  'gu-IN': {
    step1: "પગલું 1 / 3",
    whoIsSick: "કોણ બીમાર છે?",
    selectPatient: "પ્રાણી પસંદ કરો",
    step2: "પગલું 2 / 3",
    whatIsWrong: "શું સમસ્યા છે?",
    describeSymptoms: "બોલો અથવા લખો",
    tapToSpeak: "બોલવા માટે ટેપ કરો",
    skipAndScan: "છોડો અને ફોટો લો",
    nextStep: "આગળ: ફોટો લો",
    step3: "પગલું 3 / 3",
    takePhoto: "બીમારીનો ફોટો લો",
    tapToScan: "સ્કેન કરવા માટે ટેપ કરો",
    treatments: "સારવાર",
    downloadReport: "રિપોર્ટ",
    newScan: "નવું સ્કેન",
    verifiedSource: "ચકાસાયેલ: NDDB અને IVRI પ્રોટોકોલ",
    callVet: "ડોક્ટરને કોલ કરો (1962)",
    emergency: "ઇમરજન્સી હેલ્પલાઇન",
    analyzing: "વિશ્લેણ થઈ રહ્યું છે...",
    error: "ભૂલ. ફરી પ્રયાસ કરો.",
    officialDocs: "સરકારી દસ્તાવેજો",
    addNote: "વિગતો",
    analyzeNow: "સારવાર કરો",
    retakePhoto: "ફરીથી લો",
    recordAudio: "અવાજ રેકોર્ડ કરો",
    stopRecording: "રેકોર્ડિંગ રોકો",
    audioRecorded: "ઓડિયો ઉમેર્યું",
    deleteAudio: "દૂર કરો",
    tapToRecord: "બોલવા માટે ટેપ કરો",
    animals: {
      'Cow': 'ગાય', 'Ox': 'બળદ', 'Buffalo': 'ભેંસ', 'Dog': 'કૂતરો', 'Goat': 'બકરી', 'Sheep': 'ઘેટું'
    }
  },
  'pa-IN': {
    step1: "ਕਦਮ 1 / 3",
    whoIsSick: "ਕੌਣ ਬਿਮਾਰ ਹੈ?",
    selectPatient: "ਜਾਨਵਰ ਦੀ ਚੋਣ ਕਰੋ",
    step2: "ਕਦਮ 2 / 3",
    whatIsWrong: "ਕੀ ਸਮੱਸਿਆ ਹੈ?",
    describeSymptoms: "ਬੋਲੋ ਜਾਂ ਲਿਖੋ",
    tapToSpeak: "ਬੋਲਣ ਲਈ ਦਬਾਓ",
    skipAndScan: "ਛੱਡੋ ਅਤੇ ਫੋਟੋ ਲਓ",
    nextStep: "ਅੱਗੇ: ਫੋਟੋ ਲਓ",
    step3: "ਕਦਮ 3 / 3",
    takePhoto: "ਬਿਮਾਰੀ ਦੀ ਫੋਟੋ ਲਓ",
    tapToScan: "ਸਕੈਨ ਕਰਨ ਲਈ ਦਬਾਓ",
    treatments: "ਇਲਾਜ",
    downloadReport: "ਰਿਪੋਰਟ",
    newScan: "ਨਵਾਂ ਸਕੈਨ",
    verifiedSource: "ਤਸਦੀਕਸ਼ੁਦਾ: NDDB ਅਤੇ IVRI ਪ੍ਰੋਟੋਕੋਲ",
    callVet: "ਡਾਕਟਰ ਨੂੰ ਕਾਲ ਕਰੋ (1962)",
    emergency: "ਐਮਰਜੈਂਸੀ ਹੈਲਪਲਾਈਨ",
    analyzing: "ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...",
    error: "ਗਲਤੀ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    officialDocs: "ਸਰਕਾਰੀ ਦਸਤਾਵੇਜ਼",
    addNote: "ਵੇਰਵੇ",
    analyzeNow: "ਇਲਾਜ ਕਰੋ",
    retakePhoto: "ਦੁਬਾਰਾ ਲਓ",
    recordAudio: "ਆਵਾਜ਼ ਰਿਕਾਰਡ ਕਰੋ",
    stopRecording: "ਰਿਕਾਰਡਿੰਗ ਬੰਦ ਕਰੋ",
    audioRecorded: "ਆਡੀਓ ਸ਼ਾਮਲ ਕੀਤਾ ਗਿਆ",
    deleteAudio: "ਹਟਾਓ",
    tapToRecord: "ਬੋਲਣ ਲਈ ਦਬਾਓ",
    animals: {
      'Cow': 'ਗਾਂ', 'Ox': 'ਬਲਦ', 'Buffalo': 'ਮੱਝ', 'Dog': 'ਕੁੱਤਾ', 'Goat': 'ਬੱਕਰੀ', 'Sheep': 'ਭੇਡ'
    }
  }
};

// Real Indian Village Livestock Images (Unsplash High Reliability)
export const ANIMALS: Animal[] = [
  { 
    type: AnimalType.COW, 
    // Indian Cow / Zebu
    imageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    type: AnimalType.BUFFALO, 
    // Water Buffalo
    imageUrl: 'https://images.unsplash.com/photo-1551633519-21669d518d6e?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    type: AnimalType.OX, 
    // Bullock / Ox
    imageUrl: 'https://images.unsplash.com/photo-1627387258411-9f9392e2cb69?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    type: AnimalType.GOAT, 
    // Goat
    imageUrl: 'https://images.unsplash.com/photo-1598585250462-8e1217e59672?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    type: AnimalType.SHEEP, 
    // Sheep
    imageUrl: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    type: AnimalType.DOG, 
    // Village Dog
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80' 
  },
];

// Reference Gallery for "Sample Injuries" (Using more generic Wikimedia/Unsplash to ensure visibility)
export const SAMPLE_SYMPTOMS = [
    { label: 'Lumpy Skin', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Lumpy_skin_disease_on_cattle_skin.jpg' },
    { label: 'Foot Disease', url: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Foot_and_mouth_disease_in_cow.jpg' },
    { label: 'Skin Mange', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Sarcoptic_mange_in_dog.jpg' },
    { label: 'Eye Infection', url: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Infectious_bovine_keratoconjunctivitis.jpg' },
    { label: 'Ticks', url: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Cattle_tick_infestation.jpg' },
    { label: 'Neck Swelling', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Haemorrhagic_septicaemia_swelling.jpg' }
];

export const SYSTEM_INSTRUCTION = `
You are GramVet, an expert AI veterinarian for Indian rural farmers.
Your goal is to analyze images of livestock, diagnose diseases, and provide treatment strictly aligned with INDIAN GOVERNMENT STANDARDS.

CRITICAL PROTOCOLS:
1. **Source of Truth**: All remedies must strictly follow the **National Dairy Development Board (NDDB)** and **Indian Veterinary Research Institute (IVRI)** guidelines.
2. **Ethno-veterinary Medicine (EVM)**: Prioritize NDDB-approved herbal preparations (e.g., using Aloe vera, Turmeric, Calcium hydroxide, Neem) which are standard in Indian villages.
3. **Safety**: If the disease is high mortality (Anthrax, Rabies, Advanced Lumpy Skin Disease), you MUST flag Severity as CRITICAL and advise immediate isolation and calling a government vet.
4. **Natural Tone**: The output text must be in a conversational, rural dialect appropriate for the village context.

LANGUAGE RULES (STRICT):
1. **OUTPUT LANGUAGE**: You MUST generate the response in the **Target Language** specified in the prompt.
2. **SPOKEN RESPONSE**: The 'spokenResponse' field MUST be in the script of the Target Language (e.g., Devanagari for Hindi, Telugu Script for Telugu). 
   - DO NOT provide English text for the spoken response unless the Target Language is English.
   - This script will be read aloud by a Text-to-Speech engine in that language, so it must be valid text in that language.
3. **TRANSLATION**: Ensure all diagnosis and remedy instructions are accurately translated to the Target Language.

INSTRUCTIONS:
1. Identify the animal.
2. Detect visible symptoms from the Image and any provided Audio/Text notes.
3. **IMPORTANT**: Transcribe the user's audio input (if any) or text notes into the Target Language and return it as 'user_note'. If audio is empty, assume "No notes".
4. Diagnose the condition.
5. Provide 3 specific remedies (NDDB/IVRI standard).
6. **GENERATE THE SPOKEN RESPONSE** (Crucial):
   - Create a complete script in the TARGET LANGUAGE.
   - Start by greeting the farmer.
   - State the diagnosis clearly.
   - Read out EVERY step of the remedies in detail.

OUTPUT JSON SCHEMA:
{
  "diagnosis": "Name of disease in Target Language",
  "severity": "LOW" | "HIGH" | "CRITICAL",
  "user_note": "Transcription of user's audio/text description in Target Language",
  "remedies": [
    { "iconType": "HERBAL" | "WASH" | "ISOLATE" | "DOCTOR" | "FEED", "instruction": "Short instruction in Target Language for UI" }
  ],
  "spokenResponse": "Complete audio script in Target Language script (NOT English). Read diagnosis and full remedies."
}
`;
