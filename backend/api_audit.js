const axios = require('axios');

const BASE_URL = 'http://localhost:5006';

const endpoints = [
    '/api/states',
    '/api/states/assam',
    '/api/states/meghalaya',
    '/api/states/arunachal-pradesh',
    '/api/states/nagaland',
    '/api/states/sikkim',
    '/api/states/manipur',
    '/api/states/mizoram',
    '/api/states/tripura',
    '/api/cities',
    '/api/cities/guwahati',
    '/api/cities/shillong',
    '/api/cities/gangtok',
    '/api/cities/tawang',
    '/api/cities/kohima',
    '/api/cities/imphal',
    '/api/cities/aizawl',
    '/api/cities/agartala',
    '/api/attractions',
    '/api/attractions/kaziranga-national-park',
    '/api/attractions/elephant-falls',
    '/api/attractions/tawang-monastery',
    '/api/attractions/tsomgo-lake',
    '/api/activities',
    '/api/blogs',
    '/api/search?q=shillong'
];

async function runAudit() {
    console.log('| Endpoint | Status | Is JSON | Has Data | Time (ms) |');
    console.log('|----------|--------|---------|----------|-----------|');

    for (const endpoint of endpoints) {
        const start = Date.now();
        try {
            const response = await axios.get(`${BASE_URL}${endpoint}`, { validateStatus: false });
            const duration = Date.now() - start;
            const isJson = response.headers['content-type']?.includes('application/json');
            const hasData = response.data && (Array.isArray(response.data.data) ? response.data.data.length > 0 : !!response.data.data);

            console.log(`| ${endpoint} | ${response.status} | ${isJson ? '✅' : '❌'} | ${hasData ? '✅' : '❌'} | ${duration} |`);
        } catch (error) {
            const duration = Date.now() - start;
            console.log(`| ${endpoint} | ERROR | ❌ | ❌ | ${duration} |`);
        }
    }
}

runAudit();
