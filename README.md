# 🌾 Akanbi Farm Hub

A modern farm-to-table ordering web application built with React, Vite, and Netlify Functions. This app connects local farmers with customers, using Google Sheets as a headless CMS and Twilio for WhatsApp notifications.

## 🚀 Features

- **Product Catalog**: Display fresh farm products from Google Sheets
- **Real-time Ordering**: Simple order form with customer details
- **WhatsApp Notifications**: Instant order alerts via Twilio
- **Auto-calculated Margins**: Track profitability on each product
- **Responsive Design**: Beautiful UI with Tailwind CSS
- **Serverless Backend**: Netlify Functions for scalable API

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Google account (for Google Sheets)
- A Twilio account (free sandbox for testing)
- A GitHub account (for deployment)
- A Netlify account (free tier)

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd Akanbifarmhub
npm install
cd netlify/functions
npm install
cd ../..
```

### 2. Google Sheets Setup

#### Create Your Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Akanbi Farm Hub Database"
3. Create two sheets:

**Sheet 1: Products**
| Date Added | Product Name | Supplier Name | Cost (per kg/derica) | Sale Price | Margin | Notes |
|------------|--------------|---------------|----------------------|------------|--------|-------|
| 2025-11-25 | Fresh Tomatoes | Farmer John | 500 | 800 | 37.5% | Organic |
| 2025-11-25 | White Rice | Rice Mills | 1200 | 1800 | 33.3% | Premium quality |

**Sheet 2: Orders**
| Timestamp | Customer Name | Phone | Product | Supplier | Quantity | Unit Price | Total | Address | Status |
|-----------|---------------|-------|---------|----------|----------|------------|-------|---------|--------|

4. Note your Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```

#### Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

#### Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - Name: `akanbifarmhub-service`
   - Role: `Editor`
4. Click "Done"
5. Click on the created service account
6. Go to "Keys" tab > "Add Key" > "Create New Key"
7. Choose JSON format and download the key file
8. **Important**: Open the JSON file and note:
   - `client_email`
   - `private_key`

#### Share Spreadsheet with Service Account

1. Open your Google Spreadsheet
2. Click "Share" button
3. Add the service account email (from JSON file)
4. Give "Editor" permission
5. Click "Send"

### 3. Twilio WhatsApp Sandbox Setup

#### Create Twilio Account

1. Sign up at [Twilio](https://www.twilio.com/try-twilio)
2. Get your free trial account

#### Configure WhatsApp Sandbox

1. Go to Twilio Console
2. Navigate to "Messaging" > "Try it out" > "Send a WhatsApp message"
3. Follow instructions to join your sandbox:
   - Send the given code (e.g., "join <word>-<word>") to the Twilio WhatsApp number
4. Note the following from your Twilio Console:
   - Account SID
   - Auth Token
   - WhatsApp Sandbox Number (e.g., `whatsapp:+14155238886`)

5. **Important**: Add your admin phone number in WhatsApp format:
   - Format: `whatsapp:+234XXXXXXXXXX` (for Nigerian numbers)
   - Example: `whatsapp:+2348012345678`

### 4. Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:

```env
# Google Sheets Configuration
GOOGLE_SPREADSHEET_ID=1abc123def456ghi789jkl
GOOGLE_SERVICE_ACCOUNT_EMAIL=akanbifarmhub-service@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...\n-----END PRIVATE KEY-----\n"
PRODUCTS_SHEET_NAME=Products
ORDERS_SHEET_NAME=Orders

# Twilio Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_FROM_NUMBER=whatsapp:+14155238886
ADMIN_PHONE=whatsapp:+2348012345678

# Frontend Configuration
VITE_API_URL=http://localhost:8888
```

**⚠️ Security Note**: Never commit `.env` to Git!

## 🖥️ Local Development

### Start Development Server

```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start Netlify Functions locally
netlify dev
```

The app will be available at `http://localhost:3000`

### Test the API Endpoints

- Products: `http://localhost:8888/api/products`
- Orders: `http://localhost:8888/api/orders` (POST)

## 🚢 Deployment

### Deploy to Netlify

#### Option 1: Netlify CLI (Recommended)

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize your site:
```bash
netlify init
```

4. Set environment variables:
```bash
netlify env:set GOOGLE_SPREADSHEET_ID "your_spreadsheet_id"
netlify env:set GOOGLE_SERVICE_ACCOUNT_EMAIL "your-service-account@project.iam.gserviceaccount.com"
netlify env:set GOOGLE_PRIVATE_KEY "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
netlify env:set PRODUCTS_SHEET_NAME "Products"
netlify env:set ORDERS_SHEET_NAME "Orders"
netlify env:set TWILIO_ACCOUNT_SID "ACxxxxxx"
netlify env:set TWILIO_AUTH_TOKEN "your_token"
netlify env:set TWILIO_FROM_NUMBER "whatsapp:+14155238886"
netlify env:set ADMIN_PHONE "whatsapp:+234XXXXXXXXXX"
```

5. Deploy:
```bash
netlify deploy --prod
```

#### Option 2: GitHub Integration

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Choose GitHub and select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

6. Add environment variables in Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add all variables from your `.env` file

7. Click "Deploy site"

### Custom Domain Setup (Akanbifarmhub.ng)

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter: `akanbifarmhub.ng`
4. Follow DNS configuration instructions:
   - Add A record pointing to Netlify's IP
   - Or add CNAME record for `www` subdomain

5. Configure DNS at your domain registrar:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

6. Wait for DNS propagation (up to 48 hours)
7. Enable HTTPS (automatic with Netlify)

## 📱 Testing WhatsApp Notifications

1. Add a product to your Google Sheet
2. Visit your deployed site
3. Click "Order Now" on a product
4. Fill in the order form with your phone number
5. Submit the order
6. Check your WhatsApp (admin phone) for the notification

**Sandbox Limitations**:
- Only works with numbers that joined your sandbox
- Message template limited
- For production, verify your Twilio account and get a dedicated WhatsApp number

## 📊 Project Structure

```
Akanbifarmhub/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductCard.jsx
│   │   └── OrderForm.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── netlify/
│   └── functions/
│       ├── products.js      # GET /api/products
│       ├── orders.js        # POST /api/orders
│       └── package.json
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── netlify.toml
└── .env.example
```

## 🎨 Customization

### Update Colors

Edit `tailwind.config.js` to change the primary color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors here
      }
    }
  }
}
```

### Modify Product Fields

1. Update Google Sheet columns
2. Modify `netlify/functions/products.js` to map new columns
3. Update `ProductCard.jsx` to display new fields

### Add More Features

- Payment integration (Paystack, Flutterwave)
- User authentication
- Order tracking
- Admin dashboard
- Email notifications
- Image uploads for products

## 🐛 Troubleshooting

### Products Not Loading

1. Check Google Sheets API is enabled
2. Verify service account has access to spreadsheet
3. Check environment variables are set correctly
4. Look at Netlify function logs

### WhatsApp Notifications Not Working

1. Verify you joined the Twilio sandbox
2. Check admin phone number format (`whatsapp:+234...`)
3. Verify Twilio credentials
4. Check Netlify function logs for errors

### Build Errors

1. Ensure all dependencies are installed:
```bash
npm install
cd netlify/functions && npm install
```

2. Clear cache:
```bash
rm -rf node_modules dist .netlify
npm install
```

## 📄 License

MIT License - feel free to use this project for your farm or business!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Email: olafolafunmi7@gmail.com
- WhatsApp: +234 902 831 4344

---

Built with ❤️ for Nigerian farmers and customers
