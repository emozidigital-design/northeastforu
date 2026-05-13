import ScrollReveal from '@/components/ui/ScrollReveal';
import { Shield, Lock, Eye, FileText, Mail, Info } from 'lucide-react';

export const metadata = {
    title: 'Privacy Policy | NorthEastForU',
    description: 'Usage of your data and our privacy practices at NorthEastForU.',
};

export default function PrivacyPolicyPage() {
    const sections = [
        {
            icon: <Info className="text-blue-600" size={24} />,
            title: "1. Introduction",
            content: "Welcome to NorthEastForU. We respect your privacy and are committed to protecting your personal data. This policy outlines how we handle your information when you visit our platform."
        },
        {
            icon: <Eye className="text-green-600" size={24} />,
            title: "2. Data We Collect",
            content: "We may collect information you provide directly to us, such as when you subscribe to our newsletter, submit a contact form, or plan a trip through our platform. This includes names, email addresses, and travel preferences."
        },
        {
            icon: <FileText className="text-purple-600" size={24} />,
            title: "3. How We Use Your Information",
            content: "We use your information to provide our services, improve our platform, and communicate with you about your travel plans. We may also send you newsletters if you have opted in."
        },
        {
            icon: <Lock className="text-red-500" size={24} />,
            title: "4. Data Security",
            content: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or disclosure. Your trust is our priority."
        },
        {
            icon: <Mail className="text-orange-500" size={24} />,
            title: "5. Contact Us",
            content: "If you have any questions about this Privacy Policy or our data practices, please reach out to us at hello@northeastforu.com. We are here to help."
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-24 text-[#1a1a1a]">
            {/* Premium Hero Header */}
            <div className="bg-[#0f1e14] pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <ScrollReveal>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-green-500/20 p-2 rounded-lg backdrop-blur-md border border-green-500/20">
                                <Shield className="text-green-400" size={20} />
                            </div>
                            <span className="text-green-400 font-bold uppercase tracking-widest text-sm">Privacy & Security</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 font-display leading-tight">Privacy Policy</h1>
                        <p className="text-green-100/70 text-xl max-w-2xl leading-relaxed">
                            How we protect your data and ensure your trust while you explore North East India with us.
                        </p>
                    </ScrollReveal>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <ScrollReveal>
                    <div className="space-y-6">
                        {sections.map((section, idx) => (
                            <div key={idx} className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-green-100 transition-all">
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
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">Updated Regularly</h3>
                        <p className="text-gray-500 mb-0">Last updated: March 2026. This policy may be updated as we evolve our services.</p>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
