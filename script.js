document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js 3D Background
    initThreeJSBackground();
    
    // Create Floating Particles
    createParticles();
    
    // Initialize Custom Cursor
    initCustomCursor();
    
    // Animate Hero Section
    animateHeroSection();
    
    // Initialize Scroll Animations
    initScrollAnimations();
    
    // Initialize Project Card Tilt Effects
    initTiltEffects();
    
    // Initialize Mobile Menu
    initMobileMenu();
    
    // Update Copyright Year
    updateCopyrightYear();
    
    // Initialize Contact Form
    initContactForm();
    
    // Initialize Skills Animation
    initSkillsAnimation();
    
    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const nav = document.querySelector('.nav');
                const menuToggle = document.querySelector('.menu-toggle');
                if (nav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 3D Background with Three.js
    function initThreeJSBackground() {
        const bgContainer = document.querySelector('.three-d-bg');
        if (!bgContainer) return;
        
        // Set up Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        bgContainer.appendChild(renderer.domElement);
        
        // Create geometry
        const geometry = new THREE.IcosahedronGeometry(1, 2);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x4d5bff,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        // Position camera
        camera.position.z = 3;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.001;
            mesh.rotation.y += 0.002;
            renderer.render(scene, camera);
        }
        
        // Handle resize
        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        animate();
    }
    
    // Create Floating Particles
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            const delay = Math.random() * 5;
            const duration = Math.random() * 15 + 10;
            const opacity = Math.random() * 0.3 + 0.1;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            
            // Random color
            const colors = ['#4d5bff', '#00f0ff', '#ff4d8d'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = randomColor;
            
            particlesContainer.appendChild(particle);
            
            // Animate particles
            gsap.to(particle, {
                y: Math.random() * 200 - 100,
                x: Math.random() * 200 - 100,
                duration: duration,
                delay: delay,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }
    
    // Custom Cursor
    function initCustomCursor() {
        const cursorOuter = document.querySelector('.cursor-outer');
        const cursorInner = document.querySelector('.cursor-inner');
        const cursorText = document.querySelector('.cursor-text');
        
        if (!cursorOuter || !cursorInner) return;
        
        document.addEventListener('mousemove', (e) => {
            cursorOuter.style.left = e.clientX + 'px';
            cursorOuter.style.top = e.clientY + 'px';
            cursorInner.style.left = e.clientX + 'px';
            cursorInner.style.top = e.clientY + 'px';
            
            gsap.to(cursorText, {
                left: e.clientX + 20,
                top: e.clientY + 20,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Hover effects
        const hoverElements = document.querySelectorAll('[data-cursor]');
        
        hoverElements.forEach(element => {
            const cursorType = element.getAttribute('data-cursor');
            
            element.addEventListener('mouseenter', () => {
                if (cursorType === 'scale') {
                    gsap.to(cursorOuter, {
                        scale: 2,
                        backgroundColor: 'rgba(77, 91, 255, 0.2)',
                        duration: 0.3
                    });
                    gsap.to(cursorInner, {
                        scale: 1.5,
                        duration: 0.3
                    });
                } else if (cursorType === 'view') {
                    cursorText.textContent = 'View';
                    gsap.to(cursorText, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3
                    });
                }
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(cursorOuter, {
                    scale: 1,
                    backgroundColor: 'transparent',
                    duration: 0.3
                });
                gsap.to(cursorInner, {
                    scale: 1,
                    duration: 0.3
                });
                gsap.to(cursorText, {
                    opacity: 0,
                    scale: 0.5,
                    duration: 0.3
                });
            });
        });
    }
    
    // Animate Hero Section
    function animateHeroSection() {
        const titleWords = document.querySelectorAll('.word');
        const subtitle = document.querySelector('.hero-subtitle');
        const heroLinks = document.querySelector('.hero-links');
        const scrollHint = document.querySelector('.hero-scroll');
        
        // Animate title words
        gsap.to(titleWords, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.5
        });
        
        // Animate subtitle
        gsap.to(subtitle, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 1.2
        });
        
        // Animate buttons
        gsap.to(heroLinks, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 1.5
        });
        
        // Animate scroll hint
        gsap.to(scrollHint, {
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 2
        });
    }
    
    // Initialize Scroll Animations
    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);
        
        // Section title animations
        const sectionTitles = document.querySelectorAll('.section-title');
        
        sectionTitles.forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
            
            // Animate underline
            ScrollTrigger.create({
                trigger: title,
                start: 'top 80%',
                onEnter: () => title.classList.add('in-view')
            });
        });
        
        // Project cards animation
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });
        
        // About section animation
        const aboutImage = document.querySelector('.about-image');
        if (aboutImage) {
            gsap.from(aboutImage, {
                scrollTrigger: {
                    trigger: aboutImage,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                x: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }
    }
    
    // Initialize Tilt Effects on Project Cards
    function initTiltEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            VanillaTilt.init(card, {
                max: 10,
                speed: 300,
                glare: true,
                'max-glare': 0.2,
                gyroscope: true
            });
        });
    }
    
    // Initialize Mobile Menu
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                nav.classList.toggle('active');
                
                if (nav.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Close menu when clicking on nav links
            const navLinks = document.querySelectorAll('.nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });
        }
    }
    
    // Update Copyright Year
    function updateCopyrightYear() {
        const yearElement = document.querySelector('.year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    // Initialize Contact Form
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = this.querySelector('#name').value;
                const email = this.querySelector('#email').value;
                const message = this.querySelector('#message').value;
                
                // Here you would typically send the form data to a server
                console.log('Form submitted:', { name, email, message });
                
                // Show success animation
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                submitBtn.style.backgroundColor = '#4BB543';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Message Sent</span><i class="fas fa-check"></i>';
                }, 500);
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                    submitBtn.style.backgroundColor = '';
                }, 2000);
            });
        }
    }
    
    // Initialize Skills Animation
    function initSkillsAnimation() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const skillPercent = item.getAttribute('data-skill');
            const skillProgress = item.querySelector('.skill-progress');
            const skillPercentElement = item.querySelector('.skill-percent');
            
            ScrollTrigger.create({
                trigger: item,
                start: 'top 80%',
                onEnter: () => {
                    // Animate skill item
                    gsap.to(item, {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                    
                    // Animate progress bar
                    gsap.to(skillProgress, {
                        width: `${skillPercent}%`,
                        duration: 1.5,
                        ease: 'power2.out',
                        onUpdate: function() {
                            const currentWidth = Math.round(this.progress() * parseInt(skillPercent));
                            skillPercentElement.textContent = `${currentWidth}%`;
                        }
                    });
                }
            });
        });
    }
});