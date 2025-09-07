/**
 * Éléments du DOM
 */
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const contactForm = document.getElementById('contact-form');

/**
 * Données des projets
 */
const projects = [
    {
        title: 'PAYCOUD',
        description: 'Application de paiement des salaires des agents permanents du COUD (Conseil Œcuménique des Eglises au Sénégal).',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
        image: 'images/projects/logo_coud.png',
        demo: 'https://paycoud.com/',
        code: '#',
    },
    {
        title: 'CampusCOUD',
        description: 'Application de gestion des codifications des étudiants de l\'Université Cheikh Anta Diop de Dakar.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Angular', 'Spring Boot', 'MySQL'],
        image: 'images/projects/logo_coud.png',
        demo: 'https://campuscoud.com/',
        code: '#',
    },
    {
        title: 'Bideew Technologies',
        description: 'Site web officiel de Bideew Technologies, une entreprise spécialisée dans les solutions technologiques innovantes.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'React'],
        image: 'images/projects/logo-removebg-preview.png',
        demo: 'https://bideewtech.com/',
        code: '#',
    },
    {
        title: 'HMT Global Trading',
        description: 'Boutique en ligne de vente de produits divers avec système de paiement sécurisé et gestion de commandes.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
        image: 'images/projects/hmt.png',
        demo: 'https://hmtglobaltrading.com/',
        code: '#',
    },
    {
        title: 'Commune de Touba Toul',
        description: 'Site web officiel de la commune de Touba Toul présentant les actualités, services et informations locales.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'WordPress'],
        image: 'images/projects/commune touba toul.png',
        demo: '#',
        code: '#',
    }
];

/**
 * Initialisation des écouteurs d'événements
 */
