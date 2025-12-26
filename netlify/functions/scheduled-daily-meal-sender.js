import { schedule } from '@netlify/functions';

// This function runs automatically every day at 9 PM IST (3:30 PM UTC)
const handler = async (event, context) => {
  try {
    console.log('Starting scheduled meal suggestion sender...');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split('T')[0];

    // Get meal history from database (we'll implement this later)
    const mealHistory = null; // For now, no history

    // Step 1: Generate meal suggestions using AI
    const suggestionsResponse = await fetch(`${process.env.URL}/.netlify/functions/daily-meal-suggestions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: tomorrowDate,
        mealHistory
      })
    });

    const { suggestions } = await suggestionsResponse.json();

    if (!suggestions) {
      throw new Error('Failed to generate meal suggestions');
    }

    console.log('Generated meal suggestions for:', tomorrowDate);

    // Step 2: Send via WhatsApp
    const whatsappResponse = await fetch(`${process.env.URL}/.netlify/functions/send-whatsapp-suggestions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        suggestions,
        phoneNumber: process.env.USER_PHONE_NUMBER // Your WhatsApp number
      })
    });

    const whatsappResult = await whatsappResponse.json();

    if (!whatsappResult.success) {
      throw new Error('Failed to send WhatsApp message');
    }

    console.log('WhatsApp message sent successfully:', whatsappResult.messageSid);

    // Optional: Send to Sanjana as well
    if (process.env.SANJANA_PHONE_NUMBER) {
      await fetch(`${process.env.URL}/.netlify/functions/send-whatsapp-suggestions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suggestions,
          phoneNumber: process.env.SANJANA_PHONE_NUMBER
        })
      });
      console.log('Message also sent to Sanjana');
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Daily meal suggestions sent successfully',
      date: tomorrowDate
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in scheduled meal sender:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Schedule: Every day at 9 PM IST (3:30 PM UTC)
// Cron format: minute hour day month dayOfWeek
// 30 15 * * * = 3:30 PM UTC = 9:00 PM IST
export default schedule('30 15 * * *', handler);
