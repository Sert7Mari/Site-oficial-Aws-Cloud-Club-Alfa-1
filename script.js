// Gerar estrelas no céu
function createStars() {
    const starrySky = document.querySelector('.starry-sky');
    if (!starrySky) return;
    
    const starCount = 200; // Número de estrelas
    const sizes = ['small', 'medium', 'large'];
    const colors = ['', 'purple', 'pink']; // Vazio = branco
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Tamanho aleatório
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        star.classList.add(size);
        
        // Cor aleatória (70% branco, 20% roxo, 10% rosa)
        const rand = Math.random();
        if (rand > 0.7 && rand <= 0.9) {
            star.classList.add('purple');
        } else if (rand > 0.9) {
            star.classList.add('pink');
        }
        
        // Posição aleatória
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Delay de animação aleatório para efeito de piscar
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        starrySky.appendChild(star);
    }
}

// Criar estrelas quando a página carregar
createStars();

// Cursor personalizado
const cursor = document.querySelector('.cursor');
// const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let mouseTrail = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    
    // Criar nuvens no rastro do mouse
    createMouseCloud(e.clientX, e.clientY);
    
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

// Criar pequenas nuvens no rastro do mouse
let lastCloudTime = 0;
function createMouseCloud(x, y) {
    const now = Date.now();
    // Criar nuvem a cada 50ms para efeito mais fluido
    if (now - lastCloudTime < 50) return;
    lastCloudTime = now;
    
    // Criar 1-2 nuvens pequenas
    const cloudCount = Math.random() > 0.6 ? 2 : 1;
    
    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'mouse-cloud';
        
        // Posição aleatória próxima ao cursor
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;
        
        cloud.style.left = (x + offsetX) + 'px';
        cloud.style.top = (y + offsetY) + 'px';
        
        // Tamanho aleatório
        const size = 25 + Math.random() * 35;
        cloud.style.width = size + 'px';
        cloud.style.height = size * 0.35 + 'px';
        
        // Opacidade e cor aleatórias
        const opacity = 0.4 + Math.random() * 0.4;
        const colorType = Math.random();
        if (colorType > 0.65) {
            cloud.style.background = `rgba(236, 72, 153, ${opacity})`;
        } else {
            cloud.style.background = `rgba(139, 92, 246, ${opacity})`;
        }
        
        // Velocidade de animação aleatória
        const duration = 1.2 + Math.random() * 0.8;
        cloud.style.animationDuration = duration + 's';
        
        // Direção aleatória de movimento
        const moveX = (Math.random() - 0.5) * 40;
        const moveY = -20 - Math.random() * 30;
        cloud.style.setProperty('--move-x', moveX + 'px');
        cloud.style.setProperty('--move-y', moveY + 'px');
        
        // Adicionar ao body
        document.body.appendChild(cloud);
        
        // Remover após animação
        setTimeout(() => {
            if (cloud.parentNode) {
                cloud.parentNode.removeChild(cloud);
            }
        }, duration * 1000);
    }
}

// Animação suave do cursor follower
function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    // cursorFollower.style.left = followerX + 'px';
    // cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Efeito hover no cursor
const hoverElements = document.querySelectorAll('a, button, .event-card, .team-member, .photo-item, .faq-question, .collaborator-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 150;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Atualizar link ativo
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Atualizar link ativo ao rolar
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Filtro de fotos
const filterButtons = document.querySelectorAll('.filter-btn');
const photoItems = document.querySelectorAll('.photo-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adicionar active ao botão clicado
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        photoItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fechar todos os outros itens
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle do item atual
        item.classList.toggle('active', !isActive);
    });
});

// Animação de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
const animatedElements = document.querySelectorAll('.event-card, .team-member, .photo-item, .collaborator-card, .faq-item, .stat-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Efeito parallax suave nas nuvens do hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.cloud');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        // Usar transform apenas para parallax, mantendo animação CSS
        const parallaxY = scrolled * speed;
        element.style.transform = `translateY(${parallaxY}px)`;
    });
});

// Adicionar animação CSS para fadeIn
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);
// Gerar Carrossel da equipe
const teamCarousel = document.querySelector('.team-carousel');
const btnPrev = document.querySelector('.nav-btn.prev');
const btnNext = document.querySelector('.nav-btn.next');

if (teamCarousel && btnPrev && btnNext) {
    const scrollAmount = 320;

    btnNext.addEventListener('click', () => {
        teamCarousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    btnPrev.addEventListener('click', () => {
        teamCarousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    teamCarousel.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            teamCarousel.scrollLeft += e.deltaY;
        }
    }, { passive: false });
}
