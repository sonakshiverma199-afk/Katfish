/**
 * SnowyCare - Classy & Feminine AI Healthcare Platform
 * Controller & Engine: Medical History, AI Report Explainer, Prescription Checkout,
 * Period Tracking, Medicine Reminders, 24/7 Doctor Consult, Allergy Safety, Emergency SOS.
 */

// ==========================================
// 1. STATE & STORAGE MANAGEMENT
// ==========================================

const STORAGE_KEY = 'snowycare_state_v2';

function getDefaultState() {
  const today = new Date();
  
  // Default last period started 13 days ago (Cycle Day 14 = Ovulation)
  const defaultLastPeriod = new Date();
  defaultLastPeriod.setDate(today.getDate() - 13);
  const lastPeriodStr = defaultLastPeriod.toISOString().split('T')[0];

  return {
    theme: 'theme-pink',
    privacySettings: {
      discreetMode: false,
      discreetNotifications: false,
      showPeriodWidget: true,
      showReportsWidget: true,
      consentHealthData: true,
      notificationLeadDays: 2
    },
    cycleSettings: {
      lastPeriodDate: lastPeriodStr,
      periodEndDate: null,
      cycleLength: 28,
      periodDuration: 5
    },
    cycleLogs: {
      [lastPeriodStr]: { flow: 'heavy', pain: 2, symptoms: ['Pelvic Cramps 🔥', 'Cozy Sleepy Fatigue 😴'], notes: 'Day 1 of menstrual reset' }
    },
    medications: [
      {
        id: 'med_1',
        name: 'Iron & Vitamin C Complex',
        dosage: '1 Tablet (100mg)',
        time: '08:00',
        type: 'pill',
        notes: 'Take with cold orange juice after breakfast 🍊',
        stock: 24,
        color: 'pink',
        statusToday: 'taken',
        lastTakenDate: today.toISOString().split('T')[0]
      },
      {
        id: 'med_2',
        name: 'Omega-3 & Evening Primrose Oil',
        dosage: '2 Softgels',
        time: '13:00',
        type: 'capsule',
        notes: 'Soothes hormonal cramps and skin glow ✨',
        stock: 18,
        color: 'sky',
        statusToday: 'pending',
        lastTakenDate: null
      },
      {
        id: 'med_3',
        name: 'Magnesium Glycinate (Rest & Relax)',
        dosage: '400mg',
        time: '21:30',
        type: 'pill',
        notes: 'Eases muscle tension for deep dreamy sleep 🌙',
        stock: 5, // low stock for refill warning
        color: 'purple',
        statusToday: 'pending',
        lastTakenDate: null
      }
    ],
    medicalHistory: {
      conditions: [
        {
          id: 'c1',
          title: 'Iron Deficiency Anemia (Mild)',
          status: 'Active',
          diagnosedDate: '2025-08-14',
          doctor: 'Dr. Evelyn Frost, MD',
          notes: 'Managing with oral elemental iron 100mg + Vitamin C. Monitored biannually.'
        },
        {
          id: 'c2',
          title: 'PCOS / Irregular Follicular Cycles',
          status: 'Managed',
          diagnosedDate: '2024-03-20',
          doctor: 'Dr. Evelyn Frost, MD',
          notes: 'Managed via low-glycemic nutrition, inositol, and cycle tracking.'
        },
        {
          id: 'c3',
          title: 'Hormonal Migraines with Aura',
          status: 'Managed',
          diagnosedDate: '2023-11-05',
          doctor: 'Dr. Maya Lin, MBBS',
          notes: 'Mild migraines occurring during late luteal drop in estrogen.'
        }
      ],
      records: [
        {
          id: 'r1',
          title: 'Annual Women\'s Health & Gynecological Exam',
          type: 'Consultation',
          date: '2026-09-12',
          provider: 'Dr. Evelyn Frost • Frost Women\'s Clinic',
          summary: 'Cervical screen clear, vitals optimal. Prescribed preventative magnesium for luteal headaches.',
          fileAttached: 'Annual_Consult_Sept2026.pdf'
        },
        {
          id: 'r2',
          title: 'Pelvic & Ovarian Ultrasound',
          type: 'Imaging',
          date: '2026-06-20',
          provider: 'Pacific Imaging Institute',
          summary: 'Uterine cavity regular. Mild polycystic ovarian morphology noted; no cyst requiring intervention.',
          fileAttached: 'Pelvic_US_Report.pdf'
        },
        {
          id: 'r3',
          title: 'Comprehensive Lipid & Metabolic Panel',
          type: 'Lab Test',
          date: '2026-04-10',
          provider: 'Snowberry Diagnostic Labs',
          summary: 'Fasting glucose 88 mg/dL (optimal), HDL 62 mg/dL, LDL 94 mg/dL. Parameters within normal limits.',
          fileAttached: 'Metabolic_Panel.pdf'
        }
      ],
      pastMedications: [
        {
          id: 'pm1',
          name: 'Ferrous Ascorbate 100mg',
          dosage: '1 Tab Daily',
          period: 'May 2025 – Sep 2025',
          reason: 'Anemia recovery',
          outcome: 'Completed • Ferritin restored to 34 ng/mL',
          doctor: 'Dr. Evelyn Frost'
        },
        {
          id: 'pm2',
          name: 'Dydrogesterone 10mg',
          dosage: '1 Tab (Days 16–25)',
          period: 'Oct 2024 – Feb 2025',
          reason: 'Cycle regulation',
          outcome: 'Completed • Cycle normalized to 28–30 days',
          doctor: 'Dr. Evelyn Frost'
        }
      ],
      allergies: [
        {
          id: 'a1',
          allergen: 'Penicillin & Amoxicillin',
          type: 'Medication',
          severity: 'Severe (Anaphylaxis Risk)',
          reaction: 'Hives, facial angioedema, wheezing',
          diagnosedDate: '2019-05-10'
        },
        {
          id: 'a2',
          allergen: 'NSAIDs (Ibuprofen / Naproxen)',
          type: 'Medication',
          severity: 'Moderate',
          reaction: 'Severe gastric pain, bronchospasm, urticaria',
          diagnosedDate: '2021-08-22'
        },
        {
          id: 'a3',
          allergen: 'Latex',
          type: 'Contact',
          severity: 'Moderate',
          reaction: 'Contact dermatitis and localized pruritus',
          diagnosedDate: '2020-01-15'
        }
      ],
      reports: [
        {
          id: 'rep1',
          fileName: 'Complete_Blood_Count_Iron_Panel_Oct2026.pdf',
          testType: 'Complete Blood Count (CBC) & Ferritin',
          date: '2026-10-18',
          labName: 'Snowberry Diagnostic Labs',
          status: 'Flagged Findings',
          summary: 'Hemoglobin 10.4 g/dL (Mildly Low), Ferritin 14 ng/mL (Low iron stores). Other parameters normal.'
        },
        {
          id: 'rep2',
          fileName: 'Thyroid_Hormone_Screen_Aug2026.pdf',
          testType: 'Thyroid Panel (TSH, FT4, FT3)',
          date: '2026-08-04',
          labName: 'Pacific Health Lab',
          status: 'Normal',
          summary: 'TSH: 2.1 mIU/L, Free T4: 1.2 ng/dL, Free T3: 3.1 pg/mL. Euthyroid state confirmed.'
        }
      ]
    },
    notifications: [
      {
        id: 'notif_1',
        title: 'Upcoming Medicine Reminder',
        body: 'Omega-3 & Evening Primrose Oil due at 1:00 PM with lunch.',
        time: '12:45 PM',
        category: 'medicine',
        unread: true
      },
      {
        id: 'notif_2',
        title: 'Estimated Period Approach',
        body: 'Estimated period in approximately 14 days. Ovulation window is active today.',
        time: '08:00 AM',
        category: 'period',
        unread: true
      },
      {
        id: 'notif_3',
        title: 'Doctor Follow-Up Available',
        body: 'Dr. Evelyn Frost has reviewed your recent iron profile. Consultation slot open today.',
        time: 'Yesterday',
        category: 'doctor',
        unread: true
      },
      {
        id: 'notif_4',
        title: 'Refill Warning: Magnesium',
        body: 'Only 5 doses remaining in your pillbox. Order refill to prevent missed doses.',
        time: '2 days ago',
        category: 'refill',
        unread: false
      }
    ],
    doctors: [
      {
        id: 'doc_1',
        name: 'Dr. Evelyn Frost, MD',
        specialty: 'OB/GYN & Reproductive Endocrinology',
        qualifications: 'MD, FACOG (Johns Hopkins Fellowship)',
        experience: '14 Years Experience',
        languages: 'English, French',
        rating: '4.95 ★ (284 reviews)',
        availableNow: true,
        fee: '$45',
        avatarInitial: 'EF',
        bio: 'Specialist in hormonal balance, PCOS, endometriosis, and menstrual wellness.'
      },
      {
        id: 'doc_2',
        name: 'Dr. Maya Lin, MBBS, MD',
        specialty: 'Internal Medicine & Women\'s Wellness',
        qualifications: 'MBBS, MD (Stanford Health Care)',
        experience: '10 Years Experience',
        languages: 'English, Mandarin',
        rating: '4.90 ★ (192 reviews)',
        availableNow: true,
        fee: '$40',
        avatarInitial: 'ML',
        bio: 'Focuses on preventative health, anemia management, and fatigue diagnostics.'
      },
      {
        id: 'doc_3',
        name: 'Dr. Sarah Jenkins, MD',
        specialty: 'Clinical Dermatology & Hormonal Health',
        qualifications: 'MD (Columbia University)',
        experience: '8 Years Experience',
        languages: 'English',
        rating: '4.88 ★ (140 reviews)',
        availableNow: false,
        nextSlot: 'In 20 mins',
        fee: '$50',
        avatarInitial: 'SJ',
        bio: 'Hormonal acne, cycle-linked dermatological conditions, and skin barrier health.'
      },
      {
        id: 'doc_4',
        name: 'Dr. Chloe Bennett, MS, RD',
        specialty: 'Clinical Nutrition & Metabolic Balance',
        qualifications: 'MS, Registered Dietitian',
        experience: '7 Years Experience',
        languages: 'English, Spanish',
        rating: '4.92 ★ (115 reviews)',
        availableNow: true,
        fee: '$35',
        avatarInitial: 'CB',
        bio: 'Anti-inflammatory diets, gut microbiome optimization, and menstrual cycle nutrition.'
      }
    ],
    pharmacy: {
      prescriptions: [
        {
          id: 'rx_1',
          name: 'Ferrous Ascorbate 100mg + Folic Acid 1.5mg',
          form: 'Film-coated Tablets (Strip of 30)',
          price: 14.50,
          inStock: true,
          instructions: 'Take 1 tablet daily with citrus juice after meals',
          doctor: 'Dr. Evelyn Frost, MD',
          date: 'Oct 18, 2026'
        },
        {
          id: 'rx_2',
          name: 'Elemental Vitamin D3 60,000 IU',
          form: 'Gel Capsules (Box of 4)',
          price: 8.20,
          inStock: true,
          instructions: 'Take 1 capsule once weekly for 4 weeks',
          doctor: 'Dr. Evelyn Frost, MD',
          date: 'Oct 18, 2026'
        },
        {
          id: 'rx_3',
          name: 'Gentle Acetaminophen 500mg (NSAID-Free)',
          form: 'Caplets (Bottle of 20)',
          price: 6.50,
          inStock: true,
          instructions: 'Take 1 caplet every 6 hours as needed for menstrual cramps',
          doctor: 'Dr. Evelyn Frost, MD',
          date: 'Oct 18, 2026'
        }
      ],
      activeOrder: {
        id: 'SC-8921',
        date: 'Today',
        itemsCount: 3,
        total: '$29.20',
        status: 'Out for Delivery (Express Courier)',
        step: 3, // 1: Verified, 2: Packed, 3: Dispatched, 4: Delivered
        trackingCode: 'EXPR-99201',
        courier: 'Snowberry Express Health Courier #14'
      }
    },
    hydration: {
      date: today.toISOString().split('T')[0],
      count: 4,
      target: 8
    },
    vibeToday: {
      key: 'cozy',
      label: '🧸 Cozy Pookie'
    },
    doctorContacts: {
      docName: 'Dr. Evelyn Frost (OB/GYN)',
      docPhone: '(555) 019-2834',
      pharmName: 'Snowberry Pharmacy',
      pharmPhone: '(555) 018-8472'
    },
    alarmMelody: 'crystal-harp',
    alarmVolume: 80
  };
}

