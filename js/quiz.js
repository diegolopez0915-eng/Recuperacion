// =========================================================
// QUIZ.JS — Mini práctica de 5 preguntas (Proyecto 2)
// Tema: fundamentos de programación
// =========================================================

const quizData = [
  {
    question: '¿Qué es un algoritmo?',
    options: [
      'Un lenguaje de programación muy difícil',
      'Una lista de pasos ordenados para resolver un problema',
      'Un error que tiene el programa',
      'Una marca de computadora'
    ],
    correct: 1,
    feedback: 'Un algoritmo es una serie de pasos ordenados, como una receta, para resolver un problema.'
  },
  {
    question: 'Para guardar el precio 0.50 de una pupusa, ¿qué tipo de dato usamos?',
    options: [
      'Texto (string)',
      'Booleano (True/False)',
      'Número decimal',
      'Una lista'
    ],
    correct: 2,
    feedback: 'El precio 0.50 es un número decimal. Los textos van entre comillas y los booleanos solo son True o False.'
  },
  {
    question: '¿Para qué sirve un condicional (if)?',
    options: [
      'Para repetir una tarea muchas veces',
      'Para que el programa tome una decisión según una condición',
      'Para guardar datos en una cajita',
      'Para borrar el programa'
    ],
    correct: 1,
    feedback: 'El if permite decidir: «si se cumple esto, haz aquello; si no, haz lo otro».'
  },
  {
    question: 'Si quieres saludar a los 8 clientes de una fila, ¿qué usas?',
    options: [
      'Un ciclo for (sabes cuántas veces repetir)',
      'Un condicional if',
      'Una variable de texto',
      'Nada, se hace solo'
    ],
    correct: 0,
    feedback: 'Usas un ciclo for porque conoces la cantidad exacta de repeticiones (los 8 clientes).'
  },
  {
    question: '¿Qué significa «depurar» (debug) un programa?',
    options: [
      'Hacerlo más bonito',
      'Borrar todo y empezar de nuevo',
      'Buscar y corregir los errores (bugs)',
      'Subirlo a internet'
    ],
    correct: 2,
    feedback: 'Depurar es encontrar y arreglar los errores del programa. ¡Todos los programadores lo hacen!'
  }
];

let qi = 0, score = 0, selected = null, answered = false;
const box = document.getElementById('quiz-box');
const LETTERS = ['A', 'B', 'C', 'D'];

function loadQuestion() {
  if (!box) return;
  if (qi >= quizData.length) { showResults(); return; }

  answered = false; selected = null;
  const q = quizData[qi];
  const progress = (qi / quizData.length) * 100;

  let html = `
    <div class="qz-progress"><div class="qz-progress-fill" style="width:${progress}%"></div></div>
    <div class="qz-top">
      <span>Pregunta ${qi + 1} / ${quizData.length}</span>
      <span class="qz-score-live">Puntaje: ${score}</span>
    </div>
    <p class="qz-question">${q.question}</p>`;

  q.options.forEach((opt, i) => {
    html += `<button class="qz-option" data-i="${i}"><span class="qz-letter">${LETTERS[i]}</span><span>${opt}</span></button>`;
  });

  html += `<div id="qz-fb-slot"></div>
    <button id="qz-next" class="btn btn-glow w-100 mt-3" disabled>
      ${qi === quizData.length - 1 ? 'Ver resultado' : 'Siguiente'} <i class="bi bi-arrow-right ms-2"></i>
    </button>`;

  box.innerHTML = html;

  box.querySelectorAll('.qz-option').forEach(btn => {
    btn.addEventListener('click', function () {
      if (answered) return;
      box.querySelectorAll('.qz-option').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      selected = parseInt(this.dataset.i, 10);
      document.getElementById('qz-next').disabled = false;
    });
  });

  document.getElementById('qz-next').addEventListener('click', () => {
    if (selected === null) return;
    const ok = selected === quizData[qi].correct;
    if (!answered) {
      answered = true;
      box.querySelectorAll('.qz-option').forEach((opt, i) => {
        opt.classList.remove('selected');
        if (i === quizData[qi].correct) opt.classList.add('correct');
        if (i === selected && !ok) opt.classList.add('incorrect');
      });
      if (ok) score++;
      box.querySelector('.qz-score-live').textContent = 'Puntaje: ' + score;
      document.getElementById('qz-fb-slot').innerHTML = `
        <div class="qz-feedback ${ok ? 'ok' : 'no'}">
          <i class="bi ${ok ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i>
          <div><strong>${ok ? '¡Correcto!' : 'Incorrecto'}</strong><br>${quizData[qi].feedback}</div>
        </div>`;
    } else {
      qi++; loadQuestion();
    }
  });
}

function showResults() {
  const total = quizData.length;
  const pct = Math.round((score / total) * 100);
  const offset = 414 - (pct / 100) * 414;

  let msg, icon;
  if (pct === 100) { msg = '¡Perfecto! Dominas los fundamentos de programación. 🚀'; icon = 'bi-trophy-fill'; }
  else if (pct >= 60) { msg = '¡Bien hecho! Ya tienes buena base. Repasa lo que fallaste.'; icon = 'bi-hand-thumbs-up-fill'; }
  else { msg = 'Repasa las secciones y vuelve a intentarlo. ¡Tú puedes!'; icon = 'bi-arrow-repeat'; }

  box.innerHTML = `
    <div class="qz-result">
      <div class="qz-ring">
        <svg width="150" height="150" viewBox="0 0 150 150">
          <defs><linearGradient id="qzGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffb454"/><stop offset="100%" stop-color="#3ddc84"/>
          </linearGradient></defs>
          <circle class="rbg" cx="75" cy="75" r="66"></circle>
          <circle class="rfg" cx="75" cy="75" r="66" data-offset="${offset}"></circle>
        </svg>
        <div class="qz-value">${pct}%</div>
      </div>
      <h4 class="qz-rtitle"><i class="bi ${icon} me-2" style="color:var(--amber)"></i>${score} de ${total} correctas</h4>
      <p class="qz-rmsg">${msg}</p>
      <button id="qz-restart" class="btn-outline-glow"><i class="bi bi-arrow-clockwise me-2"></i>Reintentar quiz</button>
    </div>`;

  const ring = box.querySelector('.rfg');
  if (ring) requestAnimationFrame(() => setTimeout(() => { ring.style.strokeDashoffset = ring.dataset.offset; }, 120));
  document.getElementById('qz-restart').addEventListener('click', () => { qi = 0; score = 0; loadQuestion(); });
}

document.addEventListener('DOMContentLoaded', loadQuestion);
