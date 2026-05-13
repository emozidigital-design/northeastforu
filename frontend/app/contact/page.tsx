'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Clock, MessageSquare, Send } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    destination?: string;
    message: string;
}

export default function ContactPage() {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<ContactFormData>();
    const [success, setSuccess] = React.useState(false);

    const onSubmit = async (data: ContactFormData) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api'}/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, source_page: window.location.href }),
            });
            if (res.ok) {
                setSuccess(true);
                reset();
                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (error) {
            console.error('Lead submission error:', error);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Plan Your Perfect Trip</h1>
                        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
                            Our North East India experts are ready to help you craft an unforgettable journey.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Info Column */}
                    <div className="space-y-8">
                        <ScrollReveal direction="right" delay={100}>
                            <div className="bg-gray-50 p-8 rounded-2xl hover-lift border border-gray-100 flex items-start gap-6">
                                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Email Us</h3>
                                    <p className="text-gray-600 mt-1">hello@northeastforu.com</p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="right" delay={200}>
                            <div className="bg-gray-50 p-8 rounded-2xl hover-lift border border-gray-100 flex items-start gap-6">
                                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                                    <MessageSquare size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">WhatsApp</h3>
                                    <p className="text-gray-600 mt-1">+91 98765 43210</p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="right" delay={300}>
                            <div className="bg-gray-50 p-8 rounded-2xl hover-lift border border-gray-100 flex items-start gap-6">
                                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Swift Response</h3>
                                    <p className="text-gray-600 mt-1">We reply within 24 hours</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Form Column */}
                    <ScrollReveal direction="left" delay={200}>
                        <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100">
                            {success ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Send size={32} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Message Sent!</h2>
                                    <p className="text-gray-600 mt-2">Thank you! We will contact you within 24 hours.</p>
                                    <button
                                        onClick={() => setSuccess(false)}
                                        className="mt-8 text-green-600 font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                            <input
                                                {...register('name', { required: true })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                            <input
                                                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input
                                                {...register('phone')}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                placeholder="+91 12345 67890"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Target State</label>
                                            <select
                                                {...register('destination')}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white"
                                            >
                                                <option value="">Select a state</option>
                                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                <option value="Assam">Assam</option>
                                                <option value="Manipur">Manipur</option>
                                                <option value="Meghalaya">Meghalaya</option>
                                                <option value="Mizoram">Mizoram</option>
                                                <option value="Nagaland">Nagaland</option>
                                                <option value="Tripura">Tripura</option>
                                                <option value="Sikkim">Sikkim</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                                        <textarea
                                            {...register('message', { required: true })}
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                            placeholder="Tell us about your travel plans..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all hover-scale shadow-lg shadow-green-200 flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? 'Sending...' : (
                                            <>
                                                <Send size={20} />
                                                Send My Enquiry
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
}
