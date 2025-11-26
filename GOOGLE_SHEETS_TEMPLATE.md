# Google Sheets Template Structure

## Sheet 1: Products

### Column Headers (Row 1):
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Date Added | Product Name | Supplier Name | Cost (per kg/derica) | Sale Price | Margin | Notes |

### Sample Data (Rows 2+):
| Date Added | Product Name | Supplier Name | Cost | Sale Price | Margin | Notes |
|------------|--------------|---------------|------|------------|--------|-------|
| 2025-11-25 | Fresh Tomatoes | Farmer John | 500 | 800 | 37.5% | Organic, locally grown |
| 2025-11-25 | White Rice (50kg) | Rice Mills Ltd | 25000 | 35000 | 28.6% | Premium quality |
| 2025-11-25 | Sweet Corn | Green Valley Farm | 300 | 500 | 40.0% | Fresh harvest |
| 2025-11-25 | Dried Beans | Abeokuta Farms | 800 | 1200 | 33.3% | Red beans |
| 2025-11-25 | Plantain (bunch) | Ibadan Plantations | 1500 | 2200 | 31.8% | Large size |
| 2025-11-25 | Yam Tuber | Northern Farms | 2000 | 3000 | 33.3% | Premium grade |
| 2025-11-25 | Fresh Pepper | Local Farmers | 400 | 650 | 38.5% | Mixed varieties |
| 2025-11-25 | Garri (derica) | Cassava Processors | 350 | 550 | 36.4% | White garri |

### Margin Calculation Formula:
In cell F2 (Margin column), you can use this formula:
```
=TEXT((E2-D2)/E2,"0.0%")
```
Then copy down to other rows.

This calculates: (Sale Price - Cost) / Sale Price × 100%

---

## Sheet 2: Orders

### Column Headers (Row 1):
| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Customer Name | Phone | Product | Supplier | Quantity | Unit Price | Total | Address | Status |

### Sample Data Format:
| Timestamp | Customer Name | Phone | Product | Supplier | Quantity | Unit Price | Total | Address | Status |
|-----------|---------------|-------|---------|----------|----------|------------|-------|---------|--------|
| 2025-11-25 10:30:00 | John Doe | +2348012345678 | Fresh Tomatoes | Farmer John | 5 | 800 | 4000 | 123 Main St, Lagos | Pending |
| 2025-11-25 11:15:00 | Jane Smith | +2348098765432 | White Rice | Rice Mills Ltd | 2 | 35000 | 70000 | 456 Market Rd, Abuja | Completed |

### Status Column Options:
- Pending
- Processing
- Delivered
- Cancelled

### Additional Features:

#### Auto-timestamp:
Orders will be automatically timestamped by the backend when created.

#### Total Calculation:
The backend automatically calculates: Quantity × Unit Price = Total

#### Conditional Formatting (Optional):
You can add color coding for Status column:
- Pending = Yellow
- Processing = Blue
- Delivered = Green
- Cancelled = Red

To set up:
1. Select Status column (J2:J)
2. Format → Conditional formatting
3. Add rules for each status

---

## Setup Instructions

### 1. Create the Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Blank" to create new spreadsheet
3. Rename it to: **Akanbi Farm Hub Database**

### 2. Set Up Products Sheet

1. Rename "Sheet1" to "Products"
2. Add headers in Row 1 (as shown above)
3. Add sample products or your real products
4. Apply margin formula to column F

### 3. Set Up Orders Sheet

1. Click "+" to add new sheet
2. Rename it to "Orders"
3. Add headers in Row 1 (as shown above)
4. Leave Row 2+ empty (will be filled by orders)

### 4. Format the Sheets

#### Products Sheet Formatting:
- **Header Row**: Bold, background color (light green), freeze row
- **Cost Column (D)**: Currency format → ₦
- **Sale Price Column (E)**: Currency format → ₦
- **Margin Column (F)**: Percentage format

#### Orders Sheet Formatting:
- **Header Row**: Bold, background color (light blue), freeze row
- **Unit Price Column (G)**: Currency format → ₦
- **Total Column (H)**: Currency format → ₦
- **Status Column (J)**: Data validation dropdown

### 5. Protect Headers (Optional)

To prevent accidental deletion:
1. Right-click Row 1
2. "Protect range"
3. Set permissions: "Only you"

### 6. Share with Service Account

Once you create your Google Service Account:
1. Click "Share" button
2. Add the service account email
3. Give "Editor" permission
4. Uncheck "Notify people"
5. Click "Share"

---

## Data Validation

### For Status Column (Optional):

1. Select cell J2 in Orders sheet
2. Data → Data validation
3. Criteria: "List of items"
4. Add: Pending, Processing, Delivered, Cancelled
5. Check "Show dropdown list in cell"
6. Click "Save"
7. Copy validation to other cells in column J

---

## Tips for Managing Data

### Products Sheet:
- Add new products at the bottom (don't insert rows)
- Keep the header row at Row 1
- Don't delete columns (it will break the API)
- You can add extra columns after column G (Notes)

### Orders Sheet:
- Don't manually add orders (let the system do it)
- You can update Status manually after processing
- Don't delete old orders (archive instead)
- You can add notes in a new column if needed

### Backup:
- File → Make a copy (weekly backup)
- Or use Google Sheets version history

---

## Example Spreadsheet URL Structure

After creating, your URL will look like:
```
https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit
```

The part `1a2b3c4d5e6f7g8h9i0j` is your **SPREADSHEET_ID** - save this for your .env file!

---

## Troubleshooting

**Problem**: Products not showing in app
**Solution**: 
- Verify sheet name is exactly "Products" (case-sensitive)
- Check that header row is Row 1
- Ensure data starts at Row 2

**Problem**: Orders not saving
**Solution**:
- Verify sheet name is exactly "Orders" (case-sensitive)
- Check service account has Editor permission
- Verify all required columns are present

---

For more help, see the main README.md
