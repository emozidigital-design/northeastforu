const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        // Note: listModels is not on the genAI object directly in some versions, 
        // it's sometimes accessed via the generative model or a separate client.
        // In @google/generative-ai, we might need to use the REST API or just trial and error common names.
        // Actually, Trial and error is faster: gemini-1.5-flash-latest, gemini-1.5-pro, etc.

        console.log('Trying gemini-1.5-flash...');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("test");
        console.log('Success with gemini-1.5-flash');
    } catch (e) {
        console.error('Failed with gemini-1.5-flash:', e.message);

        try {
            console.log('Trying gemini-1.0-pro...');
            const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
            const result = await model.generateContent("test");
            console.log('Success with gemini-1.0-pro');
        } catch (e2) {
            console.error('Failed with gemini-1.0-pro:', e2.message);
        }
    }
}

listModels();
