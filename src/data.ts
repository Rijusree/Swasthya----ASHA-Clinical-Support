// Shared Types, Local Persistence layer and Rich Translations for rural India ASHA CDSS
// Formulated to support robust field application in regional languages.

export interface TranslationSet {
  // Brand Header
  brandTitle: string;
  brandSub: string;
  brandSubClinic: string;
  gatewayStatus: string;
  syncStatusSynced: string;
  syncStatusPending: string;
  complianceTitle: string;
  offlineSafeTitle: string;

  // Navigation & Lists
  backText: string;
  searchPlaceholder: string;
  listTitle: string;
  listTotal: string;
  noMatchingPatients: string;
  filterAll: string;
  filterMaternal: string;
  filterPediatric: string;

  // Patient Info View Header
  patientDetailHeader: string;
  spouseOrGuardianLabel: string;
  villageSectorLabel: string;
  registeredAgeLabel: string;
  patientIdLabel: string;
  yearsSuffix: string;
  monthsSuffix: string;
  genderMale: string;
  genderFemale: string;

  // Diagnostic Forms
  maternalHeading: string;
  pediatricHeading: string;
  baselineCheck: string;
  measuredHemoglobinLabel: string;
  measuredRespiratoryLabel: string;
  fastBreathingThresholdLabel: string;
  chestInDrawingLabel: string;
  chestInDrawingSubLabel: string;
  stridorSoundLabel: string;
  stridorSoundSubLabel: string;
  feverDaysLabel: string;
  feverNone: string;
  feverDaysText: string;
  sessionNotesLabel: string;
  sessionNotesPlaceholder: string;

  // Form Actions
  btnRecordVitals: string;
  btnRequestAmbulance: string;
  syncSuccessNotification: string;
  referralNotification: string;

  // Diagnostic Support Panel
  cdssPanelTitle: string;
  voicePlaybackButton: string;
  voicePlaybackActive: string;
  stopVoiceButton: string;
  checklistEnTitle: string;
  checklistLocalTitle: string;
  classificationNotice: string;

  // Trajectory Summary Insights
  baselineAlertNoHistory: string;
  longitudinalInsightTitle: string;
  maternalAnemiaAlertTxt: string;
  maternalHbStableTxt: string;
  maternalHbImprovedTxt: string;
  maternalHbDegradeTxt: string;
  pedRespiratoryUrgentTxt: string;
  pedRespiratoryResolvedTxt: string;
  pedRespiratorySpeedTxt: string;

  // Consult AI Panel
  consultAiButton: string;
  consultAiPanelTitle: string;
  voicePromptBtn: string;
  voicePromptSimulationText: string;
  aiQueryPlaceholder: string;
  aiSendButton: string;
  aiThinking: string;
  aiErrorTxt: string;
  aiNotesDisclaimer: string;
  customTemplatesTitle: string;
  templateLabelHb: string;
  templateLabelPneumonia: string;
  templateLabelMedication: string;
  triageUrgent: string;
  triageTreatment: string;
  triageStable: string;
  sectorText: string;
  categoryMaternal: string;
  categoryChild: string;
  noPreviousRecord: string;
  btnRegisterNewPatient: string;
  tabPatientRegistry: string;
  tabAiKnowledgeBase: string;
  patientFlow: string;
  activeCase: string;
  databaseEngine: string;
  dbEngineStatus: string;
  welcomeHome: string;
  welcomeStudio: string;
  welcomeAbout: string;
  welcomeJournal: string;
  welcomeReachUs: string;
  welcomeBeginJourney: string;
  welcomeSubtitle: string;
  welcomeDescription: string;
  portalHome: string;
  onlineSim: string;
  offlineSim: string;
  manualWord: string;
  manualTitle: string;
  manualStepTitle: string;
  manualStep1: string;
  manualStep2: string;
  manualStep3: string;
  manualStep4: string;
  manualFaqTitle: string;
  manualFaqQ1: string;
  manualFaqA1: string;
  manualFaqQ2: string;
  manualFaqA2: string;
  manualFaqQ3: string;
  manualFaqA3: string;
  manualNotice: string;
  settingsLabel: string;
  accountLabel: string;
  signOutLabel: string;
  signInLabel: string;
  settingsClearCache: string;
  settingsAudioSpeed: string;
}

