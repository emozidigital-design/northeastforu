import Link from 'next/link';
import HeroSection from '@/components/ui/HeroSection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SmartImage from '@/components/ui/SmartImage';
import { Zap, ArrowRight } from 'lucide-react';
import { fetchAllActivities } from '@/lib/api';

export const metadata = {
    title: 'Activities in North East India | NorthEastForU',
    description: 'Adventure activities, trekking, river rafting, cultural tours and more in North East India.',
};

const DIFFICULTY_COLORS: Record<string, string> = {
    Easy: 'bg-green-100 text-green-700',
    Moderate: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-orange-100 text-orange-700',
    Expert: 'bg-red-100 text-red-700',
};

export default async function ActivitiesPage() {
    let activities: any[] = [];
    try {
        const data = await fetchAllActivities();
        activities = data?.data || [];
    } catch { activities = []; }

    return (
        <div>
            <HeroSection
                title="Activities"
                subtitle="Experience the thrill of North East India — trekkings, river adventures, cultural tours and more."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <ScrollReveal>
                    <div className="mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-900">All Activities</h2>
                        <p className="text-gray-500 mt-2">{activities.length} experience{activities.length !== 1 ? 's' : ''} listed</p>
                    </div>
                </ScrollReveal>

                {activities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activities.map((activity: any, i: number) => (
                            <ScrollReveal key={activity.id} delay={i * 40}>
                                <Link href={`/activities/${activity.slug}`}
                                    className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                                    <div className="h-48 relative overflow-hidden">
                                        <SmartImage
                                            src={activity.featured_image || `/images/activities/${activity.slug}.jpg`}
                                            alt={activity.name}
                                            className="w-full h-full"
                                            fallbackType="adventure"
                                            searchKeyword={activity.name}
                                        />
                                        {activity.difficulty && (
                                            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold z-10 ${DIFFICULTY_COLORS[activity.difficulty] || 'bg-gray-100 text-gray-700'}`}>
                                                {activity.difficulty}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <span className="text-xs font-bold text-green-600 uppercase tracking-wide mb-1">{activity.category || 'Activity'}</span>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors flex-1">{activity.name}</h3>
                                        <div className="flex items-center justify-between mt-4">
                                            <span />
                                            {activity.state?.name && <span className="text-gray-400 text-xs">{activity.state.name}</span>}
                                        </div>
                                        <span className="mt-3 inline-flex items-center gap-1 text-green-600 font-semibold text-sm group-hover:gap-2 transition-all">
                                            Learn more <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                ) : (
                    <ScrollReveal>
                        <div className="text-center py-24 bg-gray-50 rounded-3xl">
                            <Zap size={48} className="mx-auto mb-4 text-gray-300" />
                            <h3 className="text-xl font-bold text-gray-700 mb-2">Activities coming soon</h3>
                            <p className="text-gray-500">We are adding exciting experiences. Check back soon!</p>
                        </div>
                    </ScrollReveal>
                )}
            </div>
        </div>
    );
}
