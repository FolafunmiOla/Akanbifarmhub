import React, { useState, useEffect } from 'react'
import ProductList from './components/ProductList'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Features from './components/Features'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/products')
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      
      const data = await response.json()
      setProducts(data.products || [])
    } catch (err) {
      console.error('Error fetching products:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <Features />

        {/* Products Section */}
        <section id="products" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Our Fresh Products
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                  Browse our selection of fresh, locally-sourced farm products
                </p>
              </div>

              {loading && (
                <div className="flex justify-center items-center py-20">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="text-primary-600 font-semibold text-sm">Loading...</div>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 max-w-2xl mx-auto shadow-sm">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-lg">Error loading products</p>
                      <p className="mt-1">{error}</p>
                      <button 
                        onClick={fetchProducts}
                        className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!loading && !error && products.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                  <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p className="text-gray-500 text-lg mb-2">No products available at the moment</p>
                  <p className="text-gray-400 text-sm">Check back soon for fresh arrivals!</p>
                </div>
              )}

              {!loading && !error && products.length > 0 && (
                <ProductList products={products} />
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Getting fresh farm products delivered is easy as 1-2-3
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold shadow-lg">
                  1
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Browse Products</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Choose from our fresh selection of locally-sourced farm products
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-accent-500 to-accent-600 text-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold shadow-lg">
                  2
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Place Your Order</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Select quantity, choose delivery time, and confirm your order
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold shadow-lg">
                  3
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Get Delivered</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Receive fresh products at your doorstep. Same-day delivery available!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/CTA Section */}
        <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Get Fresh Farm Products?
            </h2>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90">
              Start ordering today and experience the freshness of locally-sourced produce
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#products" 
                className="bg-white text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gray-100 transition-all font-semibold text-base sm:text-lg shadow-xl"
              >
                Start Shopping
              </a>
              <a 
                href="tel:+2349028314344" 
                className="bg-transparent text-white border-2 border-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white hover:text-primary-600 transition-all font-semibold text-base sm:text-lg"
              >
                Call Us: +234 813 311 6238
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
