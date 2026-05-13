const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const CLAUDE_SYSTEM_PROMPT = `You are an expert travel writer for NorthEastForU.com.

Write completely original travel content about destinations
in Assam, North East India.

Your content must be:
- 100 percent original writing
- Based on real knowledge of the destination
- Specific with real local details
- Helpful and practical for travellers
- Warm and engaging in tone
- Rich with genuine local insights
- Never copied or paraphrased from any other website

Include in every piece:
- Real entry fees in INR where applicable
- Real travel distances and journey times
- Local food recommendations with dish names
- Practical tips only experienced travellers know
- Best time to visit with specific months
- How to reach from Guwahati specifically
- What makes this place unique in all of India

Never use these overused phrases:
- hidden gem
- breathtaking views
- off the beaten path
- must visit
- paradise on earth`;

/**
 * Generates content using Gemini with exponential backoff retry for rate limits.
 */
async function generateContent(prompt, responseFormat, retries = 5, backoff = 30000) {
    const fullPrompt = `${CLAUDE_SYSTEM_PROMPT}\n\nTask: ${prompt}\n\nReturn the response as valid JSON in exactly this format: ${JSON.stringify(responseFormat)}`;

    // Try these models in order until one works
    const modelsToTry = [
        "gemini-2.5-flash",
        "gemini-2.5-pro",
        "gemini-pro-latest",
        "gemini-2.0-flash-lite",
        "gemini-2.0-flash"
    ];

    for (const modelName of modelsToTry) {
        console.log(`Attempting generation with model: ${modelName}`);
        let currentBackoff = backoff;
        for (let i = 0; i <= retries; i++) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName }, { apiVersion: "v1beta" });
                const result = await model.generateContent(fullPrompt);
                const response = await result.response;
                const rawText = response.text();

                const jsonStart = rawText.indexOf('{');
                const jsonEnd = rawText.lastIndexOf('}') + 1;
                const jsonStr = rawText.substring(jsonStart, jsonEnd);

                return JSON.parse(jsonStr);
            } catch (error) {
                // Log full error for debugging
                console.error(`Error with ${modelName}: ${error.message}`);

                // If it's a 404, move to the next model immediately
                if (error.status === 404 || error.message.includes('404')) {
                    console.warn(`Model ${modelName} not found. Skipping...`);
                    break;
                }

                // If it's a 429, retry with backoff or move to next model if out of retries
                if ((error.status === 429 || error.message.includes('429')) && i < retries) {
                    console.warn(`Rate limit hit for ${modelName}. Retrying in ${currentBackoff / 1000} seconds... (Attempt ${i + 1}/${retries})`);
                    await new Promise(resolve => setTimeout(resolve, currentBackoff));
                    currentBackoff *= 2;
                    continue;
                }

                console.error(`Error with model ${modelName}:`, error.message);
                break; // Move to next model
            }
        }
    }
    throw new Error("All AI models failed or reached quota limits.");
}

exports.generateCityContent = async (cityName) => {
    const format = {
        "name": "city name",
        "slug": "url-slug",
        "description": "300 word original description",
        "localFoodGuide": {
            "mustTryDishes": ["dish 1", "dish 2"],
            "wherToEat": "description of eating areas"
        },
        "howToReach": {
            "fromGuwahati": "specific directions",
            "byAir": "nearest airport details",
            "byTrain": "nearest station details",
            "byRoad": "road route description"
        },
        "bestTimeToVisit": "specific months and why",
        "budgetPerDay": 0,
        "topAttractions": ["attraction 1", "attraction 2"],
        "insiderTips": ["tip 1", "tip 2", "tip 3"],
        "seoTitle": "max 60 characters",
        "seoDescription": "max 160 characters",
        "faqQuestions": [
            { "question": "...", "answer": "..." }
        ]
    };
    return generateContent(`Generate a full city guide for ${cityName}, Assam.`, format);
};

