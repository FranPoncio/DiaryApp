import { useState, useEffect } from "react";
import {
  TEMAS, TEMA_INICIAL, aplicarTema,
  FUENTES, FUENTE_INICIAL, aplicarFuente, cargarFuente,
} from "../lib/temas";

/* Se aplica al tocar, sin botón de "guardar": ver cómo queda es la forma de
   elegir. Es por celular, y la pantalla lo dice para que nadie piense que le
   está cambiando el estilo al resto. */

export default function ElegirTema({ onCerrar }) {
  const [tema, setTema] = useState(document.documentElement.dataset.tema || TEMA_INICIAL);
  const [fuente, setFuente] = useState(document.documentElement.dataset.fuente || FUENTE_INICIAL);

  // Para mostrar cada nombre en su propia letra hay que tenerlas todas cargadas.
  useEffect(() => { FUENTES.forEach((f) => cargarFuente(f.id)); }, []);

  return (
    <div className="sheet-fondo" onClick={onCerrar}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-asa" />
        <h2 className="hoy-tit">Estilo</h2>

        <p className="etiqueta">Colores</p>
        <div className="temas">
          {TEMAS.map((t) => (
            <button key={t.id} className={`tema ${tema === t.id ? "on" : ""}`}
              aria-pressed={tema === t.id} onClick={() => setTema(aplicarTema(t.id))}>
              <span className="tema-muestras" aria-hidden="true">
                {t.muestras.map((c) => <i key={c} style={{ background: c }} />)}
              </span>
              <span className="tema-nombre">{t.nombre}</span>
            </button>
          ))}
        </div>

        <p className="etiqueta">Tipografía</p>
        <div className="fuentes">
          {FUENTES.map((f) => (
            <button key={f.id} className={`fuente ${fuente === f.id ? "on" : ""}`}
              aria-pressed={fuente === f.id} onClick={() => setFuente(aplicarFuente(f.id))}>
              <span className="fuente-ej" style={{ fontFamily: `'${f.familia}', system-ui, sans-serif` }}>$1.250,40</span>
              <span className="fuente-nombre">{f.nombre}</span>
            </button>
          ))}
        </div>

        <p className="chico">Se elige en cada celular: lo que cambies acá no les cambia el estilo a los demás.</p>
        <button className="btn" onClick={onCerrar}>Listo</button>
      </div>
    </div>
  );
}
