// Netlify Function: AI Meal Planner
// This runs serverless - keeps API keys secure

const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request
    const { preferences, pastMeals, constraints } = JSON.parse(event.body);

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    // Create the AI prompt
    const prompt = `You are a meal planning assistant for a couple in India (2 people).

CONTEXT:
- Users: 2 people cooking at home
- Preferences: Indian homely food with fusion elements (salads, rice bowls, healthy options)
- Meal types: Breakfast, Lunch, Dinner, Snacks

AVAILABLE MEALS:
Plan A (Traditional Indian):
- Monday: Veg oats + chai, 2 rotis + dal + veg + salad, Chicken curry + veg + 1 roti, Fruit + nuts
- Tuesday: Poha + fruit, Rajma chawal + salad, Mushroom masala + roti, Chana / makhana
- Wednesday: Besan chilla + chutney, Bhindi + dal + roti, Paneer shahi + roti, Fruit + nuts
- Thursday: Paratha + curd + chai, Methi chicken + roti + salad, Sprouts stir fry, Fruit + nuts
- Friday: Upma + fruit, Chole chawal, Chicken tikka + veg, Fruit + nuts
- Saturday: Moong dal chilla, Curd rice, Pav bhaji - 1 pav, Fruit + nuts
- Sunday: Dosa / idli, Veg + dal + roti, Paneer / chicken dish, Fruit + nuts

Plan B (Fusion & Light):
- Monday: Idli + chai, Paneer bhurji + roti + salad, California burrito bowl, Fruit + nuts
- Tuesday: Grilled sandwich + chai, Chicken wrap, Chinese stir fry chicken + veg, Fruit + nuts
- Wednesday: Dosa + sambhar, Sushi bowl, Lemon rice + curd, Fruit + nuts
- Thursday: Oats bowl + fruit, Subway 6-inch, Soup + grilled protein, Fruit + nuts
- Friday: Omelette + toast + chai, Buddha bowl, Fish & chips (shared), Fruit + nuts
- Saturday: Smoothie bowl, Asian rice + chicken, Thin crust pizza (shared), Fruit + nuts
- Sunday: Fruit + chai, Light roti sabzi, Sushi / Chinese / Burrito, Fruit + nuts

USER PREFERENCES:
${JSON.stringify(preferences || {})}

PAST MEALS (last week):
${JSON.stringify(pastMeals || 'None')}

CONSTRAINTS:
${JSON.stringify(constraints || 'Balance variety and nutrition')}

TASK:
Generate a balanced meal plan for the entire week (Monday-Sunday) with:
1. Variety: Don't repeat proteins on consecutive days
2. Balance: Mix Plan A and Plan B based on user preference patterns
3. Nutrition: Ensure balanced diet
4. Practicality: Group similar prep work on same days

Return ONLY a JSON object in this exact format:
{
  "monday": {"breakfast": "...", "lunch": "...", "dinner": "...", "snacks": "..."},
  "tuesday": {"breakfast": "...", "lunch": "...", "dinner": "...", "snacks": "..."},
  "wednesday": {"breakfast": "...", "lunch": "...", "dinner": "...", "snacks": "..."},
  "thursday": {"breakfast": "...", "lunch": "...", "dinner": "...", "snacks": "..."},
  "friday": {"breakfast": "...", "lunch": "...", "dinner": "...", "snacks": "..."},
  "saturday": {"breakfast": "...", "lunch": "...", "dinner": "...", "snacks": "..."},
  "sunday": {"breakfast": "...", "lunch": "...", "dinner": "...", "snacks": "..."},
  "reasoning": "Brief explanation of the plan (2-3 sentences)"
}

Use exact meal names from the available meals list above.`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    // Extract response
    const responseText = message.content[0].text;

    // Parse JSON from response
    let mealPlan;
    try {
      // Try to extract JSON if Claude wrapped it in markdown
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      mealPlan = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      mealPlan = { error: 'Failed to parse meal plan', raw: responseText };
    }

    // Return successful response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        mealPlan,
        tokensUsed: message.usage
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
