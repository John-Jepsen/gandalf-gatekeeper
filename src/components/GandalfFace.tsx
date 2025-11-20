import { useEffect, useState } from 'react'

interface GandalfFaceProps {
  isAnimating: boolean
}

export function GandalfFace({ isAnimating }: GandalfFaceProps) {
  const [floatAnimation, setFloatAnimation] = useState(true)

  useEffect(() => {
    setFloatAnimation(true)
  }, [])

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${floatAnimation ? 'animate-float' : ''}`}>
      <div className="relative aspect-square w-full">
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
          <defs>
            <radialGradient id="faceGradient" cx="50%" cy="40%">
              <stop offset="0%" stopColor="oklch(0.75 0.01 80)" />
              <stop offset="100%" stopColor="oklch(0.55 0.02 75)" />
            </radialGradient>
            <linearGradient id="hatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.45 0.01 270)" />
              <stop offset="100%" stopColor="oklch(0.25 0.01 270)" />
            </linearGradient>
            <radialGradient id="eyeGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="oklch(0.85 0.08 240)" />
              <stop offset="100%" stopColor="oklch(0.45 0.08 240)" />
            </radialGradient>
          </defs>
          
          <ellipse cx="200" cy="220" rx="140" ry="160" fill="url(#faceGradient)" />
          
          <path
            d="M 50 180 Q 100 80, 200 60 Q 300 80, 350 180 L 340 190 Q 290 140, 200 130 Q 110 140, 60 190 Z"
            fill="url(#hatGradient)"
            stroke="oklch(0.2 0.01 270)"
            strokeWidth="2"
          />
          <ellipse cx="200" cy="180" rx="100" ry="20" fill="oklch(0.2 0.01 270)" />
          
          <ellipse cx="160" cy="200" rx="12" ry="18" fill="url(#eyeGradient)" />
          <ellipse cx="240" cy="200" rx="12" ry="18" fill="url(#eyeGradient)" />
          <circle cx="160" cy="200" r="6" fill="oklch(0.1 0 0)" />
          <circle cx="240" cy="200" r="6" fill="oklch(0.1 0 0)" />
          <circle cx="162" cy="198" r="2" fill="oklch(0.95 0 0)" opacity="0.8" />
          <circle cx="242" cy="198" r="2" fill="oklch(0.95 0 0)" opacity="0.8" />
          
          <path
            d="M 130 210 Q 135 215, 140 210"
            stroke="oklch(0.4 0.01 75)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 260 210 Q 265 215, 270 210"
            stroke="oklch(0.4 0.01 75)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          
          <path
            d="M 180 230 Q 200 235, 220 230"
            stroke="oklch(0.45 0.01 75)"
            strokeWidth="2"
            fill="none"
          />
          
          <path
            d="M 90 250 Q 95 265, 90 280 Q 92 283, 95 280 Q 100 265, 95 250"
            fill="oklch(0.85 0.01 80)"
            opacity="0.6"
          />
          <path
            d="M 310 250 Q 305 265, 310 280 Q 308 283, 305 280 Q 300 265, 305 250"
            fill="oklch(0.85 0.01 80)"
            opacity="0.6"
          />
          
          <path
            d="M 100 290 Q 90 310, 95 330 Q 100 340, 110 335"
            stroke="oklch(0.9 0.01 80)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M 300 290 Q 310 310, 305 330 Q 300 340, 290 335"
            stroke="oklch(0.9 0.01 80)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          <path
            d="M 140 305 Q 145 315, 150 325 Q 155 320, 160 325"
            stroke="oklch(0.9 0.01 80)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M 260 305 Q 255 315, 250 325 Q 245 320, 240 325"
            stroke="oklch(0.9 0.01 80)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M 170 330 Q 175 345, 180 360"
            stroke="oklch(0.9 0.01 80)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M 230 330 Q 225 345, 220 360"
            stroke="oklch(0.9 0.01 80)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />
          
          <ellipse
            cx="200"
            cy="265"
            rx="25"
            ry={isAnimating ? "12" : "4"}
            fill="oklch(0.2 0 0)"
            opacity="0.6"
            className={isAnimating ? 'animate-mouth' : ''}
            style={{
              transformOrigin: '200px 265px',
              transition: isAnimating ? 'none' : 'ry 0.3s ease-out'
            }}
          />
        </svg>
      </div>
    </div>
  )
}
