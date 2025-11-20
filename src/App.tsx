import { useState, useEffect, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { GandalfFace } from './components/GandalfFace'
import { Typewriter } from './components/Typewriter'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { ScrollArea } from './components/ui/scroll-area'
import { Card } from './components/ui/card'
import { PaperPlaneRight, Gear } from '@phosphor-icons/react'

const CHALLENGE_QUESTION = "What is a pointer?"

const GANDALF_SAYINGS = [
  "Have you tried turning it off and on again?",
  "That's not the magic word I'm looking for.",
  "Ask a silly question, get a cryptic answer.",
  "I could tell you, but then I'd have to turn you into a frog.",
  "The answer you seek is not the answer you need.",
  "Wrong question, try again.",
  "My crystal ball says... ask something else.",
  "Even a wizard has his limits, and you've found mine.",
  "That's above my pay grade, and I'm a wizard.",
  "I sense great confusion in your query.",
  "The stars say you should rephrase that.",
  "Nice try, but that's not it.",
  "Getting warmer... just kidding, you're ice cold.",
  "My beard is long, but not long enough to answer that.",
  "The prophecy foretold this moment, and it said 'nope.'",
  "I've lived 300 years and still don't know what you're asking.",
  "Ask me about the weather instead. Much easier."
]

interface Message {
  id: string
  role: 'user' | 'gandalf'
  content: string
  isTyping?: boolean
}

interface ConfigModalProps {
  isOpen: boolean
  onClose: () => void
  currentQuestion: string
  onSave: (question: string) => void
}

function ConfigModal({ isOpen, onClose, currentQuestion, onSave }: ConfigModalProps) {
  const [question, setQuestion] = useState(currentQuestion)

  if (!isOpen) return null

  const handleSave = () => {
    onSave(question)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h2 className="font-cinzel text-2xl font-bold text-card-foreground">Challenge Question</h2>
        <p className="text-sm text-muted-foreground">
          Set the exact question users must ask to unlock answer mode.
        </p>
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="font-lora"
          placeholder="Enter challenge question..."
        />
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </div>
      </Card>
    </div>
  )
}

function App() {
  const [messages, setMessages] = useKV<Message[]>('gandalf-messages', [])
  const [input, setInput] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [challengeQuestion, setChallengeQuestion] = useKV('challenge-question', CHALLENGE_QUESTION)
  const [showConfig, setShowConfig] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const messageList = messages || []
  const currentChallengeQuestion = challengeQuestion || CHALLENGE_QUESTION

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messageList])

  const getRandomSaying = () => {
    return GANDALF_SAYINGS[Math.floor(Math.random() * GANDALF_SAYINGS.length)]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedInput = input.trim()
    if (!trimmedInput || isAnimating) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmedInput
    }

    setMessages((current = []) => [...current, userMessage])
    setInput('')
    setIsAnimating(true)

    setTimeout(async () => {
      let gandalfResponse: string

      if (trimmedInput === currentChallengeQuestion) {
        try {
          const promptText = `You are Gandalf the Gray, the wise wizard. A traveler has asked you the correct challenge question and unlocked your wisdom. Answer their question: ${trimmedInput} in a thoughtful, wizardly manner. Keep your response concise (2-3 sentences).`
          gandalfResponse = await window.spark.llm(promptText)
        } catch (error) {
          gandalfResponse = "The path to that answer is shrouded in mist. Perhaps the question holds more meaning than the answer itself."
        }
      } else {
        gandalfResponse = getRandomSaying()
      }

      const gandalfMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'gandalf',
        content: gandalfResponse,
        isTyping: true
      }

      setMessages((current = []) => [...current, gandalfMessage])
    }, 600)
  }

  const handleTypingComplete = (messageId: string) => {
    setMessages((current = []) =>
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
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-muted-foreground hover:text-accent z-10"
        onClick={() => setShowConfig(true)}
      >
        <Gear size={24} />
      </Button>

      <ConfigModal
        isOpen={showConfig}
        onClose={() => setShowConfig(false)}
        currentQuestion={currentChallengeQuestion}
        onSave={setChallengeQuestion}
      />

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