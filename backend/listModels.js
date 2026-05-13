const path = require('path');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        console.log('Listing models for key:', process.env.GEMINI_API_KEY.substring(0, 5) + '...');
        // The SDK doesn't have a direct listModels, we usually use the REST API
        const fetch = require('node-fetch');
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('Models:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Failed to list models:', error);
    }
}

listModels();
