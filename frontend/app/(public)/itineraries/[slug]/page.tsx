import { Clock, DollarSign, ArrowLeft, Send, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ItineraryList from '@/components/itinerary/ItineraryList';
import PricingTable from '@/components/itinerary/PricingTable';
import { notFound } from 'next/navigation';
import HeroSection from '@/components/ui/HeroSection';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Props { params: Promise<{ slug: string }> }

async function fetchItinerary(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api'}/itineraries/${slug}`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data?.data || null;
    } catch { return null; }
}

export default async function ItineraryDetailPage({ params }: Props) {
    const { slug } = await params;
    const itinerary = await fetchItinerary(slug);
    if (!itinerary) return notFound();

    // Use real DB data; fall back gracefully when not yet populated in admin
    const rawDays = Array.isArray(itinerary.daily_schedule) ? itinerary.daily_schedule : [];
    const days = rawDays.map((d: Record<string, unknown>, i: number) => ({ day: i + 1, ...d }));

    const rawTiers = Array.isArray(itinerary.pricing_tiers) ? itinerary.pricing_tiers : [];
    const tiers = rawTiers.map((t: Record<string, unknown>) => ({
        ...t,
        price: Number(t.price) || 0,
        features: Array.isArray(t.features) ? t.features : [],
    }));

    return (
        <div className="bg-white min-h-screen">
            <HeroSection
                title={itinerary.title}
                subtitle={`${itinerary.duration_days} days · Starting from ₹${Number(itinerary.price_estimate || 0).toLocaleString('en-IN')}`}
                image={itinerary.featured_image}
            />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left content column */}
                    <div className="flex-grow lg:max-w-[800px] space-y-16">
                        <ScrollReveal>
                            <Link href="/itineraries" className="inline-flex items-center gap-2 text-green-600 font-bold mb-8 hover:gap-3 transition-all">
                                <ArrowLeft size={16} /> All Itineraries
                            </Link>

                            <div className="flex flex-wrap gap-4 mb-10">
                                <span className="flex items-center gap-2 bg-green-50 text-green-700 font-bold px-5 py-2.5 rounded-full shadow-sm">
                                    <Clock size={16} /> {itinerary.duration_days} Days / {itinerary.duration_days-1} Nights
                                </span>
                                {itinerary.price_estimate && (
                                    <span className="flex items-center gap-2 bg-blue-50 text-blue-700 font-bold px-5 py-2.5 rounded-full shadow-sm">
                                        <DollarSign size={16} /> From ₹{Number(itinerary.price_estimate).toLocaleString('en-IN')}
                                    </span>
                                )}
                                <span className="flex items-center gap-2 bg-purple-50 text-purple-700 font-bold px-5 py-2.5 rounded-full shadow-sm">
                                    <Sparkles size={16} /> {itinerary.category || 'Curated Tour'}
                                </span>
                            </div>

                            <div className="prose prose-lg max-w-none text-gray-600 mb-16 leading-relaxed">
                                <p className="text-xl font-medium text-gray-900 border-l-4 border-green-600 pl-6 mb-8 italic">
                                    &quot;{itinerary.tagline || String(itinerary.description).slice(0, 150) + '...'}&quot;
                                </p>
                                <div className="whitespace-pre-line">
                                    {itinerary.description}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Itinerary Schedule */}
                        {days.length > 0 && (
                            <ScrollReveal delay={100}>
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Daily Itinerary Schedule</h2>
                                <ItineraryList days={days} />
                            </ScrollReveal>
                        )}

                        {/* Pricing Tiers */}
                        {tiers.length > 0 && (
                            <ScrollReveal delay={200}>
                                <PricingTable tiers={tiers} />
                            </ScrollReveal>
                        )}
                    </div>

                    {/* Right Column - Sticky Enquiry Sidebar */}
                    <div className="lg:w-[350px] flex-shrink-0">
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-2xl shadow-green-100/50">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Interested?</h3>
                                <p className="text-sm text-gray-400 mb-6">Get a personalized quote for this journey.</p>
                                
                                <form className="space-y-4">
                                    <input type="text" placeholder="Your Name" className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 text-sm" />
                                    <input type="email" placeholder="Email Address" className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 text-sm" />
                                    <input type="tel" placeholder="Phone Number" className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 text-sm" />
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-2">Traveling On</p>
                                            <input type="date" className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 text-xs" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-2">People</p>
                                            <input type="number" min="1" placeholder="2" className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-green-500 text-xs" />
                                        </div>
                                    </div>
                                    <button className="w-full mt-4 bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2 group">
                                        Send Enquiry <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            </div>

                            <div className="bg-gray-900 rounded-[2rem] p-8 text-white">
                                <p className="text-green-500 font-bold mb-2">Need Help?</p>
                                <h4 className="text-lg font-bold mb-4">Talk to an expert today!</h4>
                                <a href="tel:+919876543210" className="text-xl font-bold block mb-1 hover:text-green-400 transition-colors">+91 98765 43210</a>
                                <p className="text-xs text-gray-400">Available 9 AM - 6 PM Daily</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
