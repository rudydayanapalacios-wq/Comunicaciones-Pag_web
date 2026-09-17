document.addEventListener('DOMContentLoaded', () => {
    // Animación de entrada gradual (Fade In) para las tarjetas al hacer scroll
    const observerOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionar elementos para animar
    const animatedElements = document.querySelectorAll('.card, .hierarchy-card, .feature-box, .non-verbal-list li');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        revealObserver.observe(el);
    });

    // Efecto dinámico de brillo (Glow) al interactuar con las tarjetas de Funciones del Lenguaje
    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.boxShadow = '0 0 20px rgba(244, 63, 94, 0.3)';
        });
        box.addEventListener('mouseleave', () => {
            box.style.boxShadow = 'none';
        });
    });
});