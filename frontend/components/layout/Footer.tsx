import Link from 'next/link';
import NewsletterSignup from '../ui/NewsletterSignup';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-4">NorthEastForU</h2>
                        <p className="max-w-xs text-gray-400">
                            Your comprehensive guide to exploring the hidden gems of North East India.
                            Discover beautiful states, culture, and adventure.
                        </p>
                    </div>
                    <div>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="hover:text-green-500 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-green-500 transition-colors">Contact</Link></li>
                            <li><Link href="/faq" className="hover:text-green-500 transition-colors">Travel FAQ</Link></li>
                            <li><Link href="/plan-your-trip" className="hover:text-green-500 transition-colors font-bold text-green-500">Plan Your Trip</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Link href="/blog" className="hover:text-white transition-colors">Travel Blog</Link></li>
                            <li><Link href="/explore" className="hover:text-white transition-colors">Explore States</Link></li>
                            <li><Link href="/activities" className="hover:text-white transition-colors">Activities</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="/privacy-policy" className="hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors text-sm">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 bg-gray-800/50 p-8 rounded-[2rem] border border-gray-800">
                    <NewsletterSignup variant="inline" />
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                    <p>&copy; {currentYear} NorthEastForU. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
