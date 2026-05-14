'use client';

import Link from 'next/link';
import SmartImage from './SmartImage';
import { Calendar, MapPin, Bookmark } from 'lucide-react';
import { useState } from 'react';

interface StateCardProps {
  name: string;
  slug: string;
  image: string;
  theme: string;
  best_season: string;
  city_count: number;
}

export default function StateCard({ name, slug, image, theme, best_season, city_count }: StateCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white rounded-[1.75rem] overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.10)] hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.16)] transition-all duration-400 flex flex-col group">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <SmartImage
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          fallbackType="nature"
          slug={slug}
          contentType="state"
          searchKeyword={name}
        />
        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        {/* Bookmark button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setSaved((v) => !v);
          }}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform z-10"
          aria-label="Save destination"
        >
          <Bookmark
            size={15}
            className={saved ? 'fill-emerald-600 text-emerald-600' : 'text-gray-500'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Title + theme */}
        <div>
          <h3 className="text-[1.05rem] font-extrabold text-gray-900 leading-tight tracking-tight">
            {name}
          </h3>
          <p className="text-[0.78rem] text-gray-400 mt-0.5 font-medium">{theme}</p>
        </div>

        {/* Meta tags */}
        <div className="flex items-center gap-4 text-[0.75rem] text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} className="text-gray-400 flex-shrink-0" />
            <span>{best_season}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} className="text-gray-400 flex-shrink-0" />
            <span>{city_count} destinations</span>
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/${slug}`}
          className="mt-auto w-full bg-gray-900 text-white text-sm font-bold py-3 rounded-2xl text-center hover:bg-emerald-700 transition-colors duration-200 tracking-wide"
        >
          Explore {name}
        </Link>
      </div>
    </div>
  );
}