export const LANGUAGES: Record<string, { name: string; welcome: string; flag: string; translations: TranslationSet }> = {
  hi: {
    name: "हिन्दी",
    welcome: "नैदानिक निर्णय सहायता प्रणाली",
    flag: "🇮🇳",
    translations: {
      brandTitle: "आशा नैदानिक सहायता पोर्टल",
      brandSub: "राष्ट्रीय ग्रामीण स्वास्थ्य मिशन",
      brandSubClinic: "प्राथमिक स्वास्थ्य उप-केंद्र नैदानिक रजिस्ट्री",
      gatewayStatus: "सुरक्षित ऑफलाइन डेटाबेस कतार सक्रिय",
      syncStatusSynced: "सर्वर के साथ सिंक किया गया",
      syncStatusPending: "सिंक लंबित (ऑफ़लाइन सुरक्षित)",
      complianceTitle: "WHO IMCI चिकित्सा नियमों द्वारा प्रमाणित v2.4",
      offlineSafeTitle: "सुरक्षित स्थानीय स्टोरेज",

      backText: "← रोगी सूची पर वापस जाएं",
      searchPlaceholder: "रोगी का नाम, गाँव या क्षेत्रीय आईडी खोजें...",
      listTitle: "गाँव रोगी रजिस्ट्री सूची",
      listTotal: "कुल पंजीकृत",
      noMatchingPatients: "कोई मिलान पंजीकृत ग्रामीण रोगी नहीं मिला।",
      filterAll: "सभी रोगी",
      filterMaternal: "गर्भवती स्त्रियाँ",
      filterPediatric: "बच्चे की जाँच",

      patientDetailHeader: "रोगी विस्तृत विवरण एवं इतिहास",
      spouseOrGuardianLabel: "पति / अभिभावक",
      villageSectorLabel: "गाँव का क्षेत्र",
      registeredAgeLabel: "पंजीकृत आयु",
      patientIdLabel: "रोगी आईडी नंबर",
      yearsSuffix: "वर्ष",
      monthsSuffix: "महीने",
      genderMale: "बालक (Pediatric)",
      genderFemale: "गर्भवती महिला (Maternal)",

      maternalHeading: "मातृ हीमोग्लोबिन प्रसवपूर्व नैदानिक जाँच",
      pediatricHeading: "बाल रोग बाल चिकित्सा श्वसन जाँच",
      baselineCheck: "स्वास्थ्य जांच",
      measuredHemoglobinLabel: "मापा गया हीमोग्लोबिन स्तर (Hb)",
      measuredRespiratoryLabel: "मापी गई श्वसन दर (साँस प्रति मिनट)",
      fastBreathingThresholdLabel: "तीव्र श्वसन सीमा",
      chestInDrawingLabel: "पसली चलना (छाती अंदर धंसना)",
      chestInDrawingSubLabel: "साँस लेते समय निचले पसलियों का अंदर की ओर धंसना",
      stridorSoundLabel: "स्ट्राइडर साँस की ध्वनि (घरघराहट)",
      stridorSoundSubLabel: "साँस लेते समय गले से निकलने वाली सूखी हर्ष ध्वनि",
      feverDaysLabel: "खांसी या बुखार की अवधि (दिन)",
      feverNone: "कोई नहीं",
      feverDaysText: "दिन",
      sessionNotesLabel: "सत्र नैदानिक निर्देश (दवा अनुपालन / चिंताएं)",
      sessionNotesPlaceholder: "रोगी की पोषण संबंधी आवश्यकताओं, स्वच्छता, या स्थानीय लक्षणों के बारे में जानकारी यहाँ दर्ज करें...",

      btnRecordVitals: "विटल्स डेटा सहेजें अद्यतन करें",
      btnRequestAmbulance: "एम्बुलेंस बुलाएं (CHC आपातकाल)",
      syncSuccessNotification: "रोगी रिकॉर्ड सुरक्षित रूप से दर्ज कर लिया गया है। पृष्ठभूमि सिंक चालू है।",
      referralNotification: "आपातकालीन रेफरल भेजा गया: प्राथमिक स्वास्थ्य केंद्र को आपातकालीन वाहन के लिए संदेश प्रेषित। प्रेषण कोड: ",

      cdssPanelTitle: "नैदानिक निर्णय सहायता प्रणाली (CDSS) दिशानिर्देश",
      voicePlaybackButton: "क्लिनिकल ऑडियो निर्देश सुनें",
      voicePlaybackActive: "ऑडियो गाइड निर्देश चालू है",
      stopVoiceButton: "रोकें",
      checklistEnTitle: "प्रत्यक्ष नैदानिक गाइड (English Clinical Guide)",
      checklistLocalTitle: "विस्तृत स्थानीय भाषा गाइड (Regional Instructions)",
      classificationNotice: "यह वर्गीकरण विश्व स्वास्थ्य संगठन (WHO) के नैदानिक मानकों के पूर्ण अनुरूप है।",

      baselineAlertNoHistory: "महत्वपूर्ण आधार: कोई पिछला इतिहास नहीं मिला। यह मूल्यांकन रोगी के इतिहास की शुरुआत करता है।",
      longitudinalInsightTitle: "ऐतिहासिक नैदानिक तुलना सारांश",
      maternalAnemiaAlertTxt: "चेतावनी: गंभीर एनीमिया की स्थिति। पिछले हीमोग्लोबिन जांच से गिरावट दर्ज़ की गई है।",
      maternalHbStableTxt: "स्थिर स्थिति: मातृ हीमोग्लोबिन पिछले स्तर के बराबर स्थिर बनी हुई है।",
      maternalHbImprovedTxt: "सकारात्मक बदलाव: हीमोग्लोबिन स्तर में सुधार दर्ज़ किया गया है। वर्तमान उपचार को जारी रखें।",
      maternalHbDegradeTxt: "क्लिनिकल गिरावट: मातृ हीमोग्लोबिन में कमी देखी गई है। दवा की नियमितता की गहन जाँच करें।",
      pedRespiratoryUrgentTxt: "गंभीर स्थिति: छाती धंसना या स्ट्राइडर देखा गया है। तुरंत CHC अस्पताल रेफर करें।",
      pedRespiratoryResolvedTxt: "सकारात्मक परिणाम: सांस की कठिनाई (पसली चलना) सुधर गई है। फेफड़ों की सूजन सामान्य है।",
      pedRespiratorySpeedTxt: "श्वसन गति संकेतक: उम्र के अनुसार साँस की गति में परिवर्तन रिकॉर्ड हुआ है।",

      consultAiButton: "चिकित्सक AI परामर्श प्राप्त करें",
      consultAiPanelTitle: "विशेषज्ञ AI चिकित्सक निर्णय केंद्र (Clinical Decision)",
      voicePromptBtn: "क्षेत्रीय आवाज अनुकरण रिकॉर्ड करें",
      voicePromptSimulationText: "आवाज इनपुट सक्रिय: 'बच्चे को सांस लेने में कठिनाई है, क्या मुझे एंटीबायोटिक्स शुरू करना चाहिए?'",
      aiQueryPlaceholder: "इस रोगी के लक्षणों या ऐतिहासिक जटिलताओं के बारे में AI डॉक्टर से सवाल पूछें...",
      aiSendButton: "परामर्श प्राप्त करें",
      aiThinking: "AI रोगी के पूरे नैदानिक इतिहास और विटल्स का विश्लेषण कर रहा है...",
      aiErrorTxt: "AI से संपर्क विफल: कृपया जांचें कि Settings > Secrets में GEMINI_API_KEY कॉन्फ़िगर किया गया है।",
      aiNotesDisclaimer: "अस्वीकरण: यह एक नैदानिक निर्णय सहायता प्रणाली (CDSS) है। अंतिम निर्णय हमेशा स्वास्थ्य नियमों के अनुरूप लें।",
      customTemplatesTitle: "त्वरित प्रश्न टेम्पलेट",
      templateLabelHb: "हीमोग्लोबिन गिरावट और आहार योजना विश्लेषण",
      templateLabelPneumonia: "निमोनिया खतरे के स्तर और तत्काल दवाओं की सलाह",
      templateLabelMedication: "साधारण सर्दी खांसी और एंटीबायोटिक प्रतिरोधी नियम",
      triageUrgent: "त्वरित रेफरल (Urgent)",
      triageTreatment: "उपचार के लिए तैयार (Treatment Ready)",
      triageStable: "स्थिर स्थिति (Stable)",
      sectorText: "गाँव का क्षेत्र",
      categoryMaternal: "🤰 प्रसवपूर्व माता (Maternal)",
      categoryChild: "👶 शिशु (Pediatric)",
      noPreviousRecord: "कोई पिछला रिकॉर्ड नहीं",
      btnRegisterNewPatient: "नया मरीज पंजीकृत करें",
      tabPatientRegistry: "रोगी रजिस्ट्री (Registry)",
      tabAiKnowledgeBase: "चिकित्सक AI ज्ञान केंद्र (AI KB)",
      patientFlow: "मरीजों का प्रवाह (Patient Flow)",
      activeCase: "सक्रिय केस (Active Case)",
      databaseEngine: "डेटाबेस इंजन:",
      dbEngineStatus: "ऑफ़लाइन एनक्रिप्टेड स्टोरेज सक्रिय",
      welcomeHome: "मुख्य पृष्ठ",
      welcomeStudio: "स्टूडियो",
      welcomeAbout: "हमारे बारे में",
      welcomeJournal: "पत्रिका",
      welcomeReachUs: "संपर्क करें",
      welcomeBeginJourney: "यात्रा शुरू करें",
      welcomeSubtitle: "ग्रामीण स्वास्थ्य सेवा का सशक्तिकरण, अनमोल जीवन की रक्षा।",
      welcomeDescription: "दूरदराज के परिवारों, वंचित माताओं और बच्चों को उच्च गुणवत्ता वाली स्वास्थ्य सेवा प्रदान करने में समर्पित आशा कार्यकर्ताओं की सहायता के लिए निर्मित। विश्वसनीय और सुलभ ग्रामीण स्वास्थ्य पोर्टल।",
      portalHome: "पोर्टल होम",
      onlineSim: "ऑनलाइन सिम",
      offlineSim: "ऑफलाइन सिम",
      manualWord: "फील्ड गाइड",
      manualTitle: "आशा कार्यकर्ता प्रशिक्षण गाइड",
      manualStepTitle: "चरण-दर-चरण नैदानिक प्रशिक्षण गाइड",
      manualStep1: "बाईं ओर 'मरीजों का प्रवाह' सूची से किसी मौजूदा मरीज को चुनें या नारंगी रंग के बटन का उपयोग करके नया पंजीकरण करें।",
      manualStep2: "गर्भवती माताओं या बच्चों के महत्वपूर्ण नैदानिक कार्ड खोलें।",
      manualStep3: "हीमोग्लोबिन स्तर या श्वसन दर को समायोजित करें। प्रणाली वास्तविक समय में 'गंभीर नैदानिक श्रेणियों' की गणना करती है।",
      manualStep4: "सक्रिय सत्र डेटा को सीधे डिवाइस की स्थानीय मेमोरी कतार में सहेजने के लिए 'विटल्स डेटा सहेजें' पर क्लिक करें।",
      manualFaqTitle: "अक्सर पूछे जाने वाले प्रश्न (F.A.Q.)",
      manualFaqQ1: "१. क्या यह पोर्टल पूरी तरह से ऑफलाइन काम कर सकता है?",
      manualFaqA1: "हां, यह आपके ब्राउज़र की स्थानीय सुरक्षित मेमोरी का उपयोग करके पूरी तरह से ऑफलाइन काम कर सकता है। ऑफलाइन मोड में रिकॉर्ड सुरक्षित रहते हैं और बाद में सिंक होते हैं।",
      manualFaqQ2: "२. विश्व स्वास्थ्य संगठन (WHO IMCI) के नियम कैसे लागू होते हैं?",
      manualFaqA2: "यह प्रणाली निमोनिया और अन्य रोगों का तेजी से आकलन करने के लिए WHO IMCI के मानक मापदंडों का उपयोग करती है (जैसे शिशु के लिए सांस की दर)।",
      manualFaqQ3: "३. मुझे आपातकालीन एम्बुलेंस को कब कॉल करना चाहिए?",
      manualFaqA3: "यदि रोगी में गंभीर लक्षण जैसे छाती का अंदर धंसना, असामान्य सांस की आवाज या हीमोग्लोबिन ७.० से कम है, तो तुरंत आपातकालीन एम्बुलेंस बुलाएं।",
      manualNotice: "स्वास्थ्य सेवा फील्ड मैनुअल • स्वास्थ्य मंत्रालय और डब्ल्यूएचओ आईएमसीआई समूह के सहयोग से तैयार किया गया।",
      settingsLabel: "सेटिंग्स",
      accountLabel: "व्यक्तिगत खाता",
      signOutLabel: "साइन आउट",
      signInLabel: "साइन इन करें",
      settingsClearCache: "लोकल डेटाबेस रीसेट करें",
      settingsAudioSpeed: "ऑडियो गाइड गति"
    }
  },
  bn: {
    name: "বাংলা",
    welcome: "ক্লিনিক্যাল সিদ্ধান্ত সহায়তা সিস্টেম",
    flag: "🇮🇳",
    translations: {
      brandTitle: "আশা ক্লিনিক্যাল সিদ্ধান্ত সহায়তা পোর্টাল",
      brandSub: "জাতীয় গ্রামীণ স্বাস্থ্য মিশন",
      brandSubClinic: "প্রাথমিক স্বাস্থ্য উপ-কেন্দ্র ক্লিনিক্যাল রেজিস্ট্রি",
      gatewayStatus: "সুরক্ষিত অফলাইন ডেটাবেস সারি সক্রিয়",
      syncStatusSynced: "সার্ভারের সাথে সিঙ্ক করা হয়েছে",
      syncStatusPending: "সিঙ্ক অমীমাংসিত (অফলাইনে নিরাপদ)",
      complianceTitle: "WHO IMCI নিয়ম নির্দেশাবলী দ্বারা প্রত্যয়িত v2.4",
      offlineSafeTitle: "নিরাপদ স্থানীয় স্টোরেজ",

      backText: "← রোগীর তালিকায় ফিরে যান",
      searchPlaceholder: "রোগীর নাম, গ্রাম বা আঞ্চলিক আইডি খুঁজুন...",
      listTitle: "গ্রামের রোগীর খাতাপত্র তালিকা",
      listTotal: "মোট নিবন্ধিত",
      noMatchingPatients: "কোনো নিবন্ধিত গ্রামের রোগীর খোঁজ পাওয়া যায়নি।",
      filterAll: "সমস্ত রোগী",
      filterMaternal: "গর্ভবতী মায়েরা",
      filterPediatric: "শিশুর স্ক্রীনিং",

      patientDetailHeader: "রোগীর বিস্তারিত বিবরণ এবং ইতিহাস",
      spouseOrGuardianLabel: "স্বামী / অভিভাবক",
      villageSectorLabel: "গ্রামের এলাকা",
      registeredAgeLabel: "নিবন্ধিত বয়স",
      patientIdLabel: "রোগীর আইডি নম্বর",
      yearsSuffix: "বছর",
      monthsSuffix: "মাস",
      genderMale: "শিশু পুত্র (Pediatric)",
      genderFemale: "গর্ভবতী মহিলা (Maternal)",

      maternalHeading: "মাতৃত্বকালীন হিমোগ্লোবিন প্রসবপূর্ব স্ক্রীনিং",
      pediatricHeading: "শিশু শ্বাসকষ্ট ও পালমোনারি স্ক্রীনিং",
      baselineCheck: "পরীক্ষা করুন",
      measuredHemoglobinLabel: "পরিমাপিত হিমোগ্লোবিন স্তর (Hb)",
      measuredRespiratoryLabel: "পরিমাপিত শ্বাসকষ্টের গতি (প্রতি মিনিটে শ্বাস)",
      fastBreathingThresholdLabel: "উচ্চ শ্বাসের গতি সীমা",
      chestInDrawingLabel: "পাঁজর বসা (বুক দেবে যাওয়া)",
      chestInDrawingSubLabel: "শ্বাস নেওয়ার সময় পাঁজরের নিচের হাড় ভেতরের দিকে চলে যাওয়া",
      stridorSoundLabel: "স্ট্রাইডর শ্বাসকষ্টের শব্দ (ঘরঘরে আওয়াজ)",
      stridorSoundSubLabel: "শ্বাস নেওয়ার সময় শ্বাসনালী থেকে নির্গত হওয়া শুকনো কঠোর শব্দ",
      feverDaysLabel: "কাশি বা জ্বরের সময়কাল (দিন)",
      feverNone: "কিছুই না",
      feverDaysText: "দিন",
      sessionNotesLabel: "সেশন ক্লিনিক্যাল নোট (ওষুধের নিয়ম ও জটিলতা সমূহ)",
      sessionNotesPlaceholder: "রোগীর পুষ্টি, স্যানিটেশন, বা স্থানীয় লক্ষণ সম্পর্কে তথ্য এখানে লিখুন...",

      btnRecordVitals: "উপাদান রেকর্ড করুন এবং তথ্য আপডেট করুন",
      btnRequestAmbulance: "জরুরী অ্যাম্বুলেন্স ডাকুন (CHC এমার্জেন্সি)",
      syncSuccessNotification: "রোগীর তথ্য সুরক্ষিতভাবে স্থানীয় ডেটাবেসে নিবন্ধিত হয়েছে। ব্যাকগ্রাউন্ড সিঙ্ক চলছে।",
      referralNotification: "জরুরী রেফারেল প্রেরিত: প্রাথমিক স্বাস্থ্য কেন্দ্রে এমার্জেন্সি পরিবহনের সংকেত পাঠানো হয়েছে। ডিসপ্যাচ কোড: ",

      cdssPanelTitle: "ক্লিনিক্যাল সিদ্ধান্ত সহায়তা সিস্টেম (CDSS) নির্দেশিকা",
      voicePlaybackButton: "ক্লিনিক্যাল অডিও গাইড শুনুন",
      voicePlaybackActive: "অডিও নির্দেশিকা সক্রিয় রয়েছে",
      stopVoiceButton: "থামুন",
      checklistEnTitle: "প্রত্যক্ষ ক্লিনিক্যাল গাইড (English Clinical Guide)",
      checklistLocalTitle: "বিস্তারিত স্থানীয় ভাষার নির্দেশাবলী (Regional Instructions)",
      classificationNotice: "এই মূল্যায়ন বিশ্ব স্বাস্থ্য সংস্থা (WHO)-র ক্লিনিক্যাল প্রোটোকলের সম্পূর্ণ সমতুল্য।",

      baselineAlertNoHistory: "গুরুত্বপূর্ণ বেসলাইন: পূর্ববর্তী কোনো বিবরণ পাওয়া যায়নি। এই পরীক্ষা থেকেই ইতিহাস শুরু হবে।",
      longitudinalInsightTitle: "ঐতিহাসিক ক্লিনিক্যাল বিশ্লেষণ সারাংশ",
      maternalAnemiaAlertTxt: "সতর্কতা: তীব্র মাতৃত্বকালীন রক্তাল্পতা। পূর্ববর্তী পরীক্ষার তুলনায় হিমোগ্লোবিনের মাত্রা হ্রাস পেয়েছে।",
      maternalHbStableTxt: "স্থিতিশীল অবস্থা: মাতার হিমোগ্লোবিনের মাত্রা পূর্ববর্তী পরীক্ষার সমতুল্য বজায় রয়েছে।",
      maternalHbImprovedTxt: "ইতিবাচক পরিবর্তন: হিমোগ্লোবিন স্তরে সন্তোষজনক উন্নতি লক্ষ্য করা গেছে। বর্তমান প্রতিরোধমূলক ব্যবস্থার প্রশংসা করুন।",
      maternalHbDegradeTxt: "ক্লিনিক্যাল অবনতি: মাতার হিমোগ্লোবিনের মাত্রা হ্রাস ঘটেছে। ওষুধ সেবনের নিয়মিততা কঠোরভাবে পরীক্ষা করুন।",
      pedRespiratoryUrgentTxt: "জরুরী অবস্থা: শিশুর পাঁজরের নিচে সংকোচন অথবা স্ট্রাইডর শ্বাস শব্দ লক্ষ্য করা গেছে। অবিলম্বে CHC রেফার করুন।",
      pedRespiratoryResolvedTxt: "রোগ নিরাময়: শ্বাসকষ্টের সমস্যা দূর হয়েছে। ফুসফুসের কার্যকারিতা সম্পূর্ণ স্বাভাবিক।",
      pedRespiratorySpeedTxt: "শ্বাসের গতি নির্দেশক: বয়স অনুসারে শ্বাসের গতিতে পরিবর্তন নথিভুক্ত করা হয়েছে।",

      consultAiButton: "AI বিশেষজ্ঞ চিকিৎসকের পরামর্শ নিন",
      consultAiPanelTitle: "বিশেষজ্ঞ AI চিকিৎসক সিদ্ধান্ত কেন্দ্র (Clinical Decision)",
      voicePromptBtn: "আঞ্চলিক কণ্ঠস্বর রেকর্ড অনুকরণ",
      voicePromptSimulationText: "ভয়েস ইনপুট সক্রিয়: 'শিশুর অতিরিক্ত শ্বাসকষ্ট দেখা দিয়েছে, এক্ষুনি কি ওষুধ খাওয়াবো?'",
      aiQueryPlaceholder: "এই রোগীর লক্ষণ বা পূর্ববর্তী জটিলতা সম্পর্কে AI ডাক্তারের সাথে কথা বলুন...",
      aiSendButton: "পরামর্শ নিন",
      aiThinking: "AI রোগীর সম্পূর্ণ ক্লিনিক্যাল বিবরণ এবং ইতিহাস বিশ্লেষণ করছে...",
      aiErrorTxt: "AI সংযোগ ব্যর্থ হয়েছে: অনুগ্রহ করে সেটিংস > সিক্রেট প্যানেলে GEMINI_API_KEY যুক্ত করুন।",
      aiNotesDisclaimer: "দাবিত্যাগ: এটি একটি সাহায্যকারী ক্লিনিক্যাল সিদ্ধান্ত সহায়তা সিস্টেম (CDSS)। জটিলতায় সর্বদা হাসপাতালের চিকিৎসকের মতামত নিন।",
      customTemplatesTitle: "দ্রুত প্রশ্ন টেমপ্লেট",
      templateLabelHb: "হিমোগ্লোবিন পুনরুদ্ধার এবং পুষ্টিকর খাদ্য ব্যবস্থা",
      templateLabelPneumonia: "নিউমোনিয়া বিপদের লক্ষণ এবং ওরাল থেরাপি নির্দেশনা",
      templateLabelMedication: "অ্যান্টিবায়োটিক প্রতিরোধ ক্ষমতা এবং সঠিক ওষুধের মাত্রা",
      triageUrgent: "জরুরী রেফারেল (Urgent)",
      triageTreatment: "চিকিৎসার জন্য প্রস্তুত (Treatment Ready)",
      triageStable: "স্থিতিশীল অবস্থা (Stable)",
      sectorText: "গ্রামের এলাকা",
      categoryMaternal: "🤰 গর্ভবতী মা (Maternal)",
      categoryChild: "👶 শিশু (Pediatric)",
      noPreviousRecord: "কোনো পূর্ববর্তী রেকর্ড নেই",
      btnRegisterNewPatient: "নতুন রোগী নিবন্ধন করুন",
      tabPatientRegistry: "রোগী খাতাপত্র (Registry)",
      tabAiKnowledgeBase: "চিকিৎসক AI জ্ঞানভাণ্ডার (AI KB)",
      patientFlow: "রোগীদের প্রবাহ (Patient Flow)",
      activeCase: "সক্রিয় কেস (Active Case)",
      databaseEngine: "ডেটাবেস ইঞ্জিন:",
      dbEngineStatus: "অফলাইন এনক্রিপ্ট করা স্টোরেज সক্রিয়",
      welcomeHome: "মূল পাতা",
      welcomeStudio: "স্টুডিও",
      welcomeAbout: "আমাদের সম্পর্কে",
      welcomeJournal: "পত্রিকা",
      welcomeReachUs: "যোগাযোগ করুন",
      welcomeBeginJourney: "যাত্রা শুরু করুন",
      welcomeSubtitle: "গ্রামীণ স্বাস্থ্য পরিষেবার ক্ষমতায়ন, মূল্যবান জীবন রক্ষা।",
      welcomeDescription: "প্রত্যন্ত অঞ্চলের পরিবার, সুবিধা-বঞ্চিত মা এবং শিশুদের উচ্চমানের চিকিৎসা পরিষেবা প্রদানে নিয়োজিত আশা কর্মীদের সহায়তার জন্য নির্মিত। নির্ভরযোগ্য এবং সহজলভ্য গ্রামীণ স্বাস্থ্য পোর্টাল।",
      portalHome: "পোর্টাল হোম",
      onlineSim: "অনলাইন সিম",
      offlineSim: "অফলাইন সিম",
      manualWord: "ফিল্ড গাইড",
      manualTitle: "আশা কর্মী প্রশিক্ষণ নির্দেশিকা",
      manualStepTitle: "ধাপ-ধাপে ক্লিনিক্যাল প্রশিক্ষণ নির্দেশিকা",
      manualStep1: "বামদিকের 'রোগীদের প্রবাহ' তালিকা থেকে কোনো রোগীকে বেছে নিন বা কমলা রঙের বোতাম টিপে নতুন নিবন্ধন করুন।",
      manualStep2: "গর্ভবতী মায়েদের অথবা শিশুদের গুরুত্বপূর্ণ ক্লিনিক্যাল কার্ডটি খুলুন।",
      manualStep3: "হিমোগ্লোবিনের মাত্রা বা শ্বাস-প্রশ্বাসের গতি সামঞ্জস্য করুন। সিস্টেম রিয়েল-টাইমে গুরুতর ক্লিনিক্যাল বিভাগগুলি গণনা করবে।",
      manualStep4: "সক্রিয় সেশনের বিবরণ সরাসরি ডিভাইসের স্থানীয় মেমরিতে সংরক্ষণ করতে 'উপাত্ত সংরক্ষণ করুন' বোতামে ক্লিক করুন।",
      manualFaqTitle: "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (F.A.Q.)",
      manualFaqQ1: "১. এই পোর্টালটি কি সম্পূর্ণ অফলাইনে কাজ করতে পারে?",
      manualFaqA1: "হ্যাঁ, এটি আপনার ব্রাউজারের স্থানীয় নিরাপদ মেমরি ব্যবহার করে সম্পূর্ণ অফলাইনে কাজ করতে পারে। অফলাইন মোডে ডেটা ডিভাইসে সংরক্ষিত থাকে এবং পরে স্বয়ংক্রিয়ভাবে সিঙ্ক হয়।",
      manualFaqQ2: "২. বিশ্ব স্বাস্থ্য সংস্থা (WHO IMCI) নির্দেশিকা কীভাবে কার্যকর হয়?",
      manualFaqA2: "এই সিস্টেমটি নিউমোনিয়া বা অন্যান্য রোগের সঠিক ঝুঁকি মূল্যায়নের জন্য WHO IMCI স্ট্যান্ডার্ড প্যারামিটার (যেমন শিশুর শ্বাসের গতি) ব্যবহার করে।",
      manualFaqQ3: "৩. কখন আমার জরুরি অ্যাম্বুলেন্স ডাকা উচিত?",
      manualFaqA3: "যদি কোনো রোগীর বিপজ্জনক লক্ষণ যেমন পাঁজরের নিচে বুকের চামড়া ধসে যাওয়া, অস্বাভাবিক শ্বাস-শব্দ বা হিমোগ্লোবিন ৭.০ এর নিচে থাকে, তবে অবিলম্বে অ্যাম্বুলেন্স ডাকুন।",
      manualNotice: "স্বাস্থ্য পরিষেবা ফিল্ড ম্যানুয়াল • স্বাস্থ্য মন্ত্রক এবং ডাব্লুএইচও আইএমসিআই গ্রুপের সহযোগিতায় প্রস্তুত।",
      settingsLabel: "সেটিংস",
      accountLabel: "ব্যক্তিগত অ্যাকাউন্ট",
      signOutLabel: "সাইন আউট",
      signInLabel: "সাইন ইন",
      settingsClearCache: "লোকাল ডাটাবেস রিসেট করুন",
      settingsAudioSpeed: "অডিও গাইড গতি"
    }
  },
  ta: {
    name: "தமிழ்",
    welcome: "மருத்துவ முடிவு ஆதரவு அமைப்பு",
    flag: "🇮🇳",
    translations: {
      brandTitle: "ஆஷா மருத்துவ முடிவு ஆதரவு தளம்",
      brandSub: "தேசிய கிராமப்புற சுகாதார இயக்கம்",
      brandSubClinic: "ஆரம்ப சுகாதார துணை மைய மருத்துவப் பதிவேடு",
      gatewayStatus: "ஆஃப்லைன் தரவுத்தள வரிசை பாதுகாப்பானது",
      syncStatusSynced: "மத்திய சேவையகத்துடன் ஒத்திசைக்கப்பட்டது",
      syncStatusPending: "ஒத்திசைவு நிலுவையில் உள்ளது (உள்ளூரில் பாதுகாப்பானது)",
      complianceTitle: "WHO IMCI மருத்துவ வழிகாட்டுதல் அங்கீகாரம் v2.4",
      offlineSafeTitle: "பாதுகாப்பான உள்ளூர் சேமிப்பு",

      backText: "← நோயாளி பட்டியலுக்குத் திரும்பு",
      searchPlaceholder: "நோயாளி பெயர், கிராமம் அல்லது மண்டல ஐடி தேடவும்...",
      listTitle: "கிராம மருத்துவப் பதிவேடு பட்டியல்",
      listTotal: "மொத்தம் பதிவு செய்யப்பட்டவை",
      noMatchingPatients: "பொருந்தக்கூடிய கிராமத்து நோயாளிகள் யாரும் இல்லை.",
      filterAll: "அனைத்து நோயாளிகள்",
      filterMaternal: "கர்ப்பிணி தாய்மார்கள்",
      filterPediatric: "குழந்தை பரிசோதனை",

      patientDetailHeader: "நோயாளியின் மருத்துவ விவரங்கள் மற்றும் வரலாறு",
      spouseOrGuardianLabel: "கணவர் / பாதுகாவலர்",
      villageSectorLabel: "கிராம தளம்",
      registeredAgeLabel: "பதிவு செய்யப்பட்ட வயது",
      patientIdLabel: "நோயாளி ஐடி எண்",
      yearsSuffix: "ஆண்டுகள்",
      monthsSuffix: "மாதங்கள்",
      genderMale: "குழந்தை (Pediatric)",
      genderFemale: "கர்ப்பிணி தாய் (Maternal)",

      maternalHeading: "கர்ப்பிணி தாய் ஹீமோகுளோபின் மகப்பேறுக்கு முந்தைய பரிசோதனை",
      pediatricHeading: "குழந்தை சுவாச மற்றும் நுரையீரல் மதிப்பீடு",
      baselineCheck: "தேர்வு செய்ய",
      measuredHemoglobinLabel: "அளவிடப்பட்ட ஹீமோகுளோபின் அளவு (Hb)",
      measuredRespiratoryLabel: "சுவாச வீதம் (ஒரு நிமிடத்திற்கு சுவாச எண்ணிக்கை)",
      fastBreathingThresholdLabel: "அதிவேக சுவாச வரம்பு",
      chestInDrawingLabel: "விலா எலும்பு உள்வாங்குதல்",
      chestInDrawingSubLabel: "மூச்சை உள்ளிழுக்கும்போது கீழ் நெஞ்சுப் பகுதி உள்வாங்குதல்",
      stridorSoundLabel: "ஸ்ட்ரைடர் சுவாச சத்தம் (மூச்சடைப்பு ஒலி)",
      stridorSoundSubLabel: "மூச்சை உள்ளிழுக்கும்போது தொண்டையில் இருந்து வரும் உலர்ந்த கரடுமுரடான ஒலி",
      feverDaysLabel: "இருமல் அல்லது காய்ச்சலின் காலம் (நாட்கள்)",
      feverNone: "எதுவுமில்லை",
      feverDaysText: "நாட்கள்",
      sessionNotesLabel: "பரிசோதனை குறிப்புகள் (மருந்து உட்கொள்ளல் / பிரச்சனைகள்)",
      sessionNotesPlaceholder: "நோயாளியின் ஊட்டச்சத்து, சுகாதாரம் அல்லது உள்ளூர் அறிகுறிகள் பற்றிய தகவல்களை இங்கே எழுதவும்...",

      btnRecordVitals: "விவரங்களை சேமித்து பதிவை அச்சிடுங்கள்",
      btnRequestAmbulance: "அவசர சிகிச்சை வாகனத்தை அழைக்கவும் (CHC அவசரம்)",
      syncSuccessNotification: "நோயாளி தரவுகள் உள்ளூர் சாதனத்தில் பாதுகாப்பாக சேமிக்கப்பட்டுள்ளன. பின்னணி ஒத்திசைவு நடைபெறுகிறது.",
      referralNotification: "அவசர பரிந்துரை அனுப்பப்பட்டது: ஆரம்ப சுகாதார நிலையத்திற்கு அவசர வாகன செய்தி அனுப்பப்பட்டது. குறியீடு: ",

      cdssPanelTitle: "மருத்துவ முடிவு ஆதரவு அமைப்பு (CDSS) வழிகாட்டு நெறிமுறைகள்",
      voicePlaybackButton: "மருத்துவ ஒலி குறிப்பை கேட்கவும்",
      voicePlaybackActive: "ஒலி வழிகாட்டுதல் தற்போது செயல்பாட்டில் உள்ளது",
      stopVoiceButton: "நிறுத்து",
      checklistEnTitle: "நேரடி மருத்துவ வழிகாட்டி (English Clinical Guide)",
      checklistLocalTitle: "விரிவான பிராந்திய மொழி வழிகாட்டுதல் (Regional Instructions)",
      classificationNotice: "இந்த மதிப்பீடு உலக சுகாதார அமைப்பின் (WHO) மருத்துவ நெறிமுறைகளுக்கு முழுமையாக உட்பட்டது.",

      baselineAlertNoHistory: "முக்கிய அடிப்படை: முந்தைய வரலாறு எதுவும் கண்டறியப்படவில்லை. இதுவே முதல் பதிவு.",
      longitudinalInsightTitle: "முந்தைய மருத்துவ வரலாற்று ஒப்பீட்டுச் சுருக்கம்",
      maternalAnemiaAlertTxt: "எச்சரிக்கை: கடுமையான இரத்த சோகை. முந்தைய பரிசோதனையை விட ஹீமோகுளோபின் அளவு குறைந்துள்ளது.",
      maternalHbStableTxt: "நிலையான நிலை: ஹீமோகுளோபின் அளவு முந்தைய அளவிலேயே சீராக உள்ளது.",
      maternalHbImprovedTxt: "நேர்மறையான மாற்றம்: ஹீமோகுளோபின் அளவில் நல்ல முன்னேற்றம் ஏற்பட்டுள்ளது. தற்போதைய சிகிச்சையைத் தொடரவும்.",
      maternalHbDegradeTxt: "மருத்துவ வீழ்ச்சி: ஹீமோகுளோபின் அளவு குறைந்துள்ளது. மாத்திரைகளைத் தவறாமல் உட்கொள்வதை உறுதி செய்யவும்.",
      pedRespiratoryUrgentTxt: "தீவிர நிலை: நெஞ்சு உள்வாங்குதல் அல்லது மூச்சடைப்பு சத்தம் உள்ளது. உடனடியாக CHC அவசர பிரிவிற்கு மாற்றவும்.",
      pedRespiratoryResolvedTxt: "நோய் குணமடைதல்: சுவாசக் கோளாறுகள் முற்றிலும் நீங்கியுள்ளன. நுரையீரல் செயல்பாடு சீராக உள்ளது.",
      pedRespiratorySpeedTxt: "சுவாச வேகக் காட்டி: குழந்தையின் வயதுக்கேற்ற சுவாச வேக மாறுபாடு பதிவாகியுள்ளது.",

      consultAiButton: "AI மருத்துவ நிபுணர் ஆலோசனை பெறுக",
      consultAiPanelTitle: "நிபுணர் AI மருத்துவ ஆலோசனை மையம் (Clinical Decision)",
      voicePromptBtn: "பிராந்திய குரல் ஒலியை பதிவு செய்யவும்",
      voicePromptSimulationText: "குரல் பதிவு செயல்பாட்டில் உள்ளது: 'குழந்தைக்கு மூச்சு திணறல் உள்ளது, மாத்திரை வழங்கலாமா?'",
      aiQueryPlaceholder: "நோயாளியின் தற்போதைய அறிகுறிகள் அல்லது முந்தைய கோளாறுகள் பற்றி AI மருத்துவரிடம் கேளுங்கள்...",
      aiSendButton: "ஆலோசனை பெறுக",
      aiThinking: "AI நோயாளியின் முழு வரலாற்றையும் தற்போதைய தரவுகளையும் பகுப்பாய்வு செய்கிறது...",
      aiErrorTxt: "AI தொடர்பு தோல்வியுற்றது: Settings > Secrets இல் GEMINI_API_KEY சரியாக உள்ளதா என சரிபார்க்கவும்.",
      aiNotesDisclaimer: "நிபந்தனை: இது ஒரு மருத்துவ முடிவு ஆதரவு அமைப்பு (CDSS) மட்டுமே. இறுதி முடிவிற்கு மருத்துவமனை வழிமுறைகளைப் பின்பற்றவும்.",
      customTemplatesTitle: "விரைவான கேள்வி வார்ப்புருக்கள்",
      templateLabelHb: "ஹீமோகுளோபின் அதிகரிப்பு மற்றும் மகப்பேறு ஊட்டச்சத்து உணவுமுறை",
      templateLabelPneumonia: "நிமோனியா ஆபத்து நிலைகள் மற்றும் உடனடி மருந்து அளவுகள்",
      templateLabelMedication: "மருந்து எதிர்ப்பு சக்தி மற்றும் சாதாரண சளிக்கான தடுப்பு முறைகள்",
      triageUrgent: "அவசர பரிந்துரை (Urgent)",
      triageTreatment: "சிகிச்சைக்குத் தயார் (Treatment Ready)",
      triageStable: "நிலையான நிலை (Stable)",
      sectorText: "கிராமப் பகுதி",
      categoryMaternal: "🤰 கர்ப்பிணித் தாய் (Maternal)",
      categoryChild: "👶 குழந்தை (Pediatric)",
      noPreviousRecord: "முந்தைய பதிவு இல்லை",
      btnRegisterNewPatient: "புதிய நோயாளியைப் பதிவுசெய்க",
      tabPatientRegistry: "நோயாளி பதிவேடு (Registry)",
      tabAiKnowledgeBase: "மருத்துவ AI அறிவு மையம் (AI KB)",
      patientFlow: "நோயாளி ஓட்டம் (Patient Flow)",
      activeCase: "செயலில் உள்ள வழக்கு (Active Case)",
      databaseEngine: "தரவுத்தள இயந்திரம்:",
      dbEngineStatus: "ஆஃப்லைன் குறியாக்கப்பட்ட சேமிப்பகம்",
      welcomeHome: "முகப்பு",
      welcomeStudio: "ஸ்டுடியோ",
      welcomeAbout: "எங்களைப் பற்றி",
      welcomeJournal: "இதழ்",
      welcomeReachUs: "எங்களைத் தொடர்பு கொள்ள",
      welcomeBeginJourney: "பயணத்தைத் தொடங்குங்கள்",
      welcomeSubtitle: "கிராமப்புற சுகாதார மேம்பாடு, உன்னத உயிர்களின் பாதுகாப்பு.",
      welcomeDescription: "மக்களுக்கு மருத்துவ சேவை வழங்கும் ஆஷா பணியாளர்களுக்காக பிரத்யேகமாக வடிவமைக்கப்பட்டது. கிராமப்புற குடும்பங்கள், பின்தங்கிய தாய்மார்கள் மற்றும் குழந்தைகளின் ஆரோக்கியத்திற்கான எளிய மற்றும் துல்லியமான தளம்.",
      portalHome: "போர்டல் முகப்பு",
      onlineSim: "ஆன்லைன் சிம்",
      offlineSim: "ஆஃப்லைன் சிம்",
      manualWord: "கள வழிகாட்டி",
      manualTitle: "ஆஷா பணியாளர் பயிற்சி வழிகாட்டி",
      manualStepTitle: "படி-படியாக மருத்துவப் பயிற்சி வழிகாட்டி",
      manualStep1: "இடதுபுறமுள்ள 'நோயாளி ஓட்டம்' பட்டியலிலிருந்து தற்போதைய நோயாளியைத் தேர்ந்தெடுக்கவும் அல்லது ஆரஞ்சு நிற பொத்தானைப் பயன்படுத்தி புதிய நோயாளியைப் பதிவுசெய்யவும்.",
      manualStep2: "கர்ப்பிணித் தாய்மார்கள் அல்லது குழந்தைகளின் முக்கியமான மருத்துவ அட்டைகளைத் திறக்கவும்.",
      manualStep3: "ஹீமோகுளோபின் அளவு அல்லது சுவாச வேகத்தை சரிசெய்யவும். கணினி உடனுக்குடன் ஆபத்து பிரிவுகளைக் கணக்கிடுகிறது.",
      manualStep4: "தற்போதைய அமர்வு விவரங்களைச் சேமிக்க 'நோயாளி தரவைச் சேமி' பொத்தானைக் கிளிக் செய்யவும்.",
      manualFaqTitle: "அடிக்கடி கேட்கப்படும் கேள்விகள் (F.A.Q.)",
      manualFaqQ1: "1. இந்த போர்ட்டல் முழுமையாக ஆஃப்லைனில் வேலை செய்யுமா?",
      manualFaqA1: "ஆம், இது உங்கள் உலாவியின் பாதுகாப்பான உள்ளூர் நினைவகத்தைப் பயன்படுத்தி முழுமையாக ஆஃப்லைனில் வேலை செய்கிறது. தரவுகள் சாதனத்தில் சேமிக்கப்பட்டு பின்னர் தானாகவே ஒத்திசைக்கப்படும்.",
      manualFaqQ2: "2. உலக சுகாதார அமைப்பின் (WHO IMCI) விதிகள் எவ்வாறு பயன்படுத்தப்படுகின்றன?",
      manualFaqA2: "நிமோனியா போன்ற ஆபத்துகளைக் கண்டறிய கணினி உலக சுகாதார அமைப்பின் நிலையான விதிகளைப் பயன்படுத்துகிறது (எ.கா. சுவாச வேகம்).",
      manualFaqQ3: "3. நான் எப்போது அவசர ஆம்புலன்ஸை அழைக்க வேண்டும்?",
      manualFaqA3: "நெஞ்சு சதை உள்ளிழுப்பது, அசாதாரண சுவாச சத்தம் அல்லது ஹீமோகுளோபின் 7.0 க்கும் குறைவாக இருந்தால் உடனடியாக அவசர ஆம்புலன்ஸை அழைக்கவும்.",
      manualNotice: "சுகாதார சேவை கள வழிகாட்டி • சுகாதார அமைச்சகம் மற்றும் WHO IMCI குழுமத்தின் கூட்டு முயற்சியில் தயாரிக்கப்பட்டது.",
      settingsLabel: "அமைப்புகள்",
      accountLabel: "தனிப்பட்ட கணக்கு",
      signOutLabel: "வெளியேறு",
      signInLabel: "உள்நுழை",
      settingsClearCache: "உள்ளூர் தரவுத்தளத்தை மீட்டமை",
      settingsAudioSpeed: "ஆடியோ வழிகாட்டி வேகம்"
    }
  },
  en: {
    name: "English",
    welcome: "Clinical Decision Support System",
    flag: "🇮🇳",
    translations: {
      brandTitle: "ASHA Clinical Decision Support System",
      brandSub: "National Rural Health Mission",
      brandSubClinic: "Primary Health Sub-Center Patient Dashboard",
      gatewayStatus: "Secure Off-line SQLite Queue Database Active",
      syncStatusSynced: "Synchronized with central CRM Registry",
      syncStatusPending: "Sync Pending (Stored securely in local cache)",
      complianceTitle: "WHO IMCI-validated Clinical Algorithms v2.4",
      offlineSafeTitle: "Local Storage Secured Offline",

      backText: "← Back to Registered Patients",
      searchPlaceholder: "Search client name, village, sector, or registered ID...",
      listTitle: "Registered Village Patient Registry",
      listTotal: "Total Registries",
      noMatchingPatients: "No registered village patient accounts match your criteria.",
      filterAll: "All Registries",
      filterMaternal: "Maternal Prenatal",
      filterPediatric: "Pediatric Respiratory Check",

      patientDetailHeader: "Longitudinal Patient Profile & Checkup Record",
      spouseOrGuardianLabel: "Spouse / Guardian",
      villageSectorLabel: "Registered Village Sector",
      registeredAgeLabel: "Registered Age Threshold",
      patientIdLabel: "ASHA Clinic Registry ID",
      yearsSuffix: "Years",
      monthsSuffix: "Months",
      genderMale: "Male child (Pediatric)",
      genderFemale: "Pregnant Woman (Maternal)",

      maternalHeading: "Maternal Prenatal Hemoglobin Evaluation",
      pediatricHeading: "Pediatric Active Respiratory Sync",
      baselineCheck: "Checkup Vitals",
      measuredHemoglobinLabel: "Measured Maternal Hemoglobin level (Hb)",
      measuredRespiratoryLabel: "Measured Respiratory Frequency (Breaths per minute)",
      fastBreathingThresholdLabel: "Fast Breathing Assessment Level",
      chestInDrawingLabel: "Chest Wall In-Drawing / Retractions",
      chestInDrawingSubLabel: "Visible sub-costal retractions of the rib margins on inhalation",
      stridorSoundLabel: "Stridor (Abnormal breath sounds)",
      stridorSoundSubLabel: "High pitched wheezing or scraping sound during steady inspiration",
      feverDaysLabel: "Cough or Fever Duration (Days)",
      feverNone: "None",
      feverDaysText: "Days",
      sessionNotesLabel: "Field Visit Clinical Records (Medication compliance / Nutrition)",
      sessionNotesPlaceholder: "Log observations on dietary compliance, hydration routines, hygiene status or other symptoms here...",

      btnRecordVitals: "Save Vitals Checkup & Update Local Registry",
      btnRequestAmbulance: "Request PHC Ambulance (Urgent Emergency)",
      syncSuccessNotification: "Clinic session saved securely in the database queue. Automatic background synchronization in progress.",
      referralNotification: "Ambulance dispatcher alerted: Medical emergency transfer routed to PHC. Reference Code: ",

      cdssPanelTitle: "Clinical Decision Support System (CDSS) Recommendations",
      voicePlaybackButton: "Play Clinical Voice Guidelines",
      voicePlaybackActive: "Dynamic medical guidance playback is active",
      stopVoiceButton: "Stop Playback",
      checklistEnTitle: "Direct Clinical Guidance Checklist (English)",
      checklistLocalTitle: "Regional Translated Guidance Instructions (Local Language)",
      classificationNotice: "Assessment boundaries compiled natively from certified WHO IMCI Pediatric and Maternal guidelines.",

      baselineAlertNoHistory: "Critical Baseline: No historical medical visits found. This entry establishes the patient's baseline trajectory.",
      longitudinalInsightTitle: "Longitudinal Trajectory Comparison Analysis",
      maternalAnemiaAlertTxt: "ALERT: Severe maternal anemia threshold crossed. Hemoglobin level degraded significantly from baseline check.",
      maternalHbStableTxt: "Stable Pattern: Maternal hemoglobin level remains identical to previous clinical visit registry.",
      maternalHbImprovedTxt: "Positive Recovery Trend: Patient hemoglobin shows positive progression. Maintain therapeutic advice.",
      maternalHbDegradeTxt: "Clinical Warning: Patient hemoglobin level has degraded from baseline. Investigate daily treatment compliance.",
      pedRespiratoryUrgentTxt: "Severe Respiratory Distress: Chest wall retractions or active stridor detected. Urgent hospital transfer.",
      pedRespiratoryResolvedTxt: "Condition Resolved: Historical respiratory difficulty is relieved. Breathing frequency stabilized.",
      pedRespiratorySpeedTxt: "Respiratory Rate Trend: Change in respiratory rate per minute measured against baseline visit.",

      consultAiButton: "Consult AI Specialist Doctor",
      consultAiPanelTitle: "AI Clinical Decision Support Service (Doctor Consultation)",
      voicePromptBtn: "Simulate Regional Voice Input Recording",
      voicePromptSimulationText: "Voice Capture Active: 'Child is coughing with fast breathing, should we administer Amoxicillin?'",
      aiQueryPlaceholder: "Ask AI about this patient's current risks, medication tolerances, or specific guidelines...",
      aiSendButton: "Send Inquiry",
      aiThinking: "AI is analyzing the client's current vitals, notes, and entire clinical history...",
      aiErrorTxt: "Unable to contact AI: Please confirm that your GEMINI_API_KEY is configured in Settings > Secrets.",
      aiNotesDisclaimer: "Disclaimer: This AI advice acts purely to assist field workers (CDSS). Final authority lies with certified clinical practitioners.",
      customTemplatesTitle: "Quick Query Templates",
      templateLabelHb: "Analyze maternal Hb degradation & outline iron-rich regional diet plan",
      templateLabelPneumonia: "Differentiate non-severe pneumonia vs common cold with drug dosing",
      templateLabelMedication: "Review antibiotic compliance advice & combat local medication resistance",
      triageUrgent: "Urgent Referral",
      triageTreatment: "Treatment Ready",
      triageStable: "Stable Status",
      sectorText: "Village Sector",
      categoryMaternal: "🤰 Maternal Prenatal",
      categoryChild: "👶 Child (Pediatric)",
      noPreviousRecord: "No previous record",
      btnRegisterNewPatient: "Register New Patient",
      tabPatientRegistry: "Patient Registry",
      tabAiKnowledgeBase: "AI Knowledge Base",
      patientFlow: "Patient Flow",
      activeCase: "Active Case",
      databaseEngine: "Database Engine:",
      dbEngineStatus: "Offline Encrypted SQLite Storage Active",
      welcomeHome: "Home",
      welcomeStudio: "Studio",
      welcomeAbout: "About Us",
      welcomeJournal: "Journal",
      welcomeReachUs: "Reach Us",
      welcomeBeginJourney: "Begin Journey",
      welcomeSubtitle: "Empowering grassroots care, saving precious rural lives.",
      welcomeDescription: "Designed to support dedicated ASHA workers in providing clinical-grade care to rural families, underprivileged mothers, and children. Reliable diagnostics, simplified and accessible everywhere.",
      portalHome: "Portal Home",
      onlineSim: "Online Sim",
      offlineSim: "Offline Sim",
      manualWord: "Field Guide",
      manualTitle: "ASHA Trainee Helper Guide",
      manualStepTitle: "Step-by-Step Training Guide",
      manualStep1: "Select an existing patient from the left Patient Flow or register a new admission instantly using the orange button.",
      manualStep2: "Open the vital diagnostic card of maternal prenatal mothers or pediatric respiratory infants.",
      manualStep3: "Adjust hemoglobin levels or breaths measurements. The system computes clinical danger categories in real time.",
      manualStep4: "Press Save Patient Data to persist the history directly inside of device memory queue.",
      manualFaqTitle: "Frequently Asked Questions (F.A.Q.)",
      manualFaqQ1: "1. Can this portal work completely offline?",
      manualFaqA1: "Yes, it operates fully offline using client-first storage cache databases. When offline-simulated status is toggled, sync is held and local admission records are kept safely in the queue.",
      manualFaqQ2: "2. How fits the WHO IMCI diagnostic criteria?",
      manualFaqA2: "It incorporates standard WHO Integrated Management of Childhood Illness fast breathing thresholds (fast breathing RR is 50/min or more for infants below 12m, and 40/min or more for 12-59m) to correctly identify pneumonia risks.",
      manualFaqQ3: "3. When should I trigger emergency ambulance transport?",
      manualFaqA3: "Any chest retraction, stridor sounds, or severe maternal anemia (Hb under 7.0 g/dL) is flagged in bold red. For these cases, click dispatch directly to allocate urgent transport.",
      manualNotice: "HEALTHCARE SWASTHYYA FIELD MANUAL • PREPARED BY HEALTH COMMISSION MINISTRY IN COLLABORATION WITH WHO IMCI GROUP.",
      settingsLabel: "Settings",
      accountLabel: "Personal Account",
      signOutLabel: "Sign Out",
      signInLabel: "Sign In",
      settingsClearCache: "Reset Local Database",
      settingsAudioSpeed: "Audio Guide Speed"
    }
  }
};

