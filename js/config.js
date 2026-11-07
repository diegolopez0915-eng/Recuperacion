// =========================================================
// CONFIG.JS — Configuración del tutor de IA
// Proyecto 2 · «Aprende programación con tu tutor de IA»
// =========================================================
//
//  ℹ️  Como esta página se publica en GitHub Pages (que es 100% estático,
//     sin servidor), la clave de la IA se coloca aquí para que el chat
//     funcione directo desde el navegador.
//
//  ⚠️  EN UN PROYECTO REAL la clave NUNCA debe quedar expuesta: se guarda
//     como variable de entorno en un servidor (Render / Netlify Functions).
//     Para esta recuperación es solo una demostración educativa.
//
//  🔁  Si la clave deja de servir: entra a https://console.groq.com,
//     genera una nueva y reemplázala en la línea de abajo.
// =========================================================

window.CONFIG = {
  GROQ_API_KEY: "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",

  // Modelo disponible en Groq para esta cuenta.
  // Alternativas: "openai/gpt-oss-20b", "llama-3.3-70b-versatile" (si está activo).
  GROQ_MODEL: "openai/gpt-oss-120b",

  GROQ_URL: "https://api.groq.com/openai/v1/chat/completions"
};
