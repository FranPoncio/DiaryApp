import { useState } from "react";
import { TEMAS, TEMA_INICIAL, aplicarTema } from "../lib/temas";

/* Se aplica al tocar, sin botón de "guardar": ver cómo queda es la forma de
   elegir. Es por celular, y la pantalla lo dice para que nadie piense que le
   está cambiando los colores al resto. */

export default function ElegirTema({ onCerrar }) {
  const [actual, setActual] = useState(document.documentElement.dataset.tema || TEMA_INICIAL);

  return (
    <div className="sheet-fondo" onClick={onCerrar}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-asa" />
        <h2 className="hoy-tit">Colores</h2>

        <div className="temas">
          {TEMAS.map((t) => (
            <button key={t.id} className={`tema ${actual === t.id ? "on" : ""}`}
              aria-pressed={actual === t.id} onClick={() => setActual(aplicarTema(t.id))}>
              <span className="tema-muestras" aria-hidden="true">
                {t.muestras.map((c) => <i key={c} style={{ background: c }} />)}
              </span>
              <span className="tema-nombre">{t.nombre}</span>
            </button>
          ))}
        </div>

        <p className="chico">Se elige en cada celular: lo que cambies acá no les cambia los colores a los demás.</p>
        <button className="btn" onClick={onCerrar}>Listo</button>
      </div>
    </div>
  );
}
