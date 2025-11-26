// ALTERNATIVE BACKEND OPTION: Google Apps Script
// This can be used instead of Netlify Functions if you prefer a simpler setup
// Deploy this as a Web App from Google Apps Script editor

// Configuration
const TWILIO_ACCOUNT_SID = 'your_account_sid';
const TWILIO_AUTH_TOKEN = 'your_auth_token';
const TWILIO_FROM_NUMBER = 'whatsapp:+14155238886';
const ADMIN_PHONE = 'whatsapp:+234XXXXXXXXXX';
const PRODUCTS_SHEET_NAME = 'Products';
const ORDERS_SHEET_NAME = 'Orders';

/**
 * Handle GET requests - Return products
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(PRODUCTS_SHEET_NAME);
    
    // Get all data (skip header row)
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    // Transform to JSON
    const products = rows.map((row, index) => ({
      id: index + 1,
      dateAdded: row[0],
      productName: row[1],
      supplierName: row[2],
      cost: parseFloat(row[3]) || 0,
      salePrice: parseFloat(row[4]) || 0,
      margin: row[5],
      notes: row[6]
    })).filter(p => p.productName); // Filter empty rows
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        products: products,
        count: products.length
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        error: 'Failed to fetch products',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle POST requests - Create order
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.phone || !data.quantity || !data.address || !data.productName) {
      return ContentService
        .createTextOutput(JSON.stringify({
          error: 'Missing required fields'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const timestamp = new Date();
    const total = (parseFloat(data.salePrice) * parseInt(data.quantity)).toFixed(2);
    
    // Save to Orders sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ordersSheet = ss.getSheetByName(ORDERS_SHEET_NAME);
    
    ordersSheet.appendRow([
      timestamp,
      data.name,
      data.phone,
      data.productName,
      data.supplierName || '',
      data.quantity,
      data.salePrice,
      total,
      data.address,
      'Pending'
    ]);
    
    // Send WhatsApp notification
    sendWhatsAppNotification({
      name: data.name,
      phone: data.phone,
      quantity: data.quantity,
      address: data.address,
      productName: data.productName,
      supplierName: data.supplierName,
      total: total,
      timestamp: timestamp.toLocaleString()
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Order placed successfully',
        orderId: timestamp.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        error: 'Failed to process order',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send WhatsApp notification via Twilio
 */
function sendWhatsAppNotification(orderDetails) {
  const message = `🌾 *New Order - Akanbi Farm Hub*

📦 Product: ${orderDetails.productName}
🏪 Supplier: ${orderDetails.supplierName}
📊 Quantity: ${orderDetails.quantity} kg/derica
💰 Total: ₦${orderDetails.total}

👤 Customer: ${orderDetails.name}
📱 Phone: ${orderDetails.phone}
📍 Address: ${orderDetails.address}

⏰ Ordered at: ${orderDetails.timestamp}`;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  
  const payload = {
    'From': TWILIO_FROM_NUMBER,
    'To': ADMIN_PHONE,
    'Body': message
  };
  
  const options = {
    'method': 'post',
    'payload': payload,
    'headers': {
      'Authorization': 'Basic ' + Utilities.base64Encode(TWILIO_ACCOUNT_SID + ':' + TWILIO_AUTH_TOKEN)
    }
  };
  
  try {
    UrlFetchApp.fetch(url, options);
    Logger.log('WhatsApp notification sent successfully');
  } catch (error) {
    Logger.log('Error sending WhatsApp: ' + error.toString());
    // Don't throw error - order should still be saved
  }
}

/**
 * Test function to verify setup
 */
function testSetup() {
  Logger.log('Testing Google Apps Script setup...');
  
  // Test getting products
  const getResult = doGet({});
  Logger.log('GET /products result: ' + getResult.getContent());
  
  // Test creating order
  const testOrder = {
    postData: {
      contents: JSON.stringify({
        name: 'Test Customer',
        phone: '+2348012345678',
        quantity: 2,
        address: 'Test Address',
        productName: 'Test Product',
        supplierName: 'Test Supplier',
        salePrice: 1000
      })
    }
  };
  
  const postResult = doPost(testOrder);
  Logger.log('POST /orders result: ' + postResult.getContent());
}
