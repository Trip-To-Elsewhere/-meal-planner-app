// Netlify Function: AI Shopping List Optimizer
// Analyzes shopping lists and suggests optimizations

const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { sundayList, wednesdayList, pantryItems } = JSON.parse(event.body);

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    const prompt = `You are a smart grocery shopping optimizer for an Indian household (2 people).

SUNDAY SHOPPING LIST:
${JSON.stringify(sundayList, null, 2)}

WEDNESDAY SHOPPING LIST:
${JSON.stringify(wednesdayList, null, 2)}

CURRENT PANTRY ITEMS:
${pantryItems ? JSON.stringify(pantryItems, null, 2) : 'None provided'}

TASK:
Analyze these lists and provide optimization suggestions:

1. QUANTITY OPTIMIZATION
   - If an item appears in both lists, can we buy all on Sunday?
   - Bulk buying opportunities (e.g., buying 1kg vs 2x500g)
   - Shelf life considerations

2. COST SAVINGS
   - Items that are cheaper when bought in bulk
   - Seasonal alternatives (if applicable)

3. PANTRY USAGE
   - Items user already has that can be removed from list
   - Substitutions using pantry items

4. PRACTICAL TIPS
   - Grouping items for easier shopping
   - Storage advice for bulk items

Return JSON in this format:
{
  "optimizations": [
    {
      "type": "quantity" | "cost" | "pantry" | "practical",
      "item": "item name",
      "suggestion": "what to do",
      "savings": "estimated savings or benefit",
      "priority": "high" | "medium" | "low"
    }
  ],
  "summary": "Overall optimization summary (2-3 sentences)",
  "estimatedSavings": "Overall estimated savings"
}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022', // Using Haiku for cost efficiency
      max_tokens: 1500,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const responseText = message.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const optimizations = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        optimizations,
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
