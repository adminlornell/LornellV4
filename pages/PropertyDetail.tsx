import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Download, Share2, Printer } from 'lucide-react';
import { Property } from '../types';
import { InquiryModal } from '../components/InquiryModal';
import { ListingCard } from '../components/PropertyCard';
import { MapComponent } from '../components/MapComponent';
import { generatePropertyInsights } from '../services/geminiService'; 
import { SEO } from '../components/SEO';
import { generatePropertySchema } from '../utils/seoHelpers';

interface PropertyDetailProps {
    property: Property;
    onBack: () => void;
    allProperties: Property[];
    onSelectProperty: (p: Property) => void;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onBack, allProperties, onSelectProperty }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [aiInsights, setAiInsights] = useState<string | null>(null);
    const [isLoadingAi, setIsLoadingAi] = useState(false);

    const details = property.details || { buildingName: "Property Details" };
    const similarProperties = allProperties.filter(p => p.id !== property.id && p.type === property.type).slice(0, 3);

    const handleGenerateInsights = async () => {
        setIsLoadingAi(true);
        const insights = await generatePropertyInsights(property);
        setAiInsights(insights);
        setIsLoadingAi(false);
    };

    // Fallback description if none provided
    const metaDescription = property.description 
        ? property.description.substring(0, 150) + "..." 
        : `View details for ${property.address} in ${property.city}, ${property.state}. ${property.type} property available for ${property.status}.`;

    // Generate Schema
    const propertySchema = generatePropertySchema(property);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="bg-[#0f0f0f] min-h-screen">
            <SEO 
                title={`${property.address}, ${property.city} | ${property.type}`} 
                description={metaDescription}
                image={property.img}
                type="product"
                schema={propertySchema}
            />
            <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} propertyAddress={property.address} />
            
            {/* HERO */}
            <div className="relative h-screen w-full overflow-hidden">
                <img src={property.img} alt={property.address} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/20 to-black/40"></div>
                
                <div className="absolute bottom-12 left-0 right-0 z-10 container mx-auto px-6 md:px-12">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className={`text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 ${property.status === 'For Lease' ? 'bg-red-600' : 'bg-blue-600'}`}>{property.status}</div>
                        <div className="text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 border border-white/30">{property.type}</div>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white uppercase tracking-wide mb-4 leading-none">{property.address}</h1>
                    <p className="text-lg md:text-2xl text-gray-300 font-light tracking-[0.15em] uppercase">{property.city}, {property.state} {property.zip} <span className="text-red-500 mx-2">|</span> {property.price}</p>
                </div>

                <div className="absolute top-32 left-6 md:left-12 z-20">
                    <button onClick={onBack} className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-red-500 transition-colors backdrop-blur-md bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:border-red-500/50">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
                    </button>
                </div>
            </div>

            {/* INSIGHTS BAR */}
            <div className="bg-[#151515] border-b border-white/10 py-10">
                 <div className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                     <div className="border-r border-white/5 last:border-0">
                         <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Building Size</p>
                         <p className="text-xl md:text-2xl text-white font-serif">{property.size}</p>
                     </div>
                     <div className="border-r border-white/5 last:border-0">
                         <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Price / Rate</p>
                         <p className="text-xl md:text-2xl text-white font-serif">{property.price}</p>
                     </div>
                     <div className="border-r border-white/5 last:border-0">
                         <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Type</p>
                         <p className="text-xl md:text-2xl text-white font-serif">{property.type}</p>
                     </div>
                     <div>
                         <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Zoning</p>
                         <p className="text-xl md:text-2xl text-white font-serif">{details.zoning || "N/A"}</p>
                     </div>
                 </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="container mx-auto px-6 md:px-12 py-16 border-b border-white/5">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* Left Column: Details */}
                    <div className="flex-1 w-full lg:w-2/3">
                        
                        <div className="mb-16 border-b border-white/10 pb-16">
                            <div className="flex justify-between items-end mb-8">
                                <h2 className="text-3xl font-serif italic text-white">Executive Summary</h2>
                                {!aiInsights && (
                                    <button onClick={handleGenerateInsights} className="text-xs text-red-500 border border-red-500 px-4 py-2 uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                                        {isLoadingAi ? "Analyzing..." : "Generate AI Insight"}
                                    </button>
                                )}
                            </div>
                            
                            {aiInsights && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8 p-6 bg-gray-900 border-l-2 border-red-500">
                                    <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: aiInsights.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                                </motion.div>
                            )}

                            <p className="text-gray-300 leading-loose text-lg md:text-xl font-light max-w-none">
                                {property.description || property.headline || "A premier commercial opportunity situated in a strategic location. This asset offers exceptional value for investors or owner-users looking to expand their footprint in the Central New England market."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Building Specs</h3>
                                <ul className="space-y-0">
                                    <li className="flex justify-between py-3 border-b border-white/5"><span className="text-gray-500 text-sm">Address</span><span className="text-gray-200 font-medium text-sm text-right">{property.address}</span></li>
                                    <li className="flex justify-between py-3 border-b border-white/5"><span className="text-gray-500 text-sm">Year Built</span><span className="text-gray-200 font-medium text-sm text-right">{details.yearBuilt || "N/A"}</span></li>
                                    <li className="flex justify-between py-3 border-b border-white/5"><span className="text-gray-500 text-sm">Lot Size</span><span className="text-gray-200 font-medium text-sm text-right">{details.lotSize || "N/A"}</span></li>
                                    <li className="flex justify-between py-3 border-b border-white/5"><span className="text-gray-500 text-sm">Zoning</span><span className="text-gray-200 font-medium text-sm text-right">{details.zoning || "N/A"}</span></li>
                                    <li className="flex justify-between py-3 border-b border-white/5"><span className="text-gray-500 text-sm">Parking</span><span className="text-gray-200 font-medium text-sm text-right">{details.parking || "N/A"}</span></li>
                                    {details.loading && <li className="flex justify-between py-3 border-b border-white/5"><span className="text-gray-500 text-sm">Loading</span><span className="text-gray-200 font-medium text-sm text-right">{details.loading}</span></li>}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Financial & Lease</h3>
                                <ul className="space-y-0">
                                    {property.financials ? (
                                        <>
                                            <li className="flex justify-between py-3 border-b border-white/5"><span className="text-gray-500 text-sm">Price / SF</span><span className="text-gray-200 font-medium text-sm text-right">{property.financials.pricePerSF || property.price}</span></li>
                                            <li className="flex justify-between py-3 border-b border-white/5"><span className="text-gray-500 text-sm">Lease Type</span><span className="text-gray-200 font-medium text-sm text-right">{property.financials.leaseType || "N/A"}</span></li>
                                            <li className="flex justify-between py-3 border-b border-white/5"><span className="text-gray-500 text-sm">Tax Rate</span><span className="text-gray-200 font-medium text-sm text-right">{property.financials.taxRate || "N/A"}</span></li>
                                            {property.financials.capRate && <li className="flex justify-between py-3 border-b border-white/5"><span className="text-gray-500 text-sm">Cap Rate</span><span className="text-gray-200 font-medium text-sm text-right">{property.financials.capRate}</span></li>}
                                        </>
                                    ) : (
                                        <li className="py-3 text-gray-500 italic text-sm">Financial details available upon request.</li>
                                    )}
                                </ul>
                            </div>

                            {property.availability && (
                                <div>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">Space Availability</h3>
                                    <ul className="space-y-0">
                                        <li className="flex justify-between py-3 border-b border-white/5"><span className="text-gray-500 text-sm">Total Available</span><span className="text-gray-200 font-medium text-sm text-right">{property.availability.total}</span></li>
                                        {property.availability.contiguous && <li className="flex justify-between py-3 border-b border-white/5"><span className="text-gray-500 text-sm">Max Contiguous</span><span className="text-gray-200 font-medium text-sm text-right">{property.availability.contiguous}</span></li>}
                                        {property.availability.minDivisible && <li className="flex justify-between py-3 border-b border-white/5"><span className="text-gray-500 text-sm">Min Divisible</span><span className="text-gray-200 font-medium text-sm text-right">{property.availability.minDivisible}</span></li>}
                                        {property.availability.type && <li className="flex justify-between py-3 border-b border-white/5"><span className="text-gray-500 text-sm">Type</span><span className="text-gray-200 font-medium text-sm text-right">{property.availability.type}</span></li>}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Sticky Sidebar */}
                    <div className="lg:w-1/3 w-full mt-8 lg:mt-0">
                        <div className="sticky top-32 bg-[#181818] p-8 border border-white/10 shadow-2xl">
                            <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Exclusive Agent</p>
                                    <h3 className="text-lg font-serif font-bold text-white">{property.contact?.name || "Collin Mulcahy"}</h3>
                                    <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">{property.contact?.phone}</p>
                                    <p className="text-xs text-gray-500 mt-1 lowercase">{property.contact?.email}</p>
                                </div>
                                <div className="w-14 h-14 bg-gray-800 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                                    <img src={property.contact?.img} className="w-full h-full object-cover" alt="Agent" />
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <button onClick={() => setIsModalOpen(true)} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shadow-lg">
                                    <Mail className="w-4 h-4" /> Request Info
                                </button>
                                <button onClick={() => setIsModalOpen(true)} className="w-full py-4 border border-red-600 text-red-500 font-bold uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center gap-2">
                                    <Download className="w-4 h-4" /> Offering Memo
                                </button>
                            </div>

                            <div className="flex justify-center gap-8 text-gray-500 border-t border-white/10 pt-6">
                                <button className="hover:text-white transition-colors flex flex-col items-center gap-1 text-[10px] uppercase tracking-widest">
                                    <Share2 className="w-5 h-5" /> Share
                                </button>
                                <button onClick={() => window.print()} className="hover:text-white transition-colors flex flex-col items-center gap-1 text-[10px] uppercase tracking-widest">
                                    <Printer className="w-5 h-5" /> Print
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* FULL WIDTH MAP */}
            <div className="w-full h-[60vh] md:h-[70vh] relative border-b border-white/5">
                <MapComponent 
                    properties={[property]} 
                    onSelectProperty={() => {}} 
                    onBoundsChange={() => {}} 
                />
                <div className="absolute top-8 left-8 md:left-12 z-[400] bg-[#181818]/90 backdrop-blur-md p-6 border border-white/10 shadow-2xl max-w-xs pointer-events-none">
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-2">Property Location</p>
                    <p className="text-white font-serif text-xl leading-tight mb-2">{property.address}</p>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">{property.city}, {property.state} {property.zip}</p>
                </div>
            </div>

            {/* SIMILAR OPPORTUNITIES */}
            <div className="container mx-auto px-6 md:px-12 py-20">
                <h2 className="text-2xl font-serif text-white mb-12 border-l-4 border-red-600 pl-4">Similar Opportunities</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {similarProperties.map(sim => (
                        <div key={sim.id} onClick={() => onSelectProperty(sim)}>
                            <ListingCard 
                                address={sim.address} 
                                city={sim.city} 
                                type={sim.type} 
                                price={sim.price} 
                                specs={[sim.size, sim.status]} 
                                img={sim.img} 
                                tag={sim.status} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}