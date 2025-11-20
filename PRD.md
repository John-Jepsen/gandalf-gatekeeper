# Planning Guide

A mystical chatbot featuring Gandalf the Gray that acts as a gatekeeper - only revealing answers when users ask the exact challenge question, otherwise responding with wisdom from the wizard himself.

**Experience Qualities**: 
1. **Whimsical** - The animated Gandalf face and playful gatekeeper mechanic should evoke a sense of magic and wonder
2. **Mysterious** - The hidden challenge question creates intrigue and discovery
3. **Focused** - The oversized centered face commands attention, making the interaction feel intimate and direct

**Complexity Level**: Light Application (multiple features with basic state)
  - Manages conversation history, input state, animation timing, and challenge question logic

## Essential Features

**Gandalf Sayings Response**
- Functionality: Returns random Gandalf quotes when user input doesn't match challenge question
- Purpose: Creates engaging default behavior and reinforces the wizard theme
- Trigger: Any user input except the exact challenge question
- Progression: User types message → Submit → Gandalf face animates → Random saying appears → Conversation history updates
- Success criteria: Quotes display correctly, variety of sayings, smooth animations

**Challenge Question Gatekeeper**
- Functionality: Detects exact match of challenge question and switches to answer mode using LLM
- Purpose: Creates a puzzle-like interaction and gates actual Q&A functionality
- Trigger: User types the exact challenge question string
- Progression: User types challenge → Exact match detected → LLM generates answer → Face animates → Answer displays
- Success criteria: Only exact string match triggers answer mode, case-sensitive matching works

**Animated Gandalf Face**
- Functionality: Oversized centered face with mouth that opens/closes during responses
- Purpose: Creates visual feedback and personality, makes the bot feel alive
- Trigger: Each time bot responds (both sayings and answers)
- Progression: Response starts → Mouth animation loop begins → Text appears character-by-character → Animation completes with text
- Success criteria: Smooth mouth animation synced to text appearance, face dominates viewport

**Conversation Interface**
- Functionality: Text input field and scrollable message history
- Purpose: Enables user interaction and maintains conversation context
- Trigger: User types and submits messages
- Progression: User types → Hits enter/clicks send → Message adds to history → Bot responds → Scroll to latest
- Success criteria: Input clears after send, history persists during session, auto-scroll works

## Edge Case Handling
- **Empty Input**: Prevent sending blank messages, require non-whitespace content
- **Animation Overlap**: Queue responses if user sends multiple rapid messages
- **Long Responses**: Ensure text wraps properly and history scrolls smoothly
- **Challenge Question Configuration**: Provide clear way to set/change the challenge question

## Design Direction
The design should feel mystical, ancient, and slightly theatrical - evoking the gravitas of Gandalf while maintaining approachability. A minimal interface lets the oversized wizard face dominate, creating an intimate one-on-one audience with the character. Rich, cinematic colors and subtle animations reinforce the fantasy theme without overwhelming the core interaction.

## Color Selection
Custom palette - Drawing from Middle-earth's earthy, mystical atmosphere with deep grays, aged parchment tones, and ethereal highlights.

- **Primary Color**: Deep charcoal gray (oklch(0.25 0.01 270)) - Evokes Gandalf's gray robes and wizardly wisdom
- **Secondary Colors**: Warm stone beige (oklch(0.85 0.02 80)) for message backgrounds - Like ancient parchment; Darker slate (oklch(0.18 0.01 270)) for input areas
- **Accent Color**: Mystical blue-white (oklch(0.75 0.08 240)) - Suggests Gandalf's magic and staff light, used for interactive elements
- **Foreground/Background Pairings**: 
  - Background (Deep midnight: oklch(0.15 0.02 270)): Light text (oklch(0.92 0.01 80)) - Ratio 12.1:1 ✓
  - Card/Message (Warm stone: oklch(0.85 0.02 80)): Dark text (oklch(0.25 0.01 270)) - Ratio 8.5:1 ✓
  - Primary (Deep charcoal: oklch(0.25 0.01 270)): Light text (oklch(0.95 0 0)) - Ratio 11.8:1 ✓
  - Accent (Mystical blue: oklch(0.75 0.08 240)): Dark text (oklch(0.15 0.02 270)) - Ratio 9.2:1 ✓

## Font Selection
Typography should feel timeless and slightly archaic, suggesting ancient tomes and wizard scrolls while maintaining excellent readability for extended conversations.

- **Typographic Hierarchy**: 
  - H1 (Configuration Header): Cinzel Bold/32px/wide letter spacing - For dramatic section headers
  - Body (Messages): Lora Regular/16px/relaxed line-height (1.6) - Readable serif for conversation
  - Input: Lora Regular/16px - Consistency with message display
  - Gandalf Sayings: Cinzel Regular/18px/italic - Distinguished from regular answers

## Animations
Animations should feel magical and deliberate - not snappy like a modern app, but more theatrical like a wizard's spell taking effect. The mouth movement creates the illusion of speech while text reveals.

- **Purposeful Meaning**: Mouth animation reinforces that Gandalf is "speaking"; smooth transitions feel mystical rather than mechanical
- **Hierarchy of Movement**: 
  - Primary: Mouth open/close cycle (most prominent, draws eye)
  - Secondary: Text character-by-character reveal (syncs with mouth)
  - Tertiary: Message fade-in (subtle, supports hierarchy)
  - Background: Gentle floating/breathing on entire face (very subtle, adds life)

## Component Selection
- **Components**: 
  - Card (for message history container) - Subtle shadow, warm background
  - Input (for user text entry) - Dark, recessed appearance
  - Button (icon-only send button) - Accent color, glowing effect on hover
  - ScrollArea (for message history) - Custom scrollbar styled to match theme
  
- **Customizations**: 
  - Custom Gandalf face component with SVG mouth overlay that animates
  - Typewriter effect component for text reveal
  - Message bubble component with different styles for user vs. bot
  
- **States**: 
  - Input: Focus state with subtle blue glow; disabled during bot response
  - Send button: Hover with brightness increase; disabled/muted when animating
  - Messages: Fade-in on appear; user messages right-aligned in accent color, bot left-aligned in warm stone
  
- **Icon Selection**: 
  - PaperPlaneRight for send button - Clear action indicator
  - Staff (custom or wizardly icon) for configuration/settings if needed
  
- **Spacing**: 
  - Face container: py-8, maintains 60% viewport height
  - Message history: max-h-[25vh], px-6, py-4
  - Input area: px-6, py-4, gap-3
  - Messages: gap-3 between bubbles, px-4 py-3 within bubbles
  
- **Mobile**: 
  - Face scales down to 70% on mobile to leave room for messages
  - Message history expands to 30vh on mobile
  - Input remains fixed at bottom
  - Single column layout maintained throughout
  - Touch targets minimum 44px for send button