// Pediatric & Maternal clinical registries
export interface ClinicalRecord {
  id: string; 
  timestamp: string; 
  ageMonths: number;
  gender: "male" | "female";
  respiratoryRate?: number;
  chestInDrawing?: boolean;
  stridor?: boolean;
  hemoglobin?: number;
  feverDays?: number;
  triageSeverity: "URGENT" | "MED" | "LOW";
  statusText: string;
}

export interface ImmunizationRecord {
  id: string;
  vaccine: string;
  dueDate: string;
  administeredDate?: string;
  status: "PENDING" | "ADMINISTERED" | "OVERDUE";
  notes?: string;
}

export interface Patient {
  id: string;
  name: string;
  ageMonths: number;
  gender: "male" | "female";
  village: string;
  spouseOrGuardian: string;
  history: ClinicalRecord[];
  immunizations?: ImmunizationRecord[];
  phone?: string;
  email?: string;
}

export function getDefaultImmunizations(): ImmunizationRecord[] {
  return [
    { id: "IMM-NEW-1", vaccine: "BCG", dueDate: "Birth", status: "PENDING" },
    { id: "IMM-NEW-2", vaccine: "HepB-Birth", dueDate: "Birth", status: "PENDING" },
    { id: "IMM-NEW-3", vaccine: "OPV-1", dueDate: "6 Weeks", status: "PENDING" },
    { id: "IMM-NEW-4", vaccine: "Pentavalent-1", dueDate: "6 Weeks", status: "PENDING" },
    { id: "IMM-NEW-5", vaccine: "Rotavirus-1", dueDate: "6 Weeks", status: "PENDING" },
    { id: "IMM-NEW-6", vaccine: "PCV-1", dueDate: "6 Weeks", status: "PENDING" },
    { id: "IMM-NEW-7", vaccine: "OPV-2", dueDate: "10 Weeks", status: "PENDING" },
    { id: "IMM-NEW-8", vaccine: "Pentavalent-2", dueDate: "10 Weeks", status: "PENDING" },
    { id: "IMM-NEW-9", vaccine: "Rotavirus-2", dueDate: "10 Weeks", status: "PENDING" },
    { id: "IMM-NEW-10", vaccine: "OPV-3", dueDate: "14 Weeks", status: "PENDING" },
    { id: "IMM-NEW-11", vaccine: "Pentavalent-3", dueDate: "14 Weeks", status: "PENDING" },
    { id: "IMM-NEW-12", vaccine: "Rotavirus-3", dueDate: "14 Weeks", status: "PENDING" },
    { id: "IMM-NEW-13", vaccine: "PCV-2", dueDate: "14 Weeks", status: "PENDING" },
    { id: "IMM-NEW-14", vaccine: "MR-1", dueDate: "9 Months", status: "PENDING" },
    { id: "IMM-NEW-15", vaccine: "JE-1", dueDate: "9 Months", status: "PENDING" },
    { id: "IMM-NEW-16", vaccine: "OPV Booster", dueDate: "16-24 Months", status: "PENDING" },
    { id: "IMM-NEW-17", vaccine: "DPT Booster-1", dueDate: "16-24 Months", status: "PENDING" },
    { id: "IMM-NEW-18", vaccine: "MR-2", dueDate: "16-24 Months", status: "PENDING" }
  ];
}

