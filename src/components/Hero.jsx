import React from 'react'

function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left animate-slide-up">
            <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🌾 100% Fresh & Organic
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Fresh Farm Products
              <span className="block text-primary-600 mt-2">Delivered to Your Door</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto md:mx-0">
              Order directly from local farmers and get fresh, quality produce delivered straight to your doorstep. 
              Supporting local agriculture has never been easier!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#products" 
                className="bg-primary-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-primary-700 transition-all font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Shop Now 🛒
              </a>
              <a 
                href="#how-it-works" 
                className="bg-white text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-primary-600 hover:bg-primary-50 transition-all font-semibold text-base sm:text-lg"
              >
                How It Works
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-lg mx-auto md:mx-0">
              <div className="text-center md:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600">500+</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Happy Customers</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600">50+</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Farm Products</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600">100%</div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">Fresh & Organic</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Illustration */}
          <div className="relative animate-fade-in hidden md:block">
            <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl p-8 lg:p-12 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 lg:p-8">
                {/* Placeholder for product showcase */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 rounded-xl p-4 text-center">
                    <div className="text-4xl mb-2">🍅</div>
                    <div className="text-sm font-semibold text-gray-800">Fresh Tomatoes</div>
                  </div>
                  <div className="bg-accent-50 rounded-xl p-4 text-center">
                    <div className="text-4xl mb-2">🌾</div>
                    <div className="text-sm font-semibold text-gray-800">Premium Rice</div>
                  </div>
                  <div className="bg-accent-50 rounded-xl p-4 text-center">
                    <div className="text-4xl mb-2">🌶️</div>
                    <div className="text-sm font-semibold text-gray-800">Fresh Pepper</div>
                  </div>
                  <div className="bg-primary-50 rounded-xl p-4 text-center">
                    <div className="text-4xl mb-2">🥕</div>
                    <div className="text-sm font-semibold text-gray-800">Vegetables</div>
                  </div>
                </div>
                
                {/* Delivery Badge */}
                <div className="mt-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="font-semibold">Same-Day Delivery Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              Free Delivery!
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
