document.addEventListener('DOMContentLoaded', () => {
    const toggleThemeButton = document.getElementById('toggle-theme');
    function updateIcon() {
        const isNight = document.body.classList.contains('night-mode');
        toggleThemeButton.innerHTML = isNight
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';
    }
    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        updateIcon();
    });
    updateIcon();
});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('header .navbar-nav .nav-link');

    function getColor(normal = true) {
        const root = getComputedStyle(document.documentElement);
        const isNight = document.body.classList.contains('night-mode');
        if (isNight) {
            return normal ? root.getPropertyValue('--text-night').trim() : root.getPropertyValue('--button-hover-bg-night').trim() || "#FF9800";
        } else {
            return normal ? root.getPropertyValue('--text-day').trim() : root.getPropertyValue('--button-hover-bg-day').trim() || "#2C5F2D";
        }
    }

    function setNavLinkStyles() {
        navLinks.forEach(link => {
            link.style.fontSize = "1.5rem";
            link.style.color = getColor(true);
            link.style.transition = "all 0.2s";
            link.style.fontWeight = "normal";
        });
    }

    function highlightSection() {
        let scrollPos = window.scrollY || window.pageYOffset;
        const lastIdx = navLinks.length - 1;
        navLinks.forEach((link, idx) => {
            const sectionId = link.getAttribute('href');
            if (!sectionId.startsWith('#')) return;
            const section = document.querySelector(sectionId);
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY - 80;
            const sectionBottom = sectionTop + section.offsetHeight;

            const isLast = idx === lastIdx;
            const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 2);

            // Solo marca el último si estamos realmente al final
            if (isLast && nearBottom) {
                link.style.fontSize = "1.9rem";
                link.style.color = getColor(false);
                link.style.fontWeight = "bold";
            } else if (!isLast && scrollPos >= sectionTop && scrollPos < sectionBottom && !(nearBottom && idx === lastIdx - 1)) {
                link.style.fontSize = "1.9rem";
                link.style.color = getColor(false);
                link.style.fontWeight = "bold";
            } else {
                link.style.fontSize = "1.5rem";
                link.style.color = getColor(true);
                link.style.fontWeight = "normal";
            }
        });
    }

    setNavLinkStyles();
    window.addEventListener('scroll', highlightSection);

    // Actualiza estilos al cambiar el modo de tema
    const toggleThemeButton = document.getElementById('toggle-theme');
    if (toggleThemeButton) {
        toggleThemeButton.addEventListener('click', () => {
            setTimeout(() => {
                setNavLinkStyles();
                highlightSection();
            }, 10);
        });
    }

    highlightSection();

    // Oculta el header en móvil usando JS
    function toggleHeaderOnMobile() {
        const header = document.querySelector('header');
        if (!header) return;
        if (window.innerWidth <= 991) {
            header.style.display = "none";
        } else {
            header.style.display = "";
        }
    }
    window.addEventListener('resize', toggleHeaderOnMobile);
    toggleHeaderOnMobile();

    // Skill info panel hover logic
    const skillInfoPanel = document.getElementById('skill-info-panel');
    const skillHexes = document.querySelectorAll('.cv-hex[data-info]');
    if (skillInfoPanel && skillHexes.length > 0) {
        skillHexes.forEach(hex => {
            hex.addEventListener('mouseenter', () => {
                skillInfoPanel.textContent = hex.getAttribute('data-info');
            });
            hex.addEventListener('mouseleave', () => {
                skillInfoPanel.textContent = 'Hover a skill to see info here';
            });
        });
    }
});
