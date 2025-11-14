# Quick Start Guide

Get your Product Search App running in 5 minutes!

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

## Step 2: Start the Server (30 seconds)

```bash
npm run server:node
```

You should see: "Product Search MCP server running on stdio"

## Step 3: Test Locally (Optional)

To test the server locally before connecting to ChatGPT, you can use the MCP Inspector tool or create a simple test script.

## Step 4: Expose with ngrok (1 minute)

**Option A: Using ngrok (Recommended for Testing)**

1. Install ngrok: https://ngrok.com/download
2. Run: `ngrok http 4444`
3. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)

**Option B: Deploy to Production**

Deploy your server to:
- Railway: https://railway.app
- Render: https://render.com
- Fly.io: https://fly.io
- Your own server

## Step 5: Connect to ChatGPT (2 minutes)

### For ChatGPT Desktop App:

1. Open ChatGPT
2. Click your profile → Settings
3. Go to "Developer" section
4. Enable "Developer Mode"
5. Add MCP Server:
   - Name: Product Search
   - Command: `node /path/to/your/project/src/server/product-search-server.js`

### For ChatGPT Web (using ngrok):

1. Open ChatGPT
2. Click your profile → Settings
3. Go to "Connectors" or "Integrations"
4. Add New Connector:
   - URL: Your ngrok URL
   - Name: Product Search

## Step 6: Test It Out! (1 minute)

Try these prompts in ChatGPT:

```
Search for headphones
```

```
Find me wireless keyboards
```

```
Show me laptop accessories
```

You should see a beautiful grid of products with images, prices, and links!

## What's Next?

### Use a Real Product API

Edit `src/server/product-search-server.js` and replace the `searchProducts` function:

```javascript
import { searchProductsFakeStore } from './api-integrations.js';

async function searchProducts(query) {
  return await searchProductsFakeStore(query);
}
```

### Customize the Look

Modify the CSS in the `generateProductWidget` function to match your brand:

- Change colors
- Update fonts
- Adjust card layouts
- Add animations

### Add More Features

- Price filtering
- Category selection
- Sort by price/rating
- Product comparison
- Wishlist

## Troubleshooting

**"Cannot find module '@modelcontextprotocol/sdk'"**
→ Run `npm install`

**Server starts but ChatGPT can't connect**
→ Check your ngrok URL is correct
→ Ensure ngrok is running
→ Verify ChatGPT connector settings

**Products not showing**
→ Check browser console for errors
→ Verify image URLs are accessible
→ Test the server with different queries

## Need Help?

- Check the full README.md
- Review the OpenAI Apps SDK docs: https://developers.openai.com/apps-sdk/
- Join the OpenAI Developer Forum

## Success! 🎉

You now have a working product search app in ChatGPT!
