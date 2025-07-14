"use client"

import { useState, useEffect } from "react"
import { Send } from "lucide-react"

interface LoadingAnimationProps {
  isLoading: boolean
  onComplete?: () => void
}

export function LoadingAnimation({ isLoading, onComplete }: LoadingAnimationProps) {
  const [showPlane, setShowPlane] = useState(false)
  const [animationCount, setAnimationCount] = useState(0)

  useEffect(() => {
    if (isLoading) {
      setAnimationCount(0)
      const startAnimation = () => {
        setShowPlane(true)
        setTimeout(() => {
          setShowPlane(false)
          setAnimationCount((prev) => prev + 1)
        }, 3000)
      }

      // Start first animation immediately
      startAnimation()

      // Repeat animation every 4 seconds for 15 seconds total
      const interval = setInterval(() => {
        if (animationCount < 3) {
          // 4 animations total over 15 seconds
          startAnimation()
        }
      }, 4000)

      // Complete after 15 seconds
      const completeTimer = setTimeout(() => {
        clearInterval(interval)
        onComplete?.()
      }, 15000)

      return () => {
        clearInterval(interval)
        clearTimeout(completeTimer)
      }
    }
  }, [isLoading, animationCount, onComplete])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center">
        <div className="relative h-32 mb-6 overflow-hidden">
          {/* Road */}
          <div className="absolute bottom-8 left-0 right-0 h-2 bg-gray-300 rounded">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="road-lines w-full h-0.5 bg-white opacity-60"></div>
            </div>
          </div>

          {/* Paper Plane */}
          {showPlane && (
            <div className="paper-plane-animation absolute bottom-6 text-[#0071ce]">
              <Send className="h-8 w-8 transform rotate-45" />
            </div>
          )}
        </div>

        <h3 className="text-xl font-rubik text-gray-900 mb-2">Analyzing Route</h3>
        <p className="text-gray-600 font-syabil">Calculating optimal delivery path...</p>

        <div className="mt-4 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-[#0071ce] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#0071ce] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-[#0071ce] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
