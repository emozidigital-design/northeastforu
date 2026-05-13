const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const BASE_URL = 'http://localhost:5006/api';
const secret = process.env.JWT_SECRET || 'northeastforu_dev_jwt_secret_change_in_production_2026';
const token = jwt.sign({ id: 1, role: 'admin' }, secret);

const client = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` }
});

async function testAdminAPI() {
    console.log('--- Testing Admin API Enhancements ---');

    try {
        // 1. Test Stale Content
        console.log('\n[1] Testing getStaleContent...');
        const staleRes = await client.get('/admin/stale-content');
        console.log('Status:', staleRes.status);
        console.log('Success:', staleRes.data.success);
        console.log('Count:', staleRes.data.count);
        if (staleRes.data.data.length > 0) {
            console.log('Example item:', staleRes.data.data[0]);
        }

        // 2. Test Trigger Content Generation
        console.log('\n[2] Testing triggerContentGeneration...');
        const triggerRes = await client.post('/admin/trigger-content-generation');
        console.log('Status:', triggerRes.status);
        console.log('Job ID:', triggerRes.data.job_id);
        const jobId = triggerRes.data.job_id;

        // 3. Test Job Status Polling
        if (jobId) {
            console.log('\n[3] Testing getJobStatus...');
            for (let i = 0; i < 3; i++) {
                const statusRes = await client.get('/admin/automation/job-status');
                console.log(`Poll ${i + 1}:`, {
                    status: statusRes.data.data.status,
                    progress: statusRes.data.data.progress,
                    current: statusRes.data.data.current_item
                });
                await new Promise(r => setTimeout(r, 2000));
            }
        }

    } catch (error) {
        console.error('Error during testing:', error.response?.data || error.message);
    }
}

testAdminAPI();
