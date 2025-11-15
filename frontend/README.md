This is a [Next.js](https://nextjs.org) + Tailwind CSS project. It includes a fully client-side Diabetes Risk Predictor form with a simple rule-based scoring model and Framer Motion animations.

## Setup & Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

## Features

- Single-page form collecting Age, Gender, Height, Weight, Blood Pressure, Glucose, Insulin
- Automatic BMI calculation as you type
- Client-side rule-based risk prediction (no server/API calls)
- Animated result card and progress gauge using Framer Motion
- Input validation with helpful error messages
- Tooltips and hover states for better UX
- Mobile-responsive, clean Tailwind UI

## Scoring Model

- High glucose (≥ 140 mg/dL) → +30 points
- High BMI (≥ 30) → +20 points
- High blood pressure (≥ 140 mmHg) → +15 points
- High insulin (≥ 25 µU/mL) → +15 points
- Age > 45 → +10 points
- Total normalized to a 0–100% risk level (max 90 points)

Risk labels:
- 0–30% → “Low Risk”
- 31–70% → “Moderate Risk”
- 71–100% → “High Risk”

All calculations run locally in your browser and never leave your device.
