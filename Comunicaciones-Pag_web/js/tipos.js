// Desplegable de detalles
function toggleAccordion(id) {
    const content = document.getElementById(id);
    if (content) {
        content.classList.toggle('open');
    }
}

// Identificador de estilo
function identifyStyle() {
    const select = document.getElementById('responseSelect');
    const result = document.getElementById('styleResult');
    if (!select || !result) return;

    const val = select.value;
    const data = {
        'asertiva': '✨ **Comunicación Asertiva**: Mantiene la templanza, propone soluciones basadas en hechos y busca preservar el objetivo común con respeto.',
        'pasiva': '🛡️ **Comunicación Pasiva**: Sacrifica la equidad y la verdad propia para neutralizar temporalmente la tensión del entorno.',
        'agresiva': '💥 **Comunicación Agresiva**: Abusa del poder relacional para dominar la situación ignorando la integridad de los demás.',
        'pasivo-agresiva': '🎭 **Comunicación Pasivo-Agresiva**: Expresa el desacuerdo de manera implícita o sabotaje discreto sin asumir la responsabilidad frontal.',
        'agresivo-pasiva': '⚡ **Comunicación Agresivo-Pasiva**: Exhibe descontrol impulsivo inmediato seguido de una retractación por victimización.'
    };

    result.innerHTML = data[val] || 'Selecciona una opción arriba para evaluar la actitud comunicativa.';
}

/* ===================================================
   JUEGO MULTINIVEL DE SIMULACIÓN
=================================================== */

const scenarios = [
    {
        question: "Un cliente exige airadamente un reembolso injustificado en público. ¿Cuál sería la respuesta ASERTIVA?",
        options: [
            { text: "Gritar de vuelta para demostrar que el negocio se respeta.", style: "agresiva" },
            { text: "Escuchar con calma, validar su malestar y explicar amablemente la política aplicable.", style: "asertiva" },
            { text: "Devolver el dinero inmediatamente de tu bolsillo para que no haga ruido.", style: "pasiva" },
            { text: "Sonreír, darle el dinero y luego hablar mal de él con otros clientes.", style: "pasivo-agresiva" }
        ],
        correctStyle: "asertiva",
        explanation: "La asertividad valida la emoción del interlocutor sin ceder en los límites o normas operativas."
    },
    {
        question: "Tu compañero de proyecto olvida su parte del trabajo. En la reunión dices: 'Tranquilos, no pasa nada... yo lo hago solo en la noche (aunque estás hirviendo de rabia)'. ¿Qué estilo es?",
        options: [
            { text: "Pasivo", style: "pasiva" },
            { text: "Asertivo", style: "asertiva" },
            { text: "Agresivo", style: "agresiva" },
            { text: "Agresivo-Pasivo", style: "agresivo-pasiva" }
        ],
        correctStyle: "pasiva",
        explanation: "Asumir la carga ajena ocultando el malestar legítimo es una conducta sumisa o pasiva."
    },
    {
        question: "Durante un debate académico, alguien dice: '¡Eres un incompetente! Pero bueno, qué se puede esperar de ti... en fin, haz lo que quieras ya ni me importa.' ¿Qué estilo representa?",
        options: [
            { text: "Pasivo-Agresivo", style: "pasivo-agresiva" },
            { text: "Agresivo-Pasivo", style: "agresivo-pasiva" },
            { text: "Asertivo", style: "asertiva" },
            { text: "Pasivo", style: "pasiva" }
        ],
        correctStyle: "agresivo-pasiva",
        explanation: "Comienza con un ataque agresivo directo y se retira bruscamente hacia una actitud pasiva/evasiva."
    }
];

let currentStep = 0;
let score = 0;

function loadGameScenario() {
    const currentData = scenarios[currentStep];
    const scenarioText = document.getElementById('scenarioText');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedback = document.getElementById('gameFeedback');
    const nextBtn = document.getElementById('nextBtn');
    const currentLevelSpan = document.getElementById('currentLevel');

    if (!scenarioText || !optionsContainer) return;

    currentLevelSpan.textContent = currentStep + 1;
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
    const currentData = scenarios[currentStep];
    const feedback = document.getElementById('gameFeedback');
    const nextBtn = document.getElementById('nextBtn');
    const scoreSpan = document.getElementById('score');

    document.querySelectorAll('.game-btn').forEach(b => b.disabled = true);

    if (selectedOpt.style === currentData.correctStyle) {
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

    if (currentStep < scenarios.length - 1) {
        nextBtn.classList.remove('hidden-btn');
    } else {
        nextBtn.textContent = 'Reiniciar Juego 🔄';
        nextBtn.onclick = resetGame;
        nextBtn.classList.remove('hidden-btn');
    }
}

function nextQuestion() {
    currentStep++;
    loadGameScenario();
}

function resetGame() {
    currentStep = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.textContent = 'Siguiente Escenario →';
    nextBtn.onclick = nextQuestion;
    loadGameScenario();
}

document.addEventListener('DOMContentLoaded', () => {
    loadGameScenario();
});