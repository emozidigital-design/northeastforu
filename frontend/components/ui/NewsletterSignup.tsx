'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, X, CheckCircle } from 'lucide-react';

interface NewsletterSignupProps {
    variant?: 'inline' | 'popup';
}

export default function NewsletterSignup({ variant = 'inline' }: NewsletterSignupProps) {
    const [isVisible, setIsVisible] = useState(variant === 'inline');
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

    useEffect(() => {
        if (variant === 'popup') {
            const hasSeen = sessionStorage.getItem('newsletter_popup_seen');
            if (!hasSeen) {
                const timer = setTimeout(() => {
                    setIsVisible(true);
                }, 45000); // 45 seconds
                return () => clearTimeout(timer);
            }
        }
    }, [variant]);

    const closePopup = () => {
        setIsVisible(false);
        sessionStorage.setItem('newsletter_popup_seen', 'true');
    };

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api'}/newsletter/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, source_page: window.location.href }),
            });
            if (res.ok) {
                setSuccess(true);
                reset();
                if (variant === 'popup') {
                    setTimeout(() => closePopup(), 3000);
                }
            }
        } catch (error) {
            console.error('Newsletter error:', error);
        }
    };

    if (!isVisible) return null;

    if (variant === 'popup') {
        return (
            <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-500">
                    <button onClick={closePopup} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors">
                        <X size={24} />
                    </button>

                    <div className="h-32 bg-green-600 flex items-center justify-center">
                        <Mail size={48} className="text-white" />
                    </div>

                    <div className="p-8 text-center">
                        {success ? (
                            <div className="py-8">
                                <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900">Welcome to the Club!</h3>
                                <p className="text-gray-600 mt-2">Check your email for travel tips soon.</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Weekly Travel Tips</h3>
                                <p className="text-gray-600 mb-8">Join 5,000+ travelers exploring the hidden gems of North East India.</p>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <input
                                        {...register('name')}
                                        placeholder="Your Name"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 transition-all"
                                    />
                                    <input
                                        {...register('email', { required: true })}
                                        type="email"
                                        placeholder="Your Email"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 transition-all"
                                    />
                                    <button
                                        disabled={isSubmitting}
                                        className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200"
                                    >
                                        {isSubmitting ? 'Joining...' : 'Get Travel Tips'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-green-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Stay in the Loop</h2>
                    <p className="text-green-50 opacity-90 text-lg">Subscribe to our newsletter for exclusive itineraries and off-beat destination guides.</p>
                </div>
                <div>
                    {success ? (
                        <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/20">
                            <CheckCircle className="text-white" />
                            <span className="font-bold">Thanks for subscribing!</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-6 py-4 rounded-2xl bg-white text-gray-900 focus:ring-4 focus:ring-green-400 outline-none transition-all"
                            />
                            <button
                                disabled={isSubmitting}
                                className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all hover-scale whitespace-nowrap"
                            >
                                {isSubmitting ? 'Subscribing...' : 'Get Tips'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
