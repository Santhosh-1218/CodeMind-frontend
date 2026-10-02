'use client';

import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for interactive particle response
    const mouse = { x: width / 2, y: height / 2, radius: 150 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle nodes for official tech constellation animation
    const particleCount = Math.floor(Math.min(width, 1400) / 18);
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      pulseSpeed: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.4 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    // Grid beam scanning line
    let scanLineY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint cyber grid lines in monochrome
      const gridSize = 60;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw moving horizontal scan beam
      scanLineY = (scanLineY + 0.6) % height;
      const scanGradient = ctx.createLinearGradient(0, scanLineY - 40, 0, scanLineY + 40);
      scanGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      scanGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.04)');
      scanGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanLineY - 40, width, 80);

      // Update and draw particles & connection links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce at edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Distance to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby particles with subtle white lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const pdx = p.x - p2.x;
          const pdy = p.y - p2.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

          if (pdist < 110) {
            const lineAlpha = (1 - pdist / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Canvas for Interactive Constellation & Cyber Grid */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* Ambient Floating Monochrome Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-white/[0.025] rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
};
