import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import Project from '@/lib/models/Project';
import { Project as ProjectType } from '@/types';

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    
    // Get raw projects from database and create plain objects with proper boolean values
    const dbProjects = await Project.find({});
    
    // Map to plain objects with proper boolean handling
    const projects: ProjectType[] = dbProjects.map(project => {
      const plainProject = JSON.parse(JSON.stringify(project));
      plainProject.featured = Boolean(plainProject.featured);
      return plainProject;
    });
    
    // Sort manually with booleans properly handled
    projects.sort((a, b) => {
      // First sort by featured (true first)
      if (a.featured === true && b.featured !== true) return -1;
      if (a.featured !== true && b.featured === true) return 1;
      
      // Then by createdAt date if available
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      
      return 0;
    });
    
    console.log('Projects from DB (sorted):', JSON.stringify(projects, null, 2));
    
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}