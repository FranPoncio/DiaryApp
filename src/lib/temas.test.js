import { describe, it, expect } from "vitest";
import { TEMAS, TEMA_INICIAL, temaValido, FUENTES, FUENTE_INICIAL, fuenteValida } from "./temas";

describe("temas", () => {
  it("un id conocido se respeta", () => {
    expect(temaValido("marea")).toBe("marea");
  });

  it("un valor que no existe cae en el de fábrica, no rompe", () => {
    expect(temaValido("borrado")).toBe(TEMA_INICIAL);
    expect(temaValido(null)).toBe(TEMA_INICIAL);
    expect(temaValido(undefined)).toBe(TEMA_INICIAL);
  });

  it("no hay ids repetidos y el de fábrica está en la lista", () => {
    const ids = TEMAS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain(TEMA_INICIAL);
  });

  it("cada paleta trae tres muestras y un color para la barra", () => {
    for (const t of TEMAS) {
      expect(t.muestras).toHaveLength(3);
      expect(t.barra).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});

describe("fuentes", () => {
  it("un id conocido se respeta y uno que no existe cae en el de fábrica", () => {
    expect(fuenteValida("sora")).toBe("sora");
    expect(fuenteValida("comic")).toBe(FUENTE_INICIAL);
    expect(fuenteValida(null)).toBe(FUENTE_INICIAL);
  });

  it("no hay ids repetidos y la de fábrica está en la lista", () => {
    const ids = FUENTES.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain(FUENTE_INICIAL);
  });

  it("el nombre para pedirla a Google no lleva espacios sueltos", () => {
    for (const f of FUENTES) expect(f.css).not.toMatch(/\s/);
  });
});
