import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface CollinBioProps {
    onBack: () => void;
}

export const CollinBio: React.FC<CollinBioProps> = ({ onBack }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-black text-white"
        >
            <section className="relative bg-cover bg-center h-[50vh]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2746&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
                <div className="relative z-[60] h-full flex flex-col justify-between px-8 md:px-16 py-10 pt-32 md:pt-40">
                    <div className="mt-16 md:mt-20">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onBack();
                            }}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-gray-300 hover:text-white transition-colors w-max relative z-[70] cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </button>
                    </div>
                    <div>
                        <p className="text-sm uppercase tracking-[0.5em] text-red-500 mb-4">Leadership</p>
                        <h1 className="text-4xl md:text-6xl font-serif mb-4">Collin Mulcahy</h1>
                        <p className="text-lg text-gray-300 uppercase tracking-[0.3em]">President</p>
                    </div>
                </div>
            </section>

            <section className="px-6 md:px-16 py-20 bg-[#0f0f0f]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
                    <div className="lg:col-span-2 space-y-8 text-gray-300 leading-relaxed text-lg">
                        <p>
                            Before entering commercial real estate, Collin spent several years in service roles, where he developed strong relationship-building skills. He later earned his degree from the Isenberg School of Management at UMass Amherst, gaining a solid foundation in business. His interest in real estate began while working in residential property management, where he learned the fundamentals of leasing, tenant relations, and property operations. This experience sparked his transition into the commercial sector.
                        </p>
                        <p>
                            Since joining LRE, Collin has earned a reputation for his dedication, adaptability, and results-driven approach. He has represented landlords, tenants, buyers, and sellers across industrial and small business sectors, bringing practical insight and creative problem-solving to every assignment. Known for tackling complex projects with confidence, Collin guides clients through each stage of the process and delivers reliable, long-term value.
                        </p>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-[#181818] p-8 border border-white/5">
                            <h3 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Contact</h3>
                            <p className="text-xl font-serif">collin@lornellre.com</p>
                            <p className="text-xl font-serif text-gray-400 mt-2">+1 (774) 230-3634</p>
                        </div>
                        <div className="bg-[#181818] p-8 border border-white/5">
                            <h3 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Focus Areas</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li>Industrial & flex leasing</li>
                                <li>Small business advisory</li>
                                <li>Tenant & landlord representation</li>
                                <li>Property operations strategy</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

