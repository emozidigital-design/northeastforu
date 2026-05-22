'use client';

import dynamic from 'next/dynamic';

const NortheastMap = dynamic(
    () => import('./NortheastMap'),
    {
        ssr: false,
        loading: () => (
            <div className="h-[580px] bg-gray-100 animate-pulse rounded-3xl" />
        ),
    }
);

export default function NortheastMapWrapper() {
    return <NortheastMap />;
}
