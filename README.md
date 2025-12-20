# 🛒 Weekly Grocery Checklist App

A mobile-friendly Progressive Web App (PWA) for managing your weekly grocery shopping with smart Sunday and Wednesday order splitting based on ingredient shelf life.

## ✨ Features

### 📱 Mobile-First Design
- Touch-optimized interface
- Responsive layout for all screen sizes
- Works offline once loaded
- Can be installed as an app on your phone

### 🗓️ Smart Two-Order System
- **Sunday Order**: Long-lasting items (grains, frozen, pantry staples)
- **Wednesday Order**: Fresh items (leafy greens, fruits, dairy, herbs)

### ✅ Interactive Checklist
- Tap items to mark as purchased
- Visual progress tracking
- Category-wise organization with item counts
- Persistent storage (checks saved automatically)

### 🎯 Smart Features
- Real-time progress bar
- Prep tips for each order
- Share remaining items via WhatsApp/SMS
- Reset functionality for new shopping trips
- Color-coded categories with emojis

### 💾 Auto-Save
- All checks saved to your device
- No internet required after first load
- Privacy-focused (no data sent to servers)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the app directory:**
```bash
cd grocery-checklist-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open in browser:**
   - The app will automatically open at `http://localhost:3000`
   - Or scan the QR code shown in terminal with your phone

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📱 Install on Your Phone

### iOS (iPhone/iPad)
1. Open the app in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Name it "Grocery List" and tap Add
5. App icon appears on your home screen

### Android
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home screen" or "Install app"
4. Confirm installation
5. App icon appears in your app drawer

## 🎨 App Structure

```
grocery-checklist-app/
├── public/
│   └── manifest.json          # PWA configuration
├── src/
│   ├── data/
│   │   └── groceryData.js     # All grocery items & categories
│   ├── App.jsx                # Main app component
│   ├── App.css                # Styles
│   └── main.jsx               # Entry point
├── index.html                 # HTML template
├── package.json               # Dependencies
└── vite.config.js             # Build configuration
```

## 🛠️ Customization

### Adding/Removing Items

Edit `src/data/groceryData.js`:

```javascript
{
  name: "Grains & Pulses",
  icon: "🌾",
  items: [
    { id: "rice", name: "Rice (Basmati)", quantity: "2 kg" },
    // Add your items here
  ]
}
```

### Adjusting Quantities

Simply edit the `quantity` field for any item in `groceryData.js`.

### Adding New Categories

```javascript
{
  name: "Your Category Name",
  icon: "🎯",  // Choose an emoji
  items: [
    { id: "unique_id", name: "Item Name", quantity: "Amount" }
  ]
}
```

### Changing Colors

Edit CSS variables in `src/App.css`:

```css
:root {
  --primary: #10b981;        /* Main green color */
  --secondary: #3b82f6;      /* Blue accent */
  --bg: #f8fafc;            /* Background */
  /* ... more colors */
}
```

## 📊 Data Management

### Local Storage
- Checked items stored in browser's localStorage
- Persists between sessions
- No server required
- Data stays on your device

### Reset Options
- **Reset All**: Clears all checkboxes
- **Switch Orders**: Checks are independent per order

### Export/Share
- Share button copies remaining items
- Works with WhatsApp, SMS, Notes, etc.
- Formatted as plain text

## 🎯 Usage Tips

### Weekly Workflow

**Saturday Evening:**
1. Open the app
2. Switch to "Sunday Order" tab
3. Review the list
4. Remove items you already have
5. Place order with your grocery vendor

**Sunday When Order Arrives:**
1. Use the checklist to verify items
2. Check off items as you put them away
3. Follow the prep tips (soak rajma, start sprouts, etc.)

**Tuesday Evening:**
1. Switch to "Wednesday Order" tab
2. Review fresh items needed
3. Adjust quantities based on remaining items from Sunday
4. Place order

**Wednesday When Order Arrives:**
1. Use checklist to verify fresh items
2. Follow prep tips for storing leafy greens

### Best Practices

1. **Don't Reset Mid-Week**: Keep Sunday checks to track what you have
2. **Share with Cook**: Use share button to send list to your cook
3. **Install on Phone**: Add to home screen for quick access
4. **Check Before Cooking**: Review available ingredients before meal prep

## 🔧 Troubleshooting

### Checkboxes Not Saving
- Check if browser allows localStorage
- Try refreshing the page
- Clear browser cache and reload

### App Not Loading
- Check internet connection (first load only)
- Clear browser cache
- Try incognito/private mode

### Share Not Working
- Some browsers don't support Web Share API
- Use the clipboard copy fallback
- Manually copy the list text

## 🚀 Deployment Options

### Netlify (Recommended)
```bash
npm run build
# Drag and drop 'dist' folder to netlify.com
```

### Vercel
```bash
npm run build
vercel --prod
```

### GitHub Pages
```bash
npm run build
# Push 'dist' folder to gh-pages branch
```

### Your Own Server
```bash
npm run build
# Upload 'dist' folder to your web host
```

## 📱 PWA Features

- **Offline Access**: Works without internet after first load
- **Install Prompt**: Browser suggests installing as app
- **App-Like Experience**: Full screen, no browser chrome
- **Fast Loading**: Cached for instant access
- **Low Data Usage**: Only loads once

## 🎨 Screenshots

The app includes:
- ✅ Clean, modern interface
- 🎯 Color-coded categories
- 📊 Progress tracking
- 🔄 Easy reset and share
- 📱 Perfect for mobile use

## 🤝 Contributing

Want to improve the app? Here are some ideas:

- [ ] Add barcode scanner integration
- [ ] Multi-language support
- [ ] Price tracking
- [ ] Recipe integration
- [ ] Smart quantity suggestions based on usage
- [ ] Calendar reminders for orders

## 📄 License

Free to use and modify for personal use.

## 💡 Tips for Maximum Efficiency

1. **First Week**: Track what you actually use
2. **Adjust Quantities**: Edit groceryData.js based on real usage
3. **Remove Unused Items**: Customize to your actual cooking habits
4. **Add Favorites**: Include items you frequently need
5. **Share with Family**: Everyone can access the same list

## 🆘 Support

Having issues?
1. Check this README
2. Review the code comments in `src/data/groceryData.js`
3. Test in a different browser
4. Clear cache and try again

---

**Made with ❤️ for efficient grocery shopping**

Start saving time and money with organized grocery planning!
