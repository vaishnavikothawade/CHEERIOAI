# Cheerio "Growth Copilot" — Clickable Prototype Build Spec

> **For the builder (Claude / Lovable / v0):** Build this as a polished, clickable front-end prototype. No backend, no real auth, no real APIs. All data is hard-coded mock data. Every button in the main journey must work and lead to the next screen. The visual quality bar is **premium SaaS** (think Linear, Vercel, Stripe, Raycast): smooth motion, depth, gradients, micro-interactions. It must NOT look like a basic template or default shadcn demo.

---

## 1. What we are building (context)

**Company:** Cheerio AI — a platform for businesses to grow on WhatsApp, Instagram, Email, SMS, RCS, AI agents and AI voice. Users are business owners and marketers, not technical people.

**Problem:** Users sign up, send a few WhatsApp campaigns, and stop. They never discover chatbots, automations, CRM segments, or analytics → low engagement → churn.

**Our solution: "Growth Copilot"** — contextual, data-driven feature discovery *inside* the Cheerio dashboard:
1. **Smart nudges** that appear at the exact moment a feature would help, using the user's own numbers (e.g. "64 customers replied to your campaign and are still waiting").
2. **Growth Checklist** on the home screen ("Grow your store: 1 of 4 done") showing the next best feature to set up.
3. **1-click templates + AI pre-fill** so setup takes ~2 minutes instead of 30.

**Persona (used across all mock data):**
- **Priya Sharma**, founder of **Glow & Co.** — a D2C skincare brand selling on Shopify.
- Uses Cheerio only for WhatsApp broadcast campaigns. Has ~8,400 contacts.
- Just ran a **"Diwali Glow Sale"** campaign.

**The 3 features she should use but doesn't:**
1. **FAQ Chatbot** — auto-reply to "price?", "COD available?", "shipping time?"
2. **Abandoned Cart Recovery** (automation, needs Shopify connected)
3. **Customer Segments** (CRM — e.g. "repeat buyers", "high spenders")
4. (Checklist item already done: "Send your first campaign")

---

## 2. Tech stack

- **React + Vite + TypeScript**
- **Tailwind CSS** (custom theme tokens below — do not use default look)
- **Framer Motion** for all animation
- **lucide-react** for icons
- **Recharts** for charts
- **canvas-confetti** for the celebration moment
- **shadcn/ui** primitives allowed (Dialog, Tabs, Tooltip, Switch, Toast/Sonner), but **restyle them** to match the design system
- **react-router-dom** for screen routing
- State: a single React context `DemoContext` holding journey progress (checklist state, bot live status, snoozed nudges, etc.)
- Must deploy cleanly to **Vercel** or **Lovable** with a public shareable link
- Desktop-first (1440px design width), must still look acceptable at 1280px and not break on tablet. Mobile is not required but should not be a broken mess.

---

## 3. Design system

### 3.1 Visual direction
Premium, calm, confident. Light theme main canvas, **dark rich sidebar**, soft depth, gradient accents, subtle glass panels. Lots of whitespace. Everything feels alive (hover states, smooth transitions) but never noisy.

### 3.2 Colors (define as CSS variables + Tailwind tokens)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#F7F8FA` | App background |
| `--surface` | `#FFFFFF` | Cards |
| `--surface-glass` | `rgba(255,255,255,0.7)` + `backdrop-blur-xl` | Floating panels, modals |
| `--sidebar` | `#0B1B17` | Sidebar (very deep green-black) |
| `--sidebar-hover` | `#13302A` | Sidebar item hover |
| `--primary` | `#10B981` | Primary actions (emerald, WhatsApp-adjacent) |
| `--primary-600` | `#059669` | Pressed / gradient end |
| `--accent` | `#8B5CF6` | AI / Copilot accent (violet) |
| `--accent-2` | `#06B6D4` | Gradient partner (cyan) |
| `--warning` | `#F59E0B` | Unanswered replies, attention |
| `--danger` | `#EF4444` | Errors |
| `--text` | `#0F172A` | Primary text |
| `--text-muted` | `#64748B` | Secondary text |
| `--border` | `#E5E7EB` | Hairline borders |

