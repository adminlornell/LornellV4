import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyAddress?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, propertyAddress }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
      name: '',
      company: '',
      email: '',
      phone: '',
      message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Submitting inquiry:", formData);
    setTimeout(() => setStep('success'), 800);
  };

  const reset = () => {
      setStep('form');
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0, y: 20 }} 
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#181818] border border-white/10 w-full max-w-lg p-8 md:p-12 relative shadow-2xl overflow-hidden"
          >
            <button onClick={reset} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
            </button>

            {step === 'form' ? (
              <>
                <h2 className="text-3xl font-serif text-white mb-2">Request Offering Memorandum</h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Please provide your details to access the full Offering Memorandum and financials for <span className="text-white font-bold">{propertyAddress || "this property"}</span>.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Full Name" className="w-full bg-black/30 border border-white/10 p-4 text-white text-sm focus:border-red-600 outline-none transition-colors placeholder:text-gray-600" />
                  </div>
                  <input required name="company" value={formData.company} onChange={handleChange} type="text" placeholder="Company / Entity" className="w-full bg-black/30 border border-white/10 p-4 text-white text-sm focus:border-red-600 outline-none transition-colors placeholder:text-gray-600" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address" className="w-full bg-black/30 border border-white/10 p-4 text-white text-sm focus:border-red-600 outline-none transition-colors placeholder:text-gray-600" />
                    <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Phone Number" className="w-full bg-black/30 border border-white/10 p-4 text-white text-sm focus:border-red-600 outline-none transition-colors placeholder:text-gray-600" />
                  </div>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Specific Inquiry or Questions (Optional)" rows={3} className="w-full bg-black/30 border border-white/10 p-4 text-white text-sm focus:border-red-600 outline-none transition-colors placeholder:text-gray-600 resize-none"></textarea>
                  
                  <button type="submit" className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-2">
                    Submit Request <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-12 flex flex-col items-center">
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/50"
                >
                  <Check className="w-10 h-10" />
                </motion.div>
                <h3 className="text-3xl font-serif text-white mb-4">Inquiry Received</h3>
                <p className="text-gray-400 mb-10 leading-relaxed max-w-xs mx-auto">Thank you for your interest. A member of the Lornell team has been notified and will contact you shortly.</p>
                <button onClick={reset} className="px-8 py-3 border border-white/20 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">Return to Property</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};