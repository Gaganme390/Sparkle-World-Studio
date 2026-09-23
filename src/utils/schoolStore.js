// Centralized Reactive School Data Store for GD Goenka Ayodhya School
// Provides persistent localStorage-backed state with event broadcasting

import { happeningsData } from '../data/happenings';
import { galleryItems } from '../data/gallery';
import { contactDetails, careersData } from '../data/contact';

const STORAGE_KEY = 'gd_goenka_school_data_v4';
const listeners = new Set();

// Helper to format date as YYYY-MM-DD
export const getTodayDateString = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

// Check if a DOB matches today (ignoring birth year)
export const isBirthdayToday = (dobString, simulatedDate = null) => {
  if (!dobString) return false;
  try {
    const targetDate = simulatedDate ? new Date(simulatedDate) : new Date();
    const tMonth = targetDate.getMonth() + 1;
    const tDay = targetDate.getDate();

    // Support YYYY-MM-DD, DD/MM/YYYY, or MM-DD
    let parts;
    if (dobString.includes('-')) {
      parts = dobString.split('-');
      if (parts.length === 3) {
        // YYYY-MM-DD
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        return month === tMonth && day === tDay;
      }
    } else if (dobString.includes('/')) {
      parts = dobString.split('/');
      if (parts.length === 3) {
        // DD/MM/YYYY
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        return month === tMonth && day === tDay;
      }
    }
    const d = new Date(dobString);
    if (!isNaN(d.getTime())) {
      return d.getMonth() + 1 === tMonth && d.getDate() === tDay;
    }
  } catch (e) {
    console.error('Error checking birthday:', e);
  }
  return false;
};

// Check if birthday is coming up in the next 7 days
export const isBirthdayUpcoming = (dobString, daysAhead = 7, simulatedDate = null) => {
  if (!dobString) return false;
  try {
    const baseDate = simulatedDate ? new Date(simulatedDate) : new Date();
    baseDate.setHours(0, 0, 0, 0);

    const b = new Date(dobString);
    if (isNaN(b.getTime())) return false;

    // Create a date for this year
    const thisYearBday = new Date(baseDate.getFullYear(), b.getMonth(), b.getDate());
    const diffTime = thisYearBday - baseDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 && diffDays <= daysAhead;
  } catch (e) {
    return false;
  }
};

