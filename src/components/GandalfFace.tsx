import { useEffect, useState } from 'react'
import gandalfImg from '../assets/gandalf.jpeg'

interface GandalfFaceProps {
  isAnimating: boolean
}

export function GandalfFace({ isAnimating }: GandalfFaceProps) {
  const [blinkKey, setBlinkKey] = useState(0)

  useEffect(() => {
    const blinkInterval = isAnimating ? 1900 : 4200
    const id = setInterval(() => setBlinkKey((n) => n + 1), blinkInterval)
    return () => clearInterval(id)
  }, [isAnimating])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <img
          src={gandalfImg}
          alt="Gandalf the Gatekeeper"
          className="w-full h-auto block select-none"
        />

        {/* Atmosphere overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />

        {/* Eye lids */}
        <div
          key={`blink-l-${blinkKey}`}
          className="pointer-events-none absolute left-[36.5%] top-[36.5%] h-[9%] w-[7.5%] rounded-full"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 100%)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.35)',
            animation: 'gandalfBlink 3.6s ease-in-out 1',
          }}
        />
        <div
          key={`blink-r-${blinkKey}`}
          className="pointer-events-none absolute left-[56.5%] top-[36.5%] h-[9%] w-[7.5%] rounded-full"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 100%)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.35)',
            animation: 'gandalfBlink 3.6s ease-in-out 1',
          }}
        />

        {/* Eye glints for depth */}
        <div className="pointer-events-none absolute left-[38.5%] top-[39%] h-[3%] w-[3%] rounded-full bg-white/75 blur-[1px] opacity-80" />
        <div className="pointer-events-none absolute left-[58.5%] top-[39%] h-[3%] w-[3%] rounded-full bg-white/75 blur-[1px] opacity-80" />

        {/* Eye shadow rim */}
        <div className="pointer-events-none absolute left-[35%] top-[34%] h-[12%] w-[10%] rounded-full border border-white/8 shadow-[0_4px_10px_rgba(0,0,0,0.45)]" />
        <div className="pointer-events-none absolute left-[55%] top-[34%] h-[12%] w-[10%] rounded-full border border-white/8 shadow-[0_4px_10px_rgba(0,0,0,0.45)]" />

        {/* Pupils */}
        <div
          className="pointer-events-none absolute left-[39%] top-[39%] h-[2.8%] w-[2.8%] rounded-full bg-black/85 shadow-[0_0_4px_rgba(255,255,255,0.25)]"
          style={{
            transformOrigin: '50% 50%',
            animation: isAnimating ? 'gandalfPupilTalk 1.2s infinite ease-in-out' : 'gandalfPupilIdle 6s infinite ease-in-out',
          }}
        />
        <div
          className="pointer-events-none absolute left-[59%] top-[39%] h-[2.8%] w-[2.8%] rounded-full bg-black/85 shadow-[0_0_4px_rgba(255,255,255,0.25)]"
          style={{
            transformOrigin: '50% 50%',
            animation: isAnimating ? 'gandalfPupilTalk 1.2s infinite ease-in-out' : 'gandalfPupilIdle 6s infinite ease-in-out',
          }}
        />

        {/* Mouth overlay */}
        <div
          className="pointer-events-none absolute left-1/2 top-[58%] h-[8%] w-[18%] -translate-x-1/2 rounded-full bg-black/75"
          style={{
            transformOrigin: '50% 50%',
            mixBlendMode: 'multiply',
            filter: 'blur(0.2px)',
            animation: isAnimating
              ? 'gandalfTalk 0.4s infinite ease-in-out alternate'
              : 'gandalfTalkIdle 7s infinite ease-in-out',
          }}
        />

        {/* Mouth sheen for subtle detail */}
        <div
          className="pointer-events-none absolute left-1/2 top-[58%] h-[3%] w-[10%] -translate-x-1/2 rounded-full bg-white/18"
          style={{
            transformOrigin: '50% 50%',
            mixBlendMode: 'soft-light',
            animation: isAnimating
              ? 'gandalfTalk 0.4s infinite ease-in-out alternate'
              : 'gandalfTalkIdle 7s infinite ease-in-out',
          }}
        />
      </div>
    </div>
  )
}
