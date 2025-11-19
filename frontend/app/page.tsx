 "use client";
import React, { useState, useEffect } from "react";
import {
  Heart,
  Activity,
  Scale,
  Ruler,
  Pill,
  Users,
  Droplet,
  AlertCircle,
  X,
} from "lucide-react";

// Compact Results Page Component
function ResultsPage({
  data,
  onBack,
  onRecalculate,
}: {
  data: any;
  onBack: () => void;
  onRecalculate: () => void;
}) {
  const [idrsScore, setIdrsScore] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    calculateIDRS();
  }, []);

  const calculateIDRS = () => {
    if (!data || !data.formData) {
      setIdrsScore(0);
      setLoading(false);
      return;
    }

    const { formData } = data;
    let score = 0;
    const age = Number(formData.age) || 0;
    const waist = Number(formData.waist) || 0;

    if (age < 35) score += 0;
    else if (age >= 35 && age < 50) score += 20;
    else if (age >= 50) score += 30;

    if (formData.gender === "male") {
      if (waist < 90) score += 0;
      else if (waist >= 90 && waist < 100) score += 10;
      else if (waist >= 100) score += 20;
    } else {
      if (waist < 80) score += 0;
      else if (waist >= 80 && waist < 90) score += 10;
      else if (waist >= 90) score += 20;
    }

    if (formData.physicalActivity === "vigorous") score += 0;
    else if (formData.physicalActivity === "moderate") score += 10;
    else if (formData.physicalActivity === "mild") score += 20;
    else if (formData.physicalActivity === "sedentary") score += 30;

    if (formData.familyHistory === "zero") score += 0;
    else if (formData.familyHistory === "second") score += 10;
    else if (formData.familyHistory === "first") score += 20;

    setIdrsScore(score);
    setLoading(false);
  };

  const getIDRSRisk = (score: any) => {
    if (score < 30)
      return {
        level: "Low Risk",
        color: "bg-green-500",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        icon: "🟢",
      };
    if (score < 50)
      return {
        level: "Moderate Risk",
        color: "bg-yellow-500",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-600",
        icon: "🟡",
      };
    if (score < 70)
      return {
        level: "High Risk",
        color: "bg-orange-500",
        bgColor: "bg-orange-50",
        textColor: "text-orange-600",
        icon: "🟠",
      };
    return {
      level: "Very High Risk",
      color: "bg-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      icon: "🔴",
    };
  };

  const idrsRisk = getIDRSRisk(idrsScore);
  const bmi = data.formData?.bmi || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl shadow-2xl p-5 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="w-7 h-7 text-white mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-white">Your Results</h1>
                <p className="text-white/90 text-sm">4 Key Health Metrics</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* 4 Key Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* 2. ADA Score (based on FBS) */}
          <div
            className={`
    rounded-xl shadow-lg p-5 border-t-4
    ${
      data.formData.fbs < 140
        ? "border-green-500 bg-green-50"
        : data.formData.fbs < 200
        ? "border-yellow-500 bg-yellow-50"
        : "border-red-500 bg-red-50"
    }
  `}
          >
            <div className="flex items-center mb-3">
              <Activity
                className={`w-5 h-5 mr-2 ${
                  data.formData.fbs < 140
                    ? "text-green-600"
                    : data.formData.fbs < 200
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              />
              <h3 className="font-bold text-gray-800">ADA Score (FBS)</h3>
            </div>

            {/* Value */}
            <div
              className={`text-4xl font-bold mb-1 ${
                data.formData.fbs < 140
                  ? "text-green-600"
                  : data.formData.fbs < 200
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {data.formData.fbs} mg/dL
            </div>

            {/* Meaning */}
            <p
              className={`text-lg font-semibold mb-2 ${
                data.formData.fbs < 140
                  ? "text-green-600"
                  : data.formData.fbs < 200
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {data.formData.fbs < 140
                ? "🟢 Normal"
                : data.formData.fbs < 200
                ? "🟡 Prediabetes Risk"
                : "🔴 Diabetes Range"}
            </p>
            <p
              className={`text-sm font-semibold  ${
                data.formData.fbs < 140
                  ? "text-green-600"
                  : data.formData.fbs < 200
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {data.formData.fbs < 140
                ? "* Glucose regulation is normal. Pancreas and insulin responce are functioning well."
                : data.formData.fbs < 200
                ? '* Early metabolic disturbances.This is the "Pay attention and fix" zone. Usually indicates rising insulin resistance.'
                : "* Strong suspicion of diabetes expecially if repeated or accompained by symptoms. Require formal exluation with fasting glucose and HbA1c."}
            </p>
          </div>

          {/* 3. Risk Factor with points + category */}
          <div
            className={`
    ${data.risk?.bgColor || "bg-gray-50"} 
    rounded-xl shadow-lg p-5 border-t-4
    ${(data.risk?.color || "bg-gray-500").replace("bg-", "border-")}
  `}
          >
            <div className="flex items-center mb-2">
              <AlertCircle
                className={`w-5 h-5 mr-2 ${
                  data.risk?.textColor || "text-gray-600"
                }`}
              />
              <h3 className="font-bold text-gray-800 text-lg">FINDRISK</h3>
            </div>

            {/* Score */}
            <p className="text-4xl font-semibold mb-1 flex">
              <span className={`${data.risk?.textColor || "text-gray-600"}`}>
                {data.totalScore} / 34
              </span>
            </p>

            {/* Category */}
            <div
              className={`text-lg font-bold mb-2 ${
                data.risk?.textColor || "text-gray-600"
              }`}
            >
              {data.risk?.icon || "⚪"} {data.risk?.level}
            </div>

            {/* Short Message */}
            <p className="text-sm font-bold ml-2">
              <span className={`${data.risk?.textColor || "text-gray-600"}`}>
                * {data.risk?.message || "N/A"}
              </span>
            </p>

            {/* Awareness - Doctor Recommended */}
            <p
              className={`mt-3 text-sm font-semibold ${
                data.risk?.textColor || "text-gray-600"
              }`}
            >
              {data.totalScore <= 7
                ? "✔ Low risk. Maintain a healthy diet, stay active, and monitor weight to keep your risk low."
                : data.totalScore <= 14
                ? "⚠ Moderate risk. Focus on lifestyle changes such as daily 30 mins walking, reducing sugar & starch intake."
                : data.totalScore <= 20
                ? "⚠ High risk. You may be developing insulin resistance. Early lifestyle correction is strongly advised."
                : "❗ Very high risk. You have a high chance of developing diabetes. Please consult a doctor for clinical testing (FBS, HbA1c)."}
            </p>
          </div>

          {/* IDRS SCORE CARD */}
          <div
            className={`
    rounded-xl shadow-lg p-5 border-t-4
    ${(idrsRisk.color || "bg-gray-500").replace("bg-", "border-")}
    ${idrsRisk.bgColor || "bg-gray-50"}
  `}
          >
            <div className="flex items-center mb-3">
              <Users className={`w-5 h-5 mr-2 ${idrsRisk.textColor}`} />
              <h3 className="font-bold text-lg text-gray-800">IDRS Score</h3>
            </div>

            {loading ? (
              <div className="text-center py-4">
                <div
                  className={`
          animate-spin rounded-full h-8 w-8 border-b-2 mx-auto
          ${idrsRisk.textColor}
        `}
                  style={{ borderColor: "currentColor" }}
                ></div>
              </div>
            ) : (
              <>
                {/* SCORE VALUE */}
                <div
                  className={`text-4xl font-bold mb-1 ${idrsRisk.textColor}`}
                >
                  {idrsScore} / 100
                </div>

                {/* RISK LABEL */}
                <p className={`text-lg font-semibold ${idrsRisk.textColor}`}>
                  {idrsRisk.icon} {idrsRisk.level}
                </p>

                {/* SHORT MEANING */}
                <p className="text-sm font-semibold text-gray-700 mt-2">
                  {idrsScore < 30
                    ? "* Indicates low chance of diabetes. Maintain healthy habits."
                    : idrsScore < 50
                    ? "* Moderate risk. Lifestyle changes strongly recommended."
                    : idrsScore < 70
                    ? "* High chance of insulin resistance. Requires screening."
                    : "* Very high probability of diabetes. Medical evaluation advised."}
                </p>

                {/* AWARENESS LINE */}
                <p
                  className={`
          text-xs mt-2 font-semibold
          ${
            idrsScore < 30
              ? "text-green-700"
              : idrsScore < 50
              ? "text-yellow-700"
              : idrsScore < 70
              ? "text-orange-700"
              : "text-red-700"
          }
        `}
                >
                  {idrsScore < 30
                    ? "✔ Regular exercise, balanced diet, and weight control keep you safe."
                    : idrsScore < 50
                    ? "⚠ You are in the caution zone. Manage waist size & stay active."
                    : idrsScore < 70
                    ? "❗ High risk: Overweight, inactivity, or family history may be contributing."
                    : "🚨 Very high risk: Strongly recommended to check HbA1c or fasting glucose."}
                </p>
              </>
            )}
          </div>

          {/* 1. BMI */}
          <div
            className={`
    rounded-xl shadow-lg p-5 border-t-4
    ${
      bmi < 18
        ? "border-blue-500 bg-blue-50"
        : bmi < 23
        ? "border-green-500 bg-green-50"
        : bmi < 25
        ? "border-yellow-500 bg-yellow-50"
        : "border-red-500 bg-red-50"
    }
`}
          >
            <div className="flex items-center mb-2">
              <Scale
                className={`w-5 h-5 mr-2 ${
                  bmi < 18
                    ? "text-blue-600"
                    : bmi < 23
                    ? "text-green-600"
                    : bmi < 25
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              />
              <h3 className="font-bold text-gray-800 text-lg">BMI</h3>
            </div>

            {/* BMI Value */}
            <div
              className={`text-4xl font-bold mb-1 ${
                bmi < 18
                  ? "text-blue-600"
                  : bmi < 23
                  ? "text-green-600"
                  : bmi < 25
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {bmi.toFixed(1)} Kg/m<sup>2</sup>
            </div>

            {/* BMI Category */}
            <p
              className={`text-lg font-semibold ${
                bmi < 18
                  ? "text-blue-600"
                  : bmi < 23
                  ? "text-green-600"
                  : bmi < 25
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {bmi < 18
                ? "🔵 Underweight"
                : bmi < 23
                ? "🟢 Normal"
                : bmi < 25
                ? "🟡 Overweight"
                : "🔴 Obesity"}
            </p>

            {/* Awareness Message (Doctor Recommended) */}
            <p
              className={`mt-2 text-sm font-semibold ${
                bmi < 18
                  ? "text-blue-700"
                  : bmi < 23
                  ? "text-green-700"
                  : bmi < 25
                  ? "text-yellow-700"
                  : "text-red-700"
              }`}
            >
              {bmi < 18
                ? "* Low BMI may indicate nutritional deficiencies or chronic fatigue risk. Increase calorie intake with protein-rich foods."
                : bmi < 23
                ? "* Healthy BMI. Maintain balanced diet and regular physical activity to prevent future weight gain."
                : bmi < 25
                ? "* Slightly high BMI. Early lifestyle correction is recommended to prevent diabetes and high BP."
                : "* High BMI significantly increases risk of diabetes, hypertension, fatty liver & joint problems. Consult a doctor for a weight-loss plan."}
            </p>
          </div>

          {/* BLOOD PRESSURE CARD */}
          <div
            className={`
    rounded-xl shadow-lg p-5 border-t-4
    ${
      data.formData.systolic < 120 && data.formData.diastolic < 80
        ? "border-green-500 bg-green-50"
        : data.formData.systolic < 140
        ? "border-yellow-500 bg-yellow-50"
        : "border-red-500 bg-red-50"
    }
  `}
          >
            <div className="flex items-center mb-2">
              <Pill
                className={`w-5 h-5 mr-2 ${
                  data.formData.systolic < 120 && data.formData.diastolic < 80
                    ? "text-green-600"
                    : data.formData.systolic < 140
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              />
              <h3 className="font-bold text-lg text-gray-800">
                Blood Pressure
              </h3>
            </div>

            {/* BP VALUE (Color Coded) */}
            <div
              className={`
      text-4xl font-bold mb-1
      ${
        data.formData.systolic < 120 && data.formData.diastolic < 80
          ? "text-green-600"
          : data.formData.systolic < 140
          ? "text-yellow-600"
          : "text-red-600"
      }
    `}
            >
              {data.formData.systolic}/{data.formData.diastolic} mmHg
            </div>

            {/* CONDITION LABEL */}
            <p
              className={`
      text-lg font-bold mb-1
      ${
        data.formData.systolic < 120 && data.formData.diastolic < 80
          ? "text-green-600"
          : data.formData.systolic < 140
          ? "text-yellow-600"
          : "text-red-600"
      }
    `}
            >
              {data.formData.systolic < 120 && data.formData.diastolic < 80
                ? "🟢 Normal Blood Pressure"
                : data.formData.systolic < 140
                ? "🟡 Pre-Hypertension"
                : "🔴 High Blood Pressure (Hypertension)"}
            </p>

            {/* SHORT AWARENESS MESSAGE */}
            <p className="text-sm font-semibold text-gray-700 mt-1">
              {data.formData.systolic < 120 && data.formData.diastolic < 80
                ? "* Your BP is within healthy range. Keep maintaining a balanced diet, exercise, and stress control."
                : data.formData.systolic < 140
                ? "* This is an early warning stage. Indicates increasing heart and artery pressure. Lifestyle correction recommended."
                : "* BP is high. This increases risk of heart disease, stroke, and kidney damage. Medical evaluation is advised."}
            </p>

            {/* EXTRA PATIENT AWARENESS LINE */}
            <p
              className={`
      text-xs mt-2 font-semibold
      ${
        data.formData.systolic < 120 && data.formData.diastolic < 80
          ? "text-green-700"
          : data.formData.systolic < 140
          ? "text-yellow-700"
          : "text-red-700"
      }
    `}
            >
              {data.formData.systolic < 120 && data.formData.diastolic < 80
                ? "✔ Good BP helps protect your heart, kidneys, and eyes."
                : data.formData.systolic < 140
                ? "⚠ Pre-hypertension can progress to hypertension if ignored."
                : "❗ Uncontrolled BP can lead to heart attack or stroke."}
            </p>
          </div>

          {/* PULSE RATE CARD */}
          <div
            className={`
    rounded-xl shadow-lg p-5 border-t-4
    ${
      data.formData.pulse >= 60 && data.formData.pulse <= 100
        ? "border-green-500 bg-green-50"
        : data.formData.pulse < 60
        ? "border-yellow-500 bg-yellow-50"
        : "border-red-500 bg-red-50"
    }
  `}
          >
            <div className="flex items-center mb-3">
              <Activity
                className={`w-5 h-5 mr-2 ${
                  data.formData.pulse >= 60 && data.formData.pulse <= 100
                    ? "text-green-600"
                    : data.formData.pulse < 60
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              />
              <h3 className="font-bold text-lg text-gray-800">Pulse Rate</h3>
            </div>

            {/* PULSE VALUE */}
            <div
              className={`
      text-4xl font-bold mb-1
      ${
        data.formData.pulse >= 60 && data.formData.pulse <= 100
          ? "text-green-600"
          : data.formData.pulse < 60
          ? "text-yellow-600"
          : "text-red-600"
      }
    `}
            >
              {data.formData.pulse} BPM
            </div>

            {/* CONDITION */}
            <p
              className={`
      text-lg font-bold mb-1
      ${
        data.formData.pulse >= 60 && data.formData.pulse <= 100
          ? "text-green-600"
          : data.formData.pulse < 60
          ? "text-yellow-600"
          : "text-red-600"
      }
    `}
            >
              {data.formData.pulse >= 60 && data.formData.pulse <= 100
                ? "🟢 Normal Pulse"
                : data.formData.pulse < 60
                ? "🟡 Low Pulse (Bradycardia)"
                : "🔴 High Pulse (Tachycardia)"}
            </p>

            {/* AWARENESS MESSAGE */}
            <p className="text-sm font-semibold text-gray-700">
              {data.formData.pulse >= 60 && data.formData.pulse <= 100
                ? "* Indicates a healthy heart rhythm and stable circulation."
                : data.formData.pulse < 60
                ? "* Low pulse may be normal for athletes but can indicate thyroid or heart rhythm issues if symptomatic."
                : "* High pulse may be due to stress, dehydration, fever or heart rhythm issues. Monitor regularly."}
            </p>

            {/* EXTRA AWARENESS LINE */}
            <p
              className={`
      text-xs mt-2 font-semibold
      ${
        data.formData.pulse >= 60 && data.formData.pulse <= 100
          ? "text-green-700"
          : data.formData.pulse < 60
          ? "text-yellow-700"
          : "text-red-700"
      }
    `}
            >
              {data.formData.pulse >= 60 && data.formData.pulse <= 100
                ? "✔ Good pulse supports healthy oxygen & blood circulation."
                : data.formData.pulse < 60
                ? "⚠ Consult a doctor if low pulse is accompanied by dizziness or fatigue."
                : "❗ Persistent high pulse needs medical attention."}
            </p>
          </div>
        </div>

        {/* HOW THE PROJECT WORKS – COLORFUL SUMMARY */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-xl p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            📘 How Your Diabetes Risk Was Calculated (Complete Category Guide)
          </h2>

          <p className="text-sm text-gray-700 mb-6">
            Below is a colorful medical breakdown showing how each score was
            calculated. Your own category is automatically highlighted so you
            can easily understand where you stand for BMI, Blood Pressure,
            Sugar, IDRS, and all FINDRISC factors.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {/* FINDRISC + ADA (9 Factor Breakdown) */}
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                🇫🇮 FINDRISC + 🧪 ADA (Your 9-Factor Risk Breakdown)
              </h3>

              <table className="w-full text-sm">
                <tbody>
                  {/* AGE */}
                  <tr className="border-b">
                    <td className="py-1 px-2">Age</td>
                    <td className="py-1 px-2 text-right font-semibold">
                      {data.breakdown.age} pts
                    </td>
                  </tr>

                  {/* BMI */}
                  <tr className="border-b">
                    <td className="py-1 px-2">BMI</td>
                    <td className="py-1 px-2 text-right font-semibold">
                      {data.breakdown.bmi} pts
                    </td>
                  </tr>

                  {/* WAIST */}
                  <tr className="border-b">
                    <td className="py-1 px-2">Waist Circumference</td>
                    <td className="py-1 px-2 text-right font-semibold">
                      {data.breakdown.waist} pts
                    </td>
                  </tr>

                  {/* PHYSICAL ACTIVITY */}
                  <tr className="border-b">
                    <td className="py-1 px-2">Physical Activity</td>
                    <td className="py-1 px-2 text-right font-semibold">
                      {data.breakdown.activity} pts
                    </td>
                  </tr>

                  {/* FRUIT/VEG */}
                  <tr className="border-b">
                    <td className="py-1 px-2">Daily Fruits & Vegetables</td>
                    <td className="py-1 px-2 text-right font-semibold">
                      {data.breakdown.fruitVeg} pts
                    </td>
                  </tr>

                  {/* BP MEDICATION */}
                  <tr className="border-b">
                    <td className="py-1 px-2">BP Medication</td>
                    <td className="py-1 px-2 text-right font-semibold">
                      {data.breakdown.bpMed} pts
                    </td>
                  </tr>

                  {/* HIGH SUGAR HISTORY */}
                  <tr className="border-b">
                    <td className="py-1 px-2">History of High Blood Sugar</td>
                    <td className="py-1 px-2 text-right font-semibold">
                      {data.breakdown.highSugar} pts
                    </td>
                  </tr>

                  {/* FAMILY HISTORY */}
                  <tr className="border-b">
                    <td className="py-1 px-2">Family History</td>
                    <td className="py-1 px-2 text-right font-semibold">
                      {data.breakdown.family} pts
                    </td>
                  </tr>

                  {/* ADA FBS */}
                  <tr>
                    <td className="py-2 px-2 font-semibold text-blue-700">
                      ADA Fasting Blood Sugar
                    </td>
                    <td className="py-2 px-2 text-right font-bold text-blue-700">
                      {data.breakdown.fbs} pts
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* FINDRISC + ADA – Risk Category Table */}
              <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2 text-sm flex items-center">
                  <span className="mr-1">🔥</span> Risk Categories (Recommended)
                </h4>

                <div className="text-xs text-gray-700 space-y-1">
                  <div className="flex justify-between">
                    <span>0–7</span>
                    <span className="flex items-center gap-1">
                      🟢 <strong>Low risk</strong>
                    </span>
                    <span>Lifestyle advice only</span>
                  </div>

                  <div className="flex justify-between">
                    <span>8–14</span>
                    <span className="flex items-center gap-1">
                      🟡 <strong>Moderate risk</strong>
                    </span>
                    <span>Recommend screening within 1 year</span>
                  </div>

                  <div className="flex justify-between">
                    <span>15–20</span>
                    <span className="flex items-center gap-1">
                      🟠 <strong>High risk</strong>
                    </span>
                    <span>High probability of prediabetes</span>
                  </div>

                  <div className="flex justify-between">
                    <span>21+</span>
                    <span className="flex items-center gap-1">
                      🔴 <strong>Very high risk</strong>
                    </span>
                    <span>Strongly suggest diagnostic testing</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-600 mt-3 italic">
                  These thresholds align with validated FINDRISC research but
                  expanded to include ADA glucose scoring.
                </p>
              </div>

              <p className="text-xs text-gray-600 mt-3 italic">
                Total = FINDRISC (8 factors) + ADA FBS (1 factor)
              </p>
            </div>

            {/* INDIAN DIABETES RISK SCORE (IDRS) */}
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                🇮🇳 Indian Diabetes Risk Score (IDRS)
              </h3>

              <table className="w-full text-sm">
                <tbody>
                  {/* AGE */}
                  <tr className="border-b">
                    <td className="py-1 px-2">Age</td>
                    <td className="py-1 px-2 text-right font-semibold">
                      {data.formData.age < 35
                        ? "0 pts"
                        : data.formData.age < 50
                        ? "20 pts"
                        : "30 pts"}
                    </td>
                  </tr>

                  {/* WAIST */}
                  <tr className="border-b">
                    <td className="py-1 px-2">Waist Circumference</td>
                    <td className="py-1 px-2 text-right font-semibold">
                      {data.formData.gender === "male"
                        ? data.formData.waist < 90
                          ? "0 pts"
                          : data.formData.waist < 100
                          ? "10 pts"
                          : "20 pts"
                        : data.formData.waist < 80
                        ? "0 pts"
                        : data.formData.waist < 90
                        ? "10 pts"
                        : "20 pts"}
                    </td>
                  </tr>

                  {/* ACTIVITY */}
                  <tr className="border-b">
                    <td className="py-1 px-2">Physical Activity</td>
                    <td className="py-1 px-2 text-right font-semibold">
                      {data.formData.physicalActivity === "vigorous"
                        ? "0 pts"
                        : data.formData.physicalActivity === "moderate"
                        ? "10 pts"
                        : data.formData.physicalActivity === "mild"
                        ? "20 pts"
                        : "30 pts"}
                    </td>
                  </tr>

                  {/* FAMILY HISTORY */}
                  <tr>
                    <td className="py-1 px-2">Family History</td>
                    <td className="py-1 px-2 text-right font-semibold">
                      {data.formData.familyHistory === "zero"
                        ? "0 pts"
                        : data.formData.familyHistory === "second"
                        ? "10 pts"
                        : "20 pts"}
                    </td>
                  </tr>
                </tbody>
              </table>

              <p className="text-xs text-gray-600 mt-3 italic">
                Total = IDRS score out of 100
              </p>

              {/* PERFECT COMPACT IDRS CARD */}
              <div className="bg-white rounded-xl shadow-lg p-5 border-t-4 border-orange-500 mt-10">
                {/* MINI SCORING TABLE */}
                <div className="mt-4 bg-orange-50 border-l-4 border-orange-400 p-3 rounded-lg">
                  <h4 className="font-bold text-orange-800 mb-2 text-sm">
                    IDRS Scoring
                  </h4>

                  <div className="text-xs text-gray-700 space-y-1">
                    <p>
                      <strong>Age:</strong> &lt;35=0 | 35–49=20 | ≥50=30
                    </p>
                    <p>
                      <strong>Waist:</strong> M:&lt;90=0 | 90–99=10 | ≥100=20
                    </p>
                    <p className="ml-10">F:&lt;80=0 | 80–89=10 | ≥90=20</p>
                    <p>
                      <strong>Physical Activity:</strong> Vig=0 | Mod=10 |
                      Mild=20 | Sed=30
                    </p>
                    <p>
                      <strong>Family History:</strong> None=0 | One=10 | Both=20
                    </p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-orange-300 text-xs">
                    <p>
                      <strong>Risk:</strong>
                    </p>
                    <p>🟢 &lt;30 Low</p>
                    <p>🟡 30–49 Moderate</p>
                    <p>🟠 50–69 High</p>
                    <p>🔴 ≥70 Very High</p>
                  </div>
                </div>
              </div>
            </div>

            {/* BMI */}
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                ⚖️ BMI Classification (Asian Standard)
              </h3>

              <table className="w-full text-sm">
                <tbody>
                  {[
                    {
                      label: "Underweight",
                      range: "< 18.5",
                      color: "bg-blue-100 text-blue-700",
                      min: 0,
                      max: 18.4,
                    },
                    {
                      label: "Normal",
                      range: "18.5 – 22.9",
                      color: "bg-green-100 text-green-700",
                      min: 18.5,
                      max: 22.9,
                    },
                    {
                      label: "Overweight",
                      range: "23 – 24.9",
                      color: "bg-yellow-100 text-yellow-700",
                      min: 23,
                      max: 24.9,
                    },
                    {
                      label: "Obesity",
                      range: "≥ 25",
                      color: "bg-red-100 text-red-700",
                      min: 25,
                      max: 99999,
                    },
                  ].map((row, idx) => {
                    const active =
                      data.formData.bmi >= row.min &&
                      data.formData.bmi <= row.max;
                    return (
                      <tr
                        key={idx}
                        className={`rounded ${active ? row.color : ""}`}
                      >
                        <td className="py-1 px-2">{row.label}</td>
                        <td className="text-right py-1 px-2 font-semibold">
                          {row.range}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* BLOOD PRESSURE */}
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                🩺 Blood Pressure Category
              </h3>

              <table className="w-full text-sm">
                <tbody>
                  {[
                    {
                      label: "Normal",
                      range: "120/80",
                      color: "bg-green-100 text-green-700",
                      minSys: 0,
                      maxSys: 119,
                      minDia: 0,
                      maxDia: 79,
                    },
                    {
                      label: "Elevated",
                      range: "120–129 / < 80",
                      color: "bg-yellow-100 text-yellow-700",
                      minSys: 120,
                      maxSys: 129,
                      minDia: 0,
                      maxDia: 79,
                    },
                    {
                      label: "Stage 1 Hypertension",
                      range: "130–139 / 80–89",
                      color: "bg-orange-100 text-orange-700",
                      minSys: 130,
                      maxSys: 139,
                      minDia: 80,
                      maxDia: 89,
                    },
                    {
                      label: "Stage 2 Hypertension",
                      range: "≥ 140 / ≥ 90",
                      color: "bg-red-100 text-red-700",
                      minSys: 140,
                      maxSys: 300,
                      minDia: 90,
                      maxDia: 200,
                    },
                  ].map((row, idx) => {
                    const sys = data.formData.systolic;
                    const dia = data.formData.diastolic;
                    const active =
                      sys >= row.minSys &&
                      sys <= row.maxSys &&
                      dia >= row.minDia &&
                      dia <= row.maxDia;

                    return (
                      <tr key={idx} className={`${active ? row.color : ""}`}>
                        <td className="py-1 px-2">{row.label}</td>
                        <td className="py-1 px-2 text-right font-semibold">
                          {row.range}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* PULSE */}
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                ❤️ Pulse Rate Category
              </h3>

              <table className="w-full text-sm">
                <tbody>
                  {[
                    {
                      label: "Bradycardia",
                      range: "< 60 BPM",
                      color: "bg-yellow-50 text-yellow-700",
                      min: 0,
                      max: 59,
                    },
                    {
                      label: "Normal",
                      range: "60 – 100 BPM",
                      color: "bg-green-100 text-green-700",
                      min: 60,
                      max: 100,
                    },
                    {
                      label: "Tachycardia",
                      range: "> 100 BPM",
                      color: "bg-red-100 text-red-700",
                      min: 101,
                      max: 30000,
                    },
                  ].map((row, idx) => {
                    const active =
                      data.formData.pulse >= row.min &&
                      data.formData.pulse <= row.max;

                    return (
                      <tr key={idx} className={`${active ? row.color : ""}`}>
                        <td className="py-1 px-2">{row.label}</td>
                        <td className="py-1 px-2 text-right font-semibold">
                          {row.range}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ADA FBS */}
            <div className="bg-white border rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                🧪 Fasting Blood Sugar (ADA Official)
              </h3>

              <table className="w-full text-sm">
                <tbody>
                  {[
                    {
                      label: "Normal",
                      range: "< 140 mg/dL",
                      color: "bg-green-100 text-green-700",
                      min: 0,
                      max: 140,
                    },
                    {
                      label: "Prediabetes",
                      range: "141 – 199",
                      color: "bg-yellow-100 text-yellow-700",
                      min: 141,
                      max: 199,
                    },
                
                    {
                      label: "Diabetes Range",
                      range: "≥ 200",
                      color: "bg-red-100 text-red-700",
                      min: 200,
              
                      max: 999,
                    },
                  ].map((row, idx) => {
                    const active =
                      data.formData.fbs >= row.min &&
                      data.formData.fbs <= row.max;

                    return (
                      <tr key={idx} className={`${active ? row.color : ""}`}>
                        <td className="py-1 px-2">{row.label}</td>
                        <td className="py-1 px-2 text-right font-semibold">
                          {row.range}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* END */}
          <p className="text-xs text-gray-600 mt-6 italic">
            This summary shows all the medical standards used in your assessment
            with your category highlighted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap mt-5">
          {/* <button
            onClick={onBack}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg"
          >
            ← Back to Form
          </button> */}
          <button
            onClick={onRecalculate}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg"
          >
            🔄 Recalculate
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg"
          >
            🖨️ Print
          </button>
        </div>
      </div>
    </div>
  );
}

function FormRow({
  label,
  children,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 items-center py-2 ">
      <label className="text-gray-700 font-semibold text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="col-span-2">{children}</div>
    </div>
  );
}

// Yes/No Toggle (Default "NO")
function YesNoToggle({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <button
      type="button"
      tabIndex={0}
      onClick={() => onChange(value === "yes" ? "no" : "yes")}
      className={`w-20 text-center py-2 rounded font-semibold border outline-none focus:border-4 focus:border-black
        ${
          value === "yes" ? "bg-green-600 text-white" : "bg-red-600 text-white"
        }`}
    >
      {value === "yes" ? "YES" : "NO"}
    </button>
  );
}

export default function DiabetesRiskCalculator() {
  const [age, setAge] = useState("");
  const [bmiInput, setBmiInput] = useState("calculate");
  const [bmi, setBmi] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [heightCm, setHeightCm] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [waistUnit, setWaistUnit] = useState("inch");
  const [waistCm, setWaistCm] = useState("");
  const [waistInch, setWaistInch] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState("none");
  const [fruitVeg, setFruitVeg] = useState("no");
  const [bpMedication, setBpMedication] = useState("no");
  const [highBloodSugar, setHighBloodSugar] = useState("no");
  const [familyHistory, setFamilyHistory] = useState("none");
  const [fbs, setFbs] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");

  const validateForm = () => {
    const errors = [];
    if (!age || age.trim() === "") errors.push("Age is required");
    else if (parseInt(age) <= 0) errors.push("Age must be greater than 0");
    else if (parseInt(age) > 120) errors.push("Age cannot be greater than 120");

    if (bmiInput === "direct") {
      if (!bmi || bmi.trim() === "") errors.push("BMI is required");
      else if (parseFloat(bmi) <= 0) errors.push("BMI must be greater than 0");
    } else {
      if (heightUnit === "cm") {
        if (!heightCm || heightCm.trim() === "")
          errors.push("Height in cm is required");
        else if (parseFloat(heightCm) <= 0)
          errors.push("Height must be greater than 0");
      } else {
        if (heightFeet === "" || heightFeet === null)
          errors.push("Height in feet is required");
        if (heightInches === "" || heightInches === null)
          errors.push("Height in inches is required");
      }
      if (!weight || weight.trim() === "") errors.push("Weight is required");
      else if (parseFloat(weight) <= 0)
        errors.push("Weight must be greater than 0");
    }

    if (waistUnit === "cm") {
      if (!waistCm || waistCm.trim() === "")
        errors.push("Waist circumference is required");
      else if (parseFloat(waistCm) <= 0)
        errors.push("Waist must be greater than 0");
    } else {
      if (!waistInch || waistInch.trim() === "")
        errors.push("Waist circumference is required");
      else if (parseFloat(waistInch) <= 0)
        errors.push("Waist must be greater than 0");
    }

    if (physicalActivity === "none")
      errors.push("Please select your Physical Activity");

    if (familyHistory === "none")
      errors.push("Please select your family history");
    if (fbs === "" || fbs === null)
      errors.push("Fasting Blood Sugar is required");
    else if (parseFloat(fbs) < 0) errors.push("FBS cannot be negative");

    if (!systolic) errors.push("Systolic BP is required");
    if (!diastolic) errors.push("Diastolic BP is required");
    if (!pulse) errors.push("Pulse Rate is required");

    return errors;
  };

  const clearAllFields = () => {
    setAge("");
    setBmi("");
    setHeightCm("");
    setHeightFeet("");
    setHeightInches("");
    setWeight("");
    setWaistCm("");
    setWaistInch("");
    setFbs("");
    setBmiInput("calculate");
    setHeightUnit("cm");
    setWaistUnit("inch");
    setGender("male");
    setPhysicalActivity("none");
    setFruitVeg("yes");
    setBpMedication("no");
    setHighBloodSugar("no");
    setFamilyHistory("none");
    setSystolic("");
    setDiastolic("");
    setPulse("");
  };

  const handleCalculate = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      setShowErrorModal(true);
      return;
    }

    const ageValue = parseInt(age) || 0;
    const bmiValue = effectiveBMI || 0;
    const waistValue = getWaistInCm();

    const resultsData = {
      totalScore,
      breakdown: {
        age: getAgeScore(),
        bmi: getBMIScore(),
        waist: getWaistScore(),
        activity: getActivityScore(),
        fruitVeg: getFruitVegScore(),
        bpMed: getBPScore(),
        highSugar: getHighSugarScore(),
        family: getFamilyScore(),
        fbs: getFBSScore(),
      },
      risk: getRiskCategory(),
      formData: {
        age: ageValue,
        bmi: bmiValue,
        waist: waistValue,
        gender: gender,
        physicalActivity: physicalActivity,
        familyHistory: familyHistory,
        fbs: parseFloat(fbs) || 0,
        systolic: parseFloat(systolic) || 0,
        diastolic: parseFloat(diastolic) || 0,
        pulse: parseFloat(pulse) || 0,
      },
    };

    try {
      sessionStorage.setItem("diabetesResults", JSON.stringify(resultsData));
    } catch (e) {
      console.error("Failed to save to sessionStorage:", e);
    }

    const payload = {
      age: ageValue,
      height_cm: getHeightInCm(),
      weight_kg: parseFloat(weight) || 0,
      bmi: bmiValue,
      waist_cm: waistValue,
      sex_assigned_at_birth: gender,
      physical_activity: physicalActivity,
      daily_fruit_veg: fruitVeg === "yes",
      bp_medication: bpMedication === "yes",
      high_blood_sugar_history: highBloodSugar === "yes",
      family_history: familyHistory,
      fbs: parseFloat(fbs) || 0,

      systolic: parseFloat(systolic) || 0,
      diastolic: parseFloat(diastolic) || 0,
      pulse: parseFloat(pulse) || 0,
      total_score: totalScore,
      risk_category: getRiskCategory().level,
    };

    try {
      const API = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API}/api/save/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const saved = await response.json();
      console.log("Saved to backend:", saved);
    } catch (error) {
      console.error("Error saving record:", error);
    }

    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRecalculate = () => {
    clearAllFields();
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showResults) {
    let resultsData = null;
    try {
      const stored = sessionStorage.getItem("diabetesResults");
      resultsData = stored ? JSON.parse(stored) : null;
    } catch (e) {
      setShowResults(false);
      return null;
    }
    if (resultsData && resultsData.formData) {
      return (
        <ResultsPage
          data={resultsData}
          onBack={handleBack}
          onRecalculate={handleRecalculate}
        />
      );
    } else {
      setShowResults(false);
    }
  }

  const getHeightInCm = () => {
    if (heightUnit === "cm") return parseFloat(heightCm) || 0;
    const feet = parseFloat(heightFeet) || 0;
    const inches = parseFloat(heightInches) || 0;
    return (feet * 12 + inches) * 2.54;
  };

  const getWaistInCm = () => {
    if (waistUnit === "cm") return parseFloat(waistCm) || 0;
    return (parseFloat(waistInch) || 0) * 2.54;
  };

  const calculatedBMI = () => {
    const heightInCm = getHeightInCm();
    const weightNum = parseFloat(weight);
    if (heightInCm > 0 && weightNum > 0) {
      return parseFloat((weightNum / (heightInCm / 100) ** 2).toFixed(1));
    }
    return 0;
  };

  const effectiveBMI =
    bmiInput === "direct" ? parseFloat(bmi) || 0 : calculatedBMI();

  const getAgeScore = () => {
    const ageNum = parseInt(age);
    if (!ageNum) return 0;
    if (ageNum < 45) return 0;
    if (ageNum <= 54) return 2;
    if (ageNum <= 64) return 3;
    return 4;
  };

  const getBMIScore = () => {
    const bmiValue = effectiveBMI;
    if (!bmiValue || isNaN(bmiValue) || bmiValue === 0) return 0;
    if (bmiValue < 25) return 0;
    if (bmiValue < 30) return 1;
    return 3;
  };

  const getWaistScore = () => {
    const waistNum = getWaistInCm();
    if (!waistNum) return 0;
    if (gender === "male") {
      if (waistNum < 94) return 0;
      if (waistNum <= 102) return 3;
      return 4;
    } else {
      if (waistNum < 80) return 0;
      if (waistNum <= 88) return 3;
      return 4;
    }
  };

  const getActivityScore = () => {
    if (physicalActivity == "vigorous") return 0;
    if (physicalActivity == "moderate") return 0;
    if (physicalActivity == "mild") return 1;
    if (physicalActivity == "sedentary") return 2;
    return 0;
  };

  const getFruitVegScore = () => (fruitVeg === "no" ? 1 : 0);
  const getBPScore = () => (bpMedication === "yes" ? 2 : 0);
  const getHighSugarScore = () => (highBloodSugar === "yes" ? 5 : 0);
  const getFamilyScore = () => {
    if (familyHistory === "zero") return 0;
    if (familyHistory === "second") return 3;
    if (familyHistory === "first") return 5;
    return 0;
  };
  const getFBSScore = () => {
    const fbsNum = parseFloat(fbs);
    if (!fbsNum && fbsNum !== 0) return 0;
    if (fbsNum < 100) return 0;
    if (fbsNum < 110) return 2;
    if (fbsNum < 126) return 4;
    return 6;
  };

  const totalScore =
    getAgeScore() +
    getBMIScore() +
    getWaistScore() +
    getActivityScore() +
    getFruitVegScore() +
    getBPScore() +
    getHighSugarScore() +
    getFamilyScore() +
    getFBSScore();

  const getRiskCategory = () => {
    if (totalScore <= 7)
      return {
        level: "Low Risk",
        color: "bg-green-500",
        textColor: "text-green-600",
        bgColor: "bg-green-50",
        message: "Lifestyle advice only",
        icon: "🟢",
      };
    if (totalScore <= 14)
      return {
        level: "Moderate Risk",
        color: "bg-yellow-500",
        textColor: "text-yellow-600",
        bgColor: "bg-yellow-50",
        message: "Recomended Screening within 1 year",
        icon: "🟡",
      };
    if (totalScore <= 20)
      return {
        level: "High Risk",
        color: "bg-orange-500",
        textColor: "text-orange-600",
        bgColor: "bg-orange-50",
        message: "High probability of prediabetes",
        icon: "🟠",
      };
    return {
      level: "Very High Risk",
      color: "bg-red-500",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      message: "Strongly suggest Diagnostic testing",
      icon: "🔴",
    };
  };

  // Reusable Row Component (Left Label, Right Input)

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 flex justify-center">
      <div className="bg-white w-full max-w-3xl shadow-xl rounded-lg p-8 border">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Diabetes Risk Assessment Form
        </h1>

        {/* AGE */}
        <FormRow label="Age" required>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter age"
          />
        </FormRow>

        {/* GENDER */}
        <FormRow label="Gender" required>
          <div className="flex gap-3 ">
            <button
              onClick={() => setGender("male")}
              className={`px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-black ${
                gender === "male"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Male
            </button>

            <button
              onClick={() => setGender("female")}
              className={`px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-black ${
                gender === "female"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Female
            </button>
          </div>
        </FormRow>

        {/* HEIGHT + WEIGHT */}
        <FormRow label="Height & Weight" required>
          <div className="flex flex-col gap-2">
            {/* Unit Switch */}
            <div className="flex gap-2">
              <button
                onClick={() => setHeightUnit("cm")}
                className={`px-3 py-1 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  heightUnit === "cm" ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                cm
              </button>

              <button
                onClick={() => setHeightUnit("feet")}
                className={`px-3 py-1 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  heightUnit === "feet"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                ft/in
              </button>
            </div>

            {/* Height Inputs */}
            <div key={heightUnit}>
              {heightUnit === "cm" ? (
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black "
                  placeholder="Height (cm)"
                />
              ) : (
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    className="border rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Feet"
                  />
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    className="border rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Inches"
                  />
                </div>
              )}
            </div>

            {/* Weight */}
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Weight (kg)"
            />
          </div>
        </FormRow>

        {/* BMI */}
        <FormRow label="Body Mass Index (BMI) : ">
          <input
            value={effectiveBMI ? effectiveBMI.toFixed(1) : ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 "
            tabIndex={-1}
          />
        </FormRow>

        {/* WAIST */}
        <FormRow label="Waist" required>
          <div className="flex flex-col gap-2">
            {/* Unit Switch */}
            <div className="flex gap-2">
              <button
                onClick={() => setWaistUnit("inch")}
                className={`px-3 py-1 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  waistUnit === "inch"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                inch
              </button>
              <button
                onClick={() => setWaistUnit("cm")}
                className={`px-3 py-1 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  waistUnit === "cm" ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                cm
              </button>
            </div>

            {/* Inputs */}
            <div key={waistUnit}>
              {waistUnit === "cm" ? (
                <input
                  type="number"
                  value={waistCm}
                  onChange={(e) => setWaistCm(e.target.value)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Waist (cm)"
                />
              ) : (
                <input
                  type="number"
                  value={waistInch}
                  onChange={(e) => setWaistInch(e.target.value)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Waist (inch)"
                />
              )}
            </div>
          </div>
        </FormRow>

        {/* FRUITS */}
        <FormRow label="Fruits / Vegetables">
          <YesNoToggle value={fruitVeg} onChange={setFruitVeg} />
        </FormRow>

        {/* BP MEDICATION */}
        <FormRow label="BP Medication">
          <YesNoToggle value={bpMedication} onChange={setBpMedication} />
        </FormRow>

        {/* HIGH SUGAR */}
        <FormRow label="High Blood Sugar Before">
          <YesNoToggle value={highBloodSugar} onChange={setHighBloodSugar} />
        </FormRow>

        {/* ACTIVITY */}
        <FormRow label="Physical Activity" required>
          <select
            value={physicalActivity}
            onChange={(e) => setPhysicalActivity(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="none">Select</option>
            <option value="vigorous">Vigorous exercise / strenuous work</option>
            <option value="moderate">Moderate exercise at work/home</option>
            <option value="mild">Mild exercise at work/home</option>
            <option value="sedentary">No exercise / sedentary lifestyle</option>
          </select>
        </FormRow>
        {/* FAMILY HISTORY */}
        <FormRow label="Family History" required>
          <select
            value={familyHistory}
            onChange={(e) => setFamilyHistory(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="none">Select</option>
            <option value="zero">No family history</option>
            <option value="first">Parent/Sibling (1st degree)</option>
            <option value="second">Grandparents/Aunt (2nd degree)</option>
          </select>
        </FormRow>

        {/* BLOOD PRESSURE */}
        <FormRow label="Blood Pressure" required>
          <div className="flex gap-2">
            <input
              type="number"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Systolic (mmHg)"
            />
            <input
              type="number"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Diastolic (mmHg)"
            />
          </div>
        </FormRow>

        {/* PULSE RATE */}
        <FormRow label="Pulse Rate" required>
          <input
            type="number"
            value={pulse}
            onChange={(e) => setPulse(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Beats per minute (BPM)"
          />
        </FormRow>

        {/* FBS */}
        <FormRow label="Fasting Blood Sugar" required>
          <input
            type="number"
            value={fbs}
            onChange={(e) => setFbs(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="mg/dL"
          />
        </FormRow>

        {/* BUTTON */}
        <div className="text-center mt-6">
          <button
            onClick={handleCalculate}
            className="
      px-6 py-3 
      bg-blue-600 
      text-white 
      font-bold 
      rounded-lg 
      shadow 
      cursor-pointer
      transition-all duration-300 
      hover:bg-blue-700 
      hover:shadow-xl 
      hover:-translate-y-1 
      active:scale-95
    "
          >
            Calculate Risk
          </button>
        </div>

        {/* Keep your modal intact */}
        {showErrorModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowErrorModal(false)}
          >
            <div
              className="bg-white w-full max-w-md rounded-xl shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-lg font-bold text-gray-800">
                    Required Fields
                  </h2>
                </div>
                <button onClick={() => setShowErrorModal(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Error List */}
              <div className="max-h-56 overflow-y-auto mb-4">
                <ul className="space-y-2">
                  {validationErrors.map((err, index) => (
                    <li
                      key={index}
                      className="text-sm bg-red-50 p-2 border border-red-200 rounded text-red-700"
                    >
                      • {err}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowErrorModal(false)}
                className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
