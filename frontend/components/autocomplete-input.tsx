"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"

interface AutocompleteInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  className?: string
  selectedCities: string[]
}

export function AutocompleteInput({ value, onChange, placeholder, className, selectedCities }: AutocompleteInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [autocomplete, setAutocomplete] = useState<any>(null)

  useEffect(() => {
    if (!inputRef.current) return

    const initAutocomplete = () => {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.warn("Google Maps Places API not available for AutocompleteInput.")
        return
      }

      // Use PlaceAutocompleteElement as recommended
      // Note: This custom element approach might require specific setup for web components
      // For simplicity and broader compatibility, we'll revert to the standard Autocomplete
      // if the custom element causes issues, but keep the deprecation warning in mind.
      const autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current!, {
        types: ["establishment", "geocode"],
        componentRestrictions: { country: "IN" },
      })

      if (selectedCities.length > 0) {
        const bounds = new window.google.maps.LatLngBounds()
        selectedCities.forEach((city) => {
          const cityCoords = {
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
          }[city]

          if (cityCoords) {
            bounds.extend(new window.google.maps.LatLng(cityCoords.lat, cityCoords.lng))
          }
        })
        autocompleteInstance.setBounds(bounds)
      }

      autocompleteInstance.addListener("place_changed", () => {
        const place = autocompleteInstance.getPlace()
        console.log("Autocomplete place selected:", place) // Log the full place object

        let address = ""
        if (place.formatted_address) {
          address = place.formatted_address
        } else if (place.name) {
          address = place.name
        }

        if (address) {
          onChange(address)
          console.log("Autocomplete passing to onChange:", address) // Log the value being passed
        } else {
          console.warn("No valid address found for selected place.")
        }
      })

      setAutocomplete(autocompleteInstance)
    }

    if (window.google && window.google.maps && window.google.maps.places) {
      initAutocomplete()
    } else {
      const checkGoogleMapsLoaded = () => {
        if (window.google && window.google.maps && window.google.maps.places) {
          initAutocomplete()
        } else {
          setTimeout(checkGoogleMapsLoaded, 200)
        }
      }
      checkGoogleMapsLoaded()
    }

    return () => {
      if (autocomplete && window.google) {
        window.google.maps.event.clearInstanceListeners(autocomplete)
      }
    }
  }, [selectedCities, onChange])

  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  )
}
