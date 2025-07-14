"use client"

// Hardcoded route analysis logic
export function analyzeRoute(city: string, warehouse: string, destination: string) {
  const warehouseLower = warehouse.toLowerCase()
  const destinationLower = destination.toLowerCase()

  // Mumbai No-Fly Zones
  if (city === "Mumbai") {
    const isNoFlyZone =
      (warehouseLower.includes("powai") && destinationLower.includes("santacruz east")) ||
      (warehouseLower.includes("bandra east") && destinationLower.includes("trombay"))

    if (isNoFlyZone) {
      return {
        feasible: true,
        droneOnly: false,
        isNoFlyZone: true,
        distance: (Math.random() * 15 + 8).toFixed(1), // 8-23 km for no-fly zones
        estimatedTime: (Math.random() * 25 + 20).toFixed(0), // 20-45 min
        profitability: "Break-even",
        riskLevel: "High",
        deliveryMethod: "Bike",
        pathColor: "red",
        droneAltitude: null,
      }
    }
  }

  // Bangalore No-Fly Zones
  if (city === "Bangalore") {
    const isNoFlyZone =
      (warehouseLower.includes("jayanagar") && destinationLower.includes("electronic city")) ||
      (warehouseLower.includes("yelanka") && destinationLower.includes("jokur"))

    if (isNoFlyZone) {
      return {
        feasible: true,
        droneOnly: false,
        isNoFlyZone: true,
        distance: (Math.random() * 12 + 10).toFixed(1), // 10-22 km for no-fly zones
        estimatedTime: (Math.random() * 20 + 25).toFixed(0), // 25-45 min
        profitability: "Break-even",
        riskLevel: "High",
        deliveryMethod: "Bike",
        pathColor: "red",
        droneAltitude: null,
      }
    }
  }

  // All other routes - Drone delivery allowed
  const distance = Number.parseFloat((Math.random() * 20 + 2).toFixed(1)) // 2-22 km
  const isLongDistance = distance > 5

  const elevations: { [key: string]: number } = {
    Mumbai: 14,
    "New Delhi": 216,
    Pune: 560,
    Bangalore: 920,
    Kolkata: 9,
    Hyderabad: 542,
    Lucknow: 123,
    Agra: 171,
    Meerut: 237,
    Noida: 201,
    Ghaziabad: 214,
  }

  const groundElevation = elevations[city] || 100
  const droneAltitude = groundElevation + 150

  return {
    feasible: true,
    droneOnly: true,
    isNoFlyZone: false,
    distance: distance.toFixed(1),
    estimatedTime: (Math.random() * 20 + 10).toFixed(0),
    profitability: isLongDistance ? "Break-even" : "Profitable",
    riskLevel: "Low",
    deliveryMethod: "Drone",
    pathColor: "blue",
    droneAltitude: droneAltitude,
  }
}
