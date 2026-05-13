'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Zap } from 'lucide-react';

const PageLoader: React.FC = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        // Safety timeout: Ensure loader dismisses after 3 seconds regardless of logic
        const safetyTimeout = setTimeout(() => {
            setLoading(false);
        }, 3000);

        const handleComplete = () => {
            setTimeout(() => setLoading(false), 300);
        };

        handleComplete();

        return () => clearTimeout(safetyTimeout);
    }, [pathname, searchParams]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                <div className="h-full bg-green-600 animate-progress origin-left"></div>
            </div>
            <div className="flex flex-col items-center">
                <div className="relative">
                    <Zap className="w-16 h-16 text-green-600 animate-pulse" />
                    <div className="absolute inset-0 bg-green-600/20 blur-xl rounded-full scale-150 animate-pulse"></div>
                </div>
                <h2 className="mt-4 text-xl font-bold tracking-wider text-gray-800 uppercase">
                    NorthEast<span className="text-green-600">ForU</span>
                </h2>
            </div>
            <style jsx>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
        .animate-progress {
          animation: progress 0.8s ease-in-out forwards;
        }
      `}</style>
        </div>
    );
};

export default PageLoader;
