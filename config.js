// ─────────────────────────────────────────────────────────────────────────────
// ERP Task Tracker — Configuration
// ─────────────────────────────────────────────────────────────────────────────
// STEP 1: Paste your Google Apps Script Web App URL below.
//         (See SETUP_GUIDE.md for how to get this URL)
// ─────────────────────────────────────────────────────────────────────────────

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxNaf2LojpYMsqgmxM1K0YOdhpLrSDRzrB14QvxTYkcnzyAzEnokx5lTKIEx7E8sfUVJw/exec';

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2: Edit the employee list below with your actual team names
// ─────────────────────────────────────────────────────────────────────────────

const EMPLOYEES = [
  'RUSHI JADHAV',
  'Samadhan Survase',
  'C Basarkar',
  'AKHILESH OJHA',
  'Suresh Dhawale',
  'Mousmi Ghosh',
  'DEEPAK TIMALSINA',
  'SAMBHAJI PAGIRE',
  
];

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3: Edit the ERP module list if needed
// ─────────────────────────────────────────────────────────────────────────────

const MODULES = [
  'Finance (FI)',
  'Controlling (CO)',
  'Sales & Distribution (SD)',
  'Material Management (MM)',
  'Production Planning (PP)',
  'Human Resources (HR)',
  'Basis / Technical',
  'General Support',
  'Testing / UAT',
  'Training',
];
