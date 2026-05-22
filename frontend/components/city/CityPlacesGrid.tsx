'use client';

import { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import SmartImage from '@/components/ui/SmartImage';
import type { PlaceData } from '@/lib/cityData';

const CATEGORY_LABELS: Record<PlaceData['category'], string> = {
  temple: 'Temple & Spiritual',
  nature: 'Nature & Outdoors',
  heritage: 'Heritage & History',
  wildlife: 'Wildlife & Safari',
  viewpoint: 'Viewpoints',
  market: 'Markets & Shopping',
  museum: 'Museums',
  adventure: 'Adventure',
  lake: 'Lakes',
  waterfall: 'Waterfalls',
  festival: 'Festivals',
};

const CATEGORY_COLORS: Record<PlaceData['category'], string> = {
  temple: 'bg-amber-50 text-amber-700 border-amber-200',
  nature: 'bg-green-50 text-green-700 border-green-200',
  heritage: 'bg-stone-50 text-stone-700 border-stone-200',
  wildlife: 'bg-orange-50 text-orange-700 border-orange-200',
  viewpoint: 'bg-sky-50 text-sky-700 border-sky-200',
  market: 'bg-violet-50 text-violet-700 border-violet-200',
  museum: 'bg-rose-50 text-rose-700 border-rose-200',
  adventure: 'bg-red-50 text-red-700 border-red-200',
  lake: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  waterfall: 'bg-teal-50 text-teal-700 border-teal-200',
  festival: 'bg-pink-50 text-pink-700 border-pink-200',
};

function PlaceCard({ place }: { place: PlaceData }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-900/8 transition-all duration-500">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <SmartImage
          src={place.image || null}
          alt={place.name}
          className="w-full h-full group-hover:scale-105 transition-transform duration-700 object-cover"
          fallbackType="nature"
          searchKeyword={place.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Category badge */}
        <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-sm ${CATEGORY_COLORS[place.category]}`}>
          {CATEGORY_LABELS[place.category]}
        </span>
        {/* Best time badge */}
        {place.best_time && (
          <span className="absolute bottom-4 right-4 text-xs font-semibold bg-black/50 text-white/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
            🗓 {place.best_time}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">{place.name}</h3>
        <p className={`text-sm text-gray-500 leading-relaxed mb-4 ${expanded ? '' : 'line-clamp-2'}`}>
          {place.description}
        </p>

        {/* Why visit */}
        <div className="space-y-2 mb-4">
          {(expanded ? place.why_visit : place.why_visit.slice(0, 2)).map((reason, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle2 size={15} className="text-[#7fff27] flex-shrink-0 mt-0.5" style={{ filter: 'drop-shadow(0 0 2px #7fff2780)' }} />
              <span className="text-sm text-gray-600">{reason}</span>
            </div>
          ))}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-sm font-semibold text-[#1a6b3c] hover:text-green-500 transition-colors mt-1"
        >
          {expanded ? (
            <><ChevronUp size={16} /> Show less</>
          ) : (
            <><ChevronDown size={16} /> Read more</>
          )}
        </button>
      </div>
    </div>
  );
}

export default function CityPlacesGrid({ places }: { places: PlaceData[] }) {
  const categories = Array.from(new Set(places.map(p => p.category)));
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filtered = activeFilter === 'all'
    ? places
    : places.filter(p => p.category === activeFilter);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
            activeFilter === 'all'
              ? 'bg-[#0f1e14] text-[#7fff27] border-[#0f1e14]'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
        >
          All Places
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              activeFilter === cat
                ? 'bg-[#0f1e14] text-[#7fff27] border-[#0f1e14]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
            }`}
          >
            {CATEGORY_LABELS[cat as PlaceData['category']]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(place => (
          <PlaceCard key={place.slug} place={place} />
        ))}
      </div>
    </div>
  );
}
