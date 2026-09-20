import Navbar from '../components/Navbar'
import '../styles/Support.css'

export default function Support() {
  return (
    <div className="support-page">
      <Navbar />
      <div className="support-container">
        <h1 className="support-title">How can we help?</h1>
        <p className="support-subtitle">
          We're here to assist you with any questions about our products or your order.
        </p>
        
        <div className="contact-card">
          <div className="contact-icon">✉️</div>
          <h2>Email Us</h2>
          <p>Drop us a line anytime. We typically respond within 24 hours.</p>
          <a href="mailto:unendless.global@gmail.com" className="email-link">
            unendless.global@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}
