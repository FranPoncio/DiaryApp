import { describe, it, expect } from "vitest";
import {
  IDEAS, TEMAS_IDEAS, diasDesde, faseDeDia, fechaIdeal, ideasPendientes, ideasAhora, tareaDesdeIdea,
} from "./ideas";
import { BASE } from "./tareas";
import { sinAcentos } from "./formato";

const clave = (s) => sinAcentos(s).toLowerCase().trim();

describe("el catálogo", () => {
  it("no repite títulos entre sí", () => {
    const titulos = IDEAS.map((i) => clave(i.titulo));
    expect(new Set(titulos).size).toBe(titulos.length);
  });

  it("no repite nada del plan de fábrica", () => {
    const base = new Set(BASE.map(([, , , titulo]) => clave(titulo)));
    for (const i of IDEAS) expect(base.has(clave(i.titulo)), i.titulo).toBe(false);
  });

  it("cada idea tiene tema conocido, prioridad válida y detalle", () => {
    const temas = new Set(TEMAS_IDEAS.map((t) => t.id));
    for (const i of IDEAS) {
      expect(temas.has(i.tema), i.titulo).toBe(true);
      expect([1, 2, 3]).toContain(i.prioridad);
      expect(i.detalle.length).toBeGreaterThan(20);
    }
  });

  it("los links son de sitios reales y seguros", () => {
    for (const i of IDEAS.filter((x) => x.link)) expect(i.link).toMatch(/^https:\/\//);
  });
});

describe("diasDesde / faseDeDia", () => {
  it("cuenta los días con signo", () => {
    expect(diasDesde("2026-10-02", "2026-10-12")).toBe(10);
    expect(diasDesde("2026-10-12", "2026-10-12")).toBe(0);
    expect(diasDesde("2026-10-20", "2026-10-12")).toBe(-8);
  });
  it("reparte en las fases de fábrica", () => {
    expect([0, 3, 7, 8, 30, 31, 200].map(faseDeDia)).toEqual(["llegada", "semana", "semana", "mes", "mes", "anio", "anio"]);
  });
});

describe("fechaIdeal", () => {
  it("usa llegada + día cuando todavía no pasó", () => {
    expect(fechaIdeal("2026-10-02", 20, "2026-10-12")).toBe("2026-10-22");
  });
  it("si ese momento ya pasó, es hoy: no nace atrasada", () => {
    expect(fechaIdeal("2026-10-02", 3, "2026-10-12")).toBe("2026-10-12");
  });
});

describe("ideasPendientes", () => {
  it("saca las que ya están, aunque estén escritas con otras mayúsculas o sin acentos", () => {
    const ya = [{ titulo: "PERFIL DE LINKEDIN EN INGLES" }];
    expect(ideasPendientes(IDEAS, ya).some((i) => i.titulo === "Perfil de LinkedIn en inglés")).toBe(false);
    expect(ideasPendientes(IDEAS, ya)).toHaveLength(IDEAS.length - 1);
  });
  it("sin tareas devuelve todas", () => {
    expect(ideasPendientes(IDEAS, [])).toHaveLength(IDEAS.length);
    expect(ideasPendientes(IDEAS, undefined)).toHaveLength(IDEAS.length);
  });
});

describe("ideasAhora", () => {
  it("el primer día solo muestra lo que ya se abrió o está por abrirse", () => {
    const r = ideasAhora(IDEAS, [], 0);
    expect(r.length).toBeGreaterThan(0);
    for (const i of r) expect(i.dia).toBeLessThanOrEqual(14);
  });
  it("ordena por prioridad y después por cuándo viene", () => {
    const r = ideasAhora(IDEAS, [], 0, 50);
    for (let k = 1; k < r.length; k++) {
      const a = r[k - 1], b = r[k];
      expect(a.prioridad < b.prioridad || (a.prioridad === b.prioridad && a.dia <= b.dia)).toBe(true);
    }
  });
  it("respeta el máximo", () => {
    expect(ideasAhora(IDEAS, [], 300, 3)).toHaveLength(3);
  });
  it("antes de viajar cuenta como el día cero", () => {
    expect(ideasAhora(IDEAS, [], -40)).toEqual(ideasAhora(IDEAS, [], 0));
  });
  it("lo que ya está en el plan no se vuelve a sugerir", () => {
    const [primera] = ideasAhora(IDEAS, [], 0);
    expect(ideasAhora(IDEAS, [{ titulo: primera.titulo }], 0).some((i) => i.id === primera.id)).toBe(false);
  });
});

describe("tareaDesdeIdea", () => {
  it("arma una fila lista para insertar, con fecha", () => {
    const idea = IDEAS.find((i) => i.dia === 10 && i.tema === "sponsor");
    const t = tareaDesdeIdea(idea, { grupo_id: "g1", llegada: "2026-10-02", hoy: "2026-10-12" });
    expect(t).toMatchObject({ grupo_id: "g1", fase: "mes", estado: "pendiente", fecha: "2026-10-12" });
    expect(t.titulo).toBe(idea.titulo);
  });
});
