# 💻 CodeMentor IA — Proyecto 2

**«Aprende programación con tu tutor de IA»** · Recuperación Extraordinaria 3DS «B»

Página web educativa de una sola pantalla con un **tutor de IA** que enseña a programar desde cero: algoritmos, variables, condicionales, ciclos, funciones y cómo cazar errores. Con ejemplos bien salvadoreños 🇸🇻

---

## 🎯 Qué cumple de la rúbrica (100 pts)

| Criterio de la rúbrica | Cómo lo cumple esta página | Pts |
|---|---|---|
| **Tutor de IA funcionando** | Chat flotante «Profe IA» conectado a Groq que responde dudas de programación con pistas, no con respuestas regaladas | 30 |
| **Contenido claro (mín. 4 secciones)** | 4 secciones: (1) Qué es programar y algoritmo, (2) Variables y tipos de datos, (3) Condicionales y ciclos, (4) Funciones y depuración — con ejemplos de pupusería, bus y tienda | 25 |
| **Mini práctica** | Quiz de 5 preguntas con corrección + reto «Arregla el error» que la IA revisa y da pistas por niveles | 15 |
| **Diseño y publicación** | Responsive (se ve bien en celular), listo para GitHub Pages, repositorio ordenado | 15 |
| **Defensa oral** | (La haces vos) — al final de este README tienes un guión de 3 minutos | 15 |

---

## 🗂️ Contenido (las 4 secciones)

1. **¿Qué es programar y qué es un algoritmo?** — dar órdenes paso a paso; un algoritmo es como la receta de las pupusas.
2. **Variables y tipos de datos** — cajitas con nombre; números, texto, booleanos y listas.
3. **Condicionales y ciclos** — `if/else` para decidir; `for` y `while` para repetir.
4. **Funciones y cómo encontrar errores** — reutilizar código con `def` y pasos para depurar bugs.

**Mini práctica:** reto «Arregla el error» (la IA te da pistas por niveles y revisa tu corrección) + quiz de 5 preguntas con puntaje.

---

## 🛠️ Tecnologías

- **HTML5**, **CSS3** (tema de editor de código, animaciones), **Bootstrap 5** (responsive)
- **JavaScript** (animaciones, quiz, conexión con la IA)
- **Groq API** con el modelo `openai/gpt-oss-120b`

---

## 📂 Estructura

```
proyecto2/
├── index.html          ← debe quedar en la RAÍZ del repo
├── .nojekyll           ← obligatorio para GitHub Pages
├── css/
│   └── styles.css
├── js/
│   ├── config.js       ← aquí va la API Key
│   ├── main.js
│   ├── quiz.js
│   └── tutor.js
└── README.md
```

---

## 🔑 La clave de la IA

La clave ya viene puesta en `js/config.js` para que el chat funcione apenas publiques. Como GitHub Pages es un sitio **estático** (sin servidor), la clave va en el código del navegador.

```js
window.CONFIG = {
  GROQ_API_KEY: "tu-clave-de-groq",
  GROQ_MODEL: "openai/gpt-oss-120b",
  GROQ_URL: "https://api.groq.com/openai/v1/chat/completions"
};
```

