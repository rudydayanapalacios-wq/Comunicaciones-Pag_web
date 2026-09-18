document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       ANIMACIÓN DE LAS TARJETAS
    ========================================== */

    const cards = document.querySelectorAll('.team-card');

    if ('IntersectionObserver' in window) {

        const cardObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry, index) => {

                    if (entry.isIntersecting) {

                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 180);

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );


        cards.forEach(card => {
            cardObserver.observe(card);
        });

    } else {

        /*
            Si el navegador no soporta IntersectionObserver,
            las tarjetas siguen siendo visibles.
        */

        cards.forEach(card => {
            card.classList.add('visible');
        });

    }


    /* ==========================================
       EFECTO 3D DE LAS TARJETAS
    ========================================== */

    cards.forEach(card => {

        card.addEventListener('mousemove', event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                `translateY(-8px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });


        card.addEventListener('mouseleave', () => {

            card.style.transform =
                'translateY(0)';

        });

    });


    /* ==========================================
       CERRAR MODAL AL HACER CLICK AFUERA
    ========================================== */

    const modal =
        document.getElementById('infoModal');

    if (modal) {

        modal.addEventListener('click', event => {

            if (event.target === modal) {
                closeMessage();
            }

        });

    }


    /* ==========================================
       CERRAR CON ESCAPE
    ========================================== */

    document.addEventListener('keydown', event => {

        if (event.key === 'Escape') {
            closeMessage();
        }

    });

});


/* ==========================================
   INFORMACIÓN DE LAS INTEGRANTES
========================================== */

const teamInfo = {

    1: {
        number: '01',

        title: 'Nombre de la primera integrante',

        text:
            'Aquí pueden colocar información más detallada sobre la primera integrante, sus intereses, habilidades, aportes al proyecto o cualquier otro dato que quieran compartir.'
    },


    2: {
        number: '02',

        title: 'Nombre de la segunda integrante',

        text:
            'Aquí pueden colocar información más detallada sobre la segunda integrante, sus intereses, habilidades, aportes al proyecto o cualquier otro dato que quieran compartir.'
    }

};


/* ==========================================
   ABRIR MODAL
========================================== */

function showMessage(person) {

    const data =
        teamInfo[person];

    if (!data) {
        return;
    }


    const modal =
        document.getElementById('infoModal');

    const modalNumber =
        document.getElementById('modalNumber');

    const modalTitle =
        document.getElementById('modalTitle');

    const modalText =
        document.getElementById('modalText');


    modalNumber.textContent =
        data.number;

    modalTitle.textContent =
        data.title;

    modalText.textContent =
        data.text;


    modal.classList.add('active');

    document.body.style.overflow =
        'hidden';
}


/* ==========================================
   CERRAR MODAL
========================================== */

function closeMessage() {

    const modal =
        document.getElementById('infoModal');

    if (!modal) {
        return;
    }

    modal.classList.remove('active');

    document.body.style.overflow =
        '';
}