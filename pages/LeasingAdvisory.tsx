import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Users, MapPin, Handshake } from 'lucide-react';
import { SEO } from '../components/SEO';

interface ServicePageProps {
    onBack: () => void;
}

const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

export const LeasingAdvisory: React.FC<ServicePageProps> = ({ onBack }) => {
    const panels = [
        {
            label: 'Leasing Advisory',
            title: 'Space planning with empathy.',
            copy: 'We ask about your tenants, your maintenance realities, and the culture you want inside the building. That understanding informs every tour, proposal, and conversation.',
            bullets: [
                { highlight: 'Tenant communication plans', body: 'drafted with ownership.' },
                { highlight: 'Shared dashboards', body: 'showing interest, tours, and feedback.' },
                { highlight: 'Alignment on what matters most', body: '—occupancy, rent, or neighborhood mix.' }
            ],
            image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2670&auto=format&fit=crop',
            icon: <Users className="w-6 h-6 text-red-200" />,
        },
        {
            label: 'Market Approach',
            title: 'Local insight, honest storytelling.',
            copy: 'We spend time on-site and in the surrounding blocks. Instead of selling hype, we highlight what is true about your asset and what support the city can offer.',
            bullets: [
                { highlight: 'First-hand walk-through notes', body: 'shared with you.' },
                { highlight: 'Context on competing availabilities', body: 'and real tenant questions.' },
                { highlight: 'Flexible outreach plans', body: 'for office, retail, and industrial users.' }
            ],
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop',
            icon: <MapPin className="w-6 h-6 text-red-200" />,
        },
        {
            label: 'Partnership',
            title: 'We stay beside you after the lease is signed.',
            copy: 'Move-ins need care. We coordinate with contractors, help tenants understand building rhythms, and remain available long after keys change hands.',
            bullets: [
                { highlight: 'Documented next steps', body: 'for both sides at LOI, lease, and move-in.' },
                { highlight: 'Check-ins after opening', body: 'to confirm everyone has what they need.' },
                { highlight: 'Thoughtful introductions', body: 'between new tenants and existing neighbors.' }
            ],
            image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2670&auto=format&fit=crop',
            icon: <Handshake className="w-6 h-6 text-red-200" />,
        },
    ];

    return (
        <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }} className="min-h-screen bg-black text-white pt-32 md:pt-40">
            <SEO
                title="Leasing Advisory | Lornell Real Estate"
                description="Comprehensive landlord and tenant representation for office, retail, and industrial assets."
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
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
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
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
                        <p className="text-xs uppercase tracking-[0.4em] text-red-400 mb-4">Schedule a Session</p>
                        <h2 className="text-4xl font-serif mb-6">Let’s map the leasing journey together.</h2>
                        <p className="text-gray-400 mb-10">Bring us the floor plans, the story of the building, and the tenants you admire. We will create a plan rooted in care, accountability, and community impact.</p>
                        <button onClick={onBack} className="inline-flex items-center gap-3 px-10 py-4 border border-white uppercase tracking-[0.3em] text-xs font-bold hover:bg-white hover:text-black transition-all">
                            Return Home <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

