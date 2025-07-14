import { type NextRequest, NextResponse } from "next/server"

const droneTypes = [
  { name: "Zipline Platform 1", image: "🚁" },
  { name: "Zipline Platform 2", image: "🛸" },
  { name: "Wing (Alphabet Inc.)", image: "✈️" },
  { name: "Matternet M2", image: "🚁" },
  { name: "Amazon Prime Air MK30", image: "🛸" },
  { name: "Wingcopter 198", image: "✈️" },
  { name: "Flytrex", image: "🚁" },
  { name: "Swoop Aero Kite™", image: "🛸" },
  { name: "Manna", image: "✈️" },
  { name: "UPS Flight Forward", image: "🚁" },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { warehouse, destination, parameters } = body

    const selectedCity = parameters.cities?.[0]?.toLowerCase() || ""
    const warehouseLower = warehouse.toLowerCase()
    const destinationLower = destination.toLowerCase()

    let analysis: any = {}

    // Generate new distance values as requested
    const airDistanceKm = Math.floor(Math.random() * (9 - 7 + 1)) + 7 // Random integer between 7 and 9 km
    const roadDistanceKm = (Math.random() * (26 - 16) + 16).toFixed(1) // Random number between 16 and 26 km

    let profitabilityStatus = "N/A"
    const randomDroneType = droneTypes[Math.floor(Math.random() * droneTypes.length)].name
    const randomElevation = (Math.random() * 100 + 400).toFixed(0) + "m" // 400-500m

    // Hardcoded No-Fly Zone Logic
    if (selectedCity === "mumbai") {
      if (
        (warehouseLower.includes("powai") && destinationLower.includes("santacruz east")) ||
        (warehouseLower.includes("santacruz east") && destinationLower.includes("powai")) ||
        (warehouseLower.includes("bandra east") && destinationLower.includes("trombay")) ||
        (warehouseLower.includes("trombay") && destinationLower.includes("bandra east"))
      ) {
        profitabilityStatus = "Loss"
        analysis = {
          feasible: false,
          deliveryMode: "bike-only", // Bike only
          estimatedTime: (Math.random() * 15 + 5).toFixed(0),
          profitability: profitabilityStatus,
          riskLevel: "High",
          isNoFlyZone: true,
          averageDroneHeight: null, // No drone
          droneType: null, // No drone
          airDistanceKm: airDistanceKm,
          roadDistanceKm: roadDistanceKm,
        }
      } else {
        // Mumbai - Drone allowed for other permutations
        const distanceDifference = Math.abs(Number.parseFloat(roadDistanceKm) - airDistanceKm)
        if (distanceDifference < 8) {
          profitabilityStatus = "Break-even"
        } else {
          profitabilityStatus = "Profitable"
        }
        analysis = {
          feasible: true,
          deliveryMode: Math.random() > 0.5 ? "mixed" : "drone-only", // 50% chance for mixed
          estimatedTime: (Math.random() * 25 + 10).toFixed(0),
          profitability: profitabilityStatus,
          riskLevel: "Low",
          isNoFlyZone: false,
          averageDroneHeight: randomElevation,
          droneType: randomDroneType,
          airDistanceKm: airDistanceKm,
          roadDistanceKm: roadDistanceKm,
        }
      }
    } else if (selectedCity === "bangalore") {
      if (
        (warehouseLower.includes("jayanagar") && destinationLower.includes("electronic city")) ||
        (warehouseLower.includes("electronic city") && destinationLower.includes("jayanagar")) ||
        (warehouseLower.includes("yelanka") && destinationLower.includes("jokur")) ||
        (warehouseLower.includes("jokur") && destinationLower.includes("yelanka"))
      ) {
        profitabilityStatus = "Loss"
        analysis = {
          feasible: false,
          deliveryMode: "bike-only", // Bike only
          estimatedTime: (Math.random() * 15 + 5).toFixed(0),
          profitability: profitabilityStatus,
          riskLevel: "High",
          isNoFlyZone: true,
          averageDroneHeight: null,
          droneType: null,
          airDistanceKm: airDistanceKm,
          roadDistanceKm: roadDistanceKm,
        }
      } else {
        // Bangalore - Drone allowed for other permutations
        const distanceDifference = Math.abs(Number.parseFloat(roadDistanceKm) - airDistanceKm)
        if (distanceDifference < 8) {
          profitabilityStatus = "Break-even"
        } else {
          profitabilityStatus = "Profitable"
        }
        analysis = {
          feasible: true,
          deliveryMode: Math.random() > 0.5 ? "mixed" : "drone-only", // 50% chance for mixed
          estimatedTime: (Math.random() * 25 + 10).toFixed(0),
          profitability: profitabilityStatus,
          riskLevel: "Low",
          isNoFlyZone: false,
          averageDroneHeight: randomElevation,
          droneType: randomDroneType,
          airDistanceKm: airDistanceKm,
          roadDistanceKm: roadDistanceKm,
        }
      }
    } else {
      // Default logic for other cities or unhandled permutations
      const distanceDifference = Math.abs(Number.parseFloat(roadDistanceKm) - airDistanceKm)
      if (distanceDifference < 8) {
        profitabilityStatus = "Break-even"
      } else {
        profitabilityStatus = "Profitable"
      }

      const isMixedDelivery = Math.random() > 0.5 // 50% chance for mixed
      analysis = {
        feasible: Math.random() > 0.2, // Still some chance of not feasible
        deliveryMode: isMixedDelivery ? "mixed" : parameters.weather === "Rainy" ? "bike-only" : "drone-only", // Prioritize bike if rainy
        estimatedTime: (Math.random() * 30 + 10).toFixed(0),
        profitability: profitabilityStatus,
        riskLevel: assessRisk(parameters),
        isNoFlyZone: parameters.weather === "Rainy", // Consider rainy as a soft no-fly for drones
        averageDroneHeight: randomElevation,
        droneType: randomDroneType,
        airDistanceKm: airDistanceKm,
        roadDistanceKm: roadDistanceKm,
      }
      // If deliveryMode is bike-only due to rain, override feasible and profitability
      if (analysis.deliveryMode === "bike-only" && analysis.isNoFlyZone) {
        analysis.feasible = false
        analysis.profitability = "Loss"
        analysis.riskLevel = "High"
        analysis.averageDroneHeight = null
        analysis.droneType = null
      }
    }

    return NextResponse.json({ success: true, analysis })
  } catch (error) {
    console.error("Route analysis API error:", error)
    return NextResponse.json({ success: false, message: "Analysis failed" }, { status: 500 })
  }
}

function assessRisk(parameters: any) {
  const riskFactors = [
    parameters.weather === "Rainy" || parameters.weather === "Windy",
    parameters.payload > 10,
    parameters.noFlyZones?.length > 50,
  ]
  const riskScore = riskFactors.filter(Boolean).length

  if (riskScore >= 2) return "High"
  if (riskScore >= 1) return "Medium"
  return "Low"
}
