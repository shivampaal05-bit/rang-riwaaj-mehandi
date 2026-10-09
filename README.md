# MehndiConnect 🌸
### Date-Locked, Price-Transparent & Backup-Guaranteed Local Mehndi Platform for Gorakhpur, Uttar Pradesh

> *"Book the right mehndi artist for your exact date, budget, and location—with transparent pricing and backup support."*

---

## 📖 Table of Contents
1. [The Research-Based Problem](#-the-research-based-problem)
2. [How MehndiConnect Solves It](#-how-mehndiconnect-solves-it)
3. [Core Differentiating Features](#-core-differentiating-features)
4. [Gorakhpur Localities Served](#-gorakhpur-localities-served)
5. [Demo Personas & Fast Login](#-demo-personas--fast-login)
6. [Tech Stack & Architecture](#-tech-stack--architecture)
7. [Getting Started (Run Locally)](#-getting-started-run-locally)
8. [Automated Test Suite](#-automated-test-suite)

---

## 🔍 The Research-Based Problem

Existing mehndi directory sites and social media pages (Instagram, JustDial, UrbanClap, WhatsApp) provide basic artist listings, but wedding customers in Tier-2 cities like **Gorakhpur, Uttar Pradesh** face 7 severe problems:

1. **Unclear Real Availability on Auspicious Dates:** During peak *shubh lagan* dates, artists verbally agree to multiple weddings, overbook themselves, and dispatch unvetted junior trainees at the last hour.
2. **The "Starting From" Price Trap:** Ambiguous "₹2,500 starting price" quotes explode into ₹10,000–₹15,000 on the event day with surprise fees for feet, family members, travel, and late hours.
3. **Capacity & Timing Guesswork:** Families don't know how many artists are required or how long it will take, causing brides to be late for stage entry, *varmala*, or photoshoot.
4. **Last-Minute Cancellation Nightmare:** When an artist cancels or stops taking calls 2 hours before the ceremony, brides are stranded with zero emergency fallback.
5. **Fake / Stolen Portfolios:** Reposting high-end photos from Delhi/Pinterest while delivering subpar local work.
6. **No Booking Status Timeline:** After paying advance, clients anxiously call repeatedly without knowing if the artist is actually en route.
7. **Lack of Hindi-Friendly Experience:** Need for simple, bilingual, mobile-first flows with direct phone and WhatsApp summary integration.

---

## 💡 How MehndiConnect Solves It

MehndiConnect transforms mehndi booking from an informal, stressful gamble into a **date-locked, price-transparent, and backup-guaranteed digital service**.

```
[Customer Selects Gorakhpur Locality + Date + Slot]
                          │
                          ▼
            [Real Availability Filter]
          (Shows only truly available artists)
                          │
                          ▼
         [Transparent Price Calculator]
  (Base + Guests + Distance + Addons - Promo = Final Total)
                          │
                          ▼
         [20% Advance Token Date-Lock]
     (Slot locked on artist calendar: Red/Booked)
                          │
                          ▼
          [Standby Backup Pre-Assigned]
     (Matched by locality, style, and price)
                          │
                          ▼
        [9-Stage Live Milestone Tracker]
   (En-Route GPS -> Completed -> Verified Review)
```

---

## 🚀 Core Differentiating Features

### 1. Date-Wise Real Availability & Calendar Slot Lock
- Customer selects city, service, event date, and preferred time slot:
  - Morning (9:00 AM – 1:00 PM)
  - Afternoon (1:00 PM – 5:00 PM)
  - Evening (5:00 PM – 9:00 PM)
  - Night (9:00 PM – 12:00 AM)
- Shows only artists truly available for that date and slot.
- Three real-time states: **Available** (green), **Pending Inquiry** (amber), and **Booked / Date-Locked** (red).
- **Double-booking prevention:** If an artist is booked for a slot, the system prevents double-booking.
- Interactive monthly artist availability calendar.

### 2. Transparent Final Price Calculator
- Ask for:
  - Service type (Bridal, Sangeet/Guest, Groom, Engagement, Festival)
  - Hand coverage (Wrist, Forearm, Elbow-length)
  - Feet henna coverage (Ankles / Payal cuffs, Mid-calf, Royal Full feet)
  - Number of family members / guests (1 side or 2 sides per guest)
  - Gorakhpur venue locality & travel distance (free within 3-5 km, standard rate per km beyond)
  - Extra custom requirements (Portrait faces of bride & groom, thematic Doli/Baraat story, overtime post 10 PM)
- Complete itemized breakdown:
  $$\text{Base Package} + \text{Guest Charges} + \text{Travel Fee} + \text{Addons} - \text{Discount} = \textbf{Final Total}$$
- Breaks into: **20% advance token** to lock the slot, and **80% balance** payable post-service.

### 3. Smart Event Time & Artist Capacity Planner
- Inputs: Bride count, Groom count, Guest count, and Event Start Time.
- Calculates:
  - Recommended number of artists (Lead bridal artist + Assistant artists)
  - Parallel application duration (e.g. 4.5 hours with simultaneous guest stations)
  - Recommended call/arrival time calculated backwards from event start time
  - 1.5-hour drying and lemon-sugar/clove care buffer
  - Hourly milestone timeline schedule

### 4. 5-Point Verified Artist Profile
Distinct verification badges:
- 🛡️ **Identity Verified:** Aadhaar / Govt ID verified
- 📞 **Phone Verified:** Active mobile number confirmed via OTP
- 🖼️ **Portfolio Checked:** Reverse-image searched for original work
- ✨ **Skill Checked:** Henna line finesse, speed & dark stain tested
- 🏠 **Home-Service Verified:** Gorakhpur residential address verified
*Only displays verified status where the mock artist is actually certified.*

### 5. Portfolio Authenticity
Each portfolio item displays:
- Design category (Bridal Traditional, Rajasthani, Arabic, Mandala, Khafif)
- Placement (Front hands, Back hands, Feet, Elbows)
- Date and Gorakhpur venue of application
- Approximate duration (e.g., 4.5 hours)
- Related package price
- Certified **Original Portfolio** badge

### 6. Standby Backup Artist Guarantee
If a confirmed artist encounters an emergency and cancels:
- The system automatically triggers the **Standby Backup Matching Engine**.
- Matches standby artists by: Date, Gorakhpur locality proximity, style fit, and reliability score.
- **Price Protection Guarantee:** If the backup artist normally charges a higher rate, MehndiConnect covers 100% of the price difference. The customer pays ₹0 extra.
- Gives the customer 4 clear options:
  1. *Accept Recommended Standby Artist* (Instant 1-click slot transfer)
  2. *View Alternate Standby Artists*
  3. *Reschedule Event Date* (Advance carried forward)
  4. *Request 100% Instant Refund* (+ ₹500 courtesy apology coupon)

### 7. Trustworthy Reviews & Reliability Index
- **Anti-Spam Review Lock:** Reviews can **only** be submitted for verified completed bookings (`service_completed`).
- 5-Pillar Aspect Ratings:
  1. Design Quality & Finesse
  2. On-Time Arrival
  3. Behaviour & Professionalism
  4. Price Transparency (Zero hidden charges)
  5. Cleanliness & Natural Cone Hygiene
- Artist Reliability Metrics:
  - Response Rate (e.g., 99%)
  - Average Response Time (e.g., 6 mins)
  - On-Time Percentage (e.g., 99%)
  - Cancellation Rate (e.g., 0.4%)
  - Completed Weddings (e.g., 240+)

### 8. 9-Stage Live Booking Timeline
Milestone stepper tracking each phase:
1. `Request Sent`
2. `Artist Accepted`
3. `Advance Pending`
4. `Booking Confirmed` (Date-Locked)
5. `Artist On The Way` (Live transit status)
6. `Service Started`
7. `Service Completed`
8. `Remaining Payment`
9. `Review Submitted`
*Includes an interactive simulation button to step through every stage.*

### 9. Hindi-Friendly UX
- One-click English ⇋ Hindi language switcher in the header.
- Direct **"Call Artist"** modal with verified local phone numbers.
- **"WhatsApp Booking Summary"** button generating formatted bilingual summary texts.
- Mobile-first layouts with localized Gorakhpur guidance.

---

## 📍 Gorakhpur Localities Served

All mock artists, distances, travel surcharges, and backup radii are localized to Gorakhpur:
- **Golghar (City Center)** — 0 km
- **Betiahata** — 2.5 km
- **Mohaddipur** — 3.2 km
- **Shahpur** — 4.1 km
- **Asuran Chowk** — 4.8 km
- **Medical College Road (BRD)** — 6.5 km
- **Rapti Nagar (Phase 1–4)** — 5.5 km
- **Taramandal (Nauka Vihar)** — 6.8 km
- **Basharatpur** — 4.0 km
- **Rustampur** — 5.2 km
- **Alinagar / Baxipur** — 2.0 km
- **Dharmshala Bazar / Railway Station** — 1.8 km
- **Khorabar** — 9.5 km
- **Padri Bazar** — 6.0 km

---

## 👤 Demo Personas & Fast Login

The prototype provides 1-click persona switching (via the user avatar in the navbar or `/auth`):

| Role | Demo User | Location | Key Functionality |
| :--- | :--- | :--- | :--- |
| **Customer** | Priya Tiwari | Golghar | Browse artists, calculate prices, book date-locked slots, track 9-stage timeline, test backup matching, submit verified reviews. |
| **Artist** | Pooja Verma | Betiahata | View upcoming bookings, advance service statuses, toggle availability calendar slots (Available/Pending/Booked), simulate emergency cancellation. |
| **Admin** | Rajnish Kumar (Ops Lead) | Gorakhpur Hub | Monitor total platform bookings, manage 5-point verification badges for any artist, check standby backup readiness, reset demo data. |

*You can also test custom phone login using simulated OTP: `1234`.*

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 19, JavaScript ES6+ with JSX
- **Bundler:** Vite 8
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4 + Vanilla Custom Theme (Deep Henna Maroon `#831843`, Festive Amber `#d97706`, Emerald Trust Badges)
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti
- **State Management & Persistence:** React Context + `localStorage`
- **Testing:** Custom ES Module automated integration test runner (`test_suite.mjs`)

---

## 💻 Getting Started (Run Locally)

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd "mehadi project"
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://127.0.0.1:5173/` or `http://localhost:5173/`.

### 3. Build for Production
```bash
npm run build
```

---

## 🧪 Automated Test Suite

Run the built-in test suite to verify price calculations, planner duration formulas, bilingual dictionaries, and double-booking prevention:

```bash
node test_suite.mjs
```

**Results:**
- ✅ 59/59 Automated test assertions passed
- ✅ 0 Failures

---

## 🛡️ Disclaimer
*MehndiConnect is a demo prototype web application created for Gorakhpur residents. All financial transactions, artist calls, and bookings are simulated demonstrations using local mock data and `localStorage`.*