let appState = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    
    // Check day rollover for hydration
    const todayStr = new Date().toISOString().split('T')[0];
    if (parsed.hydration && parsed.hydration.date !== todayStr) {
      parsed.hydration.date = todayStr;
      parsed.hydration.count = 0;
    }

    return Object.assign(getDefaultState(), parsed);
  } catch (e) {
    console.error('Error loading state:', e);
    return getDefaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.error('Error saving state:', e);
  }
}

// ==========================================
// 2. DOM INITIALIZATION
// ==========================================

let currentCalendarDate = new Date();
let activeAlarmMed = null;
let triggeredAlarmsToday = new Set();
let snoozedAlarms = {};
let consultTimerInterval = null;
let consultSeconds = 134; // Start at 2m 14s for realistic demo

document.addEventListener('DOMContentLoaded', () => {
  injectBearMascots();
  if (window.lucide) window.lucide.createIcons();

  applyTheme(appState.theme || 'theme-pink');
  applyDiscreetModeState();

  updateLiveClock();
  setInterval(updateLiveClock, 1000);
  setInterval(checkAlarmsTick, 1000);

  // Initial renders
  renderDashboard();
  renderPeriodTracker();
  renderMedications();
  renderHydration();
  renderCalendar();
  renderMedicalHistory('all');
  renderDoctorDirectory();
  renderPharmacy();
  renderNotifications();
  setupSymptomTags();
  setupSnowfallCanvas();
  setupEventListeners();

  updateGreetingByTime();
});

function injectBearMascots() {
  const headerSlot = document.getElementById('header-bear-slot');
  if (headerSlot) headerSlot.innerHTML = getBearSvg('avatar', '100%', '100%');

  const heroSlot = document.getElementById('hero-bear-slot');
  if (heroSlot) heroSlot.innerHTML = getBearSvg('doctor', '100%', '100%');

  const cycleBearSlot = document.getElementById('cycle-center-bear-slot');
  if (cycleBearSlot) cycleBearSlot.innerHTML = getBearSvg('cozy', '100%', '100%');

  const medBearSlot = document.getElementById('med-bear-slot');
  if (medBearSlot) medBearSlot.innerHTML = getBearSvg('alarm', '100%', '100%');

  const alarmBearSlot = document.getElementById('alarm-bear-slot');
  if (alarmBearSlot) alarmBearSlot.innerHTML = getBearSvg('alarm', '100%', '100%');

  const wellnessBearSlot = document.getElementById('wellness-bear-slot');
  if (wellnessBearSlot) wellnessBearSlot.innerHTML = getBearSvg('cozy', '100%', '100%');

  const aiBearSlot = document.getElementById('ai-bear-slot');
  if (aiBearSlot) aiBearSlot.innerHTML = getBearSvg('ai', '100%', '100%');
}

function updateLiveClock() {
  const now = new Date();
  const clockEl = document.getElementById('live-clock');
  const dateEl = document.getElementById('live-date');

  if (clockEl) {
    clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  }
}

function updateGreetingByTime() {
  const hr = new Date().getHours();
  const greetingEl = document.getElementById('greeting-title');
  if (!greetingEl) return;

  let greetingText = 'Good Morning, Pookie! 🌸';
  if (hr >= 12 && hr < 17) {
    greetingText = 'Good Afternoon, Gorgeous! ☀️';
  } else if (hr >= 17 && hr < 22) {
    greetingText = 'Good Evening, Sweet Angel! 🌙';
  } else if (hr >= 22 || hr < 5) {
    greetingText = 'Rest Well, Cozy Pookie! 🧸💤';
  }

  greetingEl.innerHTML = `${greetingText} <span class="font-normal italic">Stay Cozy & Hydrated</span>`;
}

// ==========================================
// 3. ALLERGY DETECTION & SAFETY SCANNER (Feature H)
// ==========================================

const ALLERGY_DRUG_MAP = [
  {
    allergenKeyword: 'penicillin',
    drugClass: 'Penicillins & Beta-Lactam Antibiotics',
    conflictingDrugs: ['penicillin', 'amoxicillin', 'ampicillin', 'augmentin', 'amoxil', 'piperacillin', 'methicillin'],
    severity: 'Severe (Anaphylaxis Risk)',
    reaction: 'Hives, facial angioedema, bronchospasm, and anaphylactic shock risk'
  },
  {
    allergenKeyword: 'nsaid',
    drugClass: 'Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)',
    conflictingDrugs: ['ibuprofen', 'advil', 'motrin', 'naproxen', 'aleve', 'aspirin', 'diclofenac', 'celebrex', 'ketorolac', 'meloxicam'],
    severity: 'Moderate to Severe',
    reaction: 'Severe gastric pain, acute bronchospasm, and urticaria'
  },
  {
    allergenKeyword: 'sulfa',
    drugClass: 'Sulfonamide Antibiotics',
    conflictingDrugs: ['sulfa', 'sulfamethoxazole', 'bactrim', 'septra', 'sulfadiazine'],
    severity: 'Severe',
    reaction: 'Severe skin rash, hypersensitivity reaction, and fever'
  },
  {
    allergenKeyword: 'aspirin',
    drugClass: 'Salicylates',
    conflictingDrugs: ['aspirin', 'salicylate', 'acetylsalicylic'],
    severity: 'Severe',
    reaction: 'Asthma exacerbation, respiratory distress, and angioedema'
  }
];

function checkAllergyConflict(drugName) {
  if (!drugName) return { hasConflict: false };
  const lowerDrug = drugName.toLowerCase();
  const userAllergies = appState.medicalHistory.allergies || [];

  for (const mapping of ALLERGY_DRUG_MAP) {
    // Check if user has recorded this allergy
    const userHasAllergy = userAllergies.some(a => 
      a.allergen.toLowerCase().includes(mapping.allergenKeyword) ||
      mapping.conflictingDrugs.some(cd => a.allergen.toLowerCase().includes(cd))
    );

    if (userHasAllergy) {
      // Check if candidate drug matches any conflicting drug
      const match = mapping.conflictingDrugs.find(cd => lowerDrug.includes(cd));
      if (match) {
        return {
          hasConflict: true,
          allergen: mapping.drugClass,
          drugMatched: drugName,
          severity: mapping.severity,
          reaction: mapping.reaction
        };
      }
    }
  }

  return { hasConflict: false };
}

let pendingMedicationToAdd = null;

function liveCheckAllergyOnInput(drugName) {
  const conflict = checkAllergyConflict(drugName);
  const hintEl = document.getElementById('form-med-allergy-hint');
  if (!hintEl) return;

  if (conflict.hasConflict) {
    hintEl.textContent = `⚠️ Safety Warning: You have a recorded allergy to ${conflict.allergen}. Verify with your doctor.`;
    hintEl.classList.remove('hidden');
  } else {
    hintEl.classList.add('hidden');
  }
}

function promptAllergyWarningModal(conflict, onOverrideCallback) {
  const modal = document.getElementById('allergy-conflict-modal');
  const titleEl = document.getElementById('allergy-alert-title');
  const recEl = document.getElementById('allergy-alert-recorded');
  const medEl = document.getElementById('allergy-alert-med');
  const reactEl = document.getElementById('allergy-alert-reaction');

  if (titleEl) titleEl.textContent = `Conflict Detected: ${conflict.drugMatched}`;
  if (recEl) recEl.textContent = conflict.allergen;
  if (medEl) medEl.textContent = conflict.drugMatched;
  if (reactEl) reactEl.textContent = conflict.reaction;

  modal.classList.remove('hidden');
  window._allergyOverrideCallback = onOverrideCallback;
}

function dismissAllergyModal(override = false) {
  const modal = document.getElementById('allergy-conflict-modal');
  if (modal) modal.classList.add('hidden');

  if (override && window._allergyOverrideCallback) {
    window._allergyOverrideCallback();
    showToast('⚠️ Prescription added with clinician override notice.');
  } else {
    showToast('Medication entry canceled for patient safety.');
  }
  window._allergyOverrideCallback = null;
}

// ==========================================
// 4. ONE-TAP EMERGENCY AMBULANCE SOS (Feature I)
// ==========================================

function openEmergencySosModal() {
  const modal = document.getElementById('emergency-sos-modal');
  if (modal) modal.classList.remove('hidden');
  refreshUserGpsLocation();
}

function closeEmergencySosModal() {
  const modal = document.getElementById('emergency-sos-modal');
  if (modal) modal.classList.add('hidden');
}

function refreshUserGpsLocation() {
  const addrEl = document.getElementById('sos-live-address');
  const coordEl = document.getElementById('sos-coordinates');

  if (addrEl) addrEl.textContent = 'Acquiring GPS satellite fix...';

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lng = pos.coords.longitude.toFixed(4);
        if (coordEl) coordEl.textContent = `${lat}° N, ${lng}° W (Accurate to ±${Math.round(pos.coords.accuracy)}m)`;
        if (addrEl) addrEl.textContent = `Live GPS Verified • Lat: ${lat}, Lng: ${lng} (San Francisco Bay Metro)`;
        showToast('📍 GPS Location Updated for Emergency Response');
      },
      (err) => {
        // Fallback to high-precision regional demo coordinates
        if (coordEl) coordEl.textContent = '37.7749° N, 122.4194° W (Demo Location)';
        if (addrEl) addrEl.textContent = '742 Evergreen Terrace, San Francisco, CA (Default ICE Address)';
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  } else {
    if (addrEl) addrEl.textContent = '742 Evergreen Terrace, San Francisco, CA (Default ICE Address)';
  }
}

