import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function ProductDetail() {
  const { id } = useParams()

  return (
    <div style={{ paddingTop: '80px', padding: '2rem 4vw', minHeight: '100vh', background: '#d2d2d7' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textTransform: 'capitalize' }}>
          {id.replace('-', ' ')} QR Stand
        </h1>
        <p style={{ color: '#8a837a', marginBottom: '2rem' }}>Detailed view for this product is coming soon.</p>
        <Link to="/products" style={{ 
          display: 'inline-block', 
          padding: '0.75rem 1.5rem', 
          background: '#24221f', 
          color: 'white', 
          borderRadius: '50px', 
          textDecoration: 'none',
          fontWeight: 500
        }}>
          Back to Products
        </Link>
      </div>
    </div>
  )
}
