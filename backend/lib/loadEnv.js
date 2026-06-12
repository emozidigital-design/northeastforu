// Centralised env loading. Loads `.env.local` first (developer/VPS secrets,
// gitignored), then `.env` as a fallback. Existing process env vars always win,
// so values already set in the shell / hosting platform are never overridden.
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });
