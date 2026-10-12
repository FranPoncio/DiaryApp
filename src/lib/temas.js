/* Paletas de la app. Los colores de cada una viven en `src/styles.css`
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
