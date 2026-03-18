/* ============================================================
   ISSA SARR — PORTFOLIO JAVASCRIPT
   ============================================================ */

/* ---- EmailJS Init ---- */
emailjs.init({
    publicKey: 'QZNTJ3vE-rrNlA5gN',
    blockHeadless: true,
    limitRate: { throttle: 10000 }
});

/* ============================================================
   LOADER
   ============================================================ */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 900);
});

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
(function initCursor() {
    if (window.innerWidth <= 768) return;

    const cursor   = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let fx = 0, fy = 0;
    let mx = 0, my = 0;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top  = my + 'px';
    });

    (function animateFollower() {
        fx += (mx - fx) * 0.1;
        fy += (my - fy) * 0.1;
        follower.style.left = fx + 'px';
        follower.style.top  = fy + 'px';
        requestAnimationFrame(animateFollower);
    })();

    const hoverTargets = 'a, button, .skill-tag, .filter-btn, .project-card, .stat, .tag';
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
            follower.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            follower.classList.remove('hovered');
        });
    });
})();

/* ============================================================
   HEADER — SCROLL & ACTIVE NAV
   ============================================================ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
    toggleBackToTop();
}, { passive: true });

function updateActiveNav() {
    const scrollY = window.scrollY + 130;
    document.querySelectorAll('section[id]').forEach(section => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        const link   = document.querySelector(`.nav-link[href="#${id}"]`);
        if (!link) return;
        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

/* ============================================================
   BURGER MENU
   ============================================================ */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

/* ============================================================
   TYPED TEXT ANIMATION
   ============================================================ */
(function initTyped() {
    const words  = ['Full Stack', 'Backend', 'Frontend', 'Mobile'];
    const el     = document.getElementById('typed');
    if (!el) return;

    let wi = 0, ci = 0, deleting = false;

    function type() {
        const word = words[wi];
        el.textContent = deleting
            ? word.substring(0, ci - 1)
            : word.substring(0, ci + 1);

        deleting ? ci-- : ci++;

        if (!deleting && ci === word.length) {
            setTimeout(() => { deleting = true; }, 1800);
        } else if (deleting && ci === 0) {
            deleting = false;
            wi = (wi + 1) % words.length;
        }

        setTimeout(type, deleting ? 60 : 115);
    }

    setTimeout(type, 1200);
})();

/* ============================================================
   SCROLL REVEAL — INTERSECTION OBSERVER
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

function observeReveal() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });
}
observeReveal();

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.stat-number').forEach(el => {
            const target   = parseInt(el.dataset.target, 10);
            const duration = 1600;
            const step     = target / (duration / 16);
            let current    = 0;
            const timer    = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(timer); }
                el.textContent = Math.floor(current);
            }, 16);
        });
        statsObserver.unobserve(entry.target);
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObserver.observe(statsSection);

/* ============================================================
   PROJECTS DATA & RENDER
   ============================================================ */
