const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

async function testClaude() {
    console.log('Testing Claude API with key:', process.env.ANTHROPIC_API_KEY ? 'Present (REDACTED)' : 'MISSING');
    if (!process.env.ANTHROPIC_API_KEY) {
        console.error('Error: ANTHROPIC_API_KEY is not set in .env');
        return;
    }

    try {
        const response = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 100,
            messages: [{ role: "user", content: "Hello, Claude! Confirm you are working by replying with 'ACK'." }],
        });
        console.log('Claude Response:', response.content[0].text);
        console.log('✅ API Connection Successful!');
    } catch (error) {
        console.error('❌ API Connection Failed:', error.message);
        if (error.message.includes('401')) {
            console.error('Tip: Check if your API key is correct and has a valid subscription.');
        }
    }
}

testClaude();
