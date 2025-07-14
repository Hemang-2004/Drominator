"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Calculator, MapPin, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

const cities = [
  "Mumbai",
  "New Delhi",
  "Pune",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
  "Lucknow",
  "Agra",
  "Meerut",
  "Noida",
  "Ghaziabad",
  "Bhopal",
  "Guwahati",
]

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

const weatherConditions = [
  { name: "Sunny", emoji: "☀️" },
  { name: "Cloudy", emoji: "☁️" },
  { name: "Rainy", emoji: "⛈️" },
  { name: "Windy", emoji: "💨" },
  { name: "Foggy", emoji: "🌫️" },
  { name: "Cold", emoji: "❄️" },
]

export function DashboardContent() {
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [population, setPopulation] = useState([50])
  const [literacy, setLiteracy] = useState([75])
  const [elevation, setElevation] = useState([100])
  const [orderingFrequency, setOrderingFrequency] = useState("")
  const [weather, setWeather] = useState("")
  const [droneType, setDroneType] = useState("")
  const [payload, setPayload] = useState("")
  const [noFlyZones, setNoFlyZones] = useState("")
  const router = useRouter()

  const handleCalculate = () => {
    const formData = {
      cities: [selectedCity], // Single city array for compatibility
      population: population[0],
      literacy: literacy[0],
      elevation: elevation[0],
      orderingFrequency,
      weather,
      droneType,
      payload,
      noFlyZones,
    }
    localStorage.setItem("dashboardData", JSON.stringify(formData))
    router.push("/dashboard/map")
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-syabil text-gray-900 mb-4">Drone Delivery Analysis</h1>
        <p className="text-base sm:text-lg font-syabil text-gray-600 max-w-3xl mx-auto px-4">
          Configure parameters to analyze drone delivery feasibility and optimize your logistics operations
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid lg:grid-cols-2 gap-6 mb-8">
        {/* Location & Demographics Card */}
        <Card className="border-2 border-blue-100 shadow-xl bg-white cool-shadow">
          <CardHeader className="bg-gradient-to-r from-[#0071ce] to-[#004c91] text-white rounded-t-lg p-4">
            <CardTitle className="flex items-center text-lg font-syabil">
              <MapPin className="mr-2 h-5 w-5" />
              Location & Demographics
            </CardTitle>
            <CardDescription className="text-blue-100 text-sm font-syabil">
              Select target city and demographic parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            {/* Single City Selection */}
            <div>
              <Label className="text-base font-syabil mb-3 block text-gray-800">Target City</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="h-12 text-sm font-syabil">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city} className="text-sm font-syabil">
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Population Range */}
            <div>
              <Label className="text-base font-syabil mb-3 block text-gray-800">
                Population Range: {population[0]} Lakh
              </Label>
              <Slider
                value={population}
                onValueChange={setPopulation}
                max={100}
                min={10}
                step={5}
                className="w-full h-2"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2 font-syabil">
                <span>10 Lakh</span>
                <span>100 Lakh</span>
              </div>
            </div>

            {/* Literacy Levels */}
            <div>
              <Label className="text-base font-syabil mb-3 block text-gray-800">Literacy Level: {literacy[0]}%</Label>
              <Slider value={literacy} onValueChange={setLiteracy} max={100} min={0} step={5} className="w-full h-2" />
              <div className="flex justify-between text-xs text-gray-500 mt-2 font-syabil">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Elevation Height */}
            <div>
              <Label className="text-base font-syabil mb-3 block text-gray-800">
                Elevation Height: {elevation[0]}m
              </Label>
              <Slider
                value={elevation}
                onValueChange={setElevation}
                max={500}
                min={0}
                step={10}
                className="w-full h-2"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2 font-syabil">
                <span>0m</span>
                <span>500m</span>
              </div>
            </div>

            {/* Ordering Frequency */}
            <div>
              <Label htmlFor="ordering-frequency" className="text-base font-syabil mb-3 block text-gray-800">
                Ordering Frequency
              </Label>
              <Select value={orderingFrequency} onValueChange={setOrderingFrequency}>
                <SelectTrigger className="h-12 text-sm font-syabil">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily" className="text-sm font-syabil">
                    Daily
                  </SelectItem>
                  <SelectItem value="weekly" className="text-sm font-syabil">
                    Weekly
                  </SelectItem>
                  <SelectItem value="monthly" className="text-sm font-syabil">
                    Monthly
                  </SelectItem>
                  <SelectItem value="occasional" className="text-sm font-syabil">
                    Occasional
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Operational Parameters Card */}
        <Card className="border-2 border-blue-100 shadow-xl bg-white cool-shadow">
          <CardHeader className="bg-gradient-to-r from-[#0071ce] to-[#004c91] text-white rounded-t-lg p-4">
            <CardTitle className="flex items-center text-lg font-syabil">
              <Settings className="mr-2 h-5 w-5" />
              Operational Parameters
            </CardTitle>
            <CardDescription className="text-blue-100 text-sm font-syabil">
              Configure drone specifications and operational constraints
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            {/* Weather Conditions */}
            <div>
              <Label className="text-base font-syabil mb-3 block text-gray-800">Weather Conditions</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {weatherConditions.map((condition) => (
                  <Button
                    key={condition.name}
                    variant={weather === condition.name ? "default" : "outline"}
                    onClick={() => setWeather(condition.name)}
                    className={`h-16 flex flex-col items-center justify-center font-syabil ${
                      weather === condition.name
                        ? "bg-[#0071ce] text-white hover:bg-[#004c91]"
                        : "hover:bg-blue-50 hover:border-[#0071ce]"
                    }`}
                  >
                    <span className="text-2xl mb-1">{condition.emoji}</span>
                    <span className="text-xs">{condition.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Drone Type */}
            <div>
              <Label htmlFor="drone-type" className="text-base font-syabil mb-3 block text-gray-800">
                Drone Type
              </Label>
              <Select value={droneType} onValueChange={setDroneType}>
                <SelectTrigger className="h-12 text-sm font-syabil">
                  <SelectValue placeholder="Select drone type" />
                </SelectTrigger>
                <SelectContent>
                  {droneTypes.map((drone) => (
                    <SelectItem key={drone.name} value={drone.name} className="text-sm font-syabil">
                      <div className="flex items-center">
                        <span className="mr-2 text-lg">{drone.image}</span>
                        {drone.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Payload Weight */}
            <div>
              <Label htmlFor="payload" className="text-base font-syabil mb-3 block text-gray-800">
                Payload Weight (kg)
              </Label>
              <Input
                id="payload"
                type="number"
                placeholder="Enter weight in kg"
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                className="h-12 text-sm font-syabil"
              />
            </div>

            {/* No-Fly Zones */}
            <div>
              <Label htmlFor="no-fly-zones" className="text-base font-syabil mb-3 block text-gray-800">
                No-Fly Zones
              </Label>
              <Textarea
                id="no-fly-zones"
                placeholder="Enter restricted areas, airports, military zones, etc."
                value={noFlyZones}
                onChange={(e) => setNoFlyZones(e.target.value)}
                rows={4}
                className="text-sm font-syabil resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calculate Button */}
      <div className="text-center">
        <Button
          onClick={handleCalculate}
          size="lg"
          className="walmart-gradient text-white px-8 py-4 text-base font-syabil shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
          disabled={!selectedCity || !weather || !droneType}
        >
          <Calculator className="mr-2 h-5 w-5" />
          Calculate Route Feasibility
        </Button>
      </div>
    </div>
  )
}
