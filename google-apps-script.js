// ─────────────────────────────────────────────────────────────────────────────
// ERP Task Tracker — Google Apps Script
// Paste this entire file into your Google Sheet's Apps Script editor
// Tools → Apps Script → replace everything → Save → Deploy
// ─────────────────────────────────────────────────────────────────────────────

const SHEET_NAME = 'Tasks';

const HEADERS = ['Row Index', 'Date', 'Employee', 'Module', 'Task Description', 'Hours', 'Priority', 'Status', 'Screenshot', 'Timestamp'];

// ── Handle GET requests (load tasks) ─────────────────────────────────────────
function doGet(e) {
  const action = e.parameter.action;
  if (action === 'getTasks') {
    return getTasks();
  }
  return jsonResponse({ error: 'Unknown action' });
}

// ── Handle POST requests (add / delete task) ──────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === 'addTask')    return addTask(data);
    if (data.action === 'deleteTask') return deleteTask(data);
    return jsonResponse({ error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

// ── Add a task row ────────────────────────────────────────────────────────────
function addTask(data) {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  const rowIndex = lastRow + 1;

  sheet.appendRow([
    rowIndex,
    data.date       || '',
    data.emp        || '',
    data.mod        || '',
    data.desc       || '',
    data.hours      || '',
    data.priority   || 'Normal',
    data.status     || 'Pending',
    data.screenshot || '',
    new Date().toISOString()
  ]);

  // Auto-resize columns (skip screenshot column — it's huge)
  sheet.autoResizeColumns(1, 8);

  return jsonResponse({ success: true, row: rowIndex });
}

// ── Get all tasks ─────────────────────────────────────────────────────────────
function getTasks() {
  const sheet = getSheet();
  const data  = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return jsonResponse({ tasks: [] });
  }

  // Skip header row (row 0), map remaining rows
  const tasks = data.slice(1).map((row, i) => ({
    rowIndex   : i + 2,          // actual sheet row number (1-indexed, +1 for header)
    date       : row[1] ? Utilities.formatDate(new Date(row[1]), Session.getScriptTimeZone(), 'yyyy-MM-dd') : '',
    emp        : row[2],
    mod        : row[3],
    desc       : row[4],
    hours      : row[5],
    priority   : row[6],
    status     : row[7],
    screenshot : row[8],
    timestamp  : row[9]
  })).reverse(); // newest first

  return jsonResponse({ tasks });
}

// ── Delete a task by row index ────────────────────────────────────────────────
function deleteTask(data) {
  const sheet    = getSheet();
  const rowIndex = parseInt(data.rowIndex);
  if (!rowIndex || rowIndex < 2) {
    return jsonResponse({ error: 'Invalid row index' });
  }
  sheet.deleteRow(rowIndex);
  // Re-number the Row Index column after deletion
  renumberRows(sheet);
  return jsonResponse({ success: true });
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getSheet() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let   sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Write headers with formatting
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setValues([HEADERS]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#1a1a18');
    headerRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    // Set column widths
    sheet.setColumnWidth(1, 70);   // Row Index
    sheet.setColumnWidth(2, 100);  // Date
    sheet.setColumnWidth(3, 150);  // Employee
    sheet.setColumnWidth(4, 180);  // Module
    sheet.setColumnWidth(5, 320);  // Task Description
    sheet.setColumnWidth(6, 70);   // Hours
    sheet.setColumnWidth(7, 90);   // Priority
    sheet.setColumnWidth(8, 100);  // Status
    sheet.setColumnWidth(9, 80);   // Screenshot
    sheet.setColumnWidth(10, 160); // Timestamp
  }
  return sheet;
}

function renumberRows(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  for (let r = 2; r <= lastRow; r++) {
    sheet.getRange(r, 1).setValue(r - 1);
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
