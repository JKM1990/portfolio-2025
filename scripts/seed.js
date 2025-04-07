// CommonJS script to seed database
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// Sample project data
const projectsData = [
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
    liveLink: '#',
    details: {
      problem: 'The client needed a scalable e-commerce solution that could handle thousands of products with custom attributes and support multiple payment gateways.',
      solution: 'Built a custom e-commerce platform with a React frontend and Node.js backend, using MongoDB for flexible product schema and Redis for caching.',
      challenges: [
        'Implementing a robust cart system that persists across sessions',
        'Building a flexible product attribute system',
        'Optimizing database queries for large product catalogs'
      ]
    }
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
    liveLink: '#',
    details: {
      problem: 'Content creators needed a simple yet powerful way to manage their digital content without relying on complex platforms like WordPress.',
      solution: 'Designed a custom CMS with intuitive UX and powerful features tailored specifically to their workflow.',
      challenges: [
        'Creating a rich text editor with custom extensions',
        'Building a secure role-based access control system',
        'Implementing efficient image processing and storage'
      ]
    }
  },
  {
    title: 'Weather Dashboard',
    description: 'A real-time weather application that provides current weather data and forecasts for any location. Features include saved locations, interactive maps, and severe weather alerts.',
    featured: false,
    imageSrc: '/images/project-3.jpg',
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
    imageSrc: '/images/project-4.jpg',
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
    imageSrc: '/images/project-5.jpg',
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

// Sample skill data
const skillsData = [
  { name: 'JavaScript (ES6+)', icon: 'fa-js' },
  { name: 'React', icon: 'fa-react' },
  { name: 'Node.js', icon: 'fa-node-js' },
  { name: 'TypeScript', icon: 'fa-code' },
  { name: 'Express', icon: 'fa-server' },
  { name: 'MongoDB', icon: 'fa-database' },
  { name: 'HTML & (S)CSS', icon: 'fa-html5' },
  { name: 'PHP', icon: 'fa-php' },
  { name: 'Git/GitHub', icon: 'fa-git-alt' }
];

// Define schemas
const TechnologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a technology name'],
    trim: true,
  },
});

const ProjectDetailsSchema = new mongoose.Schema({
  problem: {
    type: String,
    trim: true,
  },
  solution: {
    type: String,
    trim: true,
  },
  challenges: {
    type: [String],
    default: [],
  },
});

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description'],
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
    required: true,
  },
  imageSrc: {
    type: String,
    trim: true,
  },
  technologies: {
    type: [TechnologySchema],
    default: [],
  },
  githubLink: {
    type: String,
    trim: true,
  },
  liveLink: {
    type: String,
    trim: true,
  },
  details: {
    type: ProjectDetailsSchema,
    default: {},
  },
}, {
  timestamps: true,
});

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a skill name'],
    trim: true,
  },
  icon: {
    type: String,
    required: [true, 'Please provide an icon for the skill'],
    trim: true,
  },
}, {
  timestamps: true,
});

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Create models
    const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
    const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
    
    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    
    console.log('Cleared existing data');
    
    console.log('Projects to seed:', JSON.stringify(projectsData, null, 2));
  
  // Insert new data
    await Project.insertMany(projectsData);
    await Skill.insertMany(skillsData);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();