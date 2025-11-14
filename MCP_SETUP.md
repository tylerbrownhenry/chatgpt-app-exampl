# MCP Server Setup for ChatGPT Developer Mode

This guide will walk you through setting up the Product Search app as an MCP server in ChatGPT's Developer Mode.

## What You'll Need

- ChatGPT Desktop App (macOS, Windows, or Linux)
- Node.js 18 or higher installed
- This product search app repository

## Step 1: Enable Developer Mode in ChatGPT

### For ChatGPT Desktop App:

1. **Open ChatGPT Desktop App**
2. **Click your profile picture** (bottom left corner)
3. **Select "Settings"**
4. **Navigate to "Developer"** tab in the left sidebar
5. **Toggle "Developer Mode" to ON**

You should now see a "Developer" section in your settings.

## Step 2: Install Dependencies

In your terminal, navigate to this project directory and run:

```bash
cd /path/to/chatgpt-app-exampl
npm install
```

This will install the MCP SDK and other required dependencies.

## Step 3: Configure the MCP Server in ChatGPT

### Option A: Using ChatGPT Desktop App (Recommended)

1. **Open ChatGPT Settings** → **Developer** tab
2. **Scroll to "MCP Servers"** section
3. **Click "Add Server"** or "Edit Config"
4. **Add the following configuration:**

For **macOS/Linux**, you'll edit a JSON config file. Add this entry:

```json
{
  "mcpServers": {
    "product-search": {
      "command": "node",
      "args": [
        "/absolute/path/to/chatgpt-app-exampl/src/server/product-search-server.js"
      ]
    }
  }
}
```

For **Windows**, use backslashes in the path:

```json
{
  "mcpServers": {
    "product-search": {
      "command": "node",
      "args": [
        "C:\\Users\\YourName\\path\\to\\chatgpt-app-exampl\\src\\server\\product-search-server.js"
      ]
    }
  }
}
```

**IMPORTANT:** Replace `/absolute/path/to/` with the actual full path to this project!

### Finding Your Config File Location

The MCP configuration file is typically located at:

- **macOS**: `~/Library/Application Support/ChatGPT/config.json`
- **Linux**: `~/.config/ChatGPT/config.json`
- **Windows**: `%APPDATA%\ChatGPT\config.json`

### Option B: Manual Config File Edit

1. **Locate your config file** (see paths above)
2. **Open it in a text editor**
3. **Add the MCP server configuration** as shown above
4. **Save the file**
5. **Restart ChatGPT**

### Complete Example Config

Here's what your complete `config.json` might look like:

```json
{
  "mcpServers": {
    "product-search": {
      "command": "node",
      "args": [
        "/Users/yourname/projects/chatgpt-app-exampl/src/server/product-search-server.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

## Step 4: Restart ChatGPT

1. **Quit ChatGPT completely** (not just close the window)
   - macOS: Cmd+Q
   - Windows: Right-click taskbar icon → Quit
2. **Reopen ChatGPT**

## Step 5: Verify the Connection

1. **Start a new chat** in ChatGPT
2. **Check for the MCP indicator** - you should see a small indicator showing connected MCP servers
3. **Try a test prompt:**

   ```
   Search for headphones
   ```

If everything is working, you should see a beautiful grid of products with images, prices, and links!

## Step 6: Test Different Queries

Try these prompts to test the functionality:

```
Search for wireless keyboards
```

```
Find me laptop accessories
```

```
Show me webcams under $200
```

```
Search for phone chargers
```

## Troubleshooting

### MCP Server Not Showing Up

**Problem:** ChatGPT doesn't recognize the MCP server

**Solutions:**
1. Verify the path in config.json is absolute (starts with `/` on Unix or `C:\` on Windows)
2. Check that Node.js is in your PATH: `node --version`
3. Test the server manually: `node /path/to/product-search-server.js`
4. Restart ChatGPT completely
5. Check ChatGPT logs for errors (Settings → Developer → View Logs)

### Server Crashes or Won't Start

**Problem:** Server starts but immediately crashes

**Solutions:**
1. Check Node.js version: `node --version` (must be 18+)
2. Reinstall dependencies: `npm install`
3. Check for errors: `node src/server/product-search-server.js` directly in terminal
4. Verify the MCP SDK is installed: `npm list @modelcontextprotocol/sdk`

### Products Not Displaying

**Problem:** Query runs but no products show

**Solutions:**
1. Open browser developer tools in ChatGPT (if available)
2. Check the server logs for errors
3. Verify the mock data is present in the server file
4. Try a simple query like "search for laptop"

### Permission Errors

**Problem:** Permission denied errors when starting server

**Solutions:**
1. Ensure the server file is readable: `ls -l src/server/product-search-server.js`
2. Make sure you have execute permissions: `chmod +x src/server/product-search-server.js`
3. Check file ownership matches your user

### Path Issues on Windows

**Problem:** Windows can't find the file

**Solutions:**
1. Use double backslashes: `C:\\Users\\...`
2. Or use forward slashes: `C:/Users/...`
3. Ensure there are no spaces in the path, or wrap the path in quotes
4. Get the full path: Right-click file → Properties → Copy path

## Advanced Configuration

### Adding Environment Variables

You can add environment variables for API keys:

```json
{
  "mcpServers": {
    "product-search": {
      "command": "node",
      "args": [
        "/path/to/chatgpt-app-exampl/src/server/product-search-server.js"
      ],
      "env": {
        "PRODUCT_API_KEY": "your-api-key-here",
        "PRODUCT_API_URL": "https://api.example.com"
      }
    }
  }
}
```

### Multiple MCP Servers

You can run multiple MCP servers:

```json
{
  "mcpServers": {
    "product-search": {
      "command": "node",
      "args": ["/path/to/product-search-server.js"]
    },
    "another-server": {
      "command": "node",
      "args": ["/path/to/another-server.js"]
    }
  }
}
```

## Checking Logs

To see what's happening with your MCP server:

1. **ChatGPT Settings** → **Developer**
2. **Click "View Logs"** or **"Developer Console"**
3. Look for messages from "product-search-server"

Common log messages:
- `Product Search MCP server running on stdio` - ✅ Server started successfully
- `Error: Cannot find module` - ❌ Dependencies not installed
- `Permission denied` - ❌ File permissions issue

## Next Steps

Once your MCP server is connected:

1. ✅ Test with various search queries
2. ✅ Customize the product display styling
3. ✅ Replace mock data with a real API
4. ✅ Add more tools to the MCP server

## Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [OpenAI Apps SDK](https://developers.openai.com/apps-sdk/)
- [ChatGPT Developer Mode Guide](https://help.openai.com/en/articles/12515353-build-with-the-apps-sdk)

## Getting Help

If you're still having issues:

1. Check the logs in ChatGPT Developer settings
2. Run the server manually to see error messages
3. Verify all paths are absolute and correct
4. Make sure Node.js 18+ is installed
5. Try restarting ChatGPT

---

**You're all set!** Your product search app should now be working as an MCP server in ChatGPT. 🎉
