import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LiveAgent } from './LiveAgent';

interface LiveAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveAgentModal: React.FC<LiveAgentModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={onClose}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            {/* Modal Container */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: 20 }} 
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-lg bg-[#121212] border border-white/10 shadow-2xl overflow-hidden rounded-sm"
            >
                <LiveAgent onClose={onClose} />
            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};