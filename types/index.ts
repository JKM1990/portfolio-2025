export interface Skill {
    _id?: string;
    name: string;
    icon: string;
  }
  
  export interface Technology {
    name: string;
  }
  
  export interface Project {
    _id?: string;
    title: string;
    description: string;
    featured: boolean;
    imageSrc: string;
    imageSrc2?: string; // Optional second image
    technologies: Technology[];
    githubLink?: string;
    liveLink?: string;
    createdAt?: string;
    updatedAt?: string;
    details?: {
      problem?: string;
      solution?: string;
      challenges?: string[];
    };
  }
  
  export interface NavLink {
    path: string;
    label: string;
    icon: string;
  }
  
  export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
  }