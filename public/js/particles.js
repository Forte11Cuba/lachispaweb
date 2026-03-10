class Particle {
    constructor(x, y, vx, vy, size, life) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = size;
        this.life = life;
        this.maxLife = life;
        this.isDead = false;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        this.life--;
        
        if (this.life <= 0) {
            this.isDead = true;
        }
    }

    getOpacity() {
        const progress = this.life / this.maxLife;
        return this.easeOutQuart(progress);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    draw(ctx) {
        if (this.isDead) return;

        const opacity = this.getOpacity();
        
        const glowOuter = `rgba(91, 115, 255, ${opacity * 0.4})`;
        const glowInner = `rgba(75, 99, 247, ${opacity * 0.8})`;
        const particleCenter = `rgba(91, 115, 255, ${opacity * 0.9})`;

        ctx.save();

        ctx.beginPath();
        ctx.shadowColor = glowOuter;
        ctx.shadowBlur = 2.0;
        ctx.fillStyle = glowOuter;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.shadowColor = glowInner;
        ctx.shadowBlur = 2.0;
        ctx.fillStyle = glowInner;
        ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.fillStyle = particleCenter;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

class SparkSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.isRunning = false;
        this.sparkIntervalId = null;
        
        this.resizeCanvas();
        this.setupEventListeners();
        this.setupSparkTimer();
        this.startAnimation();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }

    setupSparkTimer() {
        this.sparkIntervalId = setInterval(() => {
            if (!document.hidden && this.isRunning) {
                this.createRandomSpark();
            }
        }, 3000);
    }

    stopSparkTimer() {
        if (this.sparkIntervalId) {
            clearInterval(this.sparkIntervalId);
            this.sparkIntervalId = null;
        }
    }

    restartSparkTimer() {
        this.stopSparkTimer();
        this.setupSparkTimer();
    }

    createRandomSpark() {
        const sparkCount = Math.floor(Math.random() * 3) + 2;
        
        for (let i = 0; i < sparkCount; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            
            const particleCount = Math.floor(Math.random() * 21) + 10;
            
            this.createSparkAt(x, y, particleCount);
        }
    }

    createSparkAt(x, y, particleCount) {
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            
            const velocity = Math.random() * 4 + 2;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            const size = Math.random() * 3 + 1;
            
            const life = 100;
            
            const particle = new Particle(x, y, vx, vy, size, life);
            this.particles.push(particle);
        }
    }

    update() {
        for (let particle of this.particles) {
            particle.update();
        }
        
        this.particles = this.particles.filter(particle => !particle.isDead);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let particle of this.particles) {
            particle.draw(this.ctx);
        }
    }

    animate() {
        if (!this.isRunning) return;
        
        this.update();
        this.draw();
        
        requestAnimationFrame(() => this.animate());
    }

    start() {
        this.isRunning = true;
        this.animate();
    }

    stop() {
        this.isRunning = false;
    }

    pause() {
        this.isRunning = false;
        this.stopSparkTimer();
    }

    resume() {
        this.isRunning = true;
        this.restartSparkTimer();
        this.animate();
    }

    startAnimation() {
        this.start();
    }
}

let sparkSystem = null;

function initParticles() {
    const canvas = document.getElementById('sparks-canvas');
    if (canvas) {
        sparkSystem = new SparkSystem(canvas);
    }
}

document.addEventListener('visibilitychange', function() {
    if (sparkSystem) {
        if (document.hidden) {
            sparkSystem.pause();
        } else {
            sparkSystem.resume();
        }
    }
});

window.SparkSystem = SparkSystem;
window.initParticles = initParticles;