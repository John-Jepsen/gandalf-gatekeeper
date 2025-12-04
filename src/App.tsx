import { useState, useEffect, useRef } from 'react'
import { GandalfFace } from './components/GandalfFace'
import { Typewriter } from './components/Typewriter'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { ScrollArea } from './components/ui/scroll-area'
import { PaperPlaneRight } from '@phosphor-icons/react'
import { usePersistentState } from './hooks/usePersistentState'

const TARGET_WORD = "friend"

const HINTS = [
  "Begin with a simple greeting—the sort that opens doors.",
  "Think of the password at the gates of Moria; it was no spell at all.",
  "Speak the word that names a trusted companion.",
  "A single word, warm and welcoming, will let you pass.",
]

const SUCCESS_RESPONSES = [
  "Well spoken. The gates open to one who remembers friendship.",
  "You have the word. Step through, traveler.",
  "The path yields to those who honor friends.",
  "That is the word. Proceed, and may your friends walk with you.",
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
  const [hintIndex, setHintIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const messageList = messages

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messageList])

  const getNextHint = () => HINTS[Math.min(hintIndex, HINTS.length - 1)]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedInput = input.trim()
    if (!trimmedInput || isAnimating) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmedInput
    }

    setMessages((current) => [...current, userMessage])
    setInput('')
    setIsAnimating(true)

    setTimeout(() => {
      const isTargetWord = trimmedInput.toLowerCase().includes(TARGET_WORD.toLowerCase())
      const gandalfResponse = isTargetWord
        ? getRandomItem(SUCCESS_RESPONSES)
        : getNextHint()

      const gandalfMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'gandalf',
        content: gandalfResponse,
        isTyping: true
      }

      setMessages((current) => [...current, gandalfMessage])

      if (!isTargetWord) {
        setHintIndex((current) => Math.min(current + 1, HINTS.length - 1))
      }
      if (isTargetWord) {
        setHintIndex(0)
      }
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
                  Speak, friend, and enter...
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
              placeholder="Speak your question..."
              disabled={isAnimating}
              className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground font-lora"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isAnimating}
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