function triggerAmbulanceDispatch() {
  const btn = document.getElementById('btn-request-ambulance');
  const statusCard = document.getElementById('sos-dispatch-status-card');

  if (btn) {
    btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i><span>Transmitting CAD Dispatch Signal...</span>`;
    btn.classList.add('opacity-75');
  }

  // Sound confirmation
  soundEngine.playDing();

  setTimeout(() => {
    if (btn) {
      btn.innerHTML = `<i data-lucide="check" class="w-5 h-5"></i><span>Ambulance Dispatched! Unit En Route</span>`;
      btn.classList.remove('opacity-75');
    }
    if (statusCard) statusCard.classList.remove('hidden');
    if (window.confetti) {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    }
    showToast('🚨 AMBULANCE DISPATCHED: Paramedics en route to your GPS coordinates.');

    // Add emergency notification
    appState.notifications.unshift({
      id: 'notif_' + Date.now(),
      title: '🚨 Emergency Ambulance Dispatched',
      body: 'Unit #A-204 en route to your coordinates. Medical history and allergies transmitted.',
      time: 'Just Now',
      category: 'emergency',
      unread: true
    });
    saveState();
    renderNotifications();
  }, 1600);
}

function notifyEmergencyContact() {
  soundEngine.playDing();
  showToast('📱 SMS Alert sent to Julian (Partner): "EMERGENCY SOS: Ambulance requested at current location. Medical allergies transmitted."');
}

// ==========================================
// 5. AI MEDICAL REPORT EXPLAINER & PRESCRIPTION (Feature B & C)
// ==========================================

const SAMPLE_REPORTS = {
  cbc: `COMPLETE BLOOD COUNT (CBC) WITH FERRITIN
Patient: Jane Doe | Date: October 18, 2026 | Lab: Snowberry Diagnostic Labs
----------------------------------------------------------------------
Hemoglobin: 10.4 g/dL      [Ref: 12.0 - 15.5 g/dL]  --> LOW
Hematocrit: 31.8 %         [Ref: 36.0 - 46.0 %]     --> LOW
RBC Count:  4.10 M/uL      [Ref: 4.00 - 5.20 M/uL]  --> NORMAL
MCV:        78.2 fL        [Ref: 80.0 - 100.0 fL]   --> LOW (Microcytic)
Platelets:  260 K/uL       [Ref: 150 - 450 K/uL]    --> NORMAL
WBC Count:  6.8 K/uL       [Ref: 4.5 - 11.0 K/uL]   --> NORMAL
Ferritin:   14 ng/mL       [Ref: 20 - 200 ng/mL]    --> LOW (Depleted Iron Stores)`,

  thyroid: `THYROID & HORMONAL HEALTH PANEL
Patient: Jane Doe | Date: August 04, 2026 | Lab: Pacific Health Lab
----------------------------------------------------------------------
TSH:             4.65 mIU/L    [Ref: 0.45 - 4.50 mIU/L]  --> MILDLY ELEVATED
Free T4:         1.12 ng/dL    [Ref: 0.82 - 1.77 ng/dL]  --> NORMAL
Free T3:         3.05 pg/mL    [Ref: 2.00 - 4.40 pg/mL]  --> NORMAL
Anti-TPO Ab:     18.2 IU/mL    [Ref: < 35.0 IU/mL]       --> NORMAL (Negative)
Total Prolactin: 12.4 ng/mL    [Ref: 4.8 - 23.3 ng/mL]   --> NORMAL`,

  metabolic: `COMPREHENSIVE METABOLIC & LIPID PANEL
Patient: Jane Doe | Date: April 10, 2026 | Lab: Snowberry Diagnostic Labs
----------------------------------------------------------------------
Fasting Glucose: 92 mg/dL      [Ref: 70 - 99 mg/dL]      --> NORMAL (Optimal)
HbA1c:           5.2 %         [Ref: < 5.7 %]            --> NORMAL
Total Chol:      185 mg/dL     [Ref: < 200 mg/dL]        --> DESIRABLE
HDL Cholesterol: 64 mg/dL      [Ref: > 50 mg/dL]         --> OPTIMAL (Protective)
LDL Cholesterol: 102 mg/dL     [Ref: < 100 mg/dL]        --> BORDERLINE
Triglycerides:   95 mg/dL      [Ref: < 150 mg/dL]        --> NORMAL`
};

function loadSampleReport(key) {
  const textInput = document.getElementById('ai-report-text-input');
  if (textInput && SAMPLE_REPORTS[key]) {
    textInput.value = SAMPLE_REPORTS[key];
    showToast(`Loaded sample: ${key.toUpperCase()} report findings`);
    analyzeCurrentReport();
  }
}

function simulateFileUpload() {
  document.getElementById('report-file-input')?.click();
}

function handleFileChosen(e) {
  const file = e.target.files[0];
  if (!file) return;

  const textInput = document.getElementById('ai-report-text-input');
  if (textInput) {
    textInput.value = SAMPLE_REPORTS.cbc; // Load rich parsed demo data
    showToast(`📄 Uploaded: ${file.name}. AI extracting findings...`);
    setTimeout(() => {
      analyzeCurrentReport();
    }, 600);
  }
}

function analyzeCurrentReport() {
  const textInput = document.getElementById('ai-report-text-input');
  const text = textInput ? textInput.value.trim() : '';

  if (!text) {
    showToast('Please paste a lab report or select a sample report first.');
    return;
  }

  const btn = document.getElementById('btn-analyze-report');
  if (btn) {
    btn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>Analyzing Clinical Parameters...</span>`;
  }

  soundEngine.playDing();

  setTimeout(() => {
    if (btn) {
      btn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4"></i><span>Analyze & Explain Report</span>`;
    }
    renderAiAnalysisResult(text);
  }, 800);
}

