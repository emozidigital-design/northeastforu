'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';

interface TripPlanningFormData {
    name: string;
    email: string;
    phone?: string;
    destination?: string;
    message?: string;
}

export default function TripPlanningForm({ title = "Plan Your Trip", variant = "default" }: { title?: string, variant?: "default" | "compact" }) {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<TripPlanningFormData>();
    const [success, setSuccess] = React.useState(false);

    const onSubmit = async (data: TripPlanningFormData) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api'}/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, source_page: typeof window !== 'undefined' ? window.location.href : '' }),
            });
            setSuccess(true);
            reset();
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error('Lead submission error:', error);
        }
    };

    if (variant === "compact") {
        return (
            <div className="space-y-4">
                {success ? (
                    <div className="bg-white/10 p-4 rounded-xl text-sm font-medium border border-white/20">
                        Thanks! We&apos;ll get back to you.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <input
                            {...register('name', { required: true })}
                            placeholder="Name"
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm placeholder:text-green-50/50 text-white focus:ring-2 focus:ring-white/30 outline-none"
                        />
                        <input
                            {...register('email', { required: true })}
                            placeholder="Email"
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm placeholder:text-green-50/50 text-white focus:ring-2 focus:ring-white/30 outline-none"
                        />
                        <select
                            {...register('destination')}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-green-50 focus:ring-2 focus:ring-white/30 outline-none"
                        >
                            <option value="" className="text-gray-900">Where to?</option>
                            <option value="Assam" className="text-gray-900">Assam</option>
                            <option value="Meghalaya" className="text-gray-900">Meghalaya</option>
                            <option value="Arunachal" className="text-gray-900">Arunachal</option>
                            <option value="Nagaland" className="text-gray-900">Nagaland</option>
                            <option value="Manipur" className="text-gray-900">Manipur</option>
                            <option value="Mizoram" className="text-gray-900">Mizoram</option>
                            <option value="Tripura" className="text-gray-900">Tripura</option>
                            <option value="Sikkim" className="text-gray-900">Sikkim</option>
                        </select>
                        <button
                            disabled={isSubmitting}
                            className="w-full bg-white text-[#1a6b3c] py-3 rounded-lg font-bold hover:bg-green-50 transition-all text-sm flex items-center justify-center gap-2 shadow-lg"
                        >
                            {isSubmitting ? 'Sending...' : 'Get Free Help'}
                        </button>
                    </form>
                )}
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
            ...
            {success ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm font-medium">
                    Enquiry sent! We&apos;ll contact you soon.
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        {...register('name', { required: true })}
                        placeholder="Name"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <input
                        {...register('email', { required: true })}
                        placeholder="Email"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <input
                        {...register('phone')}
                        placeholder="Phone"
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <textarea
                        {...register('message', { required: true })}
                        placeholder="Your message..."
                        rows={3}
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <button
                        disabled={isSubmitting}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-all text-sm flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? 'Sending...' : (
                            <>
                                <Send size={16} />
                                Enquire Now
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
