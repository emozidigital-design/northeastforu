const axios = require('axios');
const Redis = require('ioredis');

// Simple local cache fallback if Redis is not available
class LocalCache {
    constructor() {
        this.cache = new Map();
    }
    async get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }
        return JSON.stringify(item.value);
    }
    async set(key, value, mode, seconds) {
        this.cache.set(key, {
            value: JSON.parse(value),
            expiry: Date.now() + (seconds * 1000)
        });
    }
}

let redis;
try {
    redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    redis.on('error', (err) => {
        console.warn('Redis error, switching to local cache:', err.message);
        redis = new LocalCache();
    });
} catch (e) {
    console.warn('Redis not available, switching to local cache');
    redis = new LocalCache();
}

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const CACHE_TTL = 3 * 60 * 60; // 3 hours

/**
 * Fetches current weather and 7-day forecast for a city.
 */
exports.getWeather = async (cityName) => {
    const cacheKey = `nef:weather:${cityName.toLowerCase().replace(/\s+/g, '-')}`;

    // Check Cache
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
        console.log(`Serving weather for ${cityName} from cache.`);
        return JSON.parse(cachedData);
    }

    if (!OPENWEATHER_API_KEY) {
        throw new Error('OPENWEATHER_API_KEY is missing');
    }

    console.log(`Fetching live weather for ${cityName}...`);
    try {
        // Step 1: Get coordinates for city
        const geoResponse = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
            params: {
                q: `${cityName},IN`,
                limit: 1,
                appid: OPENWEATHER_API_KEY
            }
        });

        if (geoResponse.data.length === 0) {
            throw new Error(`City ${cityName} not found`);
        }

        const { lat, lon } = geoResponse.data[0];

        // Step 2: Get One Call Data (Current + Forecast)
        // Note: One Call API 3.0 requires subscription but has a free tier. 
        // If not available, we use 2.5 legacy or separate calls.
        const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {
            params: {
                lat,
                lon,
                exclude: 'minutely,hourly',
                units: 'metric',
                appid: OPENWEATHER_API_KEY
            }
        });

        const weatherData = {
            current: {
                temp: Math.round(weatherResponse.data.current.temp),
                condition: weatherResponse.data.current.weather[0].main,
                icon: weatherResponse.data.current.weather[0].icon,
                humidity: weatherResponse.data.current.humidity,
                wind_speed: weatherResponse.data.current.wind_speed,
                description: weatherResponse.data.current.weather[0].description
            },
            forecast: weatherResponse.data.daily.slice(0, 7).map(day => ({
                date: new Date(day.dt * 1000).toISOString(),
                temp_min: Math.round(day.temp.min),
                temp_max: Math.round(day.temp.max),
                condition: day.weather[0].main,
                icon: day.weather[0].icon
            })),
            last_updated: new Date().toISOString()
        };

        // Cache the result
        await redis.set(cacheKey, JSON.stringify(weatherData), 'EX', CACHE_TTL);

        return weatherData;

    } catch (error) {
        console.error('Weather API Error:', error.response?.data || error.message);
        throw error;
    }
};
