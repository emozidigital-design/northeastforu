require('./lib/loadEnv');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = (process.env.ADMIN_SEED_EMAIL || 'admin@northeastforu.com').toLowerCase().trim();
    const password = process.env.ADMIN_SEED_PASSWORD;
    const name = process.env.ADMIN_SEED_NAME || 'Admin';

    if (!password) {
        console.error('❌ ADMIN_SEED_PASSWORD is not set. Add it to backend/.env.local and re-run.');
        process.exit(1);
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await prisma.admin_users.upsert({
        where: { email },
        update: { password_hash, name, is_active: true },
        create: { email, password_hash, name, role: 'admin', is_active: true }
    });

    console.log(`✅ Admin user seeded: ${user.email} (role: ${user.role})`);
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e.message);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
