document.addEventListener('DOMContentLoaded', () => {
    const toggleThemeButton = document.getElementById('toggle-theme');
    function updateIcon() {
        const isNight = document.body.classList.contains('night-mode');
        toggleThemeButton.innerHTML = isNight
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';
        // JS aplica colores directamente
        if (isNight) {
            toggleThemeButton.style.backgroundColor = "#4A3F35";
            toggleThemeButton.style.color = "#ff9800";
        } else {
            toggleThemeButton.style.backgroundColor = "#4A3F35";
            toggleThemeButton.style.color = "#D9CAB3";
        }
        toggleThemeButton.style.border = "none";
        toggleThemeButton.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
        toggleThemeButton.style.transition = "background 0.2s, color 0.2s";
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
});
