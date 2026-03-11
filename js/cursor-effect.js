const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const particles = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

class Particle {
    constructor(x, y, isFloating = false) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 20 + 12;
        this.baseSpeedX = (Math.random() - 0.5) * 0.3;
        this.baseSpeedY = (Math.random() - 0.5) * 0.3;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
        this.letter = letters[Math.floor(Math.random() * letters.length)];
        this.opacity = isFloating ? Math.random() * 0.3 + 0.2 : 1;
        this.isFloating = isFloating;
        this.life = isFloating ? Infinity : 80;
        this.maxLife = 80;
        
        // Colores aleatorios
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        if (this.isFloating) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 350;
            
            // Atracción al cursor
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                this.speedX = this.baseSpeedX + (dx / distance) * force * 2;
                this.speedY = this.baseSpeedY + (dy / distance) * force * 2;
            } else {
                this.speedX += (this.baseSpeedX - this.speedX) * 0.1;
                this.speedY += (this.baseSpeedY - this.speedY) * 0.1;
            }
            
            // Repulsión entre partículas
            for (let other of particles) {
                if (other === this) continue;
                
                const dx2 = other.x - this.x;
                const dy2 = other.y - this.y;
                const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                const minDist = 70;
                
                if (dist < minDist && dist > 0) {
                    const force = (minDist - dist) / minDist;
                    this.speedX -= (dx2 / dist) * force * 2.5;
                    this.speedY -= (dy2 / dist) * force * 2.5;
                }
            }
            
            // Limitar velocidad máxima para evitar vibraciones
            const maxSpeed = 5;
            const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
            if (currentSpeed > maxSpeed) {
                this.speedX = (this.speedX / currentSpeed) * maxSpeed;
                this.speedY = (this.speedY / currentSpeed) * maxSpeed;
            }
            
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
            
            return true;
        } else {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 1;
            this.opacity = this.life / this.maxLife;
            
            return this.life > 0;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.font = `bold ${this.size}px Arial`;
        ctx.fillStyle = this.color;
        ctx.fillText(this.letter, this.x, this.y);
        ctx.restore();
    }
}

// Crear partículas iniciales después de definir la clase
for (let i = 0; i < 200; i++) {
    particles.push(new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        true
    ));
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        if (!particles[i].update()) {
            particles.splice(i, 1);
        } else {
            particles[i].draw();
        }
    }
    
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
