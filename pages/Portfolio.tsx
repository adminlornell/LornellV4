import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Map as MapIcon, ArrowLeft } from 'lucide-react';
import { MapComponent } from '../components/MapComponent';
import { ListingCard } from '../components/PropertyCard';
import { Property } from '../types';
import { PROPERTY_DATA } from '../data';
import { SEO } from '../components/SEO';

interface PortfolioProps {
    onBack: () => void;
    onSelectProperty: (p: Property) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onBack, onSelectProperty }) => {
    const [viewMode, setViewMode] = useState<'list' | 'map'>('map'); // Default to map per request
    const [filteredProperties, setFilteredProperties] = useState<Property[]>(PROPERTY_DATA);

    // Reset filtered properties when switching modes
    useEffect(() => {
        if (viewMode === 'list') {
            setFilteredProperties(PROPERTY_DATA);
        }
    }, [viewMode]);

    const handleBoundsChange = (visible: Property[]) => {
        if (viewMode === 'map') {
            setFilteredProperties(visible);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="pt-32 md:pt-40 min-h-screen bg-[#0f0f0f] flex flex-col">
            <SEO title="Portfolio | Lornell Real Estate" description="Explore our curated portfolio of premium commercial real estate assets in Worcester and Central New England." />
            
            {/* Header Controls */}
            <div className="container mx-auto px-6 md:px-12 mb-6 flex-shrink-0">
                <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6">
                    <div>
                        <button onClick={onBack} className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-4">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Home
                        </button>
                        <h1 className="text-3xl md:text-4xl font-serif italic text-white">The Portfolio</h1>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <button onClick={() => setViewMode('list')} className={`flex items-center gap-2 px-4 py-2 border text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-white text-black border-white' : 'border-white/20 text-gray-400 hover:text-white'}`}>
                            <LayoutGrid className="w-4 h-4" /> Grid
                        </button>
                        <button onClick={() => setViewMode('map')} className={`flex items-center gap-2 px-4 py-2 border text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'map' ? 'bg-white text-black border-white' : 'border-white/20 text-gray-400 hover:text-white'}`}>
                            <MapIcon className="w-4 h-4" /> Map
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative">
                {viewMode === 'list' ? (
                    <div className="container mx-auto px-6 md:px-12 pb-24 overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {PROPERTY_DATA.map((prop) => (
                                <div key={prop.id} onClick={() => onSelectProperty(prop)}>
                                    <ListingCard 
                                        address={prop.address} 
                                        city={prop.city} 
                                        type={prop.type} 
                                        price={prop.price} 
                                        specs={[prop.size, prop.status]} 
                                        img={prop.img} 
                                        tag={prop.status} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row h-[calc(100vh-180px)] border-t border-white/10">
                        {/* Sidebar */}
                        <div className="hidden md:block w-1/3 lg:w-1/4 h-full overflow-y-auto bg-[#1A1A1A] border-r border-white/10 custom-scrollbar">
                            <div className="p-6 border-b border-white/5 sticky top-0 bg-[#1A1A1A] z-10">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">Visible Results ({filteredProperties.length})</h3>
                            </div>
                            <div className="divide-y divide-white/5">
                                {filteredProperties.length > 0 ? (
                                    filteredProperties.map(prop => (
                                        <div key={prop.id} onClick={() => onSelectProperty(prop)} className="p-6 hover:bg-white/5 cursor-pointer transition-colors group">
                                            <div className="flex gap-4">
                                                <div className="w-20 h-20 flex-shrink-0 bg-gray-800 overflow-hidden rounded-sm">
                                                    <img src={prop.img} alt={prop.address} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-serif text-md truncate group-hover:text-red-500 transition-colors">{prop.address}</h4>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{prop.city}</p>
                                                    <p className="text-sm font-medium text-white mb-2">{prop.price}</p>
                                                    <div className="flex gap-2">
                                                        <span className="text-[9px] px-2 py-0.5 border border-white/20 text-gray-400 rounded-sm">{prop.type}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-500 text-sm">
                                        No properties in this area. Try zooming out.
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Map */}
                        <div className="w-full md:w-2/3 lg:w-3/4 h-full relative bg-[#121212]">
                            <MapComponent properties={PROPERTY_DATA} onSelectProperty={onSelectProperty} onBoundsChange={handleBoundsChange} />
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};