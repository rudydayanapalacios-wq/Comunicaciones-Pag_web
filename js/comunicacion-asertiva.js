/* =========================================
   BARRA DE PROGRESO
========================================= */

const progressBar =
    document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width =
        `${progress}%`;

});


/* =========================================
   LUZ DEL MOUSE
========================================= */

const mouseGlow =
    document.querySelector(".mouse-glow");

document.addEventListener("mousemove", (event) => {

    mouseGlow.style.left =
        `${event.clientX}px`;

    mouseGlow.style.top =
        `${event.clientY}px`;

});


/* =========================================
   ANIMACIONES AL HACER SCROLL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach((element) => {

    observer.observe(element);

});


/* =========================================
   DATOS DE LAS TARJETAS
========================================= */

const benefitData = [

    {
        number: "01",

        category: "REQUISITOS",

        title:
            "Claridad en la especificación de requisitos",

        text:
            "La comunicación asertiva asegura que los requisitos del software sean entendidos correctamente por todo el equipo, evitando errores y retrabajos en el futuro. En un proyecto de software, una indicación poco clara puede generar interpretaciones diferentes entre los integrantes del equipo. Expresar las necesidades, características y objetivos del sistema de manera precisa permite reducir confusiones y facilita que cada integrante comprenda qué debe realizar. Por ejemplo, si un cliente solicita una función nueva, el tecnólogo debe realizar preguntas, confirmar la información y explicar las posibilidades técnicas antes de comenzar el desarrollo."
    },

    {
        number: "02",

        category: "EQUIPO",

        title:
            "Colaboración efectiva",

        text:
            "Permite a los tecnólogos expresar sus ideas y opiniones de manera respetuosa, fomentando un ambiente de trabajo donde todos se sienten cómodos aportando soluciones. La colaboración es fundamental en el desarrollo de software porque un proyecto normalmente requiere la participación de diferentes personas con conocimientos y responsabilidades distintas. Escuchar las propuestas de los compañeros y explicar las propias ideas facilita la toma de decisiones y fortalece el trabajo en equipo."
    },

    {
        number: "03",

        category: "CONFLICTOS",

        title:
            "Resolución de conflictos",

        text:
            "La comunicación asertiva facilita la gestión de conflictos que puedan surgir durante el desarrollo, promoviendo soluciones mutuamente satisfactorias. Las diferencias pueden aparecer debido a decisiones técnicas, distribución de tareas, cambios en los requisitos o problemas relacionados con los tiempos de entrega. En lugar de responder mediante discusiones o imposiciones, una comunicación asertiva permite identificar el problema, escuchar las diferentes posiciones y buscar alternativas."
    },

    {
        number: "04",

        category: "FEEDBACK",

        title:
            "Feedback constructivo",

        text:
            "Permite dar y recibir retroalimentación de manera efectiva, lo que es crucial para el aprendizaje continuo y la mejora del producto. En el desarrollo de software, revisar el trabajo de otros integrantes permite detectar errores y encontrar oportunidades de mejora. El feedback debe centrarse en el trabajo y en las posibles soluciones, evitando convertir una observación técnica en un ataque personal."
    },

    {
        number: "05",

        category: "CLIENTES",

        title:
            "Relación con clientes",

        text:
            "La comunicación asertiva con los clientes ayuda a gestionar sus expectativas, comprender sus necesidades y asegurar la satisfacción con el producto final. El tecnólogo debe ser capaz de explicar conceptos técnicos utilizando un lenguaje que el cliente pueda comprender. También debe realizar preguntas cuando una solicitud no esté completamente clara y comunicar de manera transparente las posibilidades, limitaciones y avances del proyecto."
    },

    {
        number: "06",

        category: "PLANIFICACIÓN",

        title:
            "Negociación de plazos y recursos",

        text:
            "Facilita la negociación con clientes y superiores sobre plazos de entrega y recursos necesarios para el proyecto. Comunicar oportunamente cuando una tarea requiere más tiempo permite establecer expectativas realistas. También facilita priorizar actividades, distribuir responsabilidades y encontrar alternativas para cumplir con los objetivos del proyecto sin comprometer innecesariamente la calidad."
    }

];


/* =========================================
   MODAL
========================================= */

const modal =
    document.getElementById(
        "benefitModal"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalNumber =
    document.getElementById(
        "modalNumber"
    );

const modalCategory =
    document.getElementById(
        "modalCategory"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalText =
    document.getElementById(
        "modalText"
    );


const cards =
    document.querySelectorAll(
        ".benefit-card"
    );


cards.forEach((card, index) => {

    card.addEventListener("click", () => {

        const data =
            benefitData[index];

        modalNumber.textContent =
            data.number;

        modalCategory.textContent =
            data.category;

        modalTitle.textContent =
            data.title;

        modalText.textContent =
            data.text;

        modal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    });

});


/* =========================================
   CERRAR MODAL
========================================= */

function closeModal() {

    modal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


document
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeModal
    );


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeModal();

        }

    }
);


/* =========================================
   EFECTO 3D EN TARJETAS
========================================= */

cards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) /
                    centerY) * -3;

            const rotateY =
                ((x - centerX) /
                    centerX) * 3;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});