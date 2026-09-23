import React, { useState, useRef } from 'react';
import { 
  Shield, Key, LogOut, ExternalLink, Users, Cake, Calendar, 
  FileSpreadsheet, Download, Upload, Plus, Trash2, Edit3, 
  CheckCircle, AlertCircle, Eye, Search, Filter, Sparkles,
  Image as ImageIcon, Megaphone, Inbox, Settings, RefreshCw, X,
  Briefcase, FileText, Check, CheckSquare
} from 'lucide-react';
import { useSchoolData } from '../hooks/useSchoolData';
import { parseBirthdayExcel, downloadBirthdayExcelTemplate } from '../utils/excelBirthdayParser';
import { isBirthdayToday, calculateAge } from '../utils/schoolStore';
import AdminImageUpload from '../components/AdminImageUpload';
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
    store 
  } = useSchoolData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('gd_goenka_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

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
      alert('No job applications to export yet.');
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

  // Export Enquiries to CSV
  const exportEnquiriesCSV = () => {
    if (!enquiries || enquiries.length === 0) return;
    const headers = ['Parent Name', 'Phone', 'Email', 'Child Name', 'Grade', 'Date', 'Status', 'Message'];
    const rows = enquiries.map((e) => [
      `"${e.parentName}"`,
      `"${e.phone}"`,
      `"${e.email}"`,
      `"${e.childName}"`,
      `"${e.applyingGrade}"`,
      `"${e.preferredDate || e.createdAt}"`,
      `"${e.status}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`
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

          <div style={{ marginTop: '2rem', borderTop: '1px solid #22252F', paddingTop: '1.25rem' }}>
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
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF', letterSpacing: '0.04em' }}>
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
            className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} />
            <span>Settings & Backups</span>
          </button>
        </aside>

        {/* Right Content Area */}
        <main className="admin-main-content">
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
                    background: importStatusMessage.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    border: `1px solid ${importStatusMessage.type === 'success' ? '#22C55E' : '#EF4444'}`,
                    color: importStatusMessage.type === 'success' ? '#4ADE80' : '#FCA5A5',
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
                        style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', background: '#1F222B', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Total Rows</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>{importPreview.totalRows}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Valid Records</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#22C55E' }}>{importPreview.validCount}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Birthdays Today</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-accent)' }}>
                          {importPreview.students.filter((s) => isBirthdayToday(s.dob, simulatedDate)).length}
                        </div>
                      </div>
                    </div>

                    {importPreview.warnings && importPreview.warnings.length > 0 && (
                      <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid #EAB308', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#FDE047' }}>
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
                        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.5rem' }}>
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
                  background: '#17181D',
                  border: '1px solid rgba(224, 145, 69, 0.25)',
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
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF' }}>
                      Live Date Simulator
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
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
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
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
                                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{student.name}</div>
                                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>ID: {student.id.slice(0, 10)}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span style={{ fontWeight: 600 }}>{student.grade}</span>
                              {student.section && <span style={{ color: '#94A3B8' }}> - Sec {student.section}</span>}
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
                            <td style={{ maxWidth: '240px', fontSize: '0.8rem', color: '#CBD5E1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                        <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94A3B8' }}>
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
              <div style={{ background: '#17181D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                      background: '#17181D',
                      border: '1px solid rgba(255,255,255,0.08)',
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
                          background: 'rgba(0,0,0,0.7)',
                          color: 'var(--color-soft-accent)',
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
                      <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '0.35rem' }}>{item.title}</h4>
                      <p style={{ color: '#94A3B8', fontSize: '0.82rem', marginBottom: '1rem', flex: 1 }}>{item.caption}</p>

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
                      background: '#17181D',
                      border: '1px solid rgba(255,255,255,0.08)',
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
                          <span style={{ fontSize: '0.72rem', background: 'rgba(224, 145, 69, 0.2)', color: 'var(--color-soft-accent)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                            {item.category}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{item.date}</span>
                        </div>
                        <h4 style={{ color: '#FFFFFF', fontSize: '1rem' }}>{item.title}</h4>
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
              <div style={{ background: '#17181D', border: '1px solid rgba(224, 145, 69, 0.3)', borderRadius: 'var(--radius-md)', padding: '1.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Cake size={22} style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <h3 style={{ color: '#FFFFFF', fontSize: '1.15rem' }}>Website Birthday Celebration Banner</h3>
                      <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Displays automatically at the top of the website whenever students have birthdays today.</p>
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
              <div style={{ background: '#17181D', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Megaphone size={22} style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <h3 style={{ color: '#FFFFFF', fontSize: '1.15rem' }}>Top Admissions / Alert Ticker</h3>
                      <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>High-visibility notice strip for admission session updates and urgent school circulars.</p>
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
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setEnquiriesSubTab('enquiries')}
                  style={{
                    background: enquiriesSubTab === 'enquiries' ? 'var(--color-accent)' : '#1A1C23',
                    color: enquiriesSubTab === 'enquiries' ? '#14151A' : '#94A3B8',
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
                    background: enquiriesSubTab === 'visits' ? 'var(--color-accent)' : '#1A1C23',
                    color: enquiriesSubTab === 'visits' ? '#14151A' : '#94A3B8',
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
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Parent Name</th>
                        <th>Contact Info</th>
                        <th>Child Name</th>
                        <th>Applying Grade</th>
                        <th>Request / Message</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.length > 0 ? (
                        enquiries.map((enq) => (
                          <tr key={enq.id}>
                            <td style={{ fontWeight: 700, color: '#FFFFFF' }}>{enq.parentName}</td>
                            <td>
                              <div>{enq.phone}</div>
                              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{enq.email}</div>
                            </td>
                            <td>{enq.childName}</td>
                            <td>
                              <span style={{ background: 'rgba(224, 145, 69, 0.15)', color: 'var(--color-soft-accent)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>
                                {enq.applyingGrade}
                              </span>
                            </td>
                            <td style={{ maxWidth: '240px', fontSize: '0.78rem', color: '#CBD5E1' }}>
                              <div style={{ fontWeight: 600, color: 'var(--color-accent)', marginBottom: '2px' }}>
                                {enq.preferredDate || 'General Query'}
                              </div>
                              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={enq.message}>
                                {enq.message || 'Standard Admission Query'}
                              </div>
                            </td>
                            <td>
                              <select 
                                value={enq.status}
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
                              <button 
                                type="button" 
                                className="admin-action-btn delete"
                                onClick={() => store.deleteEnquiry(enq.id)}
                                title="Delete inquiry"
                              >
                                <Trash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94A3B8' }}>
                            No parent enquiries received yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
                            <td style={{ fontWeight: 700, color: '#FFFFFF' }}>
                              <div>{vis.parentName}</div>
                              {vis.visitorCount && (
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)' }}>
                                  {vis.visitorCount} {vis.visitorCount === 1 ? 'Visitor' : 'Visitors'}
                                </div>
                              )}
                            </td>
                            <td>
                              <div>{vis.phone}</div>
                              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{vis.email}</div>
                            </td>
                            <td>
                              <div>{vis.childName || 'Prospective Student'}</div>
                              {vis.gradeApplying && (
                                <span style={{ background: 'rgba(224, 145, 69, 0.15)', color: 'var(--color-soft-accent)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                                  {vis.gradeApplying}
                                </span>
                              )}
                            </td>
                            <td>
                              <div style={{ fontWeight: 600, color: '#FFFFFF' }}>{vis.preferredDate || 'TBD'}</div>
                              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{vis.preferredTime || 'Morning Session'}</div>
                            </td>
                            <td style={{ maxWidth: '220px', fontSize: '0.78rem' }}>
                              <div style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{vis.tourType || 'Comprehensive Campus Tour'}</div>
                              {vis.interests && vis.interests.length > 0 && (
                                <div style={{ color: '#94A3B8', fontSize: '0.72rem', marginTop: '2px' }}>
                                  {vis.interests.slice(0, 3).join(', ')}
                                </div>
                              )}
                              {vis.specialRequests && (
                                <div style={{ color: '#CBD5E1', fontStyle: 'italic', fontSize: '0.72rem', marginTop: '2px' }} title={vis.specialRequests}>
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
                          <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94A3B8' }}>
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
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #22252F', paddingBottom: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setCareersSubTab('openings')}
                  style={{
                    background: careersSubTab === 'openings' ? 'var(--color-accent)' : '#1A1C23',
                    color: careersSubTab === 'openings' ? '#14151A' : '#94A3B8',
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
                    background: careersSubTab === 'applications' ? 'var(--color-accent)' : '#1A1C23',
                    color: careersSubTab === 'applications' ? '#14151A' : '#94A3B8',
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
                              <td style={{ fontWeight: 700, color: '#FFFFFF', maxWidth: '280px' }}>
                                <div>{job.title}</div>
                                {job.postedDate && (
                                  <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Posted: {job.postedDate}</div>
                                )}
                              </td>
                              <td>
                                <span style={{ background: 'rgba(224, 145, 69, 0.15)', color: 'var(--color-soft-accent)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                                  {job.wing}
                                </span>
                              </td>
                              <td>
                                <span style={{ fontSize: '0.78rem', color: '#E2E8F0', fontWeight: 600 }}>{job.type}</span>
                              </td>
                              <td style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>{job.experience}</td>
                              <td style={{ fontSize: '0.8rem', color: '#94A3B8', maxWidth: '220px' }}>{job.qualification}</td>
                              <td>
                                <span 
                                  style={{ 
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '3px 10px',
                                    borderRadius: '12px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    background: isOpen ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                    color: isOpen ? '#4ADE80' : '#F87171',
                                    border: `1px solid ${isOpen ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                                  }}
                                >
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
                                    color: isOpen ? '#FCA5A5' : '#86EFAC',
                                    borderColor: isOpen ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.4)'
                                  }}
                                  title={isOpen ? 'Close position to stop receiving applications' : 'Re-open position'}
                                >
                                  {isOpen ? 'Close Opening' : 'Reopen Opening'}
                                </button>
                                <button 
                                  type="button" 
                                  className="admin-action-btn delete"
                                  onClick={() => {
                                    if (window.confirm(`Are you sure you want to delete opening: "${job.title}"?`)) {
                                      store.deleteJobOpening(job.id);
                                    }
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
                          <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94A3B8' }}>
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
                            <td style={{ fontWeight: 700, color: '#FFFFFF' }}>
                              <div>{app.applicantName}</div>
                              <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Ref: {app.id}</div>
                            </td>
                            <td>
                              <div>{app.phone}</div>
                              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{app.email}</div>
                            </td>
                            <td>
                              <div style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{app.positionApplied}</div>
                              <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{app.wing}</span>
                            </td>
                            <td style={{ fontSize: '0.8rem' }}>
                              <div style={{ color: '#E2E8F0' }}>{app.experienceYears}</div>
                              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{app.qualification}</div>
                            </td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                              {app.resumeFileData ? (
                                <a 
                                  href={app.resumeFileData} 
                                  download={app.resumeFileName || `${app.applicantName.replace(/\s+/g, '_')}_Resume.pdf`}
                                  className="btn-admin-secondary"
                                  style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#86EFAC', borderColor: 'rgba(34, 197, 94, 0.4)' }}
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
                                  if (window.confirm(`Delete application for ${app.applicantName}?`)) {
                                    store.deleteJobApplication(app.id);
                                  }
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
                          <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94A3B8' }}>
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
              <div style={{ background: '#17181D', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem', marginBottom: '2rem' }}>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                  <p style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                    This PIN protects the administrative interface.
                  </p>
                </div>
              </div>

              {/* Backup & Restore */}
              <div style={{ background: '#17181D', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RefreshCw size={18} style={{ color: 'var(--color-accent)' }} /> School Data Backup & Factory Reset
                </h3>
                <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1.5rem', maxWidth: '600px' }}>
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
                      if (window.confirm('Are you sure you want to reset all data to default school settings? This will clear newly added birthdays and restore sample data.')) {
                        store.resetToDefaults();
                        alert('School data restored to default state.');
                      }
                    }}
                    style={{ color: '#EF4444' }}
                  >
                    <RefreshCw size={15} /> Reset to Defaults
                  </button>
                </div>
              </div>
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
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
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
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
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
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
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
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
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
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid #22252F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 700 }}>
                  REF: {selectedAppDetail.id}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                  Received: {selectedAppDetail.appliedAt}
                </span>
              </div>
              <h2 style={{ fontSize: '1.5rem', color: '#FFFFFF', margin: 0 }}>
                {selectedAppDetail.applicantName}
              </h2>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-soft-accent)', marginTop: '0.25rem', fontWeight: 600 }}>
                Applying for: {selectedAppDetail.positionApplied} ({selectedAppDetail.wing})
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: '#94A3B8', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Phone</span>
                <strong style={{ color: '#FFFFFF' }}>{selectedAppDetail.phone}</strong>
              </div>
              <div>
                <span style={{ color: '#94A3B8', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Email</span>
                <strong style={{ color: '#FFFFFF' }}>{selectedAppDetail.email}</strong>
              </div>
              <div>
                <span style={{ color: '#94A3B8', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Teaching Experience</span>
                <strong style={{ color: '#FFFFFF' }}>{selectedAppDetail.experienceYears}</strong>
              </div>
              <div>
                <span style={{ color: '#94A3B8', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Qualification</span>
                <strong style={{ color: '#FFFFFF' }}>{selectedAppDetail.qualification}</strong>
              </div>
              {selectedAppDetail.currentSchool && (
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: '#94A3B8', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Current / Last School</span>
                  <strong style={{ color: '#FFFFFF' }}>{selectedAppDetail.currentSchool}</strong>
                </div>
              )}
            </div>

            {/* Attached Resume File */}
            {selectedAppDetail.resumeFileData && (
              <div style={{ marginBottom: '1.25rem', padding: '0.85rem 1.15rem', background: '#1A1C23', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileText size={18} />
                  </div>
                  <div>
                    <span style={{ color: '#4ADE80', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>
                      Attached Candidate Resume File
                    </span>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.88rem' }}>
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
              <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', background: '#1A1C23', borderRadius: '8px', border: '1px solid #2B2F3D' }}>
                <span style={{ color: '#94A3B8', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Cloud Resume / Portfolio Link</span>
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
              <span style={{ color: '#94A3B8', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Pedagogical Statement / Cover Note
              </span>
              <div style={{ background: '#14151A', padding: '1rem', borderRadius: '8px', border: '1px solid #22252F', fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.6, maxHeight: '160px', overflowY: 'auto' }}>
                {selectedAppDetail.coverNote || 'No additional note submitted.'}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #22252F' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Application Status:</span>
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
    </div>
  );
}