**Signature gradients**
- **Copilot gradient:** `linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #10B981 100%)` — used ONLY for AI/Copilot elements (nudge borders, AI badges, sparkle icons) so users learn "gradient = Copilot".
- **Primary button gradient:** `linear-gradient(180deg, #10B981, #059669)` with inner top highlight `inset 0 1px 0 rgba(255,255,255,0.25)`.
- Background of main canvas: very faint radial blobs (violet top-right, emerald bottom-left, ~6% opacity, heavily blurred) for depth.

### 3.3 Typography
- Headings: **"Plus Jakarta Sans"** (600/700), tight letter-spacing `-0.02em`
- Body/UI: **"Inter"** (400/500/600)
- Numbers in stat cards: Inter with `font-variant-numeric: tabular-nums`
- Scale: H1 32px, H2 24px, H3 18px, body 14px, small 12px

### 3.4 Shape, depth, spacing
- Radius: cards `16px`, buttons `10px`, pills `999px`, modals `20px`
- Shadows (layered, soft):
  - card: `0 1px 2px rgba(16,24,40,0.04), 0 4px 16px rgba(16,24,40,0.06)`
  - hover: `0 8px 30px rgba(16,24,40,0.10)`
  - copilot glow: `0 0 0 1px rgba(139,92,246,0.25), 0 8px 40px rgba(139,92,246,0.18)`
- 8px spacing grid. Card padding 24px. Page padding 32px.

### 3.5 Components to style custom
- **Buttons:** primary (gradient, white text), secondary (white, border, subtle shadow), ghost, and **"Copilot" button** (gradient border via mask, sparkle icon, gradient text).
- **Stat card:** label, big number with count-up, trend pill (+12% green / −4% red), tiny sparkline.
- **Nudge card ("Copilot suggestion"):** animated gradient border, sparkle icon, headline using the user's real number, short "why", primary CTA + "Not now" ghost button + "Why am I seeing this?" tooltip.
- **Progress ring** for checklist (SVG, gradient stroke).
- **Phone frame** (iPhone-like, rounded 44px, notch) containing a WhatsApp-style chat (green header, beige patterned background `#ECE5DD`, bubbles: incoming white, outgoing `#DCF8C6`, timestamps, double ticks).
- **Badges:** "New", "AI", "Pro", "Live" (Live has a pulsing green dot).

---

## 4. Motion & animation spec (this is what makes it look awesome)

Use Framer Motion everywhere. Standard easing: `[0.22, 1, 0.36, 1]` (easeOutExpo-like). Default duration 0.4–0.6s. **Respect `prefers-reduced-motion`** (fall back to simple fades).

| Where | Animation |
|---|---|
| **Route/page change** | Content fades + slides up 12px, children **stagger** 60ms apart. Use `AnimatePresence` with `mode="wait"`. |
| **Stat numbers** | Count up from 0 on mount (1.2s, easeOut). |
| **Sparklines / charts** | Lines draw in left→right (pathLength 0→1). Bars grow from bottom with stagger. |
| **Cards** | Hover: lift `y: -3`, shadow grows, 200ms. Press: `scale: 0.98`. |
| **Primary buttons** | Hover: subtle shine sweep (a diagonal white gradient sliding across). Press: scale 0.97. |
| **Copilot nudge card** | Enters with spring (`stiffness 260, damping 20`) sliding from right + fade. Gradient border **slowly rotates** (conic-gradient animating angle, 6s loop). Sparkle icon twinkles every ~4s. |
| **Next-step hotspot** | Pulsing ring (scale 1→1.6, opacity 0.6→0, 1.8s loop) on the element the reviewer should click next. |
| **Checklist** | Progress ring animates stroke. When an item completes: checkbox fills with spring, a checkmark path draws, row strikes through, ring animates 25%→50%, then the next item **expands** with a layout animation (`layout` prop). |
| **Modals / drawers** | Backdrop blur fades in; modal scales 0.96→1 + fade; drawer slides from right with spring. |
| **AI generating state** | Shimmer skeleton lines (moving gradient) for ~1.5s, then answers **type in** (typewriter, ~18ms/char), each field one after another. A small "Copilot is reading glowandco.in…" status with animated dots. |
| **Phone preview chat** | Messages pop in (scale 0.8→1 + fade, origin bottom-left/right). Show a **"typing…" indicator** (three bouncing dots) before each bot reply. |
| **Go Live moment** | Button morphs into a loading spinner → checkmark (layout animation), then **confetti burst** (canvas-confetti in brand colors), "Live" badge pulses in. |
| **Toasts** | Slide in bottom-right with spring; include icon + undo where relevant. |
| **Sidebar** | Active item has a sliding highlight pill (`layoutId="sidebar-active"`). Icons nudge right 2px on hover. |
| **Login** | Animated gradient mesh background slowly moving; form card floats in. |

