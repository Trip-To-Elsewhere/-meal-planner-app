import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Format meal suggestions as WhatsApp message
function formatWhatsAppMessage(suggestions) {
  const { date, dayOfWeek, motivation, suggestions: meals, dailyCalorieRange, nutritionTip } = suggestions;

  let message = `🌙 *Good Evening!* 🌙\n\n`;
  message += `*Tomorrow's Meal Plan* - ${dayOfWeek}\n`;
  message += `${new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}\n\n`;
  message += `💪 *${motivation}*\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

  // Morning Drink
  message += `☀️ *MORNING DRINK*\n`;
  meals.morningDrink.forEach((option, idx) => {
    message += `${idx + 1}. ${option.name} (${option.calories} kcal)\n`;
    message += `   _${option.why}_\n`;
  });
  message += `\n`;

  // Breakfast
  message += `🍳 *BREAKFAST*\n`;
  meals.breakfast.forEach((option, idx) => {
    message += `${idx + 1}. ${option.name}\n`;
    message += `   ${option.calories} kcal | Protein: ${option.protein}g\n`;
    message += `   _${option.why}_\n`;
  });
  message += `\n`;

  // Lunch
  message += `🍛 *LUNCH*\n`;
  meals.lunch.forEach((option, idx) => {
    message += `${idx + 1}. ${option.name}\n`;
    message += `   ${option.calories} kcal | Protein: ${option.protein}g\n`;
    message += `   _${option.why}_\n`;
  });
  message += `\n`;

  // Evening Snack
  message += `☕ *EVENING SNACK*\n`;
  meals.eveningSnack.forEach((option, idx) => {
    message += `${idx + 1}. ${option.name}\n`;
    message += `   ${option.calories} kcal | Protein: ${option.protein}g\n`;
    message += `   _${option.why}_\n`;
  });
  message += `\n`;

  // Dinner
  message += `🍽 *DINNER*\n`;
  meals.dinner.forEach((option, idx) => {
    message += `${idx + 1}. ${option.name}\n`;
    message += `   ${option.calories} kcal | Protein: ${option.protein}g\n`;
    message += `   _${option.why}_\n`;
  });
  message += `\n`;

  // Night Drink (optional)
  message += `🥛 *BEDTIME (Optional)*\n`;
  meals.nightDrink.forEach((option, idx) => {
    message += `${idx + 1}. ${option.name} (${option.calories} kcal)\n`;
    message += `   _${option.why}_\n`;
  });
  message += `\n`;

  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `📊 *Daily Range:* ${dailyCalorieRange}\n\n`;
  message += `💡 *Tip:* ${nutritionTip}\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `*Reply with your choices:*\n`;
  message += `Example: "1-2, 2-1, 3-2, 4-1, 5-3, 6-1"\n`;
  message += `(Morning-Breakfast-Lunch-Snack-Dinner-Night)\n\n`;
  message += `Or just reply with "Looks good!" to confirm all Option 1s 👍`;

  return message;
}

// Send WhatsApp message via Twilio
export const handler = async (event, context) => {
  try {
    const { suggestions, phoneNumber } = JSON.parse(event.body || '{}');

    if (!phoneNumber) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: 'Phone number is required'
        })
      };
    }

    if (!suggestions) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: 'Meal suggestions are required'
        })
      };
    }

    // Format message
    const messageBody = formatWhatsAppMessage(suggestions);

    // Send via Twilio WhatsApp
    const message = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${phoneNumber}`,
      body: messageBody
    });

    console.log('WhatsApp message sent:', message.sid);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        messageSid: message.sid,
        status: message.status
      })
    };

  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
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
