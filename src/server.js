const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generateTextWithPrompt(prompt) {
  try {
    const models = await genAI.listModels();
    const model = models.find(m => m.supportedGenerationMethods.includes('generateText'));
    if (!model) {
      throw new Error('Error: No models found');
    }
    const result = await model.generateText({
      prompt: prompt,
      temperature: 0.1,
      maxOutputTokens: 500
    });
    return result;
  } catch (error) {
    console.error('Error generating text:', error);
    throw new Error('Unable to generate text');
  }
}

module.exports = async (req, res) => {
  const { route } = req.query;
  
  if (!route) {
    return res.status(400).json({ error: 'Please provide a route' });
  }

  const topic = req.query.topic;
  if (!topic) {
    return res.status(400).json({ error: 'Please provide a topic' });
  }

  let prompt;
  switch (route) {
    case 'generate_attractions_info':
      prompt = `Provide detailed information about ${topic}'s attractions only. Give headings with ### only.`;
      break;
    case 'generate_restaurants_info':
      prompt = `Provide detailed information about ${topic}'s restaurants and food spots only. Give headings with ### only.`;
      break;
    case 'generate_itinerary_info':
      prompt = `Create a travel itinerary for a trip to ${topic}. Give headings with ### only.`;
      break;
    case 'generate_travel_tips':
      prompt = `Provide travel tips for ${topic} related to transportation, Staying and Time to visit only. Give headings with ### only.`;
      break;
    case 'generate_travel_budget':
      prompt = `Provide a budget estimate for a trip to ${topic}.`;
      break;
    default:
      return res.status(404).json({ error: 'Route not found' });
  }

  try {
    const info = await generateTextWithPrompt(prompt);
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: 'Unable to generate information' });
  }
};
