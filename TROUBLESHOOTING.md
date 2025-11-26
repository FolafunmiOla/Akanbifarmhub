# Troubleshooting Guide - Akanbi Farm Hub

## Table of Contents
1. [Google Sheets Issues](#google-sheets-issues)
2. [Twilio/WhatsApp Issues](#twiliowhatsapp-issues)
3. [Frontend Issues](#frontend-issues)
4. [Backend Issues](#backend-issues)
5. [Deployment Issues](#deployment-issues)
6. [Performance Issues](#performance-issues)

---

## Google Sheets Issues

### Products Not Loading

**Symptoms**: Frontend shows "No products available" or loading spinner forever

**Solutions**:
1. **Check Spreadsheet ID**:
   ```bash
   # Verify in .env file
   GOOGLE_SPREADSHEET_ID=correct_id_from_url
   ```

2. **Verify Sheet Name**:
   - Must be exactly "Products" (case-sensitive)
   - Check for extra spaces

3. **Check Service Account Access**:
   - Open spreadsheet in browser
   - Click "Share"
   - Verify service account email is listed with Editor access

4. **Test Manually**:
   ```bash
   # Test the API endpoint
   curl http://localhost:8888/api/products
   ```

5. **Check Netlify Logs**:
   ```bash
   netlify logs:function products
   ```

### Orders Not Saving

**Symptoms**: Order form submits but nothing appears in Google Sheets

**Solutions**:
1. **Check Sheet Name**: Must be exactly "Orders"
2. **Verify Service Account Scope**:
   - Should have `spreadsheets` (read/write), not just `spreadsheets.readonly`
3. **Check Column Count**: Ensure Orders sheet has all required columns
4. **Review Function Logs**: Check for error messages in Netlify dashboard

### "Access Denied" Error

**Solutions**:
1. **Re-share Spreadsheet**:
   - Share → Add service account email → Editor
2. **Regenerate Service Account Key**:
   - Create new JSON key in Google Cloud Console
   - Update environment variables
3. **Check API Enabled**:
   - Google Cloud Console → APIs & Services → Library
   - Search "Google Sheets API" → Should show "Enabled"

---

## Twilio/WhatsApp Issues

### No WhatsApp Notification Received

**Symptoms**: Order saves but no WhatsApp message arrives

**Solutions**:
1. **Verify Sandbox Join**:
   - Send join message again to Twilio number
   - Format: `join <code>-<code>`
   - Wait for confirmation message

2. **Check Admin Phone Format**:
   ```env
   # Correct format (with whatsapp: prefix)
   ADMIN_PHONE=whatsapp:+2348012345678
   
   # Wrong formats:
   # +2348012345678  ❌
   # whatsapp:2348012345678  ❌ (missing +)
   # whatsapp:08012345678  ❌ (missing country code)
   ```

3. **Verify Twilio Credentials**:
   ```bash
   # Test with curl
   curl -X POST https://api.twilio.com/2010-04-01/Accounts/YOUR_SID/Messages.json \
   --data-urlencode "From=whatsapp:+14155238886" \
   --data-urlencode "To=whatsapp:+2348012345678" \
   --data-urlencode "Body=Test message" \
   -u YOUR_SID:YOUR_AUTH_TOKEN
   ```

4. **Check Twilio Console**:
   - Go to Twilio Dashboard → Monitor → Logs → Errors
   - Look for failed message attempts

### "Not a valid phone number" Error

**Solutions**:
- Use E.164 format: `+[country code][number]`
- Nigeria: `+234` + number (without leading 0)
- Example: `+2348012345678` not `+234(0)8012345678`

### "Sandbox Limit Reached"

**Solutions**:
- Twilio free trial has limits (check dashboard)
- Upgrade to paid account
- Or wait for quota reset (monthly)

---

## Frontend Issues

### "Failed to fetch products" Error

**Solutions**:
1. **Check API URL**:
   ```javascript
   // In .env file
   VITE_API_URL=http://localhost:8888  // Local
   # or
   VITE_API_URL=https://your-site.netlify.app  // Production
   ```

2. **CORS Issues**:
   - Verify backend includes CORS headers
   - Check browser console for CORS errors

3. **Network Issues**:
   - Open browser DevTools → Network tab
   - Check if request is being made
   - Look for status code and response

### Styling Not Applied

**Solutions**:
1. **Rebuild Tailwind**:
   ```bash
   npm run build
   ```

2. **Check Import Order** in `main.jsx`:
   ```javascript
   import './index.css'  // Must be imported
   ```

3. **Clear Cache**:
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Form Not Submitting

**Solutions**:
1. **Check Required Fields**: All fields must be filled
2. **Check Browser Console**: Look for JavaScript errors
3. **Verify API Endpoint**: Should be `/api/orders`

### Loading Spinner Stuck

**Solutions**:
1. **Check Network**: Request might be failing silently
2. **Add Timeout**:
   ```javascript
   const controller = new AbortController();
   const timeoutId = setTimeout(() => controller.abort(), 10000);
   
   fetch('/api/products', { signal: controller.signal })
   ```

---

## Backend Issues

### Netlify Function Not Found (404)

**Solutions**:
1. **Check Function Location**: Must be in `netlify/functions/`
2. **Verify netlify.toml**:
   ```toml
   [build]
     functions = "netlify/functions"
   ```

3. **Check File Name**: 
   - `products.js` → `/api/products`
   - Must match exactly

4. **Rebuild**:
   ```bash
   netlify build
   netlify deploy --prod
   ```

### "Module not found" Error

**Solutions**:
1. **Install Dependencies**:
   ```bash
   cd netlify/functions
   npm install googleapis twilio
   ```

2. **Check package.json**: Verify dependencies listed

3. **Use Correct Import**:
   ```javascript
   // ES6 modules (if type: "module" in package.json)
   import { google } from 'googleapis'
   
   // CommonJS (if no type specified)
   const { google } = require('googleapis')
   ```

### Environment Variables Not Working

**Solutions**:
1. **Local Development**: Create `.env` in root
2. **Netlify Production**:
   - Dashboard → Site settings → Environment variables
   - Add all variables from `.env.example`

3. **Restart Dev Server** after adding variables

4. **Check Variable Names**: Must match exactly (case-sensitive)

### Private Key Error

**Solutions**:
1. **Escape Newlines**:
   ```env
   # In .env file
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
   ```

2. **In Netlify Dashboard**: Paste as-is (with actual line breaks)

3. **Use Quote Wrapper**: Wrap in double quotes

---

## Deployment Issues

### Build Fails on Netlify

**Solutions**:
1. **Check Build Command**:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   ```

2. **Install All Dependencies**:
   ```bash
   npm install  # Root
   cd netlify/functions && npm install  # Functions
   ```

3. **Check Node Version**:
   ```toml
   [build.environment]
     NODE_VERSION = "18"
   ```

4. **Review Build Logs**: Netlify dashboard → Deploys → Failed deploy → View logs

### Site Deployed But Not Working

**Solutions**:
1. **Check Environment Variables**: Must be set in Netlify dashboard
2. **Check Function Logs**: Netlify dashboard → Functions → View logs
3. **Test API Endpoints**:
   ```bash
   curl https://your-site.netlify.app/api/products
   ```

### Custom Domain Not Working

**Solutions**:
1. **DNS Propagation**: Can take up to 48 hours
2. **Check DNS Records**:
   ```bash
   nslookup akanbifarmhub.ng
   ```

3. **Verify in Netlify**:
   - Domain settings → Check DNS configuration
   - Should show green checkmarks

4. **HTTPS Issues**: 
   - Wait for SSL certificate provisioning (automatic)
   - Can take up to 24 hours

---

## Performance Issues

### Slow Product Loading

**Solutions**:
1. **Reduce Data**: Limit rows in Google Sheets
2. **Add Caching**:
   ```javascript
   // Cache products for 5 minutes
   const CACHE_DURATION = 5 * 60 * 1000;
   ```

3. **Optimize Images**: If adding product images later

### Netlify Function Timeout

**Solutions**:
1. **Increase Timeout** (Pro plan only):
   ```toml
   [functions]
     timeout = 26  # Default is 10 seconds
   ```

2. **Optimize Queries**: Only fetch needed data
3. **Add Pagination**: For large datasets

### High API Costs (if applicable)

**Solutions**:
1. **Enable Caching**: Cache Google Sheets data
2. **Reduce Polling**: Don't fetch products too frequently
3. **Batch Operations**: Combine multiple operations

---

## General Debugging Tips

### Enable Debug Logging

In Netlify Functions:
```javascript
console.log('Debug info:', data);
// Shows in Netlify function logs
```

### Test Locally First

Always test locally before deploying:
```bash
netlify dev
```

### Use Browser DevTools

1. **Console**: Check for JavaScript errors
2. **Network**: Monitor API requests
3. **Application**: Check localStorage, cookies

### Check Netlify Logs

```bash
# CLI
netlify logs

# Or in dashboard
Dashboard → Deploys → View logs
```

### Version Control

Commit working code:
```bash
git add .
git commit -m "Working version before changes"
```

---

## Getting Help

### Before Asking for Help:

1. ✅ Check this troubleshooting guide
2. ✅ Review README.md
3. ✅ Check browser console for errors
4. ✅ Check Netlify function logs
5. ✅ Verify all environment variables

### When Asking for Help:

Include:
- Error message (exact text)
- What you were trying to do
- Steps to reproduce
- Browser console screenshot
- Netlify logs (if applicable)
- Environment (local vs production)

### Resources:

- [Netlify Docs](https://docs.netlify.com)
- [Google Sheets API Docs](https://developers.google.com/sheets/api)
- [Twilio Docs](https://www.twilio.com/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)

---

## Quick Checklist

When nothing works, verify:

- [ ] Node.js 18+ installed
- [ ] All npm packages installed (root + functions)
- [ ] .env file exists with all variables
- [ ] Google Sheets API enabled
- [ ] Service account has spreadsheet access
- [ ] Twilio sandbox joined
- [ ] Environment variables in Netlify (if deployed)
- [ ] Correct sheet names (Products, Orders)
- [ ] Function files in correct location
- [ ] netlify.toml configured correctly

---

Still stuck? Create an issue on GitHub with details!
