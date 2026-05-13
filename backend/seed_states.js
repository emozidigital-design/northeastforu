const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const states = [
        { name: 'Arunachal Pradesh', slug: 'arunachal-pradesh', capital: 'Itanagar' },
        { name: 'Assam', slug: 'assam', capital: 'Dispur' },
        { name: 'Meghalaya', slug: 'meghalaya', capital: 'Shillong' },
        { name: 'Manipur', slug: 'manipur', capital: 'Imphal' },
        { name: 'Nagaland', slug: 'nagaland', capital: 'Kohima' },
        { name: 'Mizoram', slug: 'mizoram', capital: 'Aizawl' },
        { name: 'Sikkim', slug: 'sikkim', capital: 'Gangtok' },
        { name: 'Tripura', slug: 'tripura', capital: 'Agartala' }
    ];

    for (const s of states) {
        await prisma.states.upsert({
            where: { slug: s.slug },
            update: {},
            create: s
        });
    }
    console.log('✅ States seeded');
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
