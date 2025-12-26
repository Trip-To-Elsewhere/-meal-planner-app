# 📱 WhatsApp Meal Planner Setup Guide

This guide will help you set up automated daily meal suggestions and grocery lists sent directly to your WhatsApp.

---

## 🎯 What You'll Get

✅ **Daily at 9 PM**: Meal suggestions for tomorrow with 2-3 options per meal + calories + motivation
✅ **Sunday 8 AM**: Weekly grocery shopping list (long-lasting items)
✅ **Wednesday 8 AM**: Mid-week grocery list (fresh items)

---

## 📋 Prerequisites

1. A Twilio account (free trial available)
2. Your Anthropic API key (already set up)
3. Your phone number (WhatsApp enabled)
4. Netlify account (already set up)

---

## 🚀 Step-by-Step Setup

### **Step 1: Create Twilio Account**

1. Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Sign up for a free account
3. Verify your email and phone number
4. You'll get **$15 free credit** (enough for ~1000 WhatsApp messages)

### **Step 2: Enable WhatsApp Sandbox**

1. In Twilio Console, go to **Messaging** → **Try it out** → **Send a WhatsApp message**
2. You'll see a WhatsApp number (e.g., +1 415 523 8886)
3. Follow the instructions to join the sandbox:
   - Save the Twilio number in your phone
   - Send a WhatsApp message with the code (e.g., "join <your-code>")
   - You'll receive a confirmation message

4. **Repeat for Sanjana**: Have her send the same join code to connect her WhatsApp

### **Step 3: Get Your Twilio Credentials**

1. In Twilio Console, go to **Account** → **API keys & tokens**
2. Copy these 3 values:
   - **Account SID** (starts with AC...)
   - **Auth Token** (click to reveal)
   - **WhatsApp Number** (from Step 2, e.g., +14155238886)

### **Step 4: Add Environment Variables to Netlify**

