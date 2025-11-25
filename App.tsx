import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, ArrowRight, Quote, MapPin, Building2,
    ChevronLeft, ChevronRight, ArrowUpRight, Radio, Mail
} from 'lucide-react';

// Import Data
import { PROPERTY_DATA } from './data';
import { Property } from './types';

// Import New Components
import { Navigation } from './components/Navigation';
import { Portfolio } from './pages/Portfolio';
import { Insights } from './pages/Insights';
import { PropertyDetail } from './pages/PropertyDetail';
import { ToddBio } from './pages/ToddBio';
import { CollinBio } from './pages/CollinBio';
import { FaisalBio } from './pages/FaisalBio';
import { InvestmentSales } from './pages/InvestmentSales';
import { LeasingAdvisory } from './pages/LeasingAdvisory';
import { Development } from './pages/Development';
import { ListingCard } from './components/PropertyCard';
import { SEO } from './components/SEO';
import { LiveAgentModal } from './components/LiveAgentModal';
import video1 from './downloaded-videos/LVS1.mp4';
import video2 from './downloaded-videos/LVS2.mp4';
import video3 from './downloaded-videos/LVS3.mp4';
import video4 from './downloaded-videos/LVS4.mp4';
import video6 from './downloaded-videos/LVS6.mp4';
import video7 from './downloaded-videos/LVS7.mp4';
import video8 from './downloaded-videos/LVS8.mp4';

// --- Home Page Components ---

const HERO_VIDEOS = [video1, video2, video3, video4, video6, video7, video8];

const CinematicPropertySlider = ({ properties, onSelectProperty }: { properties: Property[]; onSelectProperty: (p: Property) => void }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % properties.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);

    useEffect(() => { const timer = setInterval(nextSlide, 8000); return () => clearInterval(timer); }, [currentIndex]);

    const currentProperty = properties[currentIndex];

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div key={currentIndex} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentProperty.img})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-black/10" />
                </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-32 left-0 right-0 text-center z-20 px-4 pointer-events-none">
                <motion.div key={`text-${currentIndex}`} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                    <div className="inline-block mb-4 px-4 py-1 border border-white/30 bg-black/30 backdrop-blur-sm text-xs font-bold uppercase tracking-[0.3em] text-red-400 rounded-full">Featured Asset</div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white uppercase tracking-widest mb-6 leading-tight drop-shadow-2xl">{currentProperty.headline || currentProperty.address}</h2>
                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-300">
                        <span>{currentProperty.city}</span>
                        <span className="hidden md:inline w-1 h-1 bg-red-500 rounded-full"></span>
                        <span>{currentProperty.type}</span>
                        <span className="hidden md:inline w-1 h-1 bg-red-500 rounded-full"></span>
                        <span className="text-white">{currentProperty.price}</span>
                    </div>
                    <div className="pointer-events-auto mt-10">
                        <button onClick={() => onSelectProperty(currentProperty)} className="px-10 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all duration-300">View Details</button>
                    </div>
                </motion.div>
            </div>
            <div className="absolute bottom-12 right-12 z-30 flex gap-4">
                <button onClick={prevSlide} className="p-4 rounded-full border border-white/10 bg-black/20 hover:bg-white hover:text-black text-white transition-all backdrop-blur-md"><ChevronLeft className="w-5 h-5" /></button>
                <button onClick={nextSlide} className="p-4 rounded-full border border-white/10 bg-black/20 hover:bg-white hover:text-black text-white transition-all backdrop-blur-md"><ChevronRight className="w-5 h-5" /></button>
            </div>
        </div>
    );
};

const ShowcaseBlock = ({ id, image, title, cta, onAction }: { id: string, image: string, title: string, cta: string, onAction: () => void }) => {
    return (
        <div id={id} className="relative h-screen w-full flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" style={{ backgroundImage: `url('${image}')` }} />
            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors duration-1000" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative z-30 text-center px-4">
                <h2 className="text-6xl md:text-9xl font-serif italic text-white mb-8 opacity-90">{title}</h2>
                <button onClick={onAction} className="inline-block px-12 py-5 border-2 border-white text-white text-sm font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-300">{cta}</button>
            </motion.div>
        </div>
    )
}

