const path = require('path');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
    console.log('Testing Gemini API with key:', process.env.GEMINI_API_KEY.substring(0, 5) + '...');
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        // Try listing models if possible, or just try gemini-pro
        const result = await model.generateContent("Write a one paragraph travel tip for Assam.");
        const response = await result.response;
        console.log('Response:', response.text());
    } catch (error) {
        console.error('Test failed:', error);
    }
}

test();
