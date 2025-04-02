'use client';

import { motion } from 'framer-motion';
import { Skill } from '@/types';

interface SkillItemProps {
  skill: Skill;
  index: number;
}

export default function SkillItem({ skill, index }: SkillItemProps) {
  return (
    <motion.div 
      className="skill-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1] 
      }}
    >
      <i className={`fas ${skill.icon} text-accent-purple mr-2`}></i>
      <span>{skill.name}</span>
    </motion.div>
  );
}