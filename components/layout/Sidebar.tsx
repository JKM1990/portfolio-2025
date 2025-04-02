'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NavLink, SocialLink } from '@/types';

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
  { path: '#hero', label: 'Home', icon: 'fa-home', isActive: true },
  { path: '#about', label: 'About', icon: 'fa-user', isActive: false },
  { path: '#work', label: 'Projects', icon: 'fa-code', isActive: false },
  { path: '#contact', label: 'Contact', icon: 'fa-envelope', isActive: false },
];

const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: '#', icon: 'fa-github' },
  { platform: 'LinkedIn', url: '#', icon: 'fa-linkedin-in' },
  { platform: 'Twitter', url: '#', icon: 'fa-twitter' },
  { platform: 'Email', url: '#', icon: 'fa-envelope' },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('#hero');
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
          current = `#${section.getAttribute('id') || ''}`;
        }
      });
      
      if (current !== '' && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="lg:hidden fixed top-4 right-4 z-50 bg-bg-medium text-text-light p-2 rounded"
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
            PORTFOLIO
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.label}
                href={link.path}
                className={`
                  flex items-center text-base font-medium transition duration-300
                  group relative pl-6
                  ${activeSection === link.path ? 'text-text-light' : 'text-text-dim hover:text-text-light'}
                `}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setActiveSection(link.path);
                }}
              >
                <div className={`
                  absolute left-0 w-1 h-full bg-accent-purple transition-all duration-300 transform origin-left
                  ${activeSection === link.path ? 'scale-100' : 'scale-0'}
                `} />
                <i className={`fas ${link.icon} text-accent-purple mr-3`}></i>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto">
          {/* Social links */}
          <div className="flex space-x-5 mb-5">
            {socialLinks.map((link) => (
              <Link 
                key={link.platform}
                href={link.url}
                className="text-text-dim hover:text-accent-purple transition-all duration-300 hover:-translate-y-1"
                aria-label={link.platform}
              >
                <i className={`fab ${link.icon} text-xl`}></i>
              </Link>
            ))}
          </div>
          
          {/* Copyright */}
          <p className="text-text-dim text-xs">© 2025 Your Name</p>
        </div>
      </motion.div>
    </>
  );
}