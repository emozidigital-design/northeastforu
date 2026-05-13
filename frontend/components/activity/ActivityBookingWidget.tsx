'use client';

import React, { useState } from 'react';
import { Check, Shield, Zap, MessageCircle, Lock, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ActivityBookingWidgetProps {
    activityName: string;
    price: number | null;
    priceOriginal: number | null;
    priceDiscounted: number | null;
    groupSizeMax: number;
    instantConfirmation: boolean;
    freeCancellation: boolean;
}

export default function ActivityBookingWidget({
    activityName, price, priceOriginal, priceDiscounted,
    groupSizeMax, instantConfirmation, freeCancellation
}: ActivityBookingWidgetProps) {
    const [guests, setGuests] = useState(1);
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

    const displayPrice = priceDiscounted || price || 0;
    const showOriginal = priceDiscounted && priceOriginal && priceOriginal > priceDiscounted;
    const savings = showOriginal ? (priceOriginal - priceDiscounted) : null;
    const total = displayPrice * guests;

    const onSubmit = async (data: any) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api'}/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    message: `Activity Booking Request — ${activityName}. Date: ${data.date}. Guests: ${guests}. Total: ₹${total.toLocaleString('en-IN')}`,
                    source_page: typeof window !== 'undefined' ? window.location.href : '',
                }),
            });
            setSuccess(true);
            reset();
            setTimeout(() => setSuccess(false), 8000);
        } catch (e) { console.error(e); }
    };

    const whatsappMsg = encodeURIComponent(`Hi! I'm interested in booking ${activityName} on NorthEastForU. Please share more details.`);

    return (
        <div id="booking-widget" className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 space-y-5">

            {/* Mini checklist */}
            <ul className="space-y-1.5 text-sm text-gray-700">
                {instantConfirmation && (
                    <li className="flex items-center gap-2">
                        <Zap size={14} className="text-blue-500 flex-shrink-0" />
                        <span>Instant Confirmation</span>
                    </li>
                )}
                {freeCancellation && (
                    <li className="flex items-center gap-2">
                        <Shield size={14} className="text-green-500 flex-shrink-0" />
                        <span>Free Cancellation</span>
                    </li>
                )}
                <li className="flex items-center gap-2">
                    <Check size={14} className="text-green-500 flex-shrink-0" />
                    <span>Expert Local Guide</span>
                </li>
            </ul>

            <div className="border-t border-gray-100" />

            {/* Booking Form */}
            <div className="space-y-3">
                <h3 className="font-bold text-gray-900">Book This Activity</h3>

                {success ? (
                    <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm font-medium border border-green-100">
                        ✅ Enquiry sent! Our team will contact you within 2 hours.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <input {...register('name', { required: true })}
                            placeholder="Your Name"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
                        <input {...register('email', { required: true })} type="email"
                            placeholder="Email Address"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
                        <input {...register('phone')} type="tel"
                            placeholder="Phone Number"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" />
                        <input {...register('date')} type="date"
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-gray-700" />

                        {/* Guest Counter */}
                        <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
                            <span className="text-sm text-gray-600 font-medium">Guests</span>
                            <div className="flex items-center gap-4">
                                <button type="button" onClick={() => setGuests(g => Math.max(1, g - 1))}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors font-bold text-lg leading-none">
                                    −
                                </button>
                                <span className="font-bold text-gray-900 w-4 text-center">{guests}</span>
                                <button type="button" onClick={() => setGuests(g => Math.min(groupSizeMax || 15, g + 1))}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors font-bold text-lg leading-none">
                                    +
                                </button>
                            </div>
                        </div>



                        <button type="submit" disabled={isSubmitting}
                            className="w-full bg-[#1a6b3c] text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all disabled:opacity-70 shadow-lg shadow-green-200">
                            {isSubmitting ? 'Sending...' : 'Enquire Now'}
                        </button>
                    </form>
                )}

                {/* WhatsApp */}
                <a href={`https://wa.me/919000000000?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe55] text-white py-3.5 rounded-xl font-bold transition-all">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                    Chat on WhatsApp
                </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
                {[
                    { icon: '🔒', text: 'Secure Booking' },
                    { icon: '✓', text: 'Best Price' },
                    { icon: '⭐', text: 'Verified' },
                ].map(b => (
                    <div key={b.text} className="text-center space-y-0.5">
                        <div className="text-lg">{b.icon}</div>
                        <p className="text-[10px] text-gray-500 font-medium leading-tight">{b.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
