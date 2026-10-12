import { useState, useMemo } from "react";
import { IDEAS, TEMAS_IDEAS, ideasPendientes, ideasAhora, tareaDesdeIdea, diasDesde } from "../lib/ideas";
import { PRIORIDADES } from "../lib/tareas";
import { hoyISO } from "../lib/formato";

/* Catálogo de tareas que conviene sumar al plan. Agregar una la convierte en una
   tarea común, con fecha: desde ahí se mueve, se marca o se borra como cualquier
   otra. "Conviene ahora" ordena por prioridad y por cuándo se abre cada una. */

function Idea({ idea, agregando, onAgregar }) {
  const prioridad = PRIORIDADES.find((p) => p.id === idea.prioridad)?.nombre;
  return (
    <article className="idea">
      <div className="idea-txt">
        <p className="idea-t">{idea.titulo}</p>
        <p className="idea-d">{idea.detalle}</p>
        <p className="idea-m">
          Prioridad {prioridad.toLowerCase()} · {idea.dia <= 0 ? "al llegar" : `hacia el día ${idea.dia}`}
        </p>
      </div>
      <button className="idea-mas" disabled={agregando} onClick={() => onAgregar([idea])}>+ Agregar</button>
    </article>
  );
}

export default function Ideas({ grupo_id, fechaLlegada, tareas, onAgregar, onCerrar }) {
  const [agregando, setAgregando] = useState(false);
  const [abierto, setAbierto] = useState({});
  const hoy = hoyISO();

  const pendientes = useMemo(() => ideasPendientes(IDEAS, tareas), [tareas]);
  const ahora = useMemo(
    () => ideasAhora(IDEAS, tareas, diasDesde(fechaLlegada, hoy)),
    [tareas, fechaLlegada, hoy]
  );
  const idsAhora = new Set(ahora.map((i) => i.id));

  // De a una y esperando cada respuesta: si una falla (sin señal, por ejemplo),
  // se corta ahí y no quedan a medias las que venían después.
  const agregar = async (lista) => {
    setAgregando(true);
    for (const idea of lista) {
      const ok = await onAgregar(tareaDesdeIdea(idea, { grupo_id, llegada: fechaLlegada, hoy }));
      if (!ok) break;
    }
    setAgregando(false);
  };

  return (
    <div className="sheet-fondo" onClick={onCerrar}>
      <div className="sheet ideas" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-asa" />
        <h2 className="hoy-tit">Ideas para tu plan</h2>
        <p className="chico ideas-intro">
          Tareas que conviene sumar, con la fecha en que sirven. Al agregarlas quedan en tu plan como
          cualquier otra.
        </p>

        {pendientes.length === 0 && <p className="vacio">Ya tenés todas las ideas en tu plan.</p>}

        {ahora.length > 0 && (
          <section className="ideas-bloque">
            <div className="ideas-cab">
              <h3 className="hoy-tit">Conviene ahora</h3>
              <button className="link" disabled={agregando} onClick={() => agregar(ahora)}>
                Agregar estas {ahora.length}
              </button>
            </div>
            {ahora.map((i) => <Idea key={i.id} idea={i} agregando={agregando} onAgregar={agregar} />)}
          </section>
        )}

        {TEMAS_IDEAS.map((tema) => {
          const items = pendientes.filter((i) => i.tema === tema.id && !idsAhora.has(i.id));
          if (!items.length) return null;
          const abierta = !!abierto[tema.id];
          return (
            <section key={tema.id} className="ideas-bloque">
              <button className="bloque-cab ideas-tema" aria-expanded={abierta}
                onClick={() => setAbierto((a) => ({ ...a, [tema.id]: !a[tema.id] }))}>
                <span>{tema.nombre} <span className="chico">· {tema.sub}</span></span>
                <span className="bloque-n">{items.length} {abierta ? "▾" : "▸"}</span>
              </button>
              {abierta && items.map((i) => <Idea key={i.id} idea={i} agregando={agregando} onAgregar={agregar} />)}
            </section>
          );
        })}

        <button className="btn" onClick={onCerrar}>Listo</button>
      </div>
    </div>
  );
}
