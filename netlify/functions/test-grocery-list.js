import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Format grocery list for WhatsApp
function formatGroceryListMessage(day, ingredients) {
  const emoji = day === 'Sunday' ? '🛒' : '🥬';
  const description = day === 'Sunday'
    ? 'Long-lasting items for the week'
    : 'Fresh items (veggies, dairy, meats)';

  let message = `${emoji} *${day.toUpperCase()} GROCERY LIST* ${emoji}\n\n`;
  message += `_${description}_\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

  // Group ingredients by category
  const categories = {
    'Vegetables': [],
    'Fruits': [],
    'Dairy & Eggs': [],
    'Proteins': [],
    'Grains & Pulses': [],
    'Spices & Condiments': [],
    'Others': []
  };

  ingredients.forEach(item => {
    const category = item.category || 'Others';
    if (categories[category]) {
      categories[category].push(item);
    } else {
      categories['Others'].push(item);
    }
  });

  // Print each category
  Object.entries(categories).forEach(([category, items]) => {
    if (items.length > 0) {
      message += `*${category}:*\n`;
      items.forEach(item => {
        message += `☐ ${item.name}`;
        if (item.quantity) {
          message += ` - ${item.quantity}`;
        }
        message += `\n`;
      });
      message += `\n`;
    }
  });

  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `💡 *Tip:* Copy this list and paste into Swiggy Instamart search!\n\n`;
  message += `✅ Check off items as you add them to cart\n`;
  message += `📦 Based on your meal plan for this week`;

  return message;
}

// Get sample grocery items
function getSampleGroceryItems() {
  // Wednesday list (fresh items)
  const wednesdayItems = [
    { name: 'Tomatoes', quantity: '1 kg', category: 'Vegetables' },
    { name: 'Onions', quantity: '1 kg', category: 'Vegetables' },
    { name: 'Mushrooms', quantity: '400g', category: 'Vegetables' },
    { name: 'Spinach (Palak)', quantity: '2 bunches', category: 'Vegetables' },
    { name: 'Beetroot', quantity: '500g', category: 'Vegetables' },
    { name: 'Cucumber', quantity: '500g', category: 'Vegetables' },
    { name: 'Carrot', quantity: '500g', category: 'Vegetables' },
    { name: 'Bottle Gourd (Lauki)', quantity: '1 piece', category: 'Vegetables' },
    { name: 'Bhindi (Okra)', quantity: '500g', category: 'Vegetables' },
    { name: 'Green Chilies', quantity: '100g', category: 'Vegetables' },
    { name: 'Ginger', quantity: '200g', category: 'Vegetables' },
    { name: 'Garlic', quantity: '200g', category: 'Vegetables' },
    { name: 'Coriander Leaves', quantity: '2 bunches', category: 'Vegetables' },
    { name: 'Mint Leaves', quantity: '1 bunch', category: 'Vegetables' },
    { name: 'Apples', quantity: '6 pieces', category: 'Fruits' },
    { name: 'Oranges', quantity: '6 pieces', category: 'Fruits' },
    { name: 'Papaya', quantity: '1 piece', category: 'Fruits' },
    { name: 'Bananas', quantity: '6 pieces', category: 'Fruits' },
    { name: 'Eggs', quantity: '12 pieces', category: 'Dairy & Eggs' },
    { name: 'Milk', quantity: '2 liters', category: 'Dairy & Eggs' },
    { name: 'Curd', quantity: '1 kg', category: 'Dairy & Eggs' },
    { name: 'Paneer', quantity: '400g', category: 'Dairy & Eggs' },
    { name: 'Chicken (skinless)', quantity: '1 kg', category: 'Proteins' },
    { name: 'Fish (fresh)', quantity: '500g', category: 'Proteins' }
  ];

  return wednesdayItems;
}

// Send grocery list via WhatsApp
async function sendGroceryList(day, items, phoneNumber) {
  const messageBody = formatGroceryListMessage(day, items);

  const message = await client.messages.create({
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
    to: `whatsapp:${phoneNumber}`,
    body: messageBody
  });

  return message;
}

export const handler = async (event, context) => {
  try {
    console.log('Sending test grocery list...');

    const items = getSampleGroceryItems();

    // Send to primary user
    const message1 = await sendGroceryList('Wednesday', items, process.env.USER_PHONE_NUMBER);
    console.log('Grocery list sent to user:', message1.sid);

    // Send to Sanjana if configured
    if (process.env.SANJANA_PHONE_NUMBER) {
      const message2 = await sendGroceryList('Wednesday', items, process.env.SANJANA_PHONE_NUMBER);
      console.log('Grocery list sent to Sanjana:', message2.sid);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Test grocery list sent successfully',
      messageSids: [message1.sid]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error sending test grocery list:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
