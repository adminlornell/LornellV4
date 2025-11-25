import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Compass, PenTool, Hammer } from 'lucide-react';
import { SEO } from '../components/SEO';

interface ServicePageProps {
    onBack: () => void;
}

const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

export const Development: React.FC<ServicePageProps> = ({ onBack }) => {
    const panels = [
        {
            label: 'Development',
            title: 'Listening before drawing.',
            copy: 'Sites carry history, community memories, and practical limitations. We spend time with the people who know the property so any plan we create is rooted in respect.',
            bullets: [
                'Neighborhood walks and listening sessions documented for your team',
                'Honest feasibility readouts before budgets are committed',
                'Early alignment on sustainability, workforce, and local partners'
            ],
            image: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?q=80&w=2670&auto=format&fit=crop',
            icon: <Compass className="w-6 h-6 text-red-200" />,
        },
        {
            label: 'Design + Delivery',
            title: 'Clarity for architects, builders, and owners.',
            copy: 'We keep decisions organized so creative energy can stay focused on the work. Meeting notes, budget updates, and risk logs are shared with everyone at the same time.',
            bullets: [
                'Weekly huddles with action items and accountable owners',
                'Open-book tracking for schedule, cost, and approvals',
                'A calm voice during design changes and municipal reviews'
            ],
            image: 'https://images.unsplash.com/photo-1505692794400-41593d3e2ab3?q=80&w=2670&auto=format&fit=crop',
            icon: <PenTool className="w-6 h-6 text-red-200" />,
        },
        {
            label: 'Activation',
            title: 'Handing off a place people want to embrace.',
            copy: 'Opening day is more than a ribbon cutting. We plan with operators, neighbors, and civic partners so the project welcomes people the right way.',
            bullets: [
                'Operational checklists shared with property teams',
                'Introductions to local arts, education, and workforce groups',
                'Post-launch reviews to adjust wayfinding, programming, and communications'
            ],
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2689&auto=format&fit=crop',
            icon: <Hammer className="w-6 h-6 text-red-200" />,
        },
    ];

    return (
        <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }} className="min-h-screen bg-black text-white pt-32 md:pt-40">
            <SEO
                title="Development | Lornell Real Estate"
                description="End-to-end consulting for ground-up construction and adaptive reuse projects."
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
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
                    <div className="relative z-10 container mx-auto px-6 md:px-12">
                        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: index * 0.1 }} className="max-w-3xl">
                            <div className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-red-200">
                                {panel.icon}
                                <span>{panel.label}</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif mb-6">{panel.title}</h2>
                            <p className="text-lg text-gray-100 leading-relaxed mb-6">{panel.copy}</p>
                            <ul className="space-y-3 text-sm text-gray-200">
                                {panel.bullets.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <span className="w-2 h-2 mt-2 rounded-full bg-red-400" />
                                        <span>{item}</span>
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
                        <p className="text-xs uppercase tracking-[0.4em] text-red-400 mb-4">Co-Create</p>
                        <h2 className="text-4xl font-serif mb-6">Bring us in when the idea is still a sketch.</h2>
                        <p className="text-gray-400 mb-10">Tell us where you hope the project will stand, who it should serve, and what success looks like in 10 years. We will help you honor that vision with structure, accountability, and heart.</p>
                        <button onClick={onBack} className="inline-flex items-center gap-3 px-10 py-4 border border-white uppercase tracking-[0.3em] text-xs font-bold hover:bg-white hover:text-black transition-all">
                            Return Home <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

