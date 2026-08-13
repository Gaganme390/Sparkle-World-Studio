import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1500,
          }}
        >
          <MagneticButton strength={4}>
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#17181D',
                color: '#E09145',
                border: '1px solid rgba(224, 145, 69, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(23, 24, 29, 0.15)',
                cursor: 'pointer',
                transition: 'transform 250ms var(--ease-editorial), background-color 250ms',
              }}
            >
              <ArrowUp size={20} />
            </button>
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

