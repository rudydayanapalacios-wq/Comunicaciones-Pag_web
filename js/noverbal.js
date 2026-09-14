/* ===================================================
   NAVEGACIÓN DE DIAPOSITIVAS INTERACTIVAS
=================================================== */

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function updateSlideView() {
    slides.forEach((slide, idx) => {
        if (idx === currentSlideIndex) {
            slide.classList.add('active-slide');
        } else {
            slide.classList.remove('active-slide');
        }
    });

    const indicator = document.getElementById('slideIndicator');
    const progressBar = document.getElementById('progressBar');
    
    if (indicator) {
        indicator.textContent = `${currentSlideIndex} / ${totalSlides - 1}`;
    }
    
    if (progressBar) {
        const percentage = (currentSlideIndex / (totalSlides - 1)) * 100;
        progressBar.style.width = `${percentage}%`;
    }
}

function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
        currentSlideIndex = index;
        updateSlideView();
    }
}

function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
        updateSlideView();
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateSlideView();
    }
}

// Control mediante teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
    }
});

/* ===================================================
   DESAFÍO INTERACTIVO DE LENGUAJE NO VERBAL
=================================================== */

const scenarios = [
    {
        question: "Durante una negociación, el interlocutor mantiene los brazos cruzados, habla a gran velocidad y apenas deja 25 cm de espacio. ¿Qué conducta predomina?",
        options: [
            { text: "Invasión Proxémica (zona íntima) y Paralenguaje acelerado", tag: "correct" },
            { text: "Uso adecuado de protocolo y saludo formal", tag: "incorrect" },
            { text: "Emblema intencional de saludo", tag: "incorrect" },
            { text: "Microexpresión de serenidad", tag: "incorrect" }
        ],
        correctTag: "correct",
        explanation: "La distancia menor a 45 cm invade la zona íntima y el tono acelerado demuestra tensión o urgencia."
    },
    {
        question: "Un expositor utiliza movimientos constantes de manos para graficar las ideas que expone en pantalla. ¿Qué manifestación usa?",
        options: [
            { text: "Ademanes ilustrativos de la Kinésica", tag: "correct" },
            { text: "Microexpresiones faciales involuntarias", tag: "incorrect" },
            { text: "Falta de protocolo institucional", tag: "incorrect" },
            { text: "Emblemas traducibles sin palabras", tag: "incorrect" }
        ],
        correctTag: "correct",
        explanation: "Los ademanes ilustran y refuerzan visualmente el mensaje oral."
    },
    {
        question: "Ofrecer un apretón de manos firme manteniendo contacto visual de 2 segundos al iniciar una reunión corresponde a...",
        options: [
            { text: "El Saludo adecuado y norma de Protocolo", tag: "correct" },
            { text: "Una microexpresión involuntaria", tag: "incorrect" },
            { text: "Un elemento estricto de Paralenguaje", tag: "incorrect" },
            { text: "Un emblema de enfado", tag: "incorrect" }
        ],
        correctTag: "correct",
        explanation: "Combina la cortesía protocolar con un saludo kinesiológico equilibrado."
    }
];

let gameStep = 0;
let score = 0;

function loadGameScenario() {
    const currentData = scenarios[gameStep];
    const scenarioText = document.getElementById('scenarioText');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedback = document.getElementById('gameFeedback');
    const nextBtn = document.getElementById('nextBtn');
    const currentLevelSpan = document.getElementById('currentLevel');

    if (!scenarioText || !optionsContainer) return;

    currentLevelSpan.textContent = gameStep + 1;
    scenarioText.textContent = `"${currentData.question}"`;
    optionsContainer.innerHTML = '';
    feedback.innerHTML = '';
    nextBtn.classList.add('hidden-btn');

    currentData.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.textContent = opt.text;
        btn.onclick = () => evaluateChoice(opt, btn);
        optionsContainer.appendChild(btn);
    });
}

function evaluateChoice(selectedOpt, btnElement) {
    const currentData = scenarios[gameStep];
    const feedback = document.getElementById('gameFeedback');
    const nextBtn = document.getElementById('nextBtn');
    const scoreSpan = document.getElementById('score');

    document.querySelectorAll('.game-btn').forEach(b => b.disabled = true);

    if (selectedOpt.tag === currentData.correctTag) {
        btnElement.classList.add('correct');
        score += 10;
        scoreSpan.textContent = score;
        feedback.style.color = '#86efac';
        feedback.innerHTML = `✨ ¡Excelente! ${currentData.explanation}`;
    } else {
        btnElement.classList.add('incorrect');
        feedback.style.color = '#fca5a5';
        feedback.innerHTML = `❌ Incorrecto. ${currentData.explanation}`;
    }

    if (gameStep < scenarios.length - 1) {
        nextBtn.classList.remove('hidden-btn');
    } else {
        nextBtn.textContent = 'Reiniciar Juego 🔄';
        nextBtn.onclick = resetGame;
        nextBtn.classList.remove('hidden-btn');
    }
}

function nextQuestion() {
    gameStep++;
    loadGameScenario();
}

function resetGame() {
    gameStep = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.textContent = 'Siguiente Escenario ➔';
    nextBtn.onclick = nextQuestion;
    loadGameScenario();
}

document.addEventListener('DOMContentLoaded', () => {
    updateSlideView();
    loadGameScenario();
});