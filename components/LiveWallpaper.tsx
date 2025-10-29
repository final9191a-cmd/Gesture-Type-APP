
import React, { useRef, useEffect } from 'react';

const LiveWallpaper: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = color;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.1) this.size -= 0.01;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        if (Math.sqrt(dx * dx + dy * dy) < 100) {
            this.x -= dx/20;
            this.y -= dy/20;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
        particles = [];
        const numberOfParticles = (canvas.width * canvas.height) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const color = i % 3 === 0 ? 'rgba(233, 213, 255, 0.8)' : 'rgba(167, 139, 250, 0.8)';
            particles.push(new Particle(x, y, color));
        }
    };
    initParticles();

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].size <= 0.1) {
                particles.splice(i, 1);
                i--;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const color = Math.random() > 0.5 ? 'rgba(233, 213, 255, 0.8)' : 'rgba(167, 139, 250, 0.8)';
                particles.push(new Particle(x, y, color));
            }
        }
        animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
       window.removeEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" style={{ backgroundImage: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)' }} />;
};

export default LiveWallpaper;
