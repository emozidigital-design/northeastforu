require('dotenv').config();
const aiService = require('./services/aiService');

async function test() {
    console.log('Testing with existing aiService.generateMetadata...');
    try {
        const metadata = await aiService.generateMeta({ page_type: 'state', title: 'Assam', description: 'Assam travel guide', location: 'Assam' });
        console.log('Metadata:', JSON.stringify(metadata, null, 2));
    } catch (error) {
        console.error('Test failed:', error);
    }
}

test();
