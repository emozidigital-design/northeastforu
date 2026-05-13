import ScrollReveal from '@/components/ui/ScrollReveal';
import { FileCheck, BookOpen, UserCheck, ShieldAlert, Scale, CheckCircle2 } from 'lucide-react';

export const metadata = {
    title: 'Terms of Service | NorthEastForU',
    description: 'Terms and conditions for using the NorthEastForU platform.',
};

export default function TermsPage() {
    const sections = [
        {
            icon: <CheckCircle2 className="text-blue-600" size={24} />,
            title: "1. Acceptance of Terms",
            content: "By accessing and using NorthEastForU, you agree to be bound by these Terms of Service. If you do not agree, please refrain from using our platform."
        },
        {
            icon: <BookOpen className="text-green-600" size={24} />,
            title: "2. Description of Service",
            content: "NorthEastForU provides travel information, guides, and booking tools for North East India. We strive for accuracy but do not guarantee that all information is correct or up-to-date."
        },
        {
            icon: <FileCheck className="text-purple-600" size={24} />,
            title: "3. Intellectual Property",
            content: "All content on this platform, including text, images, and logos, is the property of NorthEastForU or its content suppliers and is protected by intellectual property laws."
        },
        {
            icon: <UserCheck className="text-orange-500" size={24} />,
            title: "4. User Conduct",
            content: "You agree not to use our platform for any unlawful purpose or in any way that could damage or disrupt our services. Respectful engagement is required."
        },
        {
            icon: <Scale className="text-red-500" size={24} />,
            title: "5. Limitation of Liability",
            content: "NorthEastForU shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of our platform or services."
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-24 text-[#1a1a1a]">
            {/* Premium Hero Header */}
            <div className="bg-[#0f1e14] pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <ScrollReveal>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-blue-500/20 p-2 rounded-lg backdrop-blur-md border border-blue-500/20">
                                <ShieldAlert className="text-blue-400" size={20} />
                            </div>
                            <span className="text-blue-400 font-bold uppercase tracking-widest text-sm">Policies & Usage</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 font-display leading-tight">Terms of Service</h1>
                        <p className="text-blue-100/70 text-xl max-w-2xl leading-relaxed">
                            The guidelines and legalities for exploring the North East with NorthEastForU.
                        </p>
                    </ScrollReveal>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <ScrollReveal>
                    <div className="space-y-6">
                        {sections.map((section, idx) => (
                            <div key={idx} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-blue-100 transition-all">
                                <div className="flex flex-col md:flex-row gap-6 md:items-start">
                                    <div className="bg-slate-50 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                        {section.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">{section.title}</h2>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-xl text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">Contractual Terms</h3>
                        <p className="text-gray-500 mb-0">By continuing to use our platform, you acknowledge that you have read and understood these terms.</p>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
