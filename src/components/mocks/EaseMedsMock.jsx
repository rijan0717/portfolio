import { useEffect, useState } from 'react'

// A partial React recreation of the Ease-meds PHP app: the customer storefront
// and the admin dashboard, alternating like a short demo.
const medicines = [
  { name: 'Calamine', cat: 'Skin care', title: 'Calamine Lotion', price: '120.00', color: '#9b59b6' },
  { name: 'Eye Drops', cat: 'Eye care', title: 'Refresh Eye Drops', price: '280.00', color: '#1abc9c' },
  { name: 'Antacid', cat: 'Digestive', title: 'Antacid Suspension', price: '85.00', color: '#3498db' },
  { name: 'Vitamin D3', cat: 'Supplement', title: 'Vitamin D3 1000IU', price: '350.00', color: '#f39c12' },
]

const stats = [
  { label: 'Total Users', value: '12', color: '#13b38b' },
  { label: 'Total Orders', value: '2', color: '#1e88e5' },
  { label: 'Prescriptions', value: '3', color: '#ec4899' },
  { label: 'Medicines', value: '14', color: '#1e88e5' },
]

const orders = [
  { id: '#2', user: 'Rijan Admin', total: 'Rs. 180.00', status: 'Cancelled' },
  { id: '#1', user: 'Rijan Admin', total: 'Rs. 320.00', status: 'Confirmed' },
]

const Heart = () => (
  <svg viewBox="0 0 24 24" className="em-heart" aria-hidden="true">
    <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.4h2c.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.8 4.3 7.2C19.5 16.4 12 21 12 21z" fill="currentColor" />
    <path d="M5 12h3.5l1.5-3 2.5 6 1.5-3H19" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
)

function Storefront() {
  return (
    <div className="em-store">
      <div className="em-nav">
        <span className="em-logo"><Heart /> Ease Meds</span>
        <span className="em-links"><i>Medicine</i><i>Doctors</i><i>Add Prescription</i><i>Cart</i></span>
        <span className="em-pill">Logout</span>
      </div>
      <div className="em-hero">
        <h4>Your Health, Delivered.</h4>
        <p>Order genuine medicines and healthcare products from the comfort of your home.</p>
        <span className="em-cta">Order Medicine Now</span>
      </div>
      <h5 className="em-title">Featured Medicines</h5>
      <div className="em-meds">
        {medicines.map((m) => (
          <div key={m.name} className="em-med">
            <span className="em-med-img" style={{ background: m.color }}>{m.name}</span>
            <span className="em-med-body">
              <em>{m.cat}</em>
              <b>{m.title}</b>
              <strong>Rs. {m.price}</strong>
              <span className="em-add">Add to Cart</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Admin() {
  return (
    <div className="em-admin">
      <aside className="em-side">
        <span className="em-logo em-logo--side"><Heart /> Ease Meds</span>
        {['Dashboard', 'Orders', 'Medicines', 'Doctors', 'Users', 'Prescriptions', 'Coupons'].map((l, i) => (
          <span key={l} className={`em-side-link ${i === 0 ? 'on' : ''}`}>{l}</span>
        ))}
      </aside>
      <div className="em-main">
        <h4>Dashboard</h4>
        <div className="em-stats">
          {stats.map((s) => (
            <span key={s.label} className="em-stat">
              <em>{s.label}</em>
              <b style={{ color: s.color }}>{s.value}</b>
            </span>
          ))}
        </div>
        <div className="em-table">
          <div className="em-table-head">
            <b>Recent Orders</b>
            <span className="em-pill em-pill--sq">View All Orders</span>
          </div>
          <div className="em-row em-row--head"><i>ID</i><i>User</i><i>Total</i><i>Status</i></div>
          {orders.map((o) => (
            <div key={o.id} className="em-row">
              <i>{o.id}</i><i>{o.user}</i><i>{o.total}</i>
              <i><span className={`em-status em-status--${o.status.toLowerCase()}`}>{o.status}</span></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function EaseMedsMock() {
  const [view, setView] = useState('store')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setView((v) => (v === 'store' ? 'admin' : 'store')), 4200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="em-mock" aria-hidden="true">
      <div className={`em-pane ${view === 'store' ? 'is-on' : ''}`}><Storefront /></div>
      <div className={`em-pane ${view === 'admin' ? 'is-on' : ''}`}><Admin /></div>
      <span className="em-view-tag">{view === 'store' ? 'Customer storefront' : 'Admin panel'}</span>
    </div>
  )
}
