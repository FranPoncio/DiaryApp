import { describe, it, expect } from "vitest";
import { TEMAS, TEMA_INICIAL, temaValido } from "./temas";

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