Keep animations purposeful — fast for UI feedback (150–250ms), slower for "delight" moments (go live, checklist complete).

---

## 5. App layout (all screens after login)

```
┌────────────┬──────────────────────────────────────────────┐
│  SIDEBAR   │  TOP BAR: search (⌘K) · Copilot button ✨ ·   │
│ (dark)     │  bell w/ badge · avatar "Priya · Glow & Co."  │
│            ├──────────────────────────────────────────────┤
│ Cheerio    │                                              │
│ ─────────  │              MAIN CONTENT                    │
│ Home       │                                              │
│ Campaigns  │                                              │
│ Inbox  (64)│                                              │
│ Chatbots NEW                                              │
│ Automations│                                              │
│ Contacts   │                                              │
│ Analytics  │                                              │
│ Integrations                                              │
│ ─────────  │                                              │
│ Plan: Growth│                                             │
│ Settings   │                                              │
└────────────┴──────────────────────────────────────────────┘
```
- Sidebar width 248px. Logo: simple wordmark "cheerio" in white with a small emerald dot/chat-bubble mark (keep it simple, generic).
- Sidebar items Chatbots / Automations / Contacts show a tiny violet dot when Copilot has an unseen suggestion for them.
- Nav items not part of the journey (Settings, Integrations, etc.) can open a simple placeholder page with a nice empty state — never a dead click.

---

## 6. Screens & the main journey (step by step)

**Journey:** Login → Home → Campaign report → Nudge → Template → AI setup → Test → Go Live → Home updated → next suggestion.

### Screen 0 — Login (`/`)
- Split layout: left = animated gradient mesh with a rotating quote/stat ("Brands recover 18% of abandoned carts on WhatsApp"), right = glass login card.
- Email pre-filled `priya@glowandco.in`, password dots, "Continue" button. Also "Continue with Google" button (fake).
- Clicking continue → 600ms loading state on button → route to Home.

### Screen 1 — Home (`/home`)
- Header: "Good evening, Priya 👋" + subtext "Here's how Glow & Co. is doing this week."
- **Row of 4 stat cards** (count-up + sparkline):
  - Messages sent: **12,480** (+18%)
  - Read rate: **71%** (+4%)
  - Replies received: **212**
  - Revenue attributed: **₹1,84,300**
- **Growth Checklist card** (left, larger) — title "Grow your store", progress ring "1 of 4":
  1. ✅ Send your first campaign (done, struck through)
  2. ⭕ **Auto-reply to customer questions** — "Answer FAQs 24/7 with a chatbot" — *expanded, highlighted, CTA "Set up in 2 min"*
  3. ⭕ Recover abandoned carts — "Needs Shopify"
  4. ⭕ Create customer segments — "Pro" badge
- **Copilot suggestion card** (right, gradient border): "⚠️ 64 customers are waiting for a reply from your Diwali Glow Sale" + CTA "See campaign report". Pulsing hotspot on this CTA.
- **Recent campaigns table** below: Diwali Glow Sale (Sent, 8,400, 71% read, 212 replies), Navratri Combo (older), Welcome Series.

### Screen 2 — Campaign report (`/campaigns/diwali-glow-sale`)
- Breadcrumb: Campaigns / Diwali Glow Sale. Status pill "Completed".
- **Funnel chart** (animated bars): Sent 8,400 → Delivered 8,190 → Read 5,815 → Clicked 1,240 → Replied 212.
- **Replies breakdown donut / bar**: "Price / offers" 78, "COD available?" 41, "Shipping time" 33, "Order status" 27, "Other" 33.
- **Unanswered replies list** (show 5 rows, with avatar initials, message preview, time ago, amber "Waiting 6h" badge):
  - "Is COD available in Pune?"
  - "What's the price of the Vitamin C serum?"
  - "When will my order ship?"
  - "Is the offer valid till Sunday?"
  - "Do you ship to Kochi?"
