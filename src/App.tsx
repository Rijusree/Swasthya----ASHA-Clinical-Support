import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ChevronRight,
  Activity,
  HeartPulse,
  User,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Phone,
  Send,
  UserCheck,
  Calendar,
  Layers,
  ArrowLeft,
  Cloud,
  Check,
  Sparkles,
  RefreshCw,
  Sliders,
  AlertCircle,
  Menu,
  VolumeX,
  UserPlus,
  X,
  Wifi,
  WifiOff,
  BookOpen,
  HelpCircle,
  CheckSquare,
  Plus,
  Printer,
  MessageSquare,
  TrendingUp,
  MoreVertical,
  LogOut,
  LogIn,
  Database,
  ShieldCheck,
  Trash2,
  Copy,
  GitBranch,
  GitCommit as GitCommitIcon,
  Mail,
  BellRing,
  RotateCcw
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from "recharts";

import {
  LANGUAGES,
  loadPatientsFromDatabase,
  savePatientsToDatabase,
  loadPatientsFromIndexedDB,
  savePatientsToIndexedDB,
  determinePediatricRespiratoryThreat,
  determineMaternalAnaemiaThreat,
  PHONETIC_GUIDES,
  Patient,
  ClinicalRecord,
  getLocalizedText,
  getDefaultImmunizations,
  ImmunizationRecord
} from "./data";

export interface GitCommit {
  id: string;
  hash: string;
  timestamp: string;
  author: string;
  message: string;
  type: "CREATE_PATIENT" | "ADD_VISIT" | "UPDATE_VACCINE" | "ADD_VACCINE" | "DELETE_VACCINE" | "ROLLBACK";
  details: string;
  snapshot?: Patient[];
}

export interface ActiveAlert {
  id: string;
  patientName: string;
  patientId: string;
  phone: string;
  email: string;
  vaccine: string;
  dueDate: string;
  smsMsg: string;
  emailMsg: string;
  steps: string[];
  currentStepIndex: number;
  status: "sending" | "success" | "idle";
}

const IMM_TRANSLATIONS: Record<string, any> = {
  en: {
    title: "Pediatric Immunization Record Tracker",
    subtitle: "Verify, record and update routine vaccination checklists.",
    progressLabel: "Vaccination Progress",
    addCustomBtn: "+ Add Custom Vaccine",
    formTitle: "Add Custom Immunization Entry",
    vaccineNameLabel: "Vaccine Name",
    dueDateLabel: "Due Period (e.g. 6 Weeks)",
    statusLabel: "Intake Status",
    adminDateLabel: "Administration Date (Optional)",
    notesLabel: "Observation Notes",
    saveBtn: "Save Immunization",
    cancelBtn: "Cancel",
    emptyList: "No immunization records match current filters.",
    markAdministered: "Mark Administered",
    overdueWarning: "Action Needed: Overdue vaccine, schedule outreach.",
    filterAll: "All Vaccines",
    filterPending: "Pending",
    filterAdministered: "Administered",
    filterOverdue: "Overdue",
    administeredOn: "Administered on",
    dueAt: "Due at",
    notesPlaceholder: "Write specific notes like batch ID or side effects...",
    deleteTooltip: "Remove custom record",
    noRecordsMsg: "No immunization history defined. Click below to initialize default schedule.",
    initScheduleBtn: "Initialize Default Schedule",
    clearRecord: "Reset Record",
    customTag: "Custom",
    pending: "Pending",
    administered: "Administered",
    overdue: "Overdue",
    filterUpcomingAlert: "⚠️ Alert Mode",
    upcomingAlertBanner: "ASHA Proactive Alert Mode: Showing vaccines due within 1 week. Use the customized outreach templates below to contact parents.",
    copyOutreachBtn: "Copy SMS Outreach",
    whatsappOutreachBtn: "WhatsApp Outreach",
    copiedLabel: "Copied!",
    upcomingBadge: "Due Soon",
    noUpcomingAlerts: "No vaccines are due in the next 1 week for this child.",
    simulateAlertBtn: "Simulate Upcoming (Add Test Vaccine Due in 4 Days)",
    outreachHeader: "Proactive Outreach SMS Template"
  },
  hi: {
    title: "बाल टीकाकरण रिकॉर्ड ट्रैकर",
    subtitle: "नियमित टीकाकरण चेकलिस्ट को सत्यापित, रिकॉर्ड और अपडेट करें।",
    progressLabel: "टीकाकरण प्रगति",
    addCustomBtn: "+ कस्टम वैक्सीन जोड़ें",
    formTitle: "कस्टम टीकाकरण प्रविष्टि जोड़ें",
    vaccineNameLabel: "वैक्सीन का नाम",
    dueDateLabel: "देय अवधि (जैसे 6 सप्ताह)",
    statusLabel: "टीकाकरण स्थिति",
    adminDateLabel: "प्रशासन तिथि (वैकल्पिक)",
    notesLabel: "अवलोकन नोट्स",
    saveBtn: "टीकाकरण सहेजें",
    cancelBtn: "रद्द करें",
    emptyList: "कोई भी टीकाकरण रिकॉर्ड वर्तमान फ़िल्टर से मेल नहीं खाता।",
    markAdministered: "लगाया गया चिह्नित करें",
    overdueWarning: "कार्रवाई आवश्यक: अतिदेय वैक्सीन, आउटरीच निर्धारित करें।",
    filterAll: "सभी टीके",
    filterPending: "लंबित",
    filterAdministered: "लगाए गए",
    filterOverdue: "अतिदेय",
    administeredOn: "प्रशासन तिथि",
    dueAt: "देय अवधि",
    notesPlaceholder: "बैच आईडी या साइड इफेक्ट्स जैसे विशिष्ट नोट्स लिखें...",
    deleteTooltip: "कस्टम रिकॉर्ड हटाएं",
    noRecordsMsg: "कोई टीकाकरण इतिहास परिभाषित नहीं है। डिफ़ॉल्ट शेड्यूल शुरू करने के लिए नीचे क्लिक करें।",
    initScheduleBtn: "डिफ़ॉल्ट शेड्यूल शुरू करें",
    clearRecord: "रीसेट करें",
    customTag: "कस्टम",
    pending: "लंबित",
    administered: "लगाया गया",
    overdue: "अतिदेय",
    filterUpcomingAlert: "⚠️ अलर्ट मोड",
    upcomingAlertBanner: "आशा प्रोएक्टिव अलर्ट मोड: अगले 1 सप्ताह में देय टीके दिखा रहा है। अभिभावकों से संपर्क करने के लिए नीचे दिए गए संदेशों का उपयोग करें।",
    copyOutreachBtn: "संदेश कॉपी करें",
    whatsappOutreachBtn: "व्हाट्सएप आउटरीच",
    copiedLabel: "कॉपी किया गया!",
    upcomingBadge: "जल्द देय",
    noUpcomingAlerts: "इस बच्चे के लिए अगले 1 सप्ताह में कोई टीका देय नहीं है।",
    simulateAlertBtn: "सिम्युलेट अलर्ट (4 दिनों में देय टेस्ट वैक्सीन जोड़ें)",
    outreachHeader: "प्रोएक्टिव आउटरीच एसएमएस टेम्पलेट"
  },
  ta: {
    title: "குழந்தை தடுப்பூசி பதிவு கண்காணிப்பாளர்",
    subtitle: "வழக்கமான தடுப்பூசி சரிபார்ப்புப் பட்டியல்களை சரிபார்த்து, பதிவுசெய்து புதுப்பிக்கவும்.",
    progressLabel: "தடுப்பூசி முன்னேற்றம்",
    addCustomBtn: "+ தனிப்பயன் தடுப்பூசி சேர்க்க",
    formTitle: "தனிப்பயன் தடுப்பூசி பதிவைச் சேர்",
    vaccineNameLabel: "தடுப்பூசி பெயர்",
    dueDateLabel: "தேவைப்படும் காலம் (எ.கா. 6 வாரங்கள்)",
    statusLabel: "தடுப்பூசி நிலை",
    adminDateLabel: "வழங்கப்பட்ட தேதி (விருப்பத்தேர்வு)",
    notesLabel: "கண்காணிப்பு குறிப்புகள்",
    saveBtn: "பதிவைச் சேமிக்கவும்",
    cancelBtn: "ரத்து செய்",
    emptyList: "தற்போதைய வடிகட்டிகளுடன் பொருந்தும் தடுப்பூசி பதிவுகள் எதுவும் இல்லை.",
    markAdministered: "வழங்கப்பட்டது என குறிக்கவும்",
    overdueWarning: "உடனடி நடவடிக்கை: காலாவதியான தடுப்பூசி, வீடுகளுக்குச் சென்று வழங்கவும்.",
    filterAll: "அனைத்து தடுப்பூசிகள்",
    filterPending: "நிலுவையில் உள்ளவை",
    filterAdministered: "வழங்கப்பட்டவை",
    filterOverdue: "காலாவதியானவை",
    administeredOn: "வழங்கப்பட்ட தேதி",
    dueAt: "தேவைப்படும் காலம்",
    notesPlaceholder: "தொகுதி ஐடி அல்லது பக்க விளைவுகள் போன்ற குறிப்பிட்ட குறிப்புகளை எழுதவும்...",
    deleteTooltip: "பதிவை நீக்குக",
    noRecordsMsg: "தடுப்பூசி வரலாறு எதுவும் இல்லை. இயல்புநிலை அட்டவணையைத் தொடங்க கீழே கிளிக் செய்யவும்.",
    initScheduleBtn: "இயல்புநிலை அட்டவணையைத் தொடங்கு",
    clearRecord: "மீட்டமை",
    customTag: "தனிப்பயன்",
    pending: "நிலுவையில்",
    administered: "வழங்கப்பட்டது",
    overdue: "காலாவதியானது",
    filterUpcomingAlert: "⚠️ விழிப்புணர்வு பயன்முறை",
    upcomingAlertBanner: "ஆஷா விழிப்புணர்வு பயன்முறை: 1 வாரத்திற்குள் தேவைப்படும் தடுப்பூசிகள் காட்டப்படுகின்றன. பெற்றோரைத் தொடர்பு கொள்ள கீழே உள்ள செய்தி வார்ப்புருக்களைப் பயன்படுத்தவும்.",
    copyOutreachBtn: "செய்தியை நகலெடு",
    whatsappOutreachBtn: "வாட்ஸ்அப் செய்தி",
    copiedLabel: "நகலெடுக்கப்பட்டது!",
    upcomingBadge: "விரைவில் தேவை",
    noUpcomingAlerts: "இந்த குழந்தைக்கு அடுத்த 1 வாரத்தில் எந்த தடுப்பூசியும் தேவைப்படவில்லை.",
    simulateAlertBtn: "அலர்ட்டை உருவகப்படுத்து (4 நாட்களில் தேவைப்படும் சோதனை தடுப்பூசியை சேர்)",
    outreachHeader: "தடுப்பூசி விழிப்புணர்வு செய்தி வார்ப்புரு"
  },
  bn: {
    title: "শিশু টিকাদান রেকর্ড ট্র্যাকার",
    subtitle: "নিয়মিত টিকাদান চেকলিস্ট যাচাই করুন, রেকর্ড করুন এবং আপডেট করুন।",
    progressLabel: "টিকাদানের অগ্রগতি",
    addCustomBtn: "+ কাস্টম ভ্যাকসিন যোগ করুন",
    formTitle: "কাস্টম টিকাদান এন্ট্রি যোগ করুন",
    vaccineNameLabel: "ভ্যাকসিনের নাম",
    dueDateLabel: "প্রদেয় সময়কাল (যেমন ৬ সপ্তাহ)",
    statusLabel: "টিকা গ্রহণের অবস্থা",
    adminDateLabel: "প্রদানের তারিখ (ঐচ্ছিক)",
    notesLabel: "পর্যবেক্ষণ নোট",
    saveBtn: "টিকা সংরক্ষণ করুন",
    cancelBtn: "বাতিল করুন",
    emptyList: "কোনো টিকাদান রেকর্ড বর্তমান ফিল্টারের সাথে মিলছে না।",
    markAdministered: "প্রদত্ত চিহ্নিত করুন",
    overdueWarning: "পদক্ষেপ প্রয়োজন: অতিবাহিত টিকা, সময়সূচী নির্ধারণ করুন।",
    filterAll: "সব টিকা",
    filterPending: "অপেক্ষমান",
    filterAdministered: "প্রদত্ত",
    filterOverdue: "অতিবাহিত",
    administeredOn: "প্রদানের তারিখ",
    dueAt: "প্রদেয় সময়",
    notesPlaceholder: "ব্যাচ আইডি বা পার্শ্বপ্রতিক্রিয়াগুলির মতো নির্দিষ্ট নোট লিখুন...",
    deleteTooltip: "কাস্টম রেকর্ড মুছুন",
    noRecordsMsg: "কোনো টিকাদান ইতিহাস পাওয়া যায়নি। ডিফল্ট সময়সূচী শুরু করতে নিচে क्लिक করুন।",
    initScheduleBtn: "ডিফল্ট সময়সূচী চালু করুন",
    clearRecord: "রিসেট করুন",
    customTag: "কাস্টম",
    pending: "বাকি আছে",
    administered: "দেওয়া হয়েছে",
    overdue: "মেয়াদোত্তীর্ণ",
    filterUpcomingAlert: "⚠️ অ্যালার্ট মোড",
    upcomingAlertBanner: "আশা প্রোঅ্যাক্টিভ অ্যালার্ট মোড: ১ সপ্তাহের মধ্যে প্রদেয় টিকাগুলি প্রদর্শিত হচ্ছে। অভিভাবকদের সাথে যোগাযোগের জন্য নিচের বার্তাগুলি ব্যবহার করুন।",
    copyOutreachBtn: "বার্তা কপি করুন",
    whatsappOutreachBtn: "হোয়াটসঅ্যাপ প্রচার",
    copiedLabel: "কপি হয়েছে!",
    upcomingBadge: "শীঘ্রই প্রদেয়",
    noUpcomingAlerts: "এই শিশুর জন্য আগামী ১ সপ্তাহে কোনো টিকা প্রদেয় নেই।",
    simulateAlertBtn: "সিমুলেট অ্যালার্ট (৪ দিনে প্রদেয় টেস্ট ভ্যাকসিন যোগ করুন)",
    outreachHeader: "প্রোঅ্যাক্টিভ প্রচার এসএমএস টেমপ্লেট"
  }
};

const ashaWorkersImg = "/src/assets/images/asha_workers_group_1782560935920.jpg";
const ashaSingleImg = "/src/assets/images/asha_worker_single_1782562239916.jpg";
const swasthyaHeroMaternal = "/src/assets/images/swasthya_hero_maternal_1782747946793.jpg";

// Swasthya Diya Progress Indicator
const DiyaProgress = ({ severity }: { severity: "LOW" | "MED" | "URGENT" }) => {
  const isUrgent = severity === "URGENT";
  const isMed = severity === "MED";
  
  const flameColor = isUrgent 
    ? "#B5451B" // deep earthy terracotta red
    : isMed 
    ? "#F4A228" // saffron
    : "#1A7F77"; // peacock teal for safe normal

  const oilOpacity = isUrgent ? 0.25 : isMed ? 0.65 : 0.95;
  const statusLabel = isUrgent ? "Urgent CDSS Protocols" : isMed ? "Moderate - Monitor closely" : "Normal - Routine Followup";

  return (
    <div className="flex items-center gap-4 bg-[#FDF3E3]/80 border border-[#F4A228]/35 p-4 rounded-2xl shadow-xs">
      <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Flame of the Diya */}
          <g className="diya-flame" style={{ transformOrigin: "50px 35px" }}>
            <path 
              d="M50,15 C45,25 43,35 50,45 C57,35 55,25 50,15 Z" 
              fill={flameColor} 
              className="transition-all duration-500"
            />
            <path 
              d="M50,22 C47,28 46,33 50,40 C54,33 53,28 50,22 Z" 
              fill="#FFF8EB" 
            />
          </g>
          
          {/* Clay Bowl / Diya Base */}
          <path 
            d="M20,50 C20,70 80,70 80,50 C80,50 75,55 50,55 C25,55 20,50 20,50 Z" 
            fill="#B5451B" 
          />
          {/* Oil/Light liquid level */}
          <path 
            d="M23,51 C23,65 77,65 77,51 C77,51 72,54 50,54 C28,54 23,51 23,51 Z" 
            fill="#FFD23F" 
            opacity={oilOpacity}
            className="transition-all duration-500"
          />
        </svg>
      </div>
      <div>
        <span className="text-[8px] font-mono font-bold text-[#B5451B] uppercase tracking-widest block leading-none mb-1">Swasthya Diya State</span>
        <span className="text-xs font-black" style={{ color: flameColor }}>{statusLabel}</span>
      </div>
    </div>
  );
};

