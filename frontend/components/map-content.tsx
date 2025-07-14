"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, RefreshCw, Truck, Plane, BarChart3, AlertTriangle } from "lucide-react"
import { LoadingAnimation } from "@/components/loading-animation"
import { GoogleMaps } from "@/components/google-maps"
import { AutocompleteInput } from "@/components/autocomplete-input"

const cityItems: { [key: string]: string[] } = {
  Mumbai: ["Phones", "Speakers", "Electronics", "Fashion"],
  "New Delhi": ["Books", "Clothing", "Jewelry", "Home Decor"],
  Pune: ["Auto Parts", "Software", "Food Items", "Medicines"],
  Bangalore: ["Tech Gadgets", "Coffee", "Flowers", "Documents"],
  Kolkata: ["Sweets", "Books", "Handicrafts", "Textiles"],
  Hyderabad: ["Spices", "Pearls", "IT Equipment", "Pharmaceuticals"],
  Lucknow: ["Chikankari", "Perfumes", "Handicrafts", "Food"],
  Agra: ["Leather Goods", "Marble Items", "Sweets", "Handicrafts"],
  Meerut: ["Sports Goods", "Scissors", "Musical Instruments", "Textiles"],
  Noida: ["Electronics", "Software", "Auto Parts", "Fashion"],
  Ghaziabad: ["Industrial Goods", "Food Items", "Textiles", "Electronics"],
  Bhopal: ["Snacks", "Handicrafts", "Textiles", "Medicines"],
  Guwahati: ["Garlands", "Tea", "Silk", "Handicrafts"],
}

const droneSpecs: {
  [key: string]: { maxLoad: string; elevation: string; range: string; ordersPerTrip: number; batteryLife: string }
} = {
  "Zipline Platform 1": { maxLoad: "1.8kg", elevation: "150m", range: "80km", ordersPerTrip: 1, batteryLife: "45min" },
  "Zipline Platform 2": { maxLoad: "2.5kg", elevation: "200m", range: "120km", ordersPerTrip: 2, batteryLife: "60min" },
  "Wing (Alphabet Inc.)": {
    maxLoad: "1.5kg",
    elevation: "120m",
    range: "20km",
    ordersPerTrip: 1,
    batteryLife: "30min",
  },
  "Matternet M2": { maxLoad: "2kg", elevation: "100m", range: "20km", ordersPerTrip: 1, batteryLife: "35min" },
  "Amazon Prime Air MK30": {
    maxLoad: "2.3kg",
    elevation: "120m",
    range: "24km",
    ordersPerTrip: 2,
    batteryLife: "40min",
  },
  "Wingcopter 198": { maxLoad: "6kg", elevation: "300m", range: "120km", ordersPerTrip: 4, batteryLife: "90min" },
  Flytrex: { maxLoad: "2.5kg", elevation: "150m", range: "6km", ordersPerTrip: 2, batteryLife: "25min" },
  "Swoop Aero Kite™": { maxLoad: "3kg", elevation: "200m", range: "70km", ordersPerTrip: 3, batteryLife: "55min" },
  Manna: { maxLoad: "2kg", elevation: "100m", range: "3km", ordersPerTrip: 1, batteryLife: "20min" },
  "UPS Flight Forward": { maxLoad: "2.3kg", elevation: "120m", range: "32km", ordersPerTrip: 2, batteryLife: "45min" },
}

