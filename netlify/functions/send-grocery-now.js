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

export const handler = async (event, context) => {
  try {
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

    const messageBody = formatGroceryListMessage('Wednesday', wednesdayItems);

    // Send to user
    const message1 = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${process.env.USER_PHONE_NUMBER}`,
      body: messageBody
    });

    console.log('Grocery list sent to user:', message1.sid);

    // Send to Sanjana if configured
    let message2Sid = null;
    if (process.env.SANJANA_PHONE_NUMBER) {
      const message2 = await client.messages.create({
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${process.env.SANJANA_PHONE_NUMBER}`,
        body: messageBody
      });
      message2Sid = message2.sid;
      console.log('Grocery list sent to Sanjana:', message2.sid);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Grocery list sent successfully',
        messageSids: {
          user: message1.sid,
          sanjana: message2Sid
        }
      })
    };

  } catch (error) {
    console.error('Error sending grocery list:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