- **Copilot nudge card** (sticky on right side, slides in after 800ms):
  - Title: "64 customers are still waiting for a reply"
  - Body: "83% of these are common questions — price, COD, shipping. A FAQ bot can answer them instantly, 24/7. Brands like yours reply 9× faster with one."
  - Mini insight chips: "78 asked about price", "41 asked about COD"
  - CTA: **"✨ Set up FAQ bot — 2 min"** (pulsing hotspot) · "Not now" · "Why am I seeing this?" (tooltip: "Because 64 replies to this campaign are unanswered.")

### Screen 3 — Template picker (modal over campaign report)
- Glass modal, title "Pick a starting point", subtitle "Pre-built for D2C brands. Copilot will fill it with your store's details."
- 3 template cards in a grid (hover lift, selected = gradient border + check):
  - **D2C FAQ Bot** — "Recommended" badge — price, COD, shipping, returns, order status
  - Order Tracking Bot
  - Lead Capture Bot
- Each card shows a tiny chat preview illustration.
- CTA "Use this template" → route to setup.

### Screen 4 — Bot setup wizard (`/chatbots/new`)
Two-column layout: **left = wizard**, **right = live phone preview** (sticky).
- Top stepper (animated progress line): **1 Answers → 2 Personalise → 3 Test & go live**.

**Step 1 — Answers**
- Banner: "✨ Copilot is reading glowandco.in and your last 212 replies…" with animated dots → shimmer skeletons 1.5s → answers type in.
- 5 editable Q&A cards (question as chip, answer as textarea):
  - Price → "Our Vitamin C Serum is ₹799 (Diwali price ₹599 till 3 Nov). See all products: glowandco.in/shop"
  - COD → "Yes! COD is available across India on orders above ₹299."
  - Shipping → "We ship within 24 hours. Delivery takes 3–5 days in metros, 5–7 days elsewhere."
  - Returns → "Easy 7-day returns on unopened products."
  - Order status → "Share your order ID and I'll check it for you." (toggle "Connect Shopify for live tracking" — edge case, see §7)
