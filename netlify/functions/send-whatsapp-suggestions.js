import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Format meal suggestions as WhatsApp message (compact version < 1600 chars)
function formatWhatsAppMessage(suggestions) {
  const { date, dayOfWeek, motivation, suggestions: meals, dailyCalorieRange } = suggestions;

  let message = `🌙 *${dayOfWeek}'s Menu*\n`;
  message += `💪 ${motivation}\n\n`;

  // Morning Drink
  message += `☀️ *MORNING*\n`;
  meals.morningDrink.forEach((opt, i) => {
    message += `${i + 1}. ${opt.name} (${opt.calories}cal)\n`;
  });

  // Breakfast
  message += `\n🍳 *BREAKFAST*\n`;
  meals.breakfast.forEach((opt, i) => {
    message += `${i + 1}. ${opt.name} (${opt.calories}cal, ${opt.protein}g)\n`;
  });

  // Lunch
  message += `\n🍛 *LUNCH*\n`;
  meals.lunch.forEach((opt, i) => {
    message += `${i + 1}. ${opt.name} (${opt.calories}cal, ${opt.protein}g)\n`;
  });

  // Evening Snack
  message += `\n☕ *SNACK*\n`;
  meals.eveningSnack.forEach((opt, i) => {
    message += `${i + 1}. ${opt.name} (${opt.calories}cal)\n`;
  });

  // Dinner
  message += `\n🍽 *DINNER*\n`;
  meals.dinner.forEach((opt, i) => {
    message += `${i + 1}. ${opt.name} (${opt.calories}cal, ${opt.protein}g)\n`;
  });

  // Night Drink
  message += `\n🥛 *BEDTIME*\n`;
  meals.nightDrink.forEach((opt, i) => {
    message += `${i + 1}. ${opt.name} (${opt.calories}cal)\n`;
  });

  message += `\n📊 ${dailyCalorieRange}\n`;
  message += `\n*Reply:* "1-2, 2-1, 3-2, 4-1, 5-3, 6-1"\n`;
  message += `Or "Looks good!" for all Option 1s 👍`;

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
