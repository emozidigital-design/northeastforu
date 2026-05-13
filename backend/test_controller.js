require('dotenv').config();
const stateController = require('./controllers/stateController');
const pool = require('./lib/db');

async function testController() {
    const req = { query: {} };
    const res = {
        json: (data) => {
            console.log('Controller response:', JSON.stringify(data, null, 2));
        },
        status: (code) => {
            console.log('Status code:', code);
            return res;
        }
    };
    const next = (err) => {
        console.error('Next called with error:', err);
    };

    console.log('--- Testing getAllStates ---');
    await stateController.getAllStates(req, res, next);

    console.log('\n--- Testing Raw Query ---');
    try {
        const query = `
      SELECT s.*, COUNT(c.id)::int AS city_count
      FROM states s
      LEFT JOIN cities c ON c.state_id = s.id
      WHERE 1=1
      GROUP BY s.id ORDER BY s.name
    `;
        const { rows } = await pool.query(query);
        console.log('Raw query rows count:', rows.length);
        if (rows.length > 0) {
            console.log('First row:', rows[0]);
        }
    } catch (err) {
        console.error('Raw query error:', err);
    }

    await pool.end();
}

testController();
