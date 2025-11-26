# Quick Start Guide - Akanbi Farm Hub

Get your farm-to-table app running in 30 minutes!

## Step 1: Google Sheets (5 minutes)

1. Create spreadsheet: https://sheets.google.com
2. Name it: "Akanbi Farm Hub Database"
3. Create "Products" sheet with headers:
   ```
   Date Added | Product Name | Supplier Name | Cost | Sale Price | Margin | Notes
   ```
4. Create "Orders" sheet with headers:
   ```
   Timestamp | Customer Name | Phone | Product | Supplier | Quantity | Unit Price | Total | Address | Status
   ```
5. Add a test product (e.g., Fresh Tomatoes, Farmer John, 500, 800)

## Step 2: Google Cloud Setup (10 minutes)

1. Go to: https://console.cloud.google.com
2. Create new project: "AkanbiFarmHub"
3. Enable Google Sheets API
4. Create Service Account:
   - Name: akanbifarmhub-service
   - Role: Editor
5. Create & download JSON key
6. Copy the `client_email` from JSON
7. Share your spreadsheet with this email

## Step 3: Twilio Setup (5 minutes)

1. Sign up: https://www.twilio.com/try-twilio
2. Go to: Console → Messaging → Try WhatsApp
3. Send join message to Twilio number
4. Note: Account SID, Auth Token, WhatsApp number

## Step 4: Local Setup (5 minutes)

```bash
# Clone/download project
cd Akanbifarmhub

# Install dependencies
npm install
cd netlify/functions
npm install
cd ../..

# Create environment file
cp .env.example .env

# Edit .env with your credentials
# (Use notepad or any text editor)
```

## Step 5: Test Locally (3 minutes)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start development server
netlify dev
```

Visit: http://localhost:8888

Test:
- Products should load from your sheet
- Try placing an order
- Check if WhatsApp notification arrives

## Step 6: Deploy (2 minutes)

```bash
# Login to Netlify
netlify login

# Deploy
netlify init
netlify deploy --prod
```

Add environment variables in Netlify dashboard!

## 🎉 Done!

Your app is live! Share the Netlify URL with customers.

## Next Steps

- Add custom domain (akanbifarmhub.ng)
- Add more products to Google Sheets
- Customize colors in tailwind.config.js
- Add your branding/logo

## Need Help?

Check README.md for detailed instructions or troubleshooting guide.
