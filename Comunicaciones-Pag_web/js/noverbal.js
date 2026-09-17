// Desplegable de detalles para las tarjetas teóricas
function toggleAccordion(id) {
    const content = document.getElementById(id);
    if (content) {
        content.classList.toggle('open');
    }
}

/* ===================================================
   SISTEMA INTERACTIVO: EFECTO 3D TILT Y MOUSE TRACK GLOW
=================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        const glow = card.querySelector('.card-glow');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Posicionamiento del brillo
            if (glow) {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            }

            // Calculo de inclinación 3D (Tilt)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8; // Ángulo X
            const rotateY = ((x - centerX) / centerX) * 8;  // Ángulo Y

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    initClassifierGame();
});

/* ===================================================
   SISTEMA DE CARGA DE FOTO PARA JAKOBSON
=================================================== */
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.getElementById('jakobsonPhoto');
            if (imgElement) {
                imgElement.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
}

/* ===================================================
   SÍNTESIS DE VOZ PARA PROBAR AUDIOS EN TARJETAS
=================================================== */
function triggerAudioEffect(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Detener audios anteriores
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Tu navegador no soporta síntesis de voz, pero la frase es: " + text);
    }
}

/* ===================================================
   JUEGO: CLASIFICADOR DINÁMICO DE FUNCIONES
=================================================== */
const cardDataset = [
    {
        phrase: "«Siento una profunda alegría al saber que logramos completar la meta juntos.»",
        category: "emotiva",
        explanation: "Expresa el estado emocional y subjetivo del emisor."
    },
    {
        phrase: "«El último censo reportó una población de más de 8 millones de habitantes.»",
        category: "referencial",
        explanation: "Entrega información objetiva y verificable sobre la realidad."
    },
    {
        phrase: "«Apaguen sus dispositivos móviles antes de que inicie la función de teatro.»",
        category: "apelativa",
        explanation: "Busca modificar la conducta del receptor mediante una indicación."
    },
    {
        phrase: "«¿Hola? ¿Siguen en la línea o se cortó la llamada?»",
        category: "fatica",
        explanation: "Evalúa el estado del canal de comunicación."
    },
    {
        phrase: "«En el silencio de la noche, el mar le canta a la luna sus secretos.»",
        category: "poetica",
        explanation: "Usa recursos estilísticos para enriquecer la estética del mensaje."
    },
    {
        phrase: "«Un verbo transitivo requiere un objeto directo para completar su sentido.»",
        category: "metalinguistica",
        explanation: "Aclara o reflexiona sobre las reglas del propio código o lenguaje."
    }
];

let remainingDeck = [];
let currentCard = null;
let aciertos = 0;

function initClassifierGame() {
    remainingDeck = [...cardDataset].sort(() => Math.random() - 0.5);
    aciertos = 0;
    document.getElementById('score').textContent = aciertos;
    document.getElementById('resetGameBtn').classList.add('hidden-btn');
    enableCatButtons(true);
    showNextCard();
}

function showNextCard() {
    const feedback = document.getElementById('gameFeedback');
    const cardsLeftSpan = document.getElementById('cardsLeft');
    feedback.innerHTML = '';

    cardsLeftSpan.textContent = remainingDeck.length;

    if (remainingDeck.length === 0) {
        finishClassifierGame();
        return;
    }

    currentCard = remainingDeck.pop();
    document.getElementById('cardPhraseText').textContent = currentCard.phrase;
    cardsLeftSpan.textContent = remainingDeck.length + 1;
}

function classifyCard(selectedCategory) {
    if (!currentCard) return;

    const feedback = document.getElementById('gameFeedback');
    const scoreSpan = document.getElementById('score');

    if (selectedCategory === currentCard.category) {
        aciertos++;
        scoreSpan.textContent = aciertos;
        feedback.style.color = '#86efac';
        feedback.innerHTML = `✨ ¡Correcto! ${currentCard.explanation}`;
    } else {
        feedback.style.color = '#fca5a5';
        feedback.innerHTML = `❌ Incorrecto. La categoría correcta era <strong>${getCategoryName(currentCard.category)}</strong>: ${currentCard.explanation}`;
    }

    enableCatButtons(false);
    setTimeout(() => {
        enableCatButtons(true);
        showNextCard();
    }, 2200);
}

function getCategoryName(cat) {
    const names = {
        'emotiva': 'Emotiva',
        'referencial': 'Referencial',
        'apelativa': 'Apelativa',
        'fatica': 'Fática',
        'poetica': 'Poética',
        'metalinguistica': 'Metalingüística'
    };
    return names[cat] || cat;
}

function enableCatButtons(enable) {
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => btn.disabled = !enable);
}

function finishClassifierGame() {
    const activeCard = document.getElementById('activeCard');
    const feedback = document.getElementById('gameFeedback');
    const resetBtn = document.getElementById('resetGameBtn');
    const cardsLeftSpan = document.getElementById('cardsLeft');

    cardsLeftSpan.textContent = 0;
    activeCard.style.borderColor = 'rgba(253, 232, 208, 0.4)';
    document.getElementById('cardPhraseText').textContent = '🎉 ¡Has clasificado todas las tarjetas!';

    feedback.style.color = 'var(--color-cream)';
    feedback.innerHTML = `Puntuación final: <strong>${aciertos} de ${cardDataset.length} aciertos</strong>.`;

    enableCatButtons(false);
    resetBtn.classList.remove('hidden-btn');
}

function resetClassifierGame() {
    initClassifierGame();
}