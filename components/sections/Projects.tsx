'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FeaturedProject from '@/components/ui/FeaturedProject';
import ProjectCard from '@/components/ui/ProjectCard';
import { Project } from '@/types';

// Sample data - In production, this would come from MongoDB
const featuredProjects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, cart functionality, user authentication, and payment processing. This project was built with performance and scalability in mind.',
    featured: true,
    imageSrc: '/images/project-1.jpg',
    technologies: [
      { name: 'React' },
      { name: 'Node.js' },
      { name: 'MongoDB' },
      { name: 'Express' },
      { name: 'Redux' },
      { name: 'Stripe API' }
    ],
    githubLink: '#',
    liveLink: '#'
  },
  {
    title: 'Content Management System',
    description: 'A custom CMS built for content creators that allows for easy management of articles, media, and user roles. Features a rich text editor, image uploads, and analytics dashboard.',
    featured: true,
    imageSrc: '/images/project-2.jpg',
    technologies: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Node.js' },
      { name: 'MySQL' },
      { name: 'AWS S3' }
    ],
    githubLink: '#',
    liveLink: '#'
  }
];

const otherProjects: Project[] = [
  {
    title: 'Weather Dashboard',
    description: 'A real-time weather application that provides current weather data and forecasts for any location. Features include saved locations, interactive maps, and severe weather alerts.',
    featured: false,
    imageSrc: '',
    technologies: [
      { name: 'JavaScript' },
      { name: 'OpenWeather API' },
      { name: 'HTML/CSS' }
    ],
    githubLink: '#',
    liveLink: '#'
  },
  {
    title: 'Task Management App',
    description: 'A comprehensive task management application with features like task categories, priority levels, due dates, and team collaboration capabilities.',
    featured: false,
    imageSrc: '',
    technologies: [
      { name: 'React' },
      { name: 'Firebase' },
      { name: 'Material UI' }
    ],
    githubLink: '#',
    liveLink: '#'
  },
  {
    title: 'Blog Platform',
    description: 'A full-featured blogging platform with user authentication, comment system, and a rich text editor. Includes features for content categorization and social sharing.',
    featured: false,
    imageSrc: '',
    technologies: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'MongoDB' },
      { name: 'JWT' }
    ],
    githubLink: '#',
    liveLink: '#'
  }
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section id="work" className="min-h-screen px-6 md:px-16 py-20" ref={ref}>
      <motion.h3 
        className="section-title"
        variants={titleVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        My Projects
      </motion.h3>
      
      {/* Featured Projects */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="space-y-32 mb-32"
      >
        {featuredProjects.map((project, index) => (
          <FeaturedProject 
            key={project.title}
            project={project}
            isEven={index % 2 === 1}
          />
        ))}
      </motion.div>
      
      {/* Other Projects */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-2xl font-semibold mb-10">Other Noteworthy Projects</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <ProjectCard 
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}