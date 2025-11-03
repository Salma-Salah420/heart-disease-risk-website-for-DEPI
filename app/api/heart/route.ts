import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // In production, this would use a trained ML model
    let riskScore = 0

    // BMI risk factor
    const bmi = Number.parseFloat(formData.bmi)
    if (bmi >= 30) riskScore += 3
    else if (bmi >= 25) riskScore += 1

    // Smoking risk factor
    if (formData.smoker === "yes") riskScore += 4

    // Alcohol consumption
    if (formData.alcoholDrinker === "yes") riskScore += 1

    // Stroke history
    if (formData.stroke === "yes") riskScore += 5

    // Physical health (inverse - low days = low risk)
    const physicalHealth = Number.parseInt(formData.physicalHealth)
    if (physicalHealth >= 7) riskScore += 2

    // Mental health (inverse)
    const mentalHealth = Number.parseInt(formData.mentalHealth)
    if (mentalHealth >= 7) riskScore += 1

    // Difficulty walking
    if (formData.difficultyWalking === "yes") riskScore += 3

    // Age risk factor
    const ageGroup = formData.ageCategory
    if (ageGroup === "65+") riskScore += 4
    else if (ageGroup === "55-64") riskScore += 3
    else if (ageGroup === "45-54") riskScore += 2

    // Diabetes
    if (formData.diabetic === "yes") riskScore += 3

    // Physical activity (inverse - no activity = higher risk)
    if (formData.physicalActivity === "no") riskScore += 2

    // General health
    if (formData.generalHealth === "poor") riskScore += 3
    else if (formData.generalHealth === "fair") riskScore += 2

    // Sleep time
    const sleepTime = Number.parseFloat(formData.sleepTime)
    if (sleepTime < 6 || sleepTime > 8) riskScore += 1

    // Other conditions
    if (formData.asthma === "yes") riskScore += 1
    if (formData.kidneyDisease === "yes") riskScore += 3
    if (formData.skinCancer === "yes") riskScore += 1

    // Determine risk level
    const risk = riskScore >= 15 ? "high" : "low"

    let resultMessage = ""
    if (risk === "low") {
      resultMessage = `Your risk score is ${riskScore}. Based on the assessment, you have a low risk of heart disease. Continue maintaining your healthy lifestyle and regular check-ups with your healthcare provider.`
    } else {
      resultMessage = `Your risk score is ${riskScore}. Based on the assessment, you have a high risk of heart disease. We strongly recommend consulting with a cardiologist for a comprehensive evaluation and personalized prevention plan.`
    }

    return NextResponse.json({ result: resultMessage, risk })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      { result: "An error occurred while processing your request.", risk: "high" },
      { status: 500 },
    )
  }
}