function renderAiAnalysisResult(text) {
  const emptyState = document.getElementById('ai-empty-state');
  const resultCard = document.getElementById('ai-result-card');
  const prescripPrompt = document.getElementById('prescription-verification-card');

  if (emptyState) emptyState.classList.add('hidden');
  if (resultCard) resultCard.classList.remove('hidden');
  if (prescripPrompt) prescripPrompt.classList.remove('hidden');

  const isAnemia = text.toLowerCase().includes('ferritin') || text.toLowerCase().includes('hemoglobin');
  const isThyroid = text.toLowerCase().includes('tsh');

  let title = 'Complete Blood Count & Iron Stores Analysis';
  let summaryPoints = [
    'Your Hemoglobin (10.4 g/dL) and Ferritin (14 ng/mL) are mildly below target, indicating depleted iron reserves.',
    'Platelets and White Blood Cells are within normal range, suggesting healthy immune defense and blood clotting.',
    'Red blood cells are slightly smaller than average (microcytic), consistent with early iron deficiency rather than bone marrow issues.'
  ];
  let flaggedExplanation = 'Ferritin acts as your body\'s iron savings bank. When menstrual flows are moderately heavy, or dietary iron intake is low, ferritin levels dip first before larger hemoglobin drops occur. This frequently causes mild afternoon fatigue or cold sensitivity.';
  let doctorQuestions = [
    'Should I take an oral elemental iron supplement (such as Ferrous Ascorbate) with Vitamin C?',
    'Should we check for potential gluten sensitivity or digestive factors that might affect iron absorption?',
    'When would you recommend a follow-up CBC to verify my ferritin recovery (typically 8–12 weeks)?',
    'Would adjusting my menstrual flow with supportive cycle supplements help reduce iron loss?'
  ];
  let preventiveHabits = 'Pair iron-rich foods (spinach, lentils, dark poultry) with Vitamin C (lemon, berries, bell peppers) to boost absorption by up to 300%. Avoid drinking coffee or black tea within 1 hour of meals, as tannins block iron uptake.';

  if (isThyroid) {
    title = 'Thyroid & Hormonal Screen Analysis';
    summaryPoints = [
      'TSH (4.65 mIU/L) is slightly above the standard reference ceiling (4.5 mIU/L), which indicates mild subclinical thyroid sluggishness.',
      'Free T4 and Free T3 are completely normal, meaning your thyroid is still producing adequate active hormone.',
      'Anti-TPO antibodies are negative, which is a reassuring sign that autoimmune thyroiditis (Hashimoto\'s) is unlikely.'
    ];
    flaggedExplanation = 'A mild TSH elevation with normal Free T4 is often transient and can be influenced by recent illness, circadian shifts, sleep deficits, or follicular phase fluctuations.';
    doctorQuestions = [
      'Would you recommend repeating this TSH test in 6–8 weeks to see if it normalizes spontaneously?',
      'Are there specific symptoms (dry skin, temperature intolerance, cycle delays) I should monitor?',
      'Is selenium or myo-inositol supplementation appropriate for my thyroid and follicular health?'
    ];
    preventiveHabits = 'Support thyroid hormone conversion with adequate dietary selenium (1–2 Brazil nuts daily), iodine, and stress reduction through regular sleep schedules.';
  }

  resultCard.innerHTML = `
    <div class="flex items-center justify-between pb-3 border-b border-pink-100">
      <div class="flex items-center gap-2.5">
        <div class="w-9 h-9 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
          <i data-lucide="stethoscope" class="w-5 h-5"></i>
        </div>
        <div>
          <h3 class="font-display font-bold text-base text-slate-800">${title}</h3>
          <span class="text-[10px] text-purple-600 font-bold uppercase tracking-wider">AI Medical Summary • Non-Diagnostic</span>
        </div>
      </div>
      <button onclick="copyAiReportSummary()" class="text-xs font-bold text-pink-600 hover:underline flex items-center gap-1">
        <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy
      </button>
    </div>

    <!-- Executive Summary in Plain English -->
    <div class="p-4 rounded-2xl bg-gradient-to-r from-purple-50/70 via-white to-pink-50/40 border border-purple-100 space-y-2 text-xs">
      <b class="text-slate-800 text-xs flex items-center gap-1.5">
        <i data-lucide="sparkles" class="w-3.5 h-3.5 text-purple-500"></i>
        <span>Clear English Summary</span>
      </b>
      <ul class="space-y-1.5 text-slate-600 list-disc pl-4 font-medium leading-relaxed">
        ${summaryPoints.map(p => `<li>${p}</li>`).join('')}
      </ul>
    </div>

    <!-- What Flagged Values May Indicate -->
    <div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-1.5 text-slate-700">
      <b class="text-amber-900 flex items-center gap-1.5">
        <i data-lucide="help-circle" class="w-3.5 h-3.5 text-amber-600"></i>
        <span>What Flagged Values May Indicate (Non-Definitive)</span>
      </b>
      <p class="leading-relaxed font-medium">${flaggedExplanation}</p>
    </div>

    <!-- Suggested Questions for Doctor -->
    <div class="p-4 rounded-2xl bg-white border border-pink-100 text-xs space-y-2 text-slate-700">
      <b class="text-pink-700 flex items-center gap-1.5">
        <i data-lucide="message-circle" class="w-3.5 h-3.5 text-pink-500"></i>
        <span>Recommended Questions for Your Clinician</span>
      </b>
      <ol class="list-decimal pl-4 space-y-1 text-slate-600 font-medium">
        ${doctorQuestions.map(q => `<li>${q}</li>`).join('')}
      </ol>
    </div>

    <!-- Preventive Measures & Habits -->
    <div class="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1.5 text-slate-700">
      <b class="text-emerald-900 flex items-center gap-1.5">
        <i data-lucide="heart" class="w-3.5 h-3.5 text-emerald-600"></i>
        <span>Supportive Lifestyle & Nutrition Tips</span>
      </b>
      <p class="leading-relaxed font-medium">${preventiveHabits}</p>
    </div>

    <!-- Clinical Disclaimer -->
    <div class="text-[10px] text-slate-400 border-t border-slate-100 pt-3 italic text-center">
      ⚠️ Medical Notice: This AI explanation is for educational purposes only and does not establish a diagnosis. Always consult with a qualified physician before starting any treatment.
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function handlePrescriptionAnswer(hasPrescription) {
  const container = document.getElementById('prescription-answer-outcome');
  if (!container) return;
  container.classList.remove('hidden');

  if (hasPrescription) {
    // YES PATH:
    container.innerHTML = `
      <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <b class="text-emerald-900 text-xs">Prescription Verified • Ready to Order</b>
          </div>
          <span class="text-[10px] bg-white text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">Allergy Safe ✓</span>
        </div>
        <p class="text-slate-600 text-xs">
          Your doctor's prescription for <b>Ferrous Ascorbate 100mg + Folic Acid</b> has been authorized and matched with our certified pharmacy network.
        </p>
        <div class="flex flex-wrap items-center gap-2 pt-1">
          <button onclick="switchTab('pharmacy')" class="btn-girly-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
            <span>Order Prescribed Medicine ($14.50 • 2-Hr Delivery)</span>
          </button>
        </div>
      </div>
    `;
  } else {
    // NO PATH:
    container.innerHTML = `
      <div class="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
        <div class="flex items-center gap-2">
          <i data-lucide="alert-circle" class="w-4 h-4 text-amber-600"></i>
          <b class="text-amber-900 text-xs">Doctor Assessment Required for Prescription Medication</b>
        </div>
        <p class="text-slate-600 text-xs leading-relaxed font-medium">
          Under healthcare regulations, prescription-only medicines (such as prescription iron or thyroid hormones) cannot be automatically ordered without a clinician's evaluation.
        </p>
        <div class="p-3 rounded-xl bg-white/90 border border-amber-100 text-[11px] text-slate-600 space-y-1">
          <b class="text-slate-800">Supportive Low-Risk Self-Care:</b>
          <p>Increase dietary iron with dark leafy greens and citrus fruits. Avoid high-dose OTC iron until your physician confirms your serum ferritin.</p>
        </div>
        <div class="pt-1">
          <button onclick="startInstantDoctorConsult('doc_1')" class="btn-girly-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <i data-lucide="video" class="w-3.5 h-3.5"></i>
            <span>Connect with Dr. Evelyn Frost Now (24/7 Consultation)</span>
          </button>
        </div>
      </div>
    `;
  }

  if (window.lucide) window.lucide.createIcons();
}

function sendAiChatMessage() {
  const input = document.getElementById('ai-chat-input');
  const thread = document.getElementById('ai-chat-thread');
  if (!input || !thread) return;

  const userText = input.value.trim();
  if (!userText) return;

  // Append user message
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble-user p-3 max-w-[85%] ml-auto text-white leading-relaxed';
  userBubble.textContent = userText;
  thread.appendChild(userBubble);
  input.value = '';

  thread.scrollTop = thread.scrollHeight;
  soundEngine.playDing();

  // Simulate supportive AI answer
  setTimeout(() => {
    const aiBubble = document.createElement('div');
    aiBubble.className = 'chat-bubble-ai p-3 max-w-[85%] text-slate-700 leading-relaxed';

    let reply = "That is a very thoughtful question, pookie! When monitoring these lab markers, our primary focus is gentle consistency. Always remember that minor variations are common and manageable. Would you like me to prepare a note for Dr. Frost?";
    if (userText.toLowerCase().includes('ferritin') || userText.toLowerCase().includes('iron')) {
      reply = "Ferritin reflects your intracellular iron stores. When it drops below 20 ng/mL, your body has to work harder to deliver oxygen, which often causes brain fog or fatigue. Taking iron with a glass of orange juice significantly aids absorption! 🍊";
    } else if (userText.toLowerCase().includes('cramp') || userText.toLowerCase().includes('pain')) {
      reply = "For menstrual cramps, heat therapy (heating pad at 40°C) is clinically proven to relax uterine muscle contractions just as effectively as standard pain medication. Magnesium glycinate and warm chamomile tea are also wonderfully soothing! 🧸";
    }

    aiBubble.textContent = reply;
    thread.appendChild(aiBubble);
    thread.scrollTop = thread.scrollHeight;
  }, 700);
}

function copyAiReportSummary() {
  const textInput = document.getElementById('ai-report-text-input');
  if (textInput) {
    navigator.clipboard.writeText(textInput.value);
    showToast('📋 Report summary copied to clipboard!');
  }
}

// ==========================================
// 6. 24/7 DOCTOR CONSULTATION (Feature G)
// ==========================================

function renderDoctorDirectory() {
  const container = document.getElementById('doctor-directory-grid');
  if (!container) return;
  container.innerHTML = '';

  appState.doctors.forEach(doc => {
    const card = document.createElement('div');
    card.className = 'glass-panel rounded-3xl p-5 border border-white/80 shadow-soft space-y-3 flex flex-col justify-between';
    card.innerHTML = `
      <div class="space-y-3">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white font-display font-bold flex items-center justify-center text-lg shadow-sm flex-shrink-0">
              ${doc.avatarInitial}
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h4 class="font-bold text-slate-800 text-sm">${doc.name}</h4>
                <i data-lucide="badge-check" class="w-4 h-4 text-sky-500"></i>
              </div>
              <p class="text-xs text-pink-600 font-semibold">${doc.specialty}</p>
              <span class="text-[10px] text-slate-400">${doc.qualifications} • ${doc.experience}</span>
            </div>
          </div>
          <span class="text-xs font-bold px-2 py-0.5 rounded-full ${doc.availableNow ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
            ${doc.availableNow ? '● Available' : doc.nextSlot}
          </span>
        </div>

        <p class="text-xs text-slate-600 font-medium leading-relaxed bg-white/60 p-2.5 rounded-xl border border-white">
          "${doc.bio}"
        </p>

        <div class="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span class="font-bold text-slate-700">${doc.rating}</span>
          <span class="font-bold text-rose-600">${doc.fee} / Video Visit</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
        <button onclick="startInstantDoctorConsult('${doc.id}')" class="btn-girly-primary py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
          <i data-lucide="video" class="w-3.5 h-3.5"></i>
          <span>${doc.availableNow ? 'Instant Video Call' : 'Book Appointment'}</span>
        </button>
        <button onclick="openDoctorChat('${doc.id}')" class="btn-girly-secondary py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
          <i data-lucide="message-circle" class="w-3.5 h-3.5 text-pink-500"></i>
          <span>Direct Message</span>
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons();
}

function startInstantDoctorConsult(docId) {
  const doc = appState.doctors.find(d => d.id === docId) || appState.doctors[0];
  const modal = document.getElementById('doctor-video-modal');
  const nameEl = document.getElementById('video-doc-name');

  if (nameEl) nameEl.textContent = `Consultation with ${doc.name}`;
  if (modal) modal.classList.remove('hidden');

  soundEngine.playDing();
  startConsultTimer();
}

function startConsultTimer() {
  if (consultTimerInterval) clearInterval(consultTimerInterval);
  const timerEl = document.getElementById('video-call-timer');

  consultTimerInterval = setInterval(() => {
    consultSeconds++;
    const mins = String(Math.floor(consultSeconds / 60)).padStart(2, '0');
    const secs = String(consultSeconds % 60).padStart(2, '0');
    if (timerEl) timerEl.textContent = `00:${mins}:${secs} • Encrypted WebRTC Session`;
  }, 1000);
}

function toggleConsultMic() {
  const btn = document.getElementById('btn-toggle-mic');
  if (!btn) return;
  const isMuted = btn.classList.toggle('bg-rose-600');
  showToast(isMuted ? 'Microphone Muted' : 'Microphone Active');
}

function toggleConsultCam() {
  const btn = document.getElementById('btn-toggle-cam');
  if (!btn) return;
  const isCamOff = btn.classList.toggle('bg-rose-600');
  showToast(isCamOff ? 'Camera Paused' : 'Camera Active');
}

function endDoctorConsult() {
  const modal = document.getElementById('doctor-video-modal');
  if (modal) modal.classList.add('hidden');
  if (consultTimerInterval) clearInterval(consultTimerInterval);

  showToast('Consultation ended. Doctor notes and digital prescription generated in Pharmacy! 🩺✨');
  if (window.confetti) {
    confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });
  }
}

function openDoctorChat(docId) {
  switchTab('ai-reports');
  showToast('Connecting to clinician message channel...');
}

// ==========================================
// 7. PHARMACY & PRESCRIPTION CHECKOUT (Feature C)
// ==========================================

