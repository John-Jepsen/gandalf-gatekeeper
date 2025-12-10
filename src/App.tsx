import { useState, useEffect, useRef } from 'react'
import { GandalfFace } from './components/GandalfFace'
import { Typewriter } from './components/Typewriter'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { ScrollArea } from './components/ui/scroll-area'
import { PaperPlaneRight } from '@phosphor-icons/react'

const SECRET_WORD = 'Debuggel'
const SECRET_REVEAL = `Secrect Word is ${SECRET_WORD}.`
const MAX_ATTEMPTS = 7

const CLUES = [
  'A pointer is Santa’s address tag—where the gift sits in the snowy heap of memory.',
  'It stores the spot, not the present; follow it to read without hauling the box around.',
  'Use `&` like a wrapping label to capture an address and tuck it into the pointer stocking.',
  '`*` is your mitten to unwrap whatever lives at that address—peek or swap the contents.',
  'Stride pointers through arrays like a sleigh hop: move the signpost, visit each gift.',
  'Always check for null, like peeking down a chimney before sliding in—skip the segfault soot.',
  `Holiday reveal: a pointer is simply an address to data. ${SECRET_REVEAL}`,
]

interface Message {
  id: string
  role: 'user' | 'gandalf'
  content: string
  isTyping?: boolean
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [isSolved, setIsSolved] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const messageList = messages

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messageList])

  const getClue = (index: number) => CLUES[Math.min(index, CLUES.length - 1)]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedInput = input.trim()
    if (!trimmedInput || isAnimating) return
    if (attemptCount >= MAX_ATTEMPTS || isSolved) return

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
      const isPointerQuestion = normalizedGuess.includes('what is a pointer')
      const nextAttempt = attemptCount + 1

      let gandalfResponse: string

      if (isPointerQuestion) {
        gandalfResponse = SECRET_REVEAL
        setIsSolved(true)
      } else if (nextAttempt >= MAX_ATTEMPTS) {
        gandalfResponse = getClue(CLUES.length - 1)
        setIsSolved(true)
      } else {
        gandalfResponse = `Clue: ${getClue(nextAttempt - 1)}`
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
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl flex flex-col items-center gap-8">
        <div className="w-full max-w-xl">
          <GandalfFace isAnimating={currentlyTyping} />
        </div>

        <div className="w-full max-w-3xl bg-card/40 border border-border/40 rounded-2xl p-4 shadow-2xl backdrop-blur">
          <ScrollArea className="h-[320px] pr-2 mb-4">
            <div className="space-y-3">
              {messageList.length === 0 && (
                <div className="text-center py-8 text-muted-foreground font-cinzel italic">
                  You get seven tries. Seven riddled clues await. Speak the holiday coding word.
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
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="flex w-full max-w-2xl mx-auto gap-3 justify-center">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Offer your best holiday-coding guess..."
              disabled={isAnimating || attemptCount >= 10 || isSolved}
              className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground font-lora text-center"
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
