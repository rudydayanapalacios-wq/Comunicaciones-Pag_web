/**
 * LÓGICA DINÁMICA DE COMUNICACIÓN NO VERBAL
 */

// Banco de Escenarios para el Simulador
const quizScenarios = [
    {
        question: "Durante una junta corporativa, un ejecutivo cruza los brazos, inclina el torso hacia atrás y evita el contacto visual. ¿Qué canal kinesiológico predomina?",
        options: ["Postura defensiva/bloqueo", "Sintonía o rapport", "Postura erguida de poder", "Orientación de apertura"],
        correct: 0,
        explanation: "La inclinación hacia atrás y los brazos cruzados denotan una actitud de reserva o desaprobación según el análisis kinesiológico."
    },
    {
        question: "En una entrevista de trabajo, el candidato responde serenamente, pero por 1/20 de segundo frunce el entrecejo al mencionar a su jefe anterior. ¿A qué corresponde?",
        options: ["Ademán ilustrador", "Microexpresión involuntaria", "Emblema cultural", "Paralenguaje de vacilación"],
        correct: 1,
        explanation: "Las microexpresiones duran una fracción de segundo y filtran la emoción genuina antes de que pueda ser enmascarada."
    },
    {
        question: "Un conferencista eleva bruscamente el volumen y ralentiza las palabras al pronunciar la conclusión de su discurso. ¿Qué canal está utilizando?",
        options: ["Proxemia social", "Paralenguaje de énfasis", "Kinesis de transición", "Protocolo formal"],
        correct: 1,
        explanation: "El volumen, el ritmo y la velocidad pertenecen al paralenguaje e influyen en cómo se percibe la importancia del mensaje."
    },
    {
        question: "Un expositor hace una señal circular cerrada con el pulgar e índice levantados para indicar 'excelente'. ¿Qué tipo de gesto utilizó?",
        options: ["Ademán ilustrativo", "Emblema", "Gesto de adaptación", "Kinesis involuntaria"],
        correct: 1,
        explanation: "Los emblemas son gestos con una traducción verbal implícita y directa aceptada culturalmente."
    }
];

let currentStep = 0;
let userScore = 0;
let currentStreak = 0;

document.addEventListener("DOMContentLoaded", () => {
    initLabAnimations();
    initQuizEngine();
});

/* Transición fluida al cambiar de pestaña en el Laboratorio */
function initLabAnimations() {
    const display = document.querySelector('.lab-display');
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (display) {
                display.style.opacity = '0';
                display.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    display.style.transition = 'all 0.4s ease';
                    display.style.opacity = '1';
                    display.style.transform = 'translateY(0)';
                }, 150);
            }
        });
    });
}

/* Lógica del Simulador */
function initQuizEngine() {
    renderScenario();

    const btnNext = document.getElementById("btn-next-question");
    if (btnNext) {
        btnNext.addEventListener("click", () => {
            currentStep = (currentStep + 1) % quizScenarios.length;
            renderScenario();
        });
    }
}

function renderScenario() {
    const qData = quizScenarios[currentStep];
    const questionEl = document.getElementById("quiz-question");
    const optionsGrid = document.getElementById("quiz-options");
    const feedbackEl = document.getElementById("quiz-feedback");
    const btnNext = document.getElementById("btn-next-question");

    if (!questionEl || !optionsGrid) return;

    questionEl.innerText = `[Caso ${currentStep + 1}/${quizScenarios.length}] ${qData.question}`;
    optionsGrid.innerHTML = "";
    feedbackEl.className = "quiz-feedback hidden";
    btnNext.classList.add("hidden");

    qData.options.forEach((optText, index) => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.innerText = optText;
        button.onclick = () => handleAnswer(index, qData.correct, qData.explanation);
        optionsGrid.appendChild(button);
    });
}

function handleAnswer(selectedIndex, correctIndex, explanation) {
    const buttons = document.querySelectorAll(".option-btn");
    const feedbackEl = document.getElementById("quiz-feedback");
    const btnNext = document.getElementById("btn-next-question");
    const scoreVal = document.getElementById("score-val");
    const streakVal = document.getElementById("streak-val");

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIndex) btn.classList.add("correct");
        if (idx === selectedIndex && selectedIndex !== correctIndex) btn.classList.add("wrong");
    });

    if (selectedIndex === correctIndex) {
        userScore += 100;
        currentStreak++;
        feedbackEl.innerText = `¡Correcto! ${explanation}`;
        feedbackEl.className = "quiz-feedback correct-bg";
    } else {
        currentStreak = 0;
        feedbackEl.innerText = `Incorrecto. ${explanation}`;
        feedbackEl.className = "quiz-feedback wrong-bg";
    }

    if (scoreVal) scoreVal.innerText = `Puntaje: ${userScore}`;
    if (streakVal) streakVal.innerText = `Racha: ${currentStreak} 🔥`;

    btnNext.classList.remove("hidden");
}