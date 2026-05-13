import Link from 'next/link';
import SmartImage from './SmartImage';
import { ArrowRight } from 'lucide-react';

interface CardItem {
    title: string;
    slug: string;
    image?: string;
    description?: string;
    stateSlug?: string; // Added to support direct links from global lists
    citySlug?: string;  // Added for attraction links
}

export default function CardGrid({ items, type }: { items: CardItem[], type: 'state' | 'city' | 'attraction' | 'blog' | 'activity' }) {
    const getHref = (item: CardItem) => {
        if (type === 'state') return `/${item.slug}`;

        if (type === 'city') {
            const state = item.stateSlug || 'assam'; // Fallback to 'assam' if state is unknown
            return `/${state}/${item.slug}`;
        }

        if (type === 'attraction') {
            const state = item.stateSlug || 'assam';
            const city = item.citySlug || 'guwahati';
            return `/${state}/${city}/${item.slug}`;
        }

        if (type === 'activity') return `/activities/${item.slug}`;
        if (type === 'blog') return `/blog/${item.slug}`;
        return '#';
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
                <Link
                    key={item.slug}
                    href={getHref(item)}
                    className="group block bg-white rounded-3xl overflow-hidden border border-gray-100/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 hover-lift"
                >
                    <div className="relative h-56 w-full overflow-hidden image-zoom-container">
                        <SmartImage
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full"
                            fallbackType={type === 'state' ? 'nature' : type === 'city' ? 'city' : 'adventure'}
                            slug={item.slug}
                            contentType={type === 'state' ? 'state' : type === 'city' ? 'city' : 'attraction'}
                            searchKeyword={item.title}
                        />
                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                                {item.title}
                            </h3>
                            <ArrowRight size={18} className="text-gray-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        {item.description && (
                            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                                {item.description}
                            </p>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
}
