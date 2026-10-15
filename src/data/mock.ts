export const inr = (n: number) => '₹' + n.toLocaleString('en-IN')
export const num = (n: number) => n.toLocaleString('en-IN')

export const user = {
  name: 'Priya Sharma', first: 'Priya', company: 'Glow & Co.', email: 'priya@glowandco.in',
  plan: 'Growth', contacts: 8400, phone: '+91 98XXX XX210', site: 'glowandco.in', shopify: 'glowandco.myshopify.com',
}

export const stats = [
  { id: 'sent', label: 'Messages sent', value: 12480, trend: 18, spark: [4, 6, 5, 8, 7, 11, 13, 16], fmt: num },
  { id: 'read', label: 'Read rate', value: 71, suffix: '%', trend: 4, spark: [58, 61, 60, 64, 66, 65, 69, 71], fmt: num },
  { id: 'replies', label: 'Replies received', value: 212, trend: 9, spark: [20, 28, 24, 40, 52, 48, 70, 84], fmt: num },
  { id: 'rev', label: 'Revenue attributed', value: 184300, prefix: '₹', trend: 12, spark: [8, 11, 10, 14, 13, 19, 22, 27], fmt: num },
]

export const campaign = {
  slug: 'diwali-glow-sale', name: 'Diwali Glow Sale', audience: 8400, waiting: 64, replies: 212,
  funnel: [
    { name: 'Sent', value: 8400, color: '#8B5CF6' },
    { name: 'Delivered', value: 8190, color: '#7C7AF0' },
    { name: 'Read', value: 5815, color: '#4F9BEA' },
    { name: 'Clicked', value: 1240, color: '#06B6D4' },
    { name: 'Replied', value: 212, color: '#10B981' },
  ],
  replyTypes: [
    { name: 'Price / offers', value: 78, color: '#8B5CF6' },
    { name: 'COD available?', value: 41, color: '#06B6D4' },
    { name: 'Shipping time', value: 33, color: '#10B981' },
    { name: 'Order status', value: 27, color: '#F59E0B' },
    { name: 'Other', value: 33, color: '#CBD5E1' },
  ],
  unanswered: [
    { name: 'Ananya Kulkarni', msg: 'Is COD available in Pune?', ago: '6h' },
    { name: 'Rohit Menon', msg: "What's the price of the Vitamin C serum?", ago: '6h' },
    { name: 'Sneha Patil', msg: 'When will my order ship?', ago: '5h' },
    { name: 'Meera Nair', msg: 'Is the offer valid till Sunday?', ago: '5h' },
    { name: 'Arjun Reddy', msg: 'Do you ship to Kochi?', ago: '4h' },
  ],
}

export const recentCampaigns = [
  { name: 'Diwali Glow Sale', slug: 'diwali-glow-sale', status: 'Sent', audience: 8400, read: 71, replies: 212, when: 'Today' },
  { name: 'Navratri Combo', slug: '', status: 'Sent', audience: 7900, read: 66, replies: 148, when: '3 weeks ago' },
  { name: 'Welcome Series', slug: '', status: 'Active', audience: 1240, read: 82, replies: 96, when: 'Always on' },
]

export type CheckId = 'campaign' | 'faq-bot' | 'cart-recovery' | 'segments'
export const checklist: { id: CheckId; title: string; sub: string; cta: string; badge?: string }[] = [
  { id: 'campaign', title: 'Send your first campaign', sub: 'Reach your contacts on WhatsApp', cta: 'Done' },
  { id: 'faq-bot', title: 'Auto-reply to customer questions', sub: 'Answer FAQs 24/7 with a chatbot', cta: 'Set up in 2 min' },
  { id: 'cart-recovery', title: 'Recover abandoned carts', sub: 'Needs Shopify · win back people who left items behind', cta: 'Set up cart recovery' },
  { id: 'segments', title: 'Create customer segments', sub: 'Group repeat buyers and high spenders', cta: 'Explore segments', badge: 'Pro' },
]

export const templates = [
  { id: 'faq', name: 'D2C FAQ Bot', desc: 'Price, COD, shipping, returns and order status.', tag: 'Recommended', chat: ['Is COD available?', 'Yes! COD across India 🎉'] },
  { id: 'track', name: 'Order Tracking Bot', desc: 'Let customers track orders with their order ID.', chat: ['Where is my order?', 'Out for delivery today 🚚'] },
  { id: 'lead', name: 'Lead Capture Bot', desc: 'Collect name, phone and interest from new chats.', chat: ['I want to know more', 'Sure! What is your name?'] },
]

export type Faq = { id: string; q: string; a: string; flagged?: boolean; key: string }
export const faqs: Faq[] = [
  { id: 'price', key: 'price', q: 'Price', a: 'Our Vitamin C Serum is ₹799 (Diwali price ₹599 till 3 Nov). See all products: glowandco.in/shop' },
  { id: 'cod', key: 'cod', q: 'COD', a: 'Yes! COD is available across India on orders above ₹299.' },
  { id: 'ship', key: 'ship', q: 'Shipping', a: 'We ship within 24 hours. Delivery takes 3–5 days in metros, 5–7 days elsewhere.' },
  { id: 'returns', key: 'returns', q: 'Returns', a: 'Easy 7-day returns on unopened products.', flagged: true },
  { id: 'order', key: 'order', q: 'Order status', a: "Share your order ID and I'll check it for you." },
]

export const cart = { carts: 132, value: 96400 }
export const repeatBuyers = 1120
