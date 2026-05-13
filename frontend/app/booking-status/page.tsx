import ScrollReveal from '@/components/ui/ScrollReveal';
import { Search } from 'lucide-react';

export const metadata = {
    title: 'Booking Status | NorthEastForU',
    description: 'Check the status of your travel bookings with NorthEastForU.',
};

export default function BookingStatusPage() {
    return (
        <div className="bg-white min-h-screen pt-12 pb-24 text-[#1a1a1a]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 font-display">Check Booking Status</h1>
                        <p className="text-gray-600 text-lg">Enter your booking reference or email to track your trip details.</p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm mb-12">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Booking ID / Reference</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        className="w-full bg-white border border-gray-200 rounded-xl px-12 py-4 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                        placeholder="e.g. NE-12345"
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                </div>
                            </div>
                            <button className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-100">
                                Track My Booking
                            </button>
                        </div>
                    </div>

                    <div className="prose prose-green max-w-none text-gray-600 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 font-display">Need Help with your Booking?</h2>
                            <p>If you don't have your booking ID or are facing issues tracking your status, please reach out to our support team directly. We are available 24/7 to assist with your North East travel plans.</p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <div className="bg-green-50 p-4 rounded-xl flex-1">
                                    <span className="block font-bold text-green-800">WhatsApp Support</span>
                                    <span className="text-green-700">+91-8811909095</span>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-xl flex-1">
                                    <span className="block font-bold text-blue-800">Email Support</span>
                                    <span className="text-blue-700">hello@northeastforu.com</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