const projects = [
    {
        id: 1,
        title: 'PayCOUD',
        categories: ['web'],
        desc: 'Logiciel de paie du personnel du COUD. Gestion complète des salaires, bulletins de paie et états financiers.',
        tech: ['React', 'Node.js', 'MongoDB'],
        image: 'images/projects/logo_coud.png',
        link: 'https://paycoud.com/',
        icon: 'fas fa-money-bill-wave'
    },
    {
        id: 2,
        title: 'CampusCOUD',
        categories: ['web'],
        desc: "Système de gestion des codifications des étudiants de l'Université Cheikh Anta Diop. Plateforme académique complète avec suivi des inscriptions.",
        tech: ['Angular', 'Spring Boot', 'MySQL'],
        image: 'images/projects/logo_coud.png',
        link: 'https://campuscoud.com/',
        icon: 'fas fa-university'
    },
    {
        id: 3,
        title: 'Bideew Technologies',
        categories: ['web'],
        desc: 'Site web officiel de Bideew Technologies. Interface moderne, responsive et optimisée pour le référencement naturel.',
        tech: ['React'],
        image: 'images/projects/logo-removebg-preview.png',
        link: 'https://bideewtech.com/',
        icon: 'fas fa-globe'
    },
    {
        id: 4,
        title: 'HMT Global Trading',
        categories: ['web'],
        desc: 'Boutique e-commerce professionnelle avec catalogue produits, gestion des commandes et système de paiement sécurisé.',
        tech: ['PHP', 'MySQL', 'HTML5', 'CSS3'],
        image: 'images/projects/hmt.png',
        link: 'https://hmtglobaltrading.com/',
        icon: 'fas fa-shopping-cart'
    },
    {
        id: 5,
        title: 'Commune de Touba Toul',
        categories: ['web'],
        desc: "Site officiel de la Commune de Touba Toul. Portail d'information citoyenne moderne et accessible.",
        tech: ['WordPress'],
        image: 'images/projects/commune touba toul.png',
        link: null,
        icon: 'fas fa-city'
    },
    {
        id: 6,
        title: 'Portail Aide Sociale',
        categories: ['web'],
        desc: "Portail en ligne pour les demandes d'aide sociale des étudiants de l'UCAD (COUD). Soumission de dossiers, suivi en temps réel et tableau de bord administrateur.",
        tech: ['PHP 8', 'Bootstrap 5', 'MySQL'],
        image: null,
        link: null,
        icon: 'fas fa-hands-helping'
    },
    {
        id: 7,
        title: 'DIRCOUD',
        categories: ['web'],
        desc: 'Application de gestion du personnel et de la hiérarchie organisationnelle du COUD. Dashboard analytique, statistiques RH et planification des départs à la retraite.',
        tech: ['PHP 8', 'Bootstrap 5', 'MySQL', 'Chart.js'],
        image: 'images/projects/logo_coud.png',
        link: null,
        icon: 'fas fa-sitemap'
    },
    {
        id: 8,
        title: 'Système de Réclamation COUD',
        categories: ['web'],
        desc: "Plateforme de gestion des réclamations et plaintes des étudiants universitaires. Workflow de traitement complet avec tableau de bord et statistiques pour l'administration.",
        tech: ['PHP 8', 'Bootstrap', 'MySQL'],
        image: 'images/projects/logo_coud.png',
        link: null,
        icon: 'fas fa-comment-dots'
    },
    {
        id: 9,
        title: 'USCOUD Sécurité',
        categories: ['web'],
        desc: "Système de gestion des procès-verbaux d'incidents sur les campus universitaires du COUD. Contrôle d'accès par rôles (admin, superviseur, agent) avec piste d'audit complète.",
        tech: ['PHP 8.2', 'Bootstrap 5', 'MySQL', 'Chart.js'],
        image: 'images/projects/logo_coud.png',
        link: null,
        icon: 'fas fa-shield-alt'
    },
    {
        id: 10,
        title: 'YEKSINA',
        categories: ['api', 'mobile'],
        desc: "Backend d'une application de livraison multi-modale (style Uber). Connecte clients et livreurs en temps réel avec paiements mobiles (Orange Money, Wave), notifications push Firebase et géolocalisation.",
        tech: ['Laravel 12', 'PHP 8.2', 'JWT', 'Firebase FCM', 'Orange Money', 'Wave'],
        image: null,
        link: null,
        icon: 'fas fa-motorcycle'
    },
    {
        id: 11,
        title: 'Gestion BTP',
        categories: ['web'],
        desc: "Application complète de gestion de chantiers BTP (Bâtiment et Travaux Publics). Gestion des clients, employés, matériaux, devis, factures, paie, pointage et suivi financier en temps réel.",
        tech: ['PHP 8', 'MySQL', 'Bootstrap 5', 'Chart.js', 'Vite'],
        image: null,
        link: null,
        icon: 'fas fa-hard-hat'
    },
    {
        id: 12,
        title: 'Gestion de Stocks',
        categories: ['web', 'api'],
        desc: "Application full-stack de gestion d'inventaire. Suivi des produits, ventes, commandes fournisseurs, alertes de stock automatiques, export Excel/PDF et tableau de bord analytique en temps réel.",
        tech: ['Laravel 12', 'PHP 8.2', 'Sanctum', 'Angular 19', 'TypeScript', 'SQLite'],
        image: null,
        link: null,
        icon: 'fas fa-boxes'
    },
    {
        id: 13,
        title: 'Gestion Médicale',
        categories: ['web', 'api'],
        desc: "Plateforme hospitalière complète de gestion des patients, consultations, admissions, rendez-vous et personnel médical. Gestion des dossiers médicaux, planification des rotations et suivi des transferts inter-services.",
        tech: ['Laravel 11', 'PHP 8.2', 'Sanctum', 'Swagger', 'MySQL'],
        image: null,
        link: null,
        icon: 'fas fa-hospital'
    }
];

