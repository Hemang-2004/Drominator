"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Plane, BarChart3, Shield } from "lucide-react"

const timelineItems = [
  {
    icon: MapPin,
    title: "Location Analysis",
    description:
      "Analyze demographic data, weather patterns, and geographical constraints for optimal delivery planning",
    side: "left",
  },
  {
    icon: Plane,
    title: "Route Optimization",
    description:
      "Calculate optimal delivery routes considering no-fly zones, traffic patterns, and regulatory requirements",
    side: "right",
  },
  {
    icon: BarChart3,
    title: "Profit Prediction",
    description: "Predict expected profit/loss based on operational parameters, fuel costs, and delivery efficiency",
    side: "left",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Evaluate safety factors, regulatory compliance, and environmental risks for secure operations",
    side: "right",
  },
]

export function VerticalTimeline() {
  return (
    <div className="relative max-w-6xl mx-auto py-16">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0071ce] to-[#004c91] transform -translate-x-1/2"></div>

      {timelineItems.map((item, index) => (
        <div key={index} className="relative mb-16 last:mb-0">
          {/* Timeline Dot */}
          <div className="absolute left-1/2 top-8 w-6 h-6 bg-[#0071ce] border-4 border-white rounded-full transform -translate-x-1/2 shadow-lg z-10"></div>

          {/* Content Card */}
          <div className={`flex ${item.side === "right" ? "justify-end" : "justify-start"}`}>
            <div className={`w-full max-w-md ${item.side === "right" ? "ml-8" : "mr-8"}`}>
              <Card
                className="border-2 border-blue-100 hover:shadow-xl transition-all duration-300 cool-shadow timeline-item-animate"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <div
                    className={`flex items-start gap-4 ${item.side === "right" ? "flex-row-reverse text-right" : ""}`}
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-8 w-8 text-[#0071ce]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-rubik-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 font-syabil leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
