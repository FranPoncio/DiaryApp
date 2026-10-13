import { toISO, parseISO, sumarDias, sinAcentos } from "./formato";

/* Ideas para sumar al plan. No viven en la base: son un catálogo que la gente
   elige y que al agregarse pasa a ser una fila común de `plan_tareas`, con fecha.

   [tema, día ideal desde la llegada, prioridad, título, detalle, link]

   Dos criterios al escribirlas:
   - Las que dependen de reglas migratorias dicen que se confirmen en la fuente
     oficial y no inventan requisitos ni montos: cambian seguido.
   - Las del plan base (BASE, en tareas.js) no se repiten: lo que sigue es lo que
     el plan de fábrica no cubre — buscar trabajo con sponsor, y vivir allá. */

export const TEMAS_IDEAS = [
  { id: "reconocimiento", nombre: "Reconocimiento y experiencia", sub: "lo que pesa para el sponsor y la residencia" },
  { id: "sponsor", nombre: "Trabajo y sponsor", sub: "para quedarte más allá de la visa" },
  { id: "asentarse", nombre: "Asentarte", sub: "que el día a día ande solo" },
  { id: "conocer", nombre: "Conocer y disfrutar", sub: "para que no sea solo papeleo" },
];

const CATALOGO = [
  // ------------------------------------------------ reconocimiento y experiencia
  // Para quien llega con mucha obra y sin el título: la Green List pide título y
  // NZQA no evalúa carreras incompletas, así que lo que cuenta es probar la
  // experiencia y averiguar si hay un título intermedio.
  ["reconocimiento", 2, 1, "Juntar los comprobantes de tus años de obra",
    "Contratos, recibos de sueldo y constancias de aportes (ANSES / CUIL) de cada empleo. Es la prueba que más pesa para conseguir sponsor y para una residencia por experiencia.", null],
  ["reconocimiento", 4, 1, "Pedir cartas a las empresas donde trabajaste",
    "En papel membretado y firmadas: cargo, fechas, tareas y datos de contacto de quien las firma. Pedilas ya, porque las empresas tardan.", null],
  ["reconocimiento", 7, 2, "Describir cada obra en una página",
    "Longitud, diámetro, tipo de ducto, tu rol y qué resolviste. Te sirve para el CV, para las entrevistas y para cualquier evaluación.", null],
  ["reconocimiento", 7, 1, "Averiguar cuántas materias y qué trabajo final te faltan",
    "Pedile a la facultad el analítico actualizado y qué falta para recibirte. Con eso decidís si terminar el título te conviene.", null],
  ["reconocimiento", 10, 2, "Preguntarle a la facultad por un título intermedio",
    "Algunas carreras entregan un título de técnico a mitad de camino. Preguntá si existe y qué pide.", null],
  ["reconocimiento", 14, 2, "Escribirle a NZQA por tu caso",
    "NZQA no evalúa carreras incompletas. Preguntales si pueden evaluar un título intermedio, para no gastar plata antes de saberlo: qrs@nzqa.govt.nz.",
    "https://www2.nzqa.govt.nz/international/recognise-overseas-qual/iqa/"],
  ["reconocimiento", 21, 1, "Confirmar en INZ la vía de residencia por experiencia",
    "Las reglas de la Skilled Migrant Category cambiaron en 2026 y las fuentes no coinciden en los años que piden. Leé la página oficial y anotá qué exige exactamente.",
    "https://www.immigration.govt.nz/live/resident-visas-to-live-in-new-zealand/skilled-residence-pathways-in-new-zealand/skilled-migrant-category-pathway-to-residence/2026-changes-to-the-skilled-migrant-category-resident-visa/"],
  ["reconocimiento", 30, 2, "Buscar puestos que pidan experiencia y no título",
    "En los avisos de obra civil, ductos o logística de obra, buscá los que piden años de experiencia. Ahí tus años de campo pesan más que el título.", null],
  ["reconocimiento", 30, 3, "Traducir al inglés el analítico y los comprobantes",
    "Para cualquier evaluación te piden documentos en inglés. Preguntá qué traducción y qué legalización aceptan antes de pagarla.", null],
  ["reconocimiento", 90, 1, "Decidir: ¿terminar el título o seguir por experiencia?",
    "Con las respuestas de la facultad, de NZQA y de INZ, elegí el camino. Si terminar el título te abre la Green List, calculá cuánto cuesta y cuánto tarda.", null],

  // ---------------------------------------------------------- trabajo y sponsor
  ["sponsor", 3, 2, "Perfil de LinkedIn en inglés",
    "Titular claro con tu rubro, resumen de tres líneas y una nota de que estás en Nueva Zelanda con visa de trabajo y abierto a sponsor. Los reclutadores buscan por ahí.",
    "https://www.linkedin.com/"],
  ["sponsor", 5, 2, "Carta de presentación base",
    "Una página que puedas adaptar en cinco minutos a cada oferta. Desde la primera línea: cuánto tiempo podés trabajar y que te interesa quedarte.", null],
  ["sponsor", 10, 1, "Lista de 20 empleadores acreditados de tu rubro",
    "Solo un empleador acreditado puede hacerte el sponsor. En immigration.govt.nz buscá la lista oficial («accredited employer list») y filtrá por tu industria y ciudad.",
    "https://www.immigration.govt.nz/"],
  ["sponsor", 14, 2, "Postularte a cinco ofertas esta semana",
    "Hacelo hábito: cinco por semana en Seek, TradeMe Jobs y LinkedIn. Anotá a cuáles aplicaste y cuándo, así sabés a quién seguir.",
    "https://www.seek.co.nz/"],
  ["sponsor", 21, 2, "Escribirle directo a diez empleadores de la lista",
    "Un mail corto a quien contrata: quién sos, qué sabés hacer y que buscás un empleador que pueda hacer sponsor. Muchos puestos no llegan a publicarse."
    , null],
  ["sponsor", 28, 2, "Preparar tu respuesta sobre la visa",
    "En las entrevistas te van a preguntar por tu situación migratoria. Ensayá una respuesta clara: qué visa tenés, hasta cuándo, y que querés un puesto a largo plazo.", null],
  ["sponsor", 45, 2, "Entender cómo es el proceso de sponsor",
    "Leé en immigration.govt.nz qué tiene que cumplir el empleador y qué tenés que cumplir vos. Las reglas cambian seguido: confirmalas siempre en la fuente oficial.",
    "https://www.immigration.govt.nz/"],
  ["sponsor", 60, 3, "Pedir referencias a jefes anteriores",
    "Dos personas que hablen bien de tu trabajo, con mail y teléfono. En Nueva Zelanda es común que las llamen.", null],
  ["sponsor", 90, 2, "Revisar cómo viene la búsqueda",
    "¿Cuántas postulaciones, entrevistas y respuestas? Si no hay entrevistas, cambiá el CV. Si hay y no avanzan, ensayá las entrevistas.", null],
  ["sponsor", 120, 2, "Consultar a un asesor migratorio licenciado",
    "Antes de comprometerte con un empleador, una consulta con un asesor migratorio licenciado cuesta poco comparado con equivocarte de camino.", null],
  ["sponsor", 150, 1, "Ponerle fecha límite a conseguir empleador",
    "Si querés quedarte, el sponsor tiene que estar encaminado con varios meses de margen antes de que venza la visa. Poné una fecha y trabajá hacia atrás.", null],

  // --------------------------------------------------------------- asentarse
  ["asentarse", 3, 3, "Tarjeta de transporte de tu ciudad",
    "Con tarjeta el pasaje sale bastante más barato que en efectivo. Cada ciudad tiene la suya.", null],
  ["asentarse", 4, 2, "Presupuesto mensual en NZD",
    "Alquiler, comida, transporte, teléfono y ahorro. Con eso sabés cuántos meses podés buscar trabajo sin apuro.", null],
  ["asentarse", 6, 2, "Sumarte a grupos de argentinos y de expats",
    "Grupos de Facebook y Meetup de tu ciudad: consejos de alquiler y trabajo, y gente con quien salir. Muchos trabajos salen por contactos.",
    "https://www.meetup.com/"],
  ["asentarse", 10, 3, "Comparar internet y plan de datos",
    "Si te vas a quedar meses, un plan fijo suele convenir más que el prepago.", null],
  ["asentarse", 12, 2, "Seguro para tus cosas del alquiler",
    "Cubre lo tuyo si hay un robo o un daño. Es barato y evita sustos.", null],
  ["asentarse", 30, 2, "Fondo de emergencia de dos meses",
    "Separá el equivalente a dos meses de gastos en una cuenta aparte. Es lo que te permite esperar un buen trabajo en vez de aceptar el primero.", null],

  // ------------------------------------------------------ conocer y disfrutar
  ["conocer", 5, 3, "Elegir tus tres lugares del barrio",
    "Un café, una plaza y un lugar para comer barato. Tener tus lugares hace que te sientas en casa más rápido.", null],
  ["conocer", 10, 3, "Plan de fin de semana: una playa o un cerro cerca",
    "Algo gratis y cercano para despejar la cabeza entre trámites.", null],
  ["conocer", 14, 3, "Probar un deporte o un club local",
    "Rugby, running, fútbol, escalada. Es la forma más rápida de conocer gente de acá.", null],
  ["conocer", 21, 3, "Ir a un mercado de productos frescos",
    "Los fines de semana hay mercados en casi todas las ciudades. Comida buena y más barata que en el súper.", null],
  ["conocer", 30, 3, "Primera escapada de fin de semana",
    "Un finde en otra parte del país. Mirá alojamiento barato (hostels, camping) y armalo con tiempo.", null],
  ["conocer", 45, 3, "Una caminata de día completo",
    "Los parques nacionales tienen senderos para todos los niveles. Mirá el estado de los senderos en doc.govt.nz antes de ir.",
    "https://www.doc.govt.nz/"],
  ["conocer", 60, 3, "Cena argentina con gente nueva",
    "Invitá a quienes fuiste conociendo. Es la forma más fácil de armar vínculos.", null],
  ["conocer", 75, 3, "Ir a un evento local del mes",
    "Buscá qué hay: música, comida, deportes. Casi siempre hay algo gratis.", null],
];

