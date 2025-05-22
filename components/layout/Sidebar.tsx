'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { NavLink, SocialLink } from '@/types';
import { animateScroll } from '@/utils/scroll';

// Animation variants
const sidebarVariants = {
  hidden: { x: -300 },
  visible: { 
    x: 0,
    transition: { 
      type: 'spring', 
      stiffness: 100,
      damping: 20
    }
  }
};

const navLinks: NavLink[] = [
  { path: 'hero', label: 'Home', icon: 'fa-home' },
  { path: 'about', label: 'About', icon: 'fa-user' },
  { path: 'work', label: 'Projects', icon: 'fa-code' },
  { path: 'contact', label: 'Contact', icon: 'fa-envelope' },
];

const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/JKM1990', icon: 'fa-github' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/jeff-manser/', icon: 'fa-linkedin-in' }
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scrolling and highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute('id') || '';
        }
      });
      
      if (current !== '' && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Use shared utility for smooth scrolling
      const scrollStart = window.scrollY;
      const scrollTarget = section.offsetTop;
      
      animateScroll(scrollStart, scrollTarget, () => {
        setActiveSection(sectionId);
      });
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button - now positioned on the left */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 bg-bg-medium text-text-light p-2 rounded"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {/* Sidebar */}
      <motion.div 
        className={`
          w-full lg:w-72 h-screen bg-bg-medium fixed lg:flex flex-col justify-between p-6 lg:p-10 z-40
          border-r border-opacity-15 border-accent-purple
          ${isMobileMenuOpen ? 'flex' : 'hidden lg:flex'}
        `}
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide mb-12 pb-2 border-b border-accent-purple inline-block">
            J.M. PORTFOLIO
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <motion.button 
                key={link.label}
                className={`
                  flex items-center text-base font-medium transition duration-300
                  group relative pl-6 text-left
                  ${activeSection === link.path ? 'text-text-light' : 'text-text-dim hover:text-text-light'}
                `}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToSection(link.path);
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`
                  absolute left-0 w-1 h-full transition-all duration-300
                  ${activeSection === link.path ? 'bg-accent-purple shadow-[0_0_10px_2px_rgba(110,60,231,0.6)]' : 'bg-transparent'}
                `} />
                <i className={`fas ${link.icon} text-accent-purple mr-3`}></i>
                {link.label}
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="mt-auto">
          {/* Social links */}
          <div className="flex space-x-5 mb-5">
            {socialLinks.map((link) => (
              <motion.a
                key={link.platform}
                href={link.url}
                className="text-text-dim hover:text-accent-purple transition-all duration-300"
                aria-label={link.platform}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`fab ${link.icon} text-xl`}></i>
              </motion.a>
            ))}
          </div>
          
          {/* Copyright */}
          <p className="text-text-dim text-xs">© 2025 Jeffrey K. Manser</p>
        </div>
      </motion.div>
    </>
  );
}