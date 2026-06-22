# ERP Task Tracker — Setup Guide

## What you'll have after this setup
- A task tracker webpage running from your GitHub repo
- All data stored live in a Google Sheet (your "database")
- Excel export anytime you want a snapshot

---

## STEP 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet
2. Name it: **ERP Task Tracker**
3. Keep this tab open — you'll come back to it

---

## STEP 2 — Add the Apps Script (backend)

1. In your Google Sheet, click **Extensions → Apps Script**
2. A new tab opens with a code editor
3. **Delete all the existing code** in the editor
4. Open the file `google-apps-script.js` from this project
5. **Copy the entire contents** and paste it into the Apps Script editor
6. Click the **Save** button (floppy disk icon) — name the project `ERP Task Tracker`

---

## STEP 3 — Deploy as a Web App

1. In the Apps Script editor, click **Deploy → New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Fill in the settings:
   - **Description:** ERP Task Tracker API
   - **Execute as:** Me
   - **Who has access:** Anyone  ← important!
4. Click **Deploy**
5. It will ask you to **Authorize** — click through and allow it
6. After deploying, you'll see a **Web app URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
7. **Copy this URL** — you'll need it in the next step

> ⚠️ Keep this URL private — anyone with it can add/read tasks.

---

## STEP 4 — Configure the app

1. Open the file `config.js` in this project
2. Replace `YOUR_SCRIPT_URL_HERE` with the URL you copied:
   ```js
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```
3. Edit the `EMPLOYEES` list with your actual team names
4. Edit the `MODULES` list if needed
5. Save the file

---

## STEP 5 — Push to GitHub

### If you're new to GitHub:

1. Go to [github.com](https://github.com) and create a free account
2. Click **New repository** → name it `erp-task-tracker`
3. Set it to **Public** (or Private — both work)
4. Click **Create repository**

### Upload your files:

Option A — drag and drop in the browser:
1. On your new repo page, click **uploading an existing file**
2. Drag all 4 files into the browser window:
   - `index.html`
   - `config.js`
   - `google-apps-script.js`
   - `SETUP_GUIDE.md`
3. Click **Commit changes**

Option B — using Git (if you have it installed):
```bash
git init
git add .
git commit -m "Initial commit — ERP Task Tracker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/erp-task-tracker.git
git push -u origin main
```

---

## STEP 6 — Open the app

You can now open `index.html` directly in your browser by:

- Double-clicking the file on your computer, **OR**
- Enabling GitHub Pages: repo Settings → Pages → Source: main branch → Save
  - Your app will be live at: `https://YOUR_USERNAME.github.io/erp-task-tracker`

---

## How to update the app later

Whenever you make changes:

1. Edit the files on your computer
2. Push to GitHub again:
   ```bash
   git add .
   git commit -m "Update task tracker"
   git push
   ```

If you change the Apps Script code, you must **create a new deployment** in Apps Script (Deploy → New deployment) and update the URL in `config.js`.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "Could not load tasks" | Check SCRIPT_URL in config.js is correct |
| Data not saving | Re-deploy the Apps Script (new deployment) |
| Screenshot not showing in Sheets | Screenshots are stored as base64 — they appear in the app but not in the Sheet cell |
| CORS error in console | Make sure "Who has access" is set to **Anyone** in deployment |

---

## Your Google Sheet structure

The sheet will auto-create with these columns:

| Row Index | Date | Employee | Module | Task Description | Hours | Priority | Status | Screenshot | Timestamp |
|---|---|---|---|---|---|---|---|---|---|

You can add filters, charts, or conditional formatting directly in Google Sheets — the app won't break.
