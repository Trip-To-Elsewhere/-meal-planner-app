# 🚀 Alternative Node.js Installation Guide

The Homebrew installation encountered issues due to macOS 13 and Command Line Tools. Here are **3 working alternatives**:

---

## ✅ Option 1: Direct Download (EASIEST - Recommended)

This is the simplest method and doesn't require terminal commands.

### Steps:

1. **Download Node.js installer:**
   - Go to: https://nodejs.org/
   - Click the big green button "Download Node.js (LTS)"
   - This will download a `.pkg` file

2. **Install:**
   - Double-click the downloaded `.pkg` file
   - Follow the installation wizard
   - Click "Continue" → "Agree" → "Install"
   - Enter your Mac password when prompted
   - Click "Close" when done

3. **Verify installation:**
   - Open a **NEW Terminal** window (important - close old ones)
   - Type: `node --version`
   - You should see: `v20.x.x` or similar

4. **Run your app:**
   ```bash
   cd ~/grocery-checklist-app
   npm install
   npm run dev
   ```

---

## ✅ Option 2: Using NVM (Node Version Manager)

NVM lets you install and manage multiple Node.js versions easily.

### Steps:

1. **Install NVM:**
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
   ```

2. **Restart your terminal or run:**
   ```bash
   source ~/.zshrc
   ```

3. **Install Node.js:**
   ```bash
   nvm install --lts
   nvm use --lts
   ```

4. **Verify:**
   ```bash
   node --version
   npm --version
   ```

5. **Run your app:**
   ```bash
   cd ~/grocery-checklist-app
   npm install
   npm run dev
   ```

---

## ✅ Option 3: Fix Homebrew Issues (Advanced)

If you prefer to continue with Homebrew, let's fix the issues:

### Step 1: Update Command Line Tools

```bash
# Remove old Command Line Tools
sudo rm -rf /Library/Developer/CommandLineTools

# Install fresh ones
xcode-select --install
```

A dialog will appear - click "Install" and wait for it to complete (takes 5-10 minutes).

### Step 2: Try Homebrew Again

```bash
# Retry Node.js installation (skip tests that failed)
brew install node --ignore-dependencies

# Or try specific version
brew install node@20
```

### Step 3: Add to PATH

If it installs but `node` command isn't found:

```bash
echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

---

## 🎯 Which Option Should You Choose?

| Option | Pros | Cons | Best For |
|--------|------|------|----------|
| **Option 1: Direct Download** | Easiest, GUI-based, no terminal needed | Single version only | Most users |
| **Option 2: NVM** | Manage multiple versions, flexible | Requires terminal | Developers |
| **Option 3: Fix Homebrew** | Good for future Homebrew use | More complex troubleshooting | Homebrew users |

**Recommendation:** Start with **Option 1** (Direct Download). It's the fastest and most reliable for your situation.

---

## 🔍 Troubleshooting

### After installation, "node: command not found"

**Solution:**
1. Close ALL terminal windows
2. Open a **brand new** terminal
3. Try `node --version` again

If still not working:

```bash
# Check where Node.js was installed
which node

# If it shows a path, add it to your PATH:
echo 'export PATH="/path/to/node:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### "Permission denied" errors during npm install

**Solution:**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) ~/grocery-checklist-app/node_modules
```

### Homebrew warnings about macOS 13

These are just warnings. Your macOS 13 (Ventura) is still supported by Node.js directly, just not the absolute latest Homebrew packages. The direct download will work perfectly.

---

## ✅ Quick Verification Checklist

After installing Node.js with any method:

```bash
# Check Node.js
node --version
# Should show: v20.x.x or v22.x.x

# Check npm
npm --version
# Should show: 10.x.x

# Navigate to app
cd ~/grocery-checklist-app

# Install dependencies
npm install
# Should complete without errors

# Start the app
npm run dev
# Should show: "Local: http://localhost:3000"
```

---

## 🚀 Once Node.js is Installed

Run these commands in order:

```bash
# 1. Go to app directory
cd ~/grocery-checklist-app

# 2. Install dependencies (first time only)
npm install

# 3. Start the app
npm run dev
```

You'll see output like:
```
  VITE v5.0.8  ready in 450 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.x:3000/
```

Open http://localhost:3000 in your browser - your grocery app is ready!

---

## 📱 Next Steps After App is Running

1. **Test the app** - Try checking/unchecking items
2. **Customize items** - Edit `src/data/groceryData.js`
3. **Install on phone** - See instructions in main README
4. **Share with cook** - Use the share button in the app

---

## 💡 Pro Tips

### Keep it running:
Leave the terminal open with `npm run dev` running. The app stays accessible at http://localhost:3000

### Stop the app:
Press `Ctrl+C` in the terminal

### Restart the app:
```bash
cd ~/grocery-checklist-app
npm run dev
```

### Update the app after editing files:
The app auto-reloads! Just save your changes in `groceryData.js` and refresh the browser.

---

## 🆘 Still Having Issues?

Try this simplified test:

```bash
# Test Node.js installation
node -e "console.log('Node.js works!')"
# Should print: Node.js works!

# Test npm
npm --version
# Should show a version number

# If both work, proceed with:
cd ~/grocery-checklist-app
npm install
npm run dev
```

If Node.js commands work but npm install fails, it might be a permissions issue:
```bash
sudo chown -R $(whoami) ~/grocery-checklist-app
cd ~/grocery-checklist-app
npm install
```

---

## 📞 Need More Help?

Include this info if asking for help:

```bash
# Run these and share the output:
node --version
npm --version
which node
which npm
echo $PATH
```

---

**Bottom Line:** Use Option 1 (Direct Download from nodejs.org) - it's the most reliable method for macOS 13 and will have you running the app in under 5 minutes!
