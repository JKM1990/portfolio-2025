'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/types';

interface FeaturedProjectProps {
  project: Project;
  isEven: boolean;
}

export default function FeaturedProject({ project, isEven }: FeaturedProjectProps) {
  // Removed debug logging for production
  
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <motion.div 
      className="relative"
      variants={variants}
    >
      <div className="grid grid-cols-12 gap-5">
        {/* Project Image - Conditionally ordered based on isEven */}
        <div className={`col-span-12 md:col-span-6 rounded overflow-hidden group ${isEven ? 'md:order-2' : 'md:order-1'}`}>
          <div className="relative h-80 bg-accent-purple rounded flex items-center justify-center">
            <span className="text-white text-xl">Project Screenshot</span>
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-accent-purple bg-opacity-50 opacity-0 
              group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        
        {/* Project Details - Conditionally ordered and aligned based on isEven */}
        <div className={`col-span-12 md:col-span-6 flex flex-col ${isEven ? 'md:order-1 md:items-end md:text-right' : 'md:order-2'}`}>
          <p className={`text-accent-purple text-sm mb-2 relative inline-block ${isEven ? 'pl-0 pr-5' : 'pl-5'}`}>
            {isEven ? (
              <>
                Featured Project
                <span className="absolute right-0 top-1/2 w-4 h-px bg-accent-purple transform -translate-y-1/2"></span>
              </>
            ) : (
              <>
                <span className="absolute left-0 top-1/2 w-4 h-px bg-accent-purple transform -translate-y-1/2"></span>
                Featured Project
              </>
            )}
          </p>
          
          <h3 className="text-2xl font-bold mb-5">
            <Link 
              href="#" 
              className="text-text-light hover:text-accent-purple transition-colors duration-300 relative inline-block"
            >
              {project.title}
            </Link>
          </h3>
          
          <div className="bg-bg-medium p-6 rounded mb-5 shadow-lg border border-accent-purple border-opacity-10
            hover:border-opacity-30 transition-all duration-300">
            <p className="text-text-dim">{project.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-5 text-sm text-text-dim">
            {project.technologies.map((tech) => (
              <span 
                key={tech.name}
                className="px-2 py-1 rounded relative group"
              >
                <span className="relative z-10">{tech.name}</span>
                <span className="absolute inset-0 bg-accent-purple bg-opacity-10 rounded 
                  transform scale-x-0 origin-left transition-transform duration-300 
                  group-hover:scale-x-100"></span>
              </span>
            ))}
          </div>
          
          <div className="flex gap-4 text-text-light">
            <Link 
              href={project.githubLink || '#'} 
              className="text-2xl hover:text-accent-purple hover:-translate-y-1 transition-all duration-300"
              aria-label="GitHub Repository"
            >
              <i className="fab fa-github"></i>
            </Link>
            <Link 
              href={project.liveLink || '#'} 
              className="text-2xl hover:text-accent-purple hover:-translate-y-1 transition-all duration-300"
              aria-label="Live Site"
            >
              <i className="fas fa-external-link-alt"></i>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}