/**
 * GOOGLE APPS SCRIPT FOR ABHAY & MAMTA'S WEDDING RSVP
 * Updated for Wedding (15 Feb 2027) & Reception (16 Feb 2027)
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new spreadsheet named:
 *    "Abhay & Mamta Wedding RSVPs"
 * 
 * 2. In Row 1 of "Sheet1", paste these headers into columns A through J:
 *    A: Timestamp
 *    B: Full Name
 *    C: WhatsApp / Phone
 *    D: Events Attending (Wedding / Reception / Both)
 *    E: Number of Guests
 *    F: Attendance Status
 *    G: Arriving By (Vehicle Mode)
 *    H: Pickup Location
 *    I: Dietary Notes
 *    J: Wishes / Blessings
 * 
 * 3. In Google Sheets menu, click:
 *    Extensions > Apps Script
 * 
 * 4. Replace all code in the script editor with this file's code.
 * 
 * 5. Click "Deploy" (top right) > "New deployment".
 *    - Click the gear icon next to "Select type" and choose "Web app".
 *    - Description: "Wedding RSVP Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"  <--- (IMPORTANT: Must be "Anyone" so guests can submit without signing in)
 *    - Click "Deploy".
 * 
 * 6. Copy the "Web app URL" (looks like https://script.google.com/macros/s/.../exec).
 * 
 * 7. Open `script.js` in your wedding invitation project and paste the URL into:
 *    const GOOGLE_SHEET_WEBHOOK_URL = "YOUR_COPIED_URL_HERE";
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};
    
    // Check if data came as raw JSON or form-encoded
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    var timestamp = data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var name = data.guest_name || "N/A";
    var phone = data.guest_phone || "N/A";
    var events = data.events_attending || "Both Celebrations";
    var count = data.guest_count || "1";
    var attending = data.attendance || "Joyfully Attending";
    var transport = data.transport_mode || "Own Vehicle";
    var pickup = (transport === "Host Provided Vehicle") ? (data.pickup_location || "Not specified") : "Self / Own Vehicle";
    var dietary = data.dietary_notes || "-";
    var wishes = data.guest_message || "-";

    // Append new row to the Google Sheet
    sheet.appendRow([
      timestamp,
      name,
      "'" + phone, // Prefix with apostrophe to preserve formatting and country codes
      events,
      count,
      attending,
      transport,
      pickup,
      dietary,
      wishes
    ]);

    // Highlight rows requesting Host Vehicle in soft yellow for effortless logistics planning
    var lastRow = sheet.getLastRow();
    if (transport === "Host Provided Vehicle") {
      sheet.getRange(lastRow, 1, 1, 10).setBackground("#FFF9C4");
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "RSVP recorded successfully!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Support GET for browser testing
function doGet(e) {
  return ContentService
    .createTextOutput("Abhay & Mamta Wedding RSVP Webhook is active and listening for POST requests.")
    .setMimeType(ContentService.MimeType.TEXT);
}
