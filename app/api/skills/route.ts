import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { Skill as SkillType } from '@/types';

// Define Skill type based on the Prisma schema
type Skill = {
  id: string;
  name: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function GET(): Promise<NextResponse> {
  try {
    const skills = await prisma.skill.findMany();
    
    // Transform to match the expected format
    const formattedSkills: SkillType[] = skills.map((skill: Skill) => ({
      id: skill.id,
      name: skill.name,
      icon: skill.icon
    }));
    
    return NextResponse.json({ success: true, data: formattedSkills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}