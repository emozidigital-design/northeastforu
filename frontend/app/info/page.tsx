import ScrollReveal from '@/components/ui/ScrollReveal';
import SmartImage from '@/components/ui/SmartImage';

export const metadata = {
    title: 'North East India Info Panel | NorthEastForU',
    description: 'Essential information and travel guide for the Seven Sisters and Sikkim.',
};

export default function InfoPanelPage() {
    return (
        <div className="bg-white min-h-screen pt-12 pb-24 text-[#1a1a1a]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 font-display">Northeast Info Panel</h1>
                    
                    <div className="aspect-video relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <SmartImage 
                            src="/images/blog-placeholder.jpg" 
                            alt="North East India Landscapes"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-bottom p-8">
                            <p className="text-white text-xl font-medium mt-auto">Discover the hidden gems of the Seven Sisters and Sikkim.</p>
                        </div>
                    </div>

                    <div className="prose prose-lg prose-green max-w-none text-gray-600 space-y-10">
                        <section>
                            <h2 className="text-3xl font-bold text-gray-800 font-display">A Land of Untouched Beauty</h2>
                            <p>North East India consists of the "Seven Sister States" (Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, and Tripura) and the "Brother State" Sikkim. It is a region known for its unique culture, diverse ethnic groups, and breathtaking landscapes that range from the snow-capped Himalayas to tropical rainforests.</p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
                            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                                <h3 className="text-xl font-bold text-orange-900 mb-2">Climate & When to Visit</h3>
                                <p className="text-orange-800/80 text-sm">October to March is generally the best time for most states. Monsoon (June-August) offers lush greenery but can be challenging for travel.</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                                <h3 className="text-xl font-bold text-green-900 mb-2">Permits & Entry</h3>
                                <p className="text-green-800/80 text-sm">Some states require ILP (Inner Line Permit) or PAP (Protected Area Permit). Always check latest requirements before planning.</p>
                            </div>
                        </div>

                        <section>
                            <h2 className="text-3xl font-bold text-gray-800 font-display">Cultural Heritage</h2>
                            <p>With over 200 ethnic groups and nearly as many languages, the North East is a cultural mosaic. Each state has its own distinct festivals like Bihu in Assam, Hornbill in Nagaland, and Sangai in Manipur.</p>
                        </section>

                        <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-display text-center">Essential Travel Checklist</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0">
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Valid Photo ID (Original)</li>
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Comfortable Walking Shoes</li>
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Lightweight Woolens (even in summer)</li>
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Power Banks & Extra Batteries</li>
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Offline Maps (network can be patchy)</li>
                                <li className="flex items-center gap-2"><span className="text-green-500 font-bold">✓</span> Basic Medical Kit</li>
                            </ul>
                        </section>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
