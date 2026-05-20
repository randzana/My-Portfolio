import { useEffect, useRef } from 'react';
import './ParticleField.css';

export default function ParticleField({ count = 60 }) {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: null, y: null, radius: 150 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let particles = [];
        
        // Dynamic density based on screen width
        const getParticleCount = () => {
            const width = window.innerWidth;
            if (width < 600) return 20;
            if (width < 900) return 40;
            return count;
        };

        const resizeCanvas = () => {
            canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
            canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
            initParticles();
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1; // 1px to 3px
                this.baseSpeedX = (Math.random() - 0.5) * 0.4;
                this.baseSpeedY = (Math.random() - 0.5) * 0.4;
                this.vx = this.baseSpeedX;
                this.vy = this.baseSpeedY;
                // Add soft random oscillation to speed
                this.angle = Math.random() * Math.PI * 2;
                this.angularVelocity = Math.random() * 0.02 - 0.01;
            }

            update() {
                const mouse = mouseRef.current;
                
                // Mouse interaction - pull/push effect
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.hypot(dx, dy);
                    
                    if (distance < mouse.radius) {
                        // Subtle attraction force
                        const force = (mouse.radius - distance) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        const ax = Math.cos(angle) * force * 0.2;
                        const ay = Math.sin(angle) * force * 0.2;
                        
                        this.vx += ax;
                        this.vy += ay;
                        
                        // Limit speed
                        const speed = Math.hypot(this.vx, this.vy);
                        if (speed > 1.2) {
                            this.vx = (this.vx / speed) * 1.2;
                            this.vy = (this.vy / speed) * 1.2;
                        }
                    } else {
                        // Return to base speed gradually
                        this.vx += (this.baseSpeedX - this.vx) * 0.05;
                        this.vy += (this.baseSpeedY - this.vy) * 0.05;
                    }
                } else {
                    this.vx += (this.baseSpeedX - this.vx) * 0.05;
                    this.vy += (this.baseSpeedY - this.vy) * 0.05;
                }

                // Add slight continuous movement noise
                this.angle += this.angularVelocity;
                this.x += this.vx + Math.cos(this.angle) * 0.05;
                this.y += this.vy + Math.sin(this.angle) * 0.05;

                // Screen wrapping/bouncing logic
                if (this.x < 0) this.x = canvas.width;
                else if (this.x > canvas.width) this.x = 0;
                
                if (this.y < 0) this.y = canvas.height;
                else if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                const isLight = document.documentElement.getAttribute('data-theme') === 'light';
                ctx.fillStyle = isLight ? 'rgba(109, 40, 217, 0.45)' : 'rgba(167, 139, 250, 0.4)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const numParticles = getParticleCount();
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        };

        const drawConnections = () => {
            const maxDistance = 110;
            const mouse = mouseRef.current;
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                
                // Connection to other particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * (isLight ? 0.08 : 0.15);
                        ctx.strokeStyle = isLight ? `rgba(109, 40, 217, ${alpha})` : `rgba(124, 58, 237, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Connection to mouse
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = p1.x - mouse.x;
                    const dy = p1.y - mouse.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < mouse.radius) {
                        const alpha = (1 - dist / mouse.radius) * (isLight ? 0.14 : 0.22);
                        // Linear gradient connection from purple to cyan
                        const grad = ctx.createLinearGradient(p1.x, p1.y, mouse.x, mouse.y);
                        if (isLight) {
                            grad.addColorStop(0, `rgba(109, 40, 217, ${alpha})`); // purple
                            grad.addColorStop(1, `rgba(8, 145, 178, ${alpha})`); // cyan
                        } else {
                            grad.addColorStop(0, `rgba(167, 139, 250, ${alpha})`); // purple
                            grad.addColorStop(1, `rgba(34, 211, 238, ${alpha})`); // cyan
                        }
                        
                        ctx.strokeStyle = grad;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            drawConnections();
            animationFrameId = requestAnimationFrame(animate);
        };

        // Event listeners
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = null;
            mouseRef.current.y = null;
        };

        window.addEventListener('resize', resizeCanvas);
        
        // Listen mouse events on parent container of canvas
        const container = canvas.parentElement || window;
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        // Run
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [count]);

    return <canvas ref={canvasRef} className="particle-canvas" />;
}