export const IDEAS = CATALOGO.map(([tema, dia, prioridad, titulo, detalle, link], i) => ({
  id: `${tema}-${i}`, tema, dia, prioridad, titulo, detalle, link,
}));

const clave = (s) => sinAcentos(String(s)).toLowerCase().trim();

const MS_DIA = 86_400_000;

/* Días desde la llegada: negativo si todavía no viajaron. Con strings ISO
   (YYYY-MM-DD) para no depender de la hora ni de la zona del celular. */
export const diasDesde = (llegadaISO, hoyISO) =>
  Math.round((Date.parse(hoyISO) - Date.parse(llegadaISO)) / MS_DIA);

/* En qué fase del plan cae una idea según su día. Misma división que las
   fases de fábrica: llegada, primera semana, primer mes, resto del año. */
export const faseDeDia = (dia) => (dia <= 0 ? "llegada" : dia <= 7 ? "semana" : dia <= 30 ? "mes" : "anio");

/* La fecha en que conviene hacerla, o hoy si ese momento ya pasó: agregar
   una idea un mes tarde no tiene que crear una tarea atrasada de entrada. */
export function fechaIdeal(llegadaISO, dia, hoyISO) {
  const ideal = toISO(sumarDias(parseISO(llegadaISO), dia));
  return ideal < hoyISO ? hoyISO : ideal;
}

