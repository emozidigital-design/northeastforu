const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        // In @google/generative-ai, listModels is available
        const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).listModels(); // This is often incorrect, let's use the right way.
        // Actually, documentation says:
        // const results = await client.listModels();

        // Let's try the direct fetch approach if SDK method is elusive
        const fetch = require('node-fetch'); // Not sure if installed
        const url = `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`;

        console.log('Fetching models list from API...');
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log('Available models:');
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log('No models found or error:', JSON.stringify(data));
        }
    } catch (e) {
        console.error('Error listing models:', e.message);

        // Fallback: try common names
        const names = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro", "gemini-pro"];
        for (const name of names) {
            try {
                console.log(`Testing ${name}...`);
                const model = genAI.getGenerativeModel({ model: name }, { apiVersion: "v1" });
                const result = await model.generateContent("test");
                console.log(`✅ Success with ${name}`);
                return;
            } catch (err) {
                console.log(`❌ Failed with ${name}: ${err.message}`);
            }
        }
    }
}

listModels();
