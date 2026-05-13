'use client';

declare global {
  interface Window {
    dataLayer: any[];
  }
}


import React, { useState, useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import { MessageSquare, X, Send, User, Bot, Loader2, Sparkles, MapPin, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';

const SUGGESTIONS = [
    "🏔️ Suggest a 5-day NE India trip",
    "📋 What permits do I need?",
    "🌦️ Best time to visit Meghalaya?",
    "💰 Budget trip ideas"
];

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasHydrated, setHasHydrated] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Track analytics 
    useEffect(() => {
        if (isOpen) {
            // @ts-ignore
            if (window.dataLayer) {
                // @ts-ignore
                window.dataLayer.push({ event: 'chatbot_opened' });
            }
        }
    }, [isOpen]);

    // Set Hydration
    useEffect(() => {
        setHasHydrated(true);
    }, []);

    // Load initial messages from local storage
    const customId = "nef-chat-session-v2";
    
    const { messages, input = '', handleInputChange, handleSubmit, setMessages, isLoading, setInput, error } = useChat({
        api: '/api/chat',
        id: customId,
        onFinish: (message: any) => {
            // Check for tool calls and track them if needed
            if (message.toolInvocations?.some((t: any) => t.toolName === 'captureLead')) {
                if (typeof window !== 'undefined' && window.dataLayer) {
                    window.dataLayer.push({ event: 'chatbot_lead_captured' });
                }
            }
        }
    }) as any;

    // Save/Load messages to local storage
    useEffect(() => {
        if (!hasHydrated) return;
        const saved = localStorage.getItem(customId);
        if (saved && messages.length === 0) {
            try {
                setMessages(JSON.parse(saved));
            } catch (e) {}
        }
    }, [hasHydrated, setMessages, messages.length]);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(customId, JSON.stringify(messages));
        }
    }, [messages]);

    // Auto scroll
    useEffect(() => {
        if (isOpen && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input?.trim()) return;
        
        // Tracking
        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({ event: 'chatbot_message_sent' });
        }
        
        handleSubmit(e);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
        // We simulate a form submission event
        const dummyEvent = new Event('submit') as any;
        dummyEvent.preventDefault = () => {};
        
        // Tracking
        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({ event: 'chatbot_message_sent', suggestion_used: true });
        }
        
        handleSubmit(dummyEvent, { data: { suggestion } });
    };

    if (!hasHydrated) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-[350px] sm:w-[400px] h-[600px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-5">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#1a6b3c] to-green-600 p-4 flex justify-between items-center text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                                <Bot size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight">NEF Assistant</h3>
                                <p className="text-xs text-white/80">Expert AI Travel Planning</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#fafaf8]">
                        {messages.length === 0 ? (
                            <div className="text-center space-y-4 py-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="text-green-600" size={32} />
                                </div>
                                <h4 className="font-bold text-gray-900">Welcome to NorthEastForU!</h4>
                                <p className="text-sm text-gray-500 max-w-[250px] mx-auto">
                                    I am your personal AI travel assistant. How can I help you plan your North East India trip today?
                                </p>
                                <div className="flex flex-wrap justify-center gap-2 pt-4">
                                    {SUGGESTIONS.map((s, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => handleSuggestionClick(s)}
                                            className="text-xs bg-white border border-green-100 text-green-700 px-3 py-2 rounded-full hover:bg-green-50 transition-colors shadow-sm"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                {messages.map((m: any) => (
                                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-1">
                                                {m.role === 'user' ? (
                                                    <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
                                                        <User size={16} className="text-blue-600" />
                                                    </div>
                                                ) : (
                                                    <div className="w-full h-full bg-[#1a6b3c] rounded-full flex items-center justify-center">
                                                        <Bot size={16} className="text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="space-y-2">
                                                {/* Text Content */}
                                                {m.content && (
                                                    <div className={`p-3 rounded-2xl text-sm ${
                                                        m.role === 'user' 
                                                            ? 'bg-blue-600 text-white rounded-tr-none' 
                                                            : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-none prose prose-sm max-w-none prose-p:leading-relaxed prose-a:text-green-600'
                                                    }`}>
                                                        {m.role === 'user' ? (
                                                            m.content
                                                        ) : (
                                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                                {m.content}
                                                            </ReactMarkdown>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Tools/Actions Rendering */}
                                                {m.toolInvocations?.map((toolInvocation: any) => {
                                                    const { toolName, result } = toolInvocation;
                                                    
                                                    // Only show results when they are available
                                                    if (result) {
                                                        if (toolName === 'searchPackages' && result.results?.length > 0) {
                                                            return (
                                                                <div key={toolInvocation.toolCallId} className="flex flex-col gap-2 bg-white p-3 rounded-xl border border-green-100 shadow-sm mt-2">
                                                                    <div className="flex items-center gap-2 text-xs font-bold text-green-700 uppercase tracking-wide">
                                                                        <MapPin size={12} /> Relevant Packages
                                                                    </div>
                                                                    {result.results.map((pkg: any, idx: number) => (
                                                                        <Link href={pkg.url} key={idx} className="block p-2 rounded-lg hover:bg-green-50 border border-transparent hover:border-green-100 transition-colors">
                                                                            <h5 className="text-sm font-bold text-gray-900 leading-tight">{pkg.name}</h5>
                                                                            <div className="flex items-center justify-between mt-1 text-xs">
                                                                                <span className="text-gray-500">{pkg.duration}</span>
                                                                                <span className="font-bold text-green-600">₹{pkg.price}</span>
                                                                            </div>
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            );
                                                        }

                                                        if (toolName === 'searchBlogs' && result.results?.length > 0) {
                                                            return (
                                                                <div key={toolInvocation.toolCallId} className="flex flex-col gap-2 bg-white p-3 rounded-xl border border-blue-100 shadow-sm mt-2">
                                                                    <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wide">
                                                                        <Search size={12} /> Recommended Reading
                                                                    </div>
                                                                    {result.results.map((blog: any, idx: number) => (
                                                                        <Link href={blog.url} key={idx} className="block p-2 rounded-lg hover:bg-blue-50 transition-colors">
                                                                            <h5 className="text-sm font-medium text-gray-800 leading-tight hover:underline">{blog.title}</h5>
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            );
                                                        }

                                                        if (toolName === 'captureLead') {
                                                            return (
                                                                <div key={toolInvocation.toolCallId} className="bg-green-50 text-green-800 text-xs p-3 rounded-xl border border-green-200 mt-2 flex items-center gap-2 font-medium">
                                                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                                    Your details have been securely sent to our travel experts!
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                    
                                                    // Loading state for tool calls
                                                    return (
                                                        <div key={toolInvocation.toolCallId} className="flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-100 py-1.5 px-3 rounded-full shadow-sm">
                                                            <Loader2 size={12} className="animate-spin" />
                                                            {toolName === 'searchPackages' ? 'Searching packages...' : 
                                                             toolName === 'searchBlogs' ? 'Finding relevant guides...' : 
                                                             toolName === 'captureLead' ? 'Sending request to expert...' : 'Working...'}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                                    <div className="flex justify-start">
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-1 bg-[#1a6b3c]">
                                                <Bot size={16} className="text-white" />
                                            </div>
                                            <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm rounded-tl-none flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {error && (
                                    <div className="flex justify-start">
                                        <div className="flex gap-3 max-w-[85%] flex-row">
                                            <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-1 bg-[#1a6b3c]">
                                                <Bot size={16} className="text-white" />
                                            </div>
                                            <div className="p-3 rounded-2xl text-sm bg-red-50 text-red-600 border border-red-100 shadow-sm rounded-tl-none font-medium">
                                                Something went wrong, please try again.
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                        <form onSubmit={handleFormSubmit} className="relative flex items-center">
                            <input 
                                type="text" 
                                value={input || ''}
                                onChange={handleInputChange}
                                placeholder="Ask me about North East India..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-full pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium"
                                disabled={isLoading}
                            />
                            <button 
                                type="submit" 
                                disabled={!input?.trim() || isLoading}
                                className="absolute right-2 p-2 bg-[#1a6b3c] text-white rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:hover:bg-[#1a6b3c]"
                            >
                                <Send size={16} className="ml-0.5" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating Toggle Button */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-gradient-to-r from-[#1a6b3c] to-green-600 rounded-full shadow-xl shadow-green-900/20 text-white flex items-center justify-center hover:scale-105 transition-transform duration-300 relative group z-[100]"
                >
                    <MessageSquare size={24} />
                    {/* Notification Dot */}
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
                    
                    {/* Tooltip */}
                    <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-bold px-4 py-2 rounded-xl shadow-lg border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                        Ask our AI Assistant 👋
                    </span>
                </button>
            )}
            
            {/* Embedded styles for markdown prose content within chat */}
            <style jsx global>{`
                .prose p { margin-bottom: 0.5em; }
                .prose p:last-child { margin-bottom: 0; }
                .prose ul { list-style-type: disc; margin-left: 1.5em; margin-bottom: 0.5em; }
                .prose ol { list-style-type: decimal; margin-left: 1.5em; margin-bottom: 0.5em; }
                .prose li { margin-bottom: 0.25em; }
                .prose strong { color: #111827; font-weight: 700; }
            `}</style>
        </div>
    );
}
