import React, { useState } from 'react'
import OrderForm from './OrderForm'

function ProductCard({ product }) {
  const [showOrderForm, setShowOrderForm] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price)
  }

  const calculateMargin = () => {
    if (product.cost && product.salePrice) {
      const margin = ((product.salePrice - product.cost) / product.salePrice) * 100
      return margin.toFixed(1)
    }
    return product.margin || 'N/A'
  }

  return (
    <>
      <div className="card">
        <div className="bg-primary-100 p-8 flex items-center justify-center">
          <svg 
            className="w-24 h-24 text-primary-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
            />
          </svg>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {product.productName}
            </h3>
            <p className="text-sm text-gray-500">
              Supplier: {product.supplierName}
            </p>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price:</span>
              <span className="text-2xl font-bold text-primary-600">
                {formatPrice(product.salePrice)}
              </span>
            </div>
            
            {product.cost && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Cost:</span>
                <span className="text-gray-700">
                  {formatPrice(product.cost)}
                </span>
              </div>
            )}
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Margin:</span>
              <span className="text-green-600 font-semibold">
                {calculateMargin()}%
              </span>
            </div>
          </div>

          {product.notes && (
            <p className="text-sm text-gray-600 mb-4 italic">
              {product.notes}
            </p>
          )}

          <button
            onClick={() => setShowOrderForm(true)}
            className="btn-primary w-full"
          >
            Order Now
          </button>

          {product.dateAdded && (
            <p className="text-xs text-gray-400 mt-3 text-center">
              Added: {new Date(product.dateAdded).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {showOrderForm && (
        <OrderForm
          product={product}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </>
  )
}

export default ProductCard
