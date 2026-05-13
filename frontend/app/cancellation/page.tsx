import ScrollReveal from '@/components/ui/ScrollReveal';
import { AlertTriangle, Clock, CreditCard, Cloud, MessageCircle } from 'lucide-react';

export const metadata = {
    title: 'Cancellation Policy | NorthEastForU',
    description: 'Transparency and clarity on our cancellation policies and refund procedures.',
};

export default function CancellationPage() {
    const refundTiers = [
        { period: '30+ Days Before', refund: '100%', color: 'bg-green-50 border-green-200', badge: 'bg-green-100 text-green-800', pillColor: 'bg-green-500' },
        { period: '15–30 Days Before', refund: '50%', color: 'bg-yellow-50 border-yellow-200', badge: 'bg-yellow-100 text-yellow-800', pillColor: 'bg-yellow-500' },
        { period: '7–15 Days Before', refund: '25%', color: 'bg-orange-50 border-orange-200', badge: 'bg-orange-100 text-orange-800', pillColor: 'bg-orange-500' },
        { period: 'Under 7 Days', refund: '0%', color: 'bg-red-50 border-red-200', badge: 'bg-red-100 text-red-800', pillColor: 'bg-red-500' },
    ];

    const sections = [
        {
            icon: <Clock className="text-purple-600" size={24} />,
            title: "Activity-Specific Policies",
            content: "Certain activities like adventure sports or helicopter flights may have stricter windows. These are clearly highlighted on the relevant activity page at the time of booking."
        },
        {
            icon: <CreditCard className="text-blue-600" size={24} />,
            title: "Refund Processing",
            content: "Once a cancellation request is approved, the refund will be processed within 7–10 working days back to the original payment method used during booking."
        },
        {
            icon: <Cloud className="text-green-600" size={24} />,
            title: "Force Majeure",
            content: "In cases of natural disasters, political unrest, or unforeseen government restrictions, we will work with you to maximize credit or rescheduling options."
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-24 text-[#1a1a1a]">
            {/* Premium Hero Header */}
            <div className="bg-[#0f1e14] pt-32 pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <ScrollReveal>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-red-500/20 p-2 rounded-lg border border-red-500/20">
                                <AlertTriangle className="text-red-400" size={20} />
                            </div>
                            <span className="text-red-400 font-bold uppercase tracking-widest text-sm">Refunds & Policies</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">Cancellation Policy</h1>
                        <p className="text-red-100/70 text-xl max-w-2xl leading-relaxed">
                            We believe in transparent, fair policies. Here is exactly how refunds work when plans change.
                        </p>
                    </ScrollReveal>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <ScrollReveal>
                    {/* Refund Tier Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                        {refundTiers.map((tier, idx) => (
                            <div key={idx} className={`bg-white rounded-[2rem] p-8 border shadow-xl shadow-slate-200/50 ${tier.color} relative overflow-hidden group`}>
                                <div className={`absolute top-0 left-0 w-2 h-full ${tier.pillColor} rounded-l-[2rem]`}></div>
                                <div className="pl-4">
                                    <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${tier.badge}`}>{tier.period}</span>
                                    <p className="text-5xl font-black text-gray-900">{tier.refund}</p>
                                    <p className="text-gray-500 font-medium mt-1">Refund</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Policy Detail Cards */}
                    <div className="space-y-6 mb-10">
                        {sections.map((section, idx) => (
                            <div key={idx} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-purple-100 transition-all">
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

                    {/* CTA Footer */}
                    <div className="bg-[#0f1e14] p-10 rounded-[2.5rem] text-white flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-green-600/20 blur-[80px] rounded-full"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <MessageCircle className="text-green-400" size={20} />
                                <span className="font-bold text-white">Need to cancel a booking?</span>
                            </div>
                            <p className="text-green-100/60 text-sm">Email us at bookings@northeastforu.com with your Booking ID.</p>
                        </div>
                        <a href="/contact" className="relative z-10 bg-white text-green-900 px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-colors whitespace-nowrap shadow-xl shadow-black/20">
                            Contact Us
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
