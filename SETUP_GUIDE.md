# 🚀 Complete Setup Guide for Grocery Checklist App

## Prerequisites Installation

Your app is ready, but you need to install Node.js first to run it.

### Step 1: Install Node.js

#### For macOS (Your System)

**Option A: Using Homebrew (Recommended)**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify installation
node --version
npm --version
```

**Option B: Using Official Installer**
1. Go to https://nodejs.org/
2. Download the LTS version for macOS
3. Run the installer
4. Follow the installation wizard
5. Restart your terminal

### Step 2: Navigate to App Directory
```bash
cd ~/grocery-checklist-app
```

### Step 3: Install Dependencies
```bash
npm install
```

This will install:
- React 18
- Vite (super fast build tool)
- Lucide React (beautiful icons)

### Step 4: Start the App
```bash
npm run dev
```

You'll see output like:
```
  VITE v5.0.8  ready in 450 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.x:3000/
  ➜  press h to show help
```

### Step 5: Open in Browser
- Click the local URL or open http://localhost:3000
- The app will open automatically in your default browser

---

## 📱 Access on Your Phone

### Same WiFi Network
1. Start the app with `npm run dev`
2. Look for the "Network" URL in the terminal (e.g., http://192.168.1.x:3000)
3. Open that URL on your phone's browser
4. Add to home screen (see instructions below)

### Install as App on Phone

#### iPhone/iPad
1. Open the app in **Safari** (must be Safari, not Chrome)
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it "Grocery List"
5. Tap **Add**
6. The app icon will appear on your home screen

#### Android
1. Open the app in **Chrome**
2. Tap the **menu** (three dots in top-right)
3. Tap **"Add to Home screen"** or **"Install app"**
4. Confirm the installation
5. The app will appear in your app drawer

---

## 🎯 Quick Start After Installation

### For Your First Shopping Trip

**Saturday Evening:**
```bash
# Start the app
cd ~/grocery-checklist-app
npm run dev
```

1. Open http://localhost:3000 in your browser
2. Switch to "Sunday Order" tab
3. Review the 60+ items
4. Uncheck items you already have in your pantry
5. Share the remaining items with your grocery vendor

**Sunday When Groceries Arrive:**
1. Open the app
2. Check off items as you put them away
3. Click "Show Prep Tips" for preparation instructions
4. Follow tips: soak rajma, start sprouts, prep ginger-garlic paste

**Tuesday Evening:**
```bash
# Start the app (if not already running)
cd ~/grocery-checklist-app
npm run dev
```

1. Switch to "Wednesday Order" tab
2. Review fresh items (30+ items)
3. Adjust quantities based on what remains from Sunday
4. Share list with vendor

**Wednesday When Fresh Items Arrive:**
1. Check off items as you store them
2. Follow storage tips for leafy greens

---

## 🛠️ Customizing Your Lists

### Edit Items and Quantities

1. Open the file: `src/data/groceryData.js`
2. Find the item you want to modify
3. Change the quantity or name
4. Save the file
5. The app will automatically refresh

**Example - Change Rice Quantity:**
```javascript
// Find this line:
{ id: "rice", name: "Rice (Basmati)", quantity: "2 kg" },

// Change to:
{ id: "rice", name: "Rice (Basmati)", quantity: "3 kg" },
```

### Add New Items

```javascript
// In the appropriate category, add:
{ id: "new_item_unique_id", name: "Item Name", quantity: "Amount" },
```

### Remove Items You Don't Use

Simply delete or comment out the line:
```javascript
// { id: "tofu", name: "Tofu", quantity: "400g" },  // Don't use tofu
```

---

## 💡 Pro Tips

### 1. Keep Terminal Running
Leave `npm run dev` running in a terminal window. The app stays accessible at http://localhost:3000

### 2. Access from Any Device
Any device on your WiFi can access the app using the Network URL shown in the terminal.

### 3. Bookmark on Desktop
Add http://localhost:3000 to your browser bookmarks for quick access.

### 4. Make It Permanent
For 24/7 access without running terminal:
- Deploy to Netlify/Vercel (free hosting)
- Install on a Raspberry Pi
- Use ngrok for external access

### 5. Share with Cook
Send your cook the Network URL or install the app on their phone using your WiFi.

---

## 🔧 Troubleshooting

### "Command not found: npm"
**Solution:** Install Node.js using the instructions in Step 1 above.

### "Port 3000 is already in use"
**Solution:**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- --port 3001
```

