const { MeiliSearch } = require('meilisearch');

const client = new MeiliSearch({
    host: process.env.MEILI_HOST || 'http://127.0.0.1:7700',
    apiKey: process.env.MEILI_MASTER_KEY || 'masterKey',
});

exports.indexContent = async (type, data) => {
    try {
        const index = client.index(type);
        await index.addDocuments([data]);
    } catch (error) {
        console.error(`Meilisearch Index Error (${type}):`, error);
    }
};

exports.searchAll = async (query) => {
    try {
        const searchResults = await client.multiSearch({
            queries: [
                { indexUid: 'states', q: query, limit: 3 },
                { indexUid: 'cities', q: query, limit: 3 },
                { indexUid: 'attractions', q: query, limit: 3 },
                { indexUid: 'activities', q: query, limit: 3 },
                { indexUid: 'blogs', q: query, limit: 3 },
            ]
        });
        return searchResults;
    } catch (error) {
        console.error('Meilisearch Search Error:', error);
        return null;
    }
};
