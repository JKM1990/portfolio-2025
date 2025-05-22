import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { Project as ProjectType } from '@/types';

// Define the types we need based on the Prisma schema
type Technology = {
  id: string;
  name: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
};

type ProjectDetails = {
  id: string;
  problem: string | null;
  solution: string | null;
  challenges: string[];
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
};

type Project = {
  id: string;
  title: string;
  description: string;
  featured: boolean;
  imageSrc: string | null;
  githubLink: string | null;
  liveLink: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type ProjectWithRelations = Project & {
  technologies: Technology[];
  details: ProjectDetails | null;
};

export async function GET(): Promise<NextResponse> {
  try {
    const dbProjects = await prisma.project.findMany({
      include: {
        technologies: true,
        details: true,
      },
    });
    
    // Transform projects to match expected format
    const projects: ProjectType[] = dbProjects.map((project: ProjectWithRelations) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      featured: project.featured,
      imageSrc: project.imageSrc || '',
      technologies: project.technologies.map(tech => ({
        id: tech.id,
        name: tech.name
      })),
      githubLink: project.githubLink || undefined,
      liveLink: project.liveLink || undefined,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      details: project.details ? {
        id: project.details.id,
        problem: project.details.problem || undefined,
        solution: project.details.solution || undefined,
        challenges: project.details.challenges || []
      } : undefined
    }));
    
    // Sort projects: featured first, then by createdAt date
    projects.sort((a, b) => {
      // First sort by featured (true first)
      if (a.featured === true && b.featured !== true) return -1;
      if (a.featured !== true && b.featured === true) return 1;
      
      // Then by createdAt date
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      
      return 0;
    });
    
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}