'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Skill } from '@/types';
import SkillItem from '@/components/ui/SkillItem';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // State for skills
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Fetch skills from API
  useEffect(() => {
    async function fetchSkills(): Promise<void> {
      try {
        setLoading(true);
        const response = await fetch('/api/skills');
        
        if (!response.ok) {
          throw new Error('Failed to fetch skills');
        }
        
        const result: ApiResponse<Skill[]> = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch skills');
        }
        
        setSkills(result.data);
      } catch (err) {
        console.error('Error loading skills:', err);
        setError('Failed to load skills. Please try again later.');
        
        // Fallback to sample data if API fails
        setSkills([
          { name: 'JavaScript (ES6+)', icon: 'fa-js' },
          { name: 'React', icon: 'fa-react' },
          { name: 'Node.js', icon: 'fa-node-js' },
          { name: 'TypeScript', icon: 'fa-code' },
          { name: 'Express', icon: 'fa-server' },
          { name: 'MongoDB', icon: 'fa-database' },
          { name: 'HTML & (S)CSS', icon: 'fa-html5' },
          { name: 'PHP', icon: 'fa-php' },
          { name: 'Git/GitHub', icon: 'fa-git-alt' }
        ]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSkills();
  }, []);
  
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
            Hello! My name is Jeff, and I enjoy creating things that live on the internet. 
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
            {loading ? (
              <div className="flex justify-center py-6">
                <div className="w-8 h-8 border-4 border-accent-purple border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <SkillItem 
                    key={skill._id || index} 
                    skill={skill} 
                    index={index} 
                  />
                ))}
              </div>
            )}
            
            {error && (
              <p className="text-sm text-highlight mt-2">
                {error}
              </p>
            )}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-2 relative"
          variants={imageVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="relative group">
            <div className="w-full aspect-square bg-accent-purple rounded overflow-hidden">
              <img 
                src="/images/profile.jpg" 
                alt="Profile photo" 
                className="w-full h-full object-cover"
              />
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