// Initial clinical dataset (Village ASHA patient registry)
export const INITIAL_PATIENTS: Patient[] = [
  {
    id: "PAT-IND-2940",
    name: "Kamala Devi",
    ageMonths: 288, // 24 Years old
    gender: "female",
    village: "Pipariya",
    spouseOrGuardian: "Ramesh Singh",
    phone: "+91 94120 12345",
    email: "kamala.devi@gmail.com",
    history: [
      {
        id: "VIS-101",
        timestamp: "2026-04-12",
        ageMonths: 286,
        gender: "female",
        hemoglobin: 8.4,
        feverDays: 0,
        triageSeverity: "MED",
        statusText: "Moderate Pregnancy Anaemia (8.4 g/dL). Prescribed double daily Iron-Folic Acid (IFA) regimen."
      },
      {
        id: "VIS-154",
        timestamp: "2026-05-18",
        ageMonths: 287,
        gender: "female",
        hemoglobin: 9.6,
        feverDays: 1,
        triageSeverity: "MED",
        statusText: "Hemoglobin level improving (9.6 g/dL). Advised vitamin C diet adjustments and prophylactic checkup."
      }
    ]
  },
  {
    id: "PAT-IND-7392",
    name: "Sita Marandi",
    ageMonths: 252, // 21 Years old
    gender: "female",
    village: "Ghansore",
    spouseOrGuardian: "Vijay Marandi",
    phone: "+91 98350 98765",
    history: [
      {
        id: "VIS-089",
        timestamp: "2026-03-10",
        ageMonths: 249,
        gender: "female",
        hemoglobin: 10.1,
        feverDays: 0,
        triageSeverity: "LOW",
        statusText: "Mild Anaemia (10.1 g/dL). Instructed on nutritional leafy dietary enhancements of iron."
      },
      {
        id: "VIS-132",
        timestamp: "2026-05-02",
        ageMonths: 251,
        gender: "female",
        hemoglobin: 11.2,
        feverDays: 0,
        triageSeverity: "LOW",
        statusText: "Normal hemoglobin level (11.2 g/dL). Prophylactic daily single IFA tablet continued."
      }
    ]
  },
  {
    id: "PAT-IND-1249",
    name: "Child Rajesh Kumar",
    ageMonths: 14,
    gender: "male",
    village: "Pipariya",
    spouseOrGuardian: "Kamala Devi",
    phone: "+91 94120 12345",
    email: "kamala.devi@gmail.com",
    history: [
      {
        id: "VIS-112",
        timestamp: "2026-04-15",
        ageMonths: 12,
        gender: "male",
        respiratoryRate: 53,
        chestInDrawing: true,
        stridor: false,
        feverDays: 3,
        triageSeverity: "URGENT",
        statusText: "Severe Pneumonia diagnosed locally. Urgent CHC referral given, first dose oral Amoxicillin administered."
      },
      {
        id: "VIS-168",
        timestamp: "2026-05-20",
        ageMonths: 13,
        gender: "male",
        respiratoryRate: 42,
        chestInDrawing: false,
        stridor: false,
        feverDays: 0,
        triageSeverity: "MED",
        statusText: "Follow-up status: Breathing rate reduced to 42 breaths/min. No active retractions. Safe recovery."
      }
    ],
    immunizations: [
      { id: "IMM-001", vaccine: "BCG", dueDate: "Birth", administeredDate: "2025-05-10", status: "ADMINISTERED" },
      { id: "IMM-002", vaccine: "HepB-Birth", dueDate: "Birth", administeredDate: "2025-05-10", status: "ADMINISTERED" },
      { id: "IMM-003", vaccine: "OPV-1", dueDate: "6 Weeks", administeredDate: "2025-06-22", status: "ADMINISTERED" },
      { id: "IMM-004", vaccine: "Pentavalent-1", dueDate: "6 Weeks", administeredDate: "2025-06-22", status: "ADMINISTERED" },
      { id: "IMM-005", vaccine: "Rotavirus-1", dueDate: "6 Weeks", administeredDate: "2025-06-22", status: "ADMINISTERED" },
      { id: "IMM-006", vaccine: "PCV-1", dueDate: "6 Weeks", administeredDate: "2025-06-22", status: "ADMINISTERED" },
      { id: "IMM-007", vaccine: "MR-1", dueDate: "9 Months", administeredDate: "2026-02-15", status: "ADMINISTERED" },
      { id: "IMM-008", vaccine: "OPV Booster", dueDate: "16-24 Months", status: "PENDING" },
      { id: "IMM-009", vaccine: "DPT Booster-1", dueDate: "16-24 Months", status: "PENDING" }
    ]
  },
  {
    id: "PAT-IND-8422",
    name: "Child Chotu Soren",
    ageMonths: 35,
    gender: "male",
    village: "Ghansore",
    spouseOrGuardian: "Sita Marandi",
    phone: "+91 98350 98765",
    history: [
      {
        id: "VIS-054",
        timestamp: "2026-02-15",
        ageMonths: 31,
        gender: "male",
        respiratoryRate: 36,
        chestInDrawing: false,
        stridor: false,
        feverDays: 1,
        triageSeverity: "LOW",
        statusText: "Healthy respiratory profile. Cough treated with soothing home fluid formulations."
      }
    ],
    immunizations: [
      { id: "IMM-010", vaccine: "BCG", dueDate: "Birth", administeredDate: "2023-08-01", status: "ADMINISTERED" },
      { id: "IMM-011", vaccine: "HepB-Birth", dueDate: "Birth", administeredDate: "2023-08-01", status: "ADMINISTERED" },
      { id: "IMM-012", vaccine: "OPV-1", dueDate: "6 Weeks", administeredDate: "2023-09-15", status: "ADMINISTERED" },
      { id: "IMM-013", vaccine: "Pentavalent-1", dueDate: "6 Weeks", administeredDate: "2023-09-15", status: "ADMINISTERED" },
      { id: "IMM-014", vaccine: "Rotavirus-1", dueDate: "6 Weeks", administeredDate: "2023-09-15", status: "ADMINISTERED" },
      { id: "IMM-015", vaccine: "PCV-1", dueDate: "6 Weeks", administeredDate: "2023-09-15", status: "ADMINISTERED" },
      { id: "IMM-016", vaccine: "MR-1", dueDate: "9 Months", administeredDate: "2024-05-10", status: "ADMINISTERED" },
      { id: "IMM-017", vaccine: "OPV Booster", dueDate: "16-24 Months", status: "OVERDUE", notes: "Family missed schedule. Needs vaccine outreach call." },
      { id: "IMM-018", vaccine: "DPT Booster-1", dueDate: "16-24 Months", administeredDate: "2025-04-12", status: "ADMINISTERED" }
    ]
  },
  {
    id: "PAT-IND-0348",
    name: "Meera Bai",
    ageMonths: 312, // 26 Years old
    gender: "female",
    village: "Amari",
    spouseOrGuardian: "Lal Bahadur",
    phone: "+91 87654 32109",
    email: "meera.bai@outlook.com",
    history: [
      {
        id: "VIS-012",
        timestamp: "2026-01-20",
        ageMonths: 307,
        gender: "female",
        hemoglobin: 6.4,
        feverDays: 2,
        triageSeverity: "URGENT",
        statusText: "Critical Severe Anaemia (6.4 g/dL). Double emergency referral provided. In-patient blood transfusion administered at CHC."
      },
      {
        id: "VIS-072",
        timestamp: "2026-03-05",
        ageMonths: 309,
        gender: "female",
        hemoglobin: 8.6,
        feverDays: 0,
        triageSeverity: "MED",
        statusText: "Hb improved post-transfusion to 8.6 g/dL. Continued therapeutic daily double IFA regimen."
      },
      {
        id: "VIS-149",
        timestamp: "2026-05-10",
        ageMonths: 311,
        gender: "female",
        hemoglobin: 9.8,
        feverDays: 0,
        triageSeverity: "MED",
        statusText: "Hemoglobin stable and rising (9.8 g/dL). Advised nutritious dietary compliance."
      }
    ]
  }
];