// Compute student age from DOB
export const calculateAge = (dobString) => {
  if (!dobString) return null;
  const d = new Date(dobString);
  if (isNaN(d.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
    age--;
  }
  return age > 0 ? age : null;
};

// Today's month and day formatted for sample generation
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
const currentDay = String(today.getDate()).padStart(2, '0');

// Default initial state
const defaultState = {
  adminPin: 'goenka2026',
  simulatedDate: null, // null means use real today date
  bannerConfig: {
    enabled: true,
    title: "🎉 Today's Goenkan Birthday Celebration",
    subtitle: "Wishing our stars endless joy, radiant dreams, and grand success!",
    showWishesModal: true,
    playFanfare: true,
  },
  urgentNotice: {
    enabled: true,
    badge: 'ADMISSIONS 2026-27',
    text: 'Admissions Open for Pre-Primary to Grade XI | Interactive Campus Tours Available Daily',
    link: '/admissions',
    linkText: 'Apply Online',
  },
  birthdays: [
    {
      id: 'bday-1',
      name: 'Aarav Sharma',
      grade: 'Grade 4',
      section: 'A',
      dob: `${currentYear - 9}-${currentMonth}-${currentDay}`, // Today's birthday!
      wishes: 'May your curiosity shine brighter each year! Happy Birthday Aarav!',
      photo: '/school-media/School First Day/DSC_3091.JPG',
      active: true,
    },
    {
      id: 'bday-2',
      name: 'Ananya Verma',
      grade: 'Grade 8',
      section: 'B',
      dob: `${currentYear - 13}-${currentMonth}-${currentDay}`, // Today's birthday!
      wishes: 'Keep aspiring, innovating, and inspiring our school community. Happy Birthday Ananya!',
      photo: '/school-media/Orange Day/Orange Day Pic.jpg',
      active: true,
    },
    {
      id: 'bday-3',
      name: 'Rohan Gupta',
      grade: 'Grade 2',
      section: 'C',
      dob: `${currentYear - 7}-${currentMonth}-${currentDay}`, // Today's birthday!
      wishes: 'Wishing little champion Rohan a joyful day full of smiles, games, and laughter!',
      photo: '/school-media/Blue Day/IMG_6920.JPG',
      active: true,
    },
    {
      id: 'bday-4',
      name: 'Sanya Malhotra',
      grade: 'Grade 6',
      section: 'A',
      dob: `${currentYear - 11}-${currentMonth}-${currentDay}`, // Today's birthday!
      wishes: 'May this year unfold new artistic and academic triumphs for you. Happy Birthday Sanya!',
      photo: '/school-media/School First Day/DSC_3104.JPG',
      active: true,
    },
    {
      id: 'bday-5',
      name: 'Kabir Singhania',
      grade: 'Grade 10',
      section: 'B',
      dob: `${currentYear - 15}-${String((today.getMonth() + 1)).padStart(2, '0')}-${String(Math.min(28, today.getDate() + 2)).padStart(2, '0')}`,
      wishes: 'Wishing Kabir leadership and distinction in upcoming board endeavors!',
      photo: '/school-media/School First Day/DSC_3092.JPG',
      active: true,
    },
    {
      id: 'bday-6',
      name: 'Meera Deshmukh',
      grade: 'Nursery',
      section: 'Lotus',
      dob: `${currentYear - 4}-${String((today.getMonth() + 1)).padStart(2, '0')}-${String(Math.min(28, today.getDate() + 4)).padStart(2, '0')}`,
      wishes: 'Joyful birthday wishes to our darling Goenkan toddler!',
      photo: '/school-media/Orange Day/YDPS6761.JPG',
      active: true,
    }
  ],
  birthdayWishesWall: [
    {
      id: 'wish-1',
      studentName: 'Aarav Sharma',
      senderName: 'Mrs. R. Kapoor (Class Teacher)',
      message: 'Aarav is an inquisitive student with a wonderful spirit. Proud of you!',
      timestamp: 'Today at 08:30 AM'
    },
    {
      id: 'wish-2',
      studentName: 'Ananya Verma',
      senderName: 'Ayodhya Senior Student Council',
      message: 'Happy Birthday Ananya! Shine bright in the upcoming debate symposium!',
      timestamp: 'Today at 09:15 AM'
    }
  ],
  happenings: happeningsData,
  gallery: galleryItems,
  enquiries: [
    {
      id: 'enq-101',
      parentName: 'Vikramaditya Roy',
      phone: '+91 98765 43210',
      email: 'vikram.roy@example.com',
      childName: 'Reyansh Roy',
      applyingGrade: 'Grade 1',
      preferredDate: '2026-09-28',
      message: 'Interested in day boarding and holistic robotics curriculum.',
      status: 'New',
      createdAt: '2026-09-22T10:15:00Z'
    },
    {
      id: 'enq-102',
      parentName: 'Pooja Agarwal',
      phone: '+91 91234 56789',
      email: 'pooja.agarwal@example.com',
      childName: 'Ishaan Agarwal',
      applyingGrade: 'Nursery',
      preferredDate: '2026-09-29',
      message: 'Would love to schedule a morning campus walk and meet the pre-primary coordinator.',
      status: 'Contacted',
      createdAt: '2026-09-21T14:40:00Z'
    }
  ],
  campusVisits: [
    {
      id: 'vis-201',
      parentName: 'Col. Rajesh Tripathi',
      phone: '+91 94150 12345',
      email: 'rtripathi@example.com',
      gradeApplying: 'Grade 6',
      visitDate: '2026-09-26',
      timeSlot: '11:00 AM - 12:30 PM',
      visitorsCount: 3,
      status: 'Confirmed',
      createdAt: '2026-09-22T16:20:00Z'
    }
  ],
  jobOpenings: (careersData || []).map((j) => ({
    ...j,
    status: 'Open',
    postedDate: '2026-09-15'
  })),
  jobApplications: [
    {
      id: 'app-1',
      applicantName: 'Dr. Sunita Sharma',
      email: 'sunita.sharma@example.com',
      phone: '+91 98112 34567',
      positionApplied: 'Post Graduate Teacher (PGT) – Physics & Innovation Lead',
      wing: 'Senior Wing',
      experienceYears: '4.5 Years',
      qualification: 'M.Sc Physics, B.Ed (Gold Medalist)',
      currentSchool: 'Delhi Public School',
      coverNote: 'Passionate physics educator with hands-on experience in leading student robotics and state science exhibitions.',
      resumeUrl: 'https://linkedin.com/in/sunita-sharma-edu',
      status: 'Under Review',
      appliedAt: '2026-09-20T11:30:00Z'
    },
    {
      id: 'app-2',
      applicantName: 'Vikram Singh Chandel',
      email: 'vikram.chandel@example.com',
      phone: '+91 94501 88990',
      positionApplied: 'Sports Coach – Swimming & Athletic Track',
      wing: 'Physical Education Dept',
      experienceYears: '3.5 Years',
      qualification: 'M.P.Ed, NIS Certified Track Coach',
      currentSchool: 'St. Xavier High School',
      coverNote: 'Former state 400m sprinter and certified NIS athletic mentor dedicated to coaching school championship squads.',
      resumeUrl: '',
      status: 'Shortlisted',
      appliedAt: '2026-09-21T15:45:00Z'
    }
  ],
  schoolInfo: {
    name: 'G.D. Goenka Public School, Ayodhya',
    tagline: 'Where Heritage Inspires The Future',
    chairman: 'Mr. Madan Mohan Tripathi',
    principal: 'Dr. Abin C. Raj',
    address: contactDetails.campusAddress,
    phones: contactDetails.phoneNumbers,
    emails: contactDetails.emails,
    timings: contactDetails.timings,
    principalMessage: 'At G.D. Goenka Public School, Ayodhya, we believe education is not the filling of a vessel, but the ignition of a lifelong passion for learning. Through modern facilities like our Digital English Language Lab, athletic championships, and experiential learning, every child discovers their inner brilliance.'
  }
};

// Load state from localStorage or fallback
const loadStoredState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...defaultState,
        ...parsed,
        bannerConfig: { ...defaultState.bannerConfig, ...(parsed.bannerConfig || {}) },
        urgentNotice: { ...defaultState.urgentNotice, ...(parsed.urgentNotice || {}) },
        schoolInfo: { ...defaultState.schoolInfo, ...(parsed.schoolInfo || {}) }
      };
    }
  } catch (err) {
    console.warn('Failed to parse stored school data:', err);
  }
  return defaultState;
};