const ExpertiseCard = ({ title, desc, img, onClick }: { title: string, desc: string, img: string, onClick?: () => void }) => {
    return (
        <motion.div
            className={`group cursor-pointer ${onClick ? 'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-sm' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={(e) => {
                if (onClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            <div className="overflow-hidden mb-6 relative w-full aspect-[4/5]">
                <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                <img src={img} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-110 transition-all duration-1000 ease-in-out" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-widest mb-3 group-hover:text-red-500 transition-colors duration-300">{title}</h3>
            <p className="text-gray-400 font-light leading-relaxed text-sm group-hover:text-gray-300 transition-colors">{desc}</p>
        </motion.div>
    )
}

const TeamCard = ({ name, title, img, onClick }: { name: string, title: string, img: string, onClick?: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className={`group text-center ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
            onKeyDown={(e) => {
                if (onClick && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onClick();
                }
            }}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            <div className="overflow-hidden mb-6 relative w-full aspect-[3/4] bg-gray-800">
                <div className="absolute inset-0 bg-red-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay z-10 pointer-events-none"></div>
                <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700 ease-in-out"
                />
            </div>
            <h3 className="text-2xl font-serif font-medium text-white mb-2 group-hover:text-red-400 transition-colors duration-300">{name}</h3>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-red-500 transition-colors duration-300">{title}</p>
        </motion.div>
    )
}

const TestimonialCard = ({ quote, author, role }: { quote: string, author: string, role: string }) => {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col items-center text-center p-8 border border-white/5 hover:border-white/10 transition-colors duration-300 bg-[#181818]">
            <Quote className="w-8 h-8 text-red-900 mb-6 opacity-50" />
            <p className="text-lg md:text-xl font-serif italic text-gray-300 mb-8 leading-relaxed">"{quote}"</p>
            <div className="mt-auto">
                <p className="text-sm font-bold uppercase tracking-widest text-white mb-1">{author}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{role}</p>
            </div>
        </motion.div>
    )
}

const FooterLogo = () => {
    return (
        <div className="flex flex-col items-center justify-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <svg height="50" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                <text x="150" y="45" textAnchor="middle" fill="white" fontSize="42" className="font-serif font-bold tracking-widest uppercase">LORNELL</text>
                <rect x="50" y="55" width="200" height="2" fill="#DC2626" style={{ transformOrigin: "center" }} />
                <text x="150" y="80" textAnchor="middle" fill="white" fontSize="14" letterSpacing="0.4em" className="font-sans font-light uppercase">REAL ESTATE</text>
            </svg>
        </div>
    );
};

const HomeView: React.FC<{ onNavigate: (view: string, sectionId?: string) => void; onSelectProperty: (p: Property) => void; onOpenAgent: () => void; onShowToddBio: () => void; onShowCollinBio: () => void; onShowFaisalBio: () => void }> = ({ onNavigate, onSelectProperty, onOpenAgent, onShowToddBio, onShowCollinBio, onShowFaisalBio }) => {
    const featuredProperties = PROPERTY_DATA.filter(p => [1, 2, 3, 7, 8].includes(p.id)); // Featured assets: Spencer Retail, Leicester Mill, Burrillville Industrial, Webster Riverfront, Cambridge Storefront
    const [heroIndex, setHeroIndex] = useState(0);

    const handleVideoEnd = () => {
        setHeroIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <SEO /> {/* Default Home SEO */}
            <section id="hero" className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                        <motion.video
                            key={heroIndex}
                            src={HERO_VIDEOS[heroIndex]}
                            autoPlay
                            muted
                            playsInline
                            onEnded={handleVideoEnd}
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2 }}
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-black/40 z-10" />
                </div>
                <motion.div className="relative z-20 flex flex-col items-center px-4 max-w-5xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}>
                    <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 tracking-tighter leading-none drop-shadow-2xl" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Building The<br />Future</h1>
                    <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-300 mb-10">Commercial Real Estate • Investment • Development</p>
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Buttons moved to floating action buttons */}
                    </div>
                </motion.div>

                {/* Floating Live Agent Button */}
                {/* Floating Explore Portfolio Button (Bottom Left) */}
                <motion.button
                    onClick={() => onNavigate('properties')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    className="fixed bottom-8 left-8 z-50 px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all duration-300 shadow-xl hidden md:block"
                >
                    Explore Portfolio
                </motion.button>

                {/* Floating Contact Icon (Bottom Right, above Analyst) */}
                <motion.button
                    onClick={() => onNavigate('home', 'contact')}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.2, duration: 0.5 }}
                    className="fixed bottom-24 right-8 z-50 p-4 rounded-full bg-white text-black hover:bg-red-600 hover:text-white transition-all shadow-lg"
                    aria-label="Contact Us"
                >
                    <Mail className="w-6 h-6" />
                </motion.button>

                {/* Floating Live Agent Button */}
                <motion.button
                    onClick={onOpenAgent}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-black/80 backdrop-blur-md border border-red-500/50 px-4 py-3 rounded-full hover:bg-red-900/80 transition-all group"
                >
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-red-200">Talk to Analyst</span>
                    <Radio className="w-4 h-4 text-red-500" />
                </motion.button>

                <motion.div className="absolute bottom-10 left-0 right-0 flex justify-center z-20" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <ChevronDown className="w-6 h-6 text-white opacity-50" />
                </motion.div>
            </section>

            {/* Team Section */}
            <section id="agents" className="py-32 bg-[#0f0f0f]">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-serif text-white mb-16">The Partners</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        <TeamCard name="Todd Lornell" title="Principal & Founder" img="/images/todd.jpg" onClick={onShowToddBio} />
                        <TeamCard name="Faisal Yaseen" title="Director of IT" img="/images/faisal.jpg" onClick={onShowFaisalBio} />
                        <TeamCard name="Collin Mulcahy" title="President" img="/images/collin.jpg" onClick={onShowCollinBio} />
                    </div>
                </div>
            </section>

            {/* Cinematic Slider Section */}
            <section id="featured" className="relative z-20">
                <CinematicPropertySlider properties={featuredProperties} onSelectProperty={onSelectProperty} />
            </section>

            {/* Expertise Section */}
            <section id="expertise" className="py-32 px-6 bg-[#121212]">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8">
                        <div>
                            <span className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-2 block">Our Expertise</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-white">Market Leaders</h2>
                        </div>
                        <p className="text-gray-400 max-w-md text-right mt-4 md:mt-0">Decades of experience shaping the skyline and community of Central New England.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <ExpertiseCard
                            title="Investment Sales"
                            desc="Strategic disposition and acquisition services for institutional and private capital clients."
                            img="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
                            onClick={() => onNavigate('investment-sales')}
                        />
                        <ExpertiseCard
                            title="Leasing Advisory"
                            desc="Comprehensive landlord and tenant representation for office, retail, and industrial assets."
                            img="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop"
                            onClick={() => onNavigate('leasing-advisory')}
                        />
                        <ExpertiseCard
                            title="Development"
                            desc="End-to-end consulting for ground-up construction and adaptive reuse projects."
                            img="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2689&auto=format&fit=crop"
                            onClick={() => onNavigate('development')}
                        />
                    </div>
                </div>
            </section>

            {/* Visual Showcase Blocks */}
            <div id="visual-showcase">
                <ShowcaseBlock id="retail" image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop" title="Retail" cta="View Opportunities" onAction={() => onNavigate('properties')} />
                <ShowcaseBlock id="industrial" image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop" title="Industrial" cta="Explore Assets" onAction={() => onNavigate('properties')} />
            </div>

            {/* Contact / Footer */}
            <footer id="contact" className="bg-black text-white pt-32 pb-12 border-t border-white/10">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-24">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-serif mb-8">Let's Talk.</h2>
                            <p className="text-xl text-gray-400 font-light max-w-md mb-12">Whether you're looking to acquire, sell, or lease, our team is ready to provide the insight you need.</p>
                            <div className="space-y-2">
                                <p className="text-2xl font-serif">inquiry@lornellre.com</p>
                                <p className="text-2xl font-serif">+1 (774) 745-0015</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div className="grid grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Office</h4>
                                    <address className="not-italic text-gray-300 leading-loose">
                                        22 Cherry Street<br />
                                        Spencer, MA 01562<br />
                                        United States
                                    </address>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Social</h4>
                                    <ul className="space-y-4 text-gray-300">
                                        <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-12">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Join Our Newsletter</h4>
                                <div className="flex border-b border-white/20 pb-2">
                                    <input type="email" placeholder="Email Address" className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-600" />
                                    <button className="text-xs font-bold uppercase tracking-widest hover:text-red-500 transition-colors">Subscribe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <FooterLogo />
                        <p className="text-[10px] uppercase tracking-widest text-gray-600">© 2024 Lornell Real Estate. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </motion.div>
    )
}

