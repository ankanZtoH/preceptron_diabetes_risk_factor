"use client";
import React, { useState, useEffect } from 'react';
import { Heart, Activity, Scale, Ruler, Pill, Users, Droplet, AlertCircle, X } from 'lucide-react';

// Results Page Component with IDRS Comparison
function ResultsPage({
  data,
  onBack,
  onRecalculate,
}: {
  data: any;                 // or replace `any` with correct fields
  onBack: () => void;
  onRecalculate: () => void;
}) {
  const [idrsScore, setIdrsScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Calculate IDRS score
  useEffect(() => {
    calculateIDRS();
  }, []);

  const calculateIDRS = () => {
    // IDRS (Indian Diabetes Risk Score) calculation - OFFICIAL SCORING
    if (!data || !data.formData) {
      setIdrsScore(0);
      setLoading(false);
      return;
    }
    
    const { formData } = data;
    let score = 0;

    // Ensure all values are valid numbers
    const age = Number(formData.age) || 0;
    const waist = Number(formData.waist) || 0;
    
    // Age scoring (IDRS Official)
    if (age < 35) score += 0;
    else if (age >= 35 && age < 50) score += 20;
    else if (age >= 50) score += 30;
    
    // Abdominal obesity - Waist circumference (IDRS Official)
    if (formData.gender === 'male') {
      if (waist < 90) score += 0;
      else if (waist >= 90 && waist < 100) score += 10;
      else if (waist >= 100) score += 20;
    } else {
      if (waist < 80) score += 0;
      else if (waist >= 80 && waist < 90) score += 10;
      else if (waist >= 90) score += 20;
    }

    // Physical activity (IDRS Official)
    if (formData.physicalActivity === 'yes') {
      score += 0;
    } else {
      score += 30;
    }

    // Family history (IDRS Official)
    if (formData.familyHistory === 'zero') score += 0;
    else if (formData.familyHistory === 'second') score += 10;
    else if (formData.familyHistory === 'first') score += 20;

    setTimeout(() => {
      setIdrsScore(score);
      setLoading(false);
    }, 500);
  };

  const getIDRSRisk = (score:any) => {
    if (score < 30) return { level: 'Low Risk', color: 'bg-green-500', bgColor: 'bg-green-50', textColor: 'text-green-600', icon: '🟢' };
    if (score < 50) return { level: 'Moderate Risk', color: 'bg-yellow-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600', icon: '🟡' };
    if (score < 70) return { level: 'High Risk', color: 'bg-orange-500', bgColor: 'bg-orange-50', textColor: 'text-orange-600', icon: '🟠' };
    return { level: 'Very High Risk', color: 'bg-red-500', bgColor: 'bg-red-50', textColor: 'text-red-600', icon: '🔴' };
  };

  const idrsRisk = idrsScore !== null ? getIDRSRisk(idrsScore) : { level: 'Calculating...', color: 'bg-gray-500', bgColor: 'bg-gray-50', textColor: 'text-gray-600', icon: '⚪' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl shadow-2xl p-5 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mr-3">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Your Diabetes Risk Assessment</h1>
                <p className="text-white/90 text-sm">Comprehensive analysis with multiple screening tools</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-lg transition-all"
            >
              ← Back to Form
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* ADA + FINDRISC Results */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-xl p-5 border-t-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">ADA + FINDRISC</h2>
                  <p className="text-xs text-gray-500">International Standard</p>
                </div>
              </div>

              {/* Score Display */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 mb-4">
                <p className="text-gray-300 text-sm mb-2">Total Score</p>
                <div className="text-5xl font-bold text-white mb-2">{data.totalScore || 0}</div>
                <p className="text-gray-400 text-sm">out of 34 points</p>
                <div className="mt-4 bg-white/10 rounded-lg p-2">
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500"
                      style={{ width: `${((data.totalScore || 0) / 34) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Risk Category */}
              <div className={`${data.risk?.bgColor || 'bg-gray-50'} rounded-xl p-4 border-2 ${(data.risk?.color || 'bg-gray-500').replace('bg-', 'border-')} mb-4`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">{data.risk?.icon || '⚪'}</div>
                  <h3 className={`text-2xl font-bold ${data.risk?.textColor || 'text-gray-600'} mb-1`}>{data.risk?.level || 'Unknown'}</h3>
                  <p className="text-sm text-gray-700">{data.risk?.message || 'Unable to determine risk'}</p>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-3 text-sm">Score Breakdown:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Age</span><span className="font-bold">{data.breakdown?.age || 0}</span></div>
                  <div className="flex justify-between"><span>BMI</span><span className="font-bold">{data.breakdown?.bmi || 0}</span></div>
                  <div className="flex justify-between"><span>Waist</span><span className="font-bold">{data.breakdown?.waist || 0}</span></div>
                  <div className="flex justify-between"><span>Activity</span><span className="font-bold">{data.breakdown?.activity || 0}</span></div>
                  <div className="flex justify-between"><span>Diet</span><span className="font-bold">{data.breakdown?.fruitVeg || 0}</span></div>
                  <div className="flex justify-between"><span>BP Med</span><span className="font-bold">{data.breakdown?.bpMed || 0}</span></div>
                  <div className="flex justify-between"><span>High Sugar History</span><span className="font-bold">{data.breakdown?.highSugar || 0}</span></div>
                  <div className="flex justify-between"><span>Family History</span><span className="font-bold">{data.breakdown?.family || 0}</span></div>
                  <div className="flex justify-between pt-2 border-t-2 border-blue-200"><span className="text-blue-600 font-bold">FBS (ADA)</span><span className="font-bold text-blue-600">{data.breakdown?.fbs || 0}</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* IDRS Results */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-xl p-5 border-t-4 border-orange-500">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-2 rounded-lg mr-3">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">IDRS</h2>
                  <p className="text-xs text-gray-500">Indian Diabetes Risk Score</p>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 mb-4">
                    <p className="text-orange-100 text-sm mb-2">IDRS Score</p>
                    <div className="text-5xl font-bold text-white mb-2">{idrsScore}</div>
                    <p className="text-orange-200 text-sm">out of 100 points</p>
                    <div className="mt-4 bg-white/10 rounded-lg p-2">
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500"
                          style={{ width: `${idrsScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`${idrsRisk.bgColor} rounded-xl p-4 border-2 ${idrsRisk.color.replace('bg-', 'border-')} mb-4`}>
                    <div className="text-center">
                      <div className="text-4xl mb-2">{idrsRisk.icon}</div>
                      <h3 className={`text-2xl font-bold ${idrsRisk.textColor} mb-1`}>{idrsRisk.level}</h3>
                      <p className="text-sm text-gray-700">Based on Indian population data</p>
                    </div>
                  </div>

                  {data && data.formData && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-bold text-gray-800 mb-3 text-sm">Your IDRS Breakdown:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Age ({data.formData.age || 0} years)</span>
                          <span className="font-bold">
                            {(data.formData.age || 0) < 35 ? '0' : (data.formData.age || 0) < 50 ? '20' : '30'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Waist ({data.formData.waist || 0} cm)</span>
                          <span className="font-bold">
                            {data.formData.gender === 'male' 
                              ? ((data.formData.waist || 0) < 90 ? '0' : (data.formData.waist || 0) < 100 ? '10' : '20')
                              : ((data.formData.waist || 0) < 80 ? '0' : (data.formData.waist || 0) < 90 ? '10' : '20')
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Physical Activity</span>
                          <span className="font-bold">
                            {data.formData.physicalActivity === 'yes' ? '0' : '30'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Family History</span>
                          <span className="font-bold">
                            {data.formData.familyHistory === 'zero' ? '0' : data.formData.familyHistory === 'second' ? '10' : '20'}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-3 italic">
                        * Physical activity mapped: Yes=Vigorous(0), No=Sedentary(30)
                      </p>
                    </div>
                  )}

                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-2 text-sm">IDRS Scoring (Official):</h4>
                    <div className="space-y-2 text-xs text-gray-700">
                      <div>
                        <p className="font-semibold mb-1">Age:</p>
                        <p>&lt;35 years: 0 | 35-49: 20 | ≥50: 30</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Waist Circumference:</p>
                        <p>Male: &lt;90=0, 90-99=10, ≥100=20</p>
                        <p>Female: &lt;80=0, 80-89=10, ≥90=20</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Physical Activity:</p>
                        <p>Vigorous: 0 | Moderate: 10</p>
                        <p>Mild: 20 | Sedentary: 30</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Family History:</p>
                        <p>No diabetes: 0</p>
                        <p>One parent: 10 | Both: 20</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-orange-200">
                      <p className="text-xs text-gray-700 leading-relaxed mb-2">
                        <strong>Note:</strong> IDRS was developed and validated specifically for Asian populations.
                      </p>
                      <p className="font-semibold text-xs text-gray-800 mb-1">Risk Categories:</p>
                      <div className="space-y-0.5 text-xs text-gray-600">
                        <p>🟢 <strong>&lt;30:</strong> Low risk</p>
                        <p>🟡 <strong>30-49:</strong> Moderate risk</p>
                        <p>🟠 <strong>50-69:</strong> High risk</p>
                        <p>🔴 <strong>≥70:</strong> Very high risk</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Comparison Insights */}
        <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-2 rounded-lg mr-3">
              <AlertCircle className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Comparison Insights</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-2">ADA + FINDRISC Strengths:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Includes Fasting Blood Sugar (FBS)</li>
                <li>• Includes dietary factors (fruit/veg intake)</li>
                <li>• Accounts for BP medication history</li>
                <li>• More comprehensive (9 factors total)</li>
                <li>• Internationally validated across populations</li>
              </ul>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-bold text-orange-800 mb-2">IDRS Strengths:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Designed for Indian/Asian populations</li>
                <li>• Lower waist circumference thresholds</li>
                <li>• More detailed physical activity levels</li>
                <li>• Simpler to calculate (4 factors only)</li>
                <li>• No blood test required</li>
                <li>• Validated on large Indian cohorts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className={`${data.risk?.bgColor || 'bg-gray-50'} border-l-4 ${(data.risk?.color || 'bg-gray-500').replace('bg-', 'border-')} rounded-xl p-6 shadow-xl mb-6`}>
          <h3 className={`font-bold text-xl ${data.risk?.textColor || 'text-gray-600'} mb-4 flex items-center`}>
            <span className="text-2xl mr-2">💡</span>
            Recommended Actions
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Immediate Steps:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {(data.totalScore || 0) <= 14 ? (
                  <>
                    <li className="flex items-start"><span className="mr-2">✓</span>Continue healthy lifestyle</li>
                    <li className="flex items-start"><span className="mr-2">✓</span>Annual health checkups</li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start"><span className="mr-2">🔴</span>Schedule diagnostic testing</li>
                    <li className="flex items-start"><span className="mr-2">🔴</span>Consult healthcare provider</li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Long-term Goals:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start"><span className="mr-2">→</span>30 min daily exercise</li>
                <li className="flex items-start"><span className="mr-2">→</span>Maintain healthy weight (BMI &lt;25)</li>
                <li className="flex items-start"><span className="mr-2">→</span>Balanced diet with fruits/vegetables</li>
                <li className="flex items-start"><span className="mr-2">→</span>Regular blood sugar monitoring</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-5 shadow-lg mb-6">
          <h4 className="font-bold text-amber-800 mb-2 text-sm flex items-center">
            <span className="text-lg mr-2">⚠️</span>
            Medical Disclaimer
          </h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            These screening tools are for <strong>risk assessment purposes only</strong> and do not constitute medical diagnosis. Both scores should be interpreted in consultation with a qualified healthcare provider.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={onBack}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-lg"
          >
            ← Back to Form
          </button>
          <button
            onClick={onRecalculate}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-lg"
          >
            🔄 Recalculate (Clear All)
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-lg"
          >
            🖨️ Print Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DiabetesRiskCalculator() {
  // Form state
  const [age, setAge] = useState('');
  const [bmiInput, setBmiInput] = useState('direct');
  const [bmi, setBmi] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [heightCm, setHeightCm] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [waist, setWaist] = useState('');
  const [physicalActivity, setPhysicalActivity] = useState('yes');
  const [fruitVeg, setFruitVeg] = useState('yes');
  const [bpMedication, setBpMedication] = useState('no');
  const [highBloodSugar, setHighBloodSugar] = useState('no');
  const [familyHistory, setFamilyHistory] = useState('none');
  const [fbs, setFbs] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);


  const [showErrorModal, setShowErrorModal] = useState(false);

  // Form validation
  const validateForm = () => {
    const errors = [];

    // Check age
    if (!age || age.trim() === '') {
      errors.push('Age is required');
    } else if (parseInt(age) <= 0) {
      errors.push('Age must be greater than 0');
    } else if (parseInt(age) > 120) {
      errors.push('Age cannot be greater than 120');
    }

    // Check BMI or height/weight
    if (bmiInput === 'direct') {
      if (!bmi || bmi.trim() === '') {
        errors.push('BMI is required');
      } else if (parseFloat(bmi) <= 0) {
        errors.push('BMI must be greater than 0');
      }
    } else {
      if (heightUnit === 'cm') {
        if (!heightCm || heightCm.trim() === '') {
          errors.push('Height in cm is required');
        } else if (parseFloat(heightCm) <= 0) {
          errors.push('Height must be greater than 0');
        }
      } else {
        if (heightFeet === '' || heightFeet === null) {
          errors.push('Height in feet is required');
        } else if (parseFloat(heightFeet) < 0) {
          errors.push('Height in feet cannot be negative');
        }
        if (heightInches === '' || heightInches === null) {
          errors.push('Height in inches is required');
        } else if (parseFloat(heightInches) < 0) {
          errors.push('Height in inches cannot be negative');
        }
      }
      if (!weight || weight.trim() === '') {
        errors.push('Weight is required');
      } else if (parseFloat(weight) <= 0) {
        errors.push('Weight must be greater than 0');
      }
    }

    // Check waist
    if (!waist || waist.trim() === '') {
      errors.push('Waist circumference is required');
    } else if (parseFloat(waist) <= 0) {
      errors.push('Waist circumference must be greater than 0');
    }

    // Check family history
    if (familyHistory === 'none') {
      errors.push('Please select your family history of diabetes');
    }

    // Check FBS
    if (fbs === '' || fbs === null) {
      errors.push('Fasting Blood Sugar (FBS) is required');
    } else if (parseFloat(fbs) < 0) {
      errors.push('Fasting Blood Sugar cannot be negative');
    }

    return errors;
  };

  // Clear all form fields
  const clearAllFields = () => {
    setAge('');
    setBmi('');
    setHeightCm('');
    setHeightFeet('');
    setHeightInches('');
    setWeight('');
    setWaist('');
    setFbs('');
    setBmiInput('direct');
    setHeightUnit('cm');
    setGender('male');
    setPhysicalActivity('yes');
    setFruitVeg('yes');
    setBpMedication('no');
    setHighBloodSugar('no');
    setFamilyHistory('none');
  };

  // Handle calculate
 const handleCalculate = async () => {
  // Validate form
  const errors = validateForm();
  if (errors.length > 0) {
    setValidationErrors(errors);
    setShowErrorModal(true);
    return;
  }

  // Prepare values
  const ageValue = parseInt(age) || 0;
  const bmiValue = effectiveBMI || 0;
  const waistValue = parseFloat(waist) || 0;

  // Prepare resultsData for showing in UI
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
      fbs: getFBSScore()
    },
    risk: getRiskCategory(),
    formData: {
      age: ageValue,
      bmi: bmiValue,
      waist: waistValue,
      gender: gender,
      physicalActivity: physicalActivity,
      familyHistory: familyHistory
    }
  };

  // Save to session storage (still needed for results page)
  try {
    sessionStorage.setItem('diabetesResults', JSON.stringify(resultsData));
  } catch (e) {
    console.error('Failed to save to sessionStorage:', e);
  }

  // ------------------------------------------
  // 🔥 SEND DATA TO DJANGO BACKEND
  // ------------------------------------------
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
    risk_category: getRiskCategory().level
  };

  try {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API}/api/save/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const saved = await response.json();
    console.log("Saved to backend:", saved);
  } catch (error) {
    console.error("Error saving record:", error);
  }

  // Finally show results
  setShowResults(true);

  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 100);
};

  // Handle recalculate - clears all fields
  const handleRecalculate = () => {
    clearAllFields();
    setShowResults(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Handle back - keeps fields
  const handleBack = () => {
    setShowResults(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Render results page if showResults is true
  if (showResults) {
    let resultsData = null;
    try {
      const stored = sessionStorage.getItem('diabetesResults');
      resultsData = stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('Failed to parse sessionStorage:', e);
      setShowResults(false);
      return null;
    }
    
    if (resultsData && resultsData.formData) {
      return <ResultsPage data={resultsData} onBack={handleBack} onRecalculate={handleRecalculate} />;
    } else {
      setShowResults(false);
    }
  }

  // Convert feet/inches to cm
  const getHeightInCm = () => {
    if (heightUnit === 'cm') {
      return parseFloat(heightCm) || 0;
    } else {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      const totalInches = (feet * 12) + inches;
      return totalInches * 2.54;
    }
  };

  // Calculate BMI from height and weight
  const calculatedBMI = () => {
    const heightInCm = getHeightInCm();
    const weightNum = parseFloat(weight);
    if (heightInCm > 0 && weightNum > 0) {
      return parseFloat((weightNum / ((heightInCm / 100) ** 2)).toFixed(1));
    }
    return 0;
  };

  const effectiveBMI = bmiInput === 'direct' ? parseFloat(bmi) || 0 : calculatedBMI();

  // Calculate individual scores
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
    const waistNum = parseFloat(waist);
    if (!waistNum) return 0;
    if (gender === 'male') {
      if (waistNum < 94) return 0;
      if (waistNum <= 102) return 3;
      return 4;
    } else {
      if (waistNum < 80) return 0;
      if (waistNum <= 88) return 3;
      return 4;
    }
  };

  const getActivityScore = () => physicalActivity === 'no' ? 2 : 0;
  const getFruitVegScore = () => fruitVeg === 'no' ? 1 : 0;
  const getBPScore = () => bpMedication === 'yes' ? 2 : 0;
  const getHighSugarScore = () => highBloodSugar === 'yes' ? 5 : 0;

  const getFamilyScore = () => {
    if (familyHistory === 'zero') return 0;
    if (familyHistory === 'second') return 3;
    if (familyHistory === 'first') return 5;
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

  // Calculate total score
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

  // Get risk category
  const getRiskCategory = () => {
    if (totalScore <= 7) return { level: 'Low Risk', color: 'bg-green-500', textColor: 'text-green-600', bgColor: 'bg-green-50', message: 'Lifestyle advice only', icon: '🟢' };
    if (totalScore <= 14) return { level: 'Moderate Risk', color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50', message: 'Recommend screening within 1 year', icon: '🟡' };
    if (totalScore <= 20) return { level: 'High Risk', color: 'bg-orange-500', textColor: 'text-orange-600', bgColor: 'bg-orange-50', message: 'High probability of prediabetes', icon: '🟠' };
    return { level: 'Very High Risk', color: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-50', message: 'Strongly suggest diagnostic testing', icon: '🔴' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl shadow-2xl p-6 mb-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mr-3">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Diabetes Risk Calculator
              </h1>
            </div>
            <p className="text-center text-white/90 text-lg mb-3">
              ADA + FINDRISC Hybrid Risk Assessment
            </p>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-3 max-w-xl mx-auto">
              <p className="text-xs text-white text-center">
                ✓ Clinically validated screening tool | ✓ Takes only 3 minutes
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-5">
          <div className='absolute top-10 right-10'>
                




          </div>
          {/* Main Form */}
          <div className="space-y-6">
            
            {/* Section 1: Age */}
            <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg mr-3 shadow-lg">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Age</h2>
                  <p className="text-xs text-gray-500">Risk increases with age</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  How old are you? <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-all"
                  placeholder="Enter your age"
                  min="0"
                  max="120"
                />
                {parseInt(age) > 120 && (
                  <div className="mt-2 p-2 text-red rounded-lg">
                    <p className="text-xs text-red-600 font-bold">
                      Age can't be greater than 120
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: BMI */}
            <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg mr-3 shadow-lg">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Body Mass Index (BMI)</h2>
                  <p className="text-xs text-gray-500">Key indicator of body weight</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setBmiInput('direct')}
                    className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] ${
                      bmiInput === 'direct'
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Enter BMI
                  </button>
                  <button
                    onClick={() => setBmiInput('calculate')}
                    className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] ${
                      bmiInput === 'calculate'
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Calculate
                  </button>
                </div>
              </div>

              {bmiInput === 'direct' ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    BMI Value <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={bmi}
                    onChange={(e) => setBmi(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 transition-all"
                    placeholder="e.g., 24.5"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Height Unit</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setHeightUnit('cm')}
                        className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] ${
                          heightUnit === 'cm'
                            ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        cm
                      </button>
                      <button
                        onClick={() => setHeightUnit('feet')}
                        className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] ${
                          heightUnit === 'feet'
                            ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Feet
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {heightUnit === 'cm' ? (
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Height (cm) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={heightCm}
                          onChange={(e) => setHeightCm(e.target.value)}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 transition-all"
                          placeholder="e.g., 170"
                        />
                      </div>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Feet <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={heightFeet}
                            onChange={(e) => setHeightFeet(e.target.value)}
                            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 transition-all"
                            placeholder="e.g., 5"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Inches <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={heightInches}
                            onChange={(e) => setHeightInches(e.target.value)}
                            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 transition-all"
                            placeholder="e.g., 8"
                            min="0"
                            max="11"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Weight (kg) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 transition-all"
                      placeholder="e.g., 70"
                    />
                  </div>
                </div>
              )}
              
              {bmiInput === 'calculate' && (
                <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                  <p className="text-sm font-semibold text-purple-800">
                    Your BMI: {effectiveBMI && effectiveBMI > 0 && !isNaN(effectiveBMI) ? effectiveBMI.toFixed(1) : '0'}
                  </p>
                </div>
              )}
            </div>

            {/* Section 3: Waist Circumference */}
            <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-2 rounded-lg mr-3 shadow-lg">
                  <Ruler className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Waist Circumference</h2>
                  <p className="text-xs text-gray-500">Strong predictor</p>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setGender('male')}
                    className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] ${
                      gender === 'male'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] ${
                      gender === 'female'
                        ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Waist (cm) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-pink-500 transition-all"
                  placeholder={gender === 'male' ? 'e.g., 90' : 'e.g., 75'}
                />
                <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">
                    {gender === 'male' ? '🟢 <94  |  🟡 94-102  |  🔴 ≥102' : '🟢 <80  |  🟡 80-88  |  🔴 ≥88'}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4: Lifestyle Factors */}
            <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg mr-3 shadow-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Lifestyle Factors</h2>
                  <p className="text-xs text-gray-500">Daily habits matter</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🏃‍♂️ 30 min physical activity daily?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPhysicalActivity('yes')}
                      className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] ${
                        physicalActivity === 'yes'
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setPhysicalActivity('no')}
                      className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] ${
                        physicalActivity === 'no'
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🥗 Fruits/vegetables daily?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setFruitVeg('yes')}
                      className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] ${
                        fruitVeg === 'yes'
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setFruitVeg('no')}
                      className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] ${
                        fruitVeg === 'no'
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Medical History */}
            <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg mr-3 shadow-lg">
                  <Pill className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Medical History</h2>
                  <p className="text-xs text-gray-500">Past health conditions</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    💊 BP medication?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setBpMedication('yes')}
                      className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] ${
                        bpMedication === 'yes'
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setBpMedication('no')}
                      className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] ${
                        bpMedication === 'no'
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📊 High blood sugar before?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setHighBloodSugar('yes')}
                      className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] ${
                        highBloodSugar === 'yes'
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setHighBloodSugar('no')}
                      className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] ${
                        highBloodSugar === 'no'
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Family History */}
            <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-2 rounded-lg mr-3 shadow-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Family History</h2>
                  <p className="text-xs text-gray-500">Genetic factors</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  👨‍👩‍👧‍👦 Diabetes in family? <span className="text-red-500">*</span>
                </label>
                <select
                  value={familyHistory}
                  onChange={(e) => setFamilyHistory(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-indigo-500 transition-all bg-white"
                > 
                  <option value="none" className='text-gray-700'>Select an option</option>
                  <option value="zero">No family history</option>
                  <option value="second">Grandparent/aunt/uncle (2nd degree)</option>
                  <option value="first">Parent/sibling (1st degree)</option>
                </select>
              </div>
            </div>

            {/* Section 7: Fasting Blood Sugar (ADA Component) */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow border-2 border-blue-300">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg mr-3 shadow-lg">
                  <Droplet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Fasting Blood Sugar</h2>
                  <p className="text-xs text-blue-600 font-semibold">⭐ ADA Component</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🩸 FBS (mg/dL) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={fbs}
                  onChange={(e) => setFbs(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-blue-300 rounded-lg focus:border-blue-500 transition-all"
                  placeholder="e.g., 95"
                />
                <div className="mt-2 p-3 bg-white/70 rounded-lg border border-blue-200">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Reference:</p>
                  <div className="space-y-0.5 text-xs text-gray-600">
                    <p>🟢 Normal: &lt;100</p>
                    <p>🟡 Mild: 100-109</p>
                    <p>🟠 High: 110-125</p>
                    <p>🔴 Diabetes: ≥126</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Calculate Risk Button */}
          <div className="relative border-blue-500 rounded-xl shadow-xl p-1">
            <div className="bg-white rounded-lg p-4">
              <button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all transform hover:scale-[1.02] shadow-lg"
              >
                🎯 Calculate My Risk Score
              </button>
              <p className="text-center text-gray-500 text-xs mt-2">
                Click to see your comprehensive risk assessment
              </p>
            </div>
          </div>

        </div>

        {/* Error Modal */}
        {showErrorModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setShowErrorModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slideIn" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-full mr-3">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Required Fields Missing</h3>
                </div>
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-600 mb-4">Please complete the following fields before calculating your risk:</p>
              <div className="max-h-60 overflow-y-auto mb-6">
                <ul className="space-y-2">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700 bg-red-50 p-2 rounded-lg">
                      <span className="text-red-500 mr-2 mt-0.5">•</span>
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setShowErrorModal(false)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Got it, I'll complete the form
              </button>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto mt-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg p-4 shadow-lg">
            <h4 className="font-bold text-amber-800 mb-2 text-sm flex items-center">
              <span className="text-lg mr-2">⚠️</span>
              Important Disclaimer
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed">
              This tool is for <strong>screening purposes only</strong> and does not replace professional medical advice. Please consult your doctor for proper evaluation.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center pb-8">
          <div className="inline-block bg-white rounded-xl shadow-lg px-6 py-4">
            <p className="text-gray-600 font-semibold text-sm mb-1">
              📋 Based on FINDRISC and ADA guidelines
            </p>
            <p className="text-gray-400 text-xs">
              © 2025 Diabetes Risk Assessment Tool
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}