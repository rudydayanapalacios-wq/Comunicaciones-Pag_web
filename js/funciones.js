/**
 * Control de Presentación Interactiva y Juego de Funciones del Lenguaje
 */

document.addEventListener('DOMContentLoaded', () => {
    initYouTubeVideos();
    initSlides();
    initGame();
});

// ==========================================
// 1. CONVERTIDOR DE URLS Y CONTROL DE YOUTUBE
// ==========================================
function parseYouTubeUrl(url) {
    if (!url) return '';
    let videoId = '';
    
    // Extraer videoId respetando parámetros
    if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
    }

    if (videoId) {
        // enablejsapi=1 para enviar comandos de pausa vía postMessage
        return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&enablejsapi=1`;
    }
    
    return url;
}

function initYouTubeVideos() {
    const iframes = document.querySelectorAll('iframe.yt-embed-video');
    iframes.forEach(iframe => {
        const rawUrl = iframe.getAttribute('data-yt-url');
        if (rawUrl) {
            iframe.src = parseYouTubeUrl(rawUrl);
        }
    });
}

/**
 * Pausa todos los videos activos al cambiar de diapositiva
 */
function pauseAllVideos() {
    const iframes = document.querySelectorAll('iframe.yt-embed-video');
    iframes.forEach(iframe => {
        if (iframe.contentWindow) {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    });
}

// ==========================================
// 2. SISTEMA DE DIAPOSITIVAS (SLIDES)
// ==========================================
let currentSlide = 0;
let slides = [];
let totalSlides = 0;

function initSlides() {
    slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    totalSlides = slides.length - 1;
    updateSlides();
}

function updateSlides() {
    // Pausar cualquier video activo antes de cambiar de vista
    pauseAllVideos();

    slides.forEach((slide, idx) => {
        if (idx === currentSlide) {
            slide.classList.add('active-slide');
            slide.style.display = 'flex';
        } else {
            slide.classList.remove('active-slide');
            slide.style.display = 'none';
        }
    });

    // Actualizar indicador (Ej. 1 / 8)
    const indicator = document.getElementById('slideIndicator');
    if (indicator) {
        indicator.textContent = `${currentSlide} / ${totalSlides}`;
    }

    // Actualizar barra de progreso
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const percentage = (currentSlide / totalSlides) * 100;
        progressBar.style.width = `${percentage}%`;
    }
}

function goToSlide(index) {
    if (index >= 0 && index <= totalSlides) {
        currentSlide = index;
        updateSlides();
    }
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlides();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlides();
    }
}

// Navegación mediante teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// ==========================================
// 3. JUEGO INTERACTIVO: DECODIFICADOR
// ==========================================
const gameData = [
    {
        question: '“¡Siento una felicidad inmensa al ver este resultado!”',
        options: ['Referencial', 'Emotiva', 'Fática', 'Apelativa'],
        correct: 1,
        feedback: '¡Correcto! Expresa el estado emocional del emisor (Función Emotiva).'
    },
    {
        question: '“Por favor, cierren la puerta al salir.”',
        options: ['Poética', 'Apelativa', 'Metalingüística', 'Fática'],
        correct: 1,
        feedback: '¡Excelente! Busca una reacción o conducta en el receptor (Función Apelativa).'
    },
    {
        question: '“¿Aló? ¿Me escuchas bien en la llamada?”',
        options: ['Fática', 'Emotiva', 'Referencial', 'Metalingüística'],
        correct: 0,
        feedback: '¡Muy bien! Verifica que el canal de comunicación esté abierto (Función Fática).'
    },
    {
        question: '“La reunión comenzará formalmente a las 3:00 PM.”',
        options: ['Apelativa', 'Poética', 'Referencial', 'Emotiva'],
        correct: 2,
        feedback: '¡Correcto! Entrega datos objetivos de la realidad (Función Referencial).'
    },
    {
        question: '“La palabra \'sintaxis\' se refiere al orden de las palabras.”',
        options: ['Metalingüística', 'Fática', 'Poética', 'Referencial'],
        correct: 0,
        feedback: '¡Correcto! Utiliza el código para reflexionar sobre el idioma (Función Metalingüística).'
    }
];

let currentGameIndex = 0;
let score = 0;

function initGame() {
    const scenarioEl = document.getElementById('scenarioText');
    if (!scenarioEl) return;
    loadScenario();
}

function loadScenario() {
    const scenario = gameData[currentGameIndex];
    
    const levelEl = document.getElementById('currentLevel');
    const scoreEl = document.getElementById('score');
    const scenarioTextEl = document.getElementById('scenarioText');
    const feedbackEl = document.getElementById('gameFeedback');
    const nextBtn = document.getElementById('nextBtn');
    const container = document.getElementById('optionsContainer');

    if (levelEl) levelEl.textContent = currentGameIndex + 1;
    if (scoreEl) scoreEl.textContent = score;
    if (scenarioTextEl) scenarioTextEl.textContent = scenario.question;
    if (feedbackEl) feedbackEl.textContent = '';
    if (nextBtn) nextBtn.classList.add('hidden-btn');

    if (container) {
        container.innerHTML = '';
        scenario.options.forEach((optionText, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = optionText;
            btn.onclick = () => selectOption(idx);
            container.appendChild(btn);
        });
    }
}

function selectOption(selectedIndex) {
    const scenario = gameData[currentGameIndex];
    const buttons = document.querySelectorAll('#optionsContainer .option-btn');
    const feedbackEl = document.getElementById('gameFeedback');
    const nextBtn = document.getElementById('nextBtn');

    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === scenario.correct) {
            btn.classList.add('correct');
        } else if (idx === selectedIndex) {
            btn.classList.add('incorrect');
        }
    });

    if (selectedIndex === scenario.correct) {
        score += 10;
        const scoreEl = document.getElementById('score');
        if (scoreEl) scoreEl.textContent = score;
        if (feedbackEl) {
            feedbackEl.className = 'feedback-msg feedback-success';
            feedbackEl.textContent = scenario.feedback;
        }
    } else {
        if (feedbackEl) {
            feedbackEl.className = 'feedback-msg feedback-error';
            feedbackEl.textContent = 'Incorrecto. Observa sobre qué elemento de la comunicación recae la intención.';
        }
    }

    if (nextBtn) {
        nextBtn.classList.remove('hidden-btn');
    }
}

function nextQuestion() {
    currentGameIndex++;
    if (currentGameIndex < gameData.length) {
        loadScenario();
    } else {
        const scenarioTextEl = document.getElementById('scenarioText');
        const container = document.getElementById('optionsContainer');
        const feedbackEl = document.getElementById('gameFeedback');
        const nextBtn = document.getElementById('nextBtn');

        const totalQuestions = gameData.length;
        const maxScore = totalQuestions * 10;
        const passingScore = maxScore * 0.6; // Mínimo 60% para aprobar (3 de 5)

        if (scenarioTextEl) {
            scenarioTextEl.textContent = `🎯 Puntuación Final: ${score} / ${maxScore} pts.`;
        }

        if (container) container.innerHTML = '';

        if (feedbackEl) {
            if (score >= passingScore) {
                feedbackEl.className = 'feedback-msg feedback-success';
                feedbackEl.textContent = '🎉 ¡Excelente trabajo! Dominas las funciones del lenguaje de Roman Jakobson.';
            } else if (score > 0) {
                feedbackEl.className = 'feedback-msg feedback-error';
                feedbackEl.textContent = '💡 Has completado el test, pero necesitas repasar los conceptos. ¡Inténtalo de nuevo!';
            } else {
                feedbackEl.className = 'feedback-msg feedback-error';
                feedbackEl.textContent = '⚠️ Has fallado todas las preguntas. Te sugerimos revisar el material antes de reintentar.';
            }
        }

        if (nextBtn) {
            nextBtn.textContent = '🔄 Reintentar Desafío';
            nextBtn.onclick = resetGame;
            nextBtn.classList.remove('hidden-btn');
            nextBtn.style.display = 'inline-block';
        }
    }
}

function resetGame() {
    currentGameIndex = 0;
    score = 0;
    
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.textContent = 'Siguiente →';
        nextBtn.onclick = nextQuestion;
    }
    
    loadScenario();
}