1. Go to your Netlify dashboard: [https://app.netlify.com](https://app.netlify.com)
2. Select your site (guileless-profiterole-00a671)
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable** and add these:

```
TWILIO_ACCOUNT_SID = <your Account SID>
TWILIO_AUTH_TOKEN = <your Auth Token>
TWILIO_WHATSAPP_NUMBER = <Twilio WhatsApp number with +>
USER_PHONE_NUMBER = <your phone number with country code, e.g., +919876543210>
SANJANA_PHONE_NUMBER = <Sanjana's phone number with +91...>
```

**Important**:
- Phone numbers MUST include country code (e.g., +91 for India)
- No spaces or dashes in phone numbers
- Mark all as "Secret" values

### **Step 5: Install Dependencies**

Run this in your project folder:

```bash
cd /Users/mayankbharti/grocery-checklist-app
npm install
```

This will install:
- `twilio` - WhatsApp messaging
- `@netlify/functions` - Scheduled functions

### **Step 6: Deploy to Netlify**

1. Commit and push the changes:

```bash
git add .
git commit -m "Add WhatsApp meal planner with scheduled functions"
git push origin main
```

2. Netlify will automatically deploy (takes 2-3 minutes)

3. Check deploy status at: https://app.netlify.com/sites/guileless-profiterole-00a671/deploys

### **Step 7: Verify Scheduled Functions**

1. In Netlify dashboard, go to **Functions** tab
2. You should see:
   - `scheduled-daily-meal-sender` (runs at 9 PM IST daily)
   - `scheduled-grocery-list-sender` (runs at 8 AM IST Sun/Wed)

3. Click on each function to view logs and verify they're scheduled correctly

---

## 🧪 Testing (Before Going Live)

### Test Daily Meal Suggestions Manually

1. Go to: `https://guileless-profiterole-00a671.netlify.app/.netlify/functions/daily-meal-suggestions`

2. Use a tool like Postman or curl:

```bash
curl -X POST https://guileless-profiterole-00a671.netlify.app/.netlify/functions/daily-meal-suggestions \
  -H "Content-Type: application/json" \
  -d '{"date": "2024-12-27", "mealHistory": null}'
```

3. You should get JSON response with meal suggestions

### Test WhatsApp Sending Manually

```bash
curl -X POST https://guileless-profiterole-00a671.netlify.app/.netlify/functions/send-whatsapp-suggestions \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+919876543210",
    "suggestions": {
      "date": "2024-12-27",
      "dayOfWeek": "Friday",
      "motivation": "Test message",
      "suggestions": {...}
    }
  }'
```

---

## 📅 Schedule Reference

| Function | Runs | Time (IST) | Purpose |
|----------|------|------------|---------|
| Daily Meal Sender | Every day | 9:00 PM | Send tomorrow's meal options |
| Grocery List Sender | Sun & Wed | 8:00 AM | Send shopping lists |

---

## 💰 Cost Breakdown

### Twilio Pricing (India)
- **WhatsApp messages**: ₹0.70 per message (~$0.008)
- **Free trial credit**: $15 (~ ₹1250) = ~1800 messages
- **Monthly usage**:
  - Daily meal suggestions: 30 messages/month
  - Grocery lists: 8 messages/month
  - **Total**: ~40 messages/month = ~₹30/month ($0.32)

### After Free Trial Runs Out
- Add ₹500 ($6) to Twilio account = ~700 messages = ~18 months of usage

---

## 🔧 Customization Options

### Change Timing

Edit the cron schedule in the function files:

**Daily meals (currently 9 PM IST = 3:30 PM UTC):**
```javascript
// In scheduled-daily-meal-sender.js
export default schedule('30 15 * * *', handler);
//                        ^^  ^^
//                        min hour (UTC)
```

**Grocery lists (currently 8 AM IST = 2:30 AM UTC):**
```javascript
// In scheduled-grocery-list-sender.js
export default schedule('30 2 * * 0,3', handler);
//                        ^^  ^      ^^^
//                        min hour   days (0=Sun, 3=Wed)
```

### Change Phone Numbers

Update environment variables in Netlify dashboard (no code changes needed)

### Modify Message Format

Edit the `formatWhatsAppMessage()` function in:
- `send-whatsapp-suggestions.js` (daily meals)
- `scheduled-grocery-list-sender.js` (grocery lists)

---

## 🐛 Troubleshooting

### Messages Not Arriving

1. **Check Netlify Function Logs**:
   - Go to Functions tab → Click function → View logs
   - Look for errors

2. **Verify WhatsApp Sandbox**:
   - Make sure you sent the "join" code
   - Sandbox expires after 72 hours of inactivity - rejoin if needed

3. **Check Environment Variables**:
   - All variables set correctly?
   - Phone numbers have country code (+91)?
   - No extra spaces?

### Wrong Timing

- Netlify uses UTC time
- IST = UTC + 5:30
- Use [crontab.guru](https://crontab.guru) to verify cron expressions

### AI Suggestions Not Good

- Edit the prompt in `daily-meal-suggestions.js`
- Adjust temperature (0.8 = creative, 0.2 = consistent)
- Add more constraints or preferences

---

## 🎓 How to Use Daily

### When You Receive Meal Suggestions (9 PM)

1. Review the options for tomorrow
2. Reply with your choices:
   ```
   1-2, 2-1, 3-2, 4-1, 5-3, 6-1
   ```
   (Morning-Breakfast-Lunch-Snack-Dinner-Night)

3. Or just reply "Looks good!" to accept all Option 1s

### When You Receive Grocery Lists (Sun/Wed 8 AM)

1. Open Swiggy Instamart app
2. Copy items from WhatsApp message
3. Paste into search bar
4. Check off items as you add to cart

---

## 🔮 Future Enhancements (Phase 2)

- [ ] Voice input for meal selection
- [ ] Photo sharing of meals
- [ ] Automatic learning from your choices
- [ ] Recipe videos/instructions
- [ ] Progress tracking and analytics
- [ ] Integration with Swiggy API (auto-add to cart)

---

## 📞 Support

If you face any issues:
1. Check Netlify function logs
2. Verify Twilio sandbox is active
3. Test functions manually with curl
4. Check environment variables

---

## ✅ Setup Complete Checklist

- [ ] Twilio account created
- [ ] WhatsApp sandbox activated (you + Sanjana)
- [ ] Environment variables added to Netlify
- [ ] Dependencies installed
- [ ] Code pushed to GitHub
- [ ] Netlify deployed successfully
- [ ] Functions appear in Netlify dashboard
- [ ] Test message sent successfully
- [ ] Received first meal suggestion at 9 PM
- [ ] Received first grocery list on Sunday/Wednesday

---

🎉 **You're all set!** You'll receive your first automated meal suggestions at 9 PM tonight!
