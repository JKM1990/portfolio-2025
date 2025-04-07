import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import Skill from '@/lib/models/Skill';
import { Skill as SkillType } from '@/types';

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    
    const skills: SkillType[] = await Skill.find({});
    
    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}