import { google } from 'googleapis'
import twilio from 'twilio'

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID
const ORDERS_SHEET_NAME = process.env.ORDERS_SHEET_NAME || 'Orders'

// Twilio credentials
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER // e.g., whatsapp:+14155238886
const ADMIN_PHONE = process.env.ADMIN_PHONE // e.g., whatsapp:+234XXXXXXXXXX

// Initialize Google Sheets API for read/write
const getGoogleSheetsClient = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const authClient = await auth.getClient()
  return google.sheets({ version: 'v4', auth: authClient })
}

// Send WhatsApp notification via Twilio
const sendWhatsAppNotification = async (orderDetails) => {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    console.warn('Twilio credentials not configured, skipping WhatsApp notification')
    return
  }

  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

  const message = `🌾 *New Order - Akanbi Farm Hub*

📦 Product: ${orderDetails.productName}
🏪 Supplier: ${orderDetails.supplierName}
📊 Quantity: ${orderDetails.quantity} kg/derica
💰 Total: ₦${orderDetails.total}

👤 Customer: ${orderDetails.name}
📱 Phone: ${orderDetails.phone}
📍 Address: ${orderDetails.address}

⏰ Ordered at: ${orderDetails.timestamp}`

  try {
    await client.messages.create({
      from: TWILIO_FROM_NUMBER,
      to: ADMIN_PHONE,
      body: message,
    })
    console.log('WhatsApp notification sent successfully')
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error)
    // Don't throw error - order should still be saved even if notification fails
  }
}

export const handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const orderData = JSON.parse(event.body)

    // Validate required fields
    const { name, phone, quantity, address, productName, supplierName, salePrice } = orderData

    if (!name || !phone || !quantity || !address || !productName) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      }
    }

    const timestamp = new Date().toISOString()
    const total = (parseFloat(salePrice) * parseInt(quantity)).toFixed(2)

    // Prepare row data for Google Sheets
    // Columns: Timestamp, Customer Name, Phone, Product, Supplier, Quantity, Unit Price, Total, Address, Status
    const rowData = [
      timestamp,
      name,
      phone,
      productName,
      supplierName || '',
      quantity,
      salePrice,
      total,
      address,
      'Pending'
    ]

    // Append to Google Sheets
    const sheets = await getGoogleSheetsClient()
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${ORDERS_SHEET_NAME}!A:J`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    })

    // Send WhatsApp notification
    await sendWhatsAppNotification({
      name,
      phone,
      quantity,
      address,
      productName,
      supplierName,
      total,
      timestamp: new Date(timestamp).toLocaleString(),
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Order placed successfully',
        orderId: timestamp,
      }),
    }
  } catch (error) {
    console.error('Error processing order:', error)
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to process order',
        message: error.message,
      }),
    }
  }
}