let currentState = loadStoredState();

// Notify all subscribers
const broadcast = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
  } catch (err) {
    console.error('Failed to persist school data:', err);
  }
  listeners.forEach((listener) => {
    try {
      listener(currentState);
    } catch (e) {
      console.error('Error in school store subscriber:', e);
    }
  });
};

// Public Store API
export const schoolStore = {
  getState: () => currentState,

  subscribe: (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // Birthdays API
  setBirthdays: (birthdays) => {
    currentState = { ...currentState, birthdays };
    broadcast();
  },

  addBirthday: (student) => {
    const newStudent = {
      id: `bday-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      active: true,
      wishes: student.wishes || `Warmest birthday wishes to ${student.name}!`,
      photo: student.photo || '',
      ...student
    };
    currentState = {
      ...currentState,
      birthdays: [newStudent, ...currentState.birthdays]
    };
    broadcast();
    return newStudent;
  },

  updateBirthday: (id, updates) => {
    currentState = {
      ...currentState,
      birthdays: currentState.birthdays.map((b) => (b.id === id ? { ...b, ...updates } : b))
    };
    broadcast();
  },

  deleteBirthday: (id) => {
    currentState = {
      ...currentState,
      birthdays: currentState.birthdays.filter((b) => b.id !== id)
    };
    broadcast();
  },

  importBirthdays: (importedStudents, mode = 'append') => {
    // mode: 'append' or 'replace'
    const formatted = importedStudents.map((item, idx) => ({
      id: `bday-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`,
      name: item.name || 'Unnamed Student',
      grade: item.grade || 'Primary',
      section: item.section || 'A',
      dob: item.dob,
      wishes: item.wishes || `Happy Birthday to ${item.name}!`,
      photo: item.photo || '',
      active: true,
    }));

    currentState = {
      ...currentState,
      birthdays: mode === 'replace' ? formatted : [...formatted, ...currentState.birthdays]
    };
    broadcast();
    return formatted.length;
  },

  addBirthdayWish: (wish) => {
    const newWish = {
      id: `wish-${Date.now()}`,
      timestamp: 'Just now',
      ...wish
    };
    currentState = {
      ...currentState,
      birthdayWishesWall: [newWish, ...(currentState.birthdayWishesWall || [])]
    };
    broadcast();
  },

  // Simulated Date for testing birthday banners on any day
  setSimulatedDate: (dateStr) => {
    currentState = { ...currentState, simulatedDate: dateStr || null };
    broadcast();
  },

  // Banner & Urgent Notice
  setBannerConfig: (bannerConfig) => {
    currentState = {
      ...currentState,
      bannerConfig: { ...currentState.bannerConfig, ...bannerConfig }
    };
    broadcast();
  },

  setUrgentNotice: (urgentNotice) => {
    currentState = {
      ...currentState,
      urgentNotice: { ...currentState.urgentNotice, ...urgentNotice }
    };
    broadcast();
  },

  // Happenings & Events
  setHappenings: (happenings) => {
    currentState = { ...currentState, happenings };
    broadcast();
  },

  addHappening: (item) => {
    const newItem = {
      id: Date.now(),
      featured: false,
      readTime: '3 min read',
      ...item
    };
    currentState = {
      ...currentState,
      happenings: [newItem, ...currentState.happenings]
    };
    broadcast();
    return newItem;
  },

  updateHappening: (id, updates) => {
    currentState = {
      ...currentState,
      happenings: currentState.happenings.map((h) => (h.id === id ? { ...h, ...updates } : h))
    };
    broadcast();
  },

  deleteHappening: (id) => {
    currentState = {
      ...currentState,
      happenings: currentState.happenings.filter((h) => h.id !== id)
    };
    broadcast();
  },

  // Gallery
  setGallery: (gallery) => {
    currentState = { ...currentState, gallery };
    broadcast();
  },

  addGalleryItem: (item) => {
    const newItem = {
      id: Date.now(),
      spanTwo: false,
      ...item
    };
    currentState = {
      ...currentState,
      gallery: [newItem, ...currentState.gallery]
    };
    broadcast();
    return newItem;
  },

  deleteGalleryItem: (id) => {
    currentState = {
      ...currentState,
      gallery: currentState.gallery.filter((g) => g.id !== id)
    };
    broadcast();
  },

  // Enquiries & Campus Visits
  addEnquiry: (enquiry) => {
    const newEnquiry = {
      id: `enq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      ...enquiry
    };
    currentState = {
      ...currentState,
      enquiries: [newEnquiry, ...(currentState.enquiries || [])]
    };
    broadcast();
    return newEnquiry;
  },

  updateEnquiryStatus: (id, status) => {
    currentState = {
      ...currentState,
      enquiries: currentState.enquiries.map((e) => (e.id === id ? { ...e, status } : e))
    };
    broadcast();
  },

  deleteEnquiry: (id) => {
    currentState = {
      ...currentState,
      enquiries: currentState.enquiries.filter((e) => e.id !== id)
    };
    broadcast();
  },

  addCampusVisit: (visit) => {
    const newVisit = {
      id: `vis-${Date.now()}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      ...visit
    };
    currentState = {
      ...currentState,
      campusVisits: [newVisit, ...(currentState.campusVisits || [])]
    };
    broadcast();
    return newVisit;
  },

  updateVisitStatus: (id, status) => {
    currentState = {
      ...currentState,
      campusVisits: currentState.campusVisits.map((v) => (v.id === id ? { ...v, status } : v))
    };
    broadcast();
  },

  deleteCampusVisit: (id) => {
    currentState = {
      ...currentState,
      campusVisits: currentState.campusVisits.filter((v) => v.id !== id)
    };
    broadcast();
  },

  // Job Openings & Hiring API
  addJobOpening: (opening) => {
    const newOpening = {
      id: `job-${Date.now()}`,
      status: 'Open',
      postedDate: getTodayDateString(),
      ...opening
    };
    currentState = {
      ...currentState,
      jobOpenings: [newOpening, ...(currentState.jobOpenings || [])]
    };
    broadcast();
    return newOpening;
  },

  updateJobOpening: (id, updates) => {
    currentState = {
      ...currentState,
      jobOpenings: (currentState.jobOpenings || []).map((j) => (j.id === id ? { ...j, ...updates } : j))
    };
    broadcast();
  },

  toggleJobOpeningStatus: (id) => {
    currentState = {
      ...currentState,
      jobOpenings: (currentState.jobOpenings || []).map((j) => {
        if (j.id === id) {
          const nextStatus = j.status === 'Open' ? 'Closed' : 'Open';
          return { ...j, status: nextStatus };
        }
        return j;
      })
    };
    broadcast();
  },

  deleteJobOpening: (id) => {
    currentState = {
      ...currentState,
      jobOpenings: (currentState.jobOpenings || []).filter((j) => j.id !== id)
    };
    broadcast();
  },

  // Job Applications API
  addJobApplication: (application) => {
    const newApp = {
      id: `app-${Date.now()}`,
      status: 'New',
      appliedAt: new Date().toISOString(),
      ...application
    };
    currentState = {
      ...currentState,
      jobApplications: [newApp, ...(currentState.jobApplications || [])]
    };
    broadcast();
    return newApp;
  },

  updateJobApplicationStatus: (id, status) => {
    currentState = {
      ...currentState,
      jobApplications: (currentState.jobApplications || []).map((a) => (a.id === id ? { ...a, status } : a))
    };
    broadcast();
  },

  deleteJobApplication: (id) => {
    currentState = {
      ...currentState,
      jobApplications: (currentState.jobApplications || []).filter((a) => a.id !== id)
    };
    broadcast();
  },

  // School Info
  setSchoolInfo: (schoolInfo) => {
    currentState = {
      ...currentState,
      schoolInfo: { ...currentState.schoolInfo, ...schoolInfo }
    };
    broadcast();
  },

  // Admin PIN
  setAdminPin: (adminPin) => {
    currentState = { ...currentState, adminPin };
    broadcast();
  },

  // Factory Reset
  resetToDefaults: () => {
    currentState = { ...defaultState };
    broadcast();
  },

  // Export / Import Backup
  exportBackupJSON: () => {
    return JSON.stringify(currentState, null, 2);
  },

  restoreBackupJSON: (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      currentState = { ...defaultState, ...parsed };
      broadcast();
      return true;
    } catch (err) {
      console.error('Invalid backup JSON:', err);
      return false;
    }
  }
};
