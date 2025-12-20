# 🤖 Agentic Meal Planner - Setup Guide

Your app is now **AGENTIC**! It uses AI to intelligently plan meals and optimize shopping lists.

---

## 🎯 What's Agentic About It?

### **1. AI Meal Planning Agent**
- Click "AI Plan My Week" button
- Agent analyzes your preferences and past selections
- Generates balanced meal plan in 5 seconds
- Considers nutrition, variety, and preferences
- You approve, modify, or regenerate

### **2. Smart Shopping List Optimizer**
- Agent analyzes your shopping lists
- Suggests quantity optimizations
- Identifies cost savings opportunities
- Recommends using pantry items
- Reduces waste and saves money

### **3. Learning System** (Coming Soon)
- Tracks your meal preferences over time
- Learns patterns (e.g., Plan A weekdays, Plan B weekends)
- Suggests meals you're likely to enjoy
- Adapts to your feedback

---

## 🚀 Deployment Options

### **Option 1: Netlify (Recommended - FREE)**

This is the easiest and works perfectly for the agentic features.

#### **Step 1: Get Your Anthropic API Key**

1. Go to: https://console.anthropic.com/
2. Sign up (free $5 credit to start)
3. Navigate to "API Keys"
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-...`)

**Cost:** ~$0.01-$0.05 per meal plan generation. $5 credit = ~100-500 meal plans!

#### **Step 2: Install Dependencies**

```bash
cd ~/grocery-checklist-app
npm install
```

#### **Step 3: Deploy to Netlify**

**Method A: Netlify CLI (Easiest)**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Set your API key as environment variable
netlify env:set ANTHROPIC_API_KEY "your-api-key-here"

# Deploy!
netlify deploy --prod
```

**Method B: Netlify UI**

1. Push code to GitHub:
   ```bash
   cd ~/grocery-checklist-app
   git init
   git add .
   git commit -m "Agentic meal planner app"
   git branch -M main

   # Create repo on GitHub
   # Then:
   git remote add origin https://github.com/yourusername/meal-planner.git
   git push -u origin main
   ```

2. Go to https://app.netlify.com
3. Click "Add new site" → "Import from Git"
4. Choose GitHub → Select your repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

7. Add environment variable:
   - Site settings → Environment variables
   - Add: `ANTHROPIC_API_KEY` = your API key

8. Trigger redeploy

#### **Step 4: Test Your Agentic App**

1. Open your Netlify URL
2. Click "AI Plan My Week" button
3. Watch the magic! 🎉

---

### **Option 2: Vercel (Alternative)**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd ~/grocery-checklist-app
vercel

# Set environment variable
vercel env add ANTHROPIC_API_KEY

# Paste your API key when prompted

# Redeploy
vercel --prod
```

---

### **Option 3: Run Locally with Dev Server**

For development and testing:

```bash
# Create .env file
echo "ANTHROPIC_API_KEY=your-api-key-here" > .env

# Install dependencies
npm install

# Run with Netlify Dev (simulates serverless functions)
npx netlify dev
```

**Note:** This only works on your laptop. For iPhone access, you MUST deploy to Netlify/Vercel.

---

## 📱 Using the Agentic Features

### **1. AI Meal Planning**

On the meal selector page:

1. Click **"🤖 AI Plan My Week"** button
2. Agent generates complete meal plan (takes 3-5 seconds)
3. Review the plan
4. Accept it or click **"Regenerate"** for a different plan
5. Manually edit any meal if desired
6. Continue to shopping lists

**The AI considers:**
- Nutritional balance
- Variety (no repeat proteins)
- Your past preferences
- Mix of traditional and fusion meals

### **2. Smart Optimization**

On the shopping lists page:

1. After lists are generated, click **"🧠 Optimize Lists"**
2. Agent analyzes both lists (takes 2-3 seconds)
3. Shows optimization suggestions:
   - Quantity consolidations
   - Cost savings opportunities
   - Pantry usage recommendations
   - Practical shopping tips
4. Apply suggestions or dismiss

**Example Optimizations:**
- "Buy 1kg tomatoes on Sunday instead of 500g Sunday + 500g Wednesday"
- "You're using chicken 4 times - bulk 1.5kg package saves ₹80"
- "Avocados needed Wed & Fri - buy 2 on Wednesday for freshness"

---

## 💰 Cost Breakdown

### **Anthropic API Costs**

Using Claude 3.5 Sonnet:
- Input: $3 per million tokens
- Output: $15 per million tokens

**Your typical usage:**
- Meal plan generation: ~1000 input + 500 output tokens = $0.01
- List optimization: ~800 input + 400 output tokens = $0.008

**Monthly cost for weekly planning:**
- 4 meal plans/month: $0.04
- 8 optimizations/month: $0.064
- **Total: ~$0.10/month** (basically free!)

### **Free Credits:**
- Anthropic: $5 free credit = 50 meal plans + 100 optimizations
- Lasts you ~1 year!

### **Hosting (Netlify/Vercel):**
- FREE tier includes:
  - 100GB bandwidth/month
  - 125K serverless function requests/month
  - Far more than you'll ever use!

---

## 🔒 Security

### **API Key Protection**

✅ **What we did:**
- API keys stored in environment variables (never in code)
- Backend serverless functions (not exposed to frontend)
- .gitignore prevents committing .env files
- Keys never sent to browser

❌ **DON'T:**
- Put API keys directly in frontend code
- Commit .env files to GitHub
- Share your API keys publicly

### **Best Practices**

1. **Rotate keys periodically**
   - Go to Anthropic Console → API Keys → Create new key
   - Update in Netlify environment variables

2. **Monitor usage**
   - Check Anthropic Console for usage stats
   - Set up billing alerts

3. **Rate limiting** (optional)
   - Add rate limiting in serverless functions
   - Prevent abuse if URL is shared

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────────────┐
│           User's iPhone/Browser                  │
│  ┌──────────────────────────────────────────┐   │
│  │   React PWA (Frontend)                   │   │
│  │   - Meal Selection UI                     │   │
│  │   - Displays AI Results                   │   │
│  │   - Local Storage                         │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                     │
                     │ HTTPS
                     ↓
┌─────────────────────────────────────────────────┐
│         Netlify/Vercel (Hosting)                 │
│  ┌──────────────────────────────────────────┐   │
│  │   Serverless Functions (Backend)         │   │
│  │   - ai-meal-planner.js                   │   │
│  │   - ai-optimize-list.js                  │   │
│  │   - Securely stores API keys             │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                     │
                     │ API Call
                     ↓
┌─────────────────────────────────────────────────┐
│        Anthropic Claude API                      │
│   - Claude 3.5 Sonnet (meal planning)           │
│   - Claude 3.5 Haiku (optimization)             │
└─────────────────────────────────────────────────┘
```

