/* Paletas y tipografías de la app. Los colores de cada una viven en `src/styles.css`
   (`html[data-tema="..."]`); acá solo van el nombre, tres muestras para el
   selector y el color de la barra del sistema. Se guarda por celular: cada uno
   elige la suya y no se sincroniza con el grupo, porque es una preferencia, no
   un dato de la cuenta. */

export const TEMAS = [
  { id: "electrico", nombre: "Eléctrico", muestras: ["#0A0C16", "#7C5CFF", "#FF4D8D"], barra: "#0A0C16" },
  { id: "oceano", nombre: "Océano", muestras: ["#06121F", "#2D9CFF", "#22E0B0"], barra: "#06121F" },
  { id: "lima", nombre: "Lima", muestras: ["#0B0C0F", "#C6FF3D", "#FF4D7D"], barra: "#0B0C0F" },
  { id: "noche", nombre: "Noche", muestras: ["#14171C", "#5EE0B0", "#FFB547"], barra: "#14171C" },
  { id: "claro", nombre: "Claro", muestras: ["#F3F4FF", "#5B3DF5", "#E0286E"], barra: "#F3F4FF" },
  { id: "marea", nombre: "Marea", muestras: ["#EAF3F2", "#0E7C86", "#E0482B"], barra: "#EAF3F2" },
  { id: "kiwi", nombre: "Kiwi", muestras: ["#F1F5E8", "#2F6F3E", "#D14343"], barra: "#F1F5E8" },
];

export const TEMA_INICIAL = "electrico";
const CLAVE = "dbd:tema";

export const temaValido = (id) => (TEMAS.some((t) => t.id === id) ? id : TEMA_INICIAL);

export function temaGuardado() {
  try { return temaValido(localStorage.getItem(CLAVE)); }
  catch { return TEMA_INICIAL; }
}

/* Aplica y recuerda. Devuelve el id realmente aplicado, que es el inicial si
   llega uno que no existe (una paleta que se borró, un valor viejo). */
export function aplicarTema(id) {
  const tema = TEMAS.find((t) => t.id === temaValido(id));
  document.documentElement.dataset.tema = tema.id;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", tema.barra);
  try { localStorage.setItem(CLAVE, tema.id); }
  catch { /* sin almacenamiento (modo privado): vale solo hasta cerrar la app */ }
  return tema.id;
}

/* ------------------------------------------------------------- tipografía */

/* Cada fuente se baja de Google Fonts solo cuando se usa (la elegida al
   arrancar, y todas juntas únicamente al abrir el selector, para mostrarlas).
   La política de seguridad (public/_headers) ya deja pasar fonts.googleapis.com
   y fonts.gstatic.com. Los valores de `--fuente` están en src/styles.css. */
export const FUENTES = [
  { id: "geist", nombre: "Geist", familia: "Geist", css: "Geist" },
  { id: "bricolage", nombre: "Bricolage", familia: "Bricolage Grotesque", css: "Bricolage+Grotesque" },
  { id: "jakarta", nombre: "Jakarta", familia: "Plus Jakarta Sans", css: "Plus+Jakarta+Sans" },
  { id: "outfit", nombre: "Outfit", familia: "Outfit", css: "Outfit" },
  { id: "manrope", nombre: "Manrope", familia: "Manrope", css: "Manrope" },
  { id: "sora", nombre: "Sora", familia: "Sora", css: "Sora" },
];

export const FUENTE_INICIAL = "geist";
const CLAVE_FUENTE = "dbd:fuente";

export const fuenteValida = (id) => (FUENTES.some((f) => f.id === id) ? id : FUENTE_INICIAL);

export function fuenteGuardada() {
  try { return fuenteValida(localStorage.getItem(CLAVE_FUENTE)); }
  catch { return FUENTE_INICIAL; }
}

export function cargarFuente(id) {
  const f = FUENTES.find((x) => x.id === fuenteValida(id));
  const marca = `fuente-${f.id}`;
  if (document.getElementById(marca)) return;
  const link = document.createElement("link");
  link.id = marca;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${f.css}:wght@400;500;600;700;800&display=swap`;
  document.head.appendChild(link);
}

export function aplicarFuente(id) {
  const f = FUENTES.find((x) => x.id === fuenteValida(id));
  cargarFuente(f.id);
  document.documentElement.dataset.fuente = f.id;
  try { localStorage.setItem(CLAVE_FUENTE, f.id); }
  catch { /* sin almacenamiento: vale solo hasta cerrar la app */ }
  return f.id;
}
