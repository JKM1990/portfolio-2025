'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { animateScroll } from '@/utils/scroll';

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Refs and state for managing sections

  // Find all sections when component mounts
  useEffect(() => {
    const sectionElements = Array.from(document.querySelectorAll('section'));
    setSections(sectionElements as HTMLElement[]);
  }, []);

  // Scroll to a specific section with smooth animation
  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= sections.length || isScrolling) return;
    
    const targetSection = sections[index];
    setIsScrolling(true);
    setCurrentSectionIndex(index);

    // Use shared utility for smooth scrolling
    const scrollStart = window.scrollY;
    const scrollTarget = targetSection.offsetTop;
    
    animateScroll(scrollStart, scrollTarget, () => {
      // Reset scrolling flag after a short delay to prevent immediate triggers
      setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    });
  }, [sections, isScrolling]);

  // Simple scroll handling
  useEffect(() => {
    if (sections.length === 0) return;

    // Function to determine currently visible section
    const updateActiveSection = () => {
      if (isScrolling) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Check if we're in the projects section
      const otherProjects = document.getElementById('other-projects');
      const projectsEndMarker = document.getElementById('projects-end-marker');
      
      // Calculate which section is currently active based on scroll position
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Special handling for the projects section
        if (section.id === 'work' && otherProjects && projectsEndMarker) {
          const otherProjectsVisible = scrollY + windowHeight > otherProjects.offsetTop;
          
          // If we can see other projects, don't auto-scroll yet
          if (otherProjectsVisible && scrollY + windowHeight < projectsEndMarker.offsetTop + 100) {
            setCurrentSectionIndex(i);
            return;
          }
        }
        
        // If we're viewing this section and it's not projects with special handling
        if (scrollY >= sectionTop - windowHeight/2 && 
            scrollY < sectionTop + sectionHeight - windowHeight/2) {
          setCurrentSectionIndex(i);
          return;
        }
      }
    };
    
    // Handle wheel events for manual section navigation
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      const delta = Math.sign(e.deltaY);
      
      // Check if we're in the projects section
      const otherProjects = document.getElementById('other-projects');
      const projectsEndMarker = document.getElementById('projects-end-marker');
      
      // Only handle large scroll movements
      if (Math.abs(e.deltaY) > 30) {
        const currentSection = sections[currentSectionIndex];
        
        // Special handling for projects section
        if (currentSection && currentSection.id === 'work' && otherProjects && projectsEndMarker) {
          // If scrolling up and near the top of the projects section
          if (delta < 0 && currentSectionIndex > 0) {
            // Calculate if we're near the top of the section
            const scrollPosition = window.scrollY;
            const headerHeight = 100; // Approximate header height
            
            // If we're at the top of the projects section, scroll to previous section
            if (scrollPosition <= (currentSection.offsetTop + headerHeight)) {
              e.preventDefault();
              scrollToSection(currentSectionIndex - 1);
              return;
            }
            
            // Otherwise, allow normal scrolling within the section
            return;
          }
          
          // If scrolling down, only navigate to next section if we've seen all projects
          if (delta > 0) {
            const windowBottom = window.scrollY + window.innerHeight;
            const projectsEnd = projectsEndMarker.offsetTop;
            
            // If we can see the end marker, navigate to next section
            if (windowBottom >= projectsEnd && currentSectionIndex < sections.length - 1) {
              e.preventDefault();
              scrollToSection(currentSectionIndex + 1);
            }
            
            // Otherwise, allow normal scrolling within projects section
            return;
          }
        } 
        // Regular section navigation for other sections
        else if (currentSection) {
          const targetIndex = currentSectionIndex + delta;
          
          if (targetIndex >= 0 && targetIndex < sections.length) {
            e.preventDefault();
            scrollToSection(targetIndex);
          }
        }
      }
    };
    
    // Use scroll event to update which section is active
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    // Use wheel event to handle section navigation
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [sections, currentSectionIndex, isScrolling, scrollToSection]);

  return (
    <div 
      ref={containerRef}
      className="ml-0 lg:ml-72 flex-1 min-h-screen relative bg-bg-dark overflow-x-hidden"
    >
      {/* Decorative elements */}
      <motion.div 
        className="hidden lg:block absolute w-80 h-80 rounded-full bg-accent-purple bg-opacity-5 filter blur-3xl"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          left: "50%",
          top: "30%",
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
      
      {/* Floating shapes */}
      <div className="absolute top-[15%] right-[10%] w-72 h-72 rounded-full bg-gradient-radial from-accent-purple to-transparent opacity-5 animate-float z-0"></div>
      <div className="absolute bottom-[10%] left-[5%] w-48 h-48 border-2 border-accent-purple opacity-15 rotate-45 animate-rotate z-0"></div>
      
      {/* Scroll indicators (optional) */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSectionIndex === index 
                ? 'bg-accent-purple' 
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
            aria-label={`Scroll to section ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}