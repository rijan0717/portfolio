import { useEffect, useState } from 'react'

// Valley Express rebuilt from the running app: the React admin dashboard sits
// behind, and the Flutter phone in front cycles through the customer journey —
// splash, storefront, map pin, checkout and the live dispatch chat.

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// The real Valley Express mark. `animated` adds the loader's breathe and
// stroke-trace, which is what the app shows on its splash screen.
function ValleyMark({ animated = false }) {
  return (
    <svg className={`vx-mark ${animated ? 'is-live' : ''}`} viewBox="0 0 160 160" aria-hidden="true">
      <rect className="vx-mark-sq" x="10" y="10" width="140" height="140" rx="34" fill="#FF6B1A" />
      <path
        className="vx-mark-v"
        pathLength="1"
        d="M42 54 L80 122 L118 54"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ------------------------------------------------------- admin behind */

const kpis = [
  { label: 'Active orders', value: '3', sub: 'Awaiting dispatch & delivery' },
  { label: 'Kitchen & packing', value: '0', sub: 'Being assembled at hub' },
  { label: 'Riders on road', value: '2', sub: '2 riders online on duty' },
  { label: 'Delivered revenue', value: 'Rs. 340', sub: 'Cash collected & cleared' },
]

const adminNav = [
  'Overview', 'Live Orders', 'Products & Stock', 'Offers & Deals',
  'Riders Fleet', 'Registered Users', 'Customer Support',
]

const liveOrders = [
  { id: 'VX-68078', who: 'TryAdmin', drop: 'Test flat, Patan', amount: 'Rs. 340', state: 'Placed' },
  { id: 'VX-61684', who: 'Victim C', drop: 'Jhamsikhel', amount: 'Rs. 340', state: 'Placed' },
  { id: 'VX-62369', who: 'Victim C', drop: 'Jhamsikhel', amount: 'Rs. 340', state: 'Cancelled' },
]

function AdminBoard() {
  return (
    <div className="vx-admin">
      <aside className="vx-side">
        <span className="vx-side-brand"><ValleyMark />Valley<em>Express</em></span>
        {adminNav.map((n, i) => (
          <span key={n} className={`vx-side-link ${i === 0 ? 'is-on' : ''}`}>{n}</span>
        ))}
      </aside>

      <div className="vx-board">
        <div className="vx-board-bar">
          <b>Operations Overview</b>
          <span className="vx-tag vx-tag--amber">Alcohol sales enabled</span>
          <span className="vx-tag vx-tag--navy">Socket connected</span>
        </div>

        <div className="vx-kpis">
          {kpis.map((k) => (
            <div key={k.label} className="vx-kpi">
              <span>{k.label}</span>
              <b>{k.value}</b>
              <em>{k.sub}</em>
            </div>
          ))}
        </div>

        <div className="vx-licence">
          <span className="vx-licence-copy">
            <b>Liquor &amp; alcoholic beverage regulatory licence switch</b>
            <em>Keep disabled until municipal liquor licence verification is active.</em>
          </span>
          <span className="vx-tag vx-tag--amber">Permit active</span>
          <span className="vx-switch" />
        </div>

        <div className="vx-stream">
          <span className="vx-stream-h">
            <b>Live orders stream</b>
            <em>Real-time customer orders flowing from the mobile app</em>
          </span>
          {liveOrders.map((o) => (
            <span key={o.id} className="vx-order-row">
              <b>{o.id}</b>
              <i>{o.who}</i>
              <i className="vx-drop">{o.drop}</i>
              <b className="vx-amt">{o.amount}</b>
              <em className={`vx-state vx-state--${o.state.toLowerCase()}`}>{o.state}</em>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------- phone screens */

function Splash() {
  return (
    <div className="vx-s vx-s--splash">
      <span className="vx-logo"><ValleyMark animated /></span>
      <b>Valley</b>
      <em>Express</em>
      <span className="vx-tagline">Fast to order. Fast to your door.</span>
      <span className="vx-cta">Sign In / Create Account →</span>
      <span className="vx-google"><i>G</i>Continue with Google</span>
    </div>
  )
}

const products = [
  { name: 'Tuborg Classic Pr…', price: 'Rs. 410', was: 'Rs. 451', sub: '650ml bottle' },
  { name: 'Gorkha Premium…', price: 'Rs. 380', was: 'Rs. 418', sub: '650ml bottle' },
]

function Home() {
  return (
    <div className="vx-s vx-s--home">
      <span className="vx-strip">● Happy Wednesday · <i>See what is on offer</i></span>
      <span className="vx-hello">
        <i className="vx-av">R</i>
        <span><b>Hello, Rijan</b><em>Craving midnight drinks &amp; snacks?</em></span>
      </span>
      <span className="vx-deliver">📍 Deliver to: Baluwatar, Kathmandu ⌄</span>
      <span className="vx-search">⌕ Search chilled beer, single malt, C-momos…</span>
      <span className="vx-cats">
        <i className="is-on">All Items</i><i>Chilled Beers</i><i>Spirits &amp; Rum</i>
      </span>
      <span className="vx-promo">
        <b>Midnight special</b>
        <em>Get Special Offers Up to 30% OFF</em>
        <i>Claim Deal ›</i>
      </span>
      <span className="vx-sec">Beers &amp; Ciders <i>See All (8)</i></span>
      <span className="vx-grid">
        {products.map((p) => (
          <span key={p.name} className="vx-prod">
            <i className="vx-prod-img"><b>18+</b></i>
            <b>{p.name}</b>
            <span className="vx-price">{p.price} <s>{p.was}</s></span>
            <em>{p.sub}</em>
          </span>
        ))}
      </span>
      <span className="vx-basket">
        <i>🛍</i>
        <span><b>1 Item in Basket</b><em>Kathmandu late night dispatch ready</em></span>
        <b className="vx-basket-amt">Rs. 410 ›</b>
      </span>
    </div>
  )
}

function MapPin() {
  return (
    <div className="vx-s vx-s--map">
      <span className="vx-search vx-search--map">← Search chowk, street or area in Nepal…</span>
      <span className="vx-cats vx-cats--map"><i>Google Maps ↗</i><i>Paste Maps Link</i></span>
      <span className="vx-canvas">
        <i className="vx-tiles" />
        <i className="vx-road vx-road--a" />
        <i className="vx-road vx-road--b" />
        <i className="vx-zone" />
        <b className="vx-bubble">Deliver here</b>
        <b className="vx-marker">📍</b>
      </span>
      <span className="vx-sheet">
        <span className="vx-addr">
          <i>📍</i>
          <span><b>Buddhi Sagar Marg, Panipokhari</b><em>Kathmandu-04 · 27.7312°N, 85.3317°E</em></span>
        </span>
        <span className="vx-note">House #42, Near Russian Embassy gate</span>
        <span className="vx-cta vx-cta--sm">Confirm Delivery Address</span>
        <span className="vx-osm">OpenFreeMap © OpenMapTiles · OpenStreetMap</span>
      </span>
    </div>
  )
}

const payments = [
  { name: 'Cash on Delivery (or Fonepay QR)', tag: 'Preferred', on: true },
  { name: 'eSewa Mobile Wallet', tag: 'Digital' },
  { name: 'Khalti Digital Wallet', tag: 'Digital' },
]

function Checkout() {
  return (
    <div className="vx-s vx-s--cart">
      <span className="vx-bar">← <b>Cart &amp; Checkout</b></span>
      <span className="vx-card">
        <span className="vx-card-h">Your items (1) <i>Clear All</i></span>
        <span className="vx-line"><b>Tuborg Classic Premium Strong (650ml)</b><i>− 1 +</i></span>
        <span className="vx-price">Rs. 410 × 1</span>
      </span>
      <span className="vx-card">
        <span className="vx-card-h">Delivery address <i>Edit on map</i></span>
        <span className="vx-line"><b>Smriti Marg, Thapathali</b></span>
        <em className="vx-sub">House #42, Near Russian Embassy gate</em>
      </span>
      <span className="vx-card vx-card--age">
        <i className="vx-check" />I verify I am 18+ years of age.
      </span>
      <span className="vx-card">
        <span className="vx-card-h">Payment method</span>
        {payments.map((p) => (
          <span key={p.name} className={`vx-pay ${p.on ? 'is-on' : ''}`}>
            {p.name}<i>{p.tag}</i>
          </span>
        ))}
      </span>
      <span className="vx-card vx-card--total">
        <span className="vx-line"><em>Subtotal</em><b>Rs. 410</b></span>
        <span className="vx-line"><em>Night Delivery Fee</em><b>Rs. 100</b></span>
        <span className="vx-line vx-line--grand"><em>Total Amount</em><b>Rs. 510</b></span>
      </span>
      <span className="vx-cta vx-cta--sm">Place Order • Rs. 510</span>
    </div>
  )
}

function Chat() {
  return (
    <div className="vx-s vx-s--chat">
      <span className="vx-bar vx-bar--chat">
        ←<i className="vx-av vx-av--shop">🛍</i>
        <span><b>Valley Dispatch &amp; Operations</b><em>● Online • Live Order Support</em></span>
      </span>
      <span className="vx-day">Today</span>
      <span className="vx-bubble-out">
        Hi admin, is my order processed?
        <i>You · 9:04 AM ✓</i>
      </span>
      <span className="vx-typing"><i /><i /><i /></span>
      <span className="vx-input">Message dispatch or rider…<i>➤</i></span>
    </div>
  )
}

/* ------------------------------------------------------------------ shell */

const screens = [
  { key: 'splash', label: 'Splash', Screen: Splash, ms: 2200 },
  { key: 'home', label: 'Storefront', Screen: Home, ms: 4200 },
  { key: 'map', label: 'Delivery pin', Screen: MapPin, ms: 3600 },
  { key: 'cart', label: 'Checkout', Screen: Checkout, ms: 4200 },
  { key: 'chat', label: 'Live dispatch', Screen: Chat, ms: 3200 },
]

export default function ValleyMock() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || reduceMotion()) return
    const t = setTimeout(() => setI((n) => (n + 1) % screens.length), screens[i].ms)
    return () => clearTimeout(t)
  }, [i, paused])

  return (
    <div className="vx-mock">
      <AdminBoard />

      <div className="vx-phone">
        <span className="vx-island" />
        <span className="vx-home" />
        <div className="vx-phone-screen">
          {screens.map(({ key, Screen }, n) => (
            <div key={key} className={`vx-pane ${n === i ? 'is-on' : ''}`}>
              <Screen />
            </div>
          ))}
        </div>
      </div>

      <div className="vx-dots" role="tablist" aria-label="Valley Express screens">
        {screens.map((s, n) => (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-label={s.label}
            className={n === i ? 'on' : ''}
            onClick={() => {
              setI(n)
              setPaused(true)
            }}
          />
        ))}
      </div>
    </div>
  )
}
