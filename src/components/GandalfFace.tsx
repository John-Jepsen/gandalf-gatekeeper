import { useEffect, useState } from 'react'

interface GandalfFaceProps {
  isAnimating: boolean
}

export function GandalfFace({ isAnimating }: GandalfFaceProps) {
  const [blinkKey, setBlinkKey] = useState(0)

  useEffect(() => {
    const blinkInterval = isAnimating ? 2400 : 4200
    const id = setInterval(() => setBlinkKey((n) => n + 1), blinkInterval)
    return () => clearInterval(id)
  }, [isAnimating])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <img
          src="/gandalf.jpeg"
          alt="Gandalf the Gatekeeper"
          className="w-full h-auto block select-none"
        />

        {/* Atmosphere overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />

        {/* Eye lids */}
        <div
          key={`blink-l-${blinkKey}`}
          className="pointer-events-none absolute left-[37%] top-[37%] h-[9%] w-[7%] rounded-full bg-black/80"
          style={{ animation: 'gandalfBlink 3s ease-in-out 1' }}
        />
        <div
          key={`blink-r-${blinkKey}`}
          className="pointer-events-none absolute left-[57%] top-[37%] h-[9%] w-[7%] rounded-full bg-black/80"
          style={{ animation: 'gandalfBlink 3s ease-in-out 1' }}
        />

        {/* Mouth overlay */}
        <div
          className="pointer-events-none absolute left-1/2 top-[58%] h-[7%] w-[16%] -translate-x-1/2 rounded-full bg-black/70"
          style={{
            transformOrigin: '50% 50%',
            mixBlendMode: 'multiply',
            animation: isAnimating ? 'gandalfTalk 0.32s infinite ease-in-out' : 'gandalfTalkIdle 6s infinite ease-in-out',
          }}
        />
      </div>
    </div>
  )
}
