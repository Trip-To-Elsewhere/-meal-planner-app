import { schedule } from '@netlify/functions';
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

// Get ingredients needed for the week
async function getWeeklyIngredients(startDate, endDate) {
  // This will fetch meal selections from database and compile ingredients
  // For now, returning mock data - we'll implement database later

  // Mock Sunday list (long-lasting items)
  const sundayItems = [
    { name: 'Rice', quantity: '2 kg', category: 'Grains & Pulses' },
    { name: 'Wheat Flour (Atta)', quantity: '2 kg', category: 'Grains & Pulses' },
    { name: 'Toor Dal', quantity: '500g', category: 'Grains & Pulses' },
    { name: 'Moong Dal', quantity: '500g', category: 'Grains & Pulses' },
    { name: 'Rajma', quantity: '500g', category: 'Grains & Pulses' },
    { name: 'Oats', quantity: '1 kg', category: 'Grains & Pulses' },
    { name: 'Olive Oil', quantity: '500ml', category: 'Spices & Condiments' },
    { name: 'Cumin Seeds', quantity: '100g', category: 'Spices & Condiments' },
    { name: 'Turmeric Powder', quantity: '100g', category: 'Spices & Condiments' },
    { name: 'Garam Masala', quantity: '50g', category: 'Spices & Condiments' },
    { name: 'Rock Salt', quantity: '500g', category: 'Spices & Condiments' },
    { name: 'Almonds', quantity: '200g', category: 'Others' },
    { name: 'Walnuts', quantity: '200g', category: 'Others' },
    { name: 'Chia Seeds', quantity: '100g', category: 'Others' },
    { name: 'Flax Seeds', quantity: '100g', category: 'Others' }
  ];

  // Mock Wednesday list (fresh items)
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

  return { sundayItems, wednesdayItems };
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

const handler = async (event, context) => {
  try {
    console.log('Starting scheduled grocery list sender...');

    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 3 = Wednesday

    // Determine which list to send
    let shoppingDay;
    let items;

    if (dayOfWeek === 0) {
      // Sunday morning - send Sunday list
      shoppingDay = 'Sunday';
      const { sundayItems } = await getWeeklyIngredients();
      items = sundayItems;
    } else if (dayOfWeek === 3) {
      // Wednesday morning - send Wednesday list
      shoppingDay = 'Wednesday';
      const { wednesdayItems } = await getWeeklyIngredients();
      items = wednesdayItems;
    } else {
      // Not a shopping day, skip
      console.log('Not a shopping day, skipping...');
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Not a shopping day, no message sent'
        })
      };
    }

    // Send to primary user
    const message1 = await sendGroceryList(shoppingDay, items, process.env.USER_PHONE_NUMBER);
    console.log('Grocery list sent to user:', message1.sid);

    // Send to Sanjana if configured
    if (process.env.SANJANA_PHONE_NUMBER) {
      const message2 = await sendGroceryList(shoppingDay, items, process.env.SANJANA_PHONE_NUMBER);
      console.log('Grocery list sent to Sanjana:', message2.sid);
    }

    return new Response(JSON.stringify({
      success: true,
      message: `${shoppingDay} grocery list sent successfully`,
      day: shoppingDay
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in scheduled grocery list sender:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Schedule: Every Sunday and Wednesday at 8 AM IST (2:30 AM UTC)
// Cron format: minute hour day month dayOfWeek
// 30 2 * * 0,3 = 2:30 AM UTC on Sunday and Wednesday = 8:00 AM IST
export default schedule('30 2 * * 0,3', handler);
