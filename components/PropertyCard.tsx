import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, ArrowUpRight } from 'lucide-react';

interface ListingCardProps {
    address: string;
    city: string;
    type: string;
    price: string;
    specs: string[];
    img: string;
    tag: string;
}

export const ListingCard: React.FC<ListingCardProps> = ({ address, city, type, price, specs, img, tag }) => {
    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className="group bg-[#181818] border border-white/5 hover:border-red-600/50 transition-all duration-500 cursor-pointer flex flex-col h-full shadow-lg hover:shadow-2xl hover:shadow-red-900/10">
            <div className="relative overflow-hidden w-full aspect-[4/3]">
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-lg">{tag}</div>
                <img src={img} alt={address} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 right-4 p-2 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"><ArrowUpRight className="w-5 h-5 text-white" /></div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2"><h3 className="text-xl font-serif text-white leading-tight">{address}</h3></div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-6 flex items-center gap-1"><MapPin className="w-3 h-3" /> {city}</p>
                <div className="mt-auto space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4"><span className="text-sm font-bold text-white flex items-center gap-2"><Building2 className="w-4 h-4 text-gray-500" /> {type}</span></div>
                    <div className="flex flex-wrap gap-2 mb-4">{specs.map((spec, i) => spec && (<span key={i} className="text-[10px] uppercase tracking-wide text-gray-400 bg-white/5 px-2 py-1 rounded-sm border border-white/5">{spec}</span>))}</div>
                    <div className="pt-2"><p className="text-lg font-bold text-white font-serif italic">{price}</p></div>
                </div>
            </div>
        </motion.div>
    )
}