import { google } from 'googleapis'

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID
const PRODUCTS_SHEET_NAME = process.env.PRODUCTS_SHEET_NAME || 'Products'

// Initialize Google Sheets API
const getGoogleSheetsClient = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const authClient = await auth.getClient()
  return google.sheets({ version: 'v4', auth: authClient })
}

export const handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  }

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    }
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const sheets = await getGoogleSheetsClient()

    // Fetch data from the Products sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${PRODUCTS_SHEET_NAME}!A2:G`, // Assuming headers in row 1
    })

    const rows = response.data.values || []

    // Transform rows into product objects
    // Expected columns: Date Added, Product Name, Supplier Name, Cost, Sale Price, Margin, Notes
    const products = rows.map((row, index) => ({
      id: index + 1,
      dateAdded: row[0] || '',
      productName: row[1] || '',
      supplierName: row[2] || '',
      cost: parseFloat(row[3]) || 0,
      salePrice: parseFloat(row[4]) || 0,
      margin: row[5] || '',
      notes: row[6] || '',
    }))

    // Filter out empty rows
    const validProducts = products.filter(p => p.productName)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        products: validProducts,
        count: validProducts.length,
      }),
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch products',
        message: error.message,
      }),
    }
  }
}
