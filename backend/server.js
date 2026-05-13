require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const routes = require('./routes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// ── Automation services (catch errors so server still starts) ──
try {
  const { initCronJobs } = require('./services/cronJobs');
  initCronJobs();
} catch (e) { console.warn('⚠️  cronJobs failed to init:', e.message); }
try {
  const { initAutomation } = require('./services/scheduler.service');
  initAutomation();
} catch (e) { console.warn('⚠️  scheduler failed to init:', e.message); }

// ── Security Middleware ──
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});
app.use(helmet({ contentSecurityPolicy: false })); // disable CSP for dev
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:4000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:5173',
  'https://staging.northeastforu.com',
  'https://admin-staging.northeastforu.com',
  'https://northeastforu.com',
  'https://admin.northeastforu.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Rate Limiting (generous in dev) ──
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 200 : 10000,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// ── Routes ──
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/api/upload', uploadRoutes);
app.use('/api', routes);

// ── Health Check ──
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// ── Global Error Handler ──
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ERROR:`, err.message);
  if (process.env.NODE_ENV === 'development') console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? 'Internal Server Error' : err.message,
    ...(process.env.NODE_ENV === 'development' && { detail: err.message }),
  });
});

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log(`\n🚀 NorthEastForU API running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   DB: ${process.env.DATABASE_URL ? '✅ configured' : '❌ DATABASE_URL not set'}\n`);
});
