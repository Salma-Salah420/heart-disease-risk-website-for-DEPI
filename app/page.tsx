"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, Heart } from "lucide-react"

export default function HeartDiseaseRiskDetection() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ result: string; risk: "low" | "high" } | null>(null)
  const [formData, setFormData] = useState({
    bmi: "",
    smoker: "",
    alcoholDrinker: "",
    stroke: "",
    physicalHealth: "",
    mentalHealth: "",
    difficultyWalking: "",
    sex: "",
    ageCategory: "",
    race: "",
    diabetic: "",
    physicalActivity: "",
    generalHealth: "",
    sleepTime: "",
    asthma: "",
    kidneyDisease: "",
    skinCancer: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/heart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error:", error)
      setResult({ result: "An error occurred. Please try again.", risk: "high" })
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = Object.values(formData).every((val) => val !== "")

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Heart Disease Risk Assessment</h1>
          </div>
          <p className="text-gray-600 text-lg">Get your personalized heart disease risk evaluation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Card */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg pb-6">
                <CardTitle className="text-2xl mb-2">Patient Information Form</CardTitle>
                <CardDescription className="text-blue-100 text-base leading-relaxed">
                  Please provide your complete health information below for an accurate risk assessment.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: BMI and Smoking */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">BMI</label>
                      <input
                        type="number"
                        name="bmi"
                        value={formData.bmi}
                        onChange={handleInputChange}
                        placeholder="e.g., 25.5"
                        step="0.1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Smoker</label>
                      <select
                        name="smoker"
                        value={formData.smoker}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Alcohol and Stroke */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Alcohol Drinker</label>
                      <select
                        name="alcoholDrinker"
                        value={formData.alcoholDrinker}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">History of Stroke</label>
                      <select
                        name="stroke"
                        value={formData.stroke}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Health Ratings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Physical Health (1-10 days)
                      </label>
                      <input
                        type="number"
                        name="physicalHealth"
                        value={formData.physicalHealth}
                        onChange={handleInputChange}
                        min="1"
                        max="10"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Mental Health (1-10 days)</label>
                      <input
                        type="number"
                        name="mentalHealth"
                        value={formData.mentalHealth}
                        onChange={handleInputChange}
                        min="1"
                        max="10"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 4: Mobility and Demographics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Difficulty Walking/Climbing
                      </label>
                      <select
                        name="difficultyWalking"
                        value={formData.difficultyWalking}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Sex</label>
                      <select
                        name="sex"
                        value={formData.sex}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Age and Race */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Age Category</label>
                      <select
                        name="ageCategory"
                        value={formData.ageCategory}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="18-24">18-24</option>
                        <option value="25-34">25-34</option>
                        <option value="35-44">35-44</option>
                        <option value="45-54">45-54</option>
                        <option value="55-64">55-64</option>
                        <option value="65+">65+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Race</label>
                      <select
                        name="race"
                        value={formData.race}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="white">White</option>
                        <option value="black">Black</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 6: Diabetes and Physical Activity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Diabetic</label>
                      <select
                        name="diabetic"
                        value={formData.diabetic}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Physical Activity</label>
                      <select
                        name="physicalActivity"
                        value={formData.physicalActivity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 7: General Health and Sleep */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">General Health</label>
                      <select
                        name="generalHealth"
                        value={formData.generalHealth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="very-good">Very Good</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Sleep Time (hours)</label>
                      <input
                        type="number"
                        name="sleepTime"
                        value={formData.sleepTime}
                        onChange={handleInputChange}
                        min="0"
                        max="24"
                        step="0.5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 8: Conditions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Asthma</label>
                      <select
                        name="asthma"
                        value={formData.asthma}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Kidney Disease</label>
                      <select
                        name="kidneyDisease"
                        value={formData.kidneyDisease}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Skin Cancer</label>
                      <select
                        name="skinCancer"
                        value={formData.skinCancer}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={!isFormValid || loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                    >
                      {loading ? "Analyzing..." : "Get Risk Assessment"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Result Card */}
        {result && (
          <Card
            className={`shadow-lg border-0 mt-8 ${result.risk === "low" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                {result.risk === "low" ? (
                  <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                )}
                <div>
                  <h3 className={`text-xl font-bold ${result.risk === "low" ? "text-green-900" : "text-red-900"}`}>
                    {result.risk === "low" ? "Low Risk" : "High Risk"}
                  </h3>
                  <p className={`mt-2 text-base ${result.risk === "low" ? "text-green-800" : "text-red-800"}`}>
                    {result.result}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>This assessment is for informational purposes only and should not replace professional medical advice.</p>
        </div>
      </div>
    </main>
  )
}
