# CSIR NET Chemical Sciences Tracker - Master Prep & APK Package

## Overview
A complete preparation dashboard & mobile-ready offline app for the **CSIR-UGC NET Chemical Sciences Examination**.
Includes all 44 units across:
- **Inorganic Chemistry (13 Chapters)**
- **Physical Chemistry (14 Chapters)**
- **Organic Chemistry (13 Chapters)**
- **Interdisciplinary Topics (5 Chapters)**

### Key Features
- **4-Stage Spaced Repetition Tracker** (Rev 1: Concept, Rev 2: Problem Solving, Rev 3: Formulas, Rev 4: Mock Test Ready)
- **PYQ Target & Counter** per subtopic and subject
- **Notes Completion Status**
- **Exam Countdown & Target Deadlines**
- **Backlog Command Center**
- **YouTube & Reddit Curated Resources**

---

## How to Run Locally
1. Install Node.js (v18+)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

---

## How to Build the Android APK
### Option A: 1-Click PWA / WebAPK (Zero Setup)
Open your deployed URL in Chrome on Android and tap **Install App** / **Add to Home Screen**. Android automatically mints a native APK!

### Option B: Android Studio & Gradle
1. Open the `android/` folder inside Android Studio.
2. Run:
   ```bash
   ./gradlew assembleDebug
   ```
3. Output APK will be at:
   `android/app/build/outputs/apk/debug/app-debug.apk`
4. Transfer and sideload onto your Android device!
