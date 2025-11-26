# Akanbi Farm Hub - Setup Checklist

## ✅ Pre-Deployment Checklist

### Google Sheets Setup
- [ ] Created Google Spreadsheet with two sheets (Products, Orders)
- [ ] Added column headers to Products sheet
- [ ] Added column headers to Orders sheet
- [ ] Added at least one test product
- [ ] Noted the Spreadsheet ID from URL
- [ ] Created Google Cloud Project
- [ ] Enabled Google Sheets API
- [ ] Created Service Account
- [ ] Downloaded Service Account JSON key
- [ ] Shared spreadsheet with service account email

### Twilio Setup
- [ ] Created Twilio account
- [ ] Joined WhatsApp Sandbox (sent join message)
- [ ] Noted Account SID
- [ ] Noted Auth Token
- [ ] Noted WhatsApp Sandbox number
- [ ] Formatted admin phone number correctly (whatsapp:+234...)

### Local Development
- [ ] Installed Node.js 18+
- [ ] Cloned/created project
- [ ] Ran `npm install` in root directory
- [ ] Ran `npm install` in netlify/functions directory
- [ ] Created `.env` file from `.env.example`
- [ ] Added all environment variables to `.env`
- [ ] Tested local dev server (`npm run dev`)
- [ ] Tested Netlify functions locally (`netlify dev`)
- [ ] Verified products load from Google Sheets
- [ ] Tested order submission
- [ ] Received test WhatsApp notification

### GitHub Setup
- [ ] Created GitHub repository
- [ ] Initialized git (`git init`)
- [ ] Added remote (`git remote add origin <url>`)
- [ ] Committed initial code
- [ ] Pushed to GitHub (`git push -u origin main`)

### Netlify Deployment
- [ ] Created Netlify account
- [ ] Connected GitHub repository
- [ ] Configured build settings (build command, publish dir)
- [ ] Added all environment variables in Netlify dashboard
- [ ] Deployed site successfully
- [ ] Verified products load on deployed site
- [ ] Tested order submission on deployed site
- [ ] Received WhatsApp notification from deployed site

### Domain Setup (Optional)
- [ ] Purchased domain (akanbifarmhub.ng)
- [ ] Added custom domain in Netlify
- [ ] Configured DNS records at registrar
- [ ] Waited for DNS propagation
- [ ] Enabled HTTPS
- [ ] Verified site loads on custom domain

## 🔍 Testing Checklist

### Frontend Tests
- [ ] Products display correctly
- [ ] Loading spinner shows while fetching
- [ ] Error message shows if API fails
- [ ] Product cards show all information
- [ ] Margin calculation is correct
- [ ] "Order Now" button opens modal
- [ ] Order form validates required fields
- [ ] Order form submits successfully
- [ ] Success message displays after order
- [ ] Modal closes after successful order
- [ ] Responsive design works on mobile

### Backend Tests
- [ ] `/api/products` returns product list
- [ ] Products match Google Sheets data
- [ ] `/api/orders` accepts POST requests
- [ ] Orders are saved to Google Sheets
- [ ] WhatsApp notification is sent
- [ ] Error handling works correctly
- [ ] CORS headers are set properly

## 📝 Environment Variables Reference

```env
GOOGLE_SPREADSHEET_ID=           # From Google Sheets URL
GOOGLE_SERVICE_ACCOUNT_EMAIL=    # From service account JSON
GOOGLE_PRIVATE_KEY=              # From service account JSON
PRODUCTS_SHEET_NAME=Products     # Name of products sheet
ORDERS_SHEET_NAME=Orders         # Name of orders sheet
TWILIO_ACCOUNT_SID=              # From Twilio dashboard
TWILIO_AUTH_TOKEN=               # From Twilio dashboard
TWILIO_FROM_NUMBER=              # whatsapp:+14155238886
ADMIN_PHONE=                     # whatsapp:+234XXXXXXXXXX
```

## 🚨 Common Issues

### Issue: Products not loading
**Solution**: Check service account has access to spreadsheet

### Issue: WhatsApp not sending
**Solution**: Verify admin phone joined Twilio sandbox

### Issue: Build fails on Netlify
**Solution**: Check all environment variables are set

### Issue: CORS errors
**Solution**: Verify API endpoint is `/api/*` not `/.netlify/functions/*`

## 📞 Need Help?

If you're stuck on any step:
1. Check the main README.md for detailed instructions
2. Review the Troubleshooting section
3. Check Netlify function logs for errors
4. Verify all environment variables are set correctly
