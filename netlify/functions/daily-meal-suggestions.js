import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Generate daily meal suggestions with 2-3 options per meal
export const handler = async (event, context) => {
  try {
    const { date, mealHistory } = JSON.parse(event.body || '{}');

    const today = date || new Date().toISOString().split('T')[0];
    const dayOfWeek = new Date(today).toLocaleDateString('en-US', { weekday: 'long' });

    // Create prompt for Claude to suggest meals
    const prompt = `You are a helpful AI nutritionist and meal planner for a couple (2 people) on a weight loss journey.

Today is ${dayOfWeek}, ${today}.

Your task: Suggest 2-3 meal options for each meal time today. Consider:
- Weight loss goals (calorie-conscious but satisfying)
- Variety (avoid repeating meals from recent days)
- Balance of nutrients throughout the day
- Indian cuisine preferences with some global options
- Fresh, wholesome ingredients

Recent meal history (last 3 days):
${mealHistory ? JSON.stringify(mealHistory, null, 2) : 'No history available (fresh start)'}

Available meal categories:
1. Morning Drink (0-45 kcal) - healthy drinks to start the day
2. Breakfast (300-400 kcal) - filling, energizing
3. Lunch (450-550 kcal) - main meal, balanced
4. Evening Snack (100-200 kcal) - light, protein-rich preferred
5. Dinner (400-500 kcal) - lighter than lunch, easy to digest
6. Night Drink (70-130 kcal) - optional, calming

For EACH meal time, suggest 2-3 options from the meal database that:
- Provide variety (different cooking styles, ingredients)
- Balance the day's nutrition
- Include one "comfort" option and one "light" option
- Consider prep time (quick options for busy days)

Also include:
- A motivational message for the day (weight loss journey focused, encouraging)
- Why you picked these options (briefly)
- Total daily calorie range estimate

Respond in this JSON format:
{
  "date": "${today}",
  "dayOfWeek": "${dayOfWeek}",
  "motivation": "Your encouraging message here",
  "suggestions": {
    "morningDrink": [
      {"name": "Meal Name", "calories": 35, "why": "Reason for suggestion"},
      {"name": "Meal Name 2", "calories": 30, "why": "Reason"}
    ],
    "breakfast": [
      {"name": "Meal Name", "calories": 350, "protein": 22, "why": "Reason"},
      {"name": "Meal Name 2", "calories": 320, "protein": 12, "why": "Reason"}
    ],
    "lunch": [
      {"name": "Option 1", "calories": 480, "protein": 16, "why": "Reason"},
      {"name": "Option 2", "calories": 500, "protein": 18, "why": "Reason"}
    ],
    "eveningSnack": [
      {"name": "Option 1", "calories": 130, "protein": 4, "why": "Reason"},
      {"name": "Option 2", "calories": 140, "protein": 3, "why": "Reason"}
    ],
    "dinner": [
      {"name": "Option 1", "calories": 480, "protein": 40, "why": "Reason"},
      {"name": "Option 2", "calories": 450, "protein": 42, "why": "Reason"},
      {"name": "Option 3", "calories": 420, "protein": 22, "why": "Reason"}
    ],
    "nightDrink": [
      {"name": "Option 1", "calories": 110, "why": "Reason"},
      {"name": "Option 2", "calories": 0, "why": "Reason"}
    ]
  },
  "dailyCalorieRange": "1600-1900 kcal",
  "nutritionTip": "A brief tip for the day"
}

Use actual meal names from the database. Be specific and practical.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 2500,
      temperature: 0.8,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const responseText = message.content[0].text;

    // Extract JSON from response
    let suggestions;
    try {
      // Try to parse as direct JSON
      suggestions = JSON.parse(responseText);
    } catch (e) {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) ||
                       responseText.match(/```\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Could not parse AI response as JSON');
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        suggestions
      })
    };

  } catch (error) {
    console.error('Error generating meal suggestions:', error);
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
