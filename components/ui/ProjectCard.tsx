'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div 
      className="bg-bg-medium rounded overflow-hidden flex flex-col min-h-[24rem] border border-accent-purple border-opacity-15
        hover:border-accent-purple transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_15px_3px_rgba(110,60,231,0.5)] lg:h-auto xl:h-96"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1] 
      }}
    >
      <div className="p-6 flex justify-between items-start">
        <div className="text-accent-purple text-4xl">
          <i className="far fa-folder-open"></i>
        </div>
        
        <div className="flex gap-4">
          <Link 
            href={project.githubLink || '#'} 
            className="text-text-dim hover:text-accent-purple transition-all duration-300 text-xl"
            aria-label="GitHub Repository"
          >
            <i className="fab fa-github"></i>
          </Link>
          <Link 
            href={project.liveLink || '#'} 
            className="text-text-dim hover:text-accent-purple transition-all duration-300 text-xl"
            aria-label="Live Site"
          >
            <i className="fas fa-external-link-alt"></i>
          </Link>
        </div>
      </div>
      
      <div className="px-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-text-light mb-3">
          {project.title}
        </h3>
        
        <p className="text-text-dim mb-4 flex-grow line-clamp-4 lg:line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto text-xs text-text-dim pb-6 min-h-[4.5rem]">
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
      </div>
    </motion.div>
  );
}