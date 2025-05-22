'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 py-20"
    >
      <motion.p 
        className="text-accent-purple text-lg mb-5"
        custom={0}
        initial="hidden" 
        animate="visible"
        variants={fadeInUp}
      >
        Hi, my name is
      </motion.p>
      
      <motion.h1 
        className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight"
        custom={1}
        initial="hidden" 
        animate="visible"
        variants={fadeInUp}
      >
        Jeff Manser.
      </motion.h1>
      
      <motion.h2 
        className="text-2xl md:text-4xl font-semibold text-accent-purple mb-6"
        custom={2}
        initial="hidden" 
        animate="visible"
        variants={fadeInUp}
      >
        I like to build things for others.
      </motion.h2>
      
      <motion.p 
        className="text-text-dim max-w-xl text-lg mb-8 leading-relaxed"
        custom={3}
        initial="hidden" 
        animate="visible"
        variants={fadeInUp}
      >
        I&apos;m a web developer who recently graduated from the NSCC Web 
        Programming program. I specialize in building (and occasionally 
        designing) exceptional digital experiences. Currently, I&apos;m focused on 
        starting my own business where I blend embedded systems and web technology together.
      </motion.p>
      
      <motion.div 
        className="flex flex-wrap gap-5"
        custom={4}
        initial="hidden" 
        animate="visible"
        variants={fadeInUp}
      >
        <Link href="#work" className="btn">
          View My Work
        </Link>
        <Link href="#contact" className="btn">
          Get In Touch
        </Link>
      </motion.div>
    </section>
  );
}