// --- Main App Component ---

type View =
    | 'home'
    | 'properties'
    | 'insights'
    | 'detail'
    | 'todd-bio'
    | 'collin-bio'
    | 'faisal-bio'
    | 'investment-sales'
    | 'leasing-advisory'
    | 'development';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('home');
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [isAgentOpen, setIsAgentOpen] = useState(false);

    // Handle view navigation and smooth scrolling for anchor links
    const handleNavigate = (view: string, sectionId?: string) => {
        if (view === 'home' && sectionId) {
            setCurrentView('home');
            setSelectedProperty(null);
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // Standard navigation
            if (view === 'properties') setCurrentView('properties');
            else if (view === 'insights') setCurrentView('insights');
            else if (view === 'investment-sales') setCurrentView('investment-sales');
            else if (view === 'leasing-advisory') setCurrentView('leasing-advisory');
            else if (view === 'development') setCurrentView('development');
            else if (view === 'home') setCurrentView('home');

            setSelectedProperty(null);
            window.scrollTo(0, 0);
        }
    };

    const handleSelectProperty = (property: Property) => {
        setSelectedProperty(property);
        setCurrentView('detail');
        window.scrollTo(0, 0);
    };

    const handleShowToddBio = () => {
        setCurrentView('todd-bio');
        window.scrollTo(0, 0);
    };

    const handleShowCollinBio = () => {
        setCurrentView('collin-bio');
        window.scrollTo(0, 0);
    };

    const handleShowFaisalBio = () => {
        setCurrentView('faisal-bio');
        window.scrollTo(0, 0);
    };

    return (
        <div className="bg-black min-h-screen text-white selection:bg-red-900 selection:text-white font-sans">
            <Navigation onNavigate={handleNavigate} />
            <LiveAgentModal isOpen={isAgentOpen} onClose={() => setIsAgentOpen(false)} />

            <AnimatePresence mode="wait">
                {currentView === 'home' && (
                    <HomeView key="home" onNavigate={handleNavigate} onSelectProperty={handleSelectProperty} onOpenAgent={() => setIsAgentOpen(true)} onShowToddBio={handleShowToddBio} onShowCollinBio={handleShowCollinBio} onShowFaisalBio={handleShowFaisalBio} />
                )}
                {currentView === 'properties' && (
                    <Portfolio key="properties" onBack={() => handleNavigate('home')} onSelectProperty={handleSelectProperty} />
                )}
                {currentView === 'insights' && (
                    <Insights key="insights" onBack={() => handleNavigate('home')} />
                )}
                {currentView === 'detail' && selectedProperty && (
                    <PropertyDetail key="detail" property={selectedProperty} onBack={() => handleNavigate('properties')} allProperties={PROPERTY_DATA} onSelectProperty={handleSelectProperty} />
                )}
                {currentView === 'todd-bio' && (
                    <ToddBio key="todd-bio" onBack={() => handleNavigate('home')} />
                )}
                {currentView === 'collin-bio' && (
                    <CollinBio key="collin-bio" onBack={() => handleNavigate('home')} />
                )}
                {currentView === 'faisal-bio' && (
                    <FaisalBio key="faisal-bio" onBack={() => handleNavigate('home')} />
                )}
                {currentView === 'investment-sales' && (
                    <InvestmentSales key="investment-sales" onBack={() => handleNavigate('home')} />
                )}
                {currentView === 'leasing-advisory' && (
                    <LeasingAdvisory key="leasing-advisory" onBack={() => handleNavigate('home')} />
                )}
                {currentView === 'development' && (
                    <Development key="development" onBack={() => handleNavigate('home')} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;