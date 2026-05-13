import ScrollReveal from '@/components/ui/ScrollReveal';
import { CalendarDays, DollarSign, Ticket, Ban, MessageCircle, CheckCircle2 } from 'lucide-react';

export const metadata = {
    title: 'Reschedule Policy | NorthEastForU',
    description: 'Learn how to reschedule your trip or activity with NorthEastForU.',
};

export default function ReschedulePage() {
    const rescheduleTiers = [
        { label: 'First Reschedule', detail: '7+ days in advance', status: 'Free', color: 'bg-green-50 border-green-200', badge: 'bg-green-100 text-green-800', pillColor: 'bg-green-500' },
        { label: 'Subsequent Changes', detail: 'Any time', status: '₹500 Fee', color: 'bg-yellow-50 border-yellow-200', badge: 'bg-yellow-100 text-yellow-700', pillColor: 'bg-yellow-500' },
        { label: 'Price Difference', detail: 'Seasonal pricing may apply', status: 'Pay Diff.', color: 'bg-blue-50 border-blue-200', badge: 'bg-blue-100 text-blue-700', pillColor: 'bg-blue-500' },
        { label: 'Credit Validity', detail: 'If date not set', status: '12 Months', color: 'bg-purple-50 border-purple-200', badge: 'bg-purple-100 text-purple-700', pillColor: 'bg-purple-500' },
    ];

    const sections = [
        {
            icon: <CalendarDays className="text-blue-600" size={24} />,
            title: "How It Works",
            content: "Rescheduling requests must be submitted at least 72 hours before the scheduled activity or trip start date. Requests made after this window are treated as standard cancellations."
        },
        {
            icon: <Ticket className="text-purple-600" size={24} />,
            title: "Validity of Credit Note",
            content: "If you cannot pick a new date immediately, we can convert your booking into a Northeast Credit Note valid for 12 months from the original booking date. No value is lost."
        },
        {
            icon: <Ban className="text-red-500" size={24} />,
            title: "Non-Reschedulable Items",
            content: "Permit fees, certain flight tickets, and promotional 'limited time' deals may be non-reschedulable based on vendor policies. These are clearly marked during the booking process."
        },
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-24 text-[#1a1a1a]">
            {/* Premium Hero Header */}
            <div className="bg-[#0f1e14] pt-32 pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <ScrollReveal>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/20">
                                <CalendarDays className="text-blue-400" size={20} />
                            </div>
                            <span className="text-blue-400 font-bold uppercase tracking-widest text-sm">Flexibility & Changes</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">Reschedule Policy</h1>
                        <p className="text-blue-100/70 text-xl max-w-2xl leading-relaxed">
                            Plans change — and we get that. Here is everything you need to know about changing your trip dates.
                        </p>
                    </ScrollReveal>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <ScrollReveal>
                    {/* Reschedule Tier Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                        {rescheduleTiers.map((tier, idx) => (
                            <div key={idx} className={`bg-white rounded-[2rem] p-8 border shadow-xl shadow-slate-200/50 ${tier.color} relative overflow-hidden`}>
                                <div className={`absolute top-0 left-0 w-2 h-full ${tier.pillColor} rounded-l-[2rem]`}></div>
                                <div className="pl-4">
                                    <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${tier.badge}`}>{tier.detail}</span>
                                    <p className="text-3xl font-black text-gray-900">{tier.status}</p>
                                    <p className="text-gray-500 font-medium mt-1">{tier.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Policy Detail Cards */}
                    <div className="space-y-6 mb-10">
                        {sections.map((section, idx) => (
                            <div key={idx} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-blue-100 transition-all">
                                <div className="flex flex-col md:flex-row gap-6 md:items-start">
                                    <div className="bg-slate-50 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                        {section.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
                                        <p className="text-gray-600 leading-relaxed">{section.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* What's Easy to Reschedule */}
                    <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-xl mb-10">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">What Can Be Rescheduled Easily?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {["Tour packages & itineraries", "Hotel & homestay bookings", "Activity experiences", "Day trips & excursions", "Airport transfers", "Guided treks"].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle2 className="text-green-500 shrink-0" size={18} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Footer */}
                    <div className="bg-[#0f1e14] p-10 rounded-[2.5rem] text-white flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 blur-[80px] rounded-full"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <MessageCircle className="text-blue-400" size={20} />
                                <span className="font-bold text-white">Want to change your dates?</span>
                            </div>
                            <p className="text-blue-100/60 text-sm">Our support team is available 24/7 to help you reschedule.</p>
                        </div>
                        <a href="/contact" className="relative z-10 bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors whitespace-nowrap shadow-xl shadow-black/20">
                            Contact Support
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