### Changes not appearing
**Solution:**
```bash
# Stop the server (Ctrl+C)
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### App not installing on phone
**Solution:**
- **iOS:** Must use Safari browser
- **Android:** Must use Chrome browser
- Ensure you're accessing via HTTPS or localhost

### Can't access from phone
**Solution:**
1. Ensure phone and computer are on same WiFi
2. Check firewall isn't blocking port 3000
3. Try the IP address shown under "Network" in terminal

---

## 🚀 Deploy for Production (Optional)

### Option 1: Netlify (Easiest)
```bash
# Build the app
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

You'll get a permanent URL like: `https://your-grocery-app.netlify.app`

### Option 2: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
npm run build
vercel --prod
```

### Option 3: GitHub Pages
1. Push code to GitHub
2. Run: `npm run build`
3. Deploy `dist` folder to gh-pages branch

---

## 📊 What Each File Does

```
grocery-checklist-app/
├── src/
│   ├── data/
│   │   └── groceryData.js    ← Edit this to customize items
│   ├── App.jsx               ← Main app logic
│   ├── App.css               ← Styles (colors, layout)
│   └── main.jsx              ← Entry point (don't modify)
├── public/
│   └── manifest.json         ← PWA settings
├── index.html                ← HTML template
├── package.json              ← Dependencies
└── vite.config.js            ← Build configuration
```

**Most important file:** `src/data/groceryData.js` - This contains all your grocery items!

---

## 🎨 Customization Ideas

### Change Colors
Edit `src/App.css` lines 12-20:
```css
:root {
  --primary: #10b981;     /* Change to your favorite color */
  --secondary: #3b82f6;
}
```

### Add New Categories
Edit `src/data/groceryData.js` and add to either `sunday` or `wednesday`:
```javascript
{
  name: "Snacks",
  icon: "🍿",
  items: [
    { id: "chips", name: "Potato Chips", quantity: "200g" },
    { id: "popcorn", name: "Popcorn", quantity: "500g" }
  ]
}
```

### Change App Name
Edit `index.html` line 7 and `public/manifest.json` line 2.

---

## ✅ Checklist for First Use

- [ ] Node.js installed (`node --version` works)
- [ ] Navigated to app directory
- [ ] Ran `npm install` successfully
- [ ] Ran `npm run dev` successfully
- [ ] App opens in browser
- [ ] Customized items in `groceryData.js` if needed
- [ ] Tested checking/unchecking items
- [ ] Verified items stay checked after refresh
- [ ] Installed on phone (optional)
- [ ] Shared with cook/family (optional)

---

## 🆘 Need Help?

### Quick Commands Reference
```bash
# Start the app
npm run dev

# Stop the app
Press Ctrl+C in terminal

# Install dependencies (first time only)
npm install

# Build for production
npm run build

# Clear everything and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Common Questions

**Q: Do I need to run this every time?**
A: Yes, you need to run `npm run dev` each time you want to use the app. Or deploy it to Netlify for permanent access.

**Q: Can I use this offline?**
A: After loading once, yes! The app caches itself in your browser.

**Q: Will my checks be lost?**
A: No, they're saved in your browser's localStorage and persist between sessions.

**Q: Can multiple people use the same list?**
A: Each device has its own checks. For shared lists, consider deploying and sharing the URL.

---

## 🎯 Next Steps

1. **Install Node.js** (see Step 1 above)
2. **Run the app** (`npm run dev`)
3. **Customize your lists** (edit groceryData.js)
4. **Use for your next shopping trip**
5. **Consider deploying** for permanent access

---

**Happy Grocery Shopping! 🛒**

Your organized meal planning journey starts now!
