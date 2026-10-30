import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, Key, LogOut, ExternalLink, Users, Cake, Calendar, 
  FileSpreadsheet, Download, Upload, Plus, Trash2, Edit3, 
  CheckCircle, AlertCircle, Eye, Search, Filter, Sparkles,
  Image as ImageIcon, Megaphone, Inbox, Settings, RefreshCw, X,
  Briefcase, FileText, Check, CheckSquare, Layers,
  PhoneCall, Phone, Mail, MapPin, Globe, Share2, Save, Headphones
} from 'lucide-react';
import { useSchoolData } from '../hooks/useSchoolData';
import { parseBirthdayExcel, downloadBirthdayExcelTemplate } from '../utils/excelBirthdayParser';
import { isBirthdayToday, calculateAge } from '../utils/schoolStore';
import AdminImageUpload from '../components/AdminImageUpload';
import SiteContentManager from '../components/SiteContentManager';
import AdminConfirmModal, { AdminToast } from '../components/AdminConfirmModal';
import './AdminPage.css';

export default function AdminPage({ setCurrentRoute }) {
  const { 
    adminPin, 
    birthdays, 
    todaysBirthdays, 
    upcomingBirthdays, 
    simulatedDate,
    bannerConfig, 
    urgentNotice,
    happenings,
    gallery,
    enquiries,
    campusVisits,
    jobOpenings,
    jobApplications,
    schoolInfo,
    englishDigitalLab,
    store 
  } = useSchoolData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('gd_goenka_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // UI Confirmation Modal and Toast State
  const [confirmModal, setConfirmModal] = useState(null);
  const [toast, setToast] = useState(null);

  const requestConfirm = ({
    title,
    subtitle,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    onConfirm
  }) => {
    setConfirmModal({
      title,
      subtitle,
      message,
      confirmText,
      cancelText,
      variant,
      onConfirm: () => {
        setConfirmModal(null);
        if (onConfirm) onConfirm();
      },
      onCancel: () => {
        setConfirmModal(null);
      }
    });
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3800);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Active Tab
  const [activeTab, setActiveTab] = useState('birthdays'); // default to birthdays as requested
  const [enquiriesSubTab, setEnquiriesSubTab] = useState('enquiries'); // 'enquiries' | 'visits'

  // Birthday search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all'); // all, today, upcoming

  // Excel Import State
  const [excelFile, setExcelFile] = useState(null);
  const [importPreview, setImportPreview] = useState(null);
  const [isParsingExcel, setIsParsingExcel] = useState(false);
  const [importStatusMessage, setImportStatusMessage] = useState(null);
  const fileInputRef = useRef(null);

  // Manual Add/Edit Birthday Modal State
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentForm, setStudentForm] = useState({
    name: '',
    grade: 'Grade 1',
    section: 'A',
    dob: '',
    wishes: '',
    photo: ''
  });

  // Contact & Social Media Controls State
  const [contactForm, setContactForm] = useState(() => ({
    primaryPhone: schoolInfo?.primaryPhone || (schoolInfo?.phones && schoolInfo?.phones[0]) || '+91 98765 43210',
    secondaryPhone: schoolInfo?.secondaryPhone || (schoolInfo?.phones && schoolInfo?.phones[1]) || '+91 5278 290100',
    whatsapp: schoolInfo?.whatsapp || '+91 98765 43210',
    admissionsEmail: schoolInfo?.admissionsEmail || (schoolInfo?.emails && schoolInfo?.emails.admissions) || 'admissions@gdgoenkaayodhya.com',
    infoEmail: schoolInfo?.infoEmail || (schoolInfo?.emails && schoolInfo?.emails.info) || 'info@gdgoenkaayodhya.com',
    careersEmail: schoolInfo?.careersEmail || (schoolInfo?.emails && schoolInfo?.emails.careers) || 'careers@gdgoenkaayodhya.com',
    address: schoolInfo?.address || 'G.D. Goenka Public School Campus, NH-28 / Highway Corridor, Ayodhya, Uttar Pradesh – 224001',
    officeHours: schoolInfo?.officeHours || schoolInfo?.timings || 'Monday – Saturday: 8:00 AM – 4:30 PM (Closed on Sundays & National Holidays)',
    description: schoolInfo?.description || 'Where heritage inspires the future. A premium, modern learning environment fostering curiosity, character, creativity, and global leadership in Ayodhya.',
    copyright: schoolInfo?.copyright || `© ${new Date().getFullYear()} G.D. Goenka Public School, Ayodhya. All Rights Reserved.`,
    socialLinks: Array.isArray(schoolInfo?.socialLinks) && schoolInfo.socialLinks.length > 0 ? schoolInfo.socialLinks : [
      { platform: 'Facebook', url: 'https://facebook.com' },
      { platform: 'Instagram', url: 'https://instagram.com' },
      { platform: 'YouTube', url: 'https://youtube.com' },
      { platform: 'LinkedIn', url: 'https://linkedin.com' }
    ]
  }));

  useEffect(() => {
    if (schoolInfo) {
      setContactForm(prev => ({
        ...prev,
        primaryPhone: schoolInfo.primaryPhone || (schoolInfo.phones && schoolInfo.phones[0]) || prev.primaryPhone,
        secondaryPhone: schoolInfo.secondaryPhone || (schoolInfo.phones && schoolInfo.phones[1]) || prev.secondaryPhone,
        whatsapp: schoolInfo.whatsapp || prev.whatsapp,
        admissionsEmail: schoolInfo.admissionsEmail || (schoolInfo.emails && schoolInfo.emails.admissions) || prev.admissionsEmail,
        infoEmail: schoolInfo.infoEmail || (schoolInfo.emails && schoolInfo.emails.info) || prev.infoEmail,
        careersEmail: schoolInfo.careersEmail || (schoolInfo.emails && schoolInfo.emails.careers) || prev.careersEmail,
        address: schoolInfo.address || prev.address,
        officeHours: schoolInfo.officeHours || schoolInfo.timings || prev.officeHours,
        description: schoolInfo.description || prev.description,
        copyright: schoolInfo.copyright || prev.copyright,
        socialLinks: Array.isArray(schoolInfo.socialLinks) && schoolInfo.socialLinks.length > 0 ? schoolInfo.socialLinks : prev.socialLinks
      }));
    }
  }, [schoolInfo]);

  const handleUpdateSocialLink = (index, field, value) => {
    setContactForm(prev => {
      const updated = [...prev.socialLinks];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, socialLinks: updated };
    });
  };

  const handleAddSocialLink = () => {
    setContactForm(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: 'New Platform', url: 'https://' }]
    }));
  };

  const handleRemoveSocialLink = (index) => {
    setContactForm(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSaveContactDetails = (e) => {
    if (e) e.preventDefault();
    const cleanSocials = (contactForm.socialLinks || []).filter(item => item && item.platform && item.platform.trim());
    const updated = {
      ...contactForm,
      socialLinks: cleanSocials,
      phones: [contactForm.primaryPhone, contactForm.secondaryPhone].filter(Boolean),
      emails: {
        admissions: contactForm.admissionsEmail,
        info: contactForm.infoEmail,
        careers: contactForm.careersEmail
      },
      timings: contactForm.officeHours
    };
    store.setSchoolInfo(updated);
    showToast('School contact & social media details updated live across website!', 'success');
  };

  // Happenings Modal State
  const [isAddHappeningOpen, setIsAddHappeningOpen] = useState(false);
  const [happeningForm, setHappeningForm] = useState({
    category: 'Events',
    title: '',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    summary: '',
    content: '',
    image: '/school-media/Opening Photos/A/DSC_7282.JPG'
  });

  // Gallery Modal State
  const [isAddGalleryOpen, setIsAddGalleryOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    category: 'Campus',
    title: '',
    caption: '',
    image: '/school-media/Opening Photos/0/DSC_1334.JPG'
  });

  // Careers & Job Recruitment State
  const [careersSubTab, setCareersSubTab] = useState('openings'); // 'openings' | 'applications'
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [selectedAppDetail, setSelectedAppDetail] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    wing: 'Senior Wing',
    type: 'Full-Time',
    experience: '2-4 Years',
    qualification: 'Relevant Masters + B.Ed',
    status: 'Open'
  });

  const exportJobApplicationsCSV = () => {
    const list = jobApplications || [];
    if (list.length === 0) {
      showToast('No job applications to export yet.', 'info');
      return;
    }
    const headers = ['Ref ID', 'Candidate Name', 'Email', 'Phone', 'Position', 'Wing', 'Experience', 'Qualification', 'Current School', 'Attached File', 'Resume URL', 'Status', 'Date Applied'];
    const rows = list.map(app => [
      `"${app.id || ''}"`,
      `"${(app.applicantName || '').replace(/"/g, '""')}"`,
      `"${(app.email || '').replace(/"/g, '""')}"`,
      `"${(app.phone || '').replace(/"/g, '""')}"`,
      `"${(app.positionApplied || '').replace(/"/g, '""')}"`,
      `"${(app.wing || '').replace(/"/g, '""')}"`,
      `"${(app.experienceYears || '').replace(/"/g, '""')}"`,
      `"${(app.qualification || '').replace(/"/g, '""')}"`,
      `"${(app.currentSchool || '').replace(/"/g, '""')}"`,
      `"${(app.resumeFileName || '').replace(/"/g, '""')}"`,
      `"${(app.resumeUrl || '').replace(/"/g, '""')}"`,
      `"${(app.status || 'New').replace(/"/g, '""')}"`,
      `"${(app.appliedAt || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gd_goenka_job_applications_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Login Handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === adminPin || pinInput === 'goenka2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('gd_goenka_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Invalid Admin PIN. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('gd_goenka_admin_auth');
  };

  // Excel File Upload Handler
  const handleExcelDrop = async (e) => {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    if (files && files.length > 0) {
      processExcelFile(files[0]);
    }
  };

  const processExcelFile = async (file) => {
    setExcelFile(file);
    setIsParsingExcel(true);
    setImportStatusMessage(null);
    try {
      const result = await parseBirthdayExcel(file);
      setImportPreview(result);
    } catch (err) {
      setImportStatusMessage({ type: 'error', text: err.message });
    } finally {
      setIsParsingExcel(false);
    }
  };

  const handleConfirmImport = (mode) => {
    if (!importPreview || !importPreview.students) return;
    const count = store.importBirthdays(importPreview.students, mode);
    setImportStatusMessage({ 
      type: 'success', 
      text: `Successfully imported ${count} student birthdays into the school directory!` 
    });
    setImportPreview(null);
    setExcelFile(null);
  };

  // Student Save (Add or Update)
  const handleSaveStudent = (e) => {
    e.preventDefault();
    if (!studentForm.name.trim() || !studentForm.dob) return;

    if (editingStudent) {
      store.updateBirthday(editingStudent.id, studentForm);
    } else {
      store.addBirthday(studentForm);
    }

    setIsAddStudentOpen(false);
    setEditingStudent(null);
    setStudentForm({ name: '', grade: 'Grade 1', section: 'A', dob: '', wishes: '', photo: '' });
  };

  const openEditStudent = (student) => {
    setEditingStudent(student);
    setStudentForm({
      name: student.name,
      grade: student.grade,
      section: student.section || 'A',
      dob: student.dob,
      wishes: student.wishes || '',
      photo: student.photo || ''
    });
    setIsAddStudentOpen(true);
  };

  // Filtered Birthdays
  const filteredBirthdays = birthdays.filter((b) => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.grade.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filterPeriod === 'today') {
      return isBirthdayToday(b.dob, simulatedDate);
    }
    if (filterPeriod === 'upcoming') {
      return upcomingBirthdays.some((u) => u.id === b.id);
    }
    return true;
  });

  // Admissions Enquiries Filter & Modal State
  const [enquirySearchQuery, setEnquirySearchQuery] = useState('');
  const [enquiryStreamFilter, setEnquiryStreamFilter] = useState('All');
  const [selectedEnquiryDetail, setSelectedEnquiryDetail] = useState(null);

  // Digital English Language Lab State
  const [labForm, setLabForm] = useState(() => ({
    enabled: englishDigitalLab?.enabled ?? true,
    title: englishDigitalLab?.title || 'Digital English Language Lab',
    badge: englishDigitalLab?.badge || 'AYODHYA’S 1ST DIGITAL LAB',
    motto: englishDigitalLab?.motto || 'Phonetics, Fluent Oratory & Global Articulation',
    image: englishDigitalLab?.image || '/school-media/Digital Lab/lab_honeycomb_16x9_computers.jpg',
    primaryDesc: englishDigitalLab?.primaryDesc || 'Interactive language workstations with audio headsets, Lexile-graded Collins reading modules, phonics reinforcement, and vocabulary expansion software developing fluent reading comprehension and confident spoken expression.',
    middleDesc: englishDigitalLab?.middleDesc || 'Interactive language workstations with audio headsets, Lexile-graded comprehension, vocabulary expansion, and simulated debate modules developing persuasive public speaking and bilingual fluency.',
    seniorDesc: englishDigitalLab?.seniorDesc || 'State-of-the-art multimedia phonetic booths, automated voice-modulation software, and oratory analysis suites preparing senior scholars for national debates, MUNs, IELTS/TOEFL, and global university interviews.',
    showInPrimary: englishDigitalLab?.showInPrimary ?? true,
    showInMiddle: englishDigitalLab?.showInMiddle ?? true,
    showInSenior: englishDigitalLab?.showInSenior ?? true
  }));

  useEffect(() => {
    if (englishDigitalLab) {
      setLabForm({
        enabled: englishDigitalLab.enabled ?? true,
        title: englishDigitalLab.title || 'Digital English Language Lab',
        badge: englishDigitalLab.badge || 'AYODHYA’S 1ST DIGITAL LAB',
        motto: englishDigitalLab.motto || 'Phonetics, Fluent Oratory & Global Articulation',
        image: englishDigitalLab.image || '/school-media/Digital Lab/lab_honeycomb_16x9_computers.jpg',
        primaryDesc: englishDigitalLab.primaryDesc || '',
        middleDesc: englishDigitalLab.middleDesc || '',
        seniorDesc: englishDigitalLab.seniorDesc || '',
        showInPrimary: englishDigitalLab.showInPrimary ?? true,
        showInMiddle: englishDigitalLab.showInMiddle ?? true,
        showInSenior: englishDigitalLab.showInSenior ?? true
      });
    }
  }, [englishDigitalLab]);

  const handleSaveEnglishDigitalLab = (e) => {
    if (e) e.preventDefault();
    store.setEnglishDigitalLab(labForm);
    showToast('Digital English Language Lab card updated live across Primary, Middle, and Senior Wings!', 'success');
  };


  // Export Enquiries to CSV with full Subject Track & Stream details
  const exportEnquiriesCSV = () => {
    if (!enquiries || enquiries.length === 0) return;
    const headers = [
      'Ref ID',
      'Parent Name',
      'Phone',
      'Email',
      'Child Name',
      'Applying Grade',
      'Senior Stream',
      'Subject Track / Elective',
      'Target Senior Class',
      'Career Focus',
      'Preferred Date',
      'Status',
      'Parent Message / Notes',
      'Date Submitted'
    ];
    const rows = enquiries.map((e) => [
      `"${e.id || ''}"`,
      `"${(e.parentName || '').replace(/"/g, '""')}"`,
      `"${(e.phone || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.childName || '').replace(/"/g, '""')}"`,
      `"${(e.applyingGrade || '').replace(/"/g, '""')}"`,
      `"${(e.stream || '-').replace(/"/g, '""')}"`,
      `"${(e.subjectTrack || '-').replace(/"/g, '""')}"`,
      `"${(e.targetSeniorGrade || '-').replace(/"/g, '""')}"`,
      `"${(e.careerGoal || '-').replace(/"/g, '""')}"`,
      `"${(e.preferredDate || '-').replace(/"/g, '""')}"`,
      `"${(e.status || 'New').replace(/"/g, '""')}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${(e.createdAt || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `GD_Goenka_Admissions_Enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Admissions Enquiries
  const filteredEnquiries = (enquiries || []).filter((enq) => {
    const q = enquirySearchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      (enq.parentName || '').toLowerCase().includes(q) ||
      (enq.childName || '').toLowerCase().includes(q) ||
      (enq.phone || '').toLowerCase().includes(q) ||
      (enq.email || '').toLowerCase().includes(q) ||
      (enq.stream || '').toLowerCase().includes(q) ||
      (enq.subjectTrack || '').toLowerCase().includes(q) ||
      (enq.applyingGrade || '').toLowerCase().includes(q) ||
      (enq.targetSeniorGrade || '').toLowerCase().includes(q) ||
      (enq.careerGoal || '').toLowerCase().includes(q) ||
      (enq.message || '').toLowerCase().includes(q)
    );
    if (!matchesSearch) return false;

    if (enquiryStreamFilter === 'All') return true;
    if (enquiryStreamFilter === 'Senior') {
      return (enq.applyingGrade || '').includes('Senior') || !!enq.stream;
    }
    if (enquiryStreamFilter === 'Science') {
      return (enq.stream || '').toLowerCase().includes('science');
    }
    if (enquiryStreamFilter === 'Commerce') {
      return (enq.stream || '').toLowerCase().includes('commerce');
    }
    if (enquiryStreamFilter === 'Humanities') {
      return (enq.stream || '').toLowerCase().includes('humanities');
    }
    if (enquiryStreamFilter === 'Robotics') {
      return (enq.stream || '').toLowerCase().includes('robotics') || (enq.subjectTrack || '').toLowerCase().includes('robotics');
    }
    if (enquiryStreamFilter === 'OtherWings') {
      return !(enq.applyingGrade || '').includes('Senior') && !enq.stream;
    }
    return true;
  });


  // Export Campus Visits CSV
  const exportCampusVisitsCSV = () => {
    if (!campusVisits || campusVisits.length === 0) return;
    const headers = ['Visitor/Parent Name', 'Phone', 'Email', 'Child Name', 'Grade Applying', 'Visit Date', 'Time Slot', 'Tour Type', 'Visitors', 'Interests', 'Status', 'Special Requests'];
    const rows = campusVisits.map((v) => [
      `"${v.parentName}"`,
      `"${v.phone}"`,
      `"${v.email}"`,
      `"${v.childName || ''}"`,
      `"${v.gradeApplying || ''}"`,
      `"${v.preferredDate || ''}"`,
      `"${v.preferredTime || ''}"`,
      `"${v.tourType || ''}"`,
      `"${v.visitorCount || ''}"`,
      `"${(v.interests || []).join('; ')}"`,
      `"${v.status || 'Confirmed'}"`,
      `"${(v.specialRequests || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `GD_Goenka_Campus_Visits_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const jsonStr = store.exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gd_goenka_ayodhya_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  // If Not Authenticated, show Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-crest">G</div>
          <h1 className="admin-login-title">GD GOENKA</h1>
          <p className="admin-login-sub">Ayodhya Campus • Administrative Portal</p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-input-group">
              <label className="admin-input-label">Security Access PIN</label>
              <input 
                type="password"
                className="admin-input"
                placeholder="Enter Admin PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
                required
              />
            </div>

            {pinError && (
              <div style={{ color: '#EF4444', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', justifyContent: 'center' }}>
                <AlertCircle size={15} /> {pinError}
              </div>
            )}

            <button type="submit" className="btn-admin-primary" style={{ width: '100%' }}>
              <Key size={16} /> Authenticate Access
            </button>
          </form>

          <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(18, 57, 133, 0.12)', paddingTop: '1.25rem' }}>
            <button 
              type="button" 
              onClick={() => setCurrentRoute('/')}
              className="btn-admin-secondary" 
              style={{ width: '100%', fontSize: '0.82rem' }}
            >
              <ExternalLink size={14} /> Return to Public Website
            </button>
            <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.75rem' }}>
              Default School PIN: <strong>goenka2026</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page-root">
      {/* Top Navbar */}
      <header className="admin-navbar">
        <div className="admin-nav-brand">
          <div className="admin-crest-small">G</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-primary-dark, #123985)', letterSpacing: '0.04em' }}>
              GD GOENKA AYODHYA
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)' }}>
              Executive Administration & Content Suite
            </div>
          </div>
        </div>

        <div className="admin-nav-actions">
          <button 
            type="button" 
            className="btn-admin-secondary"
            onClick={() => setCurrentRoute('/')}
            title="View public website"
          >
            <Eye size={15} />
            <span>Live Site</span>
          </button>

          <button 
            type="button" 
            className="btn-admin-secondary"
            onClick={handleLogout}
            style={{ color: '#EF4444' }}
            title="Logout"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Layout */}
      <div className="admin-layout">
        {/* Left Sidebar */}
        <aside className="admin-sidebar">
          <button 
            className={`admin-tab-btn ${activeTab === 'birthdays' ? 'active' : ''}`}
            onClick={() => setActiveTab('birthdays')}
          >
            <Cake size={18} />
            <span>Student Birthdays</span>
            {todaysBirthdays.length > 0 && (
              <span className="admin-tab-badge">{todaysBirthdays.length} Today</span>
            )}
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Users size={18} />
            <span>Overview & Stats</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <ImageIcon size={18} />
            <span>Occasions & Gallery</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'happenings' ? 'active' : ''}`}
            onClick={() => setActiveTab('happenings')}
          >
            <Calendar size={18} />
            <span>Happenings & News</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            <Megaphone size={18} />
            <span>Announcements & Ticker</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
          >
            <Inbox size={18} />
            <span>Admissions Enquiries</span>
            {((enquiries?.length || 0) + (campusVisits?.length || 0)) > 0 && (
              <span className="admin-tab-badge">{(enquiries?.length || 0) + (campusVisits?.length || 0)}</span>
            )}
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'digitallab' ? 'active' : ''}`}
            onClick={() => setActiveTab('digitallab')}
          >
            <Headphones size={18} />
            <span>Digital English Lab</span>
            <span className="admin-tab-badge" style={{ background: labForm.enabled ? '#123985' : '#94A3B8', color: '#fff' }}>
              {labForm.enabled ? '3 Wings' : 'Off'}
            </span>
          </button>
          <button 
            className={`admin-tab-btn ${activeTab === 'careers' ? 'active' : ''}`}
            onClick={() => setActiveTab('careers')}
          >
            <Briefcase size={18} />
            <span>Careers & Hiring</span>
            {(jobApplications?.length || 0) > 0 && (
              <span className="admin-tab-badge">{jobApplications?.length || 0}</span>
            )}
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <PhoneCall size={18} />
            <span>Contact & Social Links</span>
            <span className="admin-tab-badge" style={{ background: '#123985', color: '#fff' }}>Footer & Web</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} />
            <span>Settings & Backups</span>
          </button>

          <button 
            className={`admin-tab-btn ${activeTab === 'sitecontent' ? 'active' : ''}`}
            onClick={() => setActiveTab('sitecontent')}
            style={{ fontWeight: 700 }}
          >
            <Layers size={18} />
            <span>Website Photos & Content</span>
            <span className="admin-tab-badge" style={{ background: 'var(--color-accent, #b39759)', color: '#fff' }}>ALL CMS</span>
          </button>
        </aside>

        {/* Right Content Area */}
        <main className="admin-main-content">
          {activeTab === 'sitecontent' && <SiteContentManager />}

          {/* ========================================================
              TAB 1: STUDENT BIRTHDAYS & EXCEL IMPORTER
          ======================================================== */}
          {activeTab === 'birthdays' && (
            <div>
              <div className="admin-section-header">
                <div className="admin-title-group">
                  <h1>Student Birthdays & Celebration Engine</h1>
                  <p>Upload Excel spreadsheets (.xlsx, .csv), manage birthdays, and power the live website celebration banner.</p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    className="btn-admin-secondary"
                    onClick={downloadBirthdayExcelTemplate}
                    title="Download ready-to-fill Excel template"
                  >
                    <Download size={16} />
                    <span>Download Excel Template</span>
                  </button>

                  <button 
                    type="button" 
                    className="btn-admin-primary"
                    onClick={() => {
                      setEditingStudent(null);
                      setStudentForm({ name: '', grade: 'Grade 1', section: 'A', dob: '', wishes: '', photo: '' });
                      setIsAddStudentOpen(true);
                    }}
                  >
                    <Plus size={16} />
                    <span>Add Student</span>
                  </button>
                </div>
              </div>

              {/* Status Alert Message */}
              {importStatusMessage && (
                <div 
                  style={{
                    background: importStatusMessage.type === 'success' ? '#F0FDF4' : '#FEF2F2',
                    border: `1px solid ${importStatusMessage.type === 'success' ? '#BBF7D0' : '#FECACA'}`,
                    color: importStatusMessage.type === 'success' ? '#15803D' : '#B91C1C',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {importStatusMessage.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    <span>{importStatusMessage.text}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setImportStatusMessage(null)}
                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Excel Import Dropzone */}
              <div 
                className="excel-dropzone-box"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleExcelDrop}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept=".xlsx, .xls, .csv"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      processExcelFile(e.target.files[0]);
                    }
                  }}
                />

                <div className="excel-drop-icon">
                  <FileSpreadsheet size={28} />
                </div>
                <div className="excel-dropzone-title">
                  Import Student Birthdays via Excel (.xlsx / .csv)
                </div>
                <p className="excel-dropzone-desc">
                  Drag & drop your student birthday spreadsheet here, or click to browse. Columns supported: 
                  <strong> Student Name, Grade, Section, Date of Birth (DOB), Photo URL, Wishes</strong>.
                </p>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button type="button" className="btn-admin-primary" style={{ pointerEvents: 'none' }}>
                    <Upload size={15} /> Select Excel File
                  </button>
                </div>
              </div>

              {/* Excel Parse Preview Modal */}
              {importPreview && (
                <div className="admin-modal-overlay">
                  <div className="admin-modal-card" style={{ maxWidth: '720px' }}>
                    <div className="admin-modal-title">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileSpreadsheet size={22} style={{ color: 'var(--color-accent)' }} />
                        <span>Excel Import Preview: {excelFile?.name}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setImportPreview(null)}
                        style={{ background: 'none', border: 'none', color: 'var(--color-warm-gray-600, #555555)', cursor: 'pointer' }}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', background: 'var(--color-warm-gray-100, #F3EFEA)', border: '1px solid rgba(18, 57, 133, 0.08)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray-600, #555555)' }}>Total Rows</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-dark, #123985)' }}>{importPreview.totalRows}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray-600, #555555)' }}>Valid Records</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#22C55E' }}>{importPreview.validCount}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray-600, #555555)' }}>Birthdays Today</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-accent)' }}>
                          {importPreview.students.filter((s) => isBirthdayToday(s.dob, simulatedDate)).length}
                        </div>
                      </div>
                    </div>

                    {importPreview.warnings && importPreview.warnings.length > 0 && (
                      <div style={{ background: '#FEFCE8', border: '1px solid #FDE047', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#854D0E' }}>
                        <strong>Note:</strong> {importPreview.warnings.length} rows had warnings (e.g. missing dates defaulted to today).
                      </div>
                    )}

                    <div style={{ maxHeight: '240px', overflowY: 'auto', marginBottom: '1.5rem' }}>
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Student Name</th>
                            <th>Grade</th>
                            <th>Section</th>
                            <th>Date of Birth</th>
                          </tr>
                        </thead>
                        <tbody>
                          {importPreview.students.slice(0, 10).map((st, i) => (
                            <tr key={i}>
                              <td style={{ fontWeight: 700 }}>{st.name}</td>
                              <td>{st.grade}</td>
                              <td>{st.section}</td>
                              <td>{st.dob}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {importPreview.students.length > 10 && (
                        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-warm-gray-600, #555555)', marginTop: '0.5rem' }}>
                          Showing first 10 of {importPreview.students.length} students...
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                      <button 
                        type="button" 
                        className="btn-admin-secondary"
                        onClick={() => setImportPreview(null)}
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        className="btn-admin-secondary"
                        onClick={() => handleConfirmImport('replace')}
                        title="Replaces current list completely"
                      >
                        Replace Entire List ({importPreview.validCount})
                      </button>
                      <button 
                        type="button" 
                        className="btn-admin-primary"
                        onClick={() => handleConfirmImport('append')}
                      >
                        Append to Existing Directory
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Date Simulator Bar (Test birthday banner for ANY date!) */}
              <div 
                style={{
                  background: '#FFFFFF', boxShadow: '0 4px 18px rgba(18, 57, 133, 0.04)',
                  border: '1px solid rgba(179, 151, 89, 0.3)',
                  padding: '1rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Sparkles size={18} style={{ color: 'var(--color-accent)' }} />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-primary-dark, #123985)' }}>
                      Live Date Simulator
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray-600, #555555)' }}>
                      Test what parents and students see on the website for any chosen date!
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input 
                    type="date" 
                    className="admin-input"
                    style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
                    value={simulatedDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => store.setSimulatedDate(e.target.value)}
                  />
                  {simulatedDate && (
                    <button 
                      type="button" 
                      className="btn-admin-secondary"
                      style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }}
                      onClick={() => store.setSimulatedDate(null)}
                    >
                      Reset to Real Today
                    </button>
                  )}
                </div>
              </div>

              {/* Search & Filter Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '320px' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-warm-gray-600, #555555)' }} />
                  <input 
                    type="text" 
                    className="admin-input"
                    placeholder="Search by student name or grade..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    type="button" 
                    className={`btn-admin-secondary ${filterPeriod === 'all' ? 'active' : ''}`}
                    style={filterPeriod === 'all' ? { borderColor: 'var(--color-accent)', color: 'var(--color-accent)' } : {}}
                    onClick={() => setFilterPeriod('all')}
                  >
                    All ({birthdays.length})
                  </button>
                  <button 
                    type="button" 
                    className={`btn-admin-secondary ${filterPeriod === 'today' ? 'active' : ''}`}
                    style={filterPeriod === 'today' ? { borderColor: 'var(--color-accent)', color: 'var(--color-accent)' } : {}}
                    onClick={() => setFilterPeriod('today')}
                  >
                    🎂 Today's Birthdays ({todaysBirthdays.length})
                  </button>
                  <button 
                    type="button" 
                    className={`btn-admin-secondary ${filterPeriod === 'upcoming' ? 'active' : ''}`}
                    style={filterPeriod === 'upcoming' ? { borderColor: 'var(--color-accent)', color: 'var(--color-accent)' } : {}}
                    onClick={() => setFilterPeriod('upcoming')}
                  >
                    Upcoming 7 Days ({upcomingBirthdays.length})
                  </button>
                </div>
              </div>

              {/* Birthdays Table */}
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Class & Wing</th>
                      <th>Date of Birth</th>
                      <th>Age</th>
                      <th>Website Banner Status</th>
                      <th>Custom Blessing</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBirthdays.length > 0 ? (
                      filteredBirthdays.map((student) => {
                        const isToday = isBirthdayToday(student.dob, simulatedDate);
                        const age = calculateAge(student.dob);

                        return (
                          <tr key={student.id}>
                            <td>
                              <div className="student-row-user">
                                {student.photo ? (
                                  <img src={student.photo} alt={student.name} className="student-table-avatar" />
                                ) : (
                                  <div className="student-table-avatar-fallback">
                                    {student.name.charAt(0)}
                                  </div>
                                )}
                                <div>
                                  <div style={{ fontWeight: 700, color: 'var(--color-primary-dark, #123985)' }}>{student.name}</div>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray-600, #555555)' }}>ID: {student.id.slice(0, 10)}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span style={{ fontWeight: 600 }}>{student.grade}</span>
                              {student.section && <span style={{ color: 'var(--color-warm-gray-600, #555555)' }}> - Sec {student.section}</span>}
                            </td>
                            <td>{student.dob}</td>
                            <td>{age ? `${age} yrs` : '—'}</td>
                            <td>
                              {isToday ? (
                                <span className="student-today-badge">
                                  <Sparkles size={12} /> Today's Star!
                                </span>
                              ) : (
                                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Upcoming</span>
                              )}
                            </td>
                            <td style={{ maxWidth: '240px', fontSize: '0.8rem', color: 'var(--color-warm-gray-800, #333333)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              "{student.wishes || '—'}"
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <button 
                                type="button" 
                                className="admin-action-btn"
                                onClick={() => openEditStudent(student)}
                                title="Edit"
                              >
                                <Edit3 size={15} />
                              </button>
                              <button 
                                type="button" 
                                className="admin-action-btn delete"
                                onClick={() => store.deleteBirthday(student.id)}
                                title="Delete"
                              >
                                <Trash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-warm-gray-600, #555555)' }}>
                          No students matched your search criteria. Try clearing filters or importing your Excel sheet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: OVERVIEW & DASHBOARD STATS
          ======================================================== */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="admin-section-header">
                <div className="admin-title-group">
                  <h1>Executive Overview</h1>
                  <p>Welcome to GD Goenka Ayodhya Administrative Suite. Monitor admissions, birthdays, and campus publications.</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="admin-metrics-grid">
                <div className="admin-metric-card">
                  <div className="admin-metric-icon">
                    <Cake size={20} />
                  </div>
                  <div className="admin-metric-num">{todaysBirthdays.length}</div>
                  <div className="admin-metric-label">Today's Birthday Stars</div>
                </div>

                <div className="admin-metric-card">
                  <div className="admin-metric-icon">
                    <Users size={20} />
                  </div>
                  <div className="admin-metric-num">{birthdays.length}</div>
                  <div className="admin-metric-label">Registered Students</div>
                </div>

                <div className="admin-metric-card">
                  <div className="admin-metric-icon">
                    <Inbox size={20} />
                  </div>
                  <div className="admin-metric-num">{enquiries.length}</div>
                  <div className="admin-metric-label">Admissions Enquiries</div>
                </div>

                <div className="admin-metric-card">
                  <div className="admin-metric-icon">
                    <Calendar size={20} />
                  </div>
                  <div className="admin-metric-num">{happenings.length}</div>
                  <div className="admin-metric-label">Published Happenings</div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div style={{ background: '#FFFFFF', boxShadow: '0 4px 18px rgba(18, 57, 133, 0.04)', border: '1px solid rgba(18, 57, 133, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark, #123985)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={18} style={{ color: 'var(--color-accent)' }} /> Quick Actions
                </h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    className="btn-admin-primary"
                    onClick={() => setActiveTab('birthdays')}
                  >
                    <Upload size={15} /> Import Student Birthdays (.xlsx)
                  </button>
                  <button 
                    type="button" 
                    className="btn-admin-secondary"
                    onClick={() => setActiveTab('announcements')}
                  >
                    <Megaphone size={15} /> Edit Top Announcement Ticker
                  </button>
                  <button 
                    type="button" 
                    className="btn-admin-secondary"
                    onClick={() => setActiveTab('enquiries')}
                  >
                    <Inbox size={15} /> Review Parent Inquiries ({enquiries.length})
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: OCCASIONS & GALLERY MANAGER
          ======================================================== */}
          {activeTab === 'gallery' && (
            <div>
              <div className="admin-section-header">
                <div className="admin-title-group">
                  <h1>Occasions & Campus Gallery Manager</h1>
                  <p>Curate photos for school occasions, sports days, cultural conclaves, and campus facilities.</p>
                </div>
                <button 
                  type="button" 
                  className="btn-admin-primary"
                  onClick={() => setIsAddGalleryOpen(true)}
                >
                  <Plus size={16} /> Add Gallery Photo
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {gallery.map((item) => (
                  <div 
                    key={item.id}
                    style={{
                      background: '#FFFFFF', boxShadow: '0 4px 18px rgba(18, 57, 133, 0.04)',
                      border: '1px solid rgba(18, 57, 133, 0.08)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span 
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: 'rgba(0,0,0,0.75)',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-full)'
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h4 style={{ color: 'var(--color-primary-dark, #123985)', fontSize: '1rem', marginBottom: '0.35rem' }}>{item.title}</h4>
                      <p style={{ color: 'var(--color-warm-gray-600, #555555)', fontSize: '0.82rem', marginBottom: '1rem', flex: 1 }}>{item.caption}</p>

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button 
                          type="button" 
                          className="admin-action-btn delete"
                          onClick={() => store.deleteGalleryItem(item.id)}
                          title="Remove photo"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: HAPPENINGS & NEWS MANAGER
          ======================================================== */}
          {activeTab === 'happenings' && (
            <div>
              <div className="admin-section-header">
                <div className="admin-title-group">
                  <h1>Happenings & News Publications</h1>
                  <p>Publish school events, achievements, press releases, and pedagogical blog posts.</p>
                </div>
                <button 
                  type="button" 
                  className="btn-admin-primary"
                  onClick={() => setIsAddHappeningOpen(true)}
                >
                  <Plus size={16} /> Create Article / Event
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {happenings.map((item) => (
                  <div 
                    key={item.id}
                    style={{
                      background: '#FFFFFF', boxShadow: '0 4px 18px rgba(18, 57, 133, 0.04)',
                      border: '1px solid rgba(18, 57, 133, 0.08)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ width: '80px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} 
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span className="admin-badge-gold" style={{ fontSize: '0.72rem', padding: '0.15rem 0.55rem' }}>
                            {item.category}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray-600, #555555)' }}>{item.date}</span>
                        </div>
                        <h4 style={{ color: 'var(--color-primary-dark, #123985)', fontSize: '1rem' }}>{item.title}</h4>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button 
                        type="button" 
                        className="admin-action-btn delete"
                        onClick={() => store.deleteHappening(item.id)}
                        title="Delete article"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: ANNOUNCEMENTS & BANNER CONTROLS
          ======================================================== */}
          {activeTab === 'announcements' && (
            <div>
              <div className="admin-section-header">
                <div className="admin-title-group">
                  <h1>Banner & Announcement Controls</h1>
                  <p>Configure the live Birthday Celebration Banner and the Top Admissions Alert Ticker.</p>
                </div>
              </div>

              {/* Birthday Banner Controls */}
              <div style={{ background: '#FFFFFF', boxShadow: '0 4px 18px rgba(18, 57, 133, 0.04)', border: '1px solid rgba(179, 151, 89, 0.35)', borderRadius: 'var(--radius-md)', padding: '1.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Cake size={22} style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <h3 style={{ color: 'var(--color-primary-dark, #123985)', fontSize: '1.15rem' }}>Website Birthday Celebration Banner</h3>
                      <p style={{ color: 'var(--color-warm-gray-600, #555555)', fontSize: '0.85rem' }}>Displays automatically at the top of the website whenever students have birthdays today.</p>
                    </div>
                  </div>

                  <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: bannerConfig.enabled ? '#22C55E' : '#94A3B8', fontWeight: 700 }}>
                      {bannerConfig.enabled ? 'ACTIVE' : 'DISABLED'}
                    </span>
                    <input 
                      type="checkbox"
                      checked={bannerConfig.enabled}
                      onChange={(e) => store.setBannerConfig({ enabled: e.target.checked })}
                      style={{ width: '20px', height: '20px', accentColor: 'var(--color-accent)' }}
                    />
                  </label>
                </div>

                <div className="admin-form-grid">
                  <div>
                    <label className="admin-input-label">Banner Celebration Title</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={bannerConfig.title || ''}
                      onChange={(e) => store.setBannerConfig({ title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-input-label">School Blessing Quote</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={bannerConfig.subtitle || ''}
                      onChange={(e) => store.setBannerConfig({ subtitle: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Urgent Admissions Ticker Controls */}
              <div style={{ background: '#FFFFFF', boxShadow: '0 4px 18px rgba(18, 57, 133, 0.04)', border: '1px solid rgba(18, 57, 133, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Megaphone size={22} style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <h3 style={{ color: 'var(--color-primary-dark, #123985)', fontSize: '1.15rem' }}>Top Admissions / Alert Ticker</h3>
                      <p style={{ color: 'var(--color-warm-gray-600, #555555)', fontSize: '0.85rem' }}>High-visibility notice strip for admission session updates and urgent school circulars.</p>
                    </div>
                  </div>

                  <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: urgentNotice.enabled ? '#22C55E' : '#94A3B8', fontWeight: 700 }}>
                      {urgentNotice.enabled ? 'ACTIVE' : 'DISABLED'}
                    </span>
                    <input 
                      type="checkbox"
                      checked={urgentNotice.enabled}
                      onChange={(e) => store.setUrgentNotice({ enabled: e.target.checked })}
                      style={{ width: '20px', height: '20px', accentColor: 'var(--color-accent)' }}
                    />
                  </label>
                </div>

                <div className="admin-form-grid">
                  <div>
                    <label className="admin-input-label">Ticker Badge Tag</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={urgentNotice.badge || ''}
                      onChange={(e) => store.setUrgentNotice({ badge: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-input-label">Action Link</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={urgentNotice.link || ''}
                      onChange={(e) => store.setUrgentNotice({ link: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-full">
                    <label className="admin-input-label">Announcement Content</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={urgentNotice.text || ''}
                      onChange={(e) => store.setUrgentNotice({ text: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 6: ADMISSIONS ENQUIRIES & VISITS
          ======================================================== */}
          {activeTab === 'enquiries' && (
            <div>
              <div className="admin-section-header">
                <div className="admin-title-group">
                  <h1>Parent Admissions & Campus Walkthroughs</h1>
                  <p>Real-time log of parent enquiries, fee booklet requests, and campus visit bookings submitted online.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {enquiriesSubTab === 'enquiries' ? (
                    <button 
                      type="button" 
                      className="btn-admin-primary"
                      onClick={exportEnquiriesCSV}
                    >
                      <Download size={16} /> Export Enquiries (CSV)
                    </button>
                  ) : (
                    <button 
                      type="button" 
                      className="btn-admin-primary"
                      onClick={exportCampusVisitsCSV}
                    >
                      <Download size={16} /> Export Walkthroughs (CSV)
                    </button>
                  )}
                </div>
              </div>

              {/* Sub-tab Navigation */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(18, 57, 133, 0.08)', paddingBottom: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setEnquiriesSubTab('enquiries')}
                  style={{
                    background: enquiriesSubTab === 'enquiries' ? 'var(--color-primary-dark, #123985)' : '#F3EFEA',
                    color: enquiriesSubTab === 'enquiries' ? '#FFFFFF' : 'var(--color-warm-gray-600, #555555)',
                    border: 'none',
                    padding: '0.5rem 1.15rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Inbox size={15} /> General & Fee Enquiries ({enquiries.length})
                </button>
                <button
                  type="button"
                  onClick={() => setEnquiriesSubTab('visits')}
                  style={{
                    background: enquiriesSubTab === 'visits' ? 'var(--color-primary-dark, #123985)' : '#F3EFEA',
                    color: enquiriesSubTab === 'visits' ? '#FFFFFF' : 'var(--color-warm-gray-600, #555555)',
                    border: 'none',
                    padding: '0.5rem 1.15rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Calendar size={15} /> Campus Walkthrough Bookings ({campusVisits?.length || 0})
                </button>
              </div>

              {/* SUBTAB 1: Enquiries & Fee Requests */}
              {enquiriesSubTab === 'enquiries' && (
                <div>
                  {/* Real-time Search & Senior Wing Stream Filter Bar */}
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(18, 57, 133, 0.08)',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    marginBottom: '1.25rem',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem'
                  }}>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '420px' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                        <input
                          type="text"
                          className="admin-input"
                          placeholder="Search parent, child, stream, subject..."
                          value={enquirySearchQuery}
                          onChange={(e) => setEnquirySearchQuery(e.target.value)}
                          style={{ paddingLeft: '2.4rem', height: '40px', fontSize: '0.86rem' }}
                        />
                        {enquirySearchQuery && (
                          <button
                            type="button"
                            onClick={() => setEnquirySearchQuery('')}
                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#64748B' }}>
                        <span>Showing: <strong>{filteredEnquiries.length}</strong> of {enquiries.length} enquiries</span>
                      </div>
                    </div>

                    {/* Stream Quick Filter Badges */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-primary-dark, #123985)', marginRight: '0.25rem' }}>
                        Stream Filter:
                      </span>
                      {[
                        { id: 'All', label: 'All Inquiries', count: enquiries.length },
                        { id: 'Senior', label: 'Senior Wing (All)', count: enquiries.filter(e => e.stream || e.applyingGrade?.includes('Senior')).length },
                        { id: 'Science', label: 'Science Stream', count: enquiries.filter(e => (e.stream || '').toLowerCase().includes('science')).length },
                        { id: 'Commerce', label: 'Commerce Stream', count: enquiries.filter(e => (e.stream || '').toLowerCase().includes('commerce')).length },
                        { id: 'Humanities', label: 'Humanities & Arts', count: enquiries.filter(e => (e.stream || '').toLowerCase().includes('humanities')).length },
                        { id: 'Robotics', label: 'Robotics & STEM', count: enquiries.filter(e => (e.stream || '').toLowerCase().includes('robotics') || (e.subjectTrack || '').toLowerCase().includes('robotics')).length },
                        { id: 'OtherWings', label: 'Junior / Primary / Middle', count: enquiries.filter(e => !e.stream && !e.applyingGrade?.includes('Senior')).length }
                      ].map((filter) => (
                        <button
                          key={filter.id}
                          type="button"
                          onClick={() => setEnquiryStreamFilter(filter.id)}
                          style={{
                            background: enquiryStreamFilter === filter.id ? 'var(--color-primary-dark, #123985)' : '#F3EFEA',
                            color: enquiryStreamFilter === filter.id ? '#FFFFFF' : 'var(--color-warm-gray-700, #4A5568)',
                            border: enquiryStreamFilter === filter.id ? '1px solid var(--color-primary-dark, #123985)' : '1px solid rgba(0,0,0,0.06)',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            transition: 'all 0.18s ease'
                          }}
                        >
                          <span>{filter.label}</span>
                          <span style={{
                            background: enquiryStreamFilter === filter.id ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.08)',
                            color: enquiryStreamFilter === filter.id ? '#FFFFFF' : '#4A5568',
                            fontSize: '0.68rem',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '9999px',
                            fontWeight: 800
                          }}>
                            {filter.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Parent & Contact</th>
                          <th>Child Name</th>
                          <th>Applying Grade</th>
                          <th>Senior Stream & Specific Subject</th>
                          <th>Career Goal / Notes</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEnquiries.length > 0 ? (
                          filteredEnquiries.map((enq) => {
                            const isSenior = (enq.applyingGrade || '').includes('Senior') || !!enq.stream;
                            return (
                              <tr key={enq.id}>
                                <td style={{ fontWeight: 700, color: 'var(--color-primary-dark, #123985)' }}>
                                  <div>{enq.parentName}</div>
                                  <div style={{ fontSize: '0.78rem', fontWeight: 500, color: '#334155', marginTop: '2px' }}>{enq.phone}</div>
                                  <div style={{ fontSize: '0.75rem', fontWeight: 400, color: '#64748B' }}>{enq.email}</div>
                                </td>
                                <td style={{ fontWeight: 600 }}>{enq.childName}</td>
                                <td>
                                  <span className="admin-badge-gold" style={{ fontSize: '0.78rem' }}>
                                    {enq.applyingGrade}
                                  </span>
                                  {enq.targetSeniorGrade && (
                                    <div style={{ fontSize: '0.72rem', color: '#123985', fontWeight: 700, marginTop: '3px' }}>
                                      {enq.targetSeniorGrade}
                                    </div>
                                  )}
                                </td>
                                <td>
                                  {isSenior ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                                      {enq.stream && (
                                        <span style={{
                                          background: 'var(--color-primary-dark, #123985)',
                                          color: '#FFFFFF',
                                          fontSize: '0.72rem',
                                          fontWeight: 800,
                                          padding: '2px 8px',
                                          borderRadius: '4px',
                                          letterSpacing: '0.02em',
                                          display: 'inline-block'
                                        }}>
                                          {enq.stream}
                                        </span>
                                      )}
                                      {enq.subjectTrack ? (
                                        <div style={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '4px',
                                          background: 'rgba(179, 151, 89, 0.15)',
                                          color: '#8C6D23',
                                          border: '1px solid rgba(179, 151, 89, 0.35)',
                                          padding: '2px 8px',
                                          borderRadius: '4px',
                                          fontSize: '0.74rem',
                                          fontWeight: 700
                                        }} title={enq.subjectTrack}>
                                          <span>📖 {enq.subjectTrack}</span>
                                        </div>
                                      ) : (
                                        <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>All Stream Core Subjects</span>
                                      )}
                                    </div>
                                  ) : (
                                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>General Admission</span>
                                  )}
                                </td>
                                <td style={{ maxWidth: '240px', fontSize: '0.78rem', color: 'var(--color-warm-gray-800, #333333)' }}>
                                  {enq.careerGoal && (
                                    <div style={{ fontWeight: 700, color: 'var(--color-accent, #b39759)', fontSize: '0.72rem', marginBottom: '2px' }}>
                                      🎯 {enq.careerGoal}
                                    </div>
                                  )}
                                  <div style={{ fontWeight: 600, color: '#64748B', marginBottom: '2px' }}>
                                    {enq.preferredDate ? `Preferred: ${enq.preferredDate}` : (enq.createdAt ? enq.createdAt.split('T')[0] : 'General Query')}
                                  </div>
                                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#475569' }} title={enq.message}>
                                    {enq.message || 'No additional note'}
                                  </div>
                                </td>
                                <td>
                                  <select 
                                    value={enq.status || 'New'}
                                    onChange={(e) => store.updateEnquiryStatus(enq.id, e.target.value)}
                                    className="admin-input"
                                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem', width: 'auto' }}
                                  >
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Interview Scheduled">Interview Scheduled</option>
                                    <option value="Enrolled">Enrolled</option>
                                  </select>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                  <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                                    <button 
                                      type="button" 
                                      className="admin-action-btn edit"
                                      onClick={() => setSelectedEnquiryDetail(enq)}
                                      title="View complete enquiry details"
                                      style={{ color: 'var(--color-primary-dark, #123985)' }}
                                    >
                                      <Eye size={15} />
                                    </button>
                                    <button 
                                      type="button" 
                                      className="admin-action-btn delete"
                                      onClick={() => store.deleteEnquiry(enq.id)}
                                      title="Delete inquiry"
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-warm-gray-600, #555555)' }}>
                              {enquirySearchQuery || enquiryStreamFilter !== 'All' 
                                ? 'No enquiries match your search or filter criteria.' 
                                : 'No parent enquiries received yet.'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Detail Modal for Selected Enquiry */}
                  {selectedEnquiryDetail && (
                    <div className="admin-modal-backdrop" onClick={() => setSelectedEnquiryDetail(null)}>
                      <div className="admin-modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(18, 57, 133, 0.1)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                          <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-accent, #b39759)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                              Admissions Dossier
                            </span>
                            <h3 style={{ margin: '0.2rem 0 0', color: 'var(--color-primary-dark, #123985)', fontSize: '1.3rem' }}>
                              Enquiry Details: {selectedEnquiryDetail.childName}
                            </h3>
                          </div>
                          <button
                            type="button"
                            className="btn-close-modal"
                            onClick={() => setSelectedEnquiryDetail(null)}
                            style={{ background: '#F3EFEA', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                          <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Parent / Guardian</div>
                            <div style={{ fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{selectedEnquiryDetail.parentName}</div>
                            <div style={{ fontSize: '0.82rem', color: '#334155', marginTop: '4px' }}>📞 {selectedEnquiryDetail.phone}</div>
                            <div style={{ fontSize: '0.82rem', color: '#334155' }}>✉️ {selectedEnquiryDetail.email}</div>
                          </div>

                          <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Student Information</div>
                            <div style={{ fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{selectedEnquiryDetail.childName}</div>
                            <div style={{ fontSize: '0.82rem', color: '#334155', marginTop: '4px' }}>
                              Wing: <strong>{selectedEnquiryDetail.applyingGrade}</strong>
                            </div>
                            {selectedEnquiryDetail.targetSeniorGrade && (
                              <div style={{ fontSize: '0.82rem', color: 'var(--color-primary-dark, #123985)', fontWeight: 700 }}>
                                Target Class: {selectedEnquiryDetail.targetSeniorGrade}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Subject Track & Stream Highlight */}
                        {(selectedEnquiryDetail.stream || selectedEnquiryDetail.subjectTrack) && (
                          <div style={{
                            background: '#FDFBF7',
                            border: '1.5px solid rgba(179, 151, 89, 0.4)',
                            borderRadius: '10px',
                            padding: '1rem 1.15rem',
                            marginBottom: '1.25rem'
                          }}>
                            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-accent, #b39759)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                              Senior Secondary Subject Specialization
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                              <div>
                                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Selected Academic Stream:</span>
                                <div style={{ fontWeight: 800, color: 'var(--color-primary-dark, #123985)', fontSize: '0.95rem' }}>
                                  {selectedEnquiryDetail.stream || 'General'}
                                </div>
                              </div>
                              <div>
                                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Specific Subject / Elective Track:</span>
                                <div style={{ fontWeight: 800, color: '#8C6D23', fontSize: '0.95rem' }}>
                                  📖 {selectedEnquiryDetail.subjectTrack || 'All Core Subjects'}
                                </div>
                              </div>
                            </div>
                            {selectedEnquiryDetail.careerGoal && (
                              <div style={{ marginTop: '0.65rem', paddingTop: '0.5rem', borderTop: '1px dashed rgba(179, 151, 89, 0.25)' }}>
                                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Career / Entrance Exam Goal:</span>
                                <div style={{ fontWeight: 700, color: 'var(--color-primary-dark, #123985)', fontSize: '0.88rem' }}>
                                  🎯 {selectedEnquiryDetail.careerGoal}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
                          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Parent Message / Specific Query</div>
                          <div style={{ fontSize: '0.88rem', color: '#1E293B', marginTop: '4px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                            {selectedEnquiryDetail.message || 'No additional query text entered.'}
                          </div>
                          {selectedEnquiryDetail.preferredDate && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--color-accent, #b39759)', fontWeight: 700, marginTop: '0.5rem' }}>
                              Requested Campus Visit Date: {selectedEnquiryDetail.preferredDate}
                            </div>
                          )}
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <a
                              href={`tel:${selectedEnquiryDetail.phone}`}
                              className="btn-admin-primary"
                              style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', textDecoration: 'none' }}
                            >
                              📞 Call Parent
                            </a>
                            <a
                              href={`mailto:${selectedEnquiryDetail.email}`}
                              className="btn-admin-secondary"
                              style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', textDecoration: 'none' }}
                            >
                              ✉️ Email Prospectus
                            </a>
                          </div>

                          <button
                            type="button"
                            className="btn-admin-secondary"
                            onClick={() => setSelectedEnquiryDetail(null)}
                            style={{ padding: '0.45rem 1.25rem', fontSize: '0.82rem' }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB 2: Campus Walkthrough Bookings */}
              {enquiriesSubTab === 'visits' && (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Parent / Visitor</th>
                        <th>Contact</th>
                        <th>Child & Grade</th>
                        <th>Scheduled Date & Time</th>
                        <th>Tour Details</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(campusVisits && campusVisits.length > 0) ? (
                        campusVisits.map((vis) => (
                          <tr key={vis.id}>
                            <td style={{ fontWeight: 700, color: 'var(--color-primary-dark, #123985)' }}>
                              <div>{vis.parentName}</div>
                              {vis.visitorCount && (
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)' }}>
                                  {vis.visitorCount} {vis.visitorCount === 1 ? 'Visitor' : 'Visitors'}
                                </div>
                              )}
                            </td>
                            <td>
                              <div>{vis.phone}</div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray-600, #555555)' }}>{vis.email}</div>
                            </td>
                            <td>
                              <div>{vis.childName || 'Prospective Student'}</div>
                              {vis.gradeApplying && (
                                <span className="admin-badge-gold" style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                                  {vis.gradeApplying}
                                </span>
                              )}
                            </td>
                            <td>
                              <div style={{ fontWeight: 600, color: 'var(--color-primary-dark, #123985)' }}>{vis.preferredDate || 'TBD'}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray-600, #555555)' }}>{vis.preferredTime || 'Morning Session'}</div>
                            </td>
                            <td style={{ maxWidth: '220px', fontSize: '0.78rem' }}>
                              <div style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{vis.tourType || 'Comprehensive Campus Tour'}</div>
                              {vis.interests && vis.interests.length > 0 && (
                                <div style={{ color: 'var(--color-warm-gray-600, #555555)', fontSize: '0.72rem', marginTop: '2px' }}>
                                  {vis.interests.slice(0, 3).join(', ')}
                                </div>
                              )}
                              {vis.specialRequests && (
                                <div style={{ color: 'var(--color-warm-gray-800, #333333)', fontStyle: 'italic', fontSize: '0.72rem', marginTop: '2px' }} title={vis.specialRequests}>
                                  "{vis.specialRequests.slice(0, 45)}{vis.specialRequests.length > 45 ? '...' : ''}"
                                </div>
                              )}
                            </td>
                            <td>
                              <select 
                                value={vis.status || 'Confirmed'}
                                onChange={(e) => store.updateVisitStatus(vis.id, e.target.value)}
                                className="admin-input"
                                style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem', width: 'auto' }}
                              >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Rescheduled">Rescheduled</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <button 
                                type="button" 
                                className="admin-action-btn delete"
                                onClick={() => store.deleteCampusVisit(vis.id)}
                                title="Delete booking"
                              >
                                <Trash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-warm-gray-600, #555555)' }}>
                            No campus visit bookings received yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

                    {/* ========================================================
              TAB: DIGITAL ENGLISH LANGUAGE LAB CARD CONTROLS
          ======================================================== */}
          {activeTab === 'digitallab' && (
            <div>
              <div className="admin-section-header">
                <div className="admin-title-group">
                  <h1>Digital English Language Lab Controls</h1>
                  <p>Manage the English Digital Lab card presence, images, badges, and curriculum descriptions across Senior, Middle, and Junior Wings.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <button 
                    type="button" 
                    className="btn-admin-secondary"
                    onClick={() => {
                      setLabForm({
                        enabled: true,
                        title: 'Digital English Language Lab',
                        badge: 'AYODHYA’S 1ST DIGITAL LAB',
                        motto: 'Phonetics, Fluent Oratory & Global Articulation',
                        image: '/school-media/Digital Lab/lab_honeycomb_16x9_computers.jpg',
                        primaryDesc: 'Interactive language workstations with audio headsets, Lexile-graded Collins reading modules, phonics reinforcement, and vocabulary expansion software developing fluent reading comprehension and confident spoken expression.',
                        middleDesc: 'Interactive language workstations with audio headsets, Lexile-graded comprehension, vocabulary expansion, and simulated debate modules developing persuasive public speaking and bilingual fluency.',
                        seniorDesc: 'State-of-the-art multimedia phonetic booths, automated voice-modulation software, and oratory analysis suites preparing senior scholars for national debates, MUNs, IELTS/TOEFL, and global university interviews.',
                        showInPrimary: true,
                        showInMiddle: true,
                        showInSenior: true
                      });
                      showToast('Reset English Digital Lab form to Goenka defaults.', 'info');
                    }}
                  >
                    <RefreshCw size={15} /> Reset Defaults
                  </button>
                  <button 
                    type="button" 
                    className="btn-admin-primary"
                    onClick={handleSaveEnglishDigitalLab}
                  >
                    <Save size={16} /> Save Lab Settings
                  </button>
                </div>
              </div>

              {/* Master Status & Wing Presence Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                {/* Master Switch Card */}
                <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(18, 57, 133, 0.1)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Headphones size={22} style={{ color: 'var(--color-primary-dark, #123985)' }} />
                      <div>
                        <h4 style={{ margin: 0, color: 'var(--color-primary-dark, #123985)', fontSize: '1rem' }}>Global Status</h4>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Master switch across entire website</span>
                      </div>
                    </div>
                    <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: labForm.enabled ? '#22C55E' : '#94A3B8', fontWeight: 800 }}>
                        {labForm.enabled ? 'ACTIVE' : 'DISABLED'}
                      </span>
                      <input 
                        type="checkbox"
                        checked={labForm.enabled}
                        onChange={(e) => setLabForm({ ...labForm, enabled: e.target.checked })}
                        style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary-dark, #123985)' }}
                      />
                    </label>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0 }}>
                    When enabled, the Digital English Language Lab card displays in the Inspired Spaces section for the checked wings below.
                  </p>
                </div>

                {/* Individual Wing Presence Controls */}
                <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(18, 57, 133, 0.1)', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                  <h4 style={{ margin: '0 0 0.85rem', color: 'var(--color-primary-dark, #123985)', fontSize: '1rem' }}>
                    Wing Visibility Toggles
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '0.4rem 0.6rem', borderRadius: '6px', background: labForm.showInPrimary ? 'rgba(34, 197, 94, 0.08)' : '#F8FAFC' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#1E293B' }}>Primary Wing (Grades 3 to 5)</span>
                      <input 
                        type="checkbox"
                        checked={labForm.showInPrimary}
                        onChange={(e) => setLabForm({ ...labForm, showInPrimary: e.target.checked })}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary-dark, #123985)' }}
                      />
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '0.4rem 0.6rem', borderRadius: '6px', background: labForm.showInMiddle ? 'rgba(34, 197, 94, 0.08)' : '#F8FAFC' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#1E293B' }}>Middle Wing (Grades 6 to 8)</span>
                      <input 
                        type="checkbox"
                        checked={labForm.showInMiddle}
                        onChange={(e) => setLabForm({ ...labForm, showInMiddle: e.target.checked })}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary-dark, #123985)' }}
                      />
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '0.4rem 0.6rem', borderRadius: '6px', background: labForm.showInSenior ? 'rgba(34, 197, 94, 0.08)' : '#F8FAFC' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#1E293B' }}>Senior Wing (Grades 9 to 12)</span>
                      <input 
                        type="checkbox"
                        checked={labForm.showInSenior}
                        onChange={(e) => setLabForm({ ...labForm, showInSenior: e.target.checked })}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary-dark, #123985)' }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Card Photo & Branding Details */}
              <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', border: '1px solid rgba(18, 57, 133, 0.1)', marginBottom: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <h3 style={{ margin: '0 0 1.25rem', color: 'var(--color-primary-dark, #123985)', fontSize: '1.15rem' }}>
                  Card Media, Header & Badge
                </h3>

                <div className="admin-form-grid" style={{ marginBottom: '1.25rem' }}>
                  <div>
                    <label className="admin-input-label">Card Display Title</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={labForm.title}
                      onChange={(e) => setLabForm({ ...labForm, title: e.target.value })}
                      placeholder="e.g. Digital English Language Lab"
                    />
                  </div>
                  <div>
                    <label className="admin-input-label">Pill Badge / Tag Text</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={labForm.badge}
                      onChange={(e) => setLabForm({ ...labForm, badge: e.target.value })}
                      placeholder="e.g. AYODHYA'S 1ST DIGITAL LAB"
                    />
                  </div>
                </div>

                <div className="admin-form-grid" style={{ marginBottom: '1.25rem' }}>
                  <div>
                    <label className="admin-input-label">Motto / Subtitle (Displayed in Senior Wing)</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={labForm.motto}
                      onChange={(e) => setLabForm({ ...labForm, motto: e.target.value })}
                      placeholder="e.g. Phonetics, Fluent Oratory & Global Articulation"
                    />
                  </div>
                  <div>
                    <label className="admin-input-label">Card Image URL / Path</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={labForm.image}
                      onChange={(e) => setLabForm({ ...labForm, image: e.target.value })}
                    />
                  </div>
                </div>

                {/* Quick Image Presets */}
                <div>
                  <label className="admin-input-label" style={{ marginBottom: '0.45rem' }}>Quick Preset Lab Photos:</label>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {[
                      { label: 'Honeycomb Computers Panorama', url: '/school-media/Digital Lab/lab_honeycomb_16x9_computers.jpg' },
                      { label: 'Linguistics Headset Close-up', url: '/school-media/Digital Lab/language_lab_headset.jpg' },
                      { label: 'Workstations Framed View', url: '/school-media/Digital Lab/lab_honeycomb_computers_framed.jpg' }
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setLabForm({ ...labForm, image: preset.url })}
                        style={{
                          background: labForm.image === preset.url ? 'var(--color-primary-dark, #123985)' : '#F3EFEA',
                          color: labForm.image === preset.url ? '#FFFFFF' : '#334155',
                          border: 'none',
                          padding: '0.4rem 0.85rem',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Wing-Specific Custom Descriptions */}
              <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', border: '1px solid rgba(18, 57, 133, 0.1)', marginBottom: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
                <h3 style={{ margin: '0 0 0.35rem', color: 'var(--color-primary-dark, #123985)', fontSize: '1.15rem' }}>
                  Tailored Descriptions by Wing
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  Customize the pedagogical description for each age group to highlight foundational phonics, intermediate debate, or senior board/interview preparation.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label className="admin-input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="admin-badge-gold" style={{ fontSize: '0.7rem' }}>Primary Wing</span>
                      <span>Reading Fluency, Lexile Comprehension & Phonics (Grades 3 to 5)</span>
                    </label>
                    <textarea 
                      className="admin-textarea"
                      rows={3}
                      value={labForm.primaryDesc}
                      onChange={(e) => setLabForm({ ...labForm, primaryDesc: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="admin-input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="admin-badge-gold" style={{ fontSize: '0.7rem' }}>Middle Wing</span>
                      <span>Oratory, Lexile Reading & Debate Description</span>
                    </label>
                    <textarea 
                      className="admin-textarea"
                      rows={3}
                      value={labForm.middleDesc}
                      onChange={(e) => setLabForm({ ...labForm, middleDesc: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="admin-input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="admin-badge-gold" style={{ fontSize: '0.7rem' }}>Senior Wing</span>
                      <span>Rhetoric, MUNs, Voice Modulation & Global Interviews Description</span>
                    </label>
                    <textarea 
                      className="admin-textarea"
                      rows={3}
                      value={labForm.seniorDesc}
                      onChange={(e) => setLabForm({ ...labForm, seniorDesc: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Save Floating Bar */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                <button 
                  type="button" 
                  className="btn-admin-primary"
                  onClick={handleSaveEnglishDigitalLab}
                  style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}
                >
                  <Save size={18} /> Save & Publish Changes Across Wings
                </button>
              </div>
            </div>
          )}


          {/* ========================================================
              TAB 7: CAREERS & RECRUITMENT MANAGEMENT
          ======================================================== */}
          {activeTab === 'careers' && (
            <div>
              <div className="admin-section-header">
                <div className="admin-title-group">
                  <h1>Careers & Recruitment Portal</h1>
                  <p>Create or close academic openings in real-time, screen candidate applications, and export recruitment records.</p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {careersSubTab === 'openings' && (
                    <button 
                      type="button" 
                      className="btn-admin-primary"
                      onClick={() => {
                        setJobForm({
                          title: '',
                          wing: 'Senior Wing',
                          type: 'Full-Time',
                          experience: '2-4 Years',
                          qualification: 'Relevant Masters + B.Ed',
                          status: 'Open'
                        });
                        setIsAddJobOpen(true);
                      }}
                    >
                      <Plus size={16} />
                      <span>Post New Job Opening</span>
                    </button>
                  )}

                  {careersSubTab === 'applications' && (
                    <button 
                      type="button" 
                      className="btn-admin-secondary"
                      onClick={exportJobApplicationsCSV}
                    >
                      <Download size={16} />
                      <span>Export Applications (.csv)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Subtabs for Careers */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(18, 57, 133, 0.12)', paddingBottom: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setCareersSubTab('openings')}
                  style={{
                    background: careersSubTab === 'openings' ? 'var(--color-primary-dark, #123985)' : '#F3EFEA',
                    color: careersSubTab === 'openings' ? '#FFFFFF' : 'var(--color-warm-gray-600, #555555)',
                    border: 'none',
                    padding: '0.5rem 1.15rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Briefcase size={15} /> Job Openings ({(jobOpenings || []).length})
                </button>
                <button
                  type="button"
                  onClick={() => setCareersSubTab('applications')}
                  style={{
                    background: careersSubTab === 'applications' ? 'var(--color-primary-dark, #123985)' : '#F3EFEA',
                    color: careersSubTab === 'applications' ? '#FFFFFF' : 'var(--color-warm-gray-600, #555555)',
                    border: 'none',
                    padding: '0.5rem 1.15rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Users size={15} /> Candidate Applications ({(jobApplications || []).length})
                </button>
              </div>

              {/* SUBTAB 1: Job Openings Table & Status Toggling */}
              {careersSubTab === 'openings' && (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Position Title</th>
                        <th>Wing / Department</th>
                        <th>Type</th>
                        <th>Experience</th>
                        <th>Qualification Required</th>
                        <th>Live Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(jobOpenings && jobOpenings.length > 0) ? (
                        jobOpenings.map((job) => {
                          const isOpen = job.status !== 'Closed';
                          return (
                            <tr key={job.id}>
                              <td style={{ fontWeight: 700, color: 'var(--color-primary-dark, #123985)', maxWidth: '280px' }}>
                                <div>{job.title}</div>
                                {job.postedDate && (
                                  <div style={{ fontSize: '0.72rem', color: 'var(--color-warm-gray-600, #555555)' }}>Posted: {job.postedDate}</div>
                                )}
                              </td>
                              <td>
                                <span className="admin-badge-gold">
                                  {job.wing}
                                </span>
                              </td>
                              <td>
                                <span style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray-800, #333333)', fontWeight: 600 }}>{job.type}</span>
                              </td>
                              <td style={{ fontSize: '0.82rem', color: 'var(--color-warm-gray-800, #333333)' }}>{job.experience}</td>
                              <td style={{ fontSize: '0.8rem', color: 'var(--color-warm-gray-600, #555555)', maxWidth: '220px' }}>{job.qualification}</td>
                              <td>
                                <span className={isOpen ? 'admin-badge-success' : 'admin-badge-danger'}>
                                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isOpen ? '#22C55E' : '#EF4444' }}></span>
                                  {isOpen ? 'Open' : 'Closed'}
                                </span>
                              </td>
                              <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                <button
                                  type="button"
                                  className="btn-admin-secondary"
                                  onClick={() => store.toggleJobOpeningStatus(job.id)}
                                  style={{
                                    padding: '0.35rem 0.75rem',
                                    fontSize: '0.75rem',
                                    marginRight: '0.5rem',
                                    color: isOpen ? '#B91C1C' : '#15803D',
                                    borderColor: isOpen ? 'rgba(185, 28, 28, 0.35)' : 'rgba(21, 128, 61, 0.35)',
                                    background: isOpen ? 'rgba(239, 68, 68, 0.04)' : 'rgba(34, 197, 94, 0.04)'
                                  }}
                                  title={isOpen ? 'Close position to stop receiving applications' : 'Re-open position'}
                                >
                                  {isOpen ? 'Close Opening' : 'Reopen Opening'}
                                </button>
                                  <button 
                                    type="button" 
                                    className="admin-action-btn delete"
                                    onClick={() => {
                                      requestConfirm({
                                        title: 'Delete Job Opening?',
                                        subtitle: job.title,
                                        message: `Are you sure you want to delete opening: "${job.title}"?`,
                                        confirmText: 'Delete Opening',
                                        cancelText: 'Cancel',
                                        variant: 'danger',
                                        onConfirm: () => {
                                          store.deleteJobOpening(job.id);
                                          showToast(`Deleted opening: "${job.title}"`, 'success');
                                        }
                                      });
                                    }}
                                    title="Delete opening"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-warm-gray-600, #555555)' }}>
                            No job openings created yet. Click "+ Post New Job Opening" to add one.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUBTAB 2: Candidate Applications Table */}
              {careersSubTab === 'applications' && (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Candidate</th>
                        <th>Contact</th>
                        <th>Position Applied</th>
                        <th>Experience & Qual.</th>
                        <th>Resume / CV</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(jobApplications && jobApplications.length > 0) ? (
                        jobApplications.map((app) => (
                          <tr key={app.id}>
                            <td style={{ fontWeight: 700, color: 'var(--color-primary-dark, #123985)' }}>
                              <div>{app.applicantName}</div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--color-warm-gray-600, #555555)' }}>Ref: {app.id}</div>
                            </td>
                            <td>
                              <div>{app.phone}</div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray-600, #555555)' }}>{app.email}</div>
                            </td>
                            <td>
                              <div style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{app.positionApplied}</div>
                              <span style={{ fontSize: '0.72rem', color: 'var(--color-warm-gray-600, #555555)' }}>{app.wing}</span>
                            </td>
                            <td style={{ fontSize: '0.8rem' }}>
                              <div style={{ color: 'var(--color-warm-gray-800, #333333)' }}>{app.experienceYears}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray-600, #555555)' }}>{app.qualification}</div>
                            </td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                              {app.resumeFileData ? (
                                <a 
                                  href={app.resumeFileData} 
                                  download={app.resumeFileName || `${app.applicantName.replace(/\s+/g, '_')}_Resume.pdf`}
                                  className="btn-admin-secondary"
                                  style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#15803D', borderColor: 'rgba(21, 128, 61, 0.35)', background: 'rgba(34, 197, 94, 0.06)' }}
                                  title={`Download ${app.resumeFileName || 'Resume'}`}
                                >
                                  <Download size={12} /> {app.resumeFileName ? (app.resumeFileName.length > 14 ? app.resumeFileName.slice(0, 14) + '...' : app.resumeFileName) : 'Attached CV'}
                                </a>
                              ) : app.resumeUrl ? (
                                <a 
                                  href={app.resumeUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="btn-admin-secondary"
                                  style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                >
                                  <ExternalLink size={12} /> View Link
                                </a>
                              ) : (
                                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Not provided</span>
                              )}
                            </td>
                            <td>
                              <select 
                                value={app.status || 'New'}
                                onChange={(e) => store.updateJobApplicationStatus(app.id, e.target.value)}
                                className="admin-input"
                                style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem', width: 'auto' }}
                              >
                                <option value="New">New</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Interview Scheduled">Interview Scheduled</option>
                                <option value="Hired">Hired</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <button
                                type="button"
                                className="admin-action-btn view"
                                onClick={() => setSelectedAppDetail(app)}
                                title="View candidate details & cover note"
                                style={{ marginRight: '0.4rem' }}
                              >
                                <Eye size={15} />
                              </button>
                              <button 
                                type="button" 
                                className="admin-action-btn delete"
                                onClick={() => {
                                  requestConfirm({
                                    title: 'Delete Candidate Application?',
                                    subtitle: app.applicantName,
                                    message: `Are you sure you want to delete the application dossier for ${app.applicantName}?`,
                                    confirmText: 'Delete Dossier',
                                    cancelText: 'Cancel',
                                    variant: 'danger',
                                    onConfirm: () => {
                                      store.deleteJobApplication(app.id);
                                      showToast(`Application for ${app.applicantName} removed.`, 'success');
                                    }
                                  });
                                }}
                                title="Delete application"
                              >
                                <Trash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-warm-gray-600, #555555)' }}>
                            No candidate job applications received yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 7: SETTINGS & BACKUPS
          ======================================================== */}
          {activeTab === 'settings' && (
            <div>
              <div className="admin-section-header">
                <div className="admin-title-group">
                  <h1>Settings & Data Backup</h1>
                  <p>Manage security PIN, export full database backups, and restore configurations.</p>
                </div>
              </div>

              {/* PIN Settings */}
              <div style={{ background: '#FFFFFF', boxShadow: '0 4px 18px rgba(18, 57, 133, 0.04)', border: '1px solid rgba(18, 57, 133, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--color-primary-dark, #123985)', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={18} style={{ color: 'var(--color-accent)' }} /> Admin Security PIN
                </h3>
                <div style={{ maxWidth: '360px' }}>
                  <label className="admin-input-label">Current PIN</label>
                  <input 
                    type="text" 
                    className="admin-input"
                    value={adminPin}
                    onChange={(e) => store.setAdminPin(e.target.value)}
                    style={{ marginBottom: '1rem' }}
                  />
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-warm-gray-600, #555555)' }}>
                    This PIN protects the administrative interface.
                  </p>
                </div>
              </div>

              {/* Backup & Restore */}
              <div style={{ background: '#FFFFFF', boxShadow: '0 4px 18px rgba(18, 57, 133, 0.04)', border: '1px solid rgba(18, 57, 133, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
                <h3 style={{ color: 'var(--color-primary-dark, #123985)', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RefreshCw size={18} style={{ color: 'var(--color-accent)' }} /> School Data Backup & Factory Reset
                </h3>
                <p style={{ color: 'var(--color-warm-gray-600, #555555)', fontSize: '0.85rem', marginBottom: '1.5rem', maxWidth: '600px' }}>
                  Safely download all imported birthdays, custom news, and enquiry records as a JSON file, or restore school factory defaults.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    className="btn-admin-primary"
                    onClick={handleExportBackup}
                  >
                    <Download size={15} /> Download Full Website Backup (.json)
                  </button>

                  <button 
                    type="button" 
                    className="btn-admin-secondary"
                    onClick={() => {
                      requestConfirm({
                        title: 'Reset to School Defaults?',
                        subtitle: 'Database Reset',
                        message: 'Are you sure you want to reset all data to default school settings?\n\nThis will clear newly added birthdays and restore sample data.',
                        confirmText: 'Reset Defaults',
                        cancelText: 'Cancel',
                        variant: 'danger',
                        onConfirm: () => {
                          store.resetToDefaults();
                          showToast('School data restored to default state.', 'info');
                        }
                      });
                    }}
                    style={{ color: '#EF4444' }}
                  >
                    <RefreshCw size={15} /> Reset to Defaults
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 8: CONTACT DETAILS & SOCIAL MEDIA CONTROLS
          ======================================================== */}
          {activeTab === 'contact' && (
            <div className="admin-contact-manager">
              <div className="admin-section-header" style={{ marginBottom: '1.75rem' }}>
                <div className="admin-title-group">
                  <h1>Campus Contact & Social Media Controls</h1>
                  <p>Manage official mobile numbers, email addresses, campus physical location, social media channels, and footer brand story. Updates apply live across the website.</p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    className="btn-admin-primary"
                    onClick={handleSaveContactDetails}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontWeight: 700 }}
                  >
                    <Save size={16} />
                    <span>Save Contact & Social Details</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSaveContactDetails}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

                  {/* SECTION 1: SOCIAL MEDIA CHANNELS */}
                  <div style={{ background: '#FFFFFF', boxShadow: '0 4px 18px rgba(18, 57, 133, 0.04)', border: '1px solid rgba(18, 57, 133, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <div>
                        <h3 style={{ color: 'var(--color-primary-dark, #123985)', fontSize: '1.15rem', margin: '0 0 0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Share2 size={19} style={{ color: 'var(--color-accent)' }} /> Social Media Channel Links
                        </h3>
                        <p style={{ color: 'var(--color-warm-gray-600, #555555)', fontSize: '0.84rem', margin: 0 }}>
                          These links power the interactive social pill badges in the website footer and campus contact cards.
                        </p>
                      </div>

                      <button
                        type="button"
                        className="btn-admin-secondary"
                        onClick={handleAddSocialLink}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem', padding: '0.5rem 1rem' }}
                      >
                        <Plus size={15} /> Add Social Channel
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {contactForm.socialLinks.map((item, idx) => (
                        <div 
                          key={idx} 
                          style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'minmax(140px, 180px) 1fr auto auto', 
                            gap: '0.75rem', 
                            alignItems: 'center',
                            background: '#FAF8F5',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-sm, 8px)',
                            border: '1px solid rgba(18, 57, 133, 0.06)'
                          }}
                        >
                          <div>
                            <input 
                              type="text" 
                              className="admin-input" 
                              value={item.platform} 
                              onChange={(e) => handleUpdateSocialLink(idx, 'platform', e.target.value)}
                              placeholder="Platform (e.g. Facebook)"
                              style={{ fontWeight: 600, background: '#FFFFFF' }}
                              required
                            />
                          </div>
                          <div>
                            <input 
                              type="url" 
                              className="admin-input" 
                              value={item.url} 
                              onChange={(e) => handleUpdateSocialLink(idx, 'url', e.target.value)}
                              placeholder="https://..."
                              style={{ background: '#FFFFFF' }}
                              required
                            />
                          </div>
                          <div>
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="btn-admin-secondary"
                              title="Test link in new tab"
                              style={{ padding: '0.6rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}
                            >
                              <ExternalLink size={14} /> Test
                            </a>
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => handleRemoveSocialLink(idx)}
                              title="Delete link"
                              style={{ 
                                background: 'none', 
                                border: '1px solid rgba(239, 68, 68, 0.2)', 
                                color: '#EF4444', 
                                padding: '0.6rem 0.75rem', 
                                borderRadius: '6px', 
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center'
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}

                      {contactForm.socialLinks.length === 0 && (
                        <p style={{ color: 'var(--color-warm-gray-600, #555555)', fontSize: '0.9rem', fontStyle: 'italic', padding: '1rem', textAlign: 'center' }}>
                          No social media links configured. Click "Add Social Channel" to create one.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* SECTION 2: TELEPHONE & MOBILE NUMBERS */}
                  <div style={{ background: '#FFFFFF', boxShadow: '0 4px 18px rgba(18, 57, 133, 0.04)', border: '1px solid rgba(18, 57, 133, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
                    <h3 style={{ color: 'var(--color-primary-dark, #123985)', fontSize: '1.15rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <PhoneCall size={19} style={{ color: 'var(--color-accent)' }} /> School Telephone & Mobile Numbers
                    </h3>
                    <p style={{ color: 'var(--color-warm-gray-600, #555555)', fontSize: '0.84rem', marginBottom: '1.25rem' }}>
                      Numbers displayed in the website footer, top navigation, full-screen menu, and contact directory.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                      <div>
                        <label className="admin-input-label">
                          Primary Mobile / Admissions Phone * 
                          <span style={{ fontSize: '0.72rem', color: 'var(--color-accent)', marginLeft: '0.4rem', fontWeight: 600 }}>
                            (Featured in Footer & Menu)
                          </span>
                        </label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={contactForm.primaryPhone}
                          onChange={(e) => setContactForm({ ...contactForm, primaryPhone: e.target.value })}
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>

                      <div>
                        <label className="admin-input-label">Secondary Phone / Campus Landline</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={contactForm.secondaryPhone}
                          onChange={(e) => setContactForm({ ...contactForm, secondaryPhone: e.target.value })}
                          placeholder="+91 5278 290100"
                        />
                      </div>

                      <div>
                        <label className="admin-input-label">WhatsApp Support Number</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={contactForm.whatsapp}
                          onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: OFFICIAL EMAIL ADDRESSES */}
                  <div style={{ background: '#FFFFFF', boxShadow: '0 4px 18px rgba(18, 57, 133, 0.04)', border: '1px solid rgba(18, 57, 133, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
                    <h3 style={{ color: 'var(--color-primary-dark, #123985)', fontSize: '1.15rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Mail size={19} style={{ color: 'var(--color-accent)' }} /> Official Campus Email Directory
                    </h3>
                    <p style={{ color: 'var(--color-warm-gray-600, #555555)', fontSize: '0.84rem', marginBottom: '1.25rem' }}>
                      Configures the official email endpoints shown in the footer and across enquiry contact points.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                      <div>
                        <label className="admin-input-label">
                          Admissions & Enquiries Email * 
                          <span style={{ fontSize: '0.72rem', color: 'var(--color-accent)', marginLeft: '0.4rem', fontWeight: 600 }}>
                            (Featured in Footer)
                          </span>
                        </label>
                        <input 
                          type="email" 
                          className="admin-input" 
                          value={contactForm.admissionsEmail}
                          onChange={(e) => setContactForm({ ...contactForm, admissionsEmail: e.target.value })}
                          placeholder="admissions@gdgoenkaayodhya.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="admin-input-label">General Information Email</label>
                        <input 
                          type="email" 
                          className="admin-input" 
                          value={contactForm.infoEmail}
                          onChange={(e) => setContactForm({ ...contactForm, infoEmail: e.target.value })}
                          placeholder="info@gdgoenkaayodhya.com"
                        />
                      </div>

                      <div>
                        <label className="admin-input-label">Careers & HR Email</label>
                        <input 
                          type="email" 
                          className="admin-input" 
                          value={contactForm.careersEmail}
                          onChange={(e) => setContactForm({ ...contactForm, careersEmail: e.target.value })}
                          placeholder="careers@gdgoenkaayodhya.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 4: CAMPUS ADDRESS & VISITING HOURS */}
                  <div style={{ background: '#FFFFFF', boxShadow: '0 4px 18px rgba(18, 57, 133, 0.04)', border: '1px solid rgba(18, 57, 133, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
                    <h3 style={{ color: 'var(--color-primary-dark, #123985)', fontSize: '1.15rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={19} style={{ color: 'var(--color-accent)' }} /> Campus Physical Location & Visiting Hours
                    </h3>
                    <p style={{ color: 'var(--color-warm-gray-600, #555555)', fontSize: '0.84rem', marginBottom: '1.25rem' }}>
                      Physical address and official operational hours rendered in the footer and contact pages.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                      <div>
                        <label className="admin-input-label">Full Campus Location / Address *</label>
                        <textarea 
                          className="admin-textarea" 
                          rows={3}
                          value={contactForm.address}
                          onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                          placeholder="G.D. Goenka Public School Campus, NH-28 / Highway Corridor, Ayodhya, Uttar Pradesh – 224001"
                          required
                          style={{ resize: 'vertical' }}
                        />
                      </div>

                      <div>
                        <label className="admin-input-label">Office & Visiting Hours</label>
                        <textarea 
                          className="admin-textarea" 
                          rows={3}
                          value={contactForm.officeHours}
                          onChange={(e) => setContactForm({ ...contactForm, officeHours: e.target.value })}
                          placeholder="Monday – Saturday: 8:00 AM – 4:30 PM (Closed on Sundays & National Holidays)"
                          style={{ resize: 'vertical' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 5: FOOTER BRAND STORY & COPYRIGHT */}
                  <div style={{ background: '#FFFFFF', boxShadow: '0 4px 18px rgba(18, 57, 133, 0.04)', border: '1px solid rgba(18, 57, 133, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
                    <h3 style={{ color: 'var(--color-primary-dark, #123985)', fontSize: '1.15rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={19} style={{ color: 'var(--color-accent)' }} /> Footer Brand Tagline & Copyright Notice
                    </h3>
                    <p style={{ color: 'var(--color-warm-gray-600, #555555)', fontSize: '0.84rem', marginBottom: '1.25rem' }}>
                      Introductory brand summary under the logo and legal copyright line at the very bottom.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                      <div>
                        <label className="admin-input-label">Footer Brand Story / Tagline Description</label>
                        <textarea 
                          className="admin-textarea" 
                          rows={2}
                          value={contactForm.description}
                          onChange={(e) => setContactForm({ ...contactForm, description: e.target.value })}
                          placeholder="Where heritage inspires the future. A premium, modern learning environment fostering curiosity, character, creativity, and global leadership in Ayodhya."
                          style={{ resize: 'vertical' }}
                        />
                      </div>

                      <div>
                        <label className="admin-input-label">Bottom Bar Copyright Line</label>
                        <input 
                          type="text" 
                          className="admin-input" 
                          value={contactForm.copyright}
                          onChange={(e) => setContactForm({ ...contactForm, copyright: e.target.value })}
                          placeholder="© 2026 G.D. Goenka Public School, Ayodhya. All Rights Reserved."
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 6: LIVE FOOTER PREVIEW CARD */}
                  <div style={{ background: '#123985', borderRadius: 'var(--radius-md)', padding: '2rem', color: '#FFFFFF', boxShadow: '0 10px 30px rgba(18, 57, 133, 0.25)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.15)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent, #b39759)', fontWeight: 800 }}>
                        LIVE WEBSITE FOOTER PREVIEW (REAL-TIME REFLECTION)
                      </span>
                      <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                        Updates live as you type above
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                      {/* Brand Col */}
                      <div>
                        <img 
                          src="/branding/gd_goenka_logo_light.png" 
                          alt="GD Goenka Logo" 
                          style={{ height: '42px', marginBottom: '1rem', objectFit: 'contain' }}
                        />
                        <p style={{ fontSize: '0.86rem', lineHeight: 1.6, opacity: 0.85, marginBottom: '1.25rem' }}>
                          {contactForm.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {contactForm.socialLinks.map((s, i) => (
                            <span 
                              key={i} 
                              style={{ 
                                padding: '0.35rem 0.85rem', 
                                borderRadius: '9999px', 
                                background: 'rgba(255, 255, 255, 0.08)', 
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                fontSize: '0.75rem',
                                color: '#FFFFFF',
                                fontWeight: 600
                              }}
                            >
                              {s.platform}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Contact Info Col */}
                      <div>
                        <h4 style={{ fontSize: '0.84rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '1rem', fontWeight: 700 }}>
                          CAMPUS LOCATION
                        </h4>
                        <p style={{ fontSize: '0.86rem', lineHeight: 1.6, opacity: 0.8, marginBottom: '0.85rem' }}>
                          {contactForm.address}
                        </p>
                        <p style={{ fontSize: '0.86rem', color: 'var(--color-accent, #b39759)', fontWeight: 700, marginBottom: '0.35rem' }}>
                          Phone: {contactForm.primaryPhone}
                        </p>
                        <p style={{ fontSize: '0.86rem', opacity: 0.8 }}>
                          Email: {contactForm.admissionsEmail}
                        </p>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.78rem', opacity: 0.75 }}>
                      <span>{contactForm.copyright}</span>
                      <span>Mandatory Disclosure • Privacy Policy • Terms & Conditions</span>
                    </div>
                  </div>

                  {/* Save Bottom Bar */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem' }}>
                    <button 
                      type="submit" 
                      className="btn-admin-primary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', fontSize: '0.95rem', fontWeight: 700 }}
                    >
                      <Save size={18} />
                      <span>Save All Contact Details & Social Links</span>
                    </button>
                  </div>

                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================
          MODAL: ADD / EDIT STUDENT BIRTHDAY
      ======================================================== */}
      {isAddStudentOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-title">
              <span>{editingStudent ? 'Edit Student Birthday' : 'Add Student Birthday'}</span>
              <button 
                type="button" 
                onClick={() => setIsAddStudentOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--color-warm-gray-600, #555555)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveStudent}>
              <div className="admin-form-grid">
                <div className="admin-form-full">
                  <label className="admin-input-label">Student Full Name *</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="admin-input-label">Grade / Class *</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    required
                    placeholder="e.g. Grade 4"
                    value={studentForm.grade}
                    onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                  />
                </div>

                <div>
                  <label className="admin-input-label">Section</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    placeholder="e.g. A"
                    value={studentForm.section}
                    onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })}
                  />
                </div>

                <div>
                  <label className="admin-input-label">Date of Birth (YYYY-MM-DD) *</label>
                  <input 
                    type="date" 
                    className="admin-input" 
                    required
                    value={studentForm.dob}
                    onChange={(e) => setStudentForm({ ...studentForm, dob: e.target.value })}
                  />
                </div>

                <div className="admin-form-full">
                  <AdminImageUpload
                    label="Student Birthday Photo (Optional)"
                    value={studentForm.photo}
                    onChange={(newVal) => setStudentForm({ ...studentForm, photo: newVal })}
                    aspectRatio="1/1"
                    helperText="Upload student passport/portrait photo from computer or enter URL. Auto-crops to circular badge."
                  />
                </div>

                <div className="admin-form-full">
                  <label className="admin-input-label">Celebratory Birthday Wishes</label>
                  <textarea 
                    className="admin-input" 
                    rows={2}
                    placeholder="Personalized birthday quote or blessing for the child..."
                    value={studentForm.wishes}
                    onChange={(e) => setStudentForm({ ...studentForm, wishes: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button 
                  type="button" 
                  className="btn-admin-secondary"
                  onClick={() => setIsAddStudentOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary">
                  {editingStudent ? 'Save Changes' : 'Add to Directory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD GALLERY PHOTO
      ======================================================== */}
      {isAddGalleryOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-title">
              <span>Add Campus / Occasion Photo</span>
              <button 
                type="button" 
                onClick={() => setIsAddGalleryOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--color-warm-gray-600, #555555)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!galleryForm.title.trim() || !galleryForm.image.trim()) return;
              store.addGalleryItem(galleryForm);
              setIsAddGalleryOpen(false);
              setGalleryForm({ category: 'Campus', title: '', caption: '', image: '' });
            }}>
              <div className="admin-form-grid">
                <div>
                  <label className="admin-input-label">Category</label>
                  <select 
                    className="admin-input"
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  >
                    <option value="Campus">Campus</option>
                    <option value="Academics">Academics</option>
                    <option value="Sports">Sports</option>
                    <option value="Arts & Culture">Arts & Culture</option>
                    <option value="Student Life">Student Life</option>
                  </select>
                </div>

                <div>
                  <label className="admin-input-label">Title *</label>
                  <input 
                    type="text" 
                    className="admin-input"
                    required
                    placeholder="e.g. Annual Athletic Olympiad"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  />
                </div>

                <div className="admin-form-full">
                  <AdminImageUpload
                    label="Photo / Occasion Visual *"
                    value={galleryForm.image}
                    onChange={(newVal) => setGalleryForm({ ...galleryForm, image: newVal })}
                    aspectRatio="16/9"
                    helperText="Upload event photo from computer or enter URL. Auto-adjusts seamlessly to gallery cards."
                  />
                </div>

                <div className="admin-form-full">
                  <label className="admin-input-label">Caption / Description</label>
                  <textarea 
                    className="admin-input"
                    rows={2}
                    placeholder="Brief description of the occasion..."
                    value={galleryForm.caption}
                    onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button 
                  type="button" 
                  className="btn-admin-secondary"
                  onClick={() => setIsAddGalleryOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary">
                  Publish to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD HAPPENING / EVENT
      ======================================================== */}
      {isAddHappeningOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-title">
              <span>Create Event or News Article</span>
              <button 
                type="button" 
                onClick={() => setIsAddHappeningOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--color-warm-gray-600, #555555)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!happeningForm.title.trim()) return;
              store.addHappening(happeningForm);
              setIsAddHappeningOpen(false);
              setHappeningForm({ category: 'Events', title: '', date: '', summary: '', content: '', image: '' });
            }}>
              <div className="admin-form-grid">
                <div>
                  <label className="admin-input-label">Category</label>
                  <select 
                    className="admin-input"
                    value={happeningForm.category}
                    onChange={(e) => setHappeningForm({ ...happeningForm, category: e.target.value })}
                  >
                    <option value="Events">Events</option>
                    <option value="News">News</option>
                    <option value="Recognitions">Recognitions</option>
                    <option value="Blog">Blog</option>
                    <option value="Media & Press">Media & Press</option>
                  </select>
                </div>

                <div>
                  <label className="admin-input-label">Date String</label>
                  <input 
                    type="text" 
                    className="admin-input"
                    placeholder="e.g. October 15, 2026"
                    value={happeningForm.date}
                    onChange={(e) => setHappeningForm({ ...happeningForm, date: e.target.value })}
                  />
                </div>

                <div className="admin-form-full">
                  <label className="admin-input-label">Article Title *</label>
                  <input 
                    type="text" 
                    className="admin-input"
                    required
                    placeholder="e.g. Inter-School Robotics Showcase"
                    value={happeningForm.title}
                    onChange={(e) => setHappeningForm({ ...happeningForm, title: e.target.value })}
                  />
                </div>

                <div className="admin-form-full">
                  <AdminImageUpload
                    label="Cover Image"
                    value={happeningForm.image}
                    onChange={(newVal) => setHappeningForm({ ...happeningForm, image: newVal })}
                    aspectRatio="16/9"
                    helperText="Upload event cover photo from computer or enter URL. Auto-adjusts to slideshow & article cards."
                  />
                </div>

                <div className="admin-form-full">
                  <label className="admin-input-label">Summary / Teaser</label>
                  <textarea 
                    className="admin-input"
                    rows={2}
                    placeholder="Short summary displayed on cards..."
                    value={happeningForm.summary}
                    onChange={(e) => setHappeningForm({ ...happeningForm, summary: e.target.value })}
                  />
                </div>

                <div className="admin-form-full">
                  <label className="admin-input-label">Full Article Content</label>
                  <textarea 
                    className="admin-input"
                    rows={4}
                    placeholder="Complete writeup..."
                    value={happeningForm.content}
                    onChange={(e) => setHappeningForm({ ...happeningForm, content: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button 
                  type="button" 
                  className="btn-admin-secondary"
                  onClick={() => setIsAddHappeningOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary">
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD NEW JOB OPENING
      ======================================================== */}
      {isAddJobOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-title">
              <span>Post New Career Opportunity</span>
              <button 
                type="button" 
                onClick={() => setIsAddJobOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--color-warm-gray-600, #555555)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!jobForm.title.trim() || !jobForm.experience.trim() || !jobForm.qualification.trim()) return;
              store.addJobOpening(jobForm);
              setIsAddJobOpen(false);
              setJobForm({
                title: '',
                wing: 'Senior Wing',
                type: 'Full-Time',
                experience: '2-4 Years',
                qualification: 'Relevant Masters + B.Ed',
                status: 'Open'
              });
            }}>
              <div className="admin-form-grid">
                <div className="admin-form-full">
                  <label className="admin-input-label">Job Title / Designation *</label>
                  <input 
                    type="text" 
                    className="admin-input"
                    required
                    placeholder="e.g. Post Graduate Teacher (PGT) – Physics & STEM Lead"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="admin-input-label">School Wing / Department *</label>
                  <select 
                    className="admin-input"
                    value={jobForm.wing}
                    onChange={(e) => setJobForm({ ...jobForm, wing: e.target.value })}
                  >
                    <option value="Senior Wing">Senior Wing</option>
                    <option value="Middle Wing">Middle Wing</option>
                    <option value="Primary Wing">Primary Wing</option>
                    <option value="Pre-Primary / Early Years">Pre-Primary / Early Years</option>
                    <option value="Physical Education Dept">Physical Education Dept</option>
                    <option value="Creative & Performing Arts">Creative & Performing Arts</option>
                    <option value="Administration & Support">Administration & Support</option>
                  </select>
                </div>

                <div>
                  <label className="admin-input-label">Employment Type *</label>
                  <select 
                    className="admin-input"
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contractual">Contractual</option>
                    <option value="Visiting Faculty">Visiting Faculty</option>
                  </select>
                </div>

                <div>
                  <label className="admin-input-label">Experience Required *</label>
                  <input 
                    type="text" 
                    className="admin-input"
                    required
                    placeholder="e.g. 3-5 Years in reputed CBSE school"
                    value={jobForm.experience}
                    onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                  />
                </div>

                <div>
                  <label className="admin-input-label">Initial Status *</label>
                  <select 
                    className="admin-input"
                    value={jobForm.status}
                    onChange={(e) => setJobForm({ ...jobForm, status: e.target.value })}
                  >
                    <option value="Open">Open (Accepting Applications)</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="admin-form-full">
                  <label className="admin-input-label">Qualification & Key Competencies *</label>
                  <textarea 
                    className="admin-input"
                    rows={2}
                    required
                    placeholder="e.g. M.Sc Physics + B.Ed, familiarity with STEM prototyping & smart lab pedagogies"
                    value={jobForm.qualification}
                    onChange={(e) => setJobForm({ ...jobForm, qualification: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button 
                  type="button" 
                  className="btn-admin-secondary"
                  onClick={() => setIsAddJobOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary">
                  Publish Job Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: VIEW CANDIDATE APPLICATION DETAILS
      ======================================================== */}
      {selectedAppDetail && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '620px' }}>
            <div className="admin-modal-title">
              <span>Candidate Application Dossier</span>
              <button 
                type="button" 
                onClick={() => setSelectedAppDetail(null)}
                style={{ background: 'none', border: 'none', color: 'var(--color-warm-gray-600, #555555)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(18, 57, 133, 0.12)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 700 }}>
                  REF: {selectedAppDetail.id}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-gray-600, #555555)' }}>
                  Received: {selectedAppDetail.appliedAt}
                </span>
              </div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark, #123985)', margin: 0 }}>
                {selectedAppDetail.applicantName}
              </h2>
              <div style={{ fontSize: '0.9rem', color: '#7A5B17', marginTop: '0.25rem', fontWeight: 600 }}>
                Applying for: {selectedAppDetail.positionApplied} ({selectedAppDetail.wing})
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--color-warm-gray-600, #555555)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Phone</span>
                <strong style={{ color: 'var(--color-primary-dark, #123985)' }}>{selectedAppDetail.phone}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-warm-gray-600, #555555)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Email</span>
                <strong style={{ color: 'var(--color-primary-dark, #123985)' }}>{selectedAppDetail.email}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-warm-gray-600, #555555)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Teaching Experience</span>
                <strong style={{ color: 'var(--color-primary-dark, #123985)' }}>{selectedAppDetail.experienceYears}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-warm-gray-600, #555555)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Qualification</span>
                <strong style={{ color: 'var(--color-primary-dark, #123985)' }}>{selectedAppDetail.qualification}</strong>
              </div>
              {selectedAppDetail.currentSchool && (
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: 'var(--color-warm-gray-600, #555555)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Current / Last School</span>
                  <strong style={{ color: 'var(--color-primary-dark, #123985)' }}>{selectedAppDetail.currentSchool}</strong>
                </div>
              )}
            </div>

            {/* Attached Resume File */}
            {selectedAppDetail.resumeFileData && (
              <div style={{ marginBottom: '1.25rem', padding: '0.85rem 1.15rem', background: '#FAF8F5', border: '1px solid rgba(18, 57, 133, 0.1)', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: 'rgba(34, 197, 94, 0.12)', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileText size={18} />
                  </div>
                  <div>
                    <span style={{ color: '#15803D', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>
                      Attached Candidate Resume File
                    </span>
                    <div style={{ color: 'var(--color-primary-dark, #123985)', fontWeight: 600, fontSize: '0.88rem' }}>
                      {selectedAppDetail.resumeFileName || 'Resume.pdf'} {selectedAppDetail.resumeFileSize ? `(${selectedAppDetail.resumeFileSize})` : ''}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a 
                    href={selectedAppDetail.resumeFileData} 
                    download={selectedAppDetail.resumeFileName || `${selectedAppDetail.applicantName.replace(/\s+/g, '_')}_Resume.pdf`}
                    className="btn-admin-primary"
                    style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                  >
                    <Download size={13} /> Download File
                  </a>
                  <a 
                    href={selectedAppDetail.resumeFileData} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-admin-secondary"
                    style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                  >
                    <ExternalLink size={13} /> Open
                  </a>
                </div>
              </div>
            )}

            {/* Cloud Resume / Portfolio Link */}
            {selectedAppDetail.resumeUrl && (
              <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', background: '#FAF8F5', border: '1px solid rgba(18, 57, 133, 0.1)', borderRadius: '8px', border: '1px solid rgba(18, 57, 133, 0.12)' }}>
                <span style={{ color: 'var(--color-warm-gray-600, #555555)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Cloud Resume / Portfolio Link</span>
                <a 
                  href={selectedAppDetail.resumeUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: 'var(--color-accent)', textDecoration: 'underline', wordBreak: 'break-all', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                >
                  <ExternalLink size={14} /> {selectedAppDetail.resumeUrl}
                </a>
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ color: 'var(--color-warm-gray-600, #555555)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Pedagogical Statement / Cover Note
              </span>
              <div style={{ background: '#F8F6F1', border: '1px solid rgba(18, 57, 133, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(18, 57, 133, 0.12)', fontSize: '0.85rem', color: 'var(--color-warm-gray-800, #333333)', lineHeight: 1.6, maxHeight: '160px', overflowY: 'auto' }}>
                {selectedAppDetail.coverNote || 'No additional note submitted.'}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(18, 57, 133, 0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-warm-gray-600, #555555)' }}>Application Status:</span>
                <select 
                  value={selectedAppDetail.status || 'New'}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    store.updateJobApplicationStatus(selectedAppDetail.id, newStatus);
                    setSelectedAppDetail({ ...selectedAppDetail, status: newStatus });
                  }}
                  className="admin-input"
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', width: 'auto' }}
                >
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <button 
                type="button" 
                className="btn-admin-primary"
                onClick={() => setSelectedAppDetail(null)}
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Luxury UI Confirmation Prompt Modal */}
      <AdminConfirmModal
        isOpen={Boolean(confirmModal)}
        {...confirmModal}
      />

      {/* Non-blocking Floating Toast Banner */}
      <AdminToast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
