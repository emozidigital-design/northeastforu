const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'your_actual_key_here');

exports.generateMeta = async ({ page_type, title, description, location }) => {
  const prompt = `You are a travel SEO expert for North East India.
  Generate optimized SEO metadata for a ${page_type} page.
  Title: ${title}
  Description: ${description}
  Location: ${location}
  
  Return exactly in JSON format:
  {
    "seo_title": "Max 60 chars",
    "seo_description": "Max 160 chars",
    "faqs": [
      {"question": "...", "answer": "..."},
      {"question": "...", "answer": "..."},
      {"question": "...", "answer": "..."},
      {"question": "...", "answer": "..."},
      {"question": "...", "answer": "..."}
    ]
  }`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const rawText = response.text();

  try {
    const jsonStart = rawText.indexOf('{');
    const jsonEnd = rawText.lastIndexOf('}') + 1;
    return JSON.parse(rawText.substring(jsonStart, jsonEnd));
  } catch (error) {
    throw new Error('Failed to parse AI response');
  }
};

exports.generateBlogDraft = async ({ topic, location, word_count }) => {
  const prompt = `Write a comprehensive travel blog post about ${topic} in ${location}.
  Word count: around ${word_count} words.
  Format: Markdown.
  Include headings, bullet points, and practical travel tips.`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
