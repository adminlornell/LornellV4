import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, ArrowRight, Search } from 'lucide-react';

// --- Animated Logo Component ---
export const AnimatedLogo = ({ isScrolled }: { isScrolled: boolean }) => {
    const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } } };
    const itemVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
    const lineVariants: Variants = { hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } } };
    
    return (
      <motion.div className="flex flex-col items-center justify-center cursor-pointer" initial="hidden" animate="visible" variants={containerVariants}>
        <svg width="300" height="100" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-all duration-500 ${isScrolled ? 'h-16 w-auto' : 'h-24 md:h-28 w-auto'}`}>
          <defs>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;700&family=Playfair+Display:wght@700&display=swap'); .logo-serif { font-family: 'Playfair Display', serif; font-weight: 700; } .logo-sans { font-family: 'Inter', sans-serif; font-weight: 300; }`}</style>
          </defs>
          <motion.text x="150" y="45" textAnchor="middle" fill="white" fontSize="42" className="logo-serif tracking-widest uppercase" variants={itemVariants}>LORNELL</motion.text>
          <motion.rect x="50" y="55" width="200" height="2" fill="#DC2626" variants={lineVariants} style={{ transformOrigin: "center" }} />
          <motion.text x="150" y="80" textAnchor="middle" fill="white" fontSize="14" letterSpacing="0.4em" className="logo-sans uppercase" variants={itemVariants}>REAL ESTATE</motion.text>
        </svg>
      </motion.div>
    );
};

// --- Navigation Overlay ---
const NavigationMenu = ({ isOpen, onClose, onNavigate }: { isOpen: boolean; onClose: () => void; onNavigate: (view: string, sectionId?: string) => void }) => {
    const menuVariants: Variants = { closed: { opacity: 0, y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }, open: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } } };
    const navLinks = [
      { label: 'Portfolio', action: () => onNavigate('properties') },
      { label: 'Market Insights', action: () => onNavigate('insights') },
      { label: 'Investment Sales', action: () => onNavigate('investment-sales') },
      { label: 'Leasing Advisory', action: () => onNavigate('leasing-advisory') },
      { label: 'Development', action: () => onNavigate('development') },
      { label: 'Services Overview', action: () => onNavigate('home', 'expertise') },
      { label: 'The Team', action: () => onNavigate('home', 'agents') },
      { label: 'Contact', action: () => onNavigate('home', 'contact') },
    ];
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 bg-[#121212] z-[60] flex flex-col text-white overflow-hidden" initial="closed" animate="open" exit="closed" variants={menuVariants}>
            <div className="absolute top-0 left-0 right-0 p-6 md:px-12 flex justify-between items-center border-b border-white/10 bg-[#121212]">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Navigation</span>
              <button onClick={onClose} className="group flex items-center gap-2 text-white hover:text-red-500 transition-colors"><span className="text-xs font-bold uppercase tracking-[0.2em] group-hover:mr-1 transition-all">Close</span><X className="w-8 h-8" /></button>
            </div>
            <div className="flex-1 container mx-auto px-6 md:px-12 flex flex-col md:flex-row h-full pt-24 pb-12 overflow-y-auto">
              <div className="flex-1 flex flex-col justify-center"><ul className="space-y-6">{navLinks.map((item, idx) => (<motion.li key={item.label} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx, duration: 0.5 }} className="overflow-hidden"><button onClick={() => { item.action(); onClose(); }} className="block text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 hover:to-white hover:pl-4 transition-all duration-500 cursor-pointer text-left">{item.label}</button></motion.li>))}</ul></div>
              <motion.div className="md:w-1/3 flex flex-col justify-end md:justify-center space-y-12 mt-12 md:mt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-12" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
                <div><h4 className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-4">Contact</h4><p className="text-xl font-light text-gray-300 mb-2">inquiry@lornellre.com</p><p className="text-xl font-light text-gray-300">+1 (508) 555-0123</p></div>
                <div><h4 className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-4">Office</h4><p className="text-lg text-gray-400">22 Cherry Street<br/>Spencer, MA 01562</p></div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

export const Navigation = ({ onNavigate }: { onNavigate: (view: string, sectionId?: string) => void }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onNavigate={onNavigate} />
            <motion.header className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-500 ease-in-out border-b ${isScrolled ? 'bg-black/95 backdrop-blur-md border-white/10 py-3 shadow-2xl' : 'bg-transparent border-transparent py-6'}`}>
                <div className="container mx-auto max-w-full px-4 md:px-12">
                <div className="flex justify-between items-center">
                    <div className="flex-1 flex items-center">
                        <button onClick={() => setIsMenuOpen(true)} className="text-white hover:text-red-500 transition-colors group flex items-center gap-3 outline-none">
                            <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
                                <Menu className="w-6 h-6 absolute transition-all duration-300 group-hover:opacity-0 group-hover:rotate-90" />
                                <ArrowRight className="w-6 h-6 absolute opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                            </div>
                            <span className="hidden md:block text-xs uppercase tracking-[0.2em] font-bold">Menu</span>
                        </button>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <button onClick={() => onNavigate('home')}>
                            <AnimatedLogo isScrolled={isScrolled} />
                        </button>
                    </div>
                    <div className="flex-1 text-right flex justify-end gap-6">
                        <button className="text-white hover:text-red-500 transition-colors flex items-center gap-2" onClick={() => onNavigate('properties')}>
                            <span className="hidden md:inline text-xs uppercase tracking-widest font-bold">Search</span>
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                </div>
            </motion.header>
        </>
    )
}