// Persistent offline layer configuration
const STORAGE_KEY = "asha_cdss_registry_db";
const SYNC_STATE_KEY = "asha_cdss_sync_state";

// IndexedDB configuration
const DB_NAME = "swasthya_clinical_db";
const DB_VERSION = 1;
const STORE_NAME = "patients_store";

export function initIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB is not supported in this environment"));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}

export function savePatientsToIndexedDB(patients: Patient[]): Promise<void> {
  return initIndexedDB()
    .then((db) => {
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        
        // Clear old entries first
        store.clear();
        
        patients.forEach((patient) => {
          store.put(patient);
        });

        transaction.oncomplete = () => {
          resolve();
        };
        transaction.onerror = () => {
          reject(transaction.error);
        };
      });
    })
    .catch((err) => {
      console.warn("IndexedDB Save Failed", err);
    });
}

export function loadPatientsFromIndexedDB(): Promise<Patient[] | null> {
  return initIndexedDB()
    .then((db) => {
      return new Promise<Patient[] | null>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
          const results = request.result;
          if (results && results.length > 0) {
            resolve(results);
          } else {
            resolve(null);
          }
        };
        request.onerror = () => {
          reject(request.error);
        };
      });
    })
    .catch((err) => {
      console.warn("IndexedDB Load Failed", err);
      return null;
    });
}

