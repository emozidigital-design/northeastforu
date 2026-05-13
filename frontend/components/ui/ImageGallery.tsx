'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
    images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);

    const showNext = useCallback(() => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % images.length);
        }
    }, [selectedIndex, images.length]);

    const showPrev = useCallback(() => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
        }
    }, [selectedIndex, images.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, showNext, showPrev]);

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gray-100 hover-lift"
                        onClick={() => openLightbox(index)}
                    >
                        <Image
                            src={src}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                    </div>
                ))}
            </div>

            {selectedIndex !== null && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 transition-all animate-in fade-in duration-300">
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                        onClick={closeLightbox}
                    >
                        <X size={32} />
                    </button>

                    <button
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                        onClick={showPrev}
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <div className="relative w-full max-w-5xl aspect-video mx-12">
                        <Image
                            src={images[selectedIndex]}
                            alt={`Gallery image ${selectedIndex + 1}`}
                            fill
                            className="object-contain"
                            priority
                        />
                        <div className="absolute bottom-[-40px] left-0 w-full text-center text-white/70 text-sm">
                            {selectedIndex + 1} / {images.length}
                        </div>
                    </div>

                    <button
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                        onClick={showNext}
                    >
                        <ChevronRight size={48} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
