/* ==========================================
   REFLEXIONES
========================================== */


/* ==========================================
   ANIMACIÓN DE ENTRADA
========================================== */

document.addEventListener('DOMContentLoaded', () => {

    const cards =
        document.querySelectorAll('.reflection-card');

    if ('IntersectionObserver' in window) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry, index) => {

                        if (entry.isIntersecting) {

                            setTimeout(() => {

                                entry.target.classList.add(
                                    'visible'
                                );

                            }, index * 180);

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        cards.forEach(card => {
            observer.observe(card);
        });

    }

});


/* ==========================================
   ABRIR / CERRAR REFLEXIÓN
========================================== */

function toggleReflection(button) {

    const card =
        button.closest('.reflection-card');

    if (!card) {
        return;
    }


    const isOpen =
        button.classList.contains('open');


    if (isOpen) {

        button.classList.remove('open');

        button.querySelector('span').textContent =
            'Ver reflexión completa';

        card.classList.remove('read');

    } else {

        button.classList.add('open');

        button.querySelector('span').textContent =
            'Reflexión leída';

        card.classList.add('read');

    }

}


/* ==========================================
   MODAL DE APRENDIZAJE FINAL
========================================== */

function showFinalMessage() {

    const modal =
        document.getElementById('finalModal');

    if (!modal) {
        return;
    }

    modal.classList.add('active');

    document.body.style.overflow =
        'hidden';
}


/* ==========================================
   CERRAR MODAL
========================================== */

function closeFinalMessage() {

    const modal =
        document.getElementById('finalModal');

    if (!modal) {
        return;
    }

    modal.classList.remove('active');

    document.body.style.overflow =
        '';
}


/* ==========================================
   CERRAR AL HACER CLICK AFUERA
========================================== */

document.addEventListener('click', event => {

    const modal =
        document.getElementById('finalModal');

    if (
        modal &&
        event.target === modal
    ) {

        closeFinalMessage();

    }

});


/* ==========================================
   CERRAR CON ESCAPE
========================================== */

document.addEventListener('keydown', event => {

    if (event.key === 'Escape') {

        closeFinalMessage();

    }

});