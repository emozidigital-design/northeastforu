const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // In real scenario, fetch user from DB and compare hashed password
        // const user = await prisma.user.findUnique({ where: { email } });
        // if (!user || !await bcrypt.compare(password, user.password)) {
        //   return res.status(401).json({ error: 'Invalid credentials' });
        // }

        // Mock login for now
        if (email === 'admin@northeastforu.com' && password === 'admin123') {
            const token = jwt.sign(
                { userId: 1, role: 'admin' },
                process.env.JWT_SECRET || 'your_jwt_secret',
                { expiresIn: '24h' }
            );
            return res.status(200).json({ token });
        }

        return res.status(401).json({ error: 'Invalid credentials' });
    } catch (error) {
        next(error);
    }
};
