import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { INSIGHTS_DATA } from '../data';
import { SEO } from '../components/SEO';

// Explicitly type component as React.FC to allow 'key' prop and ensure type compatibility with App.tsx
export const Insights: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const categories = ['All', 'Market Analysis', 'Development', 'Regulation'];
    const filtered = activeCategory === 'All' ? INSIGHTS_DATA : INSIGHTS_DATA.filter(a => a.category === activeCategory);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const currentData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#0f0f0f] min-h-screen">
            <SEO title="Market Intelligence | Lornell Real Estate" description="Stay ahead of the market with Lornell's latest insights on Worcester commercial real estate, zoning reforms, and investment trends." />
            
            <section className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505692794400-41593d3e2ab3?q=80&w=2670&auto=format&fit=crop')" }} />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="relative z-10 h-full container mx-auto px-6 md:px-12 flex flex-col justify-center gap-6">
                    <button onClick={onBack} className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </button>
                    <span className="text-xs font-bold uppercase tracking-[0.4em] text-red-400">Insights</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white max-w-3xl leading-tight">Market intelligence shaped by real conversations.</h1>
                    <p className="text-gray-300 max-w-2xl text-lg md:text-xl">We walk sites, listen to operators, and translate what we learn into honest briefings. Every article below comes from a relationship on the ground.</p>
                </div>
            </section>

            <div className="container mx-auto px-6 md:px-12 pt-24 pb-24">
                {/* Filter */}
                <div className="flex flex-wrap gap-6 mb-12 border-b border-white/10 pb-4">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                            className={`text-xs font-bold uppercase tracking-widest pb-4 border-b-2 transition-all ${activeCategory === cat ? 'text-red-500 border-red-500' : 'text-gray-500 border-transparent hover:text-white'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Full viewport story cards */}
                <div className="space-y-24">
                    {currentData.length > 0 ? (
                        currentData.map((article, idx) => (
                            <motion.section
                                key={article.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative h-screen w-full overflow-hidden rounded-sm"
                            >
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${article.imageUrl})` }} />
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
                                <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 max-w-3xl">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-400 mb-4">{article.category}</span>
                                    <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6">{article.title}</h3>
                                    <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6">{article.summary}</p>
                                    <span className="text-xs text-gray-400 uppercase tracking-[0.3em]">{article.date}</span>
                                </div>
                            </motion.section>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-12">No articles found in this category.</div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-6 pt-8 border-t border-white/5">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-3 border border-white/10 hover:border-white text-white disabled:opacity-30 disabled:border-white/5 disabled:hover:border-white/5 transition-all rounded-full"><ChevronLeft className="w-5 h-5" /></button>
                        <span className="text-sm font-bold tracking-widest text-gray-400">PAGE {currentPage} / {totalPages}</span>
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-3 border border-white/10 hover:border-white text-white disabled:opacity-30 disabled:border-white/5 disabled:hover:border-white/5 transition-all rounded-full"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                )}
            </div>
        </motion.div>
    )
}