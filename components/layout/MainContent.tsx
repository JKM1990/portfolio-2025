'use client';

import { useState } from 'react';
import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set up the mouse spotlight effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Get mouse position for spotlight effect
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMouseX(clientX);
    setMouseY(clientY);
  };

  // Use framer-motion to create smooth spotlight effect
  const spotlightX = useTransform(scrollYProgress, [0, 1], [0, mouseX]);
  const spotlightY = useTransform(scrollYProgress, [0, 1], [0, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="ml-0 lg:ml-72 flex-1 min-h-screen relative bg-bg-dark overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Decorative elements */}
      <motion.div 
        className="hidden lg:block absolute w-80 h-80 rounded-full bg-accent-purple bg-opacity-5 filter blur-3xl"
        style={{
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
      
      {/* Floating shapes */}
      <div className="absolute top-[15%] right-[10%] w-72 h-72 rounded-full bg-gradient-radial from-accent-purple to-transparent opacity-5 animate-float z-0"></div>
      <div className="absolute bottom-[10%] left-[5%] w-48 h-48 border-2 border-accent-purple opacity-5 rotate-45 animate-rotate z-0"></div>
      
      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}