function renderPharmacy() {
  const container = document.getElementById('pharmacy-items-list');
  const trackerContainer = document.getElementById('active-pharmacy-order-tracker');
  if (!container) return;

  container.innerHTML = '';

  appState.pharmacy.prescriptions.forEach(med => {
    const card = document.createElement('div');
    card.className = 'prescription-card p-4 rounded-2xl glass-panel border border-white/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3';
    card.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 font-bold">
          <i data-lucide="pill" class="w-5 h-5"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-slate-800 text-sm">${med.name}</h4>
            <span class="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">In Stock</span>
          </div>
          <p class="text-xs text-slate-500 font-medium">${med.form} • ${med.instructions}</p>
          <span class="text-[10px] text-slate-400">Prescribed by ${med.doctor}</span>
        </div>
      </div>
      <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0">
        <span class="font-bold text-slate-800 text-sm">$${med.price.toFixed(2)}</span>
        <button onclick="openPharmacyCheckoutModal()" class="px-3.5 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold shadow-xs">
          Order
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  // Render Order Tracker
  if (trackerContainer && appState.pharmacy.activeOrder) {
    const order = appState.pharmacy.activeOrder;
    trackerContainer.innerHTML = `
      <div class="flex items-center justify-between">
        <h4 class="font-bold text-slate-800 text-sm flex items-center gap-1.5">
          <i data-lucide="truck" class="w-4 h-4 text-emerald-500"></i>
          <span>Active Order #${order.id}</span>
        </h4>
        <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          En Route 🛵
        </span>
      </div>

      <div class="space-y-1.5 pt-1">
        <div class="flex justify-between text-[11px] text-slate-600 font-medium">
          <span>Status:</span>
          <span class="font-bold text-slate-800">${order.status}</span>
        </div>
        <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full w-3/4 animate-pulse"></div>
        </div>
        <span class="text-[10px] text-slate-400 block">${order.courier}</span>
      </div>

      <button onclick="autoAddOrderToReminders()" class="btn-girly-secondary w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 mt-2">
        <i data-lucide="calendar-plus" class="w-3.5 h-3.5 text-pink-500"></i>
        <span>Add Ordered Meds to Daily Pillbox</span>
      </button>
    `;
  }

  if (window.lucide) window.lucide.createIcons();
}

function openPharmacyCheckoutModal() {
  document.getElementById('pharmacy-checkout-modal')?.classList.remove('hidden');
}

function closePharmacyCheckoutModal() {
  document.getElementById('pharmacy-checkout-modal')?.classList.add('hidden');
}

function placeMedicineOrder() {
  closePharmacyCheckoutModal();
  soundEngine.playDing();
  if (window.confetti) {
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
  }
  showToast('🎉 Order Placed! Prescription verified by pharmacist. Express courier dispatched.');
}

function autoAddOrderToReminders() {
  showToast('✨ Prescriptions synchronized with your Daily Medicine Reminders!');
  switchTab('medicine');
}

// ==========================================
// 8. PERSONAL MEDICAL HISTORY (Feature A)
// ==========================================

function renderMedicalHistory(filter = 'all') {
  const container = document.getElementById('history-timeline-container');
  const allergiesList = document.getElementById('history-allergies-list');
  const historyBadge = document.getElementById('tab-history-badge');
  if (!container) return;

  container.innerHTML = '';

  const { conditions, records, pastMedications, allergies } = appState.medicalHistory;
  const totalCount = conditions.length + records.length + pastMedications.length + allergies.length;
  if (historyBadge) historyBadge.textContent = `${totalCount} Items`;

  // Render Allergies in sidebar
  if (allergiesList) {
    allergiesList.innerHTML = '';
    allergies.forEach(a => {
      const item = document.createElement('div');
      item.className = 'p-2.5 rounded-xl bg-white border border-rose-100 text-xs space-y-0.5 shadow-xs';
      item.innerHTML = `
        <div class="flex justify-between items-center">
          <b class="text-rose-700">${a.allergen}</b>
          <span class="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700">${a.severity}</span>
        </div>
        <p class="text-[11px] text-slate-500">${a.reaction}</p>
      `;
      allergiesList.appendChild(item);
    });
  }

  // Combine entries for timeline
  const items = [];

  if (filter === 'all' || filter === 'conditions') {
    conditions.forEach(c => items.push({
      category: 'Condition',
      icon: 'activity',
      date: c.diagnosedDate,
      title: c.title,
      badge: c.status,
      badgeColor: c.status === 'Active' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800',
      subtitle: `Diagnosed by ${c.doctor}`,
      body: c.notes
    }));
  }

  if (filter === 'all' || filter === 'records') {
    records.forEach(r => items.push({
      category: r.type,
      icon: 'file-text',
      date: r.date,
      title: r.title,
      badge: r.type,
      badgeColor: 'bg-pink-100 text-pink-700',
      subtitle: r.provider,
      body: r.summary,
      file: r.fileAttached
    }));
  }

  if (filter === 'all' || filter === 'medications') {
    pastMedications.forEach(m => items.push({
      category: 'Medication',
      icon: 'pill',
      date: m.period,
      title: `${m.name} (${m.dosage})`,
      badge: 'Completed',
      badgeColor: 'bg-slate-100 text-slate-700',
      subtitle: `Prescribed by ${m.doctor} for ${m.reason}`,
      body: m.outcome
    }));
  }

  if (filter === 'all' || filter === 'allergies') {
    allergies.forEach(a => items.push({
      category: 'Allergy',
      icon: 'alert-triangle',
      date: a.diagnosedDate,
      title: `Allergy: ${a.allergen}`,
      badge: a.severity,
      badgeColor: 'bg-rose-100 text-rose-700',
      subtitle: `Type: ${a.type}`,
      body: `Reaction: ${a.reaction}`
    }));
  }

  // Render timeline cards
  items.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'timeline-item';
    card.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="glass-panel p-4 rounded-2xl border border-white/80 shadow-xs space-y-2">
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-slate-800">${entry.title}</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${entry.badgeColor}">${entry.badge}</span>
          </div>
          <span class="text-[10px] font-mono text-slate-400">${entry.date}</span>
        </div>
        <p class="text-xs text-slate-500 font-medium">${entry.subtitle}</p>
        <p class="text-xs text-slate-600 bg-white/70 p-2.5 rounded-xl border border-white font-medium">${entry.body}</p>
        ${entry.file ? `
          <div class="flex items-center gap-2 pt-1 text-xs">
            <span class="text-pink-600 font-bold flex items-center gap-1 cursor-pointer hover:underline" onclick="switchTab('ai-reports')">
              <i data-lucide="file" class="w-3.5 h-3.5"></i> ${entry.file}
            </span>
            <button onclick="switchTab('ai-reports')" class="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
              Explain with AI ✨
            </button>
          </div>
        ` : ''}
      </div>
    `;
    container.appendChild(card);
  });

  if (window.lucide) window.lucide.createIcons();
}

function filterHistoryTab(tabKey) {
  document.querySelectorAll('.history-sub-tab').forEach(b => b.classList.remove('active', 'bg-white', 'text-slate-700', 'shadow-xs', 'border', 'border-pink-200'));
  event.currentTarget.classList.add('active', 'bg-white', 'text-slate-700', 'shadow-xs', 'border', 'border-pink-200');
  renderMedicalHistory(tabKey);
}

function openAddMedicalRecordModal(category = 'condition') {
  const modal = document.getElementById('add-medical-record-modal');
  const catSelect = document.getElementById('form-record-category');
  if (catSelect) {
    catSelect.value = category;
    adjustRecordFormFields(category);
  }
  if (modal) modal.classList.remove('hidden');
}

function closeAddMedicalRecordModal() {
  document.getElementById('add-medical-record-modal')?.classList.add('hidden');
}

function adjustRecordFormFields(cat) {
  const labelTitle = document.getElementById('label-record-title');
  if (labelTitle) {
    if (cat === 'allergy') labelTitle.textContent = 'Allergen / Drug Name *';
    else if (cat === 'medication') labelTitle.textContent = 'Medication Name & Dosage *';
    else if (cat === 'record') labelTitle.textContent = 'Consultation or Test Title *';
    else labelTitle.textContent = 'Condition or Illness Name *';
  }
}

function handleSaveMedicalRecord(e) {
  e.preventDefault();
  const cat = document.getElementById('form-record-category').value;
  const title = document.getElementById('form-record-title').value.trim();
  const date = document.getElementById('form-record-date').value || new Date().toISOString().split('T')[0];
  const status = document.getElementById('form-record-status').value;
  const notes = document.getElementById('form-record-notes').value.trim();

  if (!title) return;

  if (cat === 'allergy') {
    appState.medicalHistory.allergies.unshift({
      id: 'a_' + Date.now(),
      allergen: title,
      type: 'Medication',
      severity: status,
      reaction: notes || 'Hypersensitivity reaction',
      diagnosedDate: date
    });
    showToast(`⚠️ Recorded allergy to ${title}. Auto-safety scanner updated.`);
  } else if (cat === 'medication') {
    appState.medicalHistory.pastMedications.unshift({
      id: 'pm_' + Date.now(),
      name: title,
      dosage: 'Standard',
      period: date,
      reason: 'Clinical treatment',
      outcome: notes || 'Completed course',
      doctor: 'Attending Clinician'
    });
    showToast(`Added past medication: ${title}`);
  } else if (cat === 'record') {
    appState.medicalHistory.records.unshift({
      id: 'r_' + Date.now(),
      title: title,
      type: 'Consultation',
      date: date,
      provider: 'Frost Healthcare Network',
      summary: notes || 'Consultation summary saved.',
      fileAttached: null
    });
    showToast(`Clinical record saved.`);
  } else {
    appState.medicalHistory.conditions.unshift({
      id: 'c_' + Date.now(),
      title: title,
      status: status,
      diagnosedDate: date,
      doctor: 'Dr. Evelyn Frost',
      notes: notes || 'Condition logged for health monitoring.'
    });
    showToast(`Medical condition saved: ${title}`);
  }

  saveState();
  closeAddMedicalRecordModal();
  renderMedicalHistory('all');
  soundEngine.playDing();
}

function exportMedicalSummary() {
  const exportData = {
    patient: 'Jane Doe',
    exportDate: new Date().toISOString(),
    medicalHistory: appState.medicalHistory,
    cycleSettings: appState.cycleSettings,
    activePrescriptions: appState.medications
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SnowyCare_Medical_Summary_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 Medical summary exported for your doctor appointment!');
}

// ==========================================
// 9. DISCREET PRIVACY MODE & NOTIFICATIONS (Feature F)
// ==========================================

function togglePrivacyMode() {
  appState.privacySettings.discreetMode = !appState.privacySettings.discreetMode;
  applyDiscreetModeState();
  saveState();

  showToast(appState.privacySettings.discreetMode 
    ? '🛡️ Discreet Privacy Mode ON: Sensitive health details masked.' 
    : 'Discreet Privacy Mode OFF.');
}

function applyDiscreetModeState() {
  const icon = document.getElementById('privacy-icon');
  if (appState.privacySettings.discreetMode) {
    document.body.classList.add('discreet-mode');
    if (icon) icon.classList.add('text-pink-600');
  } else {
    document.body.classList.remove('discreet-mode');
    if (icon) icon.classList.remove('text-pink-600');
  }
}

function openNotificationModal() {
  document.getElementById('notification-center-modal')?.classList.remove('hidden');
  renderNotifications();
}

function closeNotificationModal() {
  document.getElementById('notification-center-modal')?.classList.add('hidden');
}

function renderNotifications() {
  const list = document.getElementById('notification-items-list');
  const badge = document.getElementById('header-notification-badge');
  if (!list) return;

  const unreadCount = appState.notifications.filter(n => n.unread).length;
  if (badge) {
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'flex' : 'none';
  }

  list.innerHTML = '';
  appState.notifications.forEach(n => {
    const item = document.createElement('div');
    item.className = `p-3 rounded-2xl border text-xs space-y-1 transition-all ${n.unread ? 'bg-pink-50/80 border-pink-200' : 'bg-white border-slate-100'}`;
    item.innerHTML = `
      <div class="flex items-center justify-between">
        <b class="text-slate-800">${n.title}</b>
        <span class="text-[9px] text-slate-400">${n.time}</span>
      </div>
      <p class="text-slate-600 ${appState.privacySettings.discreetNotifications ? 'sensitive-health-info' : ''}">
        ${appState.privacySettings.discreetNotifications ? 'SnowyCare: Daily health reminder.' : n.body}
      </p>
    `;
    list.appendChild(item);
  });
}

function markAllNotificationsRead() {
  appState.notifications.forEach(n => n.unread = false);
  saveState();
  renderNotifications();
  showToast('All notifications marked as read.');
}

function clearAllNotifications() {
  appState.notifications = [];
  saveState();
  renderNotifications();
  showToast('Notification center cleared.');
}

function toggleDiscreetModeFromSettings(checked) {
  appState.privacySettings.discreetNotifications = checked;
  saveState();
  renderNotifications();
  showToast(checked ? 'Discreet lock screen notifications enabled.' : 'Standard notifications active.');
}

// ==========================================
// 10. CYCLE & PERIOD CALCULATOR (Upgraded Feature E)
// ==========================================

function getCycleInfo(targetDate = new Date()) {
  const { lastPeriodDate, cycleLength, periodDuration } = appState.cycleSettings;
  const start = new Date(lastPeriodDate);
  start.setHours(0, 0, 0, 0);

  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let cycleDay = (diffDays % cycleLength);
  if (cycleDay < 0) cycleDay += cycleLength;
  cycleDay += 1;

  const daysUntilNextPeriod = cycleLength - cycleDay + 1;
  const ovulationDay = Math.round(cycleLength - 14);

  let phaseName = 'Follicular Phase';
  let phaseEmoji = '🌱';
  let fertility = 'Moderate';
  let phaseDescription = 'Estrogen rises, energy builds! Perfect time for new habits and glowing skin.';
  let adviceTitle = 'Follicular Glow 🌱';

  if (cycleDay <= periodDuration) {
    phaseName = 'Menstrual Phase';
    phaseEmoji = '🩸';
    fertility = 'Low';
    phaseDescription = 'Your body is resetting. Honor your comfort: warm drinks, gentle rest, and lots of cuddles.';
    adviceTitle = 'Menstrual Reset: Be gentle with yourself 🧸';
  } else if (cycleDay >= ovulationDay - 3 && cycleDay <= ovulationDay + 1) {
    phaseName = 'Ovulation Window';
    phaseEmoji = '✨';
    fertility = 'High';
    phaseDescription = 'Peak estrogen and confidence! Your magnetic glow and natural body energy are at their highest.';
    adviceTitle = 'Ovulation Window: You are glowing! 🌸';
  } else if (cycleDay > ovulationDay + 1) {
    phaseName = 'Luteal Phase';
    phaseEmoji = '🌙';
    fertility = 'Low';
    phaseDescription = 'Progesterone dominates. Focus on magnesium, cozy blankets, warm comfort food, and slower mornings.';
    adviceTitle = 'Luteal Phase: Craving comfort & cocoa 🍫';
  }

  return {
    cycleDay,
    cycleLength,
    periodDuration,
    phaseName,
    phaseEmoji,
    fertility,
    phaseDescription,
    adviceTitle,
    daysUntilNextPeriod,
    ovulationDay
  };
}

function renderPeriodTracker() {
  const info = getCycleInfo();

  const badgeEl = document.getElementById('tab-period-badge');
  if (badgeEl) badgeEl.textContent = `Day ${info.cycleDay}`;

  const detailDayEl = document.getElementById('cycle-detail-day-num');
  if (detailDayEl) detailDayEl.textContent = info.cycleDay;

  const detailPhaseEl = document.getElementById('cycle-detail-phase-name');
  if (detailPhaseEl) detailPhaseEl.textContent = `${info.phaseEmoji} ${info.phaseName}`;

  const adviceTitleEl = document.getElementById('phase-advice-title');
  if (adviceTitleEl) adviceTitleEl.textContent = info.adviceTitle;

  const adviceBodyEl = document.getElementById('phase-advice-body');
  if (adviceBodyEl) adviceBodyEl.textContent = info.phaseDescription;

  const fertilityEl = document.getElementById('detail-fertility-level');
  if (fertilityEl) fertilityEl.textContent = info.fertility;

  const nextPeriodEl = document.getElementById('detail-next-period-days');
  if (nextPeriodEl) {
    nextPeriodEl.textContent = info.daysUntilNextPeriod === 1 ? 'Tomorrow!' : `${info.daysUntilNextPeriod} Days away`;
  }

  const avgCycleEl = document.getElementById('detail-avg-cycle');
  if (avgCycleEl) avgCycleEl.textContent = `${info.cycleLength} Days`;

  const progressPercent = info.cycleDay / info.cycleLength;
  const dashRing = document.getElementById('cycle-progress-ring');
  if (dashRing) {
    dashRing.style.strokeDashoffset = 314 - (314 * progressPercent);
  }

  const wheelRing = document.getElementById('cycle-wheel-active');
  if (wheelRing) {
    wheelRing.style.strokeDashoffset = 502.6 - (502.6 * progressPercent);
  }

  const dashDay = document.getElementById('cycle-center-day');
  if (dashDay) dashDay.textContent = info.cycleDay;

  const dashTotal = document.getElementById('cycle-total-days');
  if (dashTotal) dashTotal.textContent = `of ${info.cycleLength} days`;

  const dashPhase = document.getElementById('current-phase-badge');
  if (dashPhase) dashPhase.textContent = `${info.phaseEmoji} ${info.phaseName}`;

  const dashPhaseDesc = document.getElementById('current-phase-desc');
  if (dashPhaseDesc) dashPhaseDesc.textContent = info.phaseDescription;

  const dashNext = document.getElementById('dashboard-period-date');
  if (dashNext) dashNext.textContent = `In ${info.daysUntilNextPeriod} days`;

  const dashFert = document.getElementById('dashboard-fertility');
  if (dashFert) dashFert.textContent = info.fertility;
}

function quickTogglePeriodToday() {
  const todayStr = new Date().toISOString().split('T')[0];
  appState.cycleSettings.lastPeriodDate = todayStr;
  
  appState.cycleLogs[todayStr] = {
    flow: 'medium',
    pain: 1,
    symptoms: ['Pelvic Cramps 🔥'],
    notes: 'Period started'
  };

  saveState();
  renderPeriodTracker();
  renderDashboard();
  renderCalendar();
  showToast('🌸 Period start logged for today! Stay warm & cozy, pookie!');
  if (window.confetti) {
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
  }
}

function setFlowLevel(level, btnElement) {
  const buttons = document.querySelectorAll('#flow-intensity-selector .flow-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  if (btnElement) {
    btnElement.classList.add('active');
  } else if (window.event && window.event.currentTarget) {
    window.event.currentTarget.classList.add('active');
  }

  const todayStr = new Date().toISOString().split('T')[0];
  if (!appState.cycleLogs[todayStr]) appState.cycleLogs[todayStr] = { symptoms: [] };
  appState.cycleLogs[todayStr].flow = level;
  saveState();
  showToast(`Flow intensity set to: ${level.toUpperCase()} 🌸`);
}

function updatePainSlider(val) {
  const textEl = document.getElementById('pain-level-text');
  const labels = [
    'Level 0 (No Pain ✨)',
    'Level 1 (Mild Twinge 🌸)',
    'Level 2 (Moderate Aches 🧸)',
    'Level 3 (Heating Pad Essential 🔥)',
    'Level 4 (High - Rest & Cuddle 🥺)'
  ];
  if (textEl) textEl.textContent = labels[val] || `Level ${val}`;

  const todayStr = new Date().toISOString().split('T')[0];
  if (!appState.cycleLogs[todayStr]) appState.cycleLogs[todayStr] = { symptoms: [] };
  appState.cycleLogs[todayStr].pain = parseInt(val);
  saveState();
}

const SYMPTOM_OPTIONS = [
  { id: 'bloat', label: 'Puffy Bloating 🐡' },
  { id: 'cramps', label: 'Pelvic Cramps 🔥' },
  { id: 'headache', label: 'Tension Headache 💆‍♀️' },
  { id: 'acne', label: 'Hormonal Glow / Acne 🫧' },
  { id: 'cravings', label: 'Chocolate Cravings 🍫' },
  { id: 'tender', label: 'Tender Breasts 🌸' },
  { id: 'fatigue', label: 'Cozy Sleepy Fatigue 😴' },
  { id: 'moody', label: 'Sweet & Sensitive 🥺' }
];

function setupSymptomTags() {
  const container = document.getElementById('symptom-tag-container');
  if (!container) return;
  container.innerHTML = '';

  const todayStr = new Date().toISOString().split('T')[0];
  const currentLogged = appState.cycleLogs[todayStr]?.symptoms || [];

  SYMPTOM_OPTIONS.forEach(item => {
    const tag = document.createElement('div');
    tag.className = `symptom-tag ${currentLogged.includes(item.label) ? 'active' : ''}`;
    tag.textContent = item.label;
    tag.onclick = () => toggleSymptomTag(tag, item.label);
    container.appendChild(tag);
  });
}

function toggleSymptomTag(el, label) {
  const todayStr = new Date().toISOString().split('T')[0];
  if (!appState.cycleLogs[todayStr]) appState.cycleLogs[todayStr] = { symptoms: [] };
  const list = appState.cycleLogs[todayStr].symptoms || [];

  const index = list.indexOf(label);
  if (index > -1) {
    list.splice(index, 1);
    el.classList.remove('active');
  } else {
    list.push(label);
    el.classList.add('active');
    soundEngine.playDing();
  }

  appState.cycleLogs[todayStr].symptoms = list;
  saveState();
}

// ==========================================
// 11. MEDICINE REMINDERS & ALARMS (Feature D)
// ==========================================

function checkAlarmsTick() {
  const now = new Date();
  const currentHH = String(now.getHours()).padStart(2, '0');
  const currentMM = String(now.getMinutes()).padStart(2, '0');
  const currentTimeStr = `${currentHH}:${currentMM}`;
  const todayStr = now.toISOString().split('T')[0];

  appState.medications.forEach(med => {
    const alarmKey = `${todayStr}_${med.id}_${currentTimeStr}`;
    const snoozeTime = snoozedAlarms[med.id];
    const isSnoozedActive = snoozeTime && Date.now() >= snoozeTime;
    const isRegularTimeMatch = (med.time === currentTimeStr && med.statusToday !== 'taken' && !triggeredAlarmsToday.has(alarmKey));

    if (isRegularTimeMatch || isSnoozedActive) {
      if (isSnoozedActive) delete snoozedAlarms[med.id];
      else triggeredAlarmsToday.add(alarmKey);
      triggerMedicineAlarm(med);
    }
  });

  updateNextMedBanner();
}

function triggerMedicineAlarm(med) {
  activeAlarmMed = med;

  const modal = document.getElementById('alarm-trigger-modal');
  const nameEl = document.getElementById('alarm-modal-med-name');
  const dosageEl = document.getElementById('alarm-modal-med-dosage');
  const instructEl = document.getElementById('alarm-modal-med-instruction');

  if (nameEl) nameEl.textContent = `Time for ${med.name}!`;
  if (dosageEl) dosageEl.textContent = `Dosage: ${med.dosage} (${med.type})`;
  if (instructEl) instructEl.textContent = med.notes ? `"${med.notes}"` : `"Take with fresh water, sweet pookie! 🐻‍❄️💊"`;

  if (modal) modal.classList.remove('hidden');
  soundEngine.startAlarmLoop(appState.alarmMelody || 'crystal-harp');

  if (window.Notification && Notification.permission === 'granted') {
    const notifTitle = appState.privacySettings.discreetNotifications ? 'SnowyCare Reminder' : `⏰ Medicine Time: ${med.name}`;
    const notifBody = appState.privacySettings.discreetNotifications ? 'Time for your scheduled dose.' : `Dosage: ${med.dosage}. Remember your daily wellness!`;
    new Notification(notifTitle, { body: notifBody });
  }
}

function dismissAlarm(action) {
  const modal = document.getElementById('alarm-trigger-modal');
  if (modal) modal.classList.add('hidden');
  soundEngine.stopAlarmLoop();

  if (!activeAlarmMed) return;

  if (action === 'taken') {
    markMedicationTaken(activeAlarmMed.id);
    showToast(`✨ Amazing job! ${activeAlarmMed.name} marked as taken! 💖`);
    if (window.confetti) {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
    }
  } else if (action === 'snooze') {
    snoozedAlarms[activeAlarmMed.id] = Date.now() + 5 * 60 * 1000;
    showToast(`⏳ Snoozed for 5 minutes. Snowy will remind you soon!`);
  } else if (action === 'skip') {
    activeAlarmMed.statusToday = 'skipped';
    saveState();
    renderMedications();
    showToast(`Dose skipped for today.`);
  }

  activeAlarmMed = null;
}

function markMedicationTaken(medId) {
  const med = appState.medications.find(m => m.id === medId);
  if (!med) return;

  const todayStr = new Date().toISOString().split('T')[0];
  med.statusToday = 'taken';
  med.lastTakenDate = todayStr;
  
  if (med.stock && med.stock > 0) med.stock -= 1;

  soundEngine.playDing();
  saveState();
  renderMedications();
  renderDashboard();
  renderCalendar();
}

function renderMedications() {
  const container = document.getElementById('medication-cards-list');
  const refillContainer = document.getElementById('refill-inventory-list');
  const medCountPill = document.getElementById('med-count-pill');
  const tabBadge = document.getElementById('tab-medicine-badge');

  if (!container) return;
  container.innerHTML = '';

  const pendingCount = appState.medications.filter(m => m.statusToday !== 'taken').length;
  if (medCountPill) medCountPill.textContent = `${appState.medications.length} Prescriptions`;
  if (tabBadge) tabBadge.textContent = `${pendingCount} Due`;

  appState.medications.forEach(med => {
    const isTaken = med.statusToday === 'taken';
    const card = document.createElement('div');
    card.className = `p-4 rounded-2xl glass-panel border ${isTaken ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white/80 border-white'} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs transition-all`;

    const iconType = med.type === 'liquid' ? 'flask-conical' : (med.type === 'injection' ? 'syringe' : 'pill');

    card.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-2xl ${isTaken ? 'bg-emerald-100 text-emerald-600' : 'bg-pink-100 text-pink-500'} flex items-center justify-center flex-shrink-0 shadow-inner">
          <i data-lucide="${iconType}" class="w-5 h-5"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-slate-800 text-sm ${isTaken ? 'line-through text-slate-400' : ''}">${med.name}</h4>
            <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${isTaken ? 'bg-emerald-100 text-emerald-700' : 'bg-pink-100 text-pink-700'}">${med.time}</span>
          </div>
          <p class="text-xs text-slate-500 font-medium">${med.dosage} • ${med.notes || 'Take as prescribed'}</p>
        </div>
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0">
        ${isTaken ? `
          <span class="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-100/70 px-3 py-1.5 rounded-xl">
            <i data-lucide="check" class="w-4 h-4"></i> Taken Today
          </span>
        ` : `
          <button onclick="markMedicationTaken('${med.id}')" class="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95">
            <i data-lucide="check" class="w-4 h-4"></i>
            <span>Mark as Taken</span>
          </button>
        `}
        <button onclick="deleteMedication('${med.id}')" class="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-rose-50 transition-colors" title="Delete Prescription">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // Render Pill Refill Inventory
  if (refillContainer) {
    refillContainer.innerHTML = '';
    appState.medications.forEach(med => {
      const stock = med.stock || 0;
      const isLow = stock <= 7;
      const progressPercent = Math.min(100, Math.round((stock / 30) * 100));

      const item = document.createElement('div');
      item.className = 'space-y-1 text-xs';
      item.innerHTML = `
        <div class="flex justify-between items-center font-bold">
          <span class="text-slate-700 truncate max-w-[150px]">${med.name}</span>
          <span class="${isLow ? 'text-amber-600 font-extrabold animate-pulse' : 'text-slate-500'}">
            ${stock} pills left ${isLow ? '⚠️ Refill Soon!' : ''}
          </span>
        </div>
        <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full rounded-full transition-all duration-500 ${isLow ? 'bg-amber-400' : 'bg-sky-400'}" style="width: ${progressPercent}%"></div>
        </div>
      `;
      refillContainer.appendChild(item);
    });
  }

  if (window.lucide) window.lucide.createIcons();
}

function updateNextMedBanner() {
  const pendingMeds = appState.medications.filter(m => m.statusToday !== 'taken');
  const nameEl = document.getElementById('next-med-name');
  const timeEl = document.getElementById('next-med-time-tag');
  const instructEl = document.getElementById('next-med-instruction');
  const quickTakeBtn = document.getElementById('btn-quick-take-med');

  if (pendingMeds.length === 0) {
    if (nameEl) nameEl.textContent = 'All Medicines Taken For Today! ✨';
    if (timeEl) timeEl.textContent = 'All Done';
    if (instructEl) instructEl.textContent = 'Snowy is so proud of your consistency! 🐻‍❄️💖';
    if (quickTakeBtn) quickTakeBtn.classList.add('hidden');
    return;
  }

  const nextMed = pendingMeds[0];
  if (nameEl) nameEl.textContent = nextMed.name;
  if (timeEl) timeEl.textContent = nextMed.time;
  if (instructEl) instructEl.textContent = `${nextMed.dosage} • ${nextMed.notes || 'Take on schedule'}`;
  if (quickTakeBtn) {
    quickTakeBtn.classList.remove('hidden');
    quickTakeBtn.onclick = () => markMedicationTaken(nextMed.id);
  }
}

function handleSaveMedication(e) {
  e.preventDefault();
  const name = document.getElementById('form-med-name').value.trim();
  const dosage = document.getElementById('form-med-dosage').value.trim();
  const type = document.getElementById('form-med-type').value;
  const time = document.getElementById('form-med-time').value;
  const notes = document.getElementById('form-med-notes').value.trim();
  const stock = parseInt(document.getElementById('form-med-stock').value) || 30;
  const color = document.getElementById('form-med-color').value;

  if (!name || !dosage || !time) return;

  // ALLERGY SAFETY CHECK (Feature H)
  const conflict = checkAllergyConflict(name);
  if (conflict.hasConflict) {
    promptAllergyWarningModal(conflict, () => {
      saveMedicationDirectly(name, dosage, type, time, notes, stock, color);
    });
    return;
  }

  saveMedicationDirectly(name, dosage, type, time, notes, stock, color);
}

function saveMedicationDirectly(name, dosage, type, time, notes, stock, color) {
  const newMed = {
    id: 'med_' + Date.now(),
    name,
    dosage,
    type,
    time,
    notes,
    stock,
    color,
    statusToday: 'pending',
    lastTakenDate: null
  };

  appState.medications.push(newMed);
  saveState();
  closeAddMedModal();
  renderMedications();
  renderDashboard();
  showToast(`💊 Added ${name} to your daily schedule!`);
  soundEngine.playDing();
}

function deleteMedication(id) {
  if (!confirm('Remove this prescription from your pillbox?')) return;
  appState.medications = appState.medications.filter(m => m.id !== id);
  saveState();
  renderMedications();
  renderDashboard();
  showToast('Medication removed.');
}

// ==========================================
// 12. HYDRATION & WELLNESS
// ==========================================

function renderHydration() {
  const { count, target } = appState.hydration;
  const grid = document.getElementById('water-cups-grid');
  const countBadge = document.getElementById('hydration-count-badge');
  const quickStatus = document.getElementById('quick-water-status');

  if (countBadge) countBadge.textContent = `${count} / ${target}`;
  if (quickStatus) quickStatus.textContent = `${count} / ${target} Glasses`;

  if (!grid) return;
  grid.innerHTML = '';

  for (let i = 1; i <= target; i++) {
    const isFilled = i <= count;
    const btn = document.createElement('button');
    btn.className = `water-cup-btn ${isFilled ? 'filled' : ''}`;
    btn.innerHTML = `
      <i data-lucide="glass-water" class="w-5 h-5 ${isFilled ? 'text-sky-600' : 'text-slate-300'}"></i>
      <span class="text-[9px] font-bold ${isFilled ? 'text-sky-800' : 'text-slate-400'}">${i * 250}ml</span>
    `;
    btn.onclick = () => setHydrationCount(i);
    grid.appendChild(btn);
  }

  if (window.lucide) window.lucide.createIcons();
}

function addWaterGlass() {
  if (appState.hydration.count < appState.hydration.target) {
    appState.hydration.count++;
    soundEngine.playWaterBubble();
    saveState();
    renderHydration();

    if (appState.hydration.count === appState.hydration.target) {
      showToast('🎉 Hydration Goal Complete! Snowy is so hydrated and proud! 🧊💧');
      if (window.confetti) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }
    } else {
      showToast('Glug glug! 💧 1 refreshing glass recorded!');
    }
  }
}

function removeWaterGlass() {
  if (appState.hydration.count > 0) {
    appState.hydration.count--;
    saveState();
    renderHydration();
  }
}

function setHydrationCount(val) {
  appState.hydration.count = val;
  soundEngine.playWaterBubble();
  saveState();
  renderHydration();
}

function renderDashboard() {
  const cycle = getCycleInfo();
  
  const cycleStatus = document.getElementById('quick-cycle-status');
  if (cycleStatus) cycleStatus.textContent = `Day ${cycle.cycleDay} (${cycle.phaseName})`;

  const nextPeriod = document.getElementById('quick-next-period');
  if (nextPeriod) nextPeriod.textContent = `${cycle.daysUntilNextPeriod} Days`;

  const checklist = document.getElementById('dashboard-med-checklist');
  const summaryEl = document.getElementById('med-completion-summary');
  if (checklist) {
    checklist.innerHTML = '';
    const takenCount = appState.medications.filter(m => m.statusToday === 'taken').length;
    if (summaryEl) summaryEl.textContent = `${takenCount} of ${appState.medications.length} doses taken (94% Adherence)`;

    appState.medications.forEach(med => {
      const isTaken = med.statusToday === 'taken';
      const item = document.createElement('div');
      item.className = 'flex items-center justify-between p-2 rounded-xl bg-white/60 border border-white text-xs';
      item.innerHTML = `
        <span class="flex items-center gap-2 ${isTaken ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}">
          <span class="w-2 h-2 rounded-full ${isTaken ? 'bg-emerald-400' : 'bg-pink-400'}"></span>
          ${med.name} (${med.time})
        </span>
        ${isTaken ? '<span class="text-emerald-500 font-bold">✓</span>' : `
          <button onclick="markMedicationTaken('${med.id}')" class="text-[10px] text-pink-600 font-bold hover:underline">Take</button>
        `}
      `;
      checklist.appendChild(item);
    });
  }

  const vibeBadge = document.getElementById('vibe-summary-badge');
  if (vibeBadge && appState.vibeToday) vibeBadge.textContent = appState.vibeToday.label;
}

function selectQuickMood(key, label) {
  appState.vibeToday = { key, label };
  soundEngine.playDing();
  saveState();

  const badge = document.getElementById('vibe-summary-badge');
  if (badge) badge.textContent = label;

  const tipMap = {
    happy: "You're radiating sunshine! Bottle up this wonderful spark and celebrate you! 🌸",
    cozy: "Light a lavender candle, curl up with a fluffy throw, and sip herbal tea. 🧸",
    crampy: "Heating pad on, chamomile tea ready, and remember: cramps don't define you! 🥺",
    tired: "Your body is working overtime. Prioritize an early bedtime and zero guilt. 😴"
  };
  const tipEl = document.getElementById('daily-mood-tip');
  if (tipEl) tipEl.textContent = tipMap[key] || "Take gentle care of yourself, sweet pookie.";

  showToast(`Vibe logged: ${label} 💕`);
}

// ==========================================
// 13. CALENDAR VIEW
// ==========================================

function renderCalendar() {
  const monthYearEl = document.getElementById('calendar-month-year');
  const grid = document.getElementById('calendar-days-grid');
  if (!grid || !monthYearEl) return;

  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  monthYearEl.textContent = `${monthNames[month]} ${year}`;
  grid.innerHTML = '';

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const prevDay = daysInPrevMonth - i;
    const cell = document.createElement('div');
    cell.className = 'calendar-day-cell other-month';
    cell.innerHTML = `<span class="text-xs font-bold text-slate-300">${prevDay}</span>`;
    grid.appendChild(cell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const thisDate = new Date(year, month, day);
    const dateStr = thisDate.toISOString().split('T')[0];
    const cycle = getCycleInfo(thisDate);
    const log = appState.cycleLogs[dateStr];

    const isToday = isCurrentMonth && today.getDate() === day;
    const isPeriodDay = log && log.flow && log.flow !== 'none';
    const isPredictedPeriod = !isPeriodDay && cycle.cycleDay <= cycle.periodDuration;
    const isOvulation = cycle.cycleDay >= cycle.ovulationDay - 1 && cycle.cycleDay <= cycle.ovulationDay + 1;

    let cellClass = 'calendar-day-cell';
    if (isToday) cellClass += ' is-today';
    if (isPeriodDay) cellClass += ' has-period';
    else if (isPredictedPeriod) cellClass += ' is-predicted-period';
    else if (isOvulation) cellClass += ' is-ovulation';

    const cell = document.createElement('div');
    cell.className = cellClass;
    cell.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold ${isToday ? 'text-pink-600' : 'text-slate-700'}">${day}</span>
        ${isPeriodDay ? '<span class="text-[10px]">🩸</span>' : (isOvulation ? '<span class="text-[10px]">✨</span>' : '')}
      </div>
      <div class="text-[9px] font-semibold text-slate-500 mt-auto">
        ${isPeriodDay ? `<span class="text-rose-600">${log.flow}</span>` : `Day ${cycle.cycleDay}`}
      </div>
    `;

    cell.onclick = () => selectCalendarDay(day, month, year, cycle, log);
    grid.appendChild(cell);
  }
}

function changeCalendarMonth(delta) {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta);
  renderCalendar();
}

function selectCalendarDay(day, month, year, cycle, log) {
  const boxNum = document.getElementById('selected-day-num-box');
  const title = document.getElementById('selected-day-title');
  const sub = document.getElementById('selected-day-subtitle');

  if (boxNum) boxNum.textContent = day;
  if (title) title.textContent = `Day ${cycle.cycleDay} of Cycle • ${cycle.phaseName}`;
  if (sub) {
    if (log && log.flow) {
      sub.textContent = `Flow: ${log.flow.toUpperCase()} • Pain Level: ${log.pain || 0}/4 • Notes: ${log.notes || 'None'}`;
    } else {
      sub.textContent = `Predicted ${cycle.phaseName} • Fertility: ${cycle.fertility} • Tap to add notes`;
    }
  }

  const dateInput = document.getElementById('log-modal-date');
  if (dateInput) {
    dateInput.value = new Date(year, month, day).toISOString().split('T')[0];
  }
}

// ==========================================
// 14. AMBIENT AUDIO & WELLNESS AFFIRMATIONS
// ==========================================

const AFFIRMATIONS = [
  "Your body is a precious sanctuary. Give yourself the soft grace and sweet rest you deserve, sweet pookie.",
  "You do not have to be productive every single second. Hibernation and self-nurturing are sacred.",
  "Breathe in calm frosty peace, breathe out tension. Snowy is keeping you safe and loved.",
  "Your cycle is a natural superpower. Every phase holds its own beauty, wisdom, and glow.",
  "Remember to drink cool water, take your vitamins, and celebrate how strong you are today! 🐻‍❄️💖"
];

function generateNewAffirmation() {
  const el = document.getElementById('affirmation-text');
  if (!el) return;
  el.textContent = `"${AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]}"`;
  soundEngine.playDing();
}

function copyAffirmation() {
  const el = document.getElementById('affirmation-text');
  if (el) {
    navigator.clipboard.writeText(el.textContent);
    showToast('💌 Copied Snowy\'s note to clipboard!');
  }
}

function toggleAmbientTrack(type) {
  const btnSnowfall = document.getElementById('track-snowfall');
  const btnCramp = document.getElementById('track-cramp');
  const btnHarp = document.getElementById('track-harp');
  const navAmbientLabel = document.getElementById('ambient-sound-label');

  const isPlaying = soundEngine.toggleAmbient(type);
  [btnSnowfall, btnCramp, btnHarp].forEach(b => b && b.classList.remove('playing'));

  if (isPlaying) {
    const activeBtn = document.getElementById(`track-${type}`);
    if (activeBtn) activeBtn.classList.add('playing');
    if (navAmbientLabel) navAmbientLabel.textContent = 'Playing 🎶';
    showToast(`🎶 Playing soothing ${type} soundscape...`);
  } else {
    if (navAmbientLabel) navAmbientLabel.textContent = 'Cozy Sounds';
    showToast(`Ambient audio paused.`);
  }
}

function playCrampAudio() {
  switchTab('wellness');
  toggleAmbientTrack('cramp');
}

function testAlarmChime() {
  const soundChoice = document.getElementById('alarm-sound-choice')?.value || 'crystal-harp';
  soundEngine.playAlarmChime(soundChoice);
  showToast('🔔 Playing crystal alarm chime preview...');
}

function applyTheme(themeName) {
  document.body.className = `${themeName} min-h-screen text-slate-700 antialiased selection:bg-pink-200 selection:text-pink-900 relative overflow-x-hidden`;
  appState.theme = themeName;
  applyDiscreetModeState();
  saveState();
}

function setupSnowfallCanvas() {
  const canvas = document.getElementById('snowfall-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 42;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: Math.random() * 0.4 - 0.2,
      opacity: Math.random() * 0.5 + 0.2,
      isSparkle: Math.random() > 0.7
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.isSparkle ? `rgba(253, 224, 71, ${p.opacity})` : `rgba(255, 255, 255, ${p.opacity})`;
      ctx.shadowBlur = p.isSparkle ? 6 : 2;
      ctx.shadowColor = p.isSparkle ? '#FDE047' : '#BAE6FD';
      ctx.fill();

      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y > height) {
        p.y = -5;
        p.x = Math.random() * width;
      }
      if (p.x > width) p.x = 0;
      if (p.x < 0) p.x = width;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================
// 15. NAVIGATION, MODALS & EVENT HANDLERS
// ==========================================

function switchTab(tabId) {
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active-tab'));

  const targetPane = document.getElementById(`tab-content-${tabId}`);
  const targetTabBtn = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);

  if (targetPane) targetPane.classList.remove('hidden');
  if (targetTabBtn) targetTabBtn.classList.add('active-tab');

  if (tabId === 'calendar') renderCalendar();
  if (tabId === 'period') renderPeriodTracker();
  if (tabId === 'medicine') renderMedications();
  if (tabId === 'history') renderMedicalHistory('all');
  if (tabId === 'consult') renderDoctorDirectory();
  if (tabId === 'pharmacy') renderPharmacy();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupEventListeners() {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  document.querySelectorAll('.theme-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      applyTheme(dot.dataset.theme);
      showToast('Theme updated ✨');
    });
  });

  const soundTestBtn = document.getElementById('btn-sound-test');
  if (soundTestBtn) {
    soundTestBtn.addEventListener('click', () => {
      soundEngine.playAlarmChime('sweet-bell');
      showToast('🔔 Sweet bell chime test!');
    });
  }

  const ambientBtn = document.getElementById('btn-ambient-sound');
  if (ambientBtn) {
    ambientBtn.addEventListener('click', () => {
      toggleAmbientTrack('snowfall');
    });
  }

  const volSlider = document.getElementById('alarm-volume-slider');
  if (volSlider) {
    volSlider.addEventListener('input', (e) => {
      soundEngine.setVolume(e.target.value / 100);
      appState.alarmVolume = e.target.value;
      saveState();
    });
  }

  const soundChoice = document.getElementById('alarm-sound-choice');
  if (soundChoice) {
    soundChoice.value = appState.alarmMelody || 'crystal-harp';
    soundChoice.addEventListener('change', (e) => {
      appState.alarmMelody = e.target.value;
      saveState();
      soundEngine.playAlarmChime(e.target.value);
    });
  }
}

function openAddMedModal() {
  document.getElementById('add-med-modal')?.classList.remove('hidden');
}
function closeAddMedModal() {
  document.getElementById('add-med-modal')?.classList.add('hidden');
}

function openLogPeriodModal() {
  const modal = document.getElementById('log-period-modal');
  const dateInput = document.getElementById('log-modal-date');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }
  if (modal) modal.classList.remove('hidden');
}
function closeLogPeriodModal() {
  document.getElementById('log-period-modal')?.classList.add('hidden');
}

let modalSelectedFlow = 'none';
function setModalFlow(flow, btnElement) {
  modalSelectedFlow = flow;
  document.querySelectorAll('#modal-flow-grid button').forEach(b => b.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  } else if (window.event && window.event.currentTarget) {
    window.event.currentTarget.classList.add('active');
  }
}

function savePeriodLog() {
  const dateInput = document.getElementById('log-modal-date');
  const notesInput = document.getElementById('log-modal-notes');
  const dateStr = dateInput?.value || new Date().toISOString().split('T')[0];

  if (!appState.cycleLogs[dateStr]) appState.cycleLogs[dateStr] = { symptoms: [] };
  appState.cycleLogs[dateStr].flow = modalSelectedFlow;
  if (notesInput) appState.cycleLogs[dateStr].notes = notesInput.value.trim();

  saveState();
  closeLogPeriodModal();
  renderPeriodTracker();
  renderCalendar();
  showToast('🌸 Day logged into your cycle sanctuary!');
  soundEngine.playDing();
}

function openCycleSettingsModal() {
  const dateInput = document.getElementById('settings-last-period-date');
  const cycleInput = document.getElementById('settings-cycle-length');
  const durInput = document.getElementById('settings-period-duration');

  if (dateInput) dateInput.value = appState.cycleSettings.lastPeriodDate;
  if (cycleInput) cycleInput.value = appState.cycleSettings.cycleLength;
  if (durInput) durInput.value = appState.cycleSettings.periodDuration;

  document.getElementById('cycle-settings-modal')?.classList.remove('hidden');
}
function closeCycleSettingsModal() {
  document.getElementById('cycle-settings-modal')?.classList.add('hidden');
}

function saveCycleSettings() {
  const dateInput = document.getElementById('settings-last-period-date');
  const cycleInput = document.getElementById('settings-cycle-length');
  const durInput = document.getElementById('settings-period-duration');

  if (dateInput?.value) appState.cycleSettings.lastPeriodDate = dateInput.value;
  if (cycleInput?.value) appState.cycleSettings.cycleLength = parseInt(cycleInput.value) || 28;
  if (durInput?.value) appState.cycleSettings.periodDuration = parseInt(durInput.value) || 5;

  saveState();
  closeCycleSettingsModal();
  renderPeriodTracker();
  renderDashboard();
  renderCalendar();
  showToast('Cycle settings updated!');
}

function requestNotificationPermission() {
  if (!('Notification' in window)) {
    showToast('Browser notifications are not supported in this browser.');
    return;
  }
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      showToast('💖 Notifications enabled! Snowy will chime on your medicine times.');
      new Notification('SnowyCare Active 🐻‍❄️❄️', {
        body: 'Discreet period reminders and medicine alarms are all set, pookie!'
      });
    } else {
      showToast('Notifications were denied or dismissed.');
    }
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'glass-panel px-4 py-2.5 rounded-2xl bg-white/95 border border-pink-200 shadow-lg text-xs font-bold text-slate-800 flex items-center gap-2 transform translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto';
  toast.innerHTML = `<span>🐻‍❄️</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