---

## 🚧 Bottlenecks & Solutions

### **Bottleneck 1: API Response Time**
- **Issue:** Claude takes 3-5 seconds to respond
- **Solution:** Show loading animation, explain it's "thinking"
- **Improvement:** Cache common patterns (coming soon)

### **Bottleneck 2: Cold Starts**
- **Issue:** First request after idle takes 5-10 seconds
- **Solution:** Keep-alive ping every 5 minutes (optional)
- **User Impact:** Only first user each day notices

### **Bottleneck 3: Offline Usage**
- **Issue:** Agentic features need internet
- **Solution:** App still works offline with manual selection
- **Best of both:** Online = AI help, Offline = still functional

### **Bottleneck 4: Swiggy Auto-Ordering**
- **Issue:** No public Swiggy API
- **Current:** Agent generates optimized lists, you copy-paste
- **Future:** If Swiggy releases API, full automation possible

---

## 🔄 Updating the App

### **Adding New Meals**

1. Edit: `src/data/mealPlanData.js`
2. Edit: `src/data/ingredientDatabase.js`
3. Edit: `src/data/recipeDatabase.js`
4. Update the AI prompts in serverless functions
5. Deploy

### **Improving AI Responses**

Edit the prompts in:
- `netlify/functions/ai-meal-planner.js`
- `netlify/functions/ai-optimize-list.js`

Redeploy to Netlify.

---

## 🎉 Next Steps

**Now:**
1. ✅ Get Anthropic API key
2. ✅ Deploy to Netlify
3. ✅ Test AI features
4. ✅ Install on iPhone

**Soon:**
- Add pantry tracking
- Price comparison (Swiggy vs Blinkit vs Zepto)
- Nutritional analysis
- Weekly cost tracking

**Future:**
- Voice interface ("Hey meal planner, plan my week")
- WhatsApp bot integration
- Full Swiggy auto-ordering (when API available)

---

## 🆘 Troubleshooting

### **"AI features not working"**

1. Check API key is set:
   ```bash
   netlify env:list
   ```

2. Check function logs:
   ```bash
   netlify functions:log ai-meal-planner
   ```

3. Test API key locally:
   ```bash
   curl https://api.anthropic.com/v1/messages \
     -H "x-api-key: $ANTHROPIC_API_KEY" \
     -H "anthropic-version: 2023-06-01" \
     -H "content-type: application/json" \
     -d '{"model":"claude-3-5-sonnet-20241022","max_tokens":100,"messages":[{"role":"user","content":"Hello"}]}'
   ```

### **"API key invalid"**

1. Regenerate in Anthropic Console
2. Update in Netlify:
   ```bash
   netlify env:set ANTHROPIC_API_KEY "new-key"
   ```
3. Redeploy

### **"Functions timing out"**

1. Check Anthropic API status: https://status.anthropic.com/
2. Increase function timeout in `netlify.toml`:
   ```toml
   [functions]
     timeout = 30
   ```

---

## 🎯 Summary

**You now have:**
- ✅ AI-powered meal planning
- ✅ Smart shopping list optimization
- ✅ Secure backend architecture
- ✅ Works anywhere (iPhone, Android, desktop)
- ✅ Costs ~$0.10/month
- ✅ Fully agentic system

**This is production-ready!** Deploy and start using it today!

---

**Questions?** Check the main README or create an issue on GitHub!
