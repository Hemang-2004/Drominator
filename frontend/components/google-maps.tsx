"use client"

import { useEffect, useRef, useState } from "react"

interface GoogleMapsProps {
  selectedCities: string[]
  warehouse: string
  destination: string
  routeAnalysis: any
  onNoFlyZone?: (isNoFlyZone: boolean) => void
}

declare global {
  interface Window {
    google: any
    googleMapsLoaded: boolean
  }
}

const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {
  Mumbai: { lat: 19.076, lng: 72.8777 },
  "New Delhi": { lat: 28.6139, lng: 77.209 },
  Pune: { lat: 18.5204, lng: 73.8567 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
  Hyderabad: { lat: 17.385, lng: 78.4867 },
  Lucknow: { lat: 26.8467, lng: 80.9462 },
  Agra: { lat: 27.1767, lng: 78.0081 },
  Meerut: { lat: 28.9845, lng: 77.7064 },
  Noida: { lat: 28.5355, lng: 77.391 },
  Ghaziabad: { lat: 28.6692, lng: 77.4538 },
  Bhopal: { lat: 23.2599, lng: 77.4126 },
  Guwahati: { lat: 26.1445, lng: 91.7362 },
}

// No-fly zones for specific cities and destinations
const noFlyZones: { [key: string]: string[] } = {
  Mumbai: ["ashok nagar", "santacruz east", "santacruz", "ashok"],
  Bangalore: ["yelanka", "hal", "jokur aerodrome", "electronic city", "jokur", "aerodrome"],
}

export function GoogleMaps({ selectedCities, warehouse, destination, routeAnalysis, onNoFlyZone }: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const directionsRendererRef = useRef<any>(null) // Ref for DirectionsRenderer

  const initMap = () => {
    if (!mapRef.current || !window.google) {
      console.error("Map ref not available or Google Maps API not loaded.")
      setError("Map initialization failed. Please check console for details.")
      return
    }

    const defaultCity = selectedCities.length > 0 ? selectedCities[0] : "Mumbai"
    const center = cityCoordinates[defaultCity] || cityCoordinates["Mumbai"]

    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: center,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }],
          },
        ],
      })
      setMap(mapInstance)
      setIsLoaded(true)
      setError(null)
      console.log("Google Map initialized successfully.")
    } catch (e) {
      console.error("Error initializing Google Map:", e)
      setError("Map initialization failed. Check API key and console for details.")
    }
  }

  useEffect(() => {
    let isMounted = true

    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        if (isMounted) {
          initMap()
        }
        return
      }

      const existingScript = document.getElementById("google-maps-script")
      if (existingScript) {
        existingScript.addEventListener("load", () => {
          if (isMounted) initMap()
        })
        existingScript.addEventListener("error", () => {
          if (isMounted) setError("Failed to load Google Maps script.")
        })
        return
      }

      const script = document.createElement("script")
      script.id = "google-maps-script"
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCr_aBKrD7VSE1Y2vGfSO0xa90ZRBTKEeU&libraries=places`
      script.async = true
      script.defer = true

      script.onload = () => {
        if (isMounted) initMap()
      }
      script.onerror = () => {
        if (isMounted) setError("Failed to load Google Maps script.")
      }

      document.head.appendChild(script)
    }

    loadGoogleMapsScript()

    return () => {
      isMounted = false
      const script = document.getElementById("google-maps-script")
      if (script) {
        script.removeEventListener("load", initMap)
        script.removeEventListener("error", () => {})
      }
    }
  }, [])

  // Effect to re-center map when selectedCities changes
  useEffect(() => {
    if (map && selectedCities.length > 0) {
      const newCenter = cityCoordinates[selectedCities[0]] || cityCoordinates["Mumbai"]
      if (newCenter) {
        map.setCenter(newCenter)
        map.setZoom(12) // Reset zoom to a default level when centering on a new city
        console.log(`Map centered on: ${selectedCities[0]}`, newCenter)
      }
    }
  }, [map, selectedCities]) // Depend on map and selectedCities

  useEffect(() => {
    if (!map || !warehouse || !destination || !routeAnalysis || !window.google) {
      // Clear directions and markers if inputs are not ready or analysis is not available
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null)
      }
      markers.forEach((marker) => marker.setMap(null))
      setMarkers([])
      return
    }

    // Initialize DirectionsRenderer if not already
    if (!directionsRendererRef.current) {
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        suppressMarkers: false,
      })
    }

    const directionsRenderer = directionsRendererRef.current
    directionsRenderer.setMap(map)

    // Set polyline options based on route analysis
    directionsRenderer.setOptions({
      polylineOptions: {
        strokeColor: routeAnalysis.isNoFlyZone ? "#dc2626" : "#0071ce", // Red for no-fly, blue otherwise
        strokeWeight: 4,
        strokeOpacity: 0.8,
      },
    })

    console.log("Directions Request - Origin:", warehouse)
    console.log("Directions Request - Destination:", destination)

    const request = {
      origin: warehouse,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    }

    const directionsService = new window.google.maps.DirectionsService()

    directionsService.route(request, (result: any, status: any) => {
      // Clear existing markers regardless of route status
      markers.forEach((marker) => marker.setMap(null))
      setMarkers([])

      if (status === window.google.maps.DirectionsStatus.OK && result) {
        directionsRenderer.setDirections(result)

        const route = result.routes[0]
        const path = route.overview_path
        const newMarkers: any[] = []

        // Determine marker type based on deliveryMode from routeAnalysis
        if (routeAnalysis.deliveryMode === "bike-only") {
          // Add no-fly zone warning and bike markers
          const midPoint = path[Math.floor(path.length / 2)]
          newMarkers.push(
            new window.google.maps.Marker({
              position: midPoint,
              map: map,
              icon: {
                url:
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(`
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#dc2626">
                    <path d="M12 2L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(32, 32),
              },
              title: "No-Fly Zone - Bike Delivery Only",
            }),
          )

          for (let i = 0; i < path.length; i += Math.floor(path.length / 5)) {
            newMarkers.push(
              new window.google.maps.Marker({
                position: path[i],
                map: map,
                icon: {
                  url:
                    "data:image/svg+xml;charset=UTF-8," +
                    encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#dc2626">
                      <circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
                      <path d="M7 19h10m-8-6l6-6m-6 0h6v6"/>
                    </svg>
                  `),
                  scaledSize: new window.google.maps.Size(20, 20),
                },
                title: "Bike Delivery",
              }),
            )
          }
        } else if (routeAnalysis.deliveryMode === "drone-only") {
          // Add drone markers
          for (let i = 0; i < path.length; i += Math.floor(path.length / 6)) {
            newMarkers.push(
              new window.google.maps.Marker({
                position: path[i],
                map: map,
                icon: {
                  url:
                    "data:image/svg+xml;charset=UTF-8," +
                    encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#0071ce">
                      <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                    </svg>
                  `),
                  scaledSize: new window.google.maps.Size(20, 20),
                },
                title: "Drone Delivery",
              }),
            )
          }
        } else if (routeAnalysis.deliveryMode === "mixed") {
          // Mixed delivery: drone for first part, bike for last part
          const droneSegmentEndIndex = Math.floor(path.length * 0.7) // Drone for 70% of the path

          // Drone markers for first part
          for (let i = 0; i < droneSegmentEndIndex; i += Math.floor(droneSegmentEndIndex / 3)) {
            newMarkers.push(
              new window.google.maps.Marker({
                position: path[i],
                map: map,
                icon: {
                  url:
                    "data:image/svg+xml;charset=UTF-8," +
                    encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#0071ce">
                      <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                    </svg>
                  `),
                  scaledSize: new window.google.maps.Size(20, 20),
                },
                title: "Drone Segment",
              }),
            )
          }

          // Bike markers for last part
          for (
            let i = droneSegmentEndIndex;
            i < path.length;
            i += Math.floor((path.length - droneSegmentEndIndex) / 2)
          ) {
            newMarkers.push(
              new window.google.maps.Marker({
                position: path[i],
                map: map,
                icon: {
                  url:
                    "data:image/svg+xml;charset=UTF-8," +
                    encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#dc2626">
                      <circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
                      <path d="M7 19h10m-8-6l6-6m-6 0h6v6"/>
                    </svg>
                  `),
                  scaledSize: new window.google.maps.Size(20, 20),
                },
                title: "Bike Segment",
              }),
            )
          }
        }
        setMarkers(newMarkers) // Update state with new markers
        setError(null) // Clear any previous map errors
      } else {
        console.error("Directions request failed:", status)
        // If route not found, clear directions and markers, but don't show map overlay error
        directionsRenderer.setDirections({ routes: [] }) // Clear route from map
        markers.forEach((marker) => marker.setMap(null)) // Clear markers
        setMarkers([])
        // The error message will be handled by the analysis card in map-content.tsx
        // setError(`Failed to get route: ${status}. Please try more precise addresses.`);
      }
    })
  }, [map, warehouse, destination, routeAnalysis]) // Depend on routeAnalysis to trigger re-render

  return (
    <div className="w-full h-full min-h-[400px] rounded-lg relative">
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-lg z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0071ce] mx-auto mb-2"></div>
            <p className="text-gray-600 font-syabil">Loading map...</p>
          </div>
        </div>
      )}
      {error && ( // Only show map overlay error for API key issues, not NOT_FOUND
        <div className="absolute inset-0 bg-red-50 flex items-center justify-center rounded-lg z-10">
          <div className="text-center text-red-600 p-4">
            <p className="font-syabil text-lg">Error loading map:</p>
            <p className="text-sm font-syabil mt-2">{error}</p>
            <p className="text-sm font-syabil mt-2">
              Please ensure you have a valid Google Maps API key and check your browser's console for more details.
            </p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full min-h-[400px] rounded-lg" />
    </div>
  )
}
