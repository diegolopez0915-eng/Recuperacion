// =========================================================
// TUTOR.JS — Chat con IA (Groq) + ejercicio «Arregla el error»
// Proyecto 2 · CodeMentor IA
// =========================================================

const CFG = window.CONFIG || {};

// ── Personalidad del tutor (prompt del sistema) ───────────────
const SYSTEM_PROMPT = `
Eres «Profe IA», un tutor de programación para estudiantes de bachillerato de El Salvador (Proyecto 2: «Aprende programación»). Trabajas en la startup educativa EduIA.

TU TEMA (solo hablas de esto):
1. Qué es programar y qué es un algoritmo.
2. Variables y tipos de datos (números, texto, booleanos, listas).
3. Condicionales (if/else) y ciclos (for, while).
4. Funciones y cómo encontrar y corregir errores (depurar).
Lenguajes de referencia: Python (principal), también C#, PHP y web (HTML/CSS/JS).

TU MÉTODO (muy importante):
- NUNCA das el código completo de una vez. Das UNA pista, esperas la respuesta del estudiante y celebras sus avances.
- Hablas en español claro y sencillo, con ejemplos de El Salvador (pupuserías, tiendas de barrio, el bus, distribuidoras).
- Eres paciente y motivador: nunca te burlas de un error, lo usas para enseñar.
- Respuestas breves: de 3 a 7 líneas, salvo que pidan más.
- Si muestras algo de código, que sea un fragmento pequeño para ilustrar, no la solución completa del ejercicio.
- Si la pregunta NO es de programación, respondes amable: «Eso ya es otro tema. Yo te ayudo con programación: ¿quieres que repasemos variables, ciclos, funciones o errores?».
- No expliques tu razonamiento interno: entrega solo la respuesta final, directa y amable.
`;

const chatMessages = document.getElementById('chat-messages');
const chatInput    = document.getElementById('chat-input');
const chatSend     = document.getElementById('chat-send');
const fixInput     = document.getElementById('fix-input');
const btnRevisar   = document.getElementById('btn-revisar');
const btnPista     = document.getElementById('btn-pista');
const fixResult    = document.getElementById('fix-result');

// ── Utilidades de chat ────────────────────────────────────
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
// Convierte `texto` en <code> y respeta saltos de línea, escapando el resto.
function format(text) {
  const safe = escapeHtml(text);
  return safe.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\n/g, '<br>');
}

function addMessage(text, isUser = false) {
  const div = document.createElement('div');
  div.className = 'msg ' + (isUser ? 'user' : 'bot');
  div.innerHTML = isUser ? escapeHtml(text) : format(text);
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}
function addTyping() {
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.innerHTML = '<span class="typing"><span></span><span></span><span></span></span>';
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

// ── Llamada a Groq ─────────────────────────────────────
async function askAI(userMessage, systemPrompt = SYSTEM_PROMPT) {
  if (!CFG.GROQ_API_KEY || CFG.GROQ_API_KEY.includes('PEGA')) {
    return '⚠️ Falta configurar la API Key en js/config.js.';
  }
  try {
    const res = await fetch(CFG.GROQ_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + CFG.GROQ_API_KEY },
      body: JSON.stringify({
        model: CFG.GROQ_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 2048
      })
    });
    if (!res.ok) {
      if (res.status === 401) return 'La API Key no es válida o fue revocada. Genera una nueva en console.groq.com.';
      if (res.status === 404) return 'El modelo configurado no está disponible en esta cuenta.';
      if (res.status === 429) return 'Se alcanzó el límite de uso por ahora. Espera un momento e intenta de nuevo.';
      return 'Hubo un error al conectar con el tutor. Revisa tu conexión e intenta otra vez.';
    }
    const data = await res.json();
    const m = data.choices && data.choices[0] && data.choices[0].message;
    return (m && m.content && m.content.trim()) ||
           (m && m.reasoning && m.reasoning.trim()) ||
           'No pude generar una respuesta. Intenta reformular tu pregunta.';
  } catch (e) {
    console.error(e);
    return 'Hubo un error al conectar con el tutor. Revisa tu conexión e intenta otra vez.';
  }
}

// ── Enviar mensaje del chat ────────────────────────────
async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, true);
  chatInput.value = '';
  chatSend.disabled = true;
  const typing = addTyping();
  const reply = await askAI(text);
  typing.remove();
  addMessage(reply);
  chatSend.disabled = false;
  chatInput.focus();
}
if (chatSend && chatInput) {
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
}

// ── Ejercicio «Arregla el error» ───────────────────────────
const BUGGY_CODE = `def cobrar(cantidad, precio)
    total = cantidad * precio
    return total

print(cobrar(4, 0.50))`;

// El bug: falta el símbolo «:» al final de la línea «def cobrar(...)».

let pistaNivel = 0;

if (btnPista && fixResult) {
  btnPista.addEventListener('click', async () => {
    pistaNivel++;
    btnPista.disabled = true;
    fixResult.innerHTML = '<div class="text-muted d-flex align-items-center gap-2"><span class="typing"><span></span><span></span><span></span></span> Pensando una pista...</div>';
    const prompt = `Un estudiante intenta arreglar este código Python que tiene UN error de sintaxis (falta el símbolo dos puntos ":" al final de la línea del def):\n\n${BUGGY_CODE}\n\nEsta es la pista número ${pistaNivel}. Dale SOLO una pista de nivel ${pistaNivel} (nivel 1 = muy general, nivel 2 = más específica sobre la línea, nivel 3 = casi señala el símbolo que falta). NUNCA escribas el código ya corregido. Máximo 3 líneas.`;
    const reply = await askAI(prompt);
    fixResult.innerHTML = `<div class="ai-card"><div class="ai-head"><i class="bi bi-lightbulb-fill"></i> Pista ${pistaNivel}</div><div>${format(reply)}</div></div>`;
    btnPista.disabled = false;
  });
}

if (btnRevisar && fixInput && fixResult) {
  btnRevisar.addEventListener('click', async () => {
    const intento = fixInput.value.trim();
    if (!intento) {
      fixResult.innerHTML = '<div class="qz-feedback no"><i class="bi bi-exclamation-circle-fill"></i><div>Escribe primero tu versión corregida o explica qué está mal.</div></div>';
      return;
    }
    btnRevisar.disabled = true;
    fixResult.innerHTML = '<div class="text-muted d-flex align-items-center gap-2"><span class="typing"><span></span><span></span><span></span></span> Revisando tu respuesta...</div>';
    const prompt = `Código original con error (falta el símbolo ":" al final de la línea del def):\n${BUGGY_CODE}\n\nEl estudiante respondió:\n"${intento}"\n\nEvalúa si corrigió bien el error. Responde así:\n1) Empieza con «✅ ¡Correcto!» si ya puso los dos puntos ":" en la línea del def, o con «⚠️ Aún no» si no.\n2) Explica en 1-2 líneas por qué, de forma amable y motivadora.\n3) Si aún no lo logra, dale UNA pista extra sin escribir el código completo. Celebra su esfuerzo.`;
    const reply = await askAI(prompt);
    const ok = /correcto|✅/i.test(reply);
    fixResult.innerHTML = `<div class="ai-card" style="border-color:${ok ? 'rgba(61,220,132,0.4)' : 'rgba(255,180,84,0.4)'}"><div class="ai-head" style="color:${ok ? 'var(--green)' : 'var(--amber)'}"><i class="bi ${ok ? 'bi-check-circle-fill' : 'bi-robot'}"></i> Revisión del Profe IA</div><div>${format(reply)}</div></div>`;
    btnRevisar.disabled = false;
  });
}
