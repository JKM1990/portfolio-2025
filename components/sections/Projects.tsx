'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import FeaturedProject from '@/components/ui/FeaturedProject';
import ProjectCard from '@/components/ui/ProjectCard';
import { Project } from '@/types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  // Increase the amount to make sure the section gets detected earlier
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  
  // State for projects
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [otherProjects, setOtherProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Fetch projects from API
  useEffect(() => {
    async function fetchProjects(): Promise<void> {
      try {
        setLoading(true);
        
        // Fetch all projects
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const result: ApiResponse<Project[]> = await response.json();
        
        console.log('API Response:', result);
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch projects');
        }
        
        // Split projects into featured and other using Boolean conversion for consistent handling
        const featured = result.data.filter((project: Project) => {
          return Boolean(project.featured) === true;
        });
        
        console.log('Featured projects:', featured);
        
        const others = result.data.filter((project: Project) => {
          return Boolean(project.featured) !== true;
        });
        
        setFeaturedProjects(featured);
        setOtherProjects(others);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects. Please try again later.');
        
        // Fallback to your actual project data if API fails
        setFeaturedProjects([
          {
            title: 'Double-Headed Drilling Machine Control System',
            description: 'Designed and implemented a complete control system for a double-headed drilling machine during a 5-week work experience at Cripps and Sons, using Arduino Mega 2560 and Nextion touch screen interface.',
            featured: true,
            imageSrc: '/images/drilling-machine.jpg',
            technologies: [
              { name: 'Arduino' },
              { name: 'C++' },
              { name: 'Nextion HMI' },
              { name: 'Electronics' },
              { name: 'Embedded Systems' }
            ],
            githubLink: undefined,
            liveLink: undefined
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
        ]);
        
        setOtherProjects([
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
        ]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, []);
  
  // Title animations are now defined inline in the JSX
  
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

  if (loading) {
    return (
      <section id="work" className="px-6 md:px-16 py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-10 h-10 border-4 border-accent-purple border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-text-dim">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="work" 
      className="px-6 md:px-16 py-20" 
      ref={ref}
      style={{ minHeight: "120vh" }} // Force this section to be at least 20% taller than viewport
    >
      <motion.h3 
        className="section-title"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h3>
      
      {error && (
        <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-300 p-4 rounded mb-8">
          <p>{error}</p>
        </div>
      )}
      
      {/* Featured Projects Heading */}
      <motion.h3 
        className="text-2xl font-semibold mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Featured Projects
      </motion.h3>
      
      {/* Featured Projects */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-32 mb-32"
        id="featured-projects"
      >
        {featuredProjects.map((project, index) => (
          <FeaturedProject 
            key={project._id || project.title}
            project={project}
            isEven={index % 2 === 1}
          />
        ))}
      </motion.div>
      
      {/* Other Projects */}
      <div id="other-projects" className="mt-12 mb-40">
        <h3 className="text-2xl font-semibold mb-10">Other Noteworthy Projects</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
          {otherProjects.map((project, index) => (
            <ProjectCard 
              key={project._id || project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
      
      {/* Extra space marker to ensure full scrolling of projects section */}
      <div id="projects-end-marker" className="h-32"></div>
    </section>
  );
}