- **One answer flagged** with amber "Needs your review" chip: Returns → "Copilot wasn't sure about your return window. Please confirm." (Shows we don't blindly trust AI.)
- Editing a field updates the phone preview live.
- Also "+ Add question" button.

**Step 2 — Personalise**
- Bot name: "Glow Assistant", tone selector (segmented control: Friendly · Professional · Fun), language chips (English ✓, Hindi ✓, Marathi), business hours toggle "Hand over to a human 10am–7pm", fallback: "If the bot can't answer → assign to Priya in Inbox".
- Phone preview updates tone of greeting when tone changes.

**Step 3 — Test & go live**
- "Send a test to your WhatsApp: +91 98XXX XX210" button → phone preview plays a scripted conversation:
  1. Customer: "Hi, is COD available?"
  2. typing… → Bot: COD answer
  3. Customer: "price of vitamin c serum?"
  4. typing… → Bot: price answer with a product card (image placeholder, ₹599, "Buy now" button)
- Toggle: "Apply to the 64 waiting customers now" (default ON) — subtext "They'll get an instant reply."
- Big **"Go Live"** button → spinner → check → **confetti** → success state.

### Screen 5 — Success (`/chatbots/glow-assistant`)
- Hero: big animated check, "Glow Assistant is live 🎉", "Replying to 64 waiting customers now…" with a live counter ticking 0→64 over ~4s.
- Stats preview cards: "Avg reply time: 3 sec (was 6 hrs)", "Questions it can answer: 5".
- Card: "What's next?" → **next Copilot suggestion**: "Recover abandoned carts — 132 people left items in their cart this week (₹96,400)." CTA "Set up cart recovery".
- Button "Back to Home".

### Screen 1b — Home, updated state
- Checklist now **2 of 4**: item 2 animates to done when returning (spring check + ring animates), item 3 "Recover abandoned carts" expands as the next step.
- Toast: "Nice! You've unlocked 1 new feature this week."
- Sidebar "Chatbots" item now shows a green "Live" dot; Inbox badge goes from 64 → 0 (animate count down).

---

## 7. Edge cases (must be clickable)

1. **"Not now" on a nudge** → card animates out, toast "Got it — we'll remind you in 7 days" with **Undo**. Snoozed state saved in context. The checklist item stays (so the user can still find it).
2. **Feature needs an integration** → clicking "Set up cart recovery" (or "Connect Shopify for live tracking") opens a modal "Connect Shopify first" with 3-step mini flow: enter store URL `glowandco.myshopify.com` → fake OAuth loading → "Connected ✓" → continue to a simple cart-recovery template preview (one screen is enough: message preview "Hey {name}, you left {product} in your cart 🛒 Complete your order in 24 hrs and get 5% off" + timing selector "Send after 1 hr / 4 hrs / 24 hrs" + "Activate").
3. **Feature not in the user's plan** → clicking "Create customer segments" (Pro) opens a **locked preview**: blurred segments screen behind a glass card "Segments are on the Pro plan", show value ("Your 1,120 repeat buyers spend 3.2× more"), "Start 14-day free trial" + "Compare plans". Trial button → toast "Trial started (demo)".
4. **AI is unsure** → the "Needs your review" flagged answer in Step 1 (above). Go Live button is disabled with tooltip "Review 1 flagged answer first" until the user edits or confirms it (add a "Looks good ✓" button on that card).
5. **"Why am I seeing this?"** tooltip on every nudge explaining the trigger.
6. **Empty / placeholder pages** for non-journey nav items: nice illustration + one-line text, never a blank screen.

---

## 8. Reviewer helpers

- **Demo control pill** (small floating button bottom-left, labelled "Demo"): opens a mini panel with
  - "Restart journey" (resets all context state, goes to Login)
  - Jump links: Home · Campaign report · Bot setup · Cart recovery edge case · Locked feature edge case
- **Pulsing hotspot** always marks the next suggested click in the main journey (can be toggled off in the demo panel).
- First load: subtle hint toast "👋 This is a clickable prototype. Follow the pulsing dots."

---

## 9. Mock data (single file `src/data/mock.ts`)

Put all numbers/text above into one mock data file so they stay consistent across screens:
- user: Priya Sharma, Glow & Co., plan "Growth", 8,400 contacts
- campaign: Diwali Glow Sale funnel numbers, reply categories, 5 unanswered messages
- checklist items with ids `campaign`, `faq-bot`, `cart-recovery`, `segments`
- templates (3), FAQ answers (5), cart abandon stats (132 carts, ₹96,400), repeat buyers 1,120
- Currency always ₹ with Indian number formatting (`toLocaleString('en-IN')`).

---

## 10. File structure (suggested)

```
src/
  main.tsx, App.tsx, routes.tsx
  context/DemoContext.tsx
  data/mock.ts
  components/
    layout/Sidebar.tsx, TopBar.tsx, AppShell.tsx
    ui/ (Button, Card, Badge, StatCard, ProgressRing, GradientBorder, Hotspot, Toast)
    copilot/NudgeCard.tsx, CopilotSparkle.tsx, AITypewriter.tsx, ShimmerSkeleton.tsx
    phone/PhoneFrame.tsx, ChatBubble.tsx, TypingIndicator.tsx
    checklist/GrowthChecklist.tsx
    demo/DemoPanel.tsx
  pages/
    Login.tsx, Home.tsx, CampaignReport.tsx, BotSetup.tsx, BotLive.tsx,
    CartRecovery.tsx, SegmentsLocked.tsx, Placeholder.tsx
  styles/globals.css
```

---

## 11. Quality checklist (definition of done)

- [ ] Full journey clickable from Login → Go Live → Home updated with **no dead ends**
- [ ] All 3 edge cases (snooze, needs Shopify, Pro-locked) + flagged AI answer work
- [ ] Every page transition is animated; stat numbers count up; charts draw in
- [ ] Nudge card has the animated gradient border; Go Live has confetti
- [ ] Phone preview chat animates with typing indicator
- [ ] Consistent mock data everywhere (64 waiting, 212 replies, etc.)
- [ ] Fonts loaded (Plus Jakarta Sans + Inter), custom colors used — no default-shadcn look
- [ ] No console errors; works at 1280px and 1440px
- [ ] `prefers-reduced-motion` respected
- [ ] Deployed with a **public link** ("anyone with the link can view")

---

## 12. Screenshots to capture for the submission doc

1. Home with Growth Checklist + Copilot suggestion
2. Campaign report with the "64 waiting" nudge
3. Bot setup with AI-filled answers + phone preview
4. Go Live success with confetti / Home showing 2 of 4
