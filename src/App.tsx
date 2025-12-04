import { useState, useEffect, useRef } from 'react'
import { GandalfFace } from './components/GandalfFace'
import { Typewriter } from './components/Typewriter'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { ScrollArea } from './components/ui/scroll-area'
import { PaperPlaneRight } from '@phosphor-icons/react'
import { usePersistentState } from './hooks/usePersistentState'

const TARGET_WORD = "debuggle"

const CLUES = [
  "A holiday hacker hunts a sneaky bug; find the festive fix-it word.",
  "It starts with \"de\" like \"debug\", but jingles with extra cheer.",
  "Imagine an elf untangling lights and code at once.",
  "Blend \"debug\" with a gift-wrapping wriggle—say it aloud.",
  "Think of a playful gnome dancing through logs to catch errors.",
  "Santa’s favorite verb when the build turns red.",
  "Picture snowflakes falling on breakpoints, then shimmying away.",
  "Add a playful wobble to the word that clears console woes.",
  "If \"debug\" went to a winter party, this is what they’d chant.",
  "It rhymes (almost) with \"snuggle\" but fixes code.",
]

const getRandomItem = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)]

interface Message {
  id: string
  role: 'user' | 'gandalf'
  content: string
  isTyping?: boolean
}

function App() {
  const [messages, setMessages] = usePersistentState<Message[]>('gandalf-messages', [])
  const [input, setInput] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [attemptCount, setAttemptCount] = usePersistentState('riddle-attempts', 0)
  const [isSolved, setIsSolved] = usePersistentState('riddle-solved', false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const messageList = messages

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messageList])

  const getClue = (index: number) => CLUES[Math.min(index, CLUES.length - 1)]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedInput = input.trim()
    if (!trimmedInput || isAnimating) return
    if (attemptCount >= 10 || isSolved) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmedInput
    }

    setMessages((current) => [...current, userMessage])
    setInput('')
    setIsAnimating(true)

    setTimeout(() => {
      const normalizedGuess = trimmedInput.trim().toLowerCase()
      const isTargetWord = normalizedGuess === TARGET_WORD.toLowerCase()
      const nextAttempt = attemptCount + 1

      let gandalfResponse: string

      if (isTargetWord) {
        gandalfResponse = `Debuggle! You unraveled the holiday bug with ${nextAttempt}/10 attempts. The gates glow with green tests.`
        setIsSolved(true)
      } else if (nextAttempt >= 10) {
        gandalfResponse = `Your 10 attempts are spent. The word was "Debuggle." May your next deploy be merry and bright.`
      } else {
        gandalfResponse = `Clue ${nextAttempt}/10: ${getClue(nextAttempt - 1)} Attempts left: ${10 - nextAttempt}.`
      }

      const gandalfMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'gandalf',
        content: gandalfResponse,
        isTyping: true
      }

      setMessages((current) => [...current, gandalfMessage])

      setAttemptCount(nextAttempt)
    }, 600)
  }

  const handleTypingComplete = (messageId: string) => {
    setMessages((current) =>
      current.map((msg) =>
        msg.id === messageId ? { ...msg, isTyping: false } : msg
      )
    )
    setIsAnimating(false)
    inputRef.current?.focus()
  }

  const currentlyTyping = messageList.some((m) => m.isTyping)

  return (
    <div className="min-h-screen bg-background flex flex-col">

      <div className="flex-1 flex flex-col">
        <div className="h-[50vh] md:h-[55vh] flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md md:max-w-lg">
            <GandalfFace isAnimating={currentlyTyping} />
          </div>
        </div>

        <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 pb-4">
          <ScrollArea className="flex-1 mb-4" ref={scrollRef}>
            <div className="space-y-3 pr-4">
              {messageList.length === 0 && (
                <div className="text-center py-8 text-muted-foreground font-cinzel italic">
                  Ten riddled clues await. Speak the holiday coding word.
                </div>
              )}
              {messageList.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-card text-card-foreground font-cinzel'
                    } ${message.role === 'gandalf' && !message.isTyping ? 'italic' : ''}`}
                  >
                    {message.role === 'gandalf' && message.isTyping ? (
                      <Typewriter
                        text={message.content}
                        speed={30}
                        onComplete={() => handleTypingComplete(message.id)}
                      />
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Offer your best holiday-coding guess..."
              disabled={isAnimating || attemptCount >= 10 || isSolved}
              className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground font-lora"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isAnimating || attemptCount >= 10 || isSolved}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <PaperPlaneRight size={20} weight="fill" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