export function loadPatientsFromDatabase(): Patient[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_PATIENTS;
    }
  }
  return INITIAL_PATIENTS;
}

export function savePatientsToDatabase(patients: Patient[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  savePatientsToIndexedDB(patients);
}

const LOCALIZED_DICTIONARY: Record<string, Record<string, string>> = {
  hi: {
    "Kamala Devi": "कमला देवी",
    "Ramesh Singh": "रमेश सिंह",
    "Sita Marandi": "सीता मरांडी",
    "Vijay Marandi": "विजय मरांडी",
    "Child Rajesh Kumar": "बच्चा राजेश कुमार",
    "Child Chotu Soren": "बच्चा छोटू सोरेन",
    "Meera Bai": "मीरा बाई",
    "Lal Bahadur": "लाल बहादुर",
    "Pipariya": "पिपरिया",
    "Ghansore": "घंसौर",
    "Amari": "अमरी",
    "female": "महिला",
    "male": "पुरुष",
    "Moderate Pregnancy Anaemia (8.4 g/dL). Prescribed double daily Iron-Folic Acid (IFA) regimen.": "मध्यम गर्भावस्था एनीमिया (8.4 g/dL)। दैनिक दोहरी आयरन-फॉलिक एसिड (IFA) खुराक निर्धारित की गई।",
    "Hemoglobin level improving (9.6 g/dL). Advised vitamin C diet adjustments and prophylactic checkup.": "हीमोग्लोबिन स्तर में सुधार (9.6 g/dL)। विटामिन सी युक्त आहार और नियमित जाँच की सलाह।",
    "Mild Anaemia (10.1 g/dL). Instructed on nutritional leafy dietary enhancements of iron.": "हल्का एनीमिया (10.1 g/dL)। आयरन युक्त हरी पत्तेदार सब्जियों के सेवन की सलाह दी गई।",
    "Normal hemoglobin level (11.2 g/dL). Prophylactic daily single IFA tablet continued.": "सामान्य हीमोग्लोबिन स्तर (11.2 g/dL)। दैनिक एकल रोगनिरोधी IFA टैबलेट जारी रखी गई।",
    "Severe Pneumonia diagnosed locally. Urgent CHC referral given, first dose oral Amoxicillin administered.": "गंभीर निमोनिया का निदान। तत्काल CHC अस्पताल रेफरल, ओरल अमोक्सिसिलिन की पहली खुराक दी गई।",
    "Follow-up status: Breathing rate reduced to 42 breaths/min. No active retractions. Safe recovery.": "फॉलो-अप स्थिति: सांस की गति कम होकर 42/मिनट हुई। कोई पसली धंसना नहीं। सुरक्षित रिकवरी।",
    "Healthy respiratory profile. Cough treated with soothing home fluid formulations.": "स्वस्थ श्वसन स्थिति। सामान्य खांसी का उपचार घरेलू काढ़े और गुनगुने तरल पदार्थों से किया गया।",
    "Critical Severe Anaemia (6.4 g/dL). Double emergency referral provided. In-patient blood transfusion administered at CHC.": "अत्यंत गंभीर एनीमिया (6.4 g/dL)। तत्काल आपातकालीन रेफरल प्रदान किया गया। CHC में रक्त चढ़ाया गया।",
    "Hb improved post-transfusion to 8.6 g/dL. Continued therapeutic daily double IFA regimen.": "रक्त चढ़ाने के बाद Hb सुधरकर 8.6 g/dL हुआ। दैनिक दोहरी IFA चिकित्सीय खुराक जारी रखी गई।",
    "Hemoglobin stable and rising (9.8 g/dL). Advised nutritious dietary compliance.": "हीमोग्लोबिन स्थिर और बढ़ रहा है (9.8 g/dL)। पौष्टिक आहार के नियमित सेवन की सलाह।"
  },
  bn: {
    "Kamala Devi": "কমলা দেবী",
    "Ramesh Singh": "রমেশ সিং",
    "Sita Marandi": "সীতা মারান্ডি",
    "Vijay Marandi": "বিজয় মারান্ডি",
    "Child Rajesh Kumar": "শিশু রাজেশ কুমার",
    "Child Chotu Soren": "শিশু ছোটু সোরেন",
    "Meera Bai": "মীরা বাঈ",
    "Lal Bahadur": "লাল বাহাদুর",
    "Pipariya": "পিপারিয়া",
    "Ghansore": "ঘনসোর",
    "Amari": "আমরি",
    "female": "মহিলা",
    "male": "পুরুষ",
    "Moderate Pregnancy Anaemia (8.4 g/dL). Prescribed double daily Iron-Folic Acid (IFA) regimen.": "গর্ভকালীন মাঝারি অ্যানিমিয়া (8.4 g/dL)। দৈনিক দুটি আয়রন-ফলিক অ্যাসিড (IFA) ওষুধ নির্ধারিত।",
    "Hemoglobin level improving (9.6 g/dL). Advised vitamin C diet adjustments and prophylactic checkup.": "হিমোগ্লোবিনের মাত্রা উন্নত হচ্ছে (9.6 g/dL)। ভিটামিন সি যুক্ত খাদ্যাভ্যাস ও নিয়মিত স্বাস্থ্য পরীক্ষার পরামর্শ।",
    "Mild Anaemia (10.1 g/dL). Instructed on nutritional leafy dietary enhancements of iron.": "সামান্য অ্যানিমিয়া (10.1 g/dL)। আয়রন সমৃদ্ধ শাকসবজি খাওয়ার পরামর্শ দেওয়া হয়েছে।",
    "Normal hemoglobin level (11.2 g/dL). Prophylactic daily single IFA tablet continued.": "স্বাভাবিক হিমোগ্লোবিনের মাত্রা (11.2 g/dL)। দৈনিক একটি প্রতিরোধমূলক IFA ট্যাবলেট অব্যাহত রাখা হয়েছে।",
    "Severe Pneumonia diagnosed locally. Urgent CHC referral given, first dose oral Amoxicillin administered.": "গুরুতর নিউমোনিয়া নির্ণয়। অবিলম্বে CHC রেফারেল প্রদান এবং প্রথম ডোজ ওরাল অ্যামোক্সিসিলিন দেওয়া হয়েছে।",
    "Follow-up status: Breathing rate reduced to 42 breaths/min. No active retractions. Safe recovery.": "ফলো-আপ পরিস্থিতি: শ্বাসের গতি হ্রাস পেয়ে ৪২/মিনিট হয়েছে। পাঁজরের নিচে কোনো সংকোচন নেই। নিরাপদ নিরাময়।",
    "Healthy respiratory profile. Cough treated with soothing home fluid formulations.": "স্বাভাবিক ফুসফুসের অবস্থা। সাধারণ কাশির চিকিৎসা ঘরোয়া উপশমকারী তরল ওষুধ দিয়ে করা হয়েছে।",
    "Critical Severe Anaemia (6.4 g/dL). Double emergency referral provided. In-patient blood transfusion administered at CHC.": "মারাত্মক গুরুতর অ্যানিমিয়া (6.4 g/dL)। জরুরি দ্বিগুণ রেফারেল দেওয়া হয়েছে। CHC-তে রক্ত সঞ্চালন সম্পন্ন।",
    "Hb improved post-transfusion to 8.6 g/dL. Continued therapeutic daily double IFA regimen.": "রক্ত সঞ্চালনের পর হিমোগ্লোবিন উন্নত হয়ে 8.6 g/dL হয়েছে। দৈনিক দুটি IFA ট্যাবলেট অব্যাহত রাখা হয়েছে।",
    "Hemoglobin stable and rising (9.8 g/dL). Advised nutritious dietary compliance.": "হিমোগ্লোবিন স্থিতিশীল এবং বৃদ্ধি পাচ্ছে (9.8 g/dL)। পুষ্টিকর খাবার খাওয়ার নির্দেশ দেওয়া হয়েছে।"
  },
  ta: {
    "Kamala Devi": "கமலா தேவி",
    "Ramesh Singh": "ரமேஷ் சிங்",
    "Sita Marandi": "சீதா மராண்டி",
    "Vijay Marandi": "விஜய் மராண்டி",
    "Child Rajesh Kumar": "குழந்தை ராஜேஷ் குமார்",
    "Child Chotu Soren": "குழந்தை சோட்டு சோரன்",
    "Meera Bai": "மீரா பாய்",
    "Lal Bahadur": "லால் பகதூர்",
    "Pipariya": "பிபாரியா",
    "Ghansore": "கன்சூர்",
    "Amari": "அமரி",
    "female": "பெண்",
    "male": "ஆண்",
    "Moderate Pregnancy Anaemia (8.4 g/dL). Prescribed double daily Iron-Folic Acid (IFA) regimen.": "மிதமான கர்ப்பகால இரத்த சோகை (8.4 g/dL). தினமும் இரண்டு முறை இரும்புச் சத்து-ஃபோலிக் அமில (IFA) மாத்திரைகள் பரிந்துரைக்கப்பட்டது.",
    "Hemoglobin level improving (9.6 g/dL). Advised vitamin C diet adjustments and prophylactic checkup.": "ஹீமோகுளோபின் அளவு மேம்பட்டு வருகிறது (9.6 g/dL). வைட்டமின் சி உணவுகள் மற்றும் வழக்கமான பரிசோதனைக்கு அறிவுறுத்தப்பட்டது.",
    "Mild Anaemia (10.1 g/dL). Instructed on nutritional leafy dietary enhancements of iron.": "மிதமான இரத்த சோகை (10.1 g/dL). இரும்புச் சத்து நிறைந்த கீரை வகைகளை உணவில் சேர்க்க அறிவுறுத்தப்பட்டது.",
    "Normal hemoglobin level (11.2 g/dL). Prophylactic daily single IFA tablet continued.": "சாதாரண ஹீமோகுளோபின் அளவு (11.2 g/dL). தினசரி ஒரு IFA மாத்திரை தொடர்ந்து வழங்கப்பட்டது.",
    "Severe Pneumonia diagnosed locally. Urgent CHC referral given, first dose oral Amoxicillin administered.": "கடுமையான நிமோனியா கண்டறியப்பட்டது. உடனடியாக CHC-க்கு பரிந்துரைக்கப்பட்டு, முதல் டோஸ் அமோக்சிசிலின் மருந்து வழங்கப்பட்டது.",
    "Follow-up status: Breathing rate reduced to 42 breaths/min. No active retractions. Safe recovery.": "தொடர் கண்காணிப்பு: சுவாச வேகம் 42/நிமிடமாகக் குறைந்துள்ளது. நெஞ்சு உள்வாங்குதல் இல்லை. பாதுகாப்பான குணமடைதல்.",
    "Healthy respiratory profile. Cough treated with soothing home fluid formulations.": "ஆரோக்கியமான சுவாச நிலை. இருமலுக்கு இதமான வீட்டு வைத்தியக் கஷாயம் வழங்கப்பட்டது.",
    "Critical Severe Anaemia (6.4 g/dL). Double emergency referral provided. In-patient blood transfusion administered at CHC.": "மிகக் கடுமையான இரத்த சோகை (6.4 g/dL). அவசர பரிந்துரை செய்யப்பட்டு, CHC-இல் இரத்த தான சிகிச்சை அளிக்கப்பட்டது.",
    "Hb improved post-transfusion to 8.6 g/dL. Continued therapeutic daily double IFA regimen.": "இரத்த தான சிகிச்சைக்குப் பின் Hb 8.6 g/dL ஆக உயர்ந்தது. தினசரி இரண்டு IFA மாத்திரைகள் தொடர்ந்து வழங்கப்பட்டது.",
    "Hemoglobin stable and rising (9.8 g/dL). Advised nutritious dietary compliance.": "ஹீமோகுளோபின் அளவு சீராக உயர்ந்து வருகிறது (9.8 g/dL). சத்தான உணவு முறையைப் பின்பற்ற அறிவுறுத்தப்பட்டது."
  }
};

export function getLocalizedText(text: string, lang: string): string {
  if (!text) return "";
  if (lang === "en") return text;
  const langDict = LOCALIZED_DICTIONARY[lang];
  if (langDict && langDict[text]) {
    return langDict[text];
  }
  return text;
}

// Unified multi-lingual dynamic pediatric classification
export function determinePediatricRespiratoryThreat(
  ageMonths: number,
  respiratoryRate: number,
  chestInDrawing: boolean,
  stridor: boolean
): {
  severity: "URGENT" | "MED" | "LOW";
  colorHex: string;
  resultTitle: Record<string, string>;
  checklist: Record<string, string[]>;
  rationale: Record<string, string>;
} {
  const isFastBreathing =
    ageMonths < 12 ? respiratoryRate >= 50 : respiratoryRate >= 40;

  if (chestInDrawing || stridor) {
    return {
      severity: "URGENT",
      colorHex: "#dc2626", // Red-600
      resultTitle: {
        en: "SEVERE PNEUMONIA OR VERY SEVERE DISEASE (Critical Airway Distress)",
        hi: "गंभीर निमोनिया या अत्यधिक गंभीर बीमारी (गंभीर श्वसन संकट)",
        bn: "মারাত্মক নিউমোনিয়া বা অত্যন্ত গুরুতর রোগ (তীব্র ফুসফুসের জটিলতা)",
        ta: "கடுமையான நிமோனியா அல்லது மிக மோசமான நோய் (தீவிர சுவாசக் கோளாறு)"
      },
      checklist: {
        en: [
          "Administer primary oral Amoxicillin dosage immediately under observation.",
          "Dispatch emergency transport: Urgent medical transfer to referral hospital / CHC.",
          "Keep the child warm to eliminate sub-clinical hypothermia risks (Kangaroo mother care if needed).",
          "Maintain absolute clean, patent airway clear of nasal discharges."
        ],
        hi: [
          "उचित ओरल एंटीबायोटिक (अमोक्सिसिलिन) की पहली खुराक तुरंत चिकित्सकीय देखरेख में दें।",
          "आपातकालीन परिवहन बुलाएं: तुरंत नजदीकी सामुदायिक स्वास्थ्य केंद्र (CHC) भेजें।",
          "हाइपोथर्मिया से बचाव के लिए बच्चे को हमेशा गर्म रखें।",
          "साँस की नली पूरी तरह साफ़ रखें; बलगम और जुकाम साफ करें।"
        ],
        bn: [
          "অবিলম্বে প্রথম ডোজ ওরাল অ্যামোক্সিসিলিন ওষুধ ডাক্তারের পরামর্শ অনুযায়ী খাওয়ান।",
          "জরুরী পরিবহনের ব্যবস্থা করুন: দ্রুত নিকটস্থ রেফারেরেল হাসপাতাল বা CHC-তে পাঠান।",
          "হাইপোথার্মিয়ার ঝুঁকি এড়াতে শিশুকে সবসময় গরম বা উষ্ণ রাখুন।",
          "শ্বাসনালী সর্বদা পরিষ্কার রাখুন; নাকের ময়লা ও শ্লেষ্মা নিয়মিত পরিষ্কার করুন।"
        ],
        ta: [
          "முதன்மையான வாய்வழி அமாக்சிசிலின் மருந்தை உடனடியாக வழங்குங்கள்.",
          "அவசர மருத்துவ வாகனத்தை ஏற்பாடு செய்யுங்கள்: உடனடியாக CHC அல்லது மருத்துவமனைக்கு அனுப்பவும்.",
          "ஹைபோதெர்மியா ஆபத்தைத் தவிர்க்க குழந்தையை எப்போதும் கதகதப்பாக வைத்திருங்கள்.",
          "சுவாசப் பாதையை எப்போதும் சுத்தமாகவும், அடைப்பு இல்லாமலும் பராமரிக்கவும்."
        ]
      },
      rationale: {
        en: "Chest wall retractions indicate the child is exhausting emergency breathing muscles, signaling physical fatigue.",
        hi: "छाती अंदर धंसना दर्शाता है कि साँस लेने के लिए आपातकालीन मांसपेशियों का अत्यधिक उपयोग हो रहा है, जो श्वसन प्रणाली की थकान को दर्शाता है।",
        bn: "পাঁজর দেবে যাওয়া নির্দেশ করে যে অবলীলায় শ্বাস নিতে শিশুর অতিরিক্ত পেশী শক্তির প্রয়োজন হচ্ছে, যা নিউমোনিয়ার অত্যন্ত স্পষ্ট লক্ষণ।",
        ta: "விலா எலும்பு உள்வாங்குதல் என்பது குழந்தை மிகவும் கஷ்டப்பட்டு சுவாசிப்பதைக் குறிக்கிறது, இது சுவாசப் பாதையின் உண்மையான சோர்வைக் காட்டுகிறது."
      }
    };
  }

  if (isFastBreathing) {
    return {
      severity: "MED",
      colorHex: "#f59e0b", // Amber-500
      resultTitle: {
        en: "PNEUMONIA - NON-SEVERE (Symptom Monitoring Required)",
        hi: "निमोनिया - सामान्य गैर-गंभीर (सतर्क निगरानी आवश्यक)",
        bn: "নিউমোনিয়া - মাঝারি অ-গুরুতর (সতর্ক নজরদারি প্রয়োজন)",
        ta: "நிமோனியா - தீவிரமற்றது (கவனமாக கண்காணிக்கப்பட வேண்டும்)"
      },
      checklist: {
        en: [
          "Prescribe oral Amoxicillin dosage twice daily for 5 continuous days.",
          "Soothe upper throat pathways using traditional safe home remedies.",
          "Educate parent on emergency relapse signs (refusal to feed, cold extremities, lethargy).",
          "Schedule standard physical evaluation clinical follow-up check in 3 days."
        ],
        hi: [
          "५ दिनों के लिए दिन में दो बार ओरल अमोक्सिसिलिन दवा का नियमित चक्र दें।",
          "सुरक्षित घरेलू नुस्खों (शहद/गर्म पानी) से गले की खराश और खांसी को शांत करें।",
          "माँ को खतरे के गंभीर लक्षण बताएं (दूध न पी पाना, बहुत सुस्त होना)।",
          "३ दिन में बच्चे की दोबारा शारीरिक जाँच (फॉलो-अप) अवश्य करें।"
        ],
        bn: [
          "টানা ৫ দিন দৈনিক দুইবার ওরাল অ্যামোক্সিসিলিন ওষুধ খাওয়ানোর পরামর্শ দিন।",
          "নিরাপদ ঘরোয়া উপায়ে (মধু বা হালকা গরম জল) গলা এবং খসখসে কাশি শান্ত রাখুন।",
          "অভিভাবকদের গুরুতর বিপদের লক্ষণগুলি (খাওয়ার অনিচ্ছা, অত্যধিক ক্লান্তি) বুঝিয়ে বলুন।",
          "৩ দিনের মধ্যে শিশুর শারীরিক পুনর্মূল্যায়নের জন্য ফলো-আপ পরামর্শ দিন।"
        ],
        ta: [
          "தொடர்ந்து 5 நாட்களுக்கு தினமும் இருமுறை வாய்வழி அமாக்சிசிலின் மருந்தை வழங்குங்கள்.",
          "சுத்தமான வெதுவெதுப்பான நீர் அல்லது தேன் மூலம் தொண்டை பாதையை இதமாக்குங்கள்.",
          "ஆபத்தான அறிகுறிகள் (உண்ண மறுத்தல், அதிக சோர்வு) குறித்து தாய்க்கு விளக்குங்கள்.",
          "3 நாட்களுக்குப் பிறகு குழந்தையை மீண்டும் பரிசோதிக்க திட்டமிடுங்கள்."
        ]
      },
      rationale: {
        en: `Respiratory rate (${respiratoryRate}/min) exceeds the fast breathing threshold for a child of ${ageMonths} months, indicating pulmonary congestion.`,
        hi: `श्वसन दर (${respiratoryRate}/मिनट) इस ¹ ${ageMonths} महीने के बच्चे के लिए सामान्य सीमा से अधिक है, जो फेफड़ों में संकुलन दर्शाती है।`,
        bn: `শ্বাসের গতি (${respiratoryRate}/মিনিট) এই ${ageMonths} মাস বয়সী শিশুর জন্য ফুসফুসের সম্ভাব্য সংক্রমণের ইঙ্গিত দেয়।`,
        ta: `சுவாச வீதம் (${respiratoryRate}/நிமிடம்) இந்த ${ageMonths} மாத குழந்தைக்கு அதிகமாக உள்ளது, இது நுரையீரல் வீக்கத்தைக் காட்டுகிறது.`
      }
    };
  }

  return {
    severity: "LOW",
    colorHex: "#10b981", // Emerald-500
    resultTitle: {
      en: "NO PNEUMONIA (Simple Cough or Common Cold)",
      hi: "निमोनिया नहीं (सामान्य खांसी या जुकाम)",
      bn: "নিউমোনিয়া নেই (সাধারণ সর্দি বা কাশি)",
      ta: "நிமோனியா இல்லை (சாதாரண சளி அல்லது இருமல்)"
    },
    checklist: {
      en: [
        "No antibiotics required or safe to distribute (critical to prevent antimicrobial resistance).",
        "Support standard nutritional fluid feeding, frequent breastfeeding, and skin-to-skin warmth.",
        "Advise mother carefully on immediate red flag danger signs.",
        "If coughing persists beyond 14 days, refer at once to screen for pediatric tuberculosis risks."
      ],
      hi: [
        "एंटीबायोटिक की कोई आवश्यकता नहीं है; अनावश्यक सेवन से एंटीमाइक्रोबियल प्रतिरोध बढ़ता है।",
        "घरेलू नुस्खों, स्वच्छ पानी और नियमित स्तनपान से श्वसन तंत्र को नम रखें।",
        "खतरे के आपातकालीन संकेतों के बारे में माँ को विस्तार से समझाएं।",
        "यदि खांसी १४ दिनों से अधिक चलती है, तो टीवी (Tuberculosis) की तत्काल जाँच कराएं।"
      ],
      bn: [
        "কোন অ্যান্টিবায়োটিকের প্রয়োজন নেই (যা অ্যান্টিমাইক্রোবিয়াল ড্রাগ রেজিস্ট্যান্স প্রতিরোধ করে)।",
        "নিরাপদ তরল পানীয় এবং পর্যাপ্ত পুষ্টিকর স্তন্যপান ও আর্দ্রতা বজায় রাখুন।",
        "অভিভাবককে আসন্ন বিপদের নির্দেশক এবং রেড ফ্ল্যাগ সমূহ বুঝিয়ে বলুন।",
        "যদি কাশি ১৪ দিনের বেশি স্থায়ী হয়, তবে যক্ষ্মার (Tuberculosis) জন্য তাৎক্ষণিক পরীক্ষা করান।"
      ],
      ta: [
        "நுண்ணುயிர் எதிர்ப்பிகள் (Antibiotics) தேவையில்லை (இது மருந்து எதிர்ப்பு சக்தியைத் தவிர்க்க உதவும்).",
        "இயல்பான தாய்ப்பால் மற்றும் கூடுதல் திரவ உணவுகளை வழங்குங்கள்.",
        "ஆபத்தான அறிகுறிகள் தென்பட்டால் உடனடியாக அணுகுமாறு தாயை அறிவுறுத்துங்கள்.",
        "இருமல் 14 நாட்களுக்கு மேல் நீடித்தால், காசநோய் பரிசோதனை மேற்கொள்ளவும்."
      ]
    },
    rationale: {
      en: "Respiratory rate is within medically acceptable parameters for client age. No active clinical red flags found.",
      hi: "श्वसन दर उम्र के अनुसार सामान्य चिकित्सकीय सीमा के भीतर है और कोई गंभीर लाल निशान नहीं मिला है।",
      bn: "শ্বাসের গতি বয়সের সাথে সামঞ্জস্যপূর্ণ এবং কোনো বিপদের লক্ষণ পরিলक्षित হয়নি।",
      ta: "சுவாச வீதம் வயது வரம்பிற்குள் உள்ளது, மேலும் ஆபத்தான அறிகுறிகள் எதுவும் இல்லை."
    }
  };
}

// Unified multi-lingual dynamic maternal anemia classification
export function determineMaternalAnaemiaThreat(hbLevel: number): {
  severity: "URGENT" | "MED" | "LOW";
  colorHex: string;
  resultTitle: Record<string, string>;
  checklist: Record<string, string[]>;
  rationale: Record<string, string>;
} {
  if (hbLevel < 7.0) {
    return {
      severity: "URGENT",
      colorHex: "#dc2626", // Red-600
      resultTitle: {
        en: "CRITICAL SEVERE MATERNAL ANAEMIA (Hb < 7.0 g/dL)",
        hi: "गंभीर मातृ एनीमिया स्थिति (Hb < ७.० g/dL)",
        bn: "মারাত্মক মাতৃত্বকালীন রক্তাল্পতা (Hb < ৭.० g/dL)",
        ta: "கடுமையான கர்ப்பிணி இரத்த சோகை (Hb < 7.0 g/dL)"
      },
      checklist: {
        en: [
          "CRITICAL EMERGENCY: Refer immediately to CHC / District Medical Center for IV iron sucrose therapy or blood transfusion.",
          "Absolutely avoid local oral iron dose adjustments under extreme depletion until hospital triage clears.",
          "Prepare emergency blood donors matching patient group."
        ],
        hi: [
          "गंभीर स्थिति: रक्त चढ़ने की आवश्यकता के लिए तुरंत CHC / जिला अस्पताल रेफर करें।",
          "अस्थिर अवस्था में डॉक्टर की अनुमति के बिना मौखिक आयरन की गोलियां न बढ़ाएं।",
          "आपातकालीन वाहन और रक्तदाताओं की त्वरित व्यवस्था करें।"
        ],
        bn: [
          "জরুরি ক্লিনিক্যাল রেফারেল: রক্ত সঞ্চালন বা শিরায় আয়রন নেওয়ার জন্য অবিলম্বে CHC বা জেলা হাসপাতালে পাঠান।",
          "রোগী স্থিতিশীল হওয়ার পূর্বে আয়রনের সাধারণ ওরাল ডোজ নিজে থেকে দ্বিগুণ করবেন না।",
          "যাতায়াতের জন্য পরিবার এবং স্থানীয় স্বাস্থ্য কেন্দ্রের জরুরি অ্যাম্বুলেন্সকে সক্রিয় করুন।"
        ],
        ta: [
          "அவசர மருத்துவ பரிந்துரை: இரத்த தானம் அல்லது நரம்பு வழி இரும்புச் சத்து பெற உடனடியாக CHC-க்கு அனுப்பவும்.",
          "மருத்துவர் அனுமதி இல்லாமல் வாய்வழி இரும்பு மாத்திரைகளின் அளவை அதிகரிக்க வேண்டாம்.",
          "குடும்பத்தினர் மற்றும் அவசர கால போக்குவரத்து வாகனங்களை உடனடியாக தயார் செய்யவும்."
        ]
      },
      rationale: {
        en: `Hemoglobin measured at ${hbLevel.toFixed(1)} g/dL represents critical systemic oxygen distribution deficit.`,
        hi: `हीमोग्लोबिन स्तर ${hbLevel.toFixed(1)} g/dL शरीर में ऑक्सीजन की गंभीर कमी और अत्यधिक कमजोरी दर्शाता है।`,
        bn: `হিমোগ্লোবিনের মাত্রা ${hbLevel.toFixed(1)} g/dL শরীরে অক্সিজেন পরিবহনের মারাত্মক ঘাটতি নির্দেশ করে।`,
        ta: `ஹீமோகுளோபின் அளவு ${hbLevel.toFixed(1)} g/dL என்பது உடலில் ஆக்ஸிஜன் விநியோகத்தில் கடுமையான பற்றாக்குறையைக் காட்டுகிறது.`
      }
    };
  }

  if (hbLevel < 10.0) {
    return {
      severity: "MED",
      colorHex: "#f59e0b", // Amber-500
      resultTitle: {
        en: "MODERATE MATERNAL ANAEMIA (Hb 7.0 - 9.9 g/dL)",
        hi: "मध्यम मातृ एनीमिया स्थिति (Hb ७.० - ९.९ g/dL)",
        bn: "মাঝারি মাতৃত্বকালীন রক্তাল্পতা (Hb ৭.০ - ৯.৯ g/dL)",
        ta: "மிதமான கர்ப்பிணி இரத்த சோகை (Hb 7.0 - 9.9 g/dL)"
      },
      checklist: {
        en: [
          "Initiate therapeutic daily double-dose: Two Iron-Folic Acid (IFA) tablets daily.",
          "Advise taking tablets with citrus juice or clean vitamin-C resources (e.g. lemons, Amla). NEVER take with milk, tea, or calcium.",
          "Reassure on harmless side-effects: dark-colored stool represents normal unabsorbed iron excretion.",
          "Establish systematic follow-up: repeating hemoglobin measurement in 14 days."
        ],
        hi: [
          "दैनिक उपचार शुरू करें: दिन में दो बार आयरन-फॉलिक एसिड (IFA) की गोलियां दें।",
          "दवा को विटामिन सी (नींबू पानी, आँवला) के साथ लें। चाय या दूध के साथ न लें।",
          "दवा के सुरक्षित प्रभावों (जैसे मल का रंग काला होना) के बारे में समझाएं।",
          "सुरक्षित अनुवर्ती निगरानी रखें: १४ दिनों में हीमोग्लोबिन स्तर की नैदानिक पुन: जाँच करें।"
        ],
        bn: [
          "দৈনিক থেরাপিউটিক ডোজ শুরু করুন: প্রতিদিন দুটি করে আয়রন-ফলিক অ্যাসিড (IFA) ট্যাবলেট।",
          "ট্যাবলেট ভিটামিন-সি যুক্ত পানীয় (যেমন লেবুর জল, আমলকি) দিয়ে খাওয়ান। দুধ বা চায়ের সাথে দেবেন না।",
          "ওষুধের স্বাভাবিক পার্শ্বপ্রতিক্রিয়া (যেমন মল কালো শ্লেষ্মা হওয়া) সম্পর্কে রোগীকে আশ্বস্ত করুন।",
          "নিয়মিত ট্র্যাকিং বজায় রাখুন: ১৪ দিনের মধ্যে পুনরায় হিমোগ্লোবিন পরিমাপ করার পরিকল্পনা করুন।"
        ],
        ta: [
          "தினசரி இரும்பு மற்றும் போலிக் அமில (IFA) மாத்திரைகளை இருமடங்காக (தினம் இரண்டு) வழங்குங்கள்.",
          "போலிக் அமில மாத்திரைகளை எலுமிச்சை சாறு அல்லது நெல்லிக்காயுடன் உட்கொள்ள அறிவுறுத்துங்கள். பால் அல்லது தேநீருடன் உட்கொள்ள வேண்டாம்.",
          "இயல்பான பக்க விளைவுகளை (மலம் கருமை நிறமாக மாறுவது) குறித்து கர்ப்பிணிக்கு விளக்கி அஞ்ச வேண்டாம் என அறிவுறுத்துங்கள்.",
          "14 நாட்களுக்குப் பிறகு மீண்டும் ஹீமோகுளோபின் அளவை பரிசோதிக்கவும்."
        ]
      },
      rationale: {
        en: `Hemoglobin at ${hbLevel.toFixed(1)} g/dL shows mild-to-moderate maternal cell deficiency requiring active therapeutic scaling.`,
        hi: `हीमोग्लोबिन स्तर ${hbLevel.toFixed(1)} g/dL शरीर में मध्यम एनीमिया दर्शाता है, जिसमें अतिरिक्त मौखिक उपचार आवश्यक है।`,
        bn: `হিমোগ্লোবিনের মাত্রা ${hbLevel.toFixed(1)} g/dL মাঝারি আকারের রক্তাল্পতা নির্দেশ করে যার জন্য দ্রুত ওষুধ থেরাপি দরকার।`,
        ta: `ஹீமோகுளோபின் அளவு ${hbLevel.toFixed(1)} g/dL மிதமான வரம்பைக் காட்டுகிறது, இதற்கு கூடுதல் மாத்திரைகள் தேவை.`
      }
    };
  }

  if (hbLevel < 11.0) {
    return {
      severity: "LOW",
      colorHex: "#10b981", // Emerald-500
      resultTitle: {
        en: "MILD MATERNAL ANAEMIA (Hb 10.0 - 10.9 g/dL)",
        hi: "हल्की मातृ एनीमिया स्थिति (Hb १०.० - १०.९ g/dL)",
        bn: "সামান্য মাতৃত্বকালীন রক্তাল্পতা (Hb ১০.০ - ১০.৯ g/dL)",
        ta: "குறைந்த கர்ப்பிணி இரத்த சோகை (Hb 10.0 - 10.9 g/dL)"
      },
      checklist: {
        en: [
          "Continue preventative prophylactic dose: One standard daily IFA tablet until term.",
          "Counsel on iron-rich regional foods (spinach, drumsticks, lentils, sesame seeds, local jaggery/Gur).",
          "Verify deworming: distribute single Albendazole (400mg) dosage during second trimester."
        ],
        hi: [
          "मानक निवारक खुराक जारी रखें: रोजाना एक सामान्य फॉलिक एसिड टैबलेट।",
          "आहार संवर्धन पर परामर्श दें: हरी पत्तेदार सब्जियां, स्वादिष्ट गुड़, अंकुरित चने आदि।",
          "कृमिनाशक स्थिति जांचें: गर्भावस्था की दूसरी तिमाही में कृमिनाशक दवा (एल्बेंडाजोल) दी जाए।"
        ],
        bn: [
          "সাধারণ প্রতিরোধমূলক ডোজ বজায় রাখুন: দৈনিক একটি করে সাধারণ IFA ট্যাবলেট।",
          "পুষ্টিকর খাদ্য গ্রহণের পরামর্শ দিন (সবুজ শাকসবজি, পালং শাক, অঙ্কুরিত ছোলা, খাঁটি গুড়)।",
          "কৃমিনাশক স্থিতি নিশ্চিত করুন: গর্ভাবস্থার দ্বিতীয় ত্রৈমাসিকে একটি ৪০০ মিগ্রা অ্যালবেন্ডাজল ট্যাব দিন।"
        ],
        ta: [
          "தொடர்ந்து தடுப்பு மருந்தாக தினமும் ஒரு போலிக் அமில (IFA) மாத்திரையை வழங்கவும்.",
          "உணவில் இரும்புச்சத்து நிறைந்த கீரைகள், பேரீச்சம்பழம், வெல்லம் ஆகியவற்றை சேர்க்க அறிவுறுத்துங்கள்.",
          "இரண்டாவது மூன்று மாதங்களில் ஒற்றை புழுநீக்க மாத்திரையை (400mg அல்பெண்டசோல்) வழங்குங்கள்."
        ]
      },
      rationale: {
        en: `Hemoglobin at ${hbLevel.toFixed(1)} g/dL is near the healthy threshold; maintain standard preventative care.`,
        hi: `हीमोग्लोबिन स्तर ${hbLevel.toFixed(1)} g/dL स्वस्थ सीमा के निकट है; सामान्य सुरक्षात्मक खुराक जारी रखें।`,
        bn: `হিমোগ্লোবিনের মাত্রা ${hbLevel.toFixed(1)} g/dL স্বাভাবিকের কাছাকাছি; সাধারণ পুষ্টিকর যত্ন বজায় রাখুন।`,
        ta: `ஹீமோகுளோபின் அளவு ${hbLevel.toFixed(1)} g/dL இயல்பான நிலைக்கு அருகில் உள்ளது; வழக்கமான பராமரிப்பு போதுமானது.`
      }
    };
  }

  return {
    severity: "LOW",
    colorHex: "#059669", // Deep Emerald-600
    resultTitle: {
      en: "NORMAL MATERNAL HEMOGLOBIN (Hb >= 11.0 g/dL)",
      hi: "सामान्य मातृ हीमोग्लोबिन स्तर (Hb >= ११.० g/dL)",
      bn: "স্বাভাবিক মাতৃত্বকালীন হিমোগ্লোবিন (Hb >= ১১.০ g/dL)",
      ta: "இயல்பான கர்ப்பிணி ஹீமோகுளோபின் அளவு (Hb >= 11.0 g/dL)"
    },
    checklist: {
      en: [
        "Prophylactic protection: One IFA tablet daily for 180 continuous gestational days.",
        "Reinforce clean water habits, regular prenatal checks, and balanced nutrition.",
        "Congratulate maternal client on excellent self-care. Note regular prenatal schedules."
      ],
      hi: [
        "नियमित सुरक्षात्मक खुराक: पूरे १८० दिनों तक प्रतिदिन एक सामान्य IFA टैबलेट।",
        "स्वच्छ भोजन, पोषक आहार और शुद्ध पानी के उपयोग पर बल दें।",
        "गर्भवती महिला एवं परिवार की उत्तम देखभाल के लिए सराहना करें।"
      ],
      bn: [
        "স্ট্যান্ডার্ড ডোজ: টানা ১৮০ দিনের জন্য প্রতিদিন একটি করে প্রতিরোধমূলক IFA ট্যাবলেট।",
        "স্থানীয় স্বাস্থ্যবিধি ও সুষম পুষ্টিকর খাদ্যাভ্যাস সম্পর্কে সচেতনতা বাড়ান।",
        "পরিবারের চমৎকার যত্নশীল পরিবেশের প্রশংসা করুন এবং পরবর্তী চেকআপ সূচি বজায় রাখুন।"
      ],
      ta: [
        "வழக்கமான மருந்தளவு: தொடர்ந்து 180 நாட்களுக்கு தினமும் ஒரு போலிக் அமில மாத்திரையை வழங்கவும்.",
        "இரும்புச் சத்து நிறைந்த உணவு மற்றும் முறையான சுகாதாரம் குறித்த ஆலோசனைகளை வழங்கவும்.",
        "சீரான சுய பராமரிப்புக்காக கர்ப்பிணியை பாராட்டி அடுத்த பரிசோதனை காலத்தை குறித்துக்கொள்ளவும்."
      ]
    },
    rationale: {
      en: "Hemoglobin level is within medically approved protective range for second and third trimestral gestations.",
      hi: "हीमोग्लोबिन स्तर गर्भवती महिलाओं के स्वास्थ्य नियमों के अनुसार उत्कृष्ट और सुरक्षित है।",
      bn: "হিমোগ্লোবিনের মাত্রা গর্ভবতী মহিলাদের স্বাস্থ্য বিধি অনুযায়ী চমৎকার ও সম্পূর্ণ স্বাভাবিক রয়েছে।",
      ta: "ஹீமோகுளோபின் அளவு கர்ப்பிணித் தாய்க்கு சிறந்த சுகாதார வரம்பில் உள்ளது."
    }
  };
}

// Regional phonetic instructions for accessibility
export const PHONETIC_GUIDES: Record<string, Record<string, string>> = {
  hi: {
    chest_retraction: "सुनिए: यदि बच्चे की साँस लेते समय छाती नीचे धंस रही है, तो यह गंभीर निमोनिया है। तुरंत अस्पताल ले जाएं।",
    anemia: "सुनिए: गर्भवती स्त्री का हीमोग्लोबिन ग्यारह से कम होने पर आयरन फोलिक एसिड टैबलेट दूध या चाय के साथ न लें, नींबू पानी या सादे पानी के साथ लें।",
    cough: "सुनिए: यदि बच्चे का साँस प्रति मिनट सामान्य सीमा से अधिक है, तो उसे साँस की परेशानी हो सकती है, चिकित्सकीय मदद लें।"
  },
  en: {
    chest_retraction: "Clinical Audio instruction: Chest wall retractions symbolize heavy breathing labor. Immediate hospital transfer is needed.",
    anemia: "Clinical Audio instruction: Prioritize Iron Folic Acid intake. Take with clean water/citrus juices to maximize iron uptake.",
    cough: "Clinical Audio instruction: High breaths counts combined with dry cold requires targeted diagnostic evaluation."
  },
  bn: {
    chest_retraction: "শুনুন: শ্বাস নেওয়ার সময় যদি শিশুর বুক দেবে যায়, তবে এটি মারাত্মক নিউমোনিয়া। অতি শীঘ্রই হাসপাতালে নিয়ে যান।",
    anemia: "শুনুন: গর্ভবতী মহিলার হিমোগ্লোবিন ১১-র কম হলে অবশ্যই প্রতিদিন দুটি লোহা-ফলিক অ্যাসিড ট্যাবলেট খান।",
    cough: "শুনুন: শিশুর শ্বাসের গতি অতিরিক্ত বাড়লে অবিলম্বে স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন।"
  },
  ta: {
    chest_retraction: "கேளுங்கள்: குழந்தை மூச்சுவிடும்போது நெஞ்சு உள்வாங்கினால் அது தீவிர நிமோனியா நோயாகும், உடனே மருத்துவமனைக்கு அழைத்துச் செல்லவும்.",
    anemia: "கேளுங்கள்: கர்ப்பிணி தாயின் ஹீமோகுளோபின் 11-ஐ விட குறைவாக இருந்தால், போலிக் அமில வைட்டமின் மாத்திரைகளை டீ அல்லது பாலுடன் உட்கொள்ளாமல் தண்ணீருடன் உட்கொள்ளவும்.",
    cough: "கேளுங்கள்: குழந்தையின் சுவாச எண்ணிக்கை வரம்பை தாண்டினால் சுவாச கோளாறு இருக்கலாம், உடனடியாக மருத்துவரை அணுகவும்."
  }
};
