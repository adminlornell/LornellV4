import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface ToddBioProps {
    onBack: () => void;
}

export const ToddBio: React.FC<ToddBioProps> = ({ onBack }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-black text-white"
        >
            <section className="relative bg-cover bg-center h-[50vh]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2746&auto=format&fit=crop')" }}>
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
                        <h1 className="text-4xl md:text-6xl font-serif mb-4">Todd Lornell</h1>
                        <p className="text-lg text-gray-300 uppercase tracking-[0.3em]">Principal & Founder</p>
                    </div>
                </div>
            </section>

            <section className="px-6 md:px-16 py-20 bg-[#0f0f0f]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
                    <div className="lg:col-span-2 space-y-8 text-gray-300 leading-relaxed text-lg">
                        <p>
                            Todd Lornell brings more than 35 years of experience in commercial real estate, anchored by a rich and diverse career in brokerage. His professional journey began in Denver, Colorado, where he owned and operated a small chain of farm-to-table butcher shops. That entrepreneurial foundation ultimately led him into commercial development and a broad range of real estate disciplines, including mall and retail center leasing, landlord representation, and tenant representation for both national and regional brands.
                        </p>
                        <p>
                            Over the course of his career, Todd has built deep market knowledge and long-standing relationships with landlords and tenants across the eastern seaboard. He has played a key role in successful store rollouts for numerous national retailers, including Home Depot, Dollar Tree, Michaels, Petsmart, and many others.
                        </p>
                        <p>
                            His expertise, industry insight, and relationship-driven approach continue to make him a valued leader in the commercial real estate sector.
                        </p>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-[#181818] p-8 border border-white/5">
                            <h3 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Contact</h3>
                            <p className="text-xl font-serif">todd@lornellre.com</p>
                            <p className="text-xl font-serif text-gray-400 mt-2">+1 (774) 745-0015</p>
                        </div>
                        <div className="bg-[#181818] p-8 border border-white/5">
                            <h3 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Focus Areas</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li>Strategic retail rollouts</li>
                                <li>Landlord & tenant representation</li>
                                <li>Regional mall & shopping center leasing</li>
                                <li>Institutional investment advisory</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};
