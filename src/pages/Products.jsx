import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Fuse from 'fuse.js'
import '../styles/Products.css'

const PRODUCTS_DATA = [
  { id: 'instagram', name: 'Instagram QR Stand', price: 199, img: '/assets/instagram.jpg' },
  { id: 'whatsapp', name: 'WhatsApp QR Stand', price: 199, img: '/assets/whatsapp.jpg' },
  { id: 'google-reviews', name: 'Google Reviews QR Stand', price: 199, img: '/assets/google.jpg' },
  { id: 'customised', name: 'Customised QR Stand', price: 199, img: '/assets/custom.jpg' }
]

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('')

  const fuse = useMemo(() => new Fuse(PRODUCTS_DATA, {
    keys: ['name'],
    threshold: 0.4, // Allows slight misspellings
  }), [])

  const filteredProducts = searchTerm 
    ? fuse.search(searchTerm).map(result => result.item)
    : PRODUCTS_DATA

  return (
    <div className="products-page">
      <Navbar searchElement={
        <div className="search-bar-container">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      } />
      
      <div className="products-container">
        <div className="products-grid">
          {filteredProducts.map(product => (
            <Link to={`/products/${product.id}`} key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.img} alt={product.name} className="product-image" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-price">₹{product.price}</span>
              </div>
            </Link>
          ))}
          {filteredProducts.length === 0 && (
            <div className="no-results">No products found.</div>
          )}
        </div>
      </div>
    </div>
  )
}
