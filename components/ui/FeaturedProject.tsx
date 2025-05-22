'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { useState, useEffect } from 'react';

interface FeaturedProjectProps {
  project: Project;
  isEven: boolean;
}

export default function FeaturedProject({ project, isEven }: FeaturedProjectProps) {
  // State to track which image to show
  const [currentImage, setCurrentImage] = useState(0);
  
  // Effect to cycle through images every 10 seconds
  useEffect(() => {
    // Only set up the interval if there's a second image
    if (project.imageSrc2) {
      const interval = setInterval(() => {
        setCurrentImage(current => (current === 0 ? 1 : 0));
      }, 10000);
      
      // Clean up interval on component unmount
      return () => clearInterval(interval);
    }
  }, [project.imageSrc2]);
  
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
          <div className="relative h-80 bg-accent-purple rounded overflow-hidden">
            {project.imageSrc ? (
              <>
                <img 
                  src={currentImage === 0 ? project.imageSrc : project.imageSrc2 || project.imageSrc} 
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: 1 }}
                />
                
                {/* Image indicator dots - only show if there's a second image */}
                {project.imageSrc2 && (
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
                    <button 
                      className={`w-2 h-2 rounded-full ${currentImage === 0 ? 'bg-white' : 'bg-gray-400'}`}
                      onClick={() => setCurrentImage(0)}
                      aria-label="View first image"
                    />
                    <button 
                      className={`w-2 h-2 rounded-full ${currentImage === 1 ? 'bg-white' : 'bg-gray-400'}`}
                      onClick={() => setCurrentImage(1)}
                      aria-label="View second image"
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-white text-xl">Project Screenshot</span>
              </div>
            )}
            
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
            {project.details && (
              <div className="mt-4 text-text-dim">
                <p><strong>Problem:</strong> {project.details.problem}</p>
                <p className="mt-2"><strong>Solution:</strong> {project.details.solution}</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 mb-5 text-sm text-text-dim">
            {project.technologies.map((tech) => (
              <span 
                key={tech.name}
                className="px-2 py-1 rounded relative group"
              >
                <span className="relative z-10">{tech.name}</span>
                <span className="absolute inset-0 bg-transparent rounded 
                  transition-all duration-300
                  group-hover:bg-accent-purple group-hover:bg-opacity-10 group-hover:shadow-[0_0_8px_1px_rgba(110,60,231,0.3)]"></span>
              </span>
            ))}
          </div>
          
          <div className="flex gap-4 text-text-light">
            {project.githubLink && (
              <Link 
                href={project.githubLink} 
                className="text-2xl hover:text-accent-purple hover:-translate-y-1 transition-all duration-300"
                aria-label="GitHub Repository"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </Link>
            )}
            {project.liveLink && (
              <Link 
                href={project.liveLink} 
                className="text-2xl hover:text-accent-purple hover:-translate-y-1 transition-all duration-300"
                aria-label="Live Site"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-external-link-alt"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}