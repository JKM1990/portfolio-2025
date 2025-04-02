'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ContactForm from '@/components/ui/ContactForm';

export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-20"
      ref={ref}
    >
      <motion.h3 
        className="section-title"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.6 }}
      >
        Get In Touch
      </motion.h3>
      
      <motion.div
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {!showForm ? (
          <>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={itemVariants}
            >
              Let&apos;s Build Something Together!
            </motion.h2>
            
            <motion.p 
              className="text-text-dim text-lg mb-8"
              variants={itemVariants}
            >
              I&apos;m currently looking for new opportunities. Whether you have a question 
              or just want to say hi, I&apos;ll do my best to get back to you!
            </motion.p>
            
            <motion.button
              className="btn"
              onClick={() => setShowForm(true)}
              variants={itemVariants}
            >
              Say Hello
            </motion.button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ContactForm onBackClick={() => setShowForm(false)} />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}