export function MapContent() {
  const [warehouse, setWarehouse] = useState("")
  const [destination, setDestination] = useState("")
  const [routeAnalysis, setRouteAnalysis] = useState<any>(null)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("dashboardData")
    if (data) {
      setDashboardData(JSON.parse(data))
    }
  }, [])

  const generatePotentialOrders = (items: string[], maxOrders: number): any[] => {
    const orders = []
    for (let i = 0; i < Math.min(maxOrders, items.length); i++) {
      orders.push({
        item: items[i],
        weight: (Math.random() * 2 + 0.5).toFixed(1) + "kg",
        priority: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)],
        estimatedValue: "₹" + (Math.random() * 5000 + 500).toFixed(0),
      })
    }
    return orders
  }

  const analyzeRoute = async () => {
    if (!warehouse || !destination) return
    setIsAnalyzing(true)
    setRouteAnalysis(null) // Clear previous analysis while loading

    try {
      const response = await fetch("/api/route-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          warehouse,
          destination,
          parameters: dashboardData, // Pass all dashboard parameters
        }),
      })

      const data = await response.json()
      if (data.success) {
        const selectedCity = dashboardData?.cities?.[0] || "Mumbai"
        const droneTypeFromAPI = data.analysis.droneType || "Zipline Platform 1" // Use droneType from API or default
        const specs = droneSpecs[droneTypeFromAPI] || droneSpecs["Zipline Platform 1"] // Fallback to default specs
        const items = cityItems[selectedCity]

        setRouteAnalysis({
          ...data.analysis,
          droneType: droneTypeFromAPI, // Ensure droneType is always present
          droneSpecs: specs,
          potentialItems: items,
          potentialOrders: generatePotentialOrders(items, specs.ordersPerTrip),
          city: selectedCity,
        })
      } else {
        console.error("API analysis failed:", data.message)
        // If API fails, set a generic error state for the analysis card
        setRouteAnalysis({
          feasible: false,
          deliveryMode: "error", // Indicate an error state
          distance: "N/A",
          estimatedTime: "N/A",
          profitability: "N/A",
          riskLevel: "N/A",
          isNoFlyZone: false, // Not a no-fly zone, but an error
          averageDroneHeight: null,
          droneType: null,
          potentialItems: [],
          potentialOrders: [],
          city: dashboardData?.cities?.[0] || "N/A",
          errorMessage: data.message || "Failed to get route analysis from server.",
        })
      }
    } catch (error) {
      console.error("Error during route analysis API call:", error)
      setRouteAnalysis({
        feasible: false,
        deliveryMode: "error",
        distance: "N/A",
        estimatedTime: "N/A",
        profitability: "N/A",
        riskLevel: "N/A",
        isNoFlyZone: false,
        averageDroneHeight: null,
        droneType: null,
        potentialItems: [],
        potentialOrders: [],
        city: dashboardData?.cities?.[0] || "N/A",
        errorMessage: "Network error or server unreachable.",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetForm = () => {
    setWarehouse("")
    setDestination("")
    setRouteAnalysis(null)
  }

  return (
    <>
      <LoadingAnimation isLoading={isAnalyzing} onComplete={() => {}} />{" "}
      {/* onComplete is handled by analyzeRoute now */}
      <div className="h-full flex flex-col lg:flex-row gap-6">
        {/* Left Panel */}
        <div className="w-full lg:w-80 flex flex-col space-y-4">
          {/* Route Input Card */}
          <Card className="border-2 border-blue-100 shadow-xl cool-shadow">
            <CardHeader className="bg-gradient-to-r from-[#0071ce] to-[#004c91] text-white rounded-t-lg p-4">
              <CardTitle className="flex items-center text-lg font-syabil">
                <Navigation className="mr-2 h-5 w-5" />
                Route Planning
              </CardTitle>
              <CardDescription className="text-blue-100 text-sm font-syabil">
                Enter warehouse and destination locations
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <Label htmlFor="warehouse" className="text-base font-syabil mb-2 block">
                  Warehouse Location
                </Label>
                <AutocompleteInput
                  value={warehouse}
                  onChange={setWarehouse}
                  placeholder="Enter warehouse address"
                  className="h-10 text-sm font-syabil"
                  selectedCities={dashboardData?.cities || []}
                />
              </div>
              <div>
                <Label htmlFor="destination" className="text-base font-syabil mb-2 block">
                  Destination
                </Label>
                <AutocompleteInput
                  value={destination}
                  onChange={setDestination}
                  placeholder="Enter delivery address"
                  className="h-10 text-sm font-syabil"
                  selectedCities={dashboardData?.cities || []}
                />
              </div>
              <Button
                onClick={analyzeRoute}
                className="w-full walmart-gradient text-white h-10 font-syabil text-sm"
                disabled={!warehouse || !destination}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Analyze Route
              </Button>
              <Button
                variant="outline"
                className="w-full h-10 font-syabil border-[#0071ce] text-[#0071ce] hover:bg-blue-50 bg-transparent text-sm"
                onClick={resetForm}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {routeAnalysis && (
            <Card
              className={`border-2 shadow-xl cool-shadow ${routeAnalysis.isNoFlyZone || routeAnalysis.deliveryMode === "error" ? "border-red-200" : "border-green-100"}`}
            >
              <CardHeader
                className={`text-white rounded-t-lg p-4 ${routeAnalysis.isNoFlyZone || routeAnalysis.deliveryMode === "error" ? "bg-gradient-to-r from-red-600 to-red-700" : "bg-gradient-to-r from-green-600 to-green-700"}`}
              >
                <CardTitle className="text-lg font-syabil flex items-center">
                  {(routeAnalysis.isNoFlyZone || routeAnalysis.deliveryMode === "error") && (
                    <AlertTriangle className="mr-2 h-5 w-5" />
                  )}
                  Route Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {routeAnalysis.deliveryMode === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center text-red-800 mb-2">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span className="font-syabil text-sm">ANALYSIS ERROR</span>
                    </div>
                    <p className="text-red-700 text-xs font-syabil">{routeAnalysis.errorMessage}</p>
                  </div>
                )}

                {routeAnalysis.isNoFlyZone && routeAnalysis.deliveryMode !== "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center text-red-800 mb-2">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span className="font-syabil text-sm">NO-FLY ZONE DETECTED</span>
                    </div>
                    <p className="text-red-700 text-xs font-syabil">
                      Drone delivery not permitted. Bike delivery route shown instead.
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm font-syabil">Feasibility:</span>
                  <Badge variant={routeAnalysis.feasible ? "default" : "destructive"} className="text-xs font-syabil">
                    {routeAnalysis.feasible ? "Feasible" : "Not Feasible"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-syabil">Delivery Method:</span>
                  <div className="flex items-center">
                    {routeAnalysis.deliveryMode === "bike-only" ? (
                      <Badge className="bg-red-100 text-red-800 font-syabil text-xs">
                        <Truck className="mr-1 h-3 w-3" />
                        Bike Only
                      </Badge>
                    ) : routeAnalysis.deliveryMode === "drone-only" ? (
                      <Badge className="bg-blue-100 text-blue-800 font-syabil text-xs">
                        <Plane className="mr-1 h-3 w-3" />
                        Drone Only
                      </Badge>
                    ) : routeAnalysis.deliveryMode === "mixed" ? (
                      <div className="flex space-x-1">
                        <Badge className="bg-blue-100 text-blue-800 font-syabil text-xs">
                          <Plane className="mr-1 h-3 w-3" />
                          Drone
                        </Badge>
                        <Badge className="bg-red-100 text-red-800 font-syabil text-xs">
                          <Truck className="mr-1 h-3 w-3" />
                          Bike
                        </Badge>
                      </div>
                    ) : (
                      <Badge variant="secondary" className="text-xs font-syabil">
                        N/A
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-syabil">Distance:</span>
                  <span className="text-sm font-syabil">{routeAnalysis.distance} km</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-syabil">Est. Time:</span>
                  <span className="text-sm font-syabil">{routeAnalysis.estimatedTime} min</span>
                </div>

                {routeAnalysis.deliveryMode !== "bike-only" && routeAnalysis.deliveryMode !== "error" && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-syabil">Drone Type:</span>
                      <span className="text-xs font-syabil">{routeAnalysis.droneType}</span>
                    </div>

                    {routeAnalysis.averageDroneHeight && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-syabil">Avg. Drone Height:</span>
                        <span className="text-xs font-syabil">{routeAnalysis.averageDroneHeight}</span>
                      </div>
                    )}

                    <div className="space-y-2 border-t pt-2">
                      <div className="text-xs font-syabil text-gray-600">Drone Specifications:</div>
                      <div className="text-xs font-syabil">Max Load: {routeAnalysis.droneSpecs?.maxLoad}</div>
                      <div className="text-xs font-syabil">Max Elevation: {routeAnalysis.droneSpecs?.elevation}</div>
                      <div className="text-xs font-syabil">Range: {routeAnalysis.droneSpecs?.range}</div>
                      <div className="text-xs font-syabil">Orders/Trip: {routeAnalysis.droneSpecs?.ordersPerTrip}</div>
                      <div className="text-xs font-syabil">Battery Life: {routeAnalysis.droneSpecs?.batteryLife}</div>
                    </div>

                    <div className="space-y-2 border-t pt-2">
                      <div className="text-xs font-syabil text-gray-600">Potential Orders:</div>
                      {routeAnalysis.potentialOrders?.map((order: any, index: number) => (
                        <div key={index} className="bg-gray-50 rounded p-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-syabil">{order.item}</span>
                            <Badge variant="outline" className="text-xs">
                              {order.priority}
                            </Badge>
                          </div>
                          <div className="text-gray-600 font-syabil mt-1">
                            {order.weight} • {order.estimatedValue}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="space-y-2 border-t pt-2">
                  <div className="text-xs font-syabil text-gray-600">Available Items ({routeAnalysis.city}):</div>
                  <div className="flex flex-wrap gap-1">
                    {routeAnalysis.potentialItems?.map((item: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs font-syabil">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-syabil">Profitability:</span>
                  <Badge
                    variant={routeAnalysis.profitability === "Profitable" ? "default" : "secondary"}
                    className="font-syabil text-xs"
                  >
                    {routeAnalysis.profitability}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-syabil">Risk Level:</span>
                  <Badge
                    variant={
                      routeAnalysis.riskLevel === "Low"
                        ? "default"
                        : routeAnalysis.riskLevel === "Medium"
                          ? "secondary"
                          : "destructive"
                    }
                    className="font-syabil text-xs"
                  >
                    {routeAnalysis.riskLevel}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dashboard Parameters Summary */}
          {dashboardData && (
            <Card className="border-2 border-gray-200 shadow-xl cool-shadow">
              <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-t-lg p-4">
                <CardTitle className="flex items-center text-base font-syabil">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analysis Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2 text-sm font-syabil">
                <div>
                  <span className="font-syabil">City:</span> {dashboardData.cities?.[0]}
                </div>
                <div>
                  <span className="font-syabil">Population:</span> {dashboardData.population} Lakh
                </div>
                <div>
                  <span className="font-syabil">Elevation:</span> {dashboardData.elevation}m
                </div>
                <div>
                  <span className="font-syabil">Weather:</span> {dashboardData.weather}
                </div>
                <div>
                  <span className="font-syabil">Drone:</span> {dashboardData.droneType}
                </div>
                <div>
                  <span className="font-syabil">Payload:</span> {dashboardData.payload} kg
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Panel - Map */}
        <div className="flex-1 min-h-96">
          <Card className="h-full border-2 border-blue-100 shadow-xl cool-shadow">
            <CardContent className="p-0 h-full">
              <GoogleMaps
                selectedCities={dashboardData?.cities || []}
                warehouse={warehouse}
                destination={destination}
                routeAnalysis={routeAnalysis}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
