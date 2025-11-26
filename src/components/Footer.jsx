import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Akanbi Farm Hub</h3>
            <p className="text-gray-400">
              Connecting local farmers with customers for fresh, quality produce.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">
              Email: olafolafunmi7@gmail.com<br />
              Phone: +234 813 311 6238<br />
              WhatsApp: +234 902 831 4344
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <p className="text-gray-400">
              Monday - Friday: 8am - 6pm<br />
              Saturday: 9am - 4pm<br />
              Sunday: Closed
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} Akanbi Farm Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
