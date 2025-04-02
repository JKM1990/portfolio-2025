'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Skill } from '@/types';
import SkillItem from '@/components/ui/SkillItem';

// Sample data - In production, this would come from MongoDB
const skills: Skill[] = [
  { name: 'JavaScript (ES6+)', icon: 'fa-chevron-right' },
  { name: 'React', icon: 'fa-chevron-right' },
  { name: 'Node.js', icon: 'fa-chevron-right' },
  { name: 'TypeScript', icon: 'fa-chevron-right' },
  { name: 'Express', icon: 'fa-chevron-right' },
  { name: 'MongoDB', icon: 'fa-chevron-right' },
  { name: 'HTML & (S)CSS', icon: 'fa-chevron-right' },
  { name: 'PHP', icon: 'fa-chevron-right' },
  { name: 'Git/GitHub', icon: 'fa-chevron-right' }
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <section id="about" className="min-h-screen px-6 md:px-16 py-20" ref={ref}>
      <motion.h3 
        className="section-title"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <motion.div 
          className="lg:col-span-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p className="text-text-dim mb-5" variants={itemVariants}>
            Hello! My name is Your Name, and I enjoy creating things that live on the internet. 
            My interest in web development started back in 2018 when I decided to try editing 
            custom Tumblr themes — turns out hacking together a custom reblog button taught me 
            a lot about HTML & CSS!
          </motion.p>
          
          <motion.p className="text-text-dim mb-5" variants={itemVariants}>
            Fast forward to today, and I&apos;ve just completed my education at the Nova Scotia 
            Community College in their Web Programming program. My main focus these days is 
            building accessible, inclusive products and digital experiences at my various projects.
          </motion.p>
          
          <motion.p className="text-text-dim mb-8" variants={itemVariants}>
            Here are a few technologies I&apos;ve been working with recently:
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <SkillItem key={index} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-2 relative"
          variants={imageVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="relative group">
            <div className="w-full aspect-square bg-accent-purple flex items-center justify-center rounded overflow-hidden">
              <span className="text-white text-xl">Profile Image</span>
            </div>
            
            {/* Decorative border */}
            <div className="absolute -z-10 top-4 -right-4 border-2 border-accent-purple w-full h-full rounded
              transition-all duration-300 group-hover:top-3 group-hover:-right-3"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}