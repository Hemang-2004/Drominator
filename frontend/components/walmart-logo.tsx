"use client"

interface WalmartLogoProps {
  className?: string
  width?: number
  height?: number
}

export function WalmartLogo({ className = "", width = 600, height = 160 }: WalmartLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 600 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hover Animation */}
      <style>
        {`
          .drone {
            animation: hover 3s ease-in-out infinite;
            transform-box: fill-box;
            transform-origin: center;
          }
          @keyframes hover {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}
      </style>

      {/* Drone Icon With Hover Animation */}
      <g className="drone" transform="translate(0, 10)">
        {/* Drone body */}
        <rect x="100" y="70" width="40" height="20" rx="5" fill="#0F172A" />
        {/* Propeller arms */}
        <line x1="100" y1="80" x2="60" y2="40" stroke="#0F172A" strokeWidth="6" />
        <line x1="140" y1="80" x2="180" y2="40" stroke="#0F172A" strokeWidth="6" />
        <line x1="100" y1="80" x2="60" y2="120" stroke="#0F172A" strokeWidth="6" />
        <line x1="140" y1="80" x2="180" y2="120" stroke="#0F172A" strokeWidth="6" />
        {/* Propellers */}
        <circle cx="60" cy="40" r="10" fill="#2563EB" />
        <circle cx="180" cy="40" r="10" fill="#2563EB" />
        <circle cx="60" cy="120" r="10" fill="#2563EB" />
        <circle cx="180" cy="120" r="10" fill="#2563EB" />
        {/* Camera */}
        <circle cx="120" cy="105" r="8" fill="#2563EB" stroke="#0F172A" strokeWidth="3" />
      </g>

      {/* Text */}
      <text x="220" y="105" fontFamily="Rubik, Arial, sans-serif" fontSize="40" fill="#0F172A" fontWeight="600">
        DroneSense.<tspan fill="#2563EB">AI</tspan>
      </text>
    </svg>
  )
}
