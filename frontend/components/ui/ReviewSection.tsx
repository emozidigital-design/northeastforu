'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Star, MessageCircle, MoreVertical, CheckCircle } from 'lucide-react';

interface Review {
    id: number;
    reviewer_name: string;
    rating: number;
    review_text: string;
    created_at: string;
}

interface ReviewSectionProps {
    pageType: 'state' | 'city' | 'attraction' | 'activity';
    slug: string;
}

export default function ReviewSection({ pageType, slug }: ReviewSectionProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [meta, setMeta] = useState<any>({ count: 0, average_rating: 0 });
    const [showForm, setShowForm] = useState(false);
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api'}/reviews/${pageType}/${slug}`);
                const data = await res.json();
                if (data.success) {
                    setReviews(data.data);
                    setMeta(data.meta);
                }
            } catch (error) {
                console.error('Fetch reviews error:', error);
            }
        };
        fetchReviews();
    }, [pageType, slug]);

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api'}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, page_type: pageType, page_slug: slug }),
            });
            if (res.ok) {
                setSuccess(true);
                reset();
                setTimeout(() => {
                    setSuccess(false);
                    setShowForm(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Submit review error:', error);
        }
    };

    return (
        <div className="mt-16 space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 border-l-4 border-green-600 pl-4">Community Reviews</h2>
                    <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center gap-1 text-yellow-500">
                            {[1, 2, 3, 4, 5].map(star => (
                                <Star key={star} size={20} className={star <= Math.round(meta.average_rating) ? "fill-yellow-500" : "text-gray-300"} />
                            ))}
                        </div>
                        <span className="text-gray-600 font-bold">{meta.average_rating || '0.0'} ({meta.count} reviews)</span>
                    </div>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all hover-scale shadow-lg shadow-green-200"
                    >
                        Add a Review
                    </button>
                )}
            </div>

            {showForm && (
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 animate-in slide-in-from-top-4 duration-500">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Share Your Experience</h3>
                        <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-900"><X size={20} /></button>
                    </div>

                    {success ? (
                        <div className="text-center py-8">
                            <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
                            <p className="text-gray-900 font-bold text-lg">Thank you for your review!</p>
                            <p className="text-gray-600">It has been sent for approval and will appear soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input {...register('reviewer_name', { required: true })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500" placeholder="Jane Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                                    <input {...register('reviewer_email', { required: true })} type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500" placeholder="jane@example.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                <select {...register('rating', { required: true })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 appearance-none bg-white">
                                    <option value="5">5 Stars - Excellent</option>
                                    <option value="4">4 Stars - Very Good</option>
                                    <option value="3">3 Stars - Good</option>
                                    <option value="2">2 Stars - Fair</option>
                                    <option value="1">1 Star - Poor</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                                <textarea {...register('review_text', { required: true })} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500" placeholder="Tell us about your visit..." />
                            </div>
                            <button disabled={isSubmitting} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2">
                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    )}
                </div>
            )}

            <div className="space-y-6">
                {reviews.length > 0 ? reviews.map(review => (
                    <div key={review.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                                    {review.reviewer_name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{review.reviewer_name}</h4>
                                    <div className="flex items-center gap-1 text-yellow-500 scale-75 origin-left">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star key={star} size={16} className={star <= review.rating ? "fill-yellow-500" : "text-gray-300"} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <span className="text-gray-400 text-xs">
                                {new Date(review.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed italic">"{review.review_text}"</p>
                    </div>
                )) : (
                    <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <MessageCircle className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function X({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
    )
}
