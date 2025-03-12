'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

interface Constellation {
  stars: number[];
}

const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStarfield(canvas, ctx);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Generate stars and constellations
  const generateStarfield = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    
    // Generate 150-250 stars with random sizes and positions
    const starCount = Math.floor(Math.random() * 100) + 150;
    const stars: Star[] = [];
    
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }
    
    // Generate 5-8 constellations
    const constellationCount = Math.floor(Math.random() * 4) + 5;
    const constellations: Constellation[] = [];
    
    for (let i = 0; i < constellationCount; i++) {
      const starIndices: number[] = [];
      const centerX = Math.random() * width;
      const centerY = Math.random() * height;
      const radius = Math.random() * 150 + 50;
      
      // Find stars near this constellation center
      for (let j = 0; j < stars.length; j++) {
        const star = stars[j];
        const distance = Math.sqrt(
          Math.pow(star.x - centerX, 2) + Math.pow(star.y - centerY, 2)
        );
        
        if (distance < radius && Math.random() > 0.4) {
          starIndices.push(j);
        }
      }
      
      // Only add constellation if it has at least 3 stars
      if (starIndices.length >= 3) {
        constellations.push({ stars: starIndices });
      }
    }
    
    // Draw stars
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
    });
    
    // Draw constellation lines
    constellations.forEach(constellation => {
      const { stars: starIndices } = constellation;
      
      for (let i = 0; i < starIndices.length - 1; i++) {
        const star1 = stars[starIndices[i]];
        // Connect to next star in constellation 
        const star2 = stars[starIndices[i + 1]];
        
        ctx.beginPath();
        ctx.moveTo(star1.x, star1.y);
        ctx.lineTo(star2.x, star2.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      
      // Sometimes create a closed shape
      if (starIndices.length > 3 && Math.random() > 0.5) {
        const star1 = stars[starIndices[0]];
        const star2 = stars[starIndices[starIndices.length - 1]];
        
        ctx.beginPath();
        ctx.moveTo(star1.x, star1.y);
        ctx.lineTo(star2.x, star2.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  };
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ backgroundColor: 'transparent' }}
    />
  );
};

export default ConstellationBackground; 