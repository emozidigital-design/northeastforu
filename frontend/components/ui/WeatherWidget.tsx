'use client';

import React, { useState, useEffect } from 'react';
import {
    Cloud,
    Sun,
    CloudRain,
    CloudLightning,
    Wind,
    Droplets,
    Calendar,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherData {
    current: {
        temp: number;
        condition: string;
        icon: string;
        humidity: number;
        wind_speed: number;
        description: string;
    };
    forecast: Array<{
        date: string;
        temp_min: number;
        temp_max: number;
        condition: string;
        icon: string;
    }>;
    last_updated: string;
}

const WeatherWidget = ({ cityName }: { cityName: string }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/weather/${cityName}`);
                const data = await response.json();
                if (data.success) {
                    setWeather(data.data);
                } else {
                    setError('Weather data unavailable');
                }
            } catch {
                setError('Failed to load weather');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [cityName]);

    if (loading) return (
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 h-[400px] flex items-center justify-center animate-pulse">
            <Cloud className="text-gray-700 animate-bounce" size={48} />
        </div>
    );

    if (error || !weather) return null;

    const currentMonth = new Date().getMonth();
    const isMonsoon = currentMonth >= 5 && currentMonth <= 8; // June to Sept
    const isGoodTime = !isMonsoon;

    const getWeatherIcon = (condition: string) => {
        const cond = condition.toLowerCase();
        if (cond.includes('rain')) return <CloudRain className="text-blue-400" size={32} />;
        if (cond.includes('cloud')) return <Cloud className="text-gray-400" size={32} />;
        if (cond.includes('clear') || cond.includes('sun')) return <Sun className="text-yellow-400" size={32} />;
        if (cond.includes('storm')) return <CloudLightning className="text-purple-400" size={32} />;
        return <Cloud className="text-gray-400" size={32} />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900/80 backdrop-blur-2xl border border-gray-800 rounded-3xl overflow-hidden shadow-2xl"
        >
            <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            Current Weather in {cityName}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1 capitalize">
                            {weather.current.description} • Last updated {new Date(weather.last_updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                    {isGoodTime ? (
                        <div className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                            <CheckCircle2 size={16} /> Currently a good time to visit
                        </div>
                    ) : (
                        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                            <AlertCircle size={16} /> Monsoon season - plan accordingly
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Main Temp */}
                    <div className="flex items-center gap-6">
                        <div className="p-6 bg-gray-950 rounded-3xl border border-gray-800 flex items-center justify-center">
                            {getWeatherIcon(weather.current.condition)}
                        </div>
                        <div>
                            <span className="text-6xl font-bold text-white tracking-tighter">
                                {weather.current.temp}°
                            </span>
                            <span className="text-gray-500 text-2xl font-medium">C</span>
                        </div>
                    </div>

                    {/* Humidity & Wind */}
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="flex items-center gap-3 text-gray-300">
                            <Droplets className="text-blue-400" size={20} />
                            <span className="text-sm font-medium">Humidity: {weather.current.humidity}%</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <Wind className="text-teal-400" size={20} />
                            <span className="text-sm font-medium">Wind: {weather.current.wind_speed} m/s</span>
                        </div>
                    </div>

                    {/* Travel Advice */}
                    <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-5">
                        <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Calendar size={14} /> Travel Advice
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {isGoodTime
                                ? "Expect pleasant conditions. Perfect for outdoor activities and sightseeing."
                                : "Carry umbrellas and expect localized rains. Waterfalls will be at their peak beauty!"}
                        </p>
                    </div>
                </div>

                {/* 7-day Forecast */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-white font-bold">7-Day Forecast</h4>
                        <div className="h-px bg-gray-800 flex-grow mx-4"></div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
                        {weather.forecast.map((day, idx) => (
                            <div key={idx} className="flex-shrink-0 w-28 bg-gray-950/50 border border-gray-800/50 rounded-2xl p-4 text-center hover:border-blue-500/30 transition-all">
                                <p className="text-gray-500 text-xs font-bold uppercase mb-3">
                                    {idx === 0 ? 'Today' : new Date(day.date).toLocaleDateString([], { weekday: 'short' })}
                                </p>
                                <div className="flex justify-center mb-3">
                                    {getWeatherIcon(day.condition)}
                                </div>
                                <div className="flex justify-center items-end gap-1">
                                    <span className="text-white font-bold">{day.temp_max}°</span>
                                    <span className="text-gray-600 text-xs">{day.temp_min}°</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherWidget;
