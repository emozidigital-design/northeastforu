'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { getCuratedImage } from '@/lib/curatedImages';

interface SmartImageProps extends Omit<ImageProps, 'src'> {
    src: string | null | undefined;
    fallbackType?: 'nature' | 'city' | 'adventure' | 'abstract';
    objectFit?: 'cover' | 'contain' | 'fill';
    searchKeyword?: string;
    /** Pass the slug for curated lookups, e.g. "assam" or "kaziranga-national-park" */
    slug?: string;
    contentType?: 'state' | 'city' | 'attraction';
}

const fallbacks = {
    nature: 'https://images.unsplash.com/photo-1544735716-392fe2486ffe?auto=format&fit=crop&w=1200&q=80',
    // Assam tea gardens — universal NE nature fallback
    city: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80',
    // Gangtok — better NE city fallback
    adventure: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    // Kanchenjunga — NE adventure fallback
    abstract: 'https://images.unsplash.com/photo-1627915509748-0ca979147551?auto=format&fit=crop&w=1200&q=80',
    // Meghalaya waterfall — abstract/culture fallback
};

export default function SmartImage({
    src,
    fallbackType = 'nature',
    alt,
    className,
    objectFit = 'cover',
    searchKeyword,
    slug,
    contentType = 'state',
    ...props
}: SmartImageProps) {
    const [error, setError] = useState(false);
    const isLocal = !!(src && (src.startsWith('/images') || src.startsWith('/assets')));

    // 1. Try curated image by slug
    // 2. Fall back to type-based Unsplash image
    const slugToTry = slug || searchKeyword?.toLowerCase().replace(/\s+/g, '-');
    const curatedFallback = slugToTry
        ? getCuratedImage(slugToTry, contentType)
        : undefined;

    const ultimateFallback = curatedFallback || fallbacks[fallbackType];

    // In development, if it's a local /images path, we often don't have it yet.
    // Use the curated/ultimate fallback instead of showing a 404 or broken image.
    const finalSrc = (error || !src || (isLocal && process.env.NODE_ENV === 'development'))
        ? ultimateFallback
        : src;

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <Image
                src={finalSrc}
                alt={alt || 'NorthEast India'}
                fill
                className={`transition-opacity duration-500 ${objectFit === 'cover' ? 'object-cover' : 'object-contain'}`}
                onError={() => setError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={!isLocal}
                {...props}
            />
        </div>
    );
}
