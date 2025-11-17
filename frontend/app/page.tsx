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
  const [loading, setLoading] = useState(true);

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

    if (formData.physicalActivity === "yes") {
      score += 0;
    } else {
      score += 30;
    }

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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* 1. BMI */}
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
            <div className="flex items-center mb-3">
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
              <h3 className="font-bold text-gray-800">BMI</h3>
            </div>

            <div
              className={`text-4xl font-bold mb-2 ${
                bmi < 18
                  ? "text-blue-600"
                  : bmi < 23
                  ? "text-green-600"
                  : bmi < 25
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {bmi.toFixed(1)}
            </div>

            <p
              className={`text-xs font-semibold ${
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
          </div>

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
    className={`text-sm font-semibold ${
      data.formData.fbs < 140
        ? "text-green-600"
        : data.formData.fbs < 200
        ? "text-yellow-600"
        : "text-red-600"
    }`}
  >
    {data.formData.fbs < 140
      ? "🟢 Normal — Glucose regulation is normal."
      : data.formData.fbs < 200
      ? "🟡 Prediabetes Risk — Early metabolic disturbances."
      : "🔴 Diabetes Range — Strong suspicion of diabetes."}
  </p>
</div>


          {/* 3. Risk Factor */}
        {/* 3. Risk Factor with points + category */}
<div
  className={`
    ${data.risk?.bgColor || "bg-gray-50"} 
    rounded-xl shadow-lg p-5 border-t-4
    ${(data.risk?.color || "bg-gray-500").replace("bg-", "border-")}
  `}
>
  <div className="flex items-center mb-3">
    <AlertCircle
      className={`w-5 h-5 mr-2 ${data.risk?.textColor || "text-gray-600"}`}
    />
    <h3 className="font-bold text-gray-800">Risk Level</h3>
  </div>

  <div
    className={`text-2xl font-bold mb-1 ${
      data.risk?.textColor || "text-gray-600"
    }`}
  >
    {data.risk?.icon || "⚪"} {data.risk?.level}
  </div>

  <p className="text-md font-semibold">
    <span className={`${data.risk?.textColor || "text-gray-600"}`}>
      ({data.totalScore} points)
    </span>
  </p>

  <p className="text-xs text-gray-600 mt-1">
    {data.risk?.message || "N/A"}
  </p>
</div>


          {/* 4. IDRS Score */}
<div
  className={`
    rounded-xl shadow-lg p-5 border-t-4
    ${(idrsRisk.color || "bg-gray-500").replace("bg-", "border-")}
    ${idrsRisk.bgColor || "bg-gray-50"}
  `}
>
  <div className="flex items-center mb-3">
    <Users className={`w-5 h-5 mr-2 ${idrsRisk.textColor}`} />
    <h3 className="font-bold text-gray-800">IDRS</h3>
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
      <div className={`text-4xl font-bold mb-1 ${idrsRisk.textColor}`}>
        {idrsScore}
      </div>

      <p className={`text-sm font-semibold ${idrsRisk.textColor}`}>
        {idrsRisk.icon} {idrsRisk.level}
      </p>
    </>
  )}
</div>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={onBack}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg"
          >
            ← Back to Form
          </button>
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
          value === "yes"
            ? "bg-green-600 text-white"
            : "bg-red-600 text-white"
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
  const [waistUnit, setWaistUnit] = useState("cm");
  const [waistCm, setWaistCm] = useState("");
  const [waistInch, setWaistInch] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState("yes");
  const [fruitVeg, setFruitVeg] = useState("no");
  const [bpMedication, setBpMedication] = useState("no");
  const [highBloodSugar, setHighBloodSugar] = useState("no");
  const [familyHistory, setFamilyHistory] = useState("none");
  const [fbs, setFbs] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showErrorModal, setShowErrorModal] = useState(false);

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

    if (familyHistory === "none")
      errors.push("Please select your family history");
    if (fbs === "" || fbs === null)
      errors.push("Fasting Blood Sugar is required");
    else if (parseFloat(fbs) < 0) errors.push("FBS cannot be negative");

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
    setWaistUnit("cm");
    setGender("male");
    setPhysicalActivity("yes");
    setFruitVeg("yes");
    setBpMedication("no");
    setHighBloodSugar("no");
    setFamilyHistory("none");
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
      physical_activity: physicalActivity === "yes",
      daily_fruit_veg: fruitVeg === "yes",
      bp_medication: bpMedication === "yes",
      high_blood_sugar_history: highBloodSugar === "yes",
      family_history: familyHistory,
      fbs: parseFloat(fbs) || 0,
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

  const getActivityScore = () => (physicalActivity === "no" ? 2 : 0);
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
        message: "Screening within 1 year",
        icon: "🟡",
      };
    if (totalScore <= 20)
      return {
        level: "High Risk",
        color: "bg-orange-500",
        textColor: "text-orange-600",
        bgColor: "bg-orange-50",
        message: "High probability",
        icon: "🟠",
      };
    return {
      level: "Very High Risk",
      color: "bg-red-500",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      message: "Diagnostic testing",
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
                heightUnit === "feet" ? "bg-blue-500 text-white" : "bg-gray-100"
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
          className="w-full border rounded px-3 py-2 bg-gray-100"
        />
      </FormRow>

      {/* WAIST */}
      <FormRow label="Waist" required>
        <div className="flex flex-col gap-2">

          {/* Unit Switch */}
          <div className="flex gap-2">
            <button
              onClick={() => setWaistUnit("cm")}
              className={`px-3 py-1 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                waistUnit === "cm" ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              cm
            </button>

            <button
              onClick={() => setWaistUnit("inch")}
              className={`px-3 py-1 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                waistUnit === "inch" ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              inch
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

      {/* ACTIVITY */}
      <FormRow label="Daily Activity">
        <YesNoToggle
          value={physicalActivity}
          onChange={setPhysicalActivity}
        />
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
        <YesNoToggle
          value={highBloodSugar}
          onChange={setHighBloodSugar}
        />
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
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow"
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
          <h2 className="text-lg font-bold text-gray-800">Required Fields</h2>
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
