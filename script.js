/* =====================================================================
   Abdalhay Salem (Hadi) — Premium Interactivity & Logic
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ──────────────────────────────────────────
    // 1. Custom Cursor Follower
    // ──────────────────────────────────────────
    const cursor = document.getElementById('custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        // Smooth cursor follow
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    // ──────────────────────────────────────────
    // 1b. Magnetic Interaction
    // ──────────────────────────────────────────
    const magneticItems = document.querySelectorAll('.magnetic-wrap');
    
    magneticItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move item towards cursor (0.3 sensitivity)
            item.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translate(0, 0)';
        });
    });

    // ──────────────────────────────────────────
    // 2. Navbar & Scroll Active Links
    // ──────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Navbar glass effect toggle
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    }, { passive: true });

    // ──────────────────────────────────────────
    // 3. Mobile Menu Toggle
    // ──────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // You might want to add .active to .nav-links in CSS if not present
        // Handle actual hamburger animation if needed
    });

    // ──────────────────────────────────────────
    // 4. Scroll Reveal (Intersection Observer)
    // ──────────────────────────────────────────
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Sequential reveal for words in hero
                if (entry.target.id === 'hero-title') {
                    const words = entry.target.querySelectorAll('.word');
                    words.forEach((word, index) => {
                        word.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
                
                // If it's the stats section, animate them
                if (entry.target.classList.contains('stats-strip')) {
                    animateStats();
                }
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
    
    // Specifically observe hero title for word reveal
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) revealObserver.observe(heroTitle);

    // Also observe the stats strip specifically if it's not a .scroll-reveal
    const statsStrip = document.querySelector('.stats-strip');
    if (statsStrip) revealObserver.observe(statsStrip);

    // ──────────────────────────────────────────
    // 5. Stats Counter Animation
    // ──────────────────────────────────────────
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        
        const counters = document.querySelectorAll('.stat-item h2');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const stepTime = 20; // 20ms steps
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;
            
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target + (target === 100 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.floor(current) + (target === 100 ? '%' : '+');
                }
            }, stepTime);
        });

        statsAnimated = true;
    }

    // ──────────────────────────────────────────
    // 6. Project Card Parallax (Subtle)
    // ──────────────────────────────────────────
    const projectCards = document.querySelectorAll('.project-card');
    
    document.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        projectCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            // Only animate if in viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const dx = (x - centerX) * 0.01;
                const dy = (y - centerY) * 0.01;
                // Just a subtle tilt
                card.style.transform = `perspective(1000px) rotateY(${dx}deg) rotateX(${-dy}deg)`;
            }
        });
    });

});


// تشغيل EmailJS
(function(){
    emailjs.init("DVJmjUhGkWU7Gphzn"); // ← حط المفتاح هنا
})();

// إرسال الفورم
document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_lj4bves", "template_ab1oaei", this)
    .then(function() {
        alert("✅ Message sent successfully! I will contact you soon.");
    }, function(error) {
        alert("❌ Failed to send message. Try again.");
        console.log(error);
    });
});
