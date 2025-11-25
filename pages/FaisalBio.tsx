import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface FaisalBioProps {
    onBack: () => void;
}

export const FaisalBio: React.FC<FaisalBioProps> = ({ onBack }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-black text-white"
            style={{ pointerEvents: 'auto' }}
        >
            <section className="relative bg-cover bg-center h-[50vh]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop')" }}>
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
                        <h1 className="text-4xl md:text-6xl font-serif mb-4">Faisal Yaseen</h1>
                        <p className="text-lg text-gray-300 uppercase tracking-[0.3em]">Director of IT</p>
                    </div>
                </div>
            </section>

            <section className="px-6 md:px-16 py-20 bg-[#0f0f0f]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
                    <div className="lg:col-span-2 space-y-8 text-gray-300 leading-relaxed text-lg">
                        <p>
                            Faisal Yaseen brings over 8 years of experience in system engineering and QA automation to Lornell Real Estate. His career has been marked by continuous growth, advancing from System Engineer at TCS to QA Automation Engineer at Morningstar, while simultaneously pursuing advanced studies in Information Technology.
                        </p>
                        <p>
                            Faisal has led digital transformation initiatives for small business digitization and successfully managed technical infrastructure setup and system integrations. His expertise spans web application development, database solutions, and agile project management methodologies. A recognized expert in AI agent development, Faisal has created sophisticated AI-powered solutions that enhance business operations and client engagement. Currently pursuing a Master of Science in Information Technology at Worcester Polytechnic Institute, Faisal combines practical industry experience with cutting-edge academic knowledge.
                        </p>
                        <p>
                            His technical acumen, combined with strong project management skills, AI innovation capabilities, and a commitment to leveraging emerging technologies, makes him an invaluable leader in driving technology initiatives that support the firm's strategic objectives.
                        </p>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-[#181818] p-8 border border-white/5">
                            <h3 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Contact</h3>
                            <p className="text-xl font-serif">faisal@lornellre.com</p>
                            <p className="text-xl font-serif text-gray-400 mt-2">+1 (774) 745-0015</p>
                        </div>
                        <div className="bg-[#181818] p-8 border border-white/5">
                            <h3 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Education</h3>
                            <ul className="space-y-3 text-gray-300 text-sm">
                                <li>Master of Science - Information Technology<br />Worcester Polytechnic Institute (2024-2026)</li>
                                <li>Surge Program - Entrepreneurship<br />Indian Institute of Management, Calcutta (2022-2023)</li>
                                <li>Bachelor of Engineering - Electrical and Electronics Engineering<br />Sir M Visvesvaraya Institute Of Technology (2012-2016)</li>
                            </ul>
                        </div>
                        <div className="bg-[#181818] p-8 border border-white/5">
                            <h3 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Certifications</h3>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>Agile Foundations - LinkedIn Learning</li>
                                <li>Scrum: Advanced - LinkedIn Learning</li>
                                <li>Learning Jira Software - LinkedIn Learning</li>
                                <li>Agile at Work Series - LinkedIn Learning</li>
                                <li>Transitioning from Waterfall to Agile - LinkedIn Learning</li>
                            </ul>
                        </div>
                        <div className="bg-[#181818] p-8 border border-white/5">
                            <h3 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">Specialties</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li>AI Agent Development & Implementation</li>
                                <li>Technical Infrastructure Setup</li>
                                <li>System Design & Integration</li>
                                <li>Web Design & Development</li>
                                <li>Database Design & Development</li>
                                <li>QA Automation & Testing</li>
                                <li>Project Management & Agile Methodologies</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};
