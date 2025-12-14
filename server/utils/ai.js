const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { PromptTemplate } = require('langchain/prompts');

const model = new ChatGoogleGenerativeAI({
  modelName: 'gemini-pro',
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.3,
  maxOutputTokens: 500
});

const analysisTemplate = PromptTemplate.fromTemplate(`
Analyze browser usage data and provide insights:

{data}

Format response as:
**Daily Summary:** [2-3 sentences about today's usage]

**Patterns:** [Key patterns observed]

**Productivity Score:** [Rate 1-10 with brief explanation]

**Recommendations:**
• [Actionable tip 1]
• [Actionable tip 2]
• [Actionable tip 3]

Keep concise and actionable.
`);

async function generateInsights(data) {
  try {
    const prompt = await analysisTemplate.format({ 
      data: JSON.stringify(data, null, 2) 
    });
    const response = await model.invoke(prompt);
    return response.content;
  } catch (error) {
    console.error('AI analysis error:', error);
    return 'Unable to generate insights at this time. Please try again later.';
  }
}

module.exports = { generateInsights };