function initEventListeners() {
    // Menu mobile
    if (burger) {
        burger.addEventListener('click', toggleMobileMenu);
    }

    // Fermeture du menu mobile au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Défilement fluide
    initSmoothScrolling();

    // Barre de navigation avec ombre au défilement
    window.addEventListener('scroll', toggleNavbarShadow);

    // Soumission du formulaire de contact
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

/**
 * Active/désactive le menu mobile
 */
function toggleMobileMenu() {
    // Toggle navigation
    nav.classList.toggle('nav-active');
    
    // Animation des liens
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Animation du bouton burger
    burger.classList.toggle('toggle');
}

/**
 * Ferme le menu mobile
 */
function closeMobileMenu() {
    nav.classList.remove('nav-active');
    burger.classList.remove('toggle');
    navLinks.forEach(link => {
        link.style.animation = '';
    });
}

/**
 * Initialise le défilement fluide pour les liens d'ancrage
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Compensation pour l'en-tête fixe
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Ajoute/supprime l'ombre de la barre de navigation au défilement
 */
function toggleNavbarShadow() {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
}

/**
 * Gère la soumission du formulaire de contact
 * @param {Event} e - L'événement de soumission
 */
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    // Récupérer les éléments du formulaire
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const spinner = submitButton.querySelector('.spinner');
    const statusMessage = document.getElementById('form-status');
    
    // Afficher l'état de chargement
    submitButton.classList.add('loading');
    statusMessage.textContent = '';
    statusMessage.className = 'form-status';
    
    // Récupérer les données du formulaire
    const formData = new FormData(form);
    const formProps = {
        from_name: formData.get('from_name'),
        from_email: formData.get('from_email'),
        message: formData.get('message'),
        to_email: 'sarraseydinaissasarr@gmail.com' // Remplacez par votre adresse email
    };
    
    // Envoyer l'email via EmailJS
    emailjs.send('service_7y5dw19', 'template_41sfayd', formProps)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            // Afficher le message de succès
            statusMessage.textContent = 'Message envoyé avec succès ! Je vous répondrai dès que possible.';
            statusMessage.classList.add('visible', 'success');
            
            // Réinitialiser le formulaire
            form.reset();
        })
        .catch((error) => {
            console.error('FAILED...', error);
            // Afficher le message d'erreur
            statusMessage.textContent = "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer plus tard ou me contacter directement à votre email.";
            statusMessage.classList.add('visible', 'error');
        })
        .finally(() => {
            // Cacher l'état de chargement
            submitButton.classList.remove('loading');
            
            // Faire défiler jusqu'au message de statut pour le rendre visible
            statusMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
}

/**
 * Affiche les projets dans la section dédiée
 */
function renderProjects() {
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-image-container">
                <img 
                    src="${project.image}" 
                    alt="${project.title}" 
                    class="project-image"
                    onerror="this.onerror=null; this.src='images/projects/placeholder.jpg'"
                    loading="lazy"
                >
                <div class="project-overlay">
                    <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="preview-btn">
                        <i class="fas fa-eye"></i> Voir en ligne
                    </a>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map((tech, index) => 
                        `<span class="tech-tag" style="--i: ${index + 1}">${tech}</span>`
                    ).join(' ')}
                </div>
                <div class="project-links">
                    <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn">
                        <i class="fas fa-external-link-alt"></i> Visiter le site
                    </a>
                    ${project.code !== '#' ? `
                    <a href="${project.code}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                        <i class="fab fa-github"></i> Code source
                    </a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Anime les éléments au défilement
 */
function animateOnScroll() {
    // Animation des éléments de la timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    const windowHeight = window.innerHeight;
    
    timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const itemVisible = 150;
        
        if (itemTop < windowHeight - itemVisible) {
            // Animation d'apparition avec un léger délai pour chaque élément
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
        }
    });
    
    // Animation des autres éléments avec la classe animate-on-scroll
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
}

/**
 * Gère le carrousel de texte
 */
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    // Activer la première slide
    items[0].classList.add('active');
    
    // Fonction pour mettre à jour le carrousel
    function updateCarousel() {
        // Mise à jour des slides actives
        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Mise à jour des dots actifs
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
            dot.setAttribute('aria-selected', index === currentIndex ? 'true' : 'false');
            dot.setAttribute('tabindex', index === currentIndex ? '0' : '-1');
        });
        
        // Mise à jour des attributs ARIA
        items.forEach((item, index) => {
            item.setAttribute('aria-hidden', index !== currentIndex ? 'true' : 'false');
            item.setAttribute('aria-label', `${index + 1} sur ${totalItems}`);
        });
    }
    
    // Gestionnaire pour le bouton précédent
    function goToPrev() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }
    
    // Gestionnaire pour le bouton suivant
    function goToNext() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }
    
    // Gestionnaire pour les dots
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Configuration des écouteurs d'événements
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', goToPrev);
        nextBtn.addEventListener('click', goToNext);
        
        // Navigation au clavier
        prevBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToPrev();
            }
        });
        
        nextBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToNext();
            }
        });
    }
    
    // Configuration des dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
        
        // Navigation au clavier pour les dots
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
            }
        });
    });
    
    // Navigation au clavier pour le carrousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToPrev();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    });
    
    // Défilement automatique
    let slideInterval;
    let userInteracted = false;
    
    function startAutoSlide() {
        if (!userInteracted) {
            slideInterval = setInterval(() => {
                goToNext();
            }, 10000); // Changement de slide toutes les 10 secondes
        }
    }
    
    // Démarrer le défilement automatique après un court délai
    setTimeout(startAutoSlide, 5000); // Délai initial de 5 secondes avant le premier défilement
    
    // Gestion des interactions utilisateur
    function handleUserInteraction() {
        if (!userInteracted) {
            userInteracted = true;
            clearInterval(slideInterval);
        }
    }
    
    // Écouteurs d'événements pour les interactions
    const carousel = document.querySelector('.floating-carousel');
    if (carousel) {
        // Arrêt au survol
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        // Reprise quand la souris quitte
        carousel.addEventListener('mouseleave', () => {
            if (!userInteracted) {
                startAutoSlide();
            }
        });
        
        // Interactions tactiles
        carousel.addEventListener('touchstart', handleUserInteraction);
        carousel.addEventListener('click', handleUserInteraction);
    }
    
    // Redémarrage du défilement après interaction
    function resetAutoSlide() {
        userInteracted = false;
        startAutoSlide();
    }
    
    // Réinitialisation après inactivité
    let inactivityTime;
    function resetInactivityTimer() {
        clearTimeout(inactivityTime);
        inactivityTime = setTimeout(resetAutoSlide, 10000); // Réinitialise après 10s d'inactivité
    }
    
    // Réinitialisation du minuteur d'inactivité lors des interactions
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);
    
    // Démarrer le minuteur d'inactivité
    resetInactivityTimer();
    
    // Initialisation
    updateCarousel();
}

/**
 * Initialisation de l'application
 */
function init() {
    // Initialisation d'EmailJS avec la clé publique
    (function() {
        emailjs.init({
            publicKey: 'QZNTJ3vE-rrNlA5gN',
            blockHeadless: true,
            blockList: {
                '\/custom\/block\/path': 'custom_block'
            },
            limitRate: {
                throttle: 10000, // 10 secondes
            }
        });
    })();
    
    initEventListeners();
    renderProjects();
    
    // Vérification initiale pour l'animation au défilement
    animateOnScroll();
    
    // Vérification au défilement
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialisation des animations au chargement
    window.addEventListener('load', () => {
        animateOnScroll();
        initCarousel(); // Initialisation du carrousel
    });
    
    // Ajouter l'écouteur d'événement pour le formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

// Démarrer l'application
document.addEventListener('DOMContentLoaded', init);
