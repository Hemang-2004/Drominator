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
    const simulatedDistance = (Math.random() * 17 + 9).toFixed(1) // Simulate distance from 9 to 26 km
    const isProfitable = Number.parseFloat(simulatedDistance) < 5 ? "Profitable" : "Break-even"
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
        analysis = {
          feasible: false,
          deliveryMode: "bike-only", // Bike only
          distance: simulatedDistance,
          estimatedTime: (Math.random() * 15 + 5).toFixed(0),
          profitability: "Loss", // No drones, so loss
          riskLevel: "High",
          isNoFlyZone: true,
          averageDroneHeight: null, // No drone
          droneType: null, // No drone
        }
      } else {
        // Mumbai - Drone allowed for other permutations
        const isMixedDelivery = Math.random() > 0.5 // 50% chance for mixed
        analysis = {
          feasible: true,
          deliveryMode: isMixedDelivery ? "mixed" : "drone-only",
          distance: simulatedDistance,
          estimatedTime: (Math.random() * 25 + 10).toFixed(0),
          profitability: isProfitable,
          riskLevel: "Low",
          isNoFlyZone: false,
          averageDroneHeight: randomElevation,
          droneType: randomDroneType,
        }
      }
    } else if (selectedCity === "bangalore") {
      if (
        (warehouseLower.includes("jayanagar") && destinationLower.includes("electronic city")) ||
        (warehouseLower.includes("electronic city") && destinationLower.includes("jayanagar")) ||
        (warehouseLower.includes("yelanka") && destinationLower.includes("jokur")) ||
        (warehouseLower.includes("jokur") && destinationLower.includes("yelanka"))
      ) {
        analysis = {
          feasible: false,
          deliveryMode: "bike-only", // Bike only
          distance: simulatedDistance,
          estimatedTime: (Math.random() * 15 + 5).toFixed(0),
          profitability: "Loss",
          riskLevel: "High",
          isNoFlyZone: true,
          averageDroneHeight: null,
          droneType: null,
        }
      } else {
        // Bangalore - Drone allowed for other permutations
        const isMixedDelivery = Math.random() > 0.5 // 50% chance for mixed
        analysis = {
          feasible: true,
          deliveryMode: isMixedDelivery ? "mixed" : "drone-only",
          distance: simulatedDistance,
          estimatedTime: (Math.random() * 25 + 10).toFixed(0),
          profitability: isProfitable,
          riskLevel: "Low",
          isNoFlyZone: false,
          averageDroneHeight: randomElevation,
          droneType: randomDroneType,
        }
      }
    } else {
      // Default logic for other cities or unhandled permutations
      const isMixedDelivery = Math.random() > 0.5 // 50% chance for mixed
      analysis = {
        feasible: Math.random() > 0.2, // Still some chance of not feasible
        deliveryMode: isMixedDelivery ? "mixed" : parameters.weather === "Rainy" ? "bike-only" : "drone-only", // Prioritize bike if rainy
        distance: simulatedDistance,
        estimatedTime: (Math.random() * 30 + 10).toFixed(0),
        profitability: isProfitable,
        riskLevel: assessRisk(parameters),
        isNoFlyZone: parameters.weather === "Rainy", // Consider rainy as a soft no-fly for drones
        averageDroneHeight: randomElevation,
        droneType: randomDroneType,
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