exports.generateAttractionContent = async (attractionName, citySlug) => {
    const format = {
        "name": "attraction name",
        "slug": "url-slug",
        "citySlug": citySlug,
        "description": "250 word original description",
        "entryFee": "fee in INR or Free",
        "openingHours": "opening to closing time",
        "bestTimeToVisit": "time of day and season",
        "howToReach": "directions from city center",
        "timeRequired": "hours needed to explore",
        "photography": "photography tips for this place",
        "nearbyAttractions": ["attraction 1", "attraction 2"],
        "insiderTips": ["tip 1", "tip 2"],
        "seoTitle": "max 60 characters",
        "seoDescription": "max 160 characters",
        "faqQuestions": [
            { "question": "...", "answer": "..." }
        ]
    };
    return generateContent(`Generate a full attraction page for ${attractionName} in ${citySlug}, Assam.`, format);
};

exports.generateBlogContent = async (title, category) => {
    const format = {
        "title": title,
        "slug": "url-slug",
        "category": category,
        "content": "full article in markdown minimum 1200 words",
        "seoTitle": "max 60 characters",
        "seoDescription": "max 160 characters",
        "faqQuestions": [
            { "question": "...", "answer": "..." }
        ],
        "tags": ["tag1", "tag2", "tag3"]
    };
    return generateContent(`Generate a full blog post titled "${title}" in category "${category}".`, format);
};

exports.generateActivityContent = async (activityName, citySlug) => {
    const format = {
        "title": activityName,
        "slug": "url-slug",
        "citySlug": citySlug,
        "description": "200 word original description",
        "duration": "hours or days",
        "difficulty": "Easy/Moderate/Challenging",
        "price": "cost in INR",
        "bestSeason": "best months",
        "whatToExpect": "detailed description",
        "thingsToCarry": ["item 1", "item 2"],
        "bookingTips": "how and where to book",
        "seoTitle": "max 60 characters",
        "seoDescription": "max 160 characters"
    };
    return generateContent(`Generate a full activity page for ${activityName} in ${citySlug}, Assam.`, format);
};

exports.generateMassFAQs = async () => {
    const format = [
        {
            'category': 'category name',
            'question': 'specific question',
            'answer': 'detailed original answer',
            'relatedPageSlug': '/assam/relevant-page'
        }
    ];
    const prompt = `Generate 30 original frequently asked questions and detailed answers about travelling to Assam, North East India.
    Cover these topics:
    - Kaziranga National Park safari details
    - Kamakhya Temple visit guide
    - Majuli Island how to reach
    - Assam tea garden tours
    - Guwahati city travel tips
    - Assam river cruises
    - Best time to visit Assam
    - Assam food guide
    - Assam permit requirements
    - Budget travel in Assam
    Rules:
    - Every answer must be specific and practical
    - Include real costs in INR
    - Include real distances and travel times
    - Minimum 80 words per answer
    - Original content not found on other sites`;

    return generateContent(prompt, format);
};

exports.generateItineraryContent = async (itineraryType, duration, focus, keyword) => {
    const format = {
        "title": "original itinerary title",
        "slug": "url-slug",
        "duration": duration,
        "targetKeyword": keyword,
        "introduction": "200 word original intro",
        "days": [
            {
                "dayNumber": 1,
                "title": "Day 1 title",
                "description": "what to do this day",
                "accommodation": "where to stay",
                "meals": "what to eat",
                "estimatedCost": "INR amount",
                "tips": "practical tip for this day"
            }
        ],
        "totalEstimatedCost": {
            "budget": "INR amount",
            "midRange": "INR amount",
            "luxury": "INR amount"
        },
        "bestTimeToBook": "recommendation",
        "seoTitle": "max 60 characters",
        "seoDescription": "max 160 characters"
    };
    return generateContent(`Generate a ${duration} itinerary titled "${itineraryType}" focusing on "${focus}".`, format);
};
