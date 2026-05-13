const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
    console.log('Testing Gemini API with key:', process.env.GEMINI_API_KEY ? 'Present (REDACTED)' : 'MISSING');
    if (!process.env.GEMINI_API_KEY) {
        console.error('Error: GEMINI_API_KEY is not set in .env');
        console.log('Get a free key at: https://aistudio.google.com/');
        return;
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }, { apiVersion: "v1" });
        const result = await model.generateContent("Hello, Gemini! Confirm you are working by replying with 'ACK'.");
        const response = await result.response;
        console.log('Gemini Response:', response.text());
        console.log('✅ API Connection Successful!');
    } catch (error) {
        console.error('❌ API Connection Failed:', error.message);
    }
}

testGemini();