export default function App() {
  // Global Language configuration
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  // Interchangeable Welcome Screen Image selector
  const [activeHeroImage, setActiveHeroImage] = useState<"group" | "single">("group");
  
  // Welcome Portal Cinematic control
  const [hasBegun, setHasBegun] = useState<boolean>(false);
  
  // Cycle welcome screen images automatically with gentle zoom
  useEffect(() => {
    if (hasBegun) return;
    const interval = setInterval(() => {
      setActiveHeroImage(prev => prev === "group" ? "single" : "group");
    }, 4500);
    return () => clearInterval(interval);
  }, [hasBegun]);

  // Custom video looping fade-in/fade-out reference logic state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoOpacity, setVideoOpacity] = useState<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;

    const checkLoop = () => {
      if (video) {
        const currentTime = video.currentTime;
        const duration = video.duration;

        if (duration && duration > 0) {
          // Fade in over 0.5s at the start (opacity 0 to 1)
          if (currentTime < 0.5) {
            setVideoOpacity(currentTime / 0.5);
          } 
          // Fade out over 0.5s before the end (opacity 1 to 0)
          else if (duration - currentTime < 0.5) {
            setVideoOpacity(Math.max(0, (duration - currentTime) / 0.5));
          } 
          // Otherwise fully visible
          else {
            setVideoOpacity(1);
          }
        }
      }
      animationFrameId = requestAnimationFrame(checkLoop);
    };

    const handleEnded = () => {
      // On ended event: set opacity to 0, wait 100ms, reset currentTime = 0, then play() again
      setVideoOpacity(0);
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch((err) => {
            console.log("Safe video play bypass:", err);
          });
        }
      }, 100);
    };

    video.addEventListener("ended", handleEnded);
    animationFrameId = requestAnimationFrame(checkLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (video) {
        video.removeEventListener("ended", handleEnded);
      }
    };
  }, [hasBegun]);

  // Mobile navigation tracker: "flow" (Patient Flow list view) or "case" (Active Patient case sheet view)
  const [mobileTab, setMobileTab] = useState<"flow" | "case">("flow");

  // Core App Tab controller (allows switching from registry view to WHO library)
  const [activeAppTab, setActiveAppTab] = useState<"registry" | "knowledge">("registry");

  // Sandbox Manual Simulator state blocks
  const [calcCategory, setCalcCategory] = useState<"pediatric" | "maternal">("pediatric");
  const [calcAge, setCalcAge] = useState<number>(18);
  const [calcRR, setCalcRR] = useState<number>(38);
  const [calcChest, setCalcChest] = useState<boolean>(false);
  const [calcStridor, setCalcStridor] = useState<boolean>(false);
  const [calcHb, setCalcHb] = useState<number>(10.5);

  // Network Connectivity simulation: true = Online, false = Offline
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // Training Guide Help Manual Drawer open/close status
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Three dots settings & account state
  const [isThreeDotsOpen, setIsThreeDotsOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isSlowAudio, setIsSlowAudio] = useState<boolean>(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  // AI Knowledge Base General Help Q&A State Blocks
  const [kbQuery, setKbQuery] = useState<string>("");
  const [kbLoading, setKbLoading] = useState<boolean>(false);
  const [kbChatHistory, setKbChatHistory] = useState<{ sender: "user" | "ai"; text: string; timestamp: string }[]>([
    {
      sender: "ai",
      text: "Namaste! I am your WHO-IMCI clinical educational assistant. You can ask me any general healthcare questions, guidelines thresholds, dosage directions, or clinical field protocols here.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Admission Register Multi-step Form controller states
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [regStep, setRegStep] = useState<number>(1);
  const [regName, setRegName] = useState<string>("");
  const [regGender, setRegGender] = useState<"male" | "female">("female");
  const [regAge, setRegAge] = useState<string>("");
  const [regVillage, setRegVillage] = useState<string>("Karanpur Sector");
  const [regSpouseOrGuardian, setRegSpouseOrGuardian] = useState<string>("");
  const [regPrimaryIssue, setRegPrimaryIssue] = useState<string>("");
  const [regPhone, setRegPhone] = useState<string>("");
  const [regEmail, setRegEmail] = useState<string>("");

  // Git-style Version History & Changes State
  const [isGitLogOpen, setIsGitLogOpen] = useState<boolean>(false);
  const [gitCommits, setGitCommits] = useState<GitCommit[]>(() => {
    const raw = localStorage.getItem("asha_git_commits");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return [];
      }
    }
    return [
      {
        id: "c-init",
        hash: "3a8f1b2",
        timestamp: "2026-06-25T08:30:00Z",
        author: "Anjali Sharma (ASHA Worker)",
        message: "init: Import core registry database of Pipariya, Ghansore, Amari villages",
        type: "CREATE_PATIENT",
        details: "Imported 5 patients into local Swasthya database."
      }
    ];
  });

  const pushGitCommit = (
    type: "CREATE_PATIENT" | "ADD_VISIT" | "UPDATE_VACCINE" | "ADD_VACCINE" | "DELETE_VACCINE" | "ROLLBACK",
    message: string,
    details: string,
    snapshotOverride?: Patient[]
  ) => {
    const shortHash = Math.random().toString(16).substring(2, 9);
    const registrySnapshot = snapshotOverride || patientRegistry;
    const newCommit: GitCommit = {
      id: `commit-${Date.now()}`,
      hash: shortHash,
      timestamp: new Date().toISOString(),
      author: "Anjali Sharma (ASHA Worker)",
      message,
      type,
      details,
      snapshot: JSON.parse(JSON.stringify(registrySnapshot))
    };
    setGitCommits(prev => {
      const updated = [newCommit, ...prev];
      localStorage.setItem("asha_git_commits", JSON.stringify(updated));
      return updated;
    });
  };

  // Automated Vaccine Alert notifications popup state
  const [activeAlert, setActiveAlert] = useState<ActiveAlert | null>(null);
  const [dispatchedAlerts, setDispatchedAlerts] = useState<any[]>(() => {
    const raw = localStorage.getItem("asha_dispatched_alerts");
    return raw ? JSON.parse(raw) : [];
  });

  // Run step-by-step messaging simulation updates
  useEffect(() => {
    if (!activeAlert) return;
    if (activeAlert.currentStepIndex >= activeAlert.steps.length - 1) {
      if (activeAlert.status !== "success") {
        setActiveAlert(prev => prev ? { ...prev, status: "success" } : null);
      }
      return;
    }

    const timer = setTimeout(() => {
      setActiveAlert(prev => {
        if (!prev) return null;
        return {
          ...prev,
          currentStepIndex: prev.currentStepIndex + 1
        };
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, [activeAlert]);

  const triggerUpcomingVaccineAlert = (patient: Patient, imm: ImmunizationRecord) => {
    const phoneNum = patient.phone || "+91 94120 12345";
    const emailAddr = patient.email || "N/A";
    const spouseOrGuardian = patient.spouseOrGuardian || "Guardian";
    
    const smsMsg = `Namaste ${spouseOrGuardian}, this is a reminder from ASHA worker Anjali Sharma. Your child ${patient.name} is due for their ${imm.vaccine} vaccine on ${imm.dueDate}. Please visit the health center.`;
    const emailMsg = emailAddr !== "N/A" 
      ? `Dear ${spouseOrGuardian},\n\nThis is an automated health reminder from your local Swasthya Health Center.\n\nOur records indicate that ${patient.name} is scheduled to receive the ${imm.vaccine} vaccine (due: ${imm.dueDate}).\n\nRegistered Mobile Number: ${phoneNum}\n\nThank you for ensuring timely immunization.\n\nWarm regards,\nASHA Community Healthcare System`
      : "N/A";

    const alertId = `ALERT-${Date.now()}`;
    const initialSteps = [
      `🔔 Triggered upcoming ${imm.vaccine} vaccine alert for ${patient.name}`,
      `⚙️ Generating messaging payloads...`,
      `📱 [SMS Gateway] Routing warning text to ${phoneNum}...`,
      `💬 [WhatsApp Gateway] Sending automated template message to ${phoneNum}...`,
      emailAddr !== "N/A" 
        ? `✉️ [SMTP Server] Dispatching immunization schedule email to ${emailAddr}...`
        : `⚠️ [SMTP Server] Skipped email: No email address registered in patient database.`,
      `✅ Outreach successful! Reminders recorded and sent.`
    ];

    const newAlert: ActiveAlert = {
      id: alertId,
      patientName: patient.name,
      patientId: patient.id,
      phone: phoneNum,
      email: emailAddr,
      vaccine: imm.vaccine,
      dueDate: imm.dueDate,
      smsMsg,
      emailMsg,
      steps: initialSteps,
      currentStepIndex: 0,
      status: "sending"
    };

    setActiveAlert(newAlert);

    // Save to dispatched alerts list
    setDispatchedAlerts(prev => {
      const newDispatched = {
        id: alertId,
        timestamp: new Date().toISOString(),
        patientName: patient.name,
        vaccine: imm.vaccine,
        phone: phoneNum,
        email: emailAddr,
        status: "SENT",
        channel: emailAddr !== "N/A" ? "SMS + WhatsApp + Email" : "SMS + WhatsApp"
      };
      const updated = [newDispatched, ...prev];
      localStorage.setItem("asha_dispatched_alerts", JSON.stringify(updated));
      return updated;
    });

    // Git Log Commit for alert dispatch
    pushGitCommit(
      "UPDATE_VACCINE",
      `alert: auto-dispatched upcoming vaccine reminders for ${patient.name}`,
      `Dispatched reminders for ${imm.vaccine}. SMS/WhatsApp sent to ${phoneNum}.${emailAddr !== "N/A" ? ` Email sent to ${emailAddr}.` : " No email registered."}`
    );
  };

  // Local-first Clinic Registry state
  const [patientRegistry, setPatientRegistry] = useState<Patient[]>(() => {
    return loadPatientsFromDatabase();
  });

  useEffect(() => {
    // Asynchronously load the patient registry from the local IndexedDB database
    loadPatientsFromIndexedDB()
      .then((indexedPatients) => {
        if (indexedPatients && indexedPatients.length > 0) {
          setPatientRegistry(indexedPatients);
        } else {
          // If IndexedDB database is empty, seed it with the default initial cohort
          savePatientsToIndexedDB(patientRegistry);
        }
      })
      .catch((err) => {
        console.warn("IndexedDB load hook failed", err);
      });
  }, []);
  
  // Selected Patient tracking
  const [selectedPatientId, setSelectedPatientId] = useState<string>("PAT-IND-2940");
  const [viewingDashboard, setViewingDashboard] = useState<boolean>(true);
  
  // Search and Category filter triggers
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<"ALL" | "PEDIATRIC" | "MATERNAL">("ALL");

  // Background synchronize state queue
  const [syncStatus, setSyncStatus] = useState<"synced" | "pending" | "syncing">("synced");

  // Selected Patient object memo
  const selectedPatient = useMemo(() => {
    return patientRegistry.find(p => p.id === selectedPatientId) || patientRegistry[0];
  }, [patientRegistry, selectedPatientId]);

  // Current session baseline checks when patient switches
  const latestHistoricalVisit = useMemo(() => {
    if (!selectedPatient || !selectedPatient.history || selectedPatient.history.length === 0) return null;
    return selectedPatient.history[selectedPatient.history.length - 1];
  }, [selectedPatient]);

  // Vitals inputs form states
  const [currentHb, setCurrentHb] = useState<number>(10.0);
  const [currentRespiratoryRate, setCurrentRespiratoryRate] = useState<number>(38);
  const [currentChestInDrawing, setCurrentChestInDrawing] = useState<boolean>(false);
  const [currentStridor, setCurrentStridor] = useState<boolean>(false);
  const [currentFeverDays, setCurrentFeverDays] = useState<number>(0);
  const [currentVisitNotes, setCurrentVisitNotes] = useState<string>("");

  // Immunization tracking UI state
  const [newImmName, setNewImmName] = useState<string>("");
  const [newImmDueDate, setNewImmDueDate] = useState<string>("");
  const [newImmStatus, setNewImmStatus] = useState<"PENDING" | "ADMINISTERED" | "OVERDUE">("PENDING");
  const [newImmAdminDate, setNewImmAdminDate] = useState<string>("");
  const [newImmNotes, setNewImmNotes] = useState<string>("");
  const [showAddImmForm, setShowAddImmForm] = useState<boolean>(false);
  const [immFilterStatus, setImmFilterStatus] = useState<"ALL" | "PENDING" | "ADMINISTERED" | "OVERDUE" | "UPCOMING_ALERT">("ALL");
  const [copiedImmId, setCopiedImmId] = useState<string | null>(null);

  // UI feedback notifications states
  const [syncFlash, setSyncFlash] = useState<string | null>(null);
  const [ambulanceAlertDetails, setAmbulanceAlertDetails] = useState<string | null>(null);

  // Audio system helpers
  const [activePhoneticAudio, setActivePhoneticAudio] = useState<string | null>(null);
  const [voicePlaying, setVoicePlaying] = useState<boolean>(false);

  // Consult AI dialog/insight states
  const [aiQuery, setAiQuery] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [voiceSimulatorActive, setVoiceSimulatorActive] = useState<boolean>(false);

  // Load patient baseline states on selection
  const [lastTrackedPatientId, setLastTrackedPatientId] = useState<string>("");
  useEffect(() => {
    if (selectedPatient && selectedPatient.id !== lastTrackedPatientId) {
      setLastTrackedPatientId(selectedPatient.id);
      if (selectedPatient.gender === "female") {
        setCurrentHb(latestHistoricalVisit?.hemoglobin ?? 11.0);
        setCurrentFeverDays(latestHistoricalVisit?.feverDays ?? 0);
      } else {
        setCurrentRespiratoryRate(latestHistoricalVisit?.respiratoryRate ?? 38);
        setCurrentChestInDrawing(latestHistoricalVisit?.chestInDrawing ?? false);
        setCurrentStridor(latestHistoricalVisit?.stridor ?? false);
        setCurrentFeverDays(latestHistoricalVisit?.feverDays ?? 0);
      }
      setCurrentVisitNotes("");
      setAiResponse(null);
      setAiQuery("");
    }
  }, [selectedPatient, latestHistoricalVisit, lastTrackedPatientId]);

  // Filter & Search dynamic results
  const filteredPatients = useMemo(() => {
    return patientRegistry.filter(p => {
      const matchQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.village.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (categoryFilter === "ALL") return matchQuery;
      if (categoryFilter === "PEDIATRIC") return matchQuery && p.gender === "male";
      if (categoryFilter === "MATERNAL") return matchQuery && p.gender === "female";
      return matchQuery;
    });
  }, [patientRegistry, searchQuery, categoryFilter]);

  // Translation helpers
  const langKey = LANGUAGES[selectedLanguage] ? selectedLanguage : "en";
  const { translations } = LANGUAGES[langKey];

  // Dynamic live diagnostics based on form inputs
  const livePediatricResult = useMemo(() => {
    return determinePediatricRespiratoryThreat(
      selectedPatient.ageMonths,
      currentRespiratoryRate,
      currentChestInDrawing,
      currentStridor
    );
  }, [selectedPatient, currentRespiratoryRate, currentChestInDrawing, currentStridor]);

  const liveMaternalResult = useMemo(() => {
    return determineMaternalAnaemiaThreat(currentHb);
  }, [currentHb]);

  // Combined clinical assessment indicators
  const assessmentResult = useMemo(() => {
    if (selectedPatient.gender === "female") {
      return {
        severity: liveMaternalResult.severity,
        colorHex: liveMaternalResult.colorHex,
        title: liveMaternalResult.resultTitle[langKey] || liveMaternalResult.resultTitle["en"],
        checklist: liveMaternalResult.checklist[langKey] || liveMaternalResult.checklist["en"],
        checklistEnglish: liveMaternalResult.checklist["en"],
        rationale: liveMaternalResult.rationale[langKey] || liveMaternalResult.rationale["en"]
      };
    } else {
      return {
        severity: livePediatricResult.severity,
        colorHex: livePediatricResult.colorHex,
        title: livePediatricResult.resultTitle[langKey] || livePediatricResult.resultTitle["en"],
        checklist: livePediatricResult.checklist[langKey] || livePediatricResult.checklist["en"],
        checklistEnglish: livePediatricResult.checklist["en"],
        rationale: livePediatricResult.rationale[langKey] || livePediatricResult.rationale["en"]
      };
    }
  }, [selectedPatient, liveMaternalResult, livePediatricResult, langKey]);

  // Longitudinal trajectory contrast summaries
  const clinicalComparisonInsight = useMemo(() => {
    if (!latestHistoricalVisit) {
      return translations.baselineAlertNoHistory;
    }

    const baselineDate = latestHistoricalVisit.timestamp;

    if (selectedPatient.gender === "female") {
      const hbDelta = currentHb - (latestHistoricalVisit.hemoglobin ?? 0);
      const isBetter = hbDelta > 0;
      const isSevere = currentHb < 7.0;
      
      if (isSevere) {
        return translations.maternalAnemiaAlertTxt + ` (Hb Δ: ${hbDelta.toFixed(1)} g/dL since ${baselineDate})`;
      } else if (hbDelta === 0) {
        return translations.maternalHbStableTxt;
      } else if (isBetter) {
        return translations.maternalHbImprovedTxt + ` (+${hbDelta.toFixed(1)} g/dL)`;
      } else {
        return translations.maternalHbDegradeTxt + ` (-${Math.abs(hbDelta).toFixed(1)} g/dL)`;
      }
    } else {
      const rrDelta = currentRespiratoryRate - (latestHistoricalVisit.respiratoryRate ?? 38);
      const wasUrgent = latestHistoricalVisit.triageSeverity === "URGENT";
      const isNowUrgent = assessmentResult.severity === "URGENT";

      if (isNowUrgent) {
        return translations.pedRespiratoryUrgentTxt;
      } else if (wasUrgent && !isNowUrgent) {
        return translations.pedRespiratoryResolvedTxt + ` (RR: ${currentRespiratoryRate}/min)`;
      } else {
        return translations.pedRespiratorySpeedTxt + ` (Δ: ${rrDelta > 0 ? "+" : ""}${rrDelta}/min)`;
      }
    }
  }, [selectedPatient, currentHb, currentRespiratoryRate, assessmentResult, latestHistoricalVisit, translations, langKey]);

  // Record Form Save handler - updates the persistent registry
  const handleSaveVisitDetails = async () => {
    const timestampFormatted = new Date().toISOString().split("T")[0];
    
    const newRecord: ClinicalRecord = {
      id: `VIS-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: timestampFormatted,
      ageMonths: selectedPatient.ageMonths,
      gender: selectedPatient.gender,
      hemoglobin: selectedPatient.gender === "female" ? currentHb : undefined,
      respiratoryRate: selectedPatient.gender === "male" ? currentRespiratoryRate : undefined,
      chestInDrawing: selectedPatient.gender === "male" ? currentChestInDrawing : undefined,
      stridor: selectedPatient.gender === "male" ? currentStridor : undefined,
      feverDays: currentFeverDays,
      triageSeverity: assessmentResult.severity,
      statusText: selectedPatient.gender === "female" 
        ? `${assessmentResult.title}. Hb: ${currentHb.toFixed(1)} g/dL. ${currentVisitNotes}`
        : `${assessmentResult.title}. RR: ${currentRespiratoryRate}/min. ${currentVisitNotes}`
    };

    const updatedRegistry = patientRegistry.map(p => {
      if (p.id === selectedPatient.id) {
        return {
          ...p,
          history: [...p.history, newRecord]
        };
      }
      return p;
    });

    setPatientRegistry(updatedRegistry);
    savePatientsToDatabase(updatedRegistry);
    pushGitCommit(
      "ADD_VISIT",
      `feat: add clinical checkup for ${selectedPatient.name} (${selectedPatient.id})`,
      `Severity: ${assessmentResult.severity}. Status text: "${newRecord.statusText}"`,
      updatedRegistry
    );

    setSyncFlash(translations.syncSuccessNotification);

    if (!isOnline) {
      setSyncStatus("pending");
      setCurrentVisitNotes("");
      setTimeout(() => {
        setSyncFlash(null);
      }, 5000);
      return;
    }

    setSyncStatus("pending");
    setTimeout(async () => {
      try {
        setSyncStatus("syncing");
        const res = await fetch("/api/sync-records", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ records: [newRecord] })
        });
        const d = await res.json();
        if (d.success) {
          setSyncStatus("synced");
        } else {
          setSyncStatus("pending");
        }
      } catch (err) {
        console.warn("Background sync offline wait status", err);
        setSyncStatus("pending");
      }
    }, 1200);

    setCurrentVisitNotes("");
    setTimeout(() => {
      setSyncFlash(null);
    }, 5000);
  };

  // Manual Trigger to sync pending local database records when online is activated
  const handleManualSyncAll = () => {
    if (!isOnline) {
      setSyncFlash("Cannot sync: device is currently in offline-simulated mode.");
      setTimeout(() => setSyncFlash(null), 3000);
      return;
    }
    setSyncStatus("syncing");
    setTimeout(() => {
      setSyncStatus("synced");
      setSyncFlash("SUCCESS: Offline diagnostic registry queue fully synchronized to National Swasthya Cloud!");
      setTimeout(() => setSyncFlash(null), 5000);
    }, 1500);
  };

  // Action: Update a specific immunization record
  const handleUpdateImmunization = (vaccineId: string, status: "PENDING" | "ADMINISTERED" | "OVERDUE", administeredDate?: string, notes?: string) => {
    const updatedRegistry = patientRegistry.map(p => {
      if (p.id === selectedPatient.id) {
        const currentImms = p.immunizations || getDefaultImmunizations();
        const updatedImms = currentImms.map(imm => {
          if (imm.id === vaccineId) {
            return {
              ...imm,
              status,
              administeredDate: status === "ADMINISTERED" ? (administeredDate || new Date().toISOString().split('T')[0]) : undefined,
              notes: notes !== undefined ? notes : imm.notes
            };
          }
          return imm;
        });
        return {
          ...p,
          immunizations: updatedImms
        };
      }
      return p;
    });
    setPatientRegistry(updatedRegistry);
    savePatientsToDatabase(updatedRegistry);
    const targetImm = (selectedPatient.immunizations || getDefaultImmunizations()).find(i => i.id === vaccineId);
    pushGitCommit(
      "UPDATE_VACCINE",
      `update: change ${selectedPatient.name}'s ${targetImm?.vaccine || "vaccine"} status to ${status}`,
      `Updated vaccine ID: ${vaccineId}. Status: ${status}. Date: ${administeredDate || "N/A"}. Notes: ${notes || "None"}.`,
      updatedRegistry
    );
    setSyncFlash("Immunization status updated successfully!");
    setTimeout(() => setSyncFlash(null), 3000);
  };

  // Action: Add a custom immunization record
  const handleAddCustomImmunization = (vaccineName: string, dueDate: string, status: "PENDING" | "ADMINISTERED" | "OVERDUE", administeredDate?: string, notes?: string) => {
    const updatedRegistry = patientRegistry.map(p => {
      if (p.id === selectedPatient.id) {
        const currentImms = p.immunizations || getDefaultImmunizations();
        const newImm: ImmunizationRecord = {
          id: `IMM-CUST-${Date.now()}`,
          vaccine: vaccineName,
          dueDate,
          status,
          administeredDate: status === "ADMINISTERED" ? (administeredDate || new Date().toISOString().split('T')[0]) : undefined,
          notes
        };
        return {
          ...p,
          immunizations: [...currentImms, newImm]
        };
      }
      return p;
    });
    setPatientRegistry(updatedRegistry);
    savePatientsToDatabase(updatedRegistry);
    pushGitCommit(
      "ADD_VACCINE",
      `feat: add custom immunization ${vaccineName} for ${selectedPatient.name}`,
      `Added custom vaccine: ${vaccineName}, due: ${dueDate}, status: ${status}.`,
      updatedRegistry
    );
    setSyncFlash(`Added custom immunization ${vaccineName}!`);
    setTimeout(() => setSyncFlash(null), 3000);
  };

  // Action: Delete a specific immunization record
  const handleDeleteImmunization = (vaccineId: string) => {
    let deletedVaccineName = "";
    const updatedRegistry = patientRegistry.map(p => {
      if (p.id === selectedPatient.id) {
        const currentImms = p.immunizations || getDefaultImmunizations();
        const targetImm = currentImms.find(imm => imm.id === vaccineId);
        if (targetImm) deletedVaccineName = targetImm.vaccine;
        const updatedImms = currentImms.filter(imm => imm.id !== vaccineId);
        return {
          ...p,
          immunizations: updatedImms
        };
      }
      return p;
    });
    setPatientRegistry(updatedRegistry);
    savePatientsToDatabase(updatedRegistry);
    pushGitCommit(
      "DELETE_VACCINE",
      `delete: remove immunization ${deletedVaccineName || "vaccine"} for ${selectedPatient.name}`,
      `Deleted immunization ID: ${vaccineId}.`,
      updatedRegistry
    );
    setSyncFlash("Immunization record removed.");
    setTimeout(() => setSyncFlash(null), 3000);
  };

  // Determine if a vaccine is upcoming (due within 1 week)
  const isUpcomingVaccine = (imm: ImmunizationRecord, ageMonths: number): boolean => {
    if (imm.status === "ADMINISTERED") return false;

    // 1. If it's a calendar date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(imm.dueDate)) {
      const dueTime = new Date(imm.dueDate).getTime();
      const currTime = new Date("2026-06-28").getTime(); // System current local date
      const diffDays = (dueTime - currTime) / (1000 * 60 * 60 * 24);
      // Within 1 week (0 to 7 days)
      return diffDays >= 0 && diffDays <= 7;
    }

    // 2. Relative due dates mapped to child's age in months
    const dueLower = imm.dueDate.toLowerCase().trim();
    
    // Age in weeks for finer comparison
    const ageWeeks = ageMonths * 4.34524;

    if (dueLower === "birth") {
      return false;
    }

    if (dueLower.includes("6 week")) {
      const diff = 6 - ageWeeks;
      return diff >= 0 && diff <= 1.5;
    }

    if (dueLower.includes("10 week")) {
      const diff = 10 - ageWeeks;
      return diff >= 0 && diff <= 1.5;
    }

    if (dueLower.includes("14 week")) {
      const diff = 14 - ageWeeks;
      return diff >= 0 && diff <= 1.5;
    }

    if (dueLower.includes("9 month")) {
      const diff = 9 - ageMonths;
      return diff >= 0 && diff <= 0.25;
    }

    if (dueLower.includes("16-24 month") || dueLower.includes("16 month")) {
      const diff = 16 - ageMonths;
      return diff >= 0 && diff <= 0.25;
    }

    if (dueLower.includes("week")) {
      const match = dueLower.match(/(\d+)/);
      if (match) {
        const weeks = parseInt(match[1], 10);
        const diff = weeks - ageWeeks;
        return diff >= 0 && diff <= 1.5;
      }
    } else if (dueLower.includes("month")) {
      const match = dueLower.match(/(\d+)/);
      if (match) {
        const months = parseInt(match[1], 10);
        const diff = months - ageMonths;
        return diff >= 0 && diff <= 0.25;
      }
    }

    return false;
  };

  // Generate outreach templates for ASHA workers
  const getOutreachMessage = (imm: ImmunizationRecord, patient: Patient, lang: string): string => {
    const parentName = patient.spouseOrGuardian || (lang === "hi" ? "अभिभावक" : lang === "ta" ? "பெற்றோர்" : lang === "bn" ? "অভিভাবক" : "Parent/Guardian");
    const childName = patient.name;
    const vaccine = imm.vaccine;
    const due = imm.dueDate;

    if (lang === "hi") {
      return `नमस्ते ${parentName}, आशा कार्यकर्ता का संदेश: आपके बच्चे ${childName} का ${vaccine} टीका (${due}) जल्द ही देय है। कृपया टीकाकरण के लिए समय पर स्वास्थ्य केंद्र पर आएं।`;
    } else if (lang === "ta") {
      return `வணக்கம் ${parentName}, ஆஷா பணியாளர் செய்தி: உங்கள் குழந்தை ${childName}-க்கு ${vaccine} தடுப்பூசி (${due}) விரைவில் தேவைப்படுகிறது. தடுப்பூசிக்கு அருகிலுள்ள சுகாதார நிலையத்திற்கு வரவும்.`;
    } else if (lang === "bn") {
      return `নমস্কার ${parentName}, আশা কর্মীর বার্তা: আপনার শিশু ${childName}-এর ${vaccine} টিকা (${due}) শীঘ্রই প্রদেয়। অনুগ্রহ করে টিকাদানের জন্য সময়মতো স্বাস্থ্য কেন্দ্রে আসুন।`;
    } else {
      return `Hello ${parentName}, ASHA outreach message: Your child ${childName}'s ${vaccine} vaccine (${due}) is due soon. Please visit the health center for timely vaccination.`;
    }
  };

  // Action: Register and insert a new patient into local database
  const handleRegisterPatientSubmit = (e?: { preventDefault: () => void }) => {
    if (e) {
      e.preventDefault();
    }
    
    // Final review stage validation check
    if (!regName.trim()) {
      alert("Please enter a valid Patient Name.");
      setRegStep(1);
      return;
    }
    if (!regAge || isNaN(Number(regAge)) || Number(regAge) <= 0) {
      alert("Please enter a valid positive age.");
      setRegStep(2);
      return;
    }
    if (!regSpouseOrGuardian.trim()) {
      alert("Please specify a Spouse or Guardian guardian.");
      setRegStep(2);
      return;
    }
    if (!regPrimaryIssue.trim()) {
      alert("Please write the Primary clinical intake complaint.");
      setRegStep(3);
      return;
    }

    const calculatedMonths = regGender === "female" ? Number(regAge) * 12 : Number(regAge);
    const mockId = `PAT-IND-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const initialRecord: ClinicalRecord = {
      id: `VIS-INIT-${Date.now()}`,
      timestamp: new Date().toISOString().substring(0, 10),
      ageMonths: calculatedMonths,
      gender: regGender,
      triageSeverity: "LOW",
      statusText: `Registered Admission: ${regPrimaryIssue}. No severe red flags recorded during intake.`
    };

    if (regGender === "female") {
      initialRecord.hemoglobin = 11.5;
    } else {
      initialRecord.respiratoryRate = 36;
      initialRecord.chestInDrawing = false;
      initialRecord.stridor = false;
    }

    const newPatient: Patient = {
      id: mockId,
      name: regName.trim(),
      ageMonths: calculatedMonths,
      gender: regGender,
      village: regVillage,
      spouseOrGuardian: regSpouseOrGuardian.trim(),
      phone: regPhone.trim() || "N/A",
      email: regEmail.trim() || "N/A",
      history: [initialRecord],
      immunizations: regGender !== "female" ? getDefaultImmunizations() : undefined
    };

    const updatedRegistry = [newPatient, ...patientRegistry];
    setPatientRegistry(updatedRegistry);
    savePatientsToDatabase(updatedRegistry);
    pushGitCommit(
      "CREATE_PATIENT",
      `feat: register patient ${regName.trim()} (${mockId})`,
      `Registered ${regName} in ${regVillage}. Spouse/Guardian: ${regSpouseOrGuardian}. Phone: ${regPhone.trim() || "N/A"}. Email: ${regEmail.trim() || "N/A"}.`,
      updatedRegistry
    );
    setSelectedPatientId(mockId);

    // Dynamic sync dispatch based on local connectivity state
    if (isOnline) {
      setSyncStatus("pending");
      setTimeout(() => {
        setSyncStatus("syncing");
        setTimeout(() => {
          setSyncStatus("synced");
        }, 1000);
      }, 500);
    } else {
      setSyncStatus("pending");
    }

    // Success flash and reset admission form fields
    setSyncFlash(`Registered ${regName} safely inside offline patient registry!`);
    setIsRegistering(false);
    setRegStep(1);
    setRegName("");
    setRegGender("female");
    setRegAge("");
    setRegSpouseOrGuardian("");
    setRegPrimaryIssue("");
    setRegPhone("");
    setRegEmail("");

    setTimeout(() => {
      setSyncFlash(null);
    }, 5000);
  };

  // Dispatch Emergency PHC Ambulance request
  const handleAmbulanceDispatch = () => {
    const shortCode = `PHC-EMG-${selectedPatient.id}-${Math.floor(100 + Math.random() * 900)}`;
    setAmbulanceAlertDetails(translations.referralNotification + shortCode);
    setTimeout(() => {
      setAmbulanceAlertDetails(null);
    }, 7000);
  };

  // Phonetic regional instruction guides
  const triggerPhoneticAudio = (key: string) => {
    const playLang = LANGUAGES[langKey] ? langKey : "en";
    const guideText = PHONETIC_GUIDES[playLang]?.[key] || PHONETIC_GUIDES["en"][key];
    setActivePhoneticAudio(guideText);
    setVoicePlaying(true);
  };

  const stopPhoneticAudio = () => {
    setVoicePlaying(false);
    setActivePhoneticAudio(null);
  };

  // Consult AI Doctor secure API query handler
  const handleConsultAiDoctorInquiry = async (customQuery?: string) => {
    const queryToSend = customQuery || aiQuery;
    if (!queryToSend.trim()) return;

    setAiLoading(true);
    setAiResponse(null);

    // If simulated offline: process instant local read-only lookup logic (WHO/IMCI standards)
    if (!isOnline) {
      setTimeout(() => {
        const isMaternalPatient = selectedPatient.gender === "female";
        let localOfflineText = "";

        if (isMaternalPatient) {
          localOfflineText = `🚨 [OFFLINE MODE ACTIVE - LOCAL COLD-STORAGE CLINICAL ARCHIVE]
WHO IMCI Maternal Antenatal Diagnostic Standard v2.4 (Read-Only)

Your offline query: "${queryToSend}"

Clinical Review Summary for prenatal patient "${selectedPatient.name}":
- Pre-loaded Local Protocol: GESTATIONAL ANEMIA ASSESSMENT & THERAPEUTICS
---------------------------------------------------------------
1. Severe Anemia Classification Criteria (Hemoglobin < 7.0 g/dL):
   * INTERVENTION: Direct immediate referral to CHC (Community Health Center) / PHC Zone.
   * THERAPEUTICS: Prescribe double daily therapeutic IFA (Iron & Folic Acid) oral doses.
   * COUNSELING: Counsel family on high-density iron rich regional feeding (pulses, local greens).
   * MONITORING: Check back fetal movement counts within 48 hours.

2. Moderate Anemia Classification Criteria (Hemoglobin 7.0 - 10.9 g/dL):
   * INTERVENTION: Prescribe single therapeutic daily IFA supplement for 3-6 months.
   * NUTRITION: Validate de-worming status. Administer first / second dose Albendazole (400mg) safely.
   * FOLLOW-UP: Perform physical follow-up and hemoglobin re-screening in 14 days.

3. Mild or Standard Antenatal Prophylactic Care (Hemoglobin >= 11 g/dL):
   * INTERVENTION: Provide standard preventative single daily IFA dose. Verify TT (Tetanus Toxoid) vaccine status.
   * RED FLAGS: Educate mother on severe symptoms (ruptured membranes, fits, high fever).`;
        } else {
          localOfflineText = `🚨 [OFFLINE MODE ACTIVE - LOCAL COLD-STORAGE CLINICAL ARCHIVE]
WHO IMCI Pediatric Pneumonia Respiratory Standard v2.4 (Read-Only)

Your offline query: "${queryToSend}"

Clinical Review Summary for infant/child "${selectedPatient.name}" (${selectedPatient.ageMonths} months old):
- Pre-loaded Local Protocol: pediatric cough & breathing assessment (IMCI rules)
---------------------------------------------------------------
1. Severe Pneumonia / Very Severe Disease (Presence of chest retractions, stridor, or very high RR):
   * INTERVENTION: Urgently arrange primary health vehicle for immediate dispatch transfer to nearest CHC.
   * THERAPEUTICS: Administer first initial dose of Oral Amoxicillin (25mg/kg dispersible) directly under observation.
   * ENVIRONMENT: Keep child fully warm (avoid neonatal hypothermia). Airway clearing if congested.

2. Pneumonia - Non-Severe (Fast breathing present: RR >= 50/min for <12 months, RR >= 40/min for >=12 months):
   * THERAPEUTICS: Issue Oral Amoxicillin syrup or dispersible tablets (twice daily for 5 continuous days).
   * HOME CARE: Moisten respiratory tract using traditional home remedies (ginger water, warm honey).
   * RED FLAGS: Inform parent to return instantly if child cannot feed, has convulsions, or breathes even faster.
   * RE-EVALUATION: Mandatory clinical follow-up check in 3 days.

3. Simple Cough & Common Cold (No fast breathing, retractions, or stridor):
   * RECOMMENDATION: DO NOT administer antibiotics (essential to prevent regional drug resistance).
   * GENERAL: Hydrate frequently. Reassure parents, support feeding, and monitor daily chest expansion.`;
        }

        setAiResponse(localOfflineText);
        setAiLoading(false);
      }, 500);
      return;
    }

    try {
      const response = await fetch("/api/consult-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientData: {
            name: selectedPatient.name,
            ageMonths: selectedPatient.ageMonths,
            gender: selectedPatient.gender,
            village: selectedPatient.village,
            spouseOrGuardian: selectedPatient.spouseOrGuardian
          },
          history: selectedPatient.history,
          currentVitals: {
            hemoglobin: selectedPatient.gender === "female" ? currentHb : undefined,
            respiratoryRate: selectedPatient.gender === "male" ? currentRespiratoryRate : undefined,
            chestInDrawing: selectedPatient.gender === "male" ? currentChestInDrawing : undefined,
            stridor: selectedPatient.gender === "male" ? currentStridor : undefined,
            feverDays: currentFeverDays,
            notes: currentVisitNotes
          },
          query: queryToSend,
          language: LANGUAGES[langKey]?.name || "English"
        })
      });

      const data = await response.json();
      if (data.success) {
        setAiResponse(data.analysis);
      } else {
        setAiResponse(`${translations.aiErrorTxt}\n\nTechnical Error: ${data.error || "Unknown response structure"}`);
      }
    } catch {
      setAiResponse(translations.aiErrorTxt);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSimulateVoiceInput = () => {
    setVoiceSimulatorActive(true);
    setTimeout(() => {
      setAiQuery(translations.voicePromptSimulationText);
      setVoiceSimulatorActive(false);
    }, 1500);
  };

  const handlePrintVisitSummary = () => {
    // Generate simplified HTML markup for high-contrast printable view
    const printFrame = document.createElement("iframe");
    printFrame.style.position = "absolute";
    printFrame.style.top = "-9999px";
    printFrame.style.left = "-9999px";
    document.body.appendChild(printFrame);

    const doc = printFrame.contentDocument || printFrame.contentWindow?.document;
    if (!doc) return;

    const formattedDate = new Date().toLocaleString();
    const isMaternal = selectedPatient.gender === "female";
    const statusCategory = isMaternal ? "Maternal Prenatal" : "Child / Pediatric";
    const ageDisplay = isMaternal 
      ? `${Math.floor(selectedPatient.ageMonths / 12)} years` 
      : `${selectedPatient.ageMonths} months`;

    const physicalCheckText = isMaternal 
      ? `• Measured Hemoglobin Levels: ${currentHb.toFixed(1)} g/dL\n• Fever Assessment: ${currentFeverDays === 0 ? "No fever" : `${currentFeverDays} Days`}`
      : `• Measured Respiratory Rate: ${currentRespiratoryRate} / min\n• Chest In-Drawing Retraction: ${currentChestInDrawing ? "YES (Lower Rib Retraction present)" : "NO"}\n• Stridor Sound in Calm Child: ${currentStridor ? "YES (Harsh Inspending sound present)" : "NO"}\n• Fever Assessment: ${currentFeverDays === 0 ? "No fever" : `${currentFeverDays} Days`}`;

    const diagnosticSummary = isMaternal
      ? determineMaternalAnaemiaThreat(currentHb)
      : determinePediatricRespiratoryThreat(selectedPatient.ageMonths, currentRespiratoryRate, currentChestInDrawing, currentStridor);

    const checkLines = (diagnosticSummary.checklist?.[selectedLanguage] || diagnosticSummary.checklist?.["en"] || [])
      .map((item: string) => `  - ${item}`)
      .join("\n");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Visit Summary - ${selectedPatient.name}</title>
        <style>
          @media print {
            body { background: #fff; color: #000; }
          }
          body {
            font-family: Arial, sans-serif;
            padding: 30px;
            color: #000;
            background-color: #fff;
            line-height: 1.5;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            border-bottom: 3px double #000;
            padding-bottom: 12px;
            margin-bottom: 20px;
          }
          .title {
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 0;
          }
          .subtitle {
            font-size: 11px;
            margin: 4px 0 0 0;
            font-weight: bold;
          }
          .section {
            margin-bottom: 20px;
            border: 1px solid #000;
            padding: 12px;
          }
          .section-title {
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            text-decoration: underline;
            margin-top: 0;
            margin-bottom: 10px;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            font-size: 11px;
          }
          .field {
            font-weight: bold;
          }
          .raw-text {
            font-size: 11px;
            white-space: pre-wrap;
            margin-top: 5px;
          }
          .stamps-signatures {
            margin-top: 40px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            font-size: 10px;
          }
          .signature-line {
            border-top: 1px dashed #000;
            margin-top: 35px;
            text-align: center;
            padding-top: 4px;
            font-weight: bold;
          }
          .alert-badge {
            background-color: #000;
            color: #fff;
            padding: 3px 6px;
            display: inline-block;
            font-weight: bold;
            font-size: 10px;
            text-transform: uppercase;
          }
          .footer-note {
            text-align: center;
            font-size: 8px;
            margin-top: 30px;
            border-top: 1px double #000;
            padding-top: 8px;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">OFFICIAL PATIENT VISIT SUMMARY</div>
          <div class="subtitle">ASHA HEALTHCARE SWASTHYA REPORTING ENGINE</div>
          <div style="font-size: 9px; margin-top: 4px;">Printed on: ${formattedDate} | Status: Persisted Client Record</div>
        </div>

        <div class="section">
          <div class="section-title">1. Patient Demographic Profile</div>
          <div class="grid">
            <div><span class="field">ID NO:</span> ${selectedPatient.id}</div>
            <div><span class="field">FULL NAME:</span> ${selectedPatient.name}</div>
            <div><span class="field">GENDER/GRP:</span> ${statusCategory}</div>
            <div><span class="field">PATIENT AGE:</span> ${ageDisplay}</div>
            <div><span class="field">VILLAGE SECTOR:</span> ${selectedPatient.village}</div>
            <div><span class="field">SPOUSE/GUARDIAN:</span> ${selectedPatient.spouseOrGuardian}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">2. Intake Clinical Vitals Checklist</div>
          <div class="raw-text" style="font-weight: bold;">
${physicalCheckText}
          </div>
          <div style="font-size: 11px; margin-top: 6px;">
            <span class="field">Intake Complaint & Notes:</span> "${currentVisitNotes || "No additional workflow text notes submitted."}"
          </div>
        </div>

        <div class="section">
          <div class="section-title">3. CDSS Diagnostic Assessment Summary</div>
          <div style="margin-bottom: 8px;">
            <span class="field">TRIAGE OUTCOME:</span>
            <span class="alert-badge">${diagnosticSummary.severity}</span>
          </div>
          <div style="font-size: 11px; font-weight: bold; margin-bottom: 6px;">
            Classification: ${diagnosticSummary.resultTitle?.[selectedLanguage] || diagnosticSummary.resultTitle || ""}
          </div>
          <div style="font-size: 10px; font-style: italic; margin-bottom: 8px;">
            Rationale: ${diagnosticSummary.rationale?.[selectedLanguage] || diagnosticSummary.rationale || ""}
          </div>
          <div style="font-size: 10px;">
            <span class="field" style="text-decoration: underline;">Triage Protocol Checklist Action Plan:</span>
            <div class="raw-text" style="font-family: inherit; margin-top: 4px;">${checkLines}</div>
          </div>
        </div>

        ${aiResponse ? `
        <div class="section">
          <div class="section-title">4. Active Expert AI Assistance Log</div>
          <div class="raw-text" style="font-size: 10px; line-height: 1.4;">
${aiResponse}
          </div>
        </div>
        ` : ""}

        <div class="stamps-signatures">
          <div>
            <div class="signature-line">ASHA Field Worker Signature</div>
            <div style="text-align: center; font-size: 8px; margin-top: 4px;">ID: ${selectedLanguage === "hi" ? "आशा कार्यकर्ता" : "ACTIVE WORKER REGISTERED"}</div>
          </div>
          <div>
            <div class="signature-line">PHC Medical Officer Review</div>
            <div style="text-align: center; font-size: 8px; margin-top: 4px;">Stamp & Verification Sign-Off</div>
          </div>
        </div>

        <div class="footer-note">
          This report is formatted directly in ultra-high-contrast text style suitable for direct printing or local saving as digital PDF representation on paper matrix folders.
        </div>
      </body>
      </html>
    `;

    doc.open();
    doc.write(htmlContent);
    doc.close();

    // Trigger printing once content is fully written
    setTimeout(() => {
      printFrame.contentWindow?.focus();
      printFrame.contentWindow?.print();
      // Remove iframe safely after print action
      setTimeout(() => {
        document.body.removeChild(printFrame);
      }, 1000);
    }, 500);
  };

  const handleKbChatSubmit = async (e?: { preventDefault: () => void }) => {
    if (e) e.preventDefault();
    const queryText = kbQuery.trim();
    if (!queryText) return;

    // Add user message
    const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: "user" as const, text: queryText, timestamp: timestampStr };
    setKbChatHistory(prev => [...prev, userMsg]);
    setKbQuery("");
    setKbLoading(true);

    if (isOnline) {
      try {
        const res = await fetch("/api/kb-query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: queryText,
            history: kbChatHistory.map(msg => ({
              role: msg.sender === "user" ? "user" : "model",
              text: msg.text
            })),
            language: LANGUAGES[selectedLanguage]?.name || "English"
          })
        });
        const data = await res.json();
        if (data.success) {
          setKbChatHistory(prev => [...prev, {
            sender: "ai" as const,
            text: data.answer,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
          setKbLoading(false);
          return;
        }
      } catch (err) {
        console.warn("KB online query failed, falling back to local database engine", err);
      }
    }

    // Offline / Fallback local search matches inside diagnostic guidelines
    setTimeout(() => {
      const q = queryText.toLowerCase();
      let responseText = "";

      if (q.includes("diarrhea") || q.includes("hydration") || q.includes("plan") || q.includes("दस्त")) {
        responseText = `[OFFLINE GUIDELINE INTERVIEW MATCH]
*WHO DIARRHEAL HYDRATION PLANS SUMMARY:*
• Hydration Plan A (No Dehydration): Provide home fluids (ORS, clean water, rice water), encourage feeding, review warning tags (sunken eyes, drinking poorly).
• Hydration Plan B (Some Dehydration): Treat with ORS at the clinic (75 ml/kg over 4 hours). Re-evaluate periodically. If improved, transition to Plan A.
• Hydration Plan C (Severe Dehydration): Urgent IV Fluids needed! Administer 100 ml/kg Ringer’s Lactate or Normal Saline immediately. Refer urgently to nearest Community Health Center.`;
      } else if (q.includes("pneumonia") || q.includes("cough") || q.includes("breathing") || q.includes("respiratory") || q.includes("सांस")) {
        responseText = `[OFFLINE GUIDELINE INTERVIEW MATCH]
*WHO-IMCI PEDIATRIC RESPIRATORY THRESHOLDS:*
• Infants aged 2 to 11 months: Fast breathing is defined as a Respiratory Rate (RR) of 50 breaths per minute or more.
• Children aged 12 to 59 months: Fast breathing is defined as a Respiratory Rate (RR) of 40 breaths per minute or more.
• Urgent Warning Signs: Chest in-drawing (retraction) and stridor in a calm child require immediate referral for injectable antibiotics and oxygen.`;
      } else if (q.includes("anemia") || q.includes("hb") || q.includes("hemoglobin") || q.includes("iron") || q.includes("खून") || q.includes("एनीमिया")) {
        responseText = `[OFFLINE GUIDELINE INTERVIEW MATCH]
*PRENATAL GESTATIONAL MATERNAL ANAEMIA CRITERIA:*
• Normal Status (Hb >= 11.0 g/dL): Continue routine support with daily Iron-Folic Acid (IFA) tablets (1 tablet containing 60mg iron and 0.5mg folic acid for 180 days).
• Moderate Status (Hb 7.0 - 10.9 g/dL): Administer therapeutic IFA dosing (2 tablets daily). Require follow-up testing in 30 days.
• Severe Status (Hb < 7.0 g/dL): Critical hazard alert! Refer immediately to CHC or district hospital for parenteral iron sucrose or blood transfusion coordinates.`;
      } else if (q.includes("fever") || q.includes("malaria") || q.includes("temperature") || q.includes("बुखार")) {
        responseText = `[OFFLINE GUIDELINE INTERVIEW MATCH]
*IMCI FEVER TRIAGING DIRECTIVES:*
• Malaria endemic high-risk area: Perform a Rapid Diagnostic Test (RDT) for malaria immediately.
• Severe Febrile Disease: Any alert flag (stiff neck, extreme lethargy, inability to drink/breastfeed) requires urgent Administration of pre-referral Artesunate/Quinine and immediate transfer.
• Common Fever: If fever is present for less than 7 days without other severe signs, manage with paracetamol syrup and schedule routine follow-up daily visits.`;
      } else if (q.includes("warm") || q.includes("neonatal") || q.includes("newborn") || q.includes("delivery") || q.includes("प्रसव")) {
        responseText = `[OFFLINE GUIDELINE INTERVIEW MATCH]
*NEONATAL CARE & THE WARM CHAIN SYSTEM:*
• Immediate steps after delivery: Dry the newborn thoroughly with a clean, dry cloth.
• Skin-to-skin touch: Place the baby on the mother's chest (Kangaroo Mother Care) to prevent hypothermia.
• Delay Bathing: Do not bathe the infant in the first 24 hours of birth. Breastfeeding should begin within the first hour of delivery.`;
      } else {
        responseText = `[OFFLINE CLINICAL MANUAL ASSIST (OFFLINE ENGINE)]
Thank you for your question. National Swasthya CDSS is currently operating in local offline database mode.
Based on General WHO & Ministry Field Instructions:
1. Ensure patient parameters match age-appropriate thresholds.
2. In all physical checks, carefully inspect for severe danger signs: inability to drink/feed, lethargy, vomiting everything, convulsing, chest-indrawing, or severe pallor.
3. If any severe warning tags exist, do not delay: stabilize the patient with regional warm measures, start hydration, and arrange direct ambulance dispatch to the nearest PHC/CHC immediately.`;
      }

      setKbChatHistory(prev => [...prev, {
        sender: "ai" as const,
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setKbLoading(false);
    }, 850);
  };

  // Render function for the Offline sandbox calculator
  const renderSandboxCalculator = () => {
    const calculatedTriage = calcCategory === "maternal"
      ? determineMaternalAnaemiaThreat(calcHb)
      : determinePediatricRespiratoryThreat(calcAge, calcRR, calcChest, calcStridor);

    return (
      <div className="space-y-5">
        <div className="flex gap-2 bg-[#FAF7F0] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setCalcCategory("pediatric")}
            className={`flex-1 py-2 text-center text-xs font-bold rounded-l-lg transition-all cursor-pointer ${
              calcCategory === "pediatric" ? "bg-[#0C2340] text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            👶 Pediatric Child
          </button>
          <button
            type="button"
            onClick={() => setCalcCategory("maternal")}
            className={`flex-1 py-2 text-center text-xs font-bold rounded-r-lg transition-all cursor-pointer ${
              calcCategory === "maternal" ? "bg-[#0C2340] text-white" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🤰 Maternal Prenatal
          </button>
        </div>

        {calcCategory === "pediatric" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Age ({calcAge} Months)</label>
                <input
                  type="range"
                  min={2}
                  max={59}
                  value={calcAge}
                  onChange={(e) => setCalcAge(Number(e.target.value))}
                  className="w-full accent-[#0C2340]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Breaths Rate ({calcRR} / min)</label>
                <input
                  type="number"
                  min={10}
                  max={80}
                  value={calcRR}
                  onChange={(e) => setCalcRR(Number(e.target.value))}
                  className="w-full p-2 text-xs rounded-xl border border-[#DCD6C7] bg-[#FAF8F5] font-bold text-[#0C2340]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCalcChest(!calcChest)}
                className={`py-3 px-3 rounded-2xl border text-left flex justify-between items-center cursor-pointer transition-all ${
                  calcChest ? "bg-[#D9531E]/12 border-[#D9531E]" : "bg-[#FAF8F5] hover:bg-slate-50 border-[#E5DFD0]"
                }`}
              >
                <div>
                  <span className="text-xs font-bold block">Chest Retraction</span>
                  <span className="text-[8.5px] text-slate-500 block leading-tight">Lower ribs sinking</span>
                </div>
                <span className={`text-[10px] uppercase font-bold p-1 rounded shrink-0 ${calcChest ? "text-[#D9531E]" : "text-slate-500"}`}>
                  {calcChest ? "YES" : "NO"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCalcStridor(!calcStridor)}
                className={`py-3 px-3 rounded-2xl border text-left flex justify-between items-center cursor-pointer transition-all ${
                  calcStridor ? "bg-[#D9531E]/12 border-[#D9531E]" : "bg-[#FAF8F5] hover:bg-slate-50 border-[#E5DFD0]"
                }`}
              >
                <div>
                  <span className="text-xs font-bold block">Stridor Sound</span>
                  <span className="text-[8.5px] text-slate-500 block leading-tight">Harsh noise when calm</span>
                </div>
                <span className={`text-[10px] uppercase font-bold p-1 rounded shrink-0 ${calcStridor ? "text-[#D9531E]" : "text-slate-500"}`}>
                  {calcStridor ? "YES" : "NO"}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Hemoglobin Level (Hb)</label>
                <span className="text-xs font-black text-[#0C2340] font-mono">{calcHb.toFixed(1)} g/dL</span>
              </div>
              <input
                type="range"
                min={4.0}
                max={15.0}
                step={0.1}
                value={calcHb}
                onChange={(e) => setCalcHb(Number(e.target.value))}
                className="w-full accent-[#0C2340] h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Dynamic Calc result screen */}
        <div
          style={{ borderColor: calculatedTriage.colorHex }}
          className="p-4 rounded-2xl bg-[#FAF8F5] border-l-[6px] space-y-2.5 select-none border border-slate-200"
        >
          <div className="flex justify-between items-center gap-2">
            <h4 className="text-[9px] font-black tracking-widest uppercase text-slate-400 font-mono">Sandbox Outcome</h4>
            <span
              style={{ backgroundColor: `${calculatedTriage.colorHex}20`, color: calculatedTriage.colorHex }}
              className="text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-wider border border-current font-mono"
            >
              {calculatedTriage.severity}
            </span>
          </div>
          <h3 className="text-xs font-extrabold text-[#0C2340] leading-snug">
            {calculatedTriage.resultTitle[langKey] || calculatedTriage.resultTitle["en"]}
          </h3>
          <p className="text-[11px] leading-relaxed text-slate-600 font-bold">
            {calculatedTriage.rationale[langKey] || calculatedTriage.rationale["en"]}
          </p>

          <div className="pt-2 border-t border-slate-200 space-y-1.5">
            <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Triage Guidelines Checklist:</span>
            <ul className="text-[10px] text-slate-700 leading-normal font-bold space-y-1.5">
              {(calculatedTriage.checklist[langKey] || calculatedTriage.checklist["en"]).slice(0, 3).map((line, idx) => (
                <li key={idx} className="flex gap-1.5 items-start">
                  <span className="text-[#D9531E] select-none shrink-0 font-extrabold">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  if (!hasBegun) {
    return (
      <div id="welcome-portal-root" className="bg-[#FAF9F5] text-[#0C2340] min-h-screen font-sans flex flex-col justify-between overflow-y-auto select-none antialiased pb-4">
        
        {/* Top Branding Section */}
        <div className="pt-8 text-center bg-[#FAF9F5] shrink-0">
          <h1 className="text-4xl tracking-tight font-serif text-[#0C2340] font-bold select-text">
            <span className="italic font-medium">Swasthya</span><sup className="text-sm font-sans font-black text-[#0C2340] ml-0.5">®</sup>
          </h1>
        </div>

        {/* Main integrated visual card */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto px-6 my-4 shrink-0">
          <div className="aspect-[4/5] rounded-[36px] overflow-hidden shadow-lg border border-[#E5DFD0]">
            <img
              src={swasthyaHeroMaternal}
              alt="Swasthya Indian ASHA Worker holding rural mother's hand with soft, warm smile"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[center_35%] filter brightness-95 contrast-102"
            />
          </div>
        </div>

        {/* Headline and Interaction Gateway */}
        <div className="flex flex-col items-center text-center px-6 space-y-5 z-10 relative bg-[#FAF9F5] max-w-md mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-[#0C2340] leading-tight select-text">
            Empowering<br />Grassroots Care.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            {/* Language Selection Dropdown */}
            <div id="welcome-lang-tab" className="flex items-center gap-1.5 bg-white border border-[#E5DFD0] rounded-full px-4 py-2.5 shadow-xs hover:border-slate-400">
              <span className="text-[11px] text-[#0C2340]/70 font-bold uppercase tracking-wider font-sans whitespace-nowrap">
                Choose Bhasha:
              </span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-[#0C2340] rounded font-bold text-xs focus:outline-none border-none cursor-pointer pr-1"
              >
                <option value="en">🇬🇧 English</option>
                <option value="hi">🇮🇳 हिन्दी</option>
                <option value="bn">🇮🇳 বাংলা</option>
                <option value="ta">🇮🇳 தமிழ்</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              setViewingDashboard(true);
              setHasBegun(true);
            }}
            className="w-full rounded-full py-3.5 px-10 text-sm bg-[#448E92] hover:bg-[#347276] text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md font-bold tracking-widest uppercase cursor-pointer"
            style={{
              boxShadow: "0 8px 20px -6px rgba(68, 142, 146, 0.45)"
            }}
          >
            <span>Begin Journey</span>
          </button>
        </div>

        {/* Quiet elegant clinical footer */}
        <div className="pt-6 text-center w-full text-[9px] font-mono uppercase tracking-widest text-slate-400 font-semibold bg-[#FAF9F5] z-10">
          SWASTHYA® CDSS • CLINICAL DECISION SUPPORT SYSTEM • IMCI v2.4 COMPLIANT
        </div>

      </div>
    );
  }

  return (
    <div id="asha-portal-root" className="bg-[#FAF9F5] text-[#0C2340] min-h-screen font-sans flex flex-col selection:bg-teal-100 antialiased relative">
      
      {/* BRAND HEADER BAR - Sage Green themed for neat maternal look */}
      <nav id="navbar-header" className="bg-[#A2B9A8] text-[#0C2340] shadow-xs shrink-0 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo & Sync Badge */}
          <div className="flex items-center gap-4">
            <div 
              onClick={() => {
                setViewingDashboard(true);
                setActiveAppTab("registry");
              }}
              className="flex items-center gap-2 cursor-pointer select-none shrink-0"
            >
              <span className="text-2xl font-bold tracking-tight font-serif text-[#0C2340] italic">
                Swasthya<sup className="text-xs font-sans font-black ml-0.5">®</sup>
              </span>
            </div>

            {/* Global Sync Status Badge */}
            <div 
              id="global-sync-badge"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/40 border border-white/65 shadow-xs select-none hover:bg-white/55 transition-all cursor-pointer"
              title={syncStatus === "synced" ? "All patient records safely synchronized to clinical servers" : "Local saving active. Reconnect to sync pending changes"}
              onClick={() => {
                // Clicking sync status simulates syncing records
                if (syncStatus !== "synced") {
                  setSyncStatus("syncing");
                  setTimeout(() => {
                    setSyncStatus("synced");
                    setSyncFlash(selectedLanguage === "hi" ? "सभी स्थानीय डेटा को केंद्रीय सर्वर पर सफलतापूर्वक सिंक किया गया!" : "All local data successfully synchronized to central server!");
                    setTimeout(() => setSyncFlash(null), 4000);
                  }, 1200);
                }
              }}
            >
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                syncStatus === "synced" 
                  ? "bg-emerald-600 animate-pulse" 
                  : syncStatus === "syncing"
                    ? "bg-sky-500 animate-spin border-t-2 border-white"
                    : "bg-amber-500 animate-bounce"
              }`} />
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#0C2340] hidden sm:inline">
                {syncStatus === "synced" ? "Synced" : syncStatus === "syncing" ? "Syncing..." : "Pending"}
              </span>
            </div>
          </div>

          {/* Middle Nav Links */}
          <div className="hidden md:flex items-center gap-1.5 bg-white/20 p-1 rounded-full border border-white/30 select-none">
            <button
              onClick={() => {
                setActiveAppTab("registry");
                setViewingDashboard(true);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeAppTab === "registry"
                  ? "bg-[#0C2340] text-white shadow-sm scale-102"
                  : "text-[#0C2340]/80 hover:text-[#0C2340] hover:bg-white/10"
              }`}
            >
              Patient Registry
            </button>
            <button
              onClick={() => {
                setActiveAppTab("knowledge");
                setAiResponse(null);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-extrabold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeAppTab === "knowledge"
                  ? "bg-[#0C2340] text-white shadow-sm scale-102"
                  : "text-[#0C2340]/80 hover:text-[#0C2340] hover:bg-white/10"
              }`}
            >
              AI Knowledge Base
            </button>
          </div>

          {/* Right Header Icons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setViewingDashboard(true);
                setActiveAppTab("registry");
                setTimeout(() => {
                  const s = document.getElementById("dashboard-search-input");
                  if (s) s.focus();
                }, 100);
              }}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              title="Search Patients"
            >
              <Search className="w-5 h-5 text-[#0C2340]" />
            </button>

            <button 
              onClick={() => setIsThreeDotsOpen(!isThreeDotsOpen)}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors relative cursor-pointer"
              title="Notifications"
            >
              <BellRing className="w-5 h-5 text-[#0C2340]" />
              {activeAlert !== null && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#B5451B] rounded-full animate-pulse" />
              )}
            </button>

            <div 
              onClick={() => setIsThreeDotsOpen(!isThreeDotsOpen)}
              className="w-8 h-8 rounded-full overflow-hidden border border-[#0C2340]/15 cursor-pointer hover:scale-105 transition-transform"
              title="User Account"
            >
              <img 
                src={ashaSingleImg} 
                alt="Lalita Bai (ASHA)" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Elegant Three-Dots Settings Menu Dropdown integrated on the profile trigger */}
            <div className="relative">
              <AnimatePresence>
                {isThreeDotsOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40 bg-transparent"
                      onClick={() => setIsThreeDotsOpen(false)}
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-6 w-56 rounded-2xl bg-white border border-[#E5DFD0] shadow-xl z-50 overflow-hidden text-left"
                    >
                      <div className="p-3 border-b border-[#FAF7F0] bg-[#FAF7F0]/80">
                        <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                          {translations.accountLabel}
                        </div>
                        <div className="text-xs font-black text-[#0C2340] mt-0.5 truncate">
                          {isLoggedIn ? "Lalita Bai (ASHA)" : "Signed Out"}
                        </div>
                        {isLoggedIn && (
                          <div className="text-[9px] font-mono text-[#D9531E] font-bold mt-0.5">
                            ID: ASHA-MP-4920 • Pipariya
                          </div>
                        )}
                      </div>

                      <div className="p-1.5 space-y-0.5">
                        <button
                          onClick={() => {
                            setIsThreeDotsOpen(false);
                            setIsAccountModalOpen(true);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-[#0C2340] hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>{translations.accountLabel}</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsThreeDotsOpen(false);
                            setIsSettingsModalOpen(true);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-[#0C2340] hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <Sliders className="w-4 h-4 text-slate-400" />
                          <span>{translations.settingsLabel}</span>
                        </button>

                        <div className="border-t border-[#FAF7F0] my-1" />

                        <button
                          onClick={() => {
                            setIsThreeDotsOpen(false);
                            setIsLoggedIn(!isLoggedIn);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer ${
                            isLoggedIn 
                              ? "text-rose-600 hover:bg-rose-50" 
                              : "text-emerald-600 hover:bg-emerald-50"
                          }`}
                        >
                          {isLoggedIn ? (
                            <>
                              <LogOut className="w-4 h-4 text-rose-500" />
                              <span>{translations.signOutLabel}</span>
                            </>
                          ) : (
                            <>
                              <LogIn className="w-4 h-4 text-emerald-500" />
                              <span>{translations.signInLabel}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </nav>

      {/* OPERATIONS TOOLBAR / STATUS BAR - Merges online, sync, manual, ledger and dashboard tabs in the custom minimal style */}
      <div className="status-bar bg-[#FFFEF2] border-b border-[#18181A]/10 px-6 py-2.5 select-none text-left flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Pill: Online */}
          <button
            onClick={() => {
              const targetOnline = !isOnline;
              setIsOnline(targetOnline);
              if (targetOnline) {
                setSyncStatus("synced");
                setSyncFlash("Gateway: Connected back online! Database synced.");
              } else {
                setSyncStatus("pending");
                setSyncFlash("Gateway: Offline simulated mode activated! Device working locally.");
              }
              setTimeout(() => setSyncFlash(null), 4000);
            }}
            className={`font-mono text-[10px] tracking-wider uppercase font-bold px-3 py-1.5 border border-[#18181A] rounded-[2px] cursor-pointer transition-all ${
              isOnline 
                ? "bg-[#18181A] text-white" 
                : "bg-white text-[#18181A] border-dashed border-[#18181A]/40 text-[#18181A]/60"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </button>

          {/* Pill: Synced */}
          <button
            disabled={syncStatus === "synced" || !isOnline}
            onClick={handleManualSyncAll}
            className={`font-mono text-[10px] tracking-wider uppercase font-bold px-3 py-1.5 border border-[#18181A] rounded-[2px] transition-all ${
              syncStatus === "synced"
                ? "bg-white text-[#18181A]/40 border-[#18181A]/30 cursor-default"
                : isOnline
                ? "bg-[#1A7F77] text-white cursor-pointer animate-pulse border-[#1A7F77]"
                : "bg-white text-[#18181A]/40 border-[#18181A]/20 cursor-not-allowed"
            }`}
          >
            {syncStatus === "synced" ? "Synced" : "Manual Sync"}
          </button>

          {/* Pill: Guide Manual */}
          <button
            onClick={() => setIsHelpOpen(true)}
            className="font-mono text-[10px] tracking-wider uppercase font-bold px-3 py-1.5 border border-[#18181A] rounded-[2px] bg-white text-[#18181A] hover:bg-[#FAF9F6] cursor-pointer transition-all"
          >
            Manual
          </button>

          {/* Pill: Ledger */}
          <button
            onClick={() => setIsGitLogOpen(true)}
            className="font-mono text-[10px] tracking-wider uppercase font-bold px-3 py-1.5 border border-[#18181A] rounded-[2px] bg-white text-[#18181A] hover:bg-[#FAF9F6] cursor-pointer transition-all"
          >
            Ledger
          </button>

          {/* Pill: Dashboard Toggle */}
          <button
            onClick={() => {
              setActiveAppTab("registry");
              setViewingDashboard(true);
            }}
            className={`font-mono text-[10px] tracking-wider uppercase font-bold px-3 py-1.5 border border-[#18181A] rounded-[2px] cursor-pointer transition-all ${
              activeAppTab === "registry" && viewingDashboard
                ? "bg-[#18181A] text-white"
                : "bg-white text-[#18181A]"
            }`}
          >
            Dashboard
          </button>

          {/* Pill: AI Knowledge */}
          <button
            onClick={() => {
              setActiveAppTab("knowledge");
              setAiResponse(null);
            }}
            className={`font-mono text-[10px] tracking-wider uppercase font-bold px-3 py-1.5 border border-[#18181A] rounded-[2px] cursor-pointer transition-all ${
              activeAppTab === "knowledge"
                ? "bg-[#18181A] text-white"
                : "bg-white text-[#18181A]"
            }`}
          >
            AI Knowledge
          </button>
        </div>

        {/* Right: Bhasha Language Dropdown & Exit */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#18181A]/60">Bhasha</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="border-none font-sans font-bold text-xs bg-transparent cursor-pointer py-1 focus:outline-none text-[#18181A]"
          >
            {Object.entries(LANGUAGES).map(([code, data]) => (
              <option key={code} value={code} className="bg-white text-[#18181A]">
                {data.flag} {data.name.substring(0, 3)}
              </option>
            ))}
          </select>

          <button
            onClick={() => setHasBegun(false)}
            className="font-mono text-[10px] tracking-wider uppercase font-bold px-3 py-1.5 border border-[#18181A] rounded-[2px] bg-white text-[#18181A] hover:bg-[#FAF9F6] cursor-pointer transition-all"
          >
            Exit
          </button>
        </div>
      </div>

      {/* MOBILE DEVICE TAB SWITCHER (Hidden on Large displays) */}
      <div id="mobile-views-segmented-tabs" className="lg:hidden bg-[#F8F7F4] border-b border-[#18181A]/10 p-2 sticky top-[65px] z-40 text-left">
        <div className="grid grid-cols-2 gap-1 bg-white border border-[#18181A] p-1 rounded-none max-w-md mx-auto">
          <button
            type="button"
            onClick={() => {
              setViewingDashboard(true);
              setMobileTab("flow");
            }}
            className={`py-2 px-3 text-xs font-mono font-bold uppercase rounded-none transition-all flex items-center justify-center gap-2 cursor-pointer ${
              viewingDashboard
                ? "bg-[#18181A] text-white"
                : "text-[#18181A]/60 hover:text-[#18181A]"
            }`}
          >
            <Menu className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setViewingDashboard(false);
              setMobileTab("case");
            }}
            className={`py-2 px-3 text-xs font-mono font-bold uppercase rounded-none transition-all flex items-center justify-center gap-2 cursor-pointer ${
              !viewingDashboard
                ? "bg-[#18181A] text-white"
                : "text-[#18181A]/60 hover:text-[#18181A]"
            }`}
          >
            <User className="w-4 h-4" />
            <span className="truncate">{selectedPatient ? getLocalizedText(selectedPatient.name, selectedLanguage) : "Clinical Care"}</span>
          </button>
        </div>
      </div>

      {/* THREE-TABS DYNAMIC MAIN LAYOUT CONTAINER */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        
        {activeAppTab === "registry" ? (
          <div className="relative">
            {viewingDashboard ? (
            /* --- PAGE 2: DASHBOARD VIEW (Swasthya® Minimal Modern Theme) --- */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#18181A] bg-white text-[#18181A] text-left rounded-none overflow-hidden animate-fade-in pb-12">
              
              {/* Left Column (aside): Search & ASHA Info Banner & DB Engine Status (3/12 cols) */}
              <aside className="lg:col-span-3 bg-[#FAF9F6] p-6 border-b lg:border-b-0 lg:border-r-[1.5px] border-[#18181A] flex flex-col gap-6">
                
                {/* Search Target Box */}
                <div className="relative">
                  <input
                    id="dashboard-search-input"
                    type="text"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border border-[#18181A] bg-white text-sm outline-none font-sans font-medium rounded-none focus:border-[#1A7F77] text-[#18181A]"
                  />
                </div>

                {/* Local ASHA workers card */}
                <div className="border border-[#18181A] p-4 bg-white shadow-[4px_4px_0_rgba(24,24,26,0.08)] space-y-4 rounded-none text-left">
                  <div className="aspect-[4/3] overflow-hidden border border-[#18181A]/10 bg-[#FAF9F6]">
                    <img 
                      src={ashaWorkersImg} 
                      alt="Local ASHA workers" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-[#18181A]/60 font-semibold leading-relaxed font-sans">
                    Local ASHA workers available with a mother, child, local mother, and managenants.
                  </p>
                  <button
                    onClick={() => setIsHelpOpen(true)}
                    className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#1A7F77] hover:underline cursor-pointer text-left block"
                  >
                    [Read More]
                  </button>
                </div>

                {/* DB Engine Status Box */}
                <div className="border border-[#18181A]/10 p-4 bg-white rounded-none">
                  <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#18181A]/60 block">
                    Engine
                  </span>
                  <div className="text-[11px] font-bold text-[#18181A] leading-relaxed mt-1 font-mono">
                    Offline Encrypted SQLite Storage Active
                  </div>
                </div>

              </aside>

              {/* Right Column: Patients list (9/12 cols) */}
              <section className="lg:col-span-9 p-6 sm:p-8 bg-white space-y-8">
                
                {/* Header with Register Button */}
                <div className="flex justify-between items-end border-b border-[#18181A]/10 pb-4 mb-6">
                  <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[#18181A]">
                    Patients
                  </h2>
                  
                  <button
                    onClick={() => setIsRegistering(true)}
                    className="bg-[#1A7F77] text-white hover:bg-[#135E58] transition-colors py-2 px-5 text-[11px] font-bold font-mono uppercase tracking-widest rounded-none border border-[#1A7F77] cursor-pointer"
                  >
                    Add Patient
                  </button>
                </div>

                {/* Patient Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPatients.length === 0 ? (
                    <div className="bg-[#FAF9F6] border border-[#18181A]/10 py-12 px-4 rounded-none text-center text-xs font-mono font-bold uppercase tracking-wider text-slate-400 col-span-full">
                      No matching patients found in this sector.
                    </div>
                  ) : (
                    filteredPatients.map((patient, index) => {
                      const isMaternal = patient.gender === "female";
                      const lastVisit = patient.history[patient.history.length - 1];
                      const severity = lastVisit?.triageSeverity || "LOW";
                      const ageStr = isMaternal 
                        ? `${Math.floor(patient.ageMonths / 12)} years` 
                        : `${patient.ageMonths} months`;

                      // Progress percentage representation matching the design variation
                      const progressPct = isMaternal ? 18 : 15;
                      const progressStr = isMaternal ? "18%" : "15%";

                      return (
                        <div
                          key={patient.id}
                          onClick={() => {
                            setSelectedPatientId(patient.id);
                            setViewingDashboard(false);
                          }}
                          className="glass-medical-card p-5 transition-all duration-300 hover:bg-white/70 hover:shadow-[0_12px_40px_0_rgba(162,185,168,0.22)] border border-white/55 cursor-pointer text-left relative flex flex-col gap-4 rounded-2xl"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-[#18181A]/40 block">
                                Card 0{index + 1}
                              </span>
                              <h4 className="font-sans text-lg font-bold text-[#18181A] mt-1 tracking-tight">
                                {getLocalizedText(patient.name, selectedLanguage)}
                              </h4>
                            </div>
                            
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${
                                severity === "URGENT" 
                                  ? "bg-rose-600 animate-pulse" 
                                  : severity === "MED" 
                                  ? "bg-amber-500" 
                                  : "bg-[#1A7F77]"
                              }`} />
                              <span className={`font-mono text-[9px] uppercase tracking-widest font-bold ${
                                severity === "URGENT" 
                                  ? "text-rose-600" 
                                  : severity === "MED" 
                                  ? "text-amber-600" 
                                  : "text-[#1A7F77]"
                              }`}>
                                • {severity === "URGENT" ? "High Risk" : severity === "MED" ? "Med Risk" : "Low Risk"}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="font-mono text-[9px] uppercase tracking-widest text-[#18181A]/40 block">Age</span>
                              <span className="font-sans text-[#18181A] text-sm font-bold mt-0.5 block">{ageStr}</span>
                            </div>
                            <div>
                              <span className="font-mono text-[9px] uppercase tracking-widest text-[#18181A]/40 block">Gender</span>
                              <span className="font-sans text-[#18181A] text-sm font-bold mt-0.5 block">
                                {patient.gender === "female" ? "Maternal" : "Male"}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1 mt-auto">
                            <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-[#18181A]/60">
                              <span>Progress</span>
                              <span>{progressStr}</span>
                            </div>
                            <div className="w-full bg-[#18181A]/10 h-1 rounded-none overflow-hidden">
                              <div 
                                className={`h-full ${isMaternal ? "bg-[#D9531E]" : "bg-[#1A7F77]"}`}
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-[#18181A]/5 text-xs font-bold font-sans mt-1">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#18181A]/40">Total State</span>
                            <span className="text-[#18181A] text-xs font-bold">{progressStr}</span>
                          </div>

                          <div className="absolute top-4 right-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPatientId(patient.id);
                                setIsThreeDotsOpen(true);
                              }}
                              className="p-1 hover:bg-[#FAF9F6] border border-transparent hover:border-[#18181A]/10 rounded-[2px] text-[#18181A]/40 hover:text-[#18181A] cursor-pointer"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

              </section>

            </div>
          ) : (
            /* --- PAGES 3 & 4: ACTIVE PATIENT WORKSPACE --- */
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* COLUMN 1 (4 Columns on Desktop): PERSISTENT PATIENT FLOW CONTROLLER */}
          <div
            id="column-patient-flow"
            className={`${
              mobileTab === "flow" ? "block" : "hidden lg:block animate-fade-in"
            } lg:col-span-4 space-y-6`}
          >
            
            {/* Search, Filter and Totals Registry Header */}
            <div className="bg-[#FAF9F6] border border-[#18181A] rounded-none p-5 shadow-[4px_4px_0_rgba(24,24,26,0.08)] space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#18181A]/10">
                <div className="text-left">
                  <h2 className="text-xl font-serif font-bold italic text-[#18181A]">
                    {translations.patientFlow}
                  </h2>
                  <p className="text-[9px] font-mono text-[#18181A]/50 font-bold uppercase tracking-widest mt-0.5">
                    {translations.gatewayStatus}
                  </p>
                </div>
                <div className="bg-white px-3 py-1.5 border border-[#18181A] text-center shrink-0 rounded-none">
                  <span className="block text-[8px] uppercase tracking-wider font-mono text-[#18181A]/50 font-bold">{translations.listTotal}</span>
                  <span className="text-base font-extrabold font-mono text-[#18181A]">
                    {filteredPatients.length}
                  </span>
                </div>
              </div>

              {/* Offline-Ready High Contrast Search target box */}
              <div className="relative">
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-[#18181A]/60" />
                <input
                  type="text"
                  placeholder={translations.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 text-sm border border-[#18181A] bg-white text-[#18181A] placeholder-[#18181A]/40 outline-none font-sans font-medium rounded-none focus:border-[#1A7F77]"
                />
              </div>

              {/* Segmented Category Buttons */}
              <div className="grid grid-cols-3 gap-0 border border-[#18181A] bg-white p-0">
                <button
                  type="button"
                  onClick={() => setCategoryFilter("ALL")}
                  className={`py-2 text-[10px] font-mono font-bold transition-all uppercase tracking-wider px-1.5 text-center truncate cursor-pointer rounded-none ${
                    categoryFilter === "ALL"
                      ? "bg-[#18181A] text-white"
                      : "text-[#18181A]/60 hover:text-[#18181A]"
                  }`}
                >
                  {translations.filterAll}
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryFilter("MATERNAL")}
                  className={`py-2 text-[10px] font-mono font-bold transition-all uppercase tracking-wider px-1.5 text-center truncate cursor-pointer border-l border-[#18181A] rounded-none ${
                    categoryFilter === "MATERNAL"
                      ? "bg-[#D9531E] text-white"
                      : "text-[#18181A]/60 hover:text-[#18181A]"
                  }`}
                >
                  {translations.filterMaternal}
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryFilter("PEDIATRIC")}
                  className={`py-2 text-[10px] font-mono font-bold transition-all uppercase tracking-wider px-1.5 text-center truncate cursor-pointer border-l border-[#18181A] rounded-none ${
                    categoryFilter === "PEDIATRIC"
                      ? "bg-[#1A7F77] text-white"
                      : "text-[#18181A]/60 hover:text-[#18181A]"
                  }`}
                >
                  {translations.filterPediatric}
                </button>
              </div>
            </div>

            {/* Scrollable Patient Cards queue */}
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1 text-left">
              {filteredPatients.length === 0 ? (
                <div className="bg-white border border-[#18181A]/10 py-12 px-4 rounded-none text-center text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  {translations.noMatchingPatients}
                </div>
              ) : (
                filteredPatients.map((patient) => {
                  const isMaternal = patient.gender === "female";
                  const lastVisit = patient.history[patient.history.length - 1];
                  const severity = lastVisit?.triageSeverity || "LOW";
                  const isSelected = patient.id === selectedPatientId;

                  // High Contrast Color mapping (Terracotta for Urgent, Saffron/Clay for Med & Forest Green for Safe)
                  const triageColorClass = severity === "URGENT" 
                    ? "bg-[#D9531E] text-white border-[#D9531E]" 
                    : severity === "MED" 
                    ? "bg-[#FFD23F]/20 text-[#18181A] border-[#FFD23F]" 
                    : "bg-[#1A7F77] text-white border-[#1A7F77]";

                  return (
                    <button
                      key={patient.id}
                      type="button"
                      onClick={() => {
                        setSelectedPatientId(patient.id);
                        // On mobile, tap instantly brings you to active case sheet
                        setMobileTab("case");
                      }}
                      className={`w-full text-left p-5 border flex flex-col justify-between min-h-[150px] relative hover:shadow-[0_8px_32px_0_rgba(162,185,168,0.18)] cursor-pointer transition-all rounded-2xl ${
                        isSelected 
                          ? "glass-medical border-[#1A7F77] ring-1 ring-[#1A7F77] shadow-[0_4px_20px_0_rgba(26,127,119,0.15)]"
                          : "glass-medical-card border-white/40 hover:bg-white/85"
                      }`}
                    >
                      <div className="w-full">
                        {/* Vital status & gender categories */}
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h3 className="text-base font-sans font-bold text-[#18181A] tracking-tight">
                            {getLocalizedText(patient.name, selectedLanguage)}
                          </h3>
                          <span className={`text-[8px] px-2 py-0.5 font-mono font-bold uppercase tracking-wider shrink-0 border ${triageColorClass}`}>
                            {severity === "URGENT" ? "HIGH RISK" : severity === "MED" ? "MED RISK" : "LOW RISK"}
                          </span>
                        </div>

                        {/* ID Code and Village village sector */}
                        <div className="text-[9px] font-mono tracking-wider font-bold text-[#18181A]/40 uppercase">
                          ID: {patient.id} • {getLocalizedText(patient.village, selectedLanguage)}
                        </div>

                        {/* Categorical descriptive tag */}
                        <div className="mt-3">
                          {isMaternal ? (
                            <span className="text-[8px] px-2 py-1 bg-pink-50 border border-pink-200 text-pink-950 font-mono font-bold uppercase tracking-wider">
                              {translations.categoryMaternal}
                            </span>
                          ) : (
                            <span className="text-[8px] px-2 py-1 bg-[#1A7F77]/10 border border-[#1A7F77]/20 text-[#1A7F77] font-mono font-bold uppercase tracking-wider">
                              {translations.categoryChild} ({patient.ageMonths}m)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Summary of final visit */}
                      <div className="mt-4 pt-3 border-t border-[#18181A]/5 flex justify-between items-center w-full gap-2">
                        <span className="text-[10px] font-mono font-bold text-[#18181A]/60 uppercase truncate max-w-[85%]">
                          {lastVisit ? getLocalizedText(lastVisit.statusText, selectedLanguage) : translations.noPreviousRecord}
                        </span>
                        <span className={`p-0.5 transition-transform ${isSelected ? "text-[#D9531E]" : "text-slate-400"}`}>
                          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Offline compliance standard disclaimer */}
            <div className="p-4 bg-white border border-[#18181A]/10 text-[9px] font-mono font-bold leading-normal text-[#18181A]/50 uppercase tracking-wider text-left">
              <span>{translations.complianceTitle}</span>
            </div>

            {/* Primary Action Button: Admissions Register New Patient */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsRegistering(true);
                  setRegStep(1);
                }}
                className="w-full bg-[#1A7F77] hover:bg-[#135E58] text-white py-3.5 px-4 rounded-none shadow-[4px_4px_0_rgba(24,24,26,0.08)] flex items-center justify-center gap-2 transition-all font-mono font-bold text-xs uppercase tracking-widest cursor-pointer border border-[#18181A]"
              >
                <UserPlus className="w-4 h-4 text-white" />
                <span>{translations.btnRegisterNewPatient}</span>
              </button>
            </div>

          </div>

          {/* COLUMN 2 (8 Columns on Desktop): ACTIVE PATIENT CASE SHEET (MAIN VIEWPORT) */}
          <div
            id="column-case-viewport"
            className={`${
              mobileTab === "case" ? "block" : "hidden lg:block animate-fade-in"
            } lg:col-span-8 space-y-6`}
          >
            
            {/* DEMOGRAPHICS HERO HEADER - High legibility, minimalist high-contrast layout */}
            <section className="bg-[#18181A] text-white border border-[#18181A] p-6 space-y-4 rounded-none shadow-[4px_4px_0_rgba(24,24,26,0.08)] text-left">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono font-bold tracking-widest uppercase bg-white/10 border border-white/25 text-white px-2 py-0.5">
                    {selectedPatient.gender === "female" ? translations.genderFemale : translations.genderMale}
                  </span>
                  
                  {/* Cinematic elegant header Font custom italic details */}
                  <h1 className="text-3xl font-serif italic font-medium tracking-tight text-white pt-1">
                    {getLocalizedText(selectedPatient.name, selectedLanguage)}
                  </h1>
                </div>

                {/* Back quick navigation for small screens */}
                <button
                  onClick={() => setMobileTab("flow")}
                  className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 bg-white text-[9px] font-mono font-bold uppercase tracking-widest border border-white text-[#18181A] active:scale-95 transition-all select-none cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{translations.backText}</span>
                </button>
              </div>

              {/* Core demographic metadata grid */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 pt-4 border-t border-white/15 font-sans text-xs text-white/80">
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/40 font-bold text-[8px] font-mono uppercase tracking-widest">{translations.spouseOrGuardianLabel}</span>
                  <span className="text-white font-bold text-xs tracking-wide">{getLocalizedText(selectedPatient.spouseOrGuardian, selectedLanguage)}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/40 font-bold text-[8px] font-mono uppercase tracking-widest">{translations.villageSectorLabel}</span>
                  <span className="text-white font-bold text-xs tracking-wide">{getLocalizedText(selectedPatient.village, selectedLanguage)}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/40 font-bold text-[8px] font-mono uppercase tracking-widest">{translations.registeredAgeLabel}</span>
                  <span className="text-white font-bold text-xs tracking-wide">
                    {selectedPatient.gender === "female" 
                      ? `${Math.floor(selectedPatient.ageMonths / 12)} ${translations.yearsSuffix}` 
                      : `${selectedPatient.ageMonths} ${translations.monthsSuffix}`}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/40 font-bold text-[8px] font-mono uppercase tracking-widest">{translations.patientIdLabel}</span>
                  <span className="text-white font-mono text-xs font-bold tracking-wider">{selectedPatient.id}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/40 font-bold text-[8px] font-mono uppercase tracking-widest">Contact</span>
                  <span className="text-white font-bold text-xs tracking-wide font-mono">{selectedPatient.phone || "N/A"}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/40 font-bold text-[8px] font-mono uppercase tracking-widest">Email</span>
                  <span className="text-white font-bold text-xs tracking-wide font-mono truncate" title={selectedPatient.email || "N/A"}>{selectedPatient.email || "N/A"}</span>
                </div>
              </div>
            </section>

            {/* PEDIATRIC IMMUNIZATION RECORD TRACKER (FOR PEDIATRIC PATIENTS ONLY) */}
            {selectedPatient.gender !== "female" && (
              <section className="bg-white border border-[#18181A] rounded-none p-6 shadow-[4px_4px_0_rgba(24,24,26,0.08)] space-y-5 text-left">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#18181A]/10 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-none bg-[#1A7F77]/10 border border-[#1A7F77]/30 text-[#1A7F77] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-[#1A7F77]" />
                    </div>
                    <div>
                      <h2 className="text-base font-serif font-bold italic text-[#18181A]">
                        {IMM_TRANSLATIONS[selectedLanguage]?.title || IMM_TRANSLATIONS["en"].title}
                      </h2>
                      <p className="text-[9px] font-mono text-[#18181A]/50 font-bold uppercase tracking-wider">
                        {IMM_TRANSLATIONS[selectedLanguage]?.subtitle || IMM_TRANSLATIONS["en"].subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Add Custom Vaccine Button */}
                  <button
                    onClick={() => setShowAddImmForm(!showAddImmForm)}
                    className="text-xs bg-white hover:bg-[#FAF9F6] text-[#18181A] border border-[#18181A] px-4 py-2 rounded-none font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-[2px_2px_0_rgba(24,24,26,0.05)]"
                  >
                    {showAddImmForm ? (
                      <>
                        <X className="w-4 h-4 text-[#18181A]" />
                        <span>{IMM_TRANSLATIONS[selectedLanguage]?.cancelBtn || IMM_TRANSLATIONS["en"].cancelBtn}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-[#D9531E]" />
                        <span>{IMM_TRANSLATIONS[selectedLanguage]?.addCustomBtn || IMM_TRANSLATIONS["en"].addCustomBtn}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Progress bar and metrics */}
                {(() => {
                  const imms = selectedPatient.immunizations || getDefaultImmunizations();
                  const total = imms.length;
                  const administeredCount = imms.filter(i => i.status === "ADMINISTERED").length;
                  const pct = total > 0 ? Math.round((administeredCount / total) * 100) : 0;

                  return (
                    <div className="bg-[#FAF9F6] border border-[#18181A] p-4 rounded-none space-y-2">
                      <div className="flex justify-between items-center text-xs text-[#18181A] font-extrabold">
                        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[9px] font-mono font-bold text-[#18181A]/60">
                          <Activity className="w-3.5 h-3.5 text-[#D9531E]" />
                          {IMM_TRANSLATIONS[selectedLanguage]?.progressLabel || IMM_TRANSLATIONS["en"].progressLabel}
                        </span>
                        <span className="font-mono bg-[#18181A] text-white px-2.5 py-0.5 rounded-none text-[10.5px]">
                          {administeredCount} / {total} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-none overflow-hidden border border-[#18181A]">
                        <div
                          style={{ width: `${pct}%` }}
                          className="h-full bg-[#1A7F77] transition-all duration-500 rounded-none relative"
                        >
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:14px_14px] animate-[pulse_1.5s_infinite_linear]" />
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Sliding/Collapsible Form to Add Custom Vaccine */}
                <AnimatePresence>
                  {showAddImmForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden bg-white border border-dashed border-[#18181A] rounded-none p-5 space-y-4"
                    >
                      <h3 className="text-sm font-serif font-bold italic text-[#18181A] border-b border-[#18181A]/10 pb-2">
                        {IMM_TRANSLATIONS[selectedLanguage]?.formTitle || IMM_TRANSLATIONS["en"].formTitle}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Vaccine Name */}
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono font-bold text-[#18181A]/60 uppercase tracking-widest block">
                            {IMM_TRANSLATIONS[selectedLanguage]?.vaccineNameLabel || IMM_TRANSLATIONS["en"].vaccineNameLabel} *
                          </label>
                          <input
                            type="text"
                            value={newImmName}
                            onChange={(e) => setNewImmName(e.target.value)}
                            placeholder="e.g. Hepatitis A, Influenza"
                            className="w-full text-xs p-3 rounded-none border border-[#18181A] bg-white font-semibold text-[#18181A]"
                          />
                        </div>

                        {/* Due Period */}
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono font-bold text-[#18181A]/60 uppercase tracking-widest block">
                            {IMM_TRANSLATIONS[selectedLanguage]?.dueDateLabel || IMM_TRANSLATIONS["en"].dueDateLabel} *
                          </label>
                          <input
                            type="text"
                            value={newImmDueDate}
                            onChange={(e) => setNewImmDueDate(e.target.value)}
                            placeholder="e.g. 15 Months, 5 Years"
                            className="w-full text-xs p-3 rounded-none border border-[#18181A] bg-white font-semibold text-[#18181A]"
                          />
                        </div>

                        {/* Status */}
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono font-bold text-[#18181A]/60 uppercase tracking-widest block">
                            {IMM_TRANSLATIONS[selectedLanguage]?.statusLabel || IMM_TRANSLATIONS["en"].statusLabel}
                          </label>
                          <div className="grid grid-cols-3 gap-1">
                            {(["PENDING", "ADMINISTERED", "OVERDUE"] as const).map((st) => (
                              <button
                                key={st}
                                type="button"
                                onClick={() => {
                                  setNewImmStatus(st);
                                  if (st === "ADMINISTERED" && !newImmAdminDate) {
                                    setNewImmAdminDate(new Date().toISOString().split('T')[0]);
                                  }
                                }}
                                className={`py-2 text-[9px] font-mono font-bold rounded-none border transition-all cursor-pointer ${
                                  newImmStatus === st
                                    ? st === "ADMINISTERED"
                                      ? "bg-[#1A7F77] text-white border-[#18181A]"
                                      : st === "OVERDUE"
                                      ? "bg-[#D9531E] text-white border-[#18181A]"
                                      : "bg-[#FFD23F] text-[#18181A] border-[#18181A]"
                                    : "bg-white hover:bg-slate-50 border-[#18181A]/35 text-[#18181A]"
                                }`}
                              >
                                {IMM_TRANSLATIONS[selectedLanguage]?.[st.toLowerCase() === "pending" ? "filterPending" : st.toLowerCase() === "administered" ? "filterAdministered" : "filterOverdue"] || st}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Admin Date */}
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono font-bold text-[#18181A]/60 uppercase tracking-widest block">
                            {IMM_TRANSLATIONS[selectedLanguage]?.adminDateLabel || IMM_TRANSLATIONS["en"].adminDateLabel}
                          </label>
                          <input
                            type="date"
                            value={newImmAdminDate}
                            onChange={(e) => setNewImmAdminDate(e.target.value)}
                            disabled={newImmStatus !== "ADMINISTERED"}
                            className="w-full text-xs p-3 rounded-none border border-[#18181A] bg-white font-semibold text-[#18181A] disabled:bg-slate-50 disabled:text-[#18181A]/40"
                          />
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono font-bold text-[#18181A]/60 uppercase tracking-widest block">
                          {IMM_TRANSLATIONS[selectedLanguage]?.notesLabel || IMM_TRANSLATIONS["en"].notesLabel}
                        </label>
                        <textarea
                          value={newImmNotes}
                          onChange={(e) => setNewImmNotes(e.target.value)}
                          placeholder={IMM_TRANSLATIONS[selectedLanguage]?.notesPlaceholder || IMM_TRANSLATIONS["en"].notesPlaceholder}
                          rows={2}
                          className="w-full text-xs p-3 rounded-none border border-[#18181A] bg-white font-semibold text-[#18181A]"
                        />
                      </div>

                      {/* Form action buttons */}
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setNewImmName("");
                            setNewImmDueDate("");
                            setNewImmStatus("PENDING");
                            setNewImmAdminDate("");
                            setNewImmNotes("");
                            setShowAddImmForm(false);
                          }}
                          className="px-4 py-2 text-xs font-mono font-bold rounded-none border border-[#18181A] hover:bg-slate-50 text-[#18181A] bg-white cursor-pointer"
                        >
                          {IMM_TRANSLATIONS[selectedLanguage]?.cancelBtn || IMM_TRANSLATIONS["en"].cancelBtn}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!newImmName.trim() || !newImmDueDate.trim()) {
                              alert("Please fill in the Vaccine Name and Due Period.");
                              return;
                            }
                            handleAddCustomImmunization(
                              newImmName.trim(),
                              newImmDueDate.trim(),
                              newImmStatus,
                              newImmStatus === "ADMINISTERED" ? newImmAdminDate : undefined,
                              newImmNotes.trim() || undefined
                            );
                            setNewImmName("");
                            setNewImmDueDate("");
                            setNewImmStatus("PENDING");
                            setNewImmAdminDate("");
                            setNewImmNotes("");
                            setShowAddImmForm(false);
                          }}
                          className="px-4 py-2 text-xs font-mono font-bold rounded-none bg-[#18181A] hover:bg-[#1A7F77] text-white border border-[#18181A] cursor-pointer"
                        >
                          {IMM_TRANSLATIONS[selectedLanguage]?.saveBtn || IMM_TRANSLATIONS["en"].saveBtn}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#18181A]/10">
                  <div className="flex flex-wrap gap-1">
                    {(["ALL", "PENDING", "ADMINISTERED", "OVERDUE", "UPCOMING_ALERT"] as const).map((filter) => {
                      const isActive = immFilterStatus === filter;
                      const count = (selectedPatient.immunizations || getDefaultImmunizations()).filter(i => {
                        if (filter === "ALL") return true;
                        if (filter === "UPCOMING_ALERT") return isUpcomingVaccine(i, selectedPatient.ageMonths);
                        return i.status === filter;
                      }).length;

                      return (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setImmFilterStatus(filter)}
                          className={`px-3 py-1.5 rounded-none text-[9px] font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isActive
                              ? filter === "UPCOMING_ALERT"
                                ? "bg-[#FFD23F] text-[#18181A] border-[#18181A] shadow-[2px_2px_0_rgba(24,24,26,0.05)]"
                                : "bg-[#18181A] text-white border-[#18181A] shadow-[2px_2px_0_rgba(24,24,26,0.05)]"
                              : "bg-white text-[#18181A]/60 border-[#18181A]/20 hover:border-[#18181A] hover:bg-slate-50"
                          }`}
                        >
                          <span>
                            {filter === "ALL"
                              ? (IMM_TRANSLATIONS[selectedLanguage]?.filterAll || IMM_TRANSLATIONS["en"].filterAll)
                              : filter === "PENDING"
                              ? (IMM_TRANSLATIONS[selectedLanguage]?.filterPending || IMM_TRANSLATIONS["en"].filterPending)
                              : filter === "ADMINISTERED"
                              ? (IMM_TRANSLATIONS[selectedLanguage]?.filterAdministered || IMM_TRANSLATIONS["en"].filterAdministered)
                              : filter === "OVERDUE"
                              ? (IMM_TRANSLATIONS[selectedLanguage]?.filterOverdue || IMM_TRANSLATIONS["en"].filterOverdue)
                              : (IMM_TRANSLATIONS[selectedLanguage]?.filterUpcomingAlert || IMM_TRANSLATIONS["en"].filterUpcomingAlert)}
                          </span>
                          <span className={`text-[8px] font-mono px-1 py-0.2 border ${isActive ? "bg-white/25 text-white border-white/30" : "bg-slate-100 text-slate-700 border-slate-300"}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Alert Mode Banner */}
                {immFilterStatus === "UPCOMING_ALERT" && (
                  <div className="bg-amber-50 border border-[#18181A] rounded-none p-4 text-xs space-y-3">
                    <div className="flex items-start gap-2.5 text-amber-950 font-semibold leading-relaxed">
                      <AlertTriangle className="w-5 h-5 text-[#D9531E] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold font-serif italic text-base text-[#18181A]">
                          {IMM_TRANSLATIONS[selectedLanguage]?.upcomingAlertBanner || IMM_TRANSLATIONS["en"].upcomingAlertBanner}
                        </p>
                      </div>
                    </div>
                    {/* Simulation helper button to make it extremely easy to test */}
                    <div className="flex pt-1">
                      <button
                        onClick={() => {
                          const today = new Date();
                          today.setDate(today.getDate() + 4); // 4 days from now (within 1 week)
                          const simulatedDateString = today.toISOString().split('T')[0];
                          handleAddCustomImmunization(
                            "Simulated Upcoming Vaccine",
                            simulatedDateString,
                            "PENDING",
                            undefined,
                            "Demo upcoming vaccine triggering alert mode."
                          );
                        }}
                        className="bg-[#FFD23F] hover:bg-[#FFE066] text-[#18181A] border border-[#18181A] font-mono font-bold text-[9.5px] px-3.5 py-1.5 rounded-none transition-all cursor-pointer"
                      >
                        🚀 {IMM_TRANSLATIONS[selectedLanguage]?.simulateAlertBtn || IMM_TRANSLATIONS["en"].simulateAlertBtn}
                      </button>
                    </div>
                  </div>
                )}

                {/* Vaccines List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[360px] overflow-y-auto pr-1">
                  {(() => {
                    const imms = selectedPatient.immunizations || getDefaultImmunizations();
                    const filtered = imms.filter(i => {
                      if (immFilterStatus === "ALL") return true;
                      if (immFilterStatus === "UPCOMING_ALERT") return isUpcomingVaccine(i, selectedPatient.ageMonths);
                      return i.status === immFilterStatus;
                    });

                    if (filtered.length === 0) {
                      return (
                        <div className="col-span-full py-8 text-center bg-white border border-dashed border-[#18181A]/30 rounded-none text-xs text-[#18181A]/60 font-mono font-bold select-none">
                          <AlertCircle className="w-8 h-8 text-[#18181A]/40 mx-auto mb-2" />
                          <span>{IMM_TRANSLATIONS[selectedLanguage]?.emptyList || IMM_TRANSLATIONS["en"].emptyList}</span>
                          {immFilterStatus === "UPCOMING_ALERT" && (
                            <div className="mt-3 flex justify-center">
                              <button
                                onClick={() => {
                                  const today = new Date();
                                  today.setDate(today.getDate() + 4);
                                  const simulatedDateString = today.toISOString().split('T')[0];
                                  handleAddCustomImmunization(
                                    "Simulated Upcoming Vaccine",
                                    simulatedDateString,
                                    "PENDING",
                                    undefined,
                                    "Demo upcoming vaccine triggering alert mode."
                                  );
                                }}
                                className="bg-[#FFD23F] hover:bg-[#FFE066] text-[#18181A] border border-[#18181A] font-mono font-bold text-[10px] px-3 py-1 rounded-none transition-all cursor-pointer"
                              >
                                {IMM_TRANSLATIONS[selectedLanguage]?.simulateAlertBtn || IMM_TRANSLATIONS["en"].simulateAlertBtn}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    }

                    return filtered.map((imm) => {
                      const isCompleted = imm.status === "ADMINISTERED";
                      const isOverdue = imm.status === "OVERDUE";
                      const isUpcoming = isUpcomingVaccine(imm, selectedPatient.ageMonths);
                      const isCustom = imm.id.startsWith("IMM-CUST-");

                      let cardBorder = "border-[#18181A] bg-white";
                      if (isCompleted) cardBorder = "border-[#1A7F77] bg-[#1A7F77]/5";
                      else if (isOverdue) cardBorder = "border-[#D9531E] bg-[#D9531E]/5";
                      else if (isUpcoming) cardBorder = "border-[#D9531E] bg-[#FFD23F]/10 ring-1 ring-[#D9531E]";

                      return (
                        <div
                          key={imm.id}
                          className={`p-4 rounded-none border hover:shadow-[3px_3px_0_rgba(24,24,26,0.06)] transition-all relative ${cardBorder} flex flex-col justify-between gap-3 text-left`}
                        >
                          <div>
                            {/* Card Header */}
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <h4 className="text-xs font-bold text-[#18181A] tracking-tight flex items-center gap-1">
                                  {imm.vaccine}
                                  {isCustom && (
                                    <span className="text-[8px] bg-slate-100 text-slate-800 border border-slate-300 px-1.5 py-0.2 rounded-none font-bold uppercase font-mono">
                                      {IMM_TRANSLATIONS[selectedLanguage]?.customTag || IMM_TRANSLATIONS["en"].customTag}
                                    </span>
                                  )}
                                </h4>
                                <p className="text-[10px] text-[#18181A]/60 mt-0.5 font-mono">
                                  {IMM_TRANSLATIONS[selectedLanguage]?.dueAt || IMM_TRANSLATIONS["en"].dueAt}: <strong className="text-[#18181A]">{imm.dueDate}</strong>
                                </p>
                              </div>

                              <div className="flex items-center gap-1.5 font-mono">
                                {isUpcoming && (
                                  <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none border bg-[#FFD23F] text-[#18181A] border-[#18181A] shadow-[1px_1px_0_rgba(24,24,26,0.05)]">
                                    {IMM_TRANSLATIONS[selectedLanguage]?.upcomingBadge || IMM_TRANSLATIONS["en"].upcomingBadge}
                                  </span>
                                )}
                                <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none border ${
                                  isCompleted
                                    ? "bg-[#1A7F77]/10 text-[#1A7F77] border-[#1A7F77]/30"
                                    : isOverdue
                                    ? "bg-[#D9531E]/10 text-[#D9531E] border-[#D9531E]/30"
                                    : isUpcoming
                                    ? "bg-[#FFD23F]/20 text-[#18181A] border-[#18181A]/30"
                                    : "bg-slate-100 text-slate-700 border-slate-300"
                                }`}>
                                  {IMM_TRANSLATIONS[selectedLanguage]?.[imm.status.toLowerCase() === "pending" ? "filterPending" : imm.status.toLowerCase() === "administered" ? "filterAdministered" : "filterOverdue"] || imm.status}
                                </span>

                                {isCustom && (
                                  <button
                                    onClick={() => {
                                      if (confirm(`Remove this vaccine record: ${imm.vaccine}?`)) {
                                        handleDeleteImmunization(imm.id);
                                      }
                                    }}
                                    title={IMM_TRANSLATIONS[selectedLanguage]?.deleteTooltip || IMM_TRANSLATIONS["en"].deleteTooltip}
                                    className="p-1 text-slate-400 hover:text-red-500 rounded-none hover:bg-slate-100 transition-all cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Notes */}
                            {imm.notes && (
                              <div className="mt-2 text-[10.5px] bg-[#FAF9F6] border border-[#18181A]/10 p-2 rounded-none text-[#18181A]/70 font-medium italic">
                                {imm.notes}
                              </div>
                            )}

                            {/* Overdue Warning */}
                            {isOverdue && (
                              <div className="mt-2 text-[9.5px] bg-[#D9531E]/5 text-[#D9531E] px-2 py-1.5 rounded-none font-bold border border-[#D9531E]/20 flex items-center gap-1 select-none font-mono">
                                <AlertTriangle className="w-3.5 h-3.5 text-[#D9531E] shrink-0" />
                                <span>{IMM_TRANSLATIONS[selectedLanguage]?.overdueWarning || IMM_TRANSLATIONS["en"].overdueWarning}</span>
                              </div>
                            )}

                            {/* Completed Date */}
                            {isCompleted && imm.administeredDate && (
                              <div className="mt-2 text-[10px] text-[#1A7F77] font-bold flex items-center gap-1 select-none font-mono">
                                <CheckSquare className="w-3.5 h-3.5 text-[#1A7F77]" />
                                <span>{IMM_TRANSLATIONS[selectedLanguage]?.administeredOn || IMM_TRANSLATIONS["en"].administeredOn}: <strong>{imm.administeredDate}</strong></span>
                              </div>
                            )}

                            {/* Proactive ASHA Outreach Message Panel */}
                            {isUpcoming && (
                              <div className="mt-3 bg-[#FFD23F]/10 border border-[#18181A] p-3 rounded-none space-y-2 text-left">
                                <p className="text-[9px] uppercase font-bold tracking-wider text-[#18181A]/80 flex items-center gap-1 font-mono">
                                  <MessageSquare className="w-3.5 h-3.5 text-[#1A7F77] shrink-0" />
                                  <span>{IMM_TRANSLATIONS[selectedLanguage]?.outreachHeader || IMM_TRANSLATIONS["en"].outreachHeader}</span>
                                </p>
                                <div className="text-[10px] text-[#18181A]/90 bg-white p-2.5 rounded-none border border-[#18181A]/20 select-text leading-relaxed font-sans">
                                  {getOutreachMessage(imm, selectedPatient, selectedLanguage)}
                                </div>
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  <button
                                    onClick={() => {
                                      const msg = getOutreachMessage(imm, selectedPatient, selectedLanguage);
                                      navigator.clipboard.writeText(msg).then(() => {
                                        setCopiedImmId(imm.id);
                                        setTimeout(() => setCopiedImmId(null), 2000);
                                      });
                                    }}
                                    className="flex items-center gap-1 px-2.5 py-1.5 bg-[#18181A] hover:bg-[#1A7F77] text-white font-mono font-bold text-[9px] uppercase tracking-wider rounded-none transition-all cursor-pointer border border-[#18181A] shadow-[1px_1px_0_rgba(24,24,26,0.05)]"
                                  >
                                    <Copy className="w-3 h-3 shrink-0" />
                                    <span>
                                      {copiedImmId === imm.id 
                                        ? (IMM_TRANSLATIONS[selectedLanguage]?.copiedLabel || IMM_TRANSLATIONS["en"].copiedLabel)
                                        : (IMM_TRANSLATIONS[selectedLanguage]?.copyOutreachBtn || IMM_TRANSLATIONS["en"].copyOutreachBtn)}
                                    </span>
                                  </button>
                                  <a
                                    href={`https://wa.me/?text=${encodeURIComponent(getOutreachMessage(imm, selectedPatient, selectedLanguage))}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1 px-2.5 py-1.5 bg-[#1A7F77] hover:bg-[#1A7F77]/90 text-white font-mono font-bold text-[9px] uppercase tracking-wider rounded-none transition-all cursor-pointer border border-[#18181A] shadow-[1px_1px_0_rgba(24,24,26,0.05)] no-underline"
                                  >
                                    <MessageSquare className="w-3 h-3 text-white shrink-0" />
                                    <span>{IMM_TRANSLATIONS[selectedLanguage]?.whatsappOutreachBtn || IMM_TRANSLATIONS["en"].whatsappOutreachBtn}</span>
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Quick Actions */}
                          <div className="pt-2 border-t border-[#18181A]/15 flex gap-2">
                            {!isCompleted ? (
                              <div className="w-full flex items-center gap-2">
                                <input
                                  type="date"
                                  id={`date-${imm.id}`}
                                  defaultValue={new Date().toISOString().split('T')[0]}
                                  className="text-[10px] p-1.5 rounded-none border border-[#18181A] bg-white font-mono font-semibold text-[#18181A] max-w-[110px]"
                                />
                                <button
                                  onClick={() => {
                                    const dateInput = document.getElementById(`date-${imm.id}`) as HTMLInputElement;
                                    const dateVal = dateInput ? dateInput.value : undefined;
                                    handleUpdateImmunization(imm.id, "ADMINISTERED", dateVal);
                                  }}
                                  className="flex-1 py-1.5 bg-[#1A7F77] hover:bg-[#1A7F77]/90 text-white font-mono font-bold text-[9.5px] uppercase tracking-wider rounded-none transition-all text-center cursor-pointer select-none border border-[#18181A]"
                                >
                                  {IMM_TRANSLATIONS[selectedLanguage]?.markAdministered || IMM_TRANSLATIONS["en"].markAdministered}
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleUpdateImmunization(imm.id, "PENDING")}
                                className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold text-[9.5px] uppercase tracking-wider rounded-none border border-[#18181A]/20 transition-all text-center cursor-pointer select-none"
                              >
                                {IMM_TRANSLATIONS[selectedLanguage]?.clearRecord || IMM_TRANSLATIONS["en"].clearRecord}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </section>
            )}

            {/* REDESIGN: AI DOCTOR EXPERT CDSS INSIGHT PANEL (HIGHLIGHTED AT THE TOP) */}
            <section className="glass-medical p-6 shadow-[0_12px_40px_0_rgba(162,185,168,0.18)] space-y-5 relative text-left rounded-3xl border border-white/60">
              
              {/* Subtle top indicator tag */}
              <div className="flex justify-between items-center pb-3 border-b border-[#18181A]/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white/70 flex items-center justify-center border border-white/80 shadow-xs">
                    <Sparkles className="w-4 h-4 text-[#D9531E]" />
                  </div>
                  <div>
                    <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#18181A]">
                      {translations.consultAiPanelTitle}
                    </h2>
                    <p className="text-[8.5px] tracking-wide uppercase font-mono font-bold text-slate-400">
                      SECURE AI CDSS CORE • ACTIVE ENGINE
                    </p>
                  </div>
                </div>

                {/* Tactical Physical Feedback Indicator for thinking/loading */}
                <span className={`text-[9px] px-2.5 py-0.5 font-mono font-bold rounded-lg tracking-wider uppercase inline-flex items-center gap-1.5 ${
                  aiLoading 
                    ? "bg-[#D9531E]/10 text-[#D9531E] border border-[#D9531E]" 
                    : "bg-[#1A7F77]/10 text-[#1A7F77] border border-[#1A7F77]/30"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${aiLoading ? "bg-[#D9531E] animate-ping" : "bg-[#1A7F77]"}`} />
                  {aiLoading ? "Thinking..." : "Expert Live"}
                </span>
              </div>

              {/* Patient prefilled vital parameters context context card */}
              <div className="p-4 glass-medical-card border border-white/45 rounded-2xl text-[11px] font-semibold text-[#18181A] space-y-1">
                <span className="text-[8px] font-mono font-bold text-[#D9531E] tracking-widest uppercase block mb-1">
                  REAL-TIME PRE-FILLED INPUT CODES:
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 font-mono uppercase text-[10px]">
                  <div>Vitals checkup: <strong className="text-slate-900 font-mono font-bold">
                    {selectedPatient.gender === "female" 
                      ? `${currentHb.toFixed(1)} Hb` 
                      : `${currentRespiratoryRate} rr`}
                  </strong></div>
                  <div>Chest In-Drawing: <strong className="text-slate-900 font-mono font-bold">
                    {selectedPatient.gender === "female" ? "n/a" : (currentChestInDrawing ? "YES" : "NO")}
                  </strong></div>
                  <div>Stridor sound: <strong className="text-slate-900 font-mono font-bold">
                    {selectedPatient.gender === "female" ? "n/a" : (currentStridor ? "YES" : "NO")}
                  </strong></div>
                  <div>Fever Duration: <strong className="text-slate-900 font-mono font-bold">
                    {currentFeverDays === 0 ? "NONE" : `${currentFeverDays} Days`}
                  </strong></div>
                </div>
              </div>

              {/* Consultation Template Questions (Based on Category) */}
              <div className="space-y-2 pt-2">
                <span className="font-mono font-bold text-[#18181A]/50 uppercase tracking-widest block text-[8px]">
                  Select Clinical Diagnostic template:
                </span>
                
                <div className="flex flex-col md:flex-row gap-2">
                  {selectedPatient.gender === "female" ? (
                    <button
                      onClick={() => {
                        setAiQuery(translations.templateLabelHb);
                        handleConsultAiDoctorInquiry(translations.templateLabelHb);
                      }}
                      className="flex-1 p-3 glass-medical-card hover:bg-white text-left rounded-xl text-[11px] border border-white/50 text-[#18181A] font-mono font-bold transition-all flex items-start gap-2 cursor-pointer shadow-xs"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#D9531E] shrink-0 mt-1.5" />
                      <span>{translations.templateLabelHb}</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setAiQuery(translations.templateLabelPneumonia);
                          handleConsultAiDoctorInquiry(translations.templateLabelPneumonia);
                        }}
                        className="flex-1 p-3 glass-medical-card hover:bg-white text-left rounded-xl text-[11px] border border-white/50 text-[#18181A] font-mono font-bold transition-all flex items-start gap-2 cursor-pointer shadow-xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#1A7F77] shrink-0 mt-1.5" />
                        <span>{translations.templateLabelPneumonia}</span>
                      </button>
                      <button
                        onClick={() => {
                          setAiQuery(translations.templateLabelMedication);
                          handleConsultAiDoctorInquiry(translations.templateLabelMedication);
                        }}
                        className="flex-1 p-3 glass-medical-card hover:bg-white text-left rounded-xl text-[11px] border border-white/50 text-[#18181A] font-mono font-bold transition-all flex items-start gap-2 cursor-pointer shadow-xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#1A7F77] shrink-0 mt-1.5" />
                        <span>{translations.templateLabelMedication}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Inquiry Prompt Form Box */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[8.5px] font-mono font-bold text-[#18181A]/50 uppercase tracking-widest">
                    Field Worker custom query box
                  </label>
                  
                  {/* Voice simulation query recorder */}
                  <button
                    type="button"
                    onClick={handleSimulateVoiceInput}
                    className="text-[9.5px] font-mono font-bold text-[#D9531E] hover:bg-white flex items-center gap-1.5 shrink-0 glass-medical-card px-3 py-1.5 rounded-lg border border-white/50 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {voiceSimulatorActive ? "Listening..." : translations.voicePromptBtn}
                  </button>
                </div>
                
                <div className="relative">
                  <textarea
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder={translations.aiQueryPlaceholder}
                    rows={2}
                    className="w-full text-xs p-4 pr-12 rounded-xl border border-white/40 focus:ring-1 focus:ring-[#1A7F77] focus:outline-none bg-white/70 font-mono font-semibold text-[#18181A] tracking-wide shadow-inner"
                  />
                  
                  <button
                    onClick={() => handleConsultAiDoctorInquiry()}
                    disabled={aiLoading}
                    className="absolute right-3.5 bottom-3.5 p-2 rounded-lg bg-[#18181A] text-white hover:bg-[#1A7F77] transition-all disabled:opacity-50 cursor-pointer text-center border border-transparent"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* AI Expert CDSS Guideline Result Output */}
              {(aiLoading || aiResponse) && (
                <div className="border-t border-[#18181A]/10 pt-4 space-y-2.5">
                  <strong className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#D9531E] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    EXPERTO AI CLINIC DECISION ANALYTIC:
                  </strong>

                  {aiLoading ? (
                    <div className="p-6 glass-medical-card border border-white/50 rounded-2xl flex flex-col items-center justify-center gap-3 text-xs font-mono font-bold text-[#18181A]/60 py-10 text-center animate-pulse">
                      <RefreshCw className="w-6 h-6 text-[#D9531E] animate-spin" />
                      <span>{translations.aiThinking}</span>
                    </div>
                  ) : (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-[#18181A] font-bold leading-relaxed whitespace-pre-line tracking-wide select-text font-serif shadow-inner">
                      {aiResponse}
                    </div>
                  )}
                </div>
              )}

            </section>

            {/* DUAL COLS: VITALS CHECKUP SHEET VS CDSS CHECKS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              {/* COMPONENT A: ACTIVE VITALS ASSESSMENT FORM */}
              <div className="bg-white rounded-3xl p-6 border border-[#E5DFD0] shadow-xs space-y-5 text-left">
                
                <div className="flex items-center gap-2 border-b border-[#FAF7F0] pb-3">
                  <Sliders className="w-4 h-4 text-[#0C2340]" />
                  <h3 className="text-xs font-black text-[#0C2340] uppercase tracking-widest">
                    {selectedPatient.gender === "female" ? translations.maternalHeading : translations.pediatricHeading}
                  </h3>
                </div>

                <div className="space-y-5">
                  
                  {/* Hb Slider for Maternal Female patients */}
                  {selectedPatient.gender === "female" ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[8.5px]">
                          {translations.measuredHemoglobinLabel}
                        </span>
                        <span className="text-sm font-extrabold text-[#0C2340] font-mono px-3 py-1 bg-[#FAF7F0] border border-[#E5DFD0] rounded-xl">
                          {currentHb.toFixed(1)} g/dL
                        </span>
                      </div>
                      
                      <input
                        type="range"
                        min="5.0"
                        max="14.0"
                        step="0.1"
                        value={currentHb}
                        onChange={(e) => setCurrentHb(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#D9531E]"
                      />
                      
                      <div className="flex justify-between text-[8px] font-black tracking-widest text-slate-400 uppercase">
                        <span className="text-red-500">Severe (&lt; 7.0)</span>
                        <span className="text-amber-500">Moderate (7.0 - 9.9)</span>
                        <span className="text-emerald-600">Normal (&gt;= 11.0)</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      
                      {/* Breaths Count Slider for Pediatric patients */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-bold uppercase tracking-widest text-[8.5px]">
                            {translations.measuredRespiratoryLabel}
                          </span>
                          <span className="text-sm font-extrabold text-[#0C2340] font-mono px-3 py-1 bg-[#FAF7F0] border border-[#E5DFD0] rounded-xl">
                            {currentRespiratoryRate} / min
                          </span>
                        </div>
                        
                        <input
                          type="range"
                          min="20"
                          max="85"
                          step="1"
                          value={currentRespiratoryRate}
                          onChange={(e) => setCurrentRespiratoryRate(parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0C2340]"
                        />
                        
                        <div className="flex justify-between text-[8px] font-black tracking-widest text-slate-400 uppercase">
                          <span>Acceptable breaths</span>
                          <span className="text-red-500 font-extrabold">Fast Alert (Threshold: {selectedPatient.ageMonths < 12 ? ">= 50" : ">= 40"})</span>
                        </div>
                      </div>

                      {/* Large Tactile Buttons for retraction and stridor and respiratory parameters */}
                      <div className="space-y-3 pt-1">
                        
                        <button
                          onClick={() => setCurrentChestInDrawing(!currentChestInDrawing)}
                          className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 active:scale-98 transition-all cursor-pointer ${
                            currentChestInDrawing 
                              ? "bg-[#D9531E]/10 border-2 border-[#D9531E] text-slate-900" 
                              : "bg-[#FAF7F0] hover:bg-slate-100/60 border border-[#E5DFD0] text-slate-700"
                          }`}
                        >
                          <div>
                            <span className="text-xs font-black uppercase tracking-widest block">{translations.chestInDrawingLabel}</span>
                            <span className="text-[9px] text-slate-500 block leading-tight mt-0.5">{translations.chestInDrawingSubLabel}</span>
                          </div>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            currentChestInDrawing ? "bg-[#D9531E] text-white" : "bg-slate-200 text-slate-500"
                          }`}>
                            {currentChestInDrawing ? "YES" : "NO"}
                          </div>
                        </button>

                        <button
                          onClick={() => setCurrentStridor(!currentStridor)}
                          className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 active:scale-98 transition-all cursor-pointer ${
                            currentStridor 
                              ? "bg-[#D9531E]/10 border-2 border-[#D9531E] text-slate-900" 
                              : "bg-[#FAF7F0] hover:bg-slate-100/60 border border-[#E5DFD0] text-slate-700"
                          }`}
                        >
                          <div>
                            <span className="text-xs font-black uppercase tracking-widest block">{translations.stridorSoundLabel}</span>
                            <span className="text-[9px] text-slate-500 block leading-tight mt-0.5">{translations.stridorSoundSubLabel}</span>
                          </div>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            currentStridor ? "bg-[#D9531E] text-white" : "bg-slate-200 text-slate-500"
                          }`}>
                            {currentStridor ? "YES" : "NO"}
                          </div>
                        </button>

                      </div>

                    </div>
                  )}

                  {/* Fever Duration Options Selector */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest block">
                      {translations.feverDaysLabel}
                    </label>
                    
                    <div className="grid grid-cols-4 gap-2">
                      {[0, 2, 5, 8].map((days) => (
                        <button
                          key={days}
                          onClick={() => setCurrentFeverDays(days)}
                          className={`py-3 text-xs font-extrabold rounded-2xl border transition-all cursor-pointer ${
                            currentFeverDays === days 
                              ? "bg-[#0C2340] text-white border-[#0C2340] shadow-sm" 
                              : "bg-[#FAF7F0] hover:bg-slate-100 border-[#E5DFD0] text-slate-700"
                          }`}
                        >
                          {days === 0 ? translations.feverNone : `${days} ${translations.feverDaysText}`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Session clinical notes area */}
                  <div className="space-y-1.5">
                    <label className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest block">
                      {translations.sessionNotesLabel}
                    </label>
                    <textarea
                      value={currentVisitNotes}
                      onChange={(e) => setCurrentVisitNotes(e.target.value)}
                      placeholder={translations.sessionNotesPlaceholder}
                      rows={2}
                      className="w-full text-xs p-3 rounded-2xl border border-[#DCD6C7] focus:outline-[#0C2340] bg-[#FAF8F5] font-semibold text-[#0C2340]"
                    />
                  </div>

                </div>

                {/* Main touch-friendly button form submit triggers */}
                <div className="space-y-3 pt-3 border-t border-slate-150">
                  <button
                    onClick={handleSaveVisitDetails}
                    className="w-full h-14 bg-[#0C2340] hover:bg-[#D9531E] text-white text-xs font-bold uppercase rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 select-none active:scale-98 cursor-pointer"
                  >
                    <UserCheck className="w-5 h-5 text-white" />
                    <span>{translations.btnRecordVitals}</span>
                  </button>

                  <button
                    onClick={handlePrintVisitSummary}
                    className="w-full h-14 bg-[#FAF9F5] hover:bg-[#EAE5D8] text-[#0C2340] border-2 border-[#DCD6C7] text-xs font-bold uppercase rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 select-none active:scale-98 cursor-pointer"
                  >
                    <Printer className="w-5 h-5 text-[#D9531E]" />
                    <span>{selectedLanguage === "hi" ? "यात्रा सारांश प्रिंट करें" : (selectedLanguage === "ta" ? "வருகை சுருக்கத்தை அச்சிடுக" : (selectedLanguage === "bn" ? "ভিজিট সারসংক্ষেপ প্রিন্ট করুন" : "Print Visit Summary"))}</span>
                  </button>

                  {assessmentResult.severity === "URGENT" && (
                    <button
                      onClick={handleAmbulanceDispatch}
                      className="w-full h-14 bg-[#D9531E] hover:bg-[#C04216] text-[#FAF9F5] text-xs font-bold uppercase rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 select-none active:scale-98 cursor-pointer"
                    >
                      <Phone className="w-5 h-5 text-[#FAF9F5] animate-bounce" />
                      <span>{translations.btnRequestAmbulance}</span>
                    </button>
                  )}
                </div>

                {/* Inline alerts with transitions */}
                <AnimatePresence>
                  {syncFlash && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="bg-[#1B4D3E]/10 border border-[#1B4D3E] text-emerald-950 p-4 rounded-2xl text-xs font-bold flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-5 fill-[#1B4D3E] text-[#FAF9F5] shrink-0 mt-0.5" />
                      <span>{syncFlash}</span>
                    </motion.div>
                  )}

                  {ambulanceAlertDetails && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="bg-[#D9531E]/10 border border-[#D9531E] text-orange-950 p-4 rounded-2xl text-xs font-bold flex items-start gap-2"
                    >
                      <AlertTriangle className="w-5 fill-[#D9531E] text-[#FAF9F5] shrink-0 mt-0.5" />
                      <span>{ambulanceAlertDetails}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* COMPONENT B: MANUAL DECISION CHECKLIST & AUDIO MODULE */}
              <div id="cdss-recommendations" className="bg-white rounded-3xl p-6 border border-[#E5DFD0] shadow-xs space-y-4">
                
                <div className="flex justify-between items-center border-b border-[#FAF7F0] pb-3">
                  <h3 className="text-xs font-black text-[#0C2340] uppercase tracking-widest flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-[#D9531E]" />
                    CDSS Protocols
                  </h3>

                  {/* Audible simulator audio toggle buttons */}
                  <button
                    onClick={() => triggerPhoneticAudio(selectedPatient.gender === "female" ? "anemia" : (currentChestInDrawing ? "chest_retraction" : "cough"))}
                    className="text-[10px] font-bold text-[#0C2340] flex items-center gap-1 bg-[#FAF7F0] hover:bg-[#EAE5D8] px-3 py-1.5 rounded-xl border border-[#E5DFD0] active:scale-95 transition-all cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{voicePlaying ? "Active Audio" : "Listen Guide"}</span>
                  </button>
                </div>

                {voicePlaying && activePhoneticAudio && (
                  <div className="p-4 bg-[#FAF7F0] border border-[#0C2340] rounded-2xl flex items-start justify-between gap-3 text-xs animate-pulse font-medium select-none">
                    <div className="flex gap-2">
                      <Volume2 className="w-4 h-4 text-[#D9531E] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[8px] text-[#0C2340] uppercase tracking-widest block leading-none mb-1">Regional Speaking simulated help:</span>
                        <p className="italic text-[#0C2340] text-xs font-bold">{activePhoneticAudio}</p>
                      </div>
                    </div>
                    <button
                      onClick={stopPhoneticAudio}
                      className="text-[9px] bg-white border border-[#E5DFD0] py-1 px-2.5 rounded-lg font-bold uppercase hover:bg-slate-50 text-slate-600 block cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {translations.stopVoiceButton}
                    </button>
                  </div>
                )}

                {/* Swasthya Diya Progress Indicator */}
                <DiyaProgress severity={assessmentResult.severity} />

                {/* Active Dynamic Triage Classification Badge */}
                <div
                  style={{ borderColor: assessmentResult.colorHex }}
                  className="p-4 rounded-2xl border-l-[6px] bg-[#FAF8F5] flex items-start gap-3 select-none"
                >
                  <div
                    style={{ backgroundColor: `${assessmentResult.colorHex}15`, color: assessmentResult.colorHex }}
                    className="p-2 rounded-lg shrink-0"
                  >
                    <AlertCircle className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] font-black tracking-widest uppercase text-slate-400 block leading-none">Diagnostic Result</span>
                    <h3 className="text-xs font-extrabold text-[#0C2340] leading-snug">
                      {assessmentResult.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 font-bold leading-normal">
                      {assessmentResult.rationale} <br />
                      <span className="text-[10px] text-[#faf9f5] bg-[#0C2340] px-2 py-0.5 rounded-md mt-1.5 inline-block font-mono font-medium">{translations.classificationNotice}</span>
                    </p>
                  </div>
                </div>

                {/* Multi-lingual side-by-side split checklist panel */}
                <div className="space-y-4">
                  
                  {/* English IMCI Checklist */}
                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E5DFD0] space-y-1.5">
                    <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[#0C2340] block pb-1 border-b border-[#E5DFD0]">
                      {translations.checklistEnTitle}
                    </span>
                    <ul className="space-y-2 text-[11px] font-bold text-slate-700 leading-relaxed list-none">
                      {assessmentResult.checklistEnglish.map((item, index) => (
                        <li key={index} className="flex items-start gap-1.5">
                          <span className="text-[#D9531E] shrink-0 mt-0.5 font-extrabold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* regional translated checklist guidance */}
                  {selectedLanguage !== "en" && (
                    <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E5DFD0] space-y-1.5">
                      <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[#D9531E] block pb-1 border-b border-[#E5DFD0]">
                        {translations.checklistLocalTitle} ({LANGUAGES[langKey]?.name || "Local"})
                      </span>
                      <ul className="space-y-2 text-[11px] font-bold text-slate-700 leading-relaxed list-none">
                        {assessmentResult.checklist.map((item, index) => (
                          <li key={index} className="flex items-start gap-1.5">
                            <span className="text-[#0C2340] shrink-0 mt-0.5 font-extrabold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

              </div>
              
            </div>

            {/* LONGITUDINAL TRAJECTORY EVALUATIONS PANEL */}
            <div className="space-y-6 pt-2">
              
              {/* Dynamic Recharts Trend Line Chart */}
              <div className="bg-white rounded-3xl p-6 border-2 border-[#E5DFD0] shadow-xs space-y-4">
                <div className="flex justify-between items-center border-b border-[#FAF7F0] pb-3">
                  <div>
                    <h3 className="text-xs font-black text-[#0C2340] uppercase tracking-widest flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-[#B5451B]" />
                      Longitudinal Trend Analyzer
                    </h3>
                    <p className="text-[9px] text-slate-500 font-bold uppercase font-mono tracking-wider">
                      {selectedPatient.gender === "female" ? "Maternal Hemoglobin Level (Hb) progression" : "Pediatric Respiratory Rate (RR) trends"}
                    </p>
                  </div>
                  <span className="text-[8.5px] px-2.5 py-1 bg-[#1A7F77]/10 text-[#1A7F77] border border-[#1A7F77]/30 rounded-lg font-bold font-mono uppercase tracking-wider">
                    WHO Standards Mapped
                  </span>
                </div>

                <div className="w-full h-[240px] pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={selectedPatient.history.slice().map((record, idx) => ({
                        date: record.timestamp || `Visit ${idx + 1}`,
                        value: selectedPatient.gender === "female" ? record.hemoglobin : record.respiratoryRate,
                      }))}
                      margin={{ top: 10, right: 20, left: -20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#FAF2E1" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#0C2340" 
                        fontSize={9} 
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(val) => {
                          if (!val) return "";
                          const parts = val.split("-");
                          return parts.length === 3 ? `${parts[2]}/${parts[1]}` : val;
                        }}
                        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                      />
                      <YAxis 
                        stroke="#0C2340" 
                        fontSize={9} 
                        tickLine={false}
                        axisLine={false}
                        domain={selectedPatient.gender === "female" ? [5, 15] : [20, 80]}
                        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(255, 248, 235, 0.95)", 
                          borderColor: "rgba(244, 162, 40, 0.4)", 
                          borderRadius: "16px",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#0C2340",
                          boxShadow: "0 8px 24px rgba(181, 69, 27, 0.08)"
                        }}
                        labelStyle={{ color: "#B5451B", fontWeight: 700 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name={selectedPatient.gender === "female" ? "Hemoglobin (g/dL)" : "Respiratory Rate (/min)"}
                        stroke="#1A7F77" 
                        strokeWidth={3} 
                        dot={{ r: 5, stroke: "#1A7F77", strokeWidth: 2, fill: "#FFF" }}
                        activeDot={{ r: 8, fill: "#F4A228", stroke: "#0C2340", strokeWidth: 2 }}
                      />
                      <ReferenceLine 
                        y={selectedPatient.gender === "female" ? 11.0 : (selectedPatient.ageMonths < 12 ? 50 : 40)} 
                        stroke="#B5451B" 
                        strokeDasharray="4 4"
                        label={{ 
                          value: selectedPatient.gender === "female" ? "Normal Hb Min (11.0)" : `Fast RR Max (${selectedPatient.ageMonths < 12 ? "50" : "40"})`, 
                          position: "top", 
                          fill: "#B5451B", 
                          fontSize: 8,
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 700
                        }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Dynamic trajectory comparison check summary and history grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Dynamic trajectory comparison check summary */}
                <div className="bg-white rounded-3xl p-5 border border-[#E5DFD0] shadow-xs space-y-3">
                  <h3 className="text-xs font-black text-[#0C2340] uppercase tracking-widest flex items-center gap-1.5 border-b border-[#FAF7F0] pb-2">
                    <Layers className="w-4 h-4 text-[#D9531E]" />
                    {translations.longitudinalInsightTitle}
                  </h3>

                  <div className="p-4 bg-[#FAF8F5] border border-[#E3DCCB] rounded-2xl">
                    <p className="text-xs leading-relaxed text-[#0C2340] font-bold italic whitespace-pre-line">
                      {clinicalComparisonInsight}
                    </p>
                  </div>
                </div>

              {/* TIMELINE VISITS SUMMARY LIST */}
              <div className="bg-white rounded-3xl p-5 border border-[#E5DFD0] shadow-xs space-y-4">
                <h3 className="text-xs font-black text-[#0C2340] uppercase tracking-widest flex items-center gap-1.5 border-b border-[#FAF7F0] pb-2">
                  <Clock className="w-4 h-4 text-[#0C2340]" />
                  Visit Log History ({selectedPatient.history.length})
                </h3>

                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                  {selectedPatient.history.slice().reverse().map((visit) => {
                    const isSevere = visit.triageSeverity === "URGENT";
                    const isMod = visit.triageSeverity === "MED";
                    const itemColor = isSevere 
                      ? "border-[#D9531E] bg-[#D9531E]/5" 
                      : isMod 
                      ? "border-amber-400 bg-amber-50/50" 
                      : "border-[#1B4D3E] bg-[#1B4D3E]/5";

                    return (
                      <div key={visit.id} className={`p-3.5 rounded-2xl border-l-[4px] ${itemColor} space-y-2`}>
                        <div className="flex items-center justify-between gap-2 text-[10px] font-mono font-bold">
                          <span className="flex items-center gap-1 text-slate-500">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {visit.timestamp}
                          </span>
                          <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isSevere 
                              ? "bg-[#D9531E]/15 text-[#D9531E]" 
                              : isMod 
                              ? "bg-amber-100 text-amber-900" 
                              : "bg-[#1B4D3E]/15 text-[#1B4D3E]"
                          }`}>
                            {visit.triageSeverity}
                          </span>
                        </div>

                        <p className="text-xs font-bold text-slate-800 leading-snug">
                          {getLocalizedText(visit.statusText, selectedLanguage)}
                        </p>

                        <div className="flex flex-wrap gap-2 text-[9px] font-mono text-slate-500 pt-1 border-t border-slate-100/50">
                          {visit.hemoglobin !== undefined && (
                            <span>Hb: <strong>{visit.hemoglobin} g/dL</strong></span>
                          )}
                          {visit.respiratoryRate !== undefined && (
                            <span>Resp Rate: <strong>{visit.respiratoryRate}/min</strong></span>
                          )}
                          {visit.chestInDrawing !== undefined && (
                            <span>Chest Retraction: <strong>{visit.chestInDrawing ? "YES" : "NO"}</strong></span>
                          )}
                          {visit.stridor !== undefined && (
                            <span>Stridor: <strong>{visit.stridor ? "YES" : "NO"}</strong></span>
                          )}
                          {visit.feverDays !== undefined && visit.feverDays > 0 && (
                            <span>Fever Days: <strong>{visit.feverDays}d</strong></span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

          </div>

          </div>
          </div>
        )}

        {/* Persistent Floating 'Register New Patient' FAB in Registry View */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            id="persistent-register-fab"
            onClick={() => {
              setIsRegistering(true);
              setRegStep(1);
            }}
            className="bg-[#1A7F77] hover:bg-[#135E58] text-white py-4 px-6 rounded-full shadow-[0_12px_30px_0_rgba(26,127,119,0.35)] hover:shadow-[0_16px_40px_0_rgba(26,127,119,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 font-mono font-bold text-xs uppercase tracking-widest border border-white/20 cursor-pointer animate-fade-in"
          >
            <UserPlus className="w-5 h-5 text-white" />
            <span>Register New Patient</span>
          </button>
        </div>
        </div>
        ) : (
        /* AI KNOWLEDGE BASE MODULE */
        <div id="ai-knowledge-base" className="space-y-6 animate-fade-in pb-12">
          
          {/* Intro Header */}
          <div className="bg-[#2D4B38]/95 backdrop-blur-md text-[#FAF9F5] rounded-3xl p-6 shadow-md border border-[#3B5E49] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 select-none">
            <div>
              <h2 className="text-2xl font-serif italic text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#FFD23F]" />
                WHO-IMCI Diagnostic Triage Knowledge Base
              </h2>
              <p className="text-xs text-slate-100 mt-1">
                Offline-First clinical guidance manuals, checklists, and automated rapid-decision lookup algorithms.
              </p>
            </div>
            <div className="bg-amber-500/15 border border-amber-500/45 rounded-xl px-4 py-2 text-[#FFD23F] text-xs font-bold font-mono shrink-0">
              📙 PROTOCOL VERSION 2.4 (ACTIVE)
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: GUIDELINE HANDBOOKS LIST (5 Cols on desktop) */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">Verified Diagnostic Manuals</span>
              
              {/* Manual 1 */}
              <div className="bg-white/70 backdrop-blur-md border border-[#E5DFD0] rounded-3xl p-5 hover:bg-white transition-all space-y-2">
                <h3 className="text-xs font-extrabold text-[#0C2340] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D9531E]" />
                  Pediatric Respiratory Infections (Pneumonia)
                </h3>
                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                  Standard IMCI checks for fast breathing rates and physical danger tags (chest retraction, stridor in calm child).
                </p>
                <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-slate-100 text-[10px] font-mono font-bold text-slate-500 space-y-1">
                  <div>• RR &gt;= 50/min if age is 2 - 11 months old</div>
                  <div>• RR &gt;= 40/min if age is 12 - 59 months old</div>
                </div>
              </div>

              {/* Manual 2 */}
              <div className="bg-white/70 backdrop-blur-md border border-[#E5DFD0] rounded-3xl p-5 hover:bg-white transition-all space-y-2">
                <h3 className="text-xs font-extrabold text-[#0C2340] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                  Gestational Maternal Anaemia Parameters
                </h3>
                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                  Clinical classifications of prenatal maternal hemoglobin status to schedule timely, life-saving IFA and deworming.
                </p>
                <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-slate-100 text-[10px] font-mono font-bold text-slate-500 space-y-1">
                  <div>• Normal Hb: &gt;= 11.0 g/dL</div>
                  <div>• Moderate: 7.0 - 10.9 g/dL</div>
                  <div>• Critical Severe: &lt; 7.0 g/dL</div>
                </div>
              </div>

              {/* Manual 3 */}
              <div className="bg-white/70 backdrop-blur-md border border-[#E5DFD0] rounded-3xl p-5 hover:bg-white transition-all space-y-2">
                <h3 className="text-xs font-extrabold text-[#0C2340] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Infectious Malaria & High Fever Assessment
                </h3>
                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                  Triage standards for childhood fevers in malaria-prone areas, monitoring length of symptoms and local endemic history.
                </p>
              </div>

              {/* Manual 4 */}
              <div className="bg-white/70 backdrop-blur-md border border-[#E5DFD0] rounded-3xl p-5 hover:bg-white transition-all space-y-2">
                <h3 className="text-xs font-extrabold text-[#0C2340] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Diarrheal Hydration Treatment Plans
                </h3>
                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                  Integrated management checks to deploy Hydration Plan A (home support), Plan B (supervised ORS clinic), or Plan C (intravenous).
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: OFFLINE DYNAMIC TRIAGE CALCULATOR & AI HELPDESK CHATBOX (7 Cols on desktop) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Card 1: Sandbox Simulator */}
              <div className="bg-white/70 backdrop-blur-md border border-[#E5DFD0] rounded-3xl p-6 shadow-xs space-y-4">
                <div className="border-b border-[#FAF7F0] pb-2 flex justify-between items-center select-none">
                  <div>
                    <h3 className="text-sm font-black text-[#0C2340] uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-[#D9531E]" />
                      Offline Quick-Triage Sandbox Simulator
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium">Verify classifications instantly without compiling clinical logs</p>
                  </div>
                  <span className="bg-[#1B4D3E]/10 border border-[#1B4D3E]/20 text-[#1B4D3E] text-[8.5px] font-mono font-extrabold px-2.5 py-0.5 rounded uppercase font-sans">Verified Offline</span>
                </div>

                {/* Sandbox Calculator render */}
                {renderSandboxCalculator()}
              </div>

              {/* Card 2: AI Health Query Chatbox Helpdesk */}
              <div id="kb-chatbox-container" className="bg-white border-2 border-[#DCD6C7] rounded-4xl p-6 shadow-sm flex flex-col space-y-4 h-[440px]">
                
                {/* Header */}
                <div className="flex justify-between items-center pb-2.5 border-b border-[#FAF7F0] shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] flex items-center justify-center border border-[#DCD6C7]">
                      <MessageSquare className="w-4 h-4 text-[#D9531E]" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-[#0C2340]">
                        ASHA AI Health Advisor Desk
                      </h3>
                      <p className="text-[8.5px] uppercase font-mono font-bold text-slate-400">
                        WHO Policy & Guideline Assistant
                      </p>
                    </div>
                  </div>

                  <span className={`text-[8.5px] px-2 py-0.5 font-bold rounded-full tracking-wider uppercase inline-flex items-center gap-1 ${
                    isOnline 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                    {isOnline ? "AI Live Engine" : "Offline Rule Engine"}
                  </span>
                </div>

                {/* Active CDSS Mode Indicator */}
                <div className="flex items-center justify-between gap-1 px-2.5 py-1.5 bg-[#FAF8F5] rounded-xl border border-[#E5DFD0] shrink-0">
                  <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">
                    Engine Mode:
                  </span>
                  <span className="text-[9px] font-bold text-[#0C2340] uppercase font-mono">
                    CDSS Active (gemini-3.1-flash-lite)
                  </span>
                </div>

                {/* Conversation Scrollable Body */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0 text-xs custom-scrollbar">
                  {kbChatHistory.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div className={`p-3 rounded-2xl max-w-[85%] font-medium leading-relaxed shadow-3xs whitespace-pre-line ${
                        msg.sender === "user" 
                          ? "bg-[#0C2340] text-white rounded-tr-none" 
                          : "bg-[#FAF8F5] text-[#0C2340] border border-[#E5DFD0] rounded-tl-none font-semibold text-[11.5px]"
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] font-mono font-bold text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                    </div>
                  ))}

                  {kbLoading && (
                    <div className="flex items-center gap-2 bg-[#FAF7F0] border border-[#E5DFD0] p-3 rounded-2xl rounded-tl-none max-w-[60%] self-start animate-pulse">
                      <RefreshCw className="w-3.5 h-3.5 text-[#D9531E] animate-spin shrink-0" />
                      <span className="text-[10px] font-bold text-slate-500">Consulting AI Doctor Advisor...</span>
                    </div>
                  )}
                </div>

                {/* Quick Suggestion Clickable Tag Bar */}
                <div className="flex flex-wrap gap-1.5 pt-1.5 shrink-0 select-none">
                  {[
                    selectedLanguage === "hi" ? "सांस दर की सीमाएं" : "Fast breathing rates",
                    selectedLanguage === "hi" ? "पानी की कमी की योजनाएं" : "Diarrhea hydration plans",
                    selectedLanguage === "hi" ? "एनीमिया वर्गीकरण" : "Anemia severity tables",
                    selectedLanguage === "hi" ? "नवजात शिशु सुरक्षा" : "Newborn care and warmth"
                  ].map((topic, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setKbQuery(topic);
                      }}
                      className="text-[9px] font-bold px-2 py-1 bg-[#FAF7F0] hover:bg-[#EAE5D8] border border-[#E5DFD0] text-slate-600 rounded-lg transition-all active:scale-95 cursor-pointer"
                    >
                      💡 {topic}
                    </button>
                  ))}
                </div>

                {/* Form Input Query Box Area */}
                <form 
                  onSubmit={handleKbChatSubmit}
                  className="flex gap-2 items-center pt-2 border-t border-slate-100 shrink-0"
                >
                  <input
                    type="text"
                    value={kbQuery}
                    onChange={(e) => setKbQuery(e.target.value)}
                    placeholder="Ask about breathing RR, IFA tablets, dehydration plans..."
                    className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-[#DCD6C7] focus:outline-[#0C2340] bg-[#FAF8F5] font-semibold text-[#0C2340]"
                  />
                  <button
                    type="submit"
                    disabled={kbLoading || !kbQuery.trim()}
                    className="p-2.5 bg-[#0C2340] hover:bg-[#D9531E] hover:rotate-12 hover:scale-105 active:scale-90 text-white rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-40"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
      )}

      </main>

      {/* CLINCAL SYSTEM FOOTER */}
      <footer className="bg-[#0C2340] border-t border-[#132A46] py-5 px-6 text-center text-xs text-slate-400 font-medium select-none mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <span>
            ASHA National Digital Healthcare Registry Portal • WHO IMCI Clinical-Grade Decision Support System mapping.
          </span>
          <span className="font-mono text-[10px] text-slate-500">
            {translations.offlineSafeTitle} • CARRIER GATEWAY SECURE GATEWAY ONLINE
          </span>
        </div>
      </footer>

      {/* Dynamic Training Help manual Slideover side-drawer */}
      <AnimatePresence mode="wait">
        {isHelpOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsHelpOpen(false)}
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
              />
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 220 }}
                  className="pointer-events-auto h-full w-screen max-w-md bg-[#FAF9F5] border-l border-[#DCD6C7] flex flex-col shadow-2xl"
                >
                  <div className="flex flex-col h-full overflow-y-scroll">
                    {/* Header */}
                    <div className="bg-[#0C2340] px-6 py-5 flex items-center justify-between border-b border-[#132A46] sticky top-0 z-10 shrink-0">
                      <div>
                        <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#D9531E] leading-none mb-1">National Swasthya®</h3>
                        <h2 className="text-base font-serif italic text-white">{translations.manualTitle}</h2>
                      </div>
                      <button
                        onClick={() => setIsHelpOpen(false)}
                        className="rounded-xl p-2 bg-[#1A3354] border border-[#2B4B74] text-slate-300 hover:text-white cursor-pointer hover:bg-[#2B4B74] transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content Scroll */}
                    <div className="p-6 space-y-6">
                      
                      {/* Section 1: User Steps */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-black text-[#0C2340] uppercase tracking-wider flex items-center gap-1.5 border-b border-orange-100 pb-1.5 font-sans">
                          <CheckSquare className="w-4 h-4 text-[#D9531E]" />
                          {translations.manualStepTitle}
                        </h3>
                        <ol className="space-y-2 text-slate-700 text-xs font-bold leading-relaxed list-decimal list-inside">
                          <li>{translations.manualStep1}</li>
                          <li>{translations.manualStep2}</li>
                          <li>{translations.manualStep3}</li>
                          <li>{translations.manualStep4}</li>
                        </ol>
                      </div>

                      {/* Section 2: F.A.Q. */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-black text-[#0C2340] uppercase tracking-wider flex items-center gap-1.5 border-b border-orange-100 pb-1.5 font-sans">
                          <HelpCircle className="w-4 h-4 text-[#D9531E]" />
                          {translations.manualFaqTitle}
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-1.5 p-3.5 bg-white border border-[#E5DFD0] rounded-2xl">
                            <h4 className="text-xs font-bold text-[#0C2340]">{translations.manualFaqQ1}</h4>
                            <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                              {translations.manualFaqA1}
                            </p>
                          </div>
                          <div className="space-y-1.5 p-3.5 bg-white border border-[#E5DFD0] rounded-2xl">
                            <h4 className="text-xs font-bold text-[#0C2340]">{translations.manualFaqQ2}</h4>
                            <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                              {translations.manualFaqA2}
                            </p>
                          </div>
                          <div className="space-y-1.5 p-3.5 bg-white border border-[#E5DFD0] rounded-2xl">
                            <h4 className="text-xs font-bold text-[#0C2340]">{translations.manualFaqQ3}</h4>
                            <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                              {translations.manualFaqA3}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Training Notice */}
                      <div className="p-4 bg-[#FAF7F0] border border-[#E5DFD0] rounded-2xl text-[10px] font-mono font-bold leading-normal text-slate-500 uppercase tracking-wide">
                        {translations.manualNotice}
                      </div>

                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Clinical Admission Admissions Wizard Modal */}
      <AnimatePresence mode="wait">
        {isRegistering && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsRegistering(false)}
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
              />
              
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="relative transform overflow-hidden rounded-3xl glass-medical p-6 text-left shadow-[0_24px_60px_0_rgba(162,185,168,0.25)] transition-all w-full max-w-lg z-10 space-y-6 border border-white/60"
              >
                {/* Header */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-extrabold text-[#D9531E] uppercase tracking-widest block leading-none">Admission registry card</span>
                    <h3 className="text-lg font-serif italic text-[#0C2340] leading-none">ASHA Worker Enrollment Admission</h3>
                  </div>
                  <button
                    onClick={() => setIsRegistering(false)}
                    className="rounded-xl p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Steps Progress Tracker */}
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <div className={`pb-1.5 border-b-2 ${regStep >= 1 ? "border-[#0C2340] text-[#0C2340]" : "border-slate-200"}`}>1. Basics</div>
                  <div className={`pb-1.5 border-b-2 ${regStep >= 2 ? "border-[#0C2340] text-[#0C2340]" : "border-slate-200"}`}>2. Demo</div>
                  <div className={`pb-1.5 border-b-2 ${regStep >= 3 ? "border-[#0C2340] text-[#0C2340]" : "border-slate-200"}`}>3. Vitals</div>
                  <div className={`pb-1.5 border-b-2 ${regStep >= 4 ? "border-[#0C2340] text-[#0C2340]" : "border-slate-200"}`}>4. Confirm</div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleRegisterPatientSubmit(); }} className="space-y-4">
                  
                  {/* STEP 1: Name and Category */}
                  {regStep === 1 && (
                    <div className="space-y-4 animate-fade-in text-left">
                      <div className="space-y-1.5">
                        <label className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest block">Patient Full Name</label>
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="e.g. Priyanjali Sen"
                          className="w-full text-xs p-3 rounded-2xl border border-[#DCD6C7] bg-white font-bold text-[#0C2340]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest block">Patient Group / Category</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setRegGender("female")}
                            className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                              regGender === "female" 
                                ? "border-[#0C2340] bg-[#0C2340]/5" 
                                : "border-slate-200 bg-white"
                            }`}
                          >
                            <span className="text-2xl block mb-1">🤰</span>
                            <span className="text-xs font-extrabold text-[#0C2340] block">Maternal Prenatal</span>
                            <span className="text-[10px] text-slate-500 font-semibold block leading-tight mt-0.5">Gestational pregnancy follow-ups</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setRegGender("male")}
                            className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                              regGender === "male" 
                                ? "border-[#0C2340] bg-[#0C2340]/5" 
                                : "border-slate-200 bg-white"
                            }`}
                          >
                            <span className="text-2xl block mb-1">👶</span>
                            <span className="text-xs font-extrabold text-[#0C2340] block">Child / Pediatric</span>
                            <span className="text-[10px] text-slate-500 font-semibold block leading-tight mt-0.5">Infants (0-59 months) respiratory triage</span>
                          </button>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex justify-end">
                        <button
                          type="button"
                          disabled={!regName.trim()}
                          onClick={() => setRegStep(2)}
                          className="bg-[#0C2340] hover:bg-[#D9531E] text-white text-xs font-bold uppercase py-3 px-6 rounded-xl transition-all cursor-pointer disabled:opacity-40"
                        >
                          Next Step
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Demographics */}
                  {regStep === 2 && (
                    <div className="space-y-4 animate-fade-in text-left">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest block">
                            {regGender === "female" ? "Age in Years" : "Age in Months"}
                          </label>
                          <input
                            type="number"
                            required
                            min={regGender === "female" ? 15 : 2}
                            max={regGender === "female" ? 50 : 59}
                            value={regAge}
                            onChange={(e) => setRegAge(e.target.value)}
                            placeholder={regGender === "female" ? "e.g. 24" : "e.g. 18"}
                            className="w-full text-xs p-3 rounded-2xl border border-[#DCD6C7] bg-white font-bold text-[#0C2340]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest block">Village Sector</label>
                          <select
                            value={regVillage}
                            onChange={(e) => setRegVillage(e.target.value)}
                            className="w-full text-xs p-3 rounded-2xl border border-[#DCD6C7] bg-white font-bold text-[#0C2340]"
                          >
                            <option value="Karanpur Sector">Karanpur Sector</option>
                            <option value="Sultanpur Sector">Sultanpur Sector</option>
                            <option value="Ramgarh Sector">Ramgarh Sector</option>
                            <option value="Gopalpur Sector">Gopalpur Sector</option>
                            <option value="Bikrampur Sector">Bikrampur Sector</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest block">
                          {regGender === "female" ? "Spouse Name" : "Guardian Parent Name"}
                        </label>
                        <input
                          type="text"
                          required
                          value={regSpouseOrGuardian}
                          onChange={(e) => setRegSpouseOrGuardian(e.target.value)}
                          placeholder="e.g. Rajesh Kumar"
                          className="w-full text-xs p-3 rounded-2xl border border-[#DCD6C7] bg-white font-bold text-[#0C2340]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest block">Contact Number</label>
                          <input
                            type="text"
                            required
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            placeholder="e.g. +91 94120 12345"
                            className="w-full text-xs p-3 rounded-2xl border border-[#DCD6C7] bg-white font-bold text-[#0C2340]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest block">Email Address (Optional)</label>
                          <input
                            type="text"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="e.g. parent@gmail.com"
                            className="w-full text-xs p-3 rounded-2xl border border-[#DCD6C7] bg-white font-bold text-[#0C2340]"
                          />
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setRegStep(1)}
                          className="border border-[#E5DFD0] hover:bg-slate-100 text-slate-700 text-xs font-bold uppercase py-3 px-6 rounded-xl transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          disabled={!regAge || !regSpouseOrGuardian.trim() || !regPhone.trim()}
                          onClick={() => setRegStep(3)}
                          className="bg-[#0C2340] hover:bg-[#D9531E] text-white text-xs font-bold uppercase py-3 px-6 rounded-xl transition-all cursor-pointer disabled:opacity-40"
                        >
                          Next Step
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Intake Vitals */}
                  {regStep === 3 && (
                    <div className="space-y-4 animate-fade-in text-left">
                      <div className="space-y-1.5">
                        <label className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest block">Primary Complaint / Intake Notes</label>
                        <textarea
                          required
                          value={regPrimaryIssue}
                          onChange={(e) => setRegPrimaryIssue(e.target.value)}
                          placeholder="e.g. Experiencing mild breathlessness and symptoms check during pregnancy..."
                          rows={3}
                          className="w-full text-xs p-3 rounded-2xl border border-[#DCD6C7] bg-white font-semibold text-[#0C2340]"
                        />
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setRegStep(2)}
                          className="border border-[#E5DFD0] hover:bg-slate-100 text-slate-700 text-xs font-bold uppercase py-3 px-6 rounded-xl transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          disabled={!regPrimaryIssue.trim()}
                          onClick={() => setRegStep(4)}
                          className="bg-[#0C2340] hover:bg-[#D9531E] text-white text-xs font-bold uppercase py-3 px-6 rounded-xl transition-all cursor-pointer disabled:opacity-40"
                        >
                          Confirm & Review
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Review Admission details */}
                  {regStep === 4 && (
                    <div className="space-y-4 animate-fade-in text-left">
                      <div className="bg-[#FAF8F5] border border-[#E5DFD0] p-4 rounded-2xl space-y-3.5 text-xs text-slate-700">
                        <h4 className="font-extrabold uppercase text-[#0C2340] tracking-wider text-[10px]">Verification Summary Sheets</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div>Patient Name: <strong className="text-[#0C2340]">{regName}</strong></div>
                          <div>Group: <strong className="text-[#0C2340]">{regGender === "female" ? "Maternal prenatal" : "Pediatric child"}</strong></div>
                          <div>Age: <strong className="text-[#0C2340]">{regAge} {regGender === "female" ? "years" : "months"}</strong></div>
                          <div>Village: <strong className="text-[#0C2340]">{regVillage}</strong></div>
                          <div className="col-span-2">Contact spouse/parent: <strong className="text-[#0C2340]">{regSpouseOrGuardian}</strong></div>
                        </div>
                        <div className="pt-2 border-t border-slate-200/50">
                          Intake Issue Description: <p className="italic font-bold text-[#0C2340] mt-1 pr-1">{regPrimaryIssue}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setRegStep(3)}
                          className="border border-[#E5DFD0] hover:bg-slate-100 text-slate-700 text-xs font-bold uppercase py-3 px-6 rounded-xl transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="bg-[#D9531E] hover:bg-[#C04216] text-[#FAF9F5] text-xs font-bold uppercase py-3 px-8 rounded-xl transition-all cursor-pointer shadow-md"
                        >
                          Confirm Registration Admission
                        </button>
                      </div>
                    </div>
                  )}

                </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* PERSONAL ACCOUNT MODAL */}
      <AnimatePresence>
        {isAccountModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAccountModalOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white border border-[#E5DFD0] rounded-3xl max-w-md w-full p-6 shadow-2xl z-10"
            >
              <button
                onClick={() => setIsAccountModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-4 pt-2">
                <div className="w-16 h-16 bg-[#0C2340]/10 border border-[#0C2340]/25 rounded-full flex items-center justify-center mx-auto text-[#0C2340]">
                  <User className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-[#0C2340]">Smt. Lalita Bai</h3>
                  <p className="text-xs text-[#D9531E] font-extrabold uppercase tracking-widest mt-0.5">Accredited Social Health Activist (ASHA)</p>
                </div>

                <div className="border-t border-b border-[#FAF7F0] py-3 text-left space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">ASHA ID:</span>
                    <span className="font-extrabold font-mono text-[#0C2340]">ASHA-MP-4920</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Sub-Center:</span>
                    <span className="font-extrabold text-[#0C2340]">Pipariya Primary Health Center</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Village Sector:</span>
                    <span className="font-extrabold text-[#0C2340]">Ghansore Block Region</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Assigned Patients:</span>
                    <span className="font-extrabold text-[#0C2340]">5 Active Registered</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsAccountModalOpen(false)}
                  className="w-full bg-[#0C2340] hover:bg-[#D9531E] text-white text-xs font-bold py-3.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer"
                >
                  Close Profile Panel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CLINICAL SETTINGS MODAL */}
      <AnimatePresence>
        {isSettingsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white border border-[#E5DFD0] rounded-3xl max-w-md w-full p-6 shadow-2xl z-10"
            >
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-3 border-b border-[#FAF7F0]">
                  <div className="w-10 h-10 bg-[#D9531E]/10 border border-[#D9531E]/25 rounded-xl flex items-center justify-center text-[#D9531E]">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#0C2340]">{translations.settingsLabel}</h3>
                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">CDSS Settings Configuration</p>
                  </div>
                </div>

                {/* Configuration Options */}
                <div className="space-y-4 text-xs text-slate-700 py-2">
                  {/* Option: Audio Guide Speed */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {translations.settingsAudioSpeed}
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsSlowAudio(false)}
                        className={`flex-1 py-2 text-center rounded-xl font-bold border transition-all cursor-pointer ${
                          !isSlowAudio
                            ? "bg-[#0C2340] border-[#0C2340] text-white"
                            : "bg-white border-[#E5DFD0] text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        Normal Speed
                      </button>
                      <button
                        onClick={() => setIsSlowAudio(true)}
                        className={`flex-1 py-2 text-center rounded-xl font-bold border transition-all cursor-pointer ${
                          isSlowAudio
                            ? "bg-[#0C2340] border-[#0C2340] text-white"
                            : "bg-white border-[#E5DFD0] text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        Slow Comfort Speed
                      </button>
                    </div>
                  </div>

                  {/* Reset Database option */}
                  <div className="pt-3 border-t border-[#FAF7F0] space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-[#0C2340] block">{translations.settingsClearCache}</span>
                        <span className="text-[10px] text-slate-400 block font-medium mt-1">Reset patients back to initial state</span>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm("Reset clinical database registry back to default template?")) {
                            localStorage.removeItem("asha_cdss_registry_db");
                            localStorage.removeItem("asha_cdss_sync_state");
                            window.location.reload();
                          }
                        }}
                        className="py-2 px-4 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition-all text-[11px] cursor-pointer flex items-center gap-1.5"
                      >
                        <Database className="w-3.5 h-3.5" />
                        <span>Reset DB</span>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="w-full bg-[#0C2340] hover:bg-[#D9531E] text-white text-xs font-bold py-3.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer"
                >
                  Save Settings & Exit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Git Version History Ledger Slideover side-drawer */}
      <AnimatePresence mode="wait">
        {isGitLogOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsGitLogOpen(false)}
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
              />
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 220 }}
                  className="pointer-events-auto h-full w-screen max-w-md bg-[#FAF9F5] border-l border-[#DCD6C7] flex flex-col shadow-2xl"
                >
                  <div className="flex flex-col h-full overflow-y-scroll">
                    {/* Header */}
                    <div className="bg-[#0C2340] px-6 py-5 flex items-center justify-between border-b border-[#132A46] sticky top-0 z-10 shrink-0 font-sans">
                      <div>
                        <h3 className="text-sm font-extrabold uppercase tracking-widest text-teal-400 leading-none mb-1">Git Core Ledger</h3>
                        <h2 className="text-base font-serif italic text-white">Registry Database Version Control</h2>
                      </div>
                      <button
                        onClick={() => setIsGitLogOpen(false)}
                        className="rounded-xl p-2 bg-[#1A3354] border border-[#2B4B74] text-slate-300 hover:text-white cursor-pointer hover:bg-[#2B4B74] transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6 font-sans">
                      <div className="p-4 bg-white border border-[#E5DFD0] rounded-2xl">
                        <div className="flex items-center gap-2 mb-2 text-teal-700">
                          <GitBranch className="w-5 h-5 stroke-[2.5]" />
                          <h4 className="text-xs font-black uppercase tracking-wider font-sans">Active Ledger Branch</h4>
                        </div>
                        <p className="text-xs text-slate-600 font-bold leading-normal font-sans">
                          Showing real-time micro-commits for each patient registry modification. Every action generates a rollback point, allowing ASHA workers to restore earlier database states.
                        </p>
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-between items-center text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wide">
                          <span>Total commits:</span>
                          <span className="text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">{gitCommits.length}</span>
                        </div>
                      </div>

                      {/* Timeline of commits */}
                      <div className="relative border-l border-[#DCD6C7] ml-3.5 pl-5 space-y-6">
                        {gitCommits.map((commit, index) => {
                          const dateObj = new Date(commit.timestamp);
                          const dateString = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
                          const timeString = dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

                          // Style depending on type
                          const typeColors: Record<string, { bg: string, text: string, border: string, dot: string }> = {
                            CREATE_PATIENT: { bg: "bg-emerald-50", text: "text-emerald-900 border-emerald-300", border: "border-emerald-200", dot: "bg-emerald-600" },
                            ADD_VISIT: { bg: "bg-[#B5451B]/10", text: "text-[#B5451B]", border: "border-[#B5451B]/35", dot: "bg-[#B5451B]" },
                            UPDATE_VACCINE: { bg: "bg-amber-50", text: "text-amber-950", border: "border-amber-200", dot: "bg-amber-600" },
                            ADD_VACCINE: { bg: "bg-emerald-50", text: "text-emerald-950", border: "border-emerald-200", dot: "bg-emerald-600" },
                            DELETE_VACCINE: { bg: "bg-[#B5451B]/10", text: "text-[#B5451B]", border: "border-[#B5451B]/20", dot: "bg-[#B5451B]" },
                            ROLLBACK: { bg: "bg-[#1A7F77]/10", text: "text-[#1A7F77]", border: "border-[#1A7F77]/30", dot: "bg-[#1A7F77]" }
                          };

                          const style = typeColors[commit.type] || { bg: "bg-slate-50", text: "text-slate-800", border: "border-slate-200", dot: "bg-slate-600" };

                          const handleRollback = () => {
                            if (!commit.snapshot) {
                              alert("No snapshot available for this initial commit.");
                              return;
                            }
                            if (window.confirm(`Are you sure you want to rollback the patient database registry to the state at commit ${commit.hash} ("${commit.message}")?`)) {
                              const restoredRegistry = commit.snapshot;
                              setPatientRegistry(restoredRegistry);
                              savePatientsToDatabase(restoredRegistry);
                              pushGitCommit(
                                "ROLLBACK",
                                `rollback: revert registry to commit ${commit.hash}`,
                                `Rolled back database state to hash: ${commit.hash}, originally committed at ${commit.timestamp}.`,
                                restoredRegistry
                              );
                              setSyncFlash(`SUCCESS: Database successfully rolled back to state [${commit.hash}]!`);
                              setTimeout(() => setSyncFlash(null), 5000);
                              setIsGitLogOpen(false);
                            }
                          };

                          return (
                            <div key={commit.id} className="relative group text-left">
                              {/* Timeline dot */}
                              <span className={`absolute -left-[27px] top-1.5 w-3 h-3 rounded-full border-2 border-white ring-4 ring-[#FAF9F5] ${style.dot} transition-transform group-hover:scale-125`} />

                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 justify-between font-sans">
                                  <span className="font-mono text-[10px] font-bold text-teal-600 uppercase tracking-widest">
                                    commit {commit.hash}
                                  </span>
                                  <span className="text-[9px] font-bold text-slate-400">
                                    {dateString} • {timeString}
                                  </span>
                                </div>

                                <div className="p-3.5 bg-white border border-[#E5DFD0] rounded-2xl space-y-2 hover:border-teal-500 hover:shadow-xs transition-all font-sans">
                                  <div className="flex justify-between items-start gap-2">
                                    <h5 className="text-xs font-extrabold text-[#0C2340] leading-tight font-sans">
                                      {commit.message}
                                    </h5>
                                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-md shrink-0 uppercase tracking-wider border ${style.bg} ${style.text} ${style.border}`}>
                                      {commit.type.replace("_", " ")}
                                    </span>
                                  </div>

                                  <p className="text-[10px] text-slate-500 font-bold font-mono bg-slate-50 p-1.5 rounded-lg border border-slate-100 overflow-x-auto whitespace-pre-wrap">
                                    {commit.details}
                                  </p>

                                  <div className="flex justify-between items-center pt-1 font-sans">
                                    <span className="text-[9px] font-bold text-slate-400 font-mono">
                                      By: {commit.author.split(" ")[0]}
                                    </span>
                                    
                                    {commit.snapshot && (
                                      <button
                                        onClick={handleRollback}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[9.5px] font-black uppercase tracking-wider bg-teal-50 hover:bg-teal-600 text-teal-800 hover:text-white rounded-lg border border-teal-200 hover:border-teal-600 transition-all cursor-pointer shadow-2xs active:scale-95"
                                        title="Restore patient registry database to this exact snapshot state"
                                      >
                                        <RotateCcw className="w-2.5 h-2.5" />
                                        <span>Revert</span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
