'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface MobileBookingBarProps {
    activityName: string;
    price: number | null;
    priceOriginal: number | null;
    priceDiscounted: number | null;
    groupSizeMax: number;
}

export default function MobileBookingBar({
    activityName, groupSizeMax
}: MobileBookingBarProps) {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [guests, setGuests] = useState(1);
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

    const onSubmit = async (data: any) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api'}/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    message: `[Mobile] Activity: ${activityName}. Guests: ${guests}. Date: ${data.date}.`,
                    source_page: typeof window !== 'undefined' ? window.location.href : '',
                }),
            });
            setSuccess(true);
            reset();
            setTimeout(() => { setSuccess(false); setSheetOpen(false); }, 5000);
        } catch (e) { console.error(e); }
    };

    const whatsappMsg = encodeURIComponent(`Hi! I'm interested in booking ${activityName} on NorthEastForU. Please share more details.`);

    return (
        <>
            {/* Fixed bottom bar (mobile only) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-[95] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-gray-700">Interested in this activity?</p>
                <button
                    onClick={() => setSheetOpen(true)}
                    className="bg-[#1a6b3c] text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-green-700 transition-all shadow-lg shadow-green-200 flex-shrink-0"
                >
                    Enquire Now
                </button>
            </div>

            {/* Bottom sheet backdrop */}
            {sheetOpen && (
                <div className="md:hidden fixed inset-0 z-[100]" onClick={() => setSheetOpen(false)}>
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                    {/* Sheet panel */}
                    <div
                        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 space-y-5 max-h-[90vh] overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Drag handle */}
                        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />

                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-900 text-lg">Book Activity</h3>
                            <button onClick={() => setSheetOpen(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <X size={16} />
                            </button>
                        </div>

                        {success ? (
                            <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm font-medium border border-green-100">
                                ✅ Enquiry sent! We'll contact you within 2 hours.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                                <input {...register('name', { required: true })} placeholder="Your Name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                                <input {...register('email', { required: true })} type="email" placeholder="Email"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                                <input {...register('phone')} type="tel" placeholder="Phone"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                                <input {...register('date')} type="date" min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none text-gray-700" />

                                {/* Guest counter */}
                                <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
                                    <span className="text-sm font-medium text-gray-700">Guests</span>
                                    <div className="flex items-center gap-4">
                                        <button type="button" onClick={() => setGuests(g => Math.max(1, g - 1))}
                                            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 font-bold text-xl leading-none hover:border-green-500 transition-colors">−</button>
                                        <span className="font-bold text-gray-900 w-4 text-center">{guests}</span>
                                        <button type="button" onClick={() => setGuests(g => Math.min(groupSizeMax || 15, g + 1))}
                                            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 font-bold text-xl leading-none hover:border-green-500 transition-colors">+</button>
                                    </div>
                                </div>

                                <button type="submit" disabled={isSubmitting}
                                    className="w-full bg-[#1a6b3c] text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all disabled:opacity-70">
                                    {isSubmitting ? 'Sending...' : 'Enquire Now'}
                                </button>
                            </form>
                        )}

                        <a href={`https://wa.me/919000000000?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl font-bold transition-all">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}
