/**
 * GOOGLE APPS SCRIPT FOR ABHAY & MAMTA'S WEDDING RSVP
 * Updated for Wedding (15 Feb 2027) & Reception (16 Feb 2027)
 * 
 * ============================================================================
 * 🚨 CRITICAL FIX FOR "NOT UPDATING IN GOOGLE SHEETS" (HTTP 401 UNAUTHORIZED)
 * ============================================================================
 * Why Google Sheets was not updating:
 * When you deployed the Web App, Google defaulted "Who has access" to "Only myself".
 * Because guests visit your wedding website without being logged into your Google
 * account, Google blocks every request with "HTTP 401: Unauthorized" and redirects
 * to a sign-in screen, preventing any data from reaching the spreadsheet.
 * 
 * 🔧 HOW TO FIX IN 1 MINUTE:
 * 1. Open your Google Sheet: "Abhay & Mamta Wedding RSVPs"
 * 2. In top menu, click: Extensions > Apps Script
 * 3. Replace all existing code with this updated file and click Save (💾).
 * 4. In the top right, click: Deploy > Manage deployments
 * 5. Click the Pencil (Edit) icon on the active Web App deployment:
 *    - Version: Select "New version"
 *    - Execute as: "Me (<your-email>)"
 *    - Who has access: Select "Anyone"  <=== (CRITICAL: MUST BE "Anyone")
 * 6. Click "Deploy".
 * 7. Copy the "Web app URL" (ends with /exec).
 *    If the URL changed, paste it into script.js under GOOGLE_SHEET_WEBHOOK_URL.
 * 8. Open the Web App URL directly in a browser tab to test:
 *    It should display: "✅ SUCCESS: Webhook is ACTIVE and CONNECTED!"
 * ============================================================================
 */

function getTargetSheet() {
  var ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {}

  if (!ss) {
    // Fallback: If this script was created as a standalone script outside Google Sheets,
    // paste your Spreadsheet ID here (found in the Google Sheet URL between /d/ and /edit):
    var SPREADSHEET_ID = "";
    if (SPREADSHEET_ID) {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    }
  }

  if (!ss) {
    throw new Error("No active spreadsheet found. Make sure this script was opened via Extensions > Apps Script inside your Google Sheet.");
  }

  var sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];

  // Auto-create and format headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Timestamp",
      "Full Name",
      "WhatsApp / Phone",
      "Events Attending",
      "Number of Guests",
      "Attendance Status",
      "Arriving By",
      "Pickup Location",
      "Dietary Notes",
      "Wishes / Blessings"
    ];
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#D4AF37");
    headerRange.setFontColor("#2A1810");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function doPost(e) {
  try {
    var sheet = getTargetSheet();
    var data = {};
    
    // Parse data from JSON payload or form parameters
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
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

// Support GET in browser for one-click verification and testing
function doGet(e) {
  try {
    var sheet = getTargetSheet();
    var ssName = sheet.getParent().getName();
    var rows = sheet.getLastRow();
    return ContentService
      .createTextOutput(
        "✅ SUCCESS: Abhay & Mamta Wedding RSVP Webhook is ACTIVE and CONNECTED!\n\n" +
        "• Spreadsheet: " + ssName + "\n" +
        "• Sheet Tab: " + sheet.getName() + "\n" +
        "• Recorded Rows: " + rows + "\n" +
        "• Timestamp: " + new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + "\n\n" +
        "Ready to receive RSVPs from the wedding invitation!"
      )
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService
      .createTextOutput(
        "⚠️ Webhook is active, but encountered an error connecting to the Google Sheet:\n" +
        err.toString() + "\n\n" +
        "Make sure the script was created inside the Google Sheet via Extensions > Apps Script."
      )
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