> ⚠️ **Para la defensa, aclara esto:** en un proyecto real la clave NO se deja en el código público; se guarda como variable de entorno en un servidor (Render o Netlify Functions). Aquí se incluye solo porque es una demostración educativa. Si la clave se gasta, genera otra gratis en [console.groq.com](https://console.groq.com) y reemplázala en `js/config.js`.

---

# 🌐 CÓMO SUBIRLO A GITHUB PAGES (paso a paso)

Como lo vas a publicar en **tu GitHub Pages**, seguí esta guía. La parte más importante: **el contenido de la carpeta `proyecto2` debe quedar en la raíz del repositorio**, no la carpeta dentro de otra carpeta.

## ✅ Antes de empezar

1. Tener cuenta en [github.com](https://github.com).
2. Descomprimir el `.zip` que te entregué. Adentro está la carpeta `proyecto2` con todos los archivos.

---

## Método A — GitHub Desktop (recomendado, sube carpetas completas)

> 💡 El «arrastrar y soltar» de la web de GitHub **solo sube archivos sueltos, no carpetas**. Por eso, para que suba las carpetas `css` y `js` completas, usa GitHub Desktop.

1. Instala **GitHub Desktop** desde [desktop.github.com](https://desktop.github.com).
2. Inicia sesión con tu cuenta de GitHub.
3. Menú **File → New repository**:
   - **Name:** `proyecto2-codementor` (o el nombre que quieras)
   - **Local path:** elige una carpeta de tu compu
   - Clic en **Create repository**
4. Abre en el explorador la carpeta que acabas de crear y **copia adentro TODO el contenido de `proyecto2`** (el `index.html`, `.nojekyll`, y las carpetas `css` y `js`). ⚠️ Copia el **contenido**, no la carpeta `proyecto2` entera.
5. Vuelve a GitHub Desktop: verás los archivos listados. Abajo escribe un resumen (ej: `Proyecto 2 CodeMentor IA`) y clic en **Commit to main**.
6. Arriba clic en **Publish repository**. Desmarca «Keep this code private» para que sea **público** (obligatorio para Pages gratis). Clic en **Publish repository**.

---

## Método B — Con la terminal (si ya usas Git)

Abre la terminal **dentro de la carpeta `proyecto2`** y ejecuta:

```bash
git init
git add .
git commit -m "Proyecto 2: CodeMentor IA"
git branch -M main
# ⚠️ cambia «tu-usuario» por tu usuario real de GitHub
git remote add origin https://github.com/tu-usuario/proyecto2-codementor.git
git push -u origin main
```

Si te pide contraseña, usa un **Personal Access Token**: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → marca `repo` → cópialo y úsalo como contraseña.

---

## 📌 Activar GitHub Pages (los dos métodos terminan aquí)

1. Entra a tu repositorio en github.com.
2. Pestaña **Settings** (⚙️).
3. Menú lateral → **Pages**.
4. En **Source** elige **Deploy from a branch**.
5. En **Branch** selecciona **`main`** y carpeta **`/ (root)`** → **Save**.
6. Espera 1 a 3 minutos y recarga. Aparecerá tu enlace:
   ```
   ✅ Your site is live at https://tu-usuario.github.io/proyecto2-codementor/
   ```
7. ¡Ese enlace es el que entregas al profe! 🎉

---

## 🔍 Tu repositorio debe verse así (MUY importante)

```
proyecto2-codementor/
├── index.html        ← en la raíz, NO dentro de otra carpeta
├── .nojekyll
├── css/styles.css
├── js/config.js, main.js, quiz.js, tutor.js
└── README.md
```

Si ves `proyecto2-codementor/proyecto2/index.html` (una carpeta de más), el sitio dará **error 404**. Solución: mueve todo el contenido a la raíz.

---

## 🐛 Solución de problemas

| Problema | Causa | Solución |
|---|---|---|
| **Error 404** | `index.html` no está en la raíz | Muévelo a la raíz del repo |
| **Se ve sin estilos** | No subió la carpeta `css` | Usa GitHub Desktop (el drag-and-drop no sube carpetas) |
| **El chat no responde** | Clave gastada o inválida | Genera otra en console.groq.com y cámbiala en `js/config.js` |
| **Faltan animaciones** | No subió la carpeta `js` | Vuelve a subir con GitHub Desktop |
| **La página no cambia** | Caché del navegador | Recarga con `Ctrl + Shift + R` |
| **En Windows no ves `.nojekyll`** | Es un archivo oculto | Activa «Elementos ocultos» en el Explorador |

---

## 🎙️ Guión para tu defensa oral (3 minutos)

1. **Qué hace (30 s):** «Mi página enseña a programar desde cero con un tutor de IA. Tiene 4 secciones, un quiz y un reto para arreglar errores.»
2. **Demo (60 s):** abre la página, recorre una sección, abre el chat y haz una pregunta en vivo (ej: *¿qué es una variable?*), y muestra el reto «Arregla el error».
3. **Cómo funciona la IA (60 s):** «El chat envía mi pregunta a Groq con un *prompt* que le dice que sea un profe paciente, que use ejemplos salvadoreños y que nunca regale el código completo, solo pistas.»
4. **Decisiones (30 s):** «Elegí un diseño tipo editor de código, Groq porque es gratis y rápido, y GitHub Pages para publicarlo.»

**2 preguntas que te pueden hacer:**
- *¿Por qué la clave no debería ir en el código?* → Porque cualquiera la puede ver y usar; en producción va en el servidor como variable de entorno.
- *¿Qué es un algoritmo?* → Una lista de pasos ordenados para resolver un problema, como una receta.

---

## 📚 Créditos

- **Institución:** INDEL — Instituto Nacional Cantón Lourdes
- **Sección:** 3DS «B» · BTV Desarrollo de Software
- **Docente:** Prof. Javier Mineros
- **Proyecto 2:** Aprende programación (Python, C#, PHP y web)

_Hecho con 💙 para aprender a programar._