function getCount(filter) {
    if (filter === 'all') return projects.length;
    return projects.filter(p => p.categories.includes(filter)).length;
}

function updateFilterCounts() {
    ['all', 'web', 'api', 'mobile'].forEach(f => {
        const el = document.getElementById('count-' + f);
        if (el) el.textContent = getCount(f);
    });
}

function renderProjects(filter = 'all') {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const list = filter === 'all' ? projects : projects.filter(p => p.categories.includes(filter));
    grid.innerHTML = '';

    list.forEach((project, i) => {
        const card = document.createElement('div');
        card.className = 'project-card glass';
        card.style.animationDelay = (i * 0.07) + 's';

        const imgHTML = project.image
            ? `<img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'project-img-placeholder\\'><i class=\\"${project.icon}\\"></i></div>'">`
            : `<div class="project-img-placeholder"><i class="${project.icon}"></i></div>`;

        const overlayBtn = project.link
            ? `<a href="${project.link}" target="_blank" rel="noopener" class="project-link-btn open" title="Voir le projet"><i class="fas fa-external-link-alt"></i></a>`
            : `<div class="project-link-btn closed" title="Projet interne"><i class="fas fa-lock"></i></div>`;

        const techHTML = project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');

        card.innerHTML = `
            <div class="project-img">
                ${imgHTML}
                <div class="project-overlay">${overlayBtn}</div>
            </div>
            <div class="project-body">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.desc}</p>
                <div class="project-tech">${techHTML}</div>
            </div>
        `;

        grid.appendChild(card);
    });
}

updateFilterCounts();
renderProjects();

/* Filter buttons */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

/* ============================================================
   CONTACT FORM
   ============================================================ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const btnText   = submitBtn.querySelector('.btn-text');
        const spinner   = submitBtn.querySelector('.spinner');
        const status    = document.getElementById('form-status');

        btnText.style.display = 'none';
        spinner.classList.remove('hidden');
        submitBtn.disabled = true;
        status.textContent = '';
        status.className = 'form-status';

        const formData = {
            from_name:  this.from_name.value,
            from_email: this.from_email.value,
            message:    this.message.value,
            to_email:   'sarraseydainassasarr@gmail.com'
        };

        emailjs.send('service_7y5dw19', 'template_41sfayd', formData)
            .then(() => {
                status.textContent = '✓ Message envoyé avec succès ! Je vous répondrai dès que possible.';
                status.classList.add('success');
                this.reset();
            })
            .catch(() => {
                status.textContent = "✗ Une erreur s'est produite. Réessayez ou contactez-moi directement par email.";
                status.classList.add('error');
            })
            .finally(() => {
                btnText.style.display = 'inline-flex';
                spinner.classList.add('hidden');
                submitBtn.disabled = false;
                status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
    });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
const backToTopBtn = document.getElementById('back-to-top');

function toggleBackToTop() {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   SMOOTH SCROLL — anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = this.getAttribute('href');
        if (target === '#') return;
        const el = document.querySelector(target);
        if (!el) return;
        e.preventDefault();
        const offset = el.offsetTop - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    });
});

/* ============================================================
   MOBILE MENU — close on outside click
   ============================================================ */
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

/* ============================================================
   INIT
   ============================================================ */
updateActiveNav();
toggleBackToTop();