/* Las que todavía no están en el plan. Se compara por título sin acentos ni
   mayúsculas, así no se duplica algo que ya escribiste a tu manera. */
export function ideasPendientes(ideas, tareas) {
  const existentes = new Set((tareas || []).map((t) => clave(t.titulo)));
  return ideas.filter((i) => !existentes.has(clave(i.titulo)));
}

/* Lo que conviene sumar ahora: las que ya se abrieron o están por abrirse (14
   días de margen), primero las de más prioridad y, a igual prioridad, las que
   vienen antes. Antes de viajar cuenta como el día cero. */
export function ideasAhora(ideas, tareas, diasLlegada, max = 5) {
  const dias = Math.max(0, diasLlegada);
  return ideasPendientes(ideas, tareas)
    .filter((i) => i.dia <= dias + 14)
    .sort((a, b) => a.prioridad - b.prioridad || a.dia - b.dia)
    .slice(0, max);
}

export const tareaDesdeIdea = (idea, { grupo_id, llegada, hoy }) => ({
  grupo_id,
  fase: faseDeDia(idea.dia),
  prioridad: idea.prioridad,
  titulo: idea.titulo,
  detalle: idea.detalle,
  link: idea.link,
  fecha: fechaIdeal(llegada, idea.dia, hoy),
  origen: "base",
  estado: "pendiente",
});
