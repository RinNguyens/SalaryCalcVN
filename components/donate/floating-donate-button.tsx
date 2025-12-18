'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Heart, X } from 'lucide-react';
import { DonateModal } from './donate-modal';
import { GlassCard } from '@/components/ui/glass-card';

export function FloatingDonateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => {
            setIsModalOpen(true);
            setIsPulsing(false);
          }}
          className="
            relative group
            px-5 py-3 rounded-full
            backdrop-blur-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20
            border-2 border-amber-400/30
            shadow-xl hover:shadow-2xl
            flex items-center gap-2
            text-black font-medium
            transition-all duration-300
            hover:scale-105 hover:border-amber-400/50
          "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulsing ring animation */}
          {isPulsing && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-amber-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          )}

          {/* Coffee icon with animation */}
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <Coffee className="h-5 w-5" />
          </motion.div>

          {/* Text */}
          <span className="hidden sm:inline text-black/70">Buy me a coffee</span>

          {/* Heart icon on hover */}
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            className="absolute -top-1 -right-1"
          >
            <Heart className="h-4 w-4 fill-red-400 text-red-400" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <DonateModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}