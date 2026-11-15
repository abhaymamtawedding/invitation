# Abhay & Mamta's Wedding E-Invitation
### Kerala (Nair) & Nepal (Khati Sunar) Cultural Fusion E-Invitation

A mobile-first, scrolling digital wedding invitation celebrating the sacred union of **Abhay Sasidharan** (Kozhikode, Kerala) and **Mamta Khati Sunar** (Butwal, Nepal).

---

## 🗓️ Celebration Dates & Timings

* **Wedding Ceremony & Muhurtham**:
  * **Date**: **Monday, 15 February 2027**
  * **Timing**: **11:00 AM – 12:00 PM IST** (Auspicious Thalikettu Muhurtham)
  * **Important Notice**: **Guests are requested to arrive before 11:00 AM** (Guest seating opens at 10:30 AM).
  * **Feast**: Followed by Traditional Grand Kerala Sadhya (12:30 PM).
  * **Venue**: **The Renai Kappad Beach Resort**, Kozhikode, Kerala ([Google Maps](https://share.google/ExteMGqFWNRnziVgN)).

* **Grand Wedding Reception**:
  * **Date**: **Tuesday, 16 February 2027**
  * **Timing**: **From 03:00 PM Onwards (Evening)**
  * **Celebration**: Music, felicitations, photography, and banquet dinner.
  * **Venue**: **Auditorium, Kuttiady, Kozhikode**, Kerala ([Google Maps](https://maps.google.com/?q=Kuttiady+Auditorium,+Kozhikode,+Kerala)).

---

## 🎵 Wedding Music

* The wedding e-invitation features the custom instrumental music provided by the couple (`assets/wedding-music.mp3`).
* Autoplays smoothly when guests tap the royal seal to open the invitation, with a floating mute/play controller (`Music: ON` / `Music: MUTED`).

---

## 📸 Visual & Photo Improvements

* **Enlarged Groom & Bride Visibility**:
  * Groom (**Abhay**): Displayed in a prominent, grand 280×340px portrait frame in traditional Kerala Kasavu Mundu.
  * Bride (**Mamta**): Displayed in a matching grand 280×340px portrait frame in her traditional Kerala Kasavu saree with boat race motif and jhumkas.
* **Redesigned Love Story Section**:
  * Clean, centered magazine-style feature cards with 4:5 portrait framing so photos (`photo-4`, `photo-8`, `photo-9`, `photo-5`) align without cutting off faces.

---

## 📞 WhatsApp Contact & Direct RSVP

* **Direct Family & Host WhatsApp**: `+91 97782 54499`
* Guests can confirm RSVP directly to your Google Sheet or click the instant WhatsApp button with pre-formatted details (including their chosen vehicle mode and arrival pickup point).

---

## 📊 Quick Google Sheet Webhook Setup

1. Open [Google Sheets](https://sheets.google.com) and create a sheet named **"Abhay & Mamta Wedding RSVPs"**.
2. Set headers in Row 1 (Cols A–J):
   `Timestamp | Full Name | WhatsApp / Phone | Events Attending | Number of Guests | Attendance Status | Arriving By | Pickup Location | Dietary Notes | Wishes`
3. Click **Extensions > Apps Script**, paste [`google_apps_script.js`](./google_apps_script.js).
4. Click **Deploy > New deployment > Web app** (Access: **Anyone**).
5. Paste the generated URL in `script.js` under `GOOGLE_SHEET_WEBHOOK_URL`.
