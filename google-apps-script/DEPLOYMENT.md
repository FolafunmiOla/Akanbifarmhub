# Google Apps Script Deployment Guide

## Overview

This guide shows how to use Google Apps Script as an alternative to Netlify Functions. It's simpler but less flexible.

## Advantages
- ✅ No server needed
- ✅ Free forever
- ✅ Already integrated with Google Sheets
- ✅ Easier to set up for beginners

## Disadvantages
- ❌ Less flexible than Netlify Functions
- ❌ Can't use npm packages easily
- ❌ Slower cold starts
- ❌ More limited environment variables

## Setup Steps

### 1. Open Google Apps Script

1. Open your Google Spreadsheet
2. Click **Extensions** > **Apps Script**
3. Delete the default `myFunction()` code
4. Copy the entire content from `google-apps-script/Code.gs`
5. Paste into the script editor

### 2. Configure Credentials

Replace the placeholders at the top of the script:

```javascript
const TWILIO_ACCOUNT_SID = 'ACxxxxxxxxxxxx';
const TWILIO_AUTH_TOKEN = 'your_auth_token';
const TWILIO_FROM_NUMBER = 'whatsapp:+14155238886';
const ADMIN_PHONE = 'whatsapp:+234XXXXXXXXXX';
```

### 3. Deploy as Web App

1. Click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ and select **Web app**
3. Fill in the details:
   - **Description**: Akanbi Farm Hub API
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Important**: Copy the Web App URL (it will look like):
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

### 4. Authorize the Script

1. Click **Review permissions**
2. Choose your Google account
3. Click **Advanced** > **Go to [Project Name] (unsafe)**
4. Click **Allow**

### 5. Update Frontend

In your React app, update the API calls to use the Apps Script URL:

**Option A**: Update `.env` file:
```env
VITE_API_URL=https://script.google.com/macros/s/AKfycbx.../exec
```

**Option B**: Update API calls directly in components:

```javascript
// In App.jsx
const response = await fetch('https://script.google.com/macros/s/AKfycbx.../exec')

// In OrderForm.jsx
const response = await fetch('https://script.google.com/macros/s/AKfycbx.../exec', {
  method: 'POST',
  // ... rest of the code
})
```

### 6. Test the Setup

Run the test function in Apps Script:

1. Select `testSetup` from the function dropdown
2. Click **Run**
3. Check the **Execution log** for results
4. Verify a test order appears in your Orders sheet

### 7. Deploy Frontend

Since you're not using Netlify Functions, you can deploy the frontend anywhere:

#### Option 1: Netlify (Static Only)
```bash
npm run build
netlify deploy --prod --dir=dist
```

#### Option 2: Vercel
```bash
npm run build
vercel --prod
```

#### Option 3: GitHub Pages
```bash
npm run build
# Push the dist folder to gh-pages branch
```

## API Endpoints

When using Google Apps Script, you have ONE endpoint:

```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

- **GET**: Returns products
- **POST**: Creates order

## Handling CORS

Google Apps Script automatically handles CORS, but if you have issues:

Add this to the beginning of both `doGet()` and `doPost()`:

```javascript
// Allow CORS
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST',
  'Access-Control-Allow-Headers': 'Content-Type'
};
```

## Debugging

### View Logs

1. In Apps Script editor, click **Execution log** (bottom)
2. Or go to **Extensions** > **Apps Script** > **Executions**

### Common Issues

**Issue**: "Script not authorized"
**Solution**: Re-run authorization flow

**Issue**: "Cannot read property 'postData'"
**Solution**: Ensure you're sending POST request with proper Content-Type

**Issue**: "Sheet not found"
**Solution**: Verify sheet names match exactly (case-sensitive)

## Updating the Script

1. Make changes in the script editor
2. Click **Save** (💾)
3. Click **Deploy** > **Manage deployments**
4. Click **Edit** (pencil icon)
5. Under **Version**, select **New version**
6. Click **Deploy**

The URL stays the same, but the code updates!

## Security Considerations

⚠️ **Important Security Notes:**

1. **Credentials in Code**: Your Twilio credentials are visible in the script. For production:
   - Use Google Apps Script Properties Service
   - Or use Netlify Functions instead

2. **Public Access**: Anyone with the URL can access the API. For production:
   - Implement API key authentication
   - Add rate limiting
   - Validate requests

### Using Properties Service (Recommended)

Instead of hardcoding credentials:

```javascript
// Set properties once (in a setup function)
function setupProperties() {
  const props = PropertiesService.getScriptProperties();
  props.setProperty('TWILIO_ACCOUNT_SID', 'ACxxxx');
  props.setProperty('TWILIO_AUTH_TOKEN', 'your_token');
  props.setProperty('ADMIN_PHONE', 'whatsapp:+234xxx');
}

// Use in your functions
const props = PropertiesService.getScriptProperties();
const TWILIO_ACCOUNT_SID = props.getProperty('TWILIO_ACCOUNT_SID');
```

## Monitoring

### Track Usage

1. Go to **Extensions** > **Apps Script**
2. Click **Executions** to see all API calls
3. Monitor for errors or unusual activity

### Quotas

Google Apps Script has daily quotas:
- URL Fetch calls: 20,000/day
- Script runtime: 6 min/execution
- Triggers: 90 min/day

For high-traffic sites, use Netlify Functions instead.

## Comparison: Apps Script vs Netlify Functions

| Feature | Apps Script | Netlify Functions |
|---------|-------------|-------------------|
| Cost | Free | Free (125k requests/month) |
| Setup | Easier | More complex |
| Performance | Slower cold starts | Faster |
| Flexibility | Limited | Full Node.js |
| Security | Less secure | More secure |
| Scalability | Limited by quotas | Better scaling |

## Recommendation

- **Use Apps Script if**: You're just starting, low traffic, want simple setup
- **Use Netlify Functions if**: Production app, high traffic, need security

---

For questions, check the main README.md or create an issue on GitHub.
