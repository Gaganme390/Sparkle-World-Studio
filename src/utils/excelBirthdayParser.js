import * as XLSX from 'xlsx';

// Normalize column keys to standard fields
const normalizeHeader = (header) => {
  if (!header) return '';
  const clean = String(header).trim().toLowerCase().replace(/[\s_-]+/g, '');
  
  if (['name', 'studentname', 'student', 'childname', 'fullname', 'nameofthestudent'].includes(clean)) {
    return 'name';
  }
  if (['grade', 'class', 'standard', 'wing', 'classgrade'].includes(clean)) {
    return 'grade';
  }
  if (['section', 'sec', 'division', 'secname'].includes(clean)) {
    return 'section';
  }
  if (['dob', 'dateofbirth', 'birthday', 'bday', 'birthdate', 'dateofbirthdob'].includes(clean)) {
    return 'dob';
  }
  if (['wishes', 'message', 'birthdaywishes', 'blessing', 'greeting'].includes(clean)) {
    return 'wishes';
  }
  if (['photo', 'image', 'avatar', 'photourl', 'picture', 'gdrivelink', 'imagelink'].includes(clean)) {
    return 'photo';
  }
  return clean;
};

// Normalize date into YYYY-MM-DD
export const normalizeExcelDate = (val) => {
  if (val === undefined || val === null || val === '') return null;

  // If already a JS Date
  if (val instanceof Date && !isNaN(val.getTime())) {
    const y = val.getFullYear();
    const m = String(val.getMonth() + 1).padStart(2, '0');
    const d = String(val.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // If Excel serial number (e.g., 44827)
  if (typeof val === 'number') {
    // SheetJS date parsing from serial
    const parsedDate = XLSX.SSF.parse_date_code(val);
    if (parsedDate) {
      const y = parsedDate.y;
      const m = String(parsedDate.m).padStart(2, '0');
      const d = String(parsedDate.d).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
  }

  const str = String(val).trim();

  // If YYYY-MM-DD
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(str)) {
    const [y, m, d] = str.split('-');
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }

  // If DD/MM/YYYY or DD-MM-YYYY
  if (/^\d{1,2}[/-]\d{1,2}[/-]\d{4}$/.test(str)) {
    const sep = str.includes('/') ? '/' : '-';
    const parts = str.split(sep);
    const d = parts[0].padStart(2, '0');
    const m = parts[1].padStart(2, '0');
    const y = parts[2];
    return `${y}-${m}-${d}`;
  }

  // Try standard JS Date parsing fallback
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    const y = d.getFullYear() > 1900 ? d.getFullYear() : new Date().getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  return null;
};

// Parse an uploaded Excel/CSV file Buffer or ArrayBuffer
export const parseBirthdayExcel = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });

        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert sheet to JSON rows
        const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: '', raw: false });

        if (!rawRows || rawRows.length === 0) {
          resolve({
            success: false,
            error: 'The uploaded spreadsheet is empty or has no recognizable data rows.',
            students: []
          });
          return;
        }

        const validStudents = [];
        const warnings = [];

        rawRows.forEach((row, idx) => {
          const rowNum = idx + 2; // Accounting for 1-based index and header
          const mapped = {};

          Object.keys(row).forEach((colKey) => {
            const normKey = normalizeHeader(colKey);
            mapped[normKey] = row[colKey];
          });

          const studentName = String(mapped.name || '').trim();
          const rawDob = mapped.dob;
          const grade = String(mapped.grade || 'Primary').trim();
          const section = String(mapped.section || 'A').trim();
          const wishes = String(mapped.wishes || '').trim();
          const photo = String(mapped.photo || '').trim();

          if (!studentName) {
            warnings.push(`Row ${rowNum}: Skipped due to missing Student Name.`);
            return;
          }

          const normalizedDob = normalizeExcelDate(rawDob);
          if (!normalizedDob) {
            warnings.push(`Row ${rowNum} (${studentName}): Invalid or missing Date of Birth "${rawDob}". Defaulted to today's date.`);
          }

          const finalDob = normalizedDob || new Date().toISOString().split('T')[0];

          validStudents.push({
            name: studentName,
            grade: grade || 'Primary Wing',
            section: section || 'A',
            dob: finalDob,
            wishes: wishes || `Warmest birthday blessings to ${studentName}!`,
            photo: photo,
            active: true
          });
        });

        resolve({
          success: true,
          totalRows: rawRows.length,
          validCount: validStudents.length,
          warnings,
          students: validStudents
        });
      } catch (err) {
        console.error('Error parsing Excel spreadsheet:', err);
        reject(new Error(`Failed to parse spreadsheet: ${err.message}`));
      }
    };

    reader.onerror = (err) => {
      reject(new Error('File reading error. Please try uploading again.'));
    };

    reader.readAsArrayBuffer(file);
  });
};

// Generate and trigger download of a pre-formatted Excel template
export const downloadBirthdayExcelTemplate = () => {
  const today = new Date();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  const currentDay = String(today.getDate()).padStart(2, '0');

  const sampleData = [
    {
      'Student Name': 'Aarav Sharma',
      'Grade': 'Grade 4',
      'Section': 'A',
      'Date of Birth': `2016-${currentMonth}-${currentDay}`,
      'Wishes': 'May you continue to explore and shine brilliantly! Happy Birthday Aarav!',
      'Photo URL': '/school-media/School First Day/DSC_3091.JPG'
    },
    {
      'Student Name': 'Ananya Verma',
      'Grade': 'Grade 8',
      'Section': 'B',
      'Date of Birth': `2013-${currentMonth}-${currentDay}`,
      'Wishes': 'Inspiring leadership and joy on your special day! Happy Birthday Ananya!',
      'Photo URL': '/school-media/Orange Day/Orange Day Pic.jpg'
    },
    {
      'Student Name': 'Kabir Singhania',
      'Grade': 'Grade 10',
      'Section': 'B',
      'Date of Birth': `2011-10-14`,
      'Wishes': 'Wishing you distinguished success in all your academic endeavors!',
      'Photo URL': ''
    },
    {
      'Student Name': 'Meera Deshmukh',
      'Grade': 'Nursery',
      'Section': 'Lotus',
      'Date of Birth': `2022-11-05`,
      'Wishes': 'Happy Birthday to our darling Goenkan star!',
      'Photo URL': ''
    },
    {
      'Student Name': 'Rohan Gupta',
      'Grade': 'Grade 2',
      'Section': 'C',
      'Date of Birth': `2018-05-18`,
      'Wishes': 'Smiles, laughter, and high flying dreams! Happy Birthday Rohan!',
      'Photo URL': ''
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData);

  // Set column widths
  worksheet['!cols'] = [
    { wch: 22 }, // Student Name
    { wch: 14 }, // Grade
    { wch: 10 }, // Section
    { wch: 16 }, // Date of Birth (YYYY-MM-DD)
    { wch: 45 }, // Wishes
    { wch: 35 }, // Photo URL
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students_Birthdays');

  // Trigger download
  XLSX.writeFile(workbook, 'GD_Goenka_Student_Birthdays_Template.xlsx');
};
