# API Documentation - Akanbi Farm Hub

## Base URL

- **Local Development**: `http://localhost:8888/api`
- **Production**: `https://your-site.netlify.app/api`

## Endpoints

### GET /api/products

Fetch all products from Google Sheets.

**Request:**
```http
GET /api/products
```

**Response (200 OK):**
```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "dateAdded": "2025-11-25",
      "productName": "Fresh Tomatoes",
      "supplierName": "Farmer John",
      "cost": 500,
      "salePrice": 800,
      "margin": "37.5%",
      "notes": "Organic, locally grown"
    }
  ],
  "count": 1
}
```

**Error Response (500):**
```json
{
  "error": "Failed to fetch products",
  "message": "Error details here"
}
```

---

### POST /api/orders

Submit a new order.

**Request:**
```http
POST /api/orders
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "+2348012345678",
  "quantity": 5,
  "address": "123 Main Street, Lagos",
  "productName": "Fresh Tomatoes",
  "supplierName": "Farmer John",
  "salePrice": 800
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "orderId": "2025-11-25T10:30:00.000Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Missing required fields"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "error": "Failed to process order",
  "message": "Error details here"
}
```

---

## Data Models

### Product

```typescript
{
  id: number;              // Auto-generated row number
  dateAdded: string;       // ISO date string
  productName: string;     // Name of the product
  supplierName: string;    // Supplier/farmer name
  cost: number;            // Cost price in NGN
  salePrice: number;       // Selling price in NGN
  margin: string;          // Profit margin percentage
  notes: string;           // Additional product notes
}
```

### Order

```typescript
{
  name: string;           // Customer full name
  phone: string;          // Customer phone number
  quantity: number;       // Quantity ordered (kg/derica)
  address: string;        // Delivery address
  productName: string;    // Product being ordered
  supplierName: string;   // Product supplier
  salePrice: number;      // Price per unit
}
```

---

## WhatsApp Notification Format

When an order is placed, the admin receives a WhatsApp message:

```
🌾 *New Order - Akanbi Farm Hub*

📦 Product: Fresh Tomatoes
🏪 Supplier: Farmer John
📊 Quantity: 5 kg/derica
💰 Total: ₦4000

👤 Customer: John Doe
📱 Phone: +2348012345678
📍 Address: 123 Main Street, Lagos

⏰ Ordered at: 11/25/2025, 10:30:00 AM
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider:
- Adding rate limiting middleware
- Implementing CAPTCHA for order forms
- Setting up monitoring alerts

---

## CORS Policy

All endpoints include CORS headers:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type`

---

## Error Handling

All errors return appropriate HTTP status codes:
- `200`: Success
- `400`: Bad Request (invalid input)
- `405`: Method Not Allowed
- `500`: Internal Server Error

Error response always includes:
```json
{
  "error": "Brief error description",
  "message": "Detailed error message"
}
```

---

## Authentication

Currently no authentication is required. For production, consider:
- API keys for backend access
- User authentication for order tracking
- Admin dashboard with login

---

## Testing the API

### Using cURL

**Get Products:**
```bash
curl http://localhost:8888/api/products
```

**Place Order:**
```bash
curl -X POST http://localhost:8888/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+2348012345678",
    "quantity": 2,
    "address": "Test Address",
    "productName": "Fresh Tomatoes",
    "supplierName": "Farmer John",
    "salePrice": 800
  }'
```

### Using JavaScript (Fetch API)

**Get Products:**
```javascript
fetch('/api/products')
  .then(res => res.json())
  .then(data => console.log(data.products))
  .catch(err => console.error(err));
```

**Place Order:**
```javascript
fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    phone: '+2348012345678',
    quantity: 5,
    address: '123 Main Street',
    productName: 'Fresh Tomatoes',
    supplierName: 'Farmer John',
    salePrice: 800
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

For more information, see the main README.md
