import HeroSection from '@/components/ui/HeroSection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Props { params: { slug: string } }

const GUIDE_CONTENT: Record<string, { title: string; content: string }> = {
    'permits-and-permissions': {
        title: 'Permits & Permissions Guide',
        content: `Inner Line Permit (ILP) is required for certain Northeast states.

States requiring ILP (Indian citizens):
• Arunachal Pradesh — Apply at arunachalilp.com. Fee: ₹100. Processing: 2-3 days.
• Nagaland — Apply at nagalandilp.gov.in. Fee: ₹50. Processing: 1 day.
• Mizoram — Apply at Lengpui Airport or online. Fee: ₹100.
• Manipur — ILP required since 2020. Apply online or at entry points.

States NOT requiring ILP (Indian citizens):
• Assam, Meghalaya, Sikkim, Tripura

Foreign Nationals — Protected Area Permit (PAP):
• Arunachal Pradesh — PAP required. Min 2 people. Apply via registered travel agent.
• North Sikkim — PAP/RAP required. Arrange through a licensed tour operator.
• Nagaland — No PAP since 2011. Register at local Police Station.`,
    },
    'best-time-to-visit': {
        title: 'Best Time to Visit North East India',
        content: `October – March (Peak Season)
The ideal time for most of North East India. Clear skies, comfortable temperatures, and most festivals.

• Meghalaya: Perfect for waterfalls and living root bridges
• Assam: Best for Kaziranga rhino safaris
• Arunachal: Good visibility for Himalayan peaks
• Nagaland: Hornbill Festival (December)

April – May (Shoulder Season)
Warm and slightly humid. Fewer crowds. Good for Sikkim's flower valleys.

June – September (Monsoon)
Heavy rains across the region. Certain areas may be inaccessible due to landslides.`,
    },
    'budgeting-for-northeast': {
        title: 'Budgeting for North East India',
        content: `Budget Traveller (₹1,500–2,000/day)
• Guesthouses and homestays
• Local dhabas and street food
• Shared jeeps and local buses

Mid-Range (₹3,000–5,000/day)
• 3-star hotels or heritage properties
• Restaurant meals
• Hired cab for day trips

Luxury (₹7,000+/day)
• 4–5 star resorts including tea garden estates
• Private vehicle throughout

Key Costs: Internal flights ₹3,000–8,000 · Permits ₹50–200 · Safaris ₹500–3,000`,
    },
    'how-to-get-around': {
        title: 'How to Get Around North East India',
        content: `By Air
Major airports: Guwahati (LGBI), Imphal, Agartala, Jorhat, Bagdogra (for Sikkim).
IndiGo, Air India, SpiceJet operate routes. Book 4–6 weeks ahead.

By Train
Guwahati is the main railway hub connecting to Dibrugarh, New Jalpaiguri, and Agartala.

By Road
Shared Sumos (Jeeps): Most popular local transport. Cheap, frequent.
Private Taxis: Full-day rate ₹3,000–6,000.
State Buses: Very affordable but slow.

Hired Vehicles with driver: Budget ₹15,000–25,000 for a 5-day circuit.`,
    },
};

export default function TravelPlanningGuide({ params }: Props) {
    const guide = GUIDE_CONTENT[params.slug];
    if (!guide) return notFound();

    return (
        <div>
            <HeroSection title={guide.title} subtitle="NorthEastForU Travel Planning Series" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <ScrollReveal>
                    <Link href="/travel-planning" className="inline-flex items-center gap-2 text-green-600 font-semibold mb-8 hover:gap-3 transition-all">
                        <ArrowLeft size={16} /> All Planning Guides
                    </Link>
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10">
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{guide.title}</h2>
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                            {guide.content}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
