import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, HeartHandshake, Compass, Shield } from 'lucide-react';
import { SEO } from '../components/SEO';

interface ServicePageProps {
    onBack: () => void;
}

const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

export const InvestmentSales: React.FC<ServicePageProps> = ({ onBack }) => {
    const panels = [
        {
            label: 'Investment Sales',
            title: 'Deals that feel like partnerships.',
            copy: 'Every mandate begins with a conversation about people, timing, and what “success” really means. We move at your speed, document decisions, and invite you into every call so trust never gets sidelined.',
            bullets: [
                { highlight: 'Shared outlines', body: 'for pricing, messaging, and diligence before launch.' },
                { highlight: 'Clear contact plans', body: 'for tenants, lenders, and local leaders.' },
                { highlight: 'Single point of contact', body: 'who stays with you through close.' }
            ],
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
            icon: <HeartHandshake className="w-6 h-6 text-red-200" />,
        },
        {
            label: 'Process',
            title: 'Guidance you can see.',
            copy: 'We publish the calendar, the buyer list, and the talking points so there is nothing hidden. If market feedback shifts, you hear it first and help shape the response.',
            bullets: [
                { highlight: 'Weekly recaps', body: 'with notes, questions, and next steps.' },
                { highlight: 'Secure workrooms', body: 'for sharing documents without email chains.' },
                { highlight: 'Side-by-side evaluation', body: 'of offers based on what matters to you.' }
            ],
            image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2670&auto=format&fit=crop',
            icon: <Compass className="w-6 h-6 text-red-200" />,
        },
        {
            label: 'Stewardship',
            title: 'Finishing well matters.',
            copy: 'We make sure closings feel calm, respectful, and prepared. Buyers leave with confidence in the asset. You leave with relationships intact and a team ready for the next chapter.',
            bullets: [
                { highlight: 'Introduction calls', body: 'that set tone and expectations.' },
                { highlight: 'Checklist-driven diligence', body: 'so nothing lingers.' },
                { highlight: 'Post-close debrief', body: 'to capture lessons and celebrate wins.' }
            ],
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2689&auto=format&fit=crop',
            icon: <Shield className="w-6 h-6 text-red-200" />,
        },
    ];

    return (
        <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }} className="min-h-screen bg-black text-white pt-32 md:pt-40">
            <SEO
                title="Investment Sales | Lornell Real Estate"
                description="Strategic disposition and acquisition services for institutional and private capital clients."
            />

            <section className="container mx-auto px-6 md:px-12">
                <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-12">
                    <button onClick={onBack} className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Home
                    </button>
                </motion.div>
            </section>

            {panels.map((panel, index) => (
                <section key={panel.title} className="relative h-screen flex items-center py-24">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${panel.image})` }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
                    <div className="relative z-10 container mx-auto px-6 md:px-12">
                        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: index * 0.1 }} className="max-w-3xl">
                            <div className="mb-6 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.5em] text-red-400">
                                {panel.icon}
                                <span>{panel.label}</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8">{panel.title}</h2>
                            <p className="text-xl text-gray-100 leading-relaxed mb-8">{panel.copy}</p>
                            <ul className="space-y-5 text-base text-gray-200 mt-6">
                                {panel.bullets.map((item) => (
                                    <li key={item.highlight} className="flex items-start gap-4">
                                        <span className="w-2 h-2 mt-3 rounded-full bg-red-400 flex-shrink-0" />
                                        <p className="leading-relaxed">
                                            <span className="font-semibold text-white">{item.highlight}</span>{' '}{item.body}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>
            ))}

            <section className="py-24 border-t border-white/5 bg-black">
                <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
                        <p className="text-xs uppercase tracking-[0.4em] text-red-400 mb-4">Let’s Talk</p>
                        <h2 className="text-4xl font-serif mb-6">If trust is the outcome, we’re aligned.</h2>
                        <p className="text-gray-400 mb-10">Share where you are in the hold cycle, what you need from a buyer, and any constraints you are balancing. We’ll respond with a simple plan and the people who will guide you.</p>
                        <button onClick={onBack} className="inline-flex items-center gap-3 px-10 py-4 border border-white uppercase tracking-[0.3em] text-xs font-bold hover:bg-white hover:text-black transition-all">
                            Return Home <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

