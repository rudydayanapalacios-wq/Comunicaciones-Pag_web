document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section');


    /* =====================================================
       EFECTO DE LA NAVBAR AL HACER SCROLL
       ===================================================== */

    window.addEventListener('scroll', () => {

        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                '0 4px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(168, 85, 247, 0.15)';

            navbar.style.borderBottomColor =
                'rgba(168, 85, 247, 0.5)';

        } else {

            navbar.style.boxShadow =
                'none';

            navbar.style.borderBottomColor =
                'rgba(253, 232, 208, 0.25)';
        }


        /* =================================================
           DETECTAR LA SECCIÓN ACTUAL
           ================================================= */

        let currentSection = '';

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 100;

            const sectionHeight =
                section.clientHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute('id');
            }

        });


        /* =================================================
           ACTUALIZAR ENLACE ACTIVO
           ================================================= */

        navLinks.forEach(link => {

            link.classList.remove('active');


            if (
                link.getAttribute('href') ===
                `#${currentSection}`
            ) {

                link.classList.add('active');
            }

        });

    });


    /* =====================================================
       ANIMACIÓN INTERACTIVA DE HIPROFE
       ===================================================== */

    const heroImage =
        document.querySelector('.hero-image');

    const heroVisual =
        document.querySelector('.hero-visual');


    if (heroImage && heroVisual) {

        heroVisual.addEventListener('mousemove', (event) => {

            const rect =
                heroVisual.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const moveX =
                (x / rect.width - 0.5) * 10;

            const moveY =
                (y / rect.height - 0.5) * 10;


            heroImage.style.transform =
                `translate(${moveX}px, ${moveY}px) scale(1.03)`;

        });


        heroVisual.addEventListener('mouseleave', () => {

            heroImage.style.transform =
                '';

        });

    }


    /* =====================================================
       ESTADO INICIAL
       ===================================================== */

    if (window.scrollY <= 50) {

        navbar.style.boxShadow =
            'none';

        navbar.style.borderBottomColor =
            'rgba(253, 232, 208, 0.25)';
    }

});
