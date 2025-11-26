import React from 'react'

function Header() {
  return (
    <header className="bg-primary-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg 
              className="w-10 h-10" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
            <div>
              <h1 className="text-2xl font-bold">Akanbi Farm Hub</h1>
              <p className="text-sm text-primary-100">Fresh from Farm to Table</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#products" className="hover:text-primary-100 transition-colors">
              Products
            </a>
            <a href="#about" className="hover:text-primary-100 transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-primary-100 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
