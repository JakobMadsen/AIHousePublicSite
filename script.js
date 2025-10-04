// Burger menu toggle
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (burger && navMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.length > 1) { // keep normal link for just '#'
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        }
    });
});

// i18n only if data-i18n nodes exist (index dynamic version)
const i18nNodes = document.querySelectorAll('[data-i18n]');
if (typeof translations !== 'undefined' && i18nNodes.length > 0) {
    let currentLanguage = localStorage.getItem('language') || 'da';
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && translations[urlLang]) {
        currentLanguage = urlLang;
        localStorage.setItem('language', urlLang);
    }

    function setLanguage(lang) {
        if (!translations[lang]) return;
        currentLanguage = lang;
        localStorage.setItem('language', lang);

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const keys = element.getAttribute('data-i18n').split('.');
            let translation = translations[lang];
            for (const key of keys) {
                translation = translation?.[key];
            }
            if (typeof translation === 'string') {
                element.textContent = translation;
            }
        });

        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        document.documentElement.lang = lang;
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.language-btn').forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                setLanguage(lang);
            });
        });
        setLanguage(currentLanguage);
    });
}

