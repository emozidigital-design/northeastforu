const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../lib/db');

function signToken(user) {
    return jwt.sign(
        { userId: user.id, role: user.role, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '24h' }
    );
}

// POST /api/auth/login
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { rows } = await pool.query(
            'SELECT id, email, password_hash, name, role, is_active FROM admin_users WHERE email = $1',
            [email.toLowerCase().trim()]
        );

        const user = rows[0];
        if (!user || !user.is_active) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        await pool.query('UPDATE admin_users SET last_login_at = now() WHERE id = $1', [user.id]);

        const token = signToken(user);
        return res.status(200).json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/auth/me  (requires authMiddleware)
exports.me = async (req, res, next) => {
    try {
        const { rows } = await pool.query(
            'SELECT id, email, name, role, is_active, last_login_at FROM admin_users WHERE id = $1',
            [req.user.userId]
        );
        const user = rows[0];
        if (!user || !user.is_active) {
            return res.status(401).json({ error: 'User not found or inactive' });
        }
        res.json({ user });
    } catch (error) {
        next(error);
    }
};
