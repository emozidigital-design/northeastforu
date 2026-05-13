import React from 'react';
import Link from 'next/link';
import { MapPin, Clock, Users, Calendar, Globe } from 'lucide-react';
import ActivityBookingWidget from '@/components/activity/ActivityBookingWidget';

interface ActivityHeaderProps {
    activity: any;
    city: string;
    state: string;
    price: number | null;
    children: React.ReactNode;
}

export default function ActivityHeader({ activity, city, state, price, children }: ActivityHeaderProps) {
    return (
        <div className="max-w-[1160px] mx-auto px-6 pt-12 pb-0">
            <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Left Column (62%) */}
                <div className="lg:w-[62%]">
                    {/* Eyebrow */}
                    <div className="text-[11px] font-mono tracking-[0.15em] text-[#1a6b3c] uppercase mb-3 flex items-center gap-2">
                        {[city, state, activity.category].filter(Boolean).join(' · ')}
                    </div>

                    {/* Title */}
                    <h1 className="font-serif text-[30px] md:text-[48px] font-bold text-[#0f1e14] leading-[1.2] max-w-[580px] mb-5">
                        {activity.name}
                    </h1>

                    {/* Rating Line */}
                    <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#666]">
                        {/* Stars */}
                        <div className="flex text-[#f5a623] gap-0.5" aria-hidden="true">
                            {[1, 2, 3, 4, 5].map(star => (
                                <svg key={star} className={`w-4 h-4 ${star <= Math.round(activity.rating || 5) ? 'fill-current' : 'fill-gray-200'}`} viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="font-bold text-[#0f1e14]">{Number(activity.rating || 5).toFixed(1)}</span>
                        <span>·</span>
                        <a href="#reviews" className="hover:text-[#1a6b3c] transition-colors">{(activity.review_count || 124).toLocaleString()} reviews</a>
                        
                        {activity.difficulty && (
                            <>
                                <span>·</span>
                                <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-medium leading-tight
                                    ${activity.difficulty.toLowerCase() === 'easy' ? 'bg-[#e8f5ed] text-[#1a6b3c]' : 
                                      activity.difficulty.toLowerCase() === 'moderate' ? 'bg-[#fff8ee] text-[#d97706]' : 
                                      'bg-[#fdf0f0] text-[#dc2626]'}`}>
                                    {activity.difficulty}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-[#e8e8e8] my-6" />

                    {/* Quick Facts */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-b border-[#e8e8e8] pb-6 mb-6">
                        {/* Fact 1 */}
                        <div className="flex flex-col md:border-r border-[#f0f0f0] px-2 md:px-0">
                            <Clock size={20} className="text-[#1a6b3c] mb-2" />
                            <span className="text-[15px] font-bold text-[#0f1e14] mb-0.5">{activity.duration || 'Flexible'}</span>
                            <span className="text-[12px] text-[#888]">Duration</span>
                        </div>
                        {/* Fact 2 */}
                        <div className="flex flex-col md:border-r border-[#f0f0f0] pl-6">
                            <Users size={20} className="text-[#1a6b3c] mb-2" />
                            <span className="text-[15px] font-bold text-[#0f1e14] mb-0.5">Max {activity.group_size_max || 12}</span>
                            <span className="text-[12px] text-[#888]">Group Size</span>
                        </div>
                        {/* Fact 3 */}
                        <div className="flex flex-col md:border-r border-[#f0f0f0] pl-6 mt-6 md:mt-0 border-t md:border-t-0 pt-6 md:pt-0">
                            <Calendar size={20} className="text-[#1a6b3c] mb-2" />
                            <span className="text-[15px] font-bold text-[#0f1e14] mb-0.5">Year Round</span>
                            <span className="text-[12px] text-[#888]">Availability</span>
                        </div>
                        {/* Fact 4 */}
                        <div className="flex flex-col pl-6 mt-6 md:mt-0 border-t md:border-t-0 pt-6 md:pt-0">
                            <Globe size={20} className="text-[#1a6b3c] mb-2" />
                            <span className="text-[15px] font-bold text-[#0f1e14] mb-0.5">English, Hindi</span>
                            <span className="text-[12px] text-[#888]">Languages</span>
                        </div>
                    </div>
                    
                    {/* Render the rest of the page left-column content here */}
                    <div className="mt-12 space-y-16 lg:space-y-24">
                        {children}
                    </div>
                </div>

                {/* Right Column (38%) */}
                <div className="lg:w-[38%] relative">
                    <div className="sticky top-28 bg-[#fafaf8] border border-[#e8e8e8] rounded-[4px] p-6 lg:ml-4 enquiry-card-wrapper">
                        {/* We use CSS overrides via tailwind classes in global.css/class to remove the widget's internal shadow/border */}
                        <style>{`
                            .enquiry-card-wrapper #booking-widget {
                                box-shadow: none !important;
                                border: none !important;
                                padding: 0 !important;
                                background: transparent !important;
                            }
                            .enquiry-card-wrapper #booking-widget h3 {
                                font-family: 'Playfair Display', serif;
                                font-size: 20px;
                                max-width: 100%;
                            }
                            .enquiry-card-wrapper #booking-widget button, 
                            .enquiry-card-wrapper #booking-widget input,
                            .enquiry-card-wrapper #booking-widget a.bg-\\[\\#25D366\\] {
                                border-radius: 4px !important;
                            }
                        `}</style>
                        <ActivityBookingWidget 
                            activityName={activity.name}
                            price={price}
                            priceOriginal={activity.price_original}
                            priceDiscounted={activity.price_discounted}
                            groupSizeMax={activity.group_size_max || 12}
                            instantConfirmation={activity.features?.includes('instant_confirmation') || true}
                            freeCancellation={activity.features?.includes('free_cancellation') || true}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
