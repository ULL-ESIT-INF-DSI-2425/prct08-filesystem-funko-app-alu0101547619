import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs";
import path from "path";
import { FunkoCollection } from "../src/services/services.js";
import { Funko, FunkoGenre, FunkoType } from "../src/enum/funko_type.js";

const TEST_USER = "testUser";
const TEST_DIR = path.join(process.cwd(), "src", "datos", TEST_USER);

describe("FunkoCollection", () => {
  let collection: FunkoCollection;
  let testFunko: Funko;

  beforeEach(() => {
    collection = new FunkoCollection(TEST_USER);
    testFunko = {
      id: 1,
      name: "Classic Sonic",
      description: "The best Sonic Funko ever",
      type: FunkoType.Pop,
      genre: FunkoGenre.Videojuegos,
      franchise: "Sonic",
      number: 1,
      exclusive: false,
      specialFeatures: "Brilla en la oscuridad",
      marketValue: 120,
    };

    if (!fs.existsSync(TEST_DIR)) {
      fs.mkdirSync(TEST_DIR, { recursive: true });
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  it("debería agregar un Funko a la colección", function (done: () => void) {
    collection.addFunko(testFunko);
    setTimeout(() => {
      const filePath = path.join(TEST_DIR, "1.json");
      expect(fs.existsSync(filePath)).toBe(true);
      done();
    }, 200);
  });

  it("debería no agregar un Funko si ya existe", function (done: () => void) {
    collection.addFunko(testFunko);
    setTimeout(() => {
      const consoleSpy = vi.spyOn(console, "log");
      collection.addFunko(testFunko);
      setTimeout(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          expect.stringMatching(/Funko already exists/)
        );
        done();
      }, 200);
    }, 200);
  });

  it("debería actualizar un Funko existente", function (done: () => void) {
    collection.addFunko(testFunko);
    setTimeout(() => {
      testFunko.name = "Updated Sonic";
      collection.updateFunko(testFunko);
      setTimeout(() => {
        const updatedData = JSON.parse(
          fs.readFileSync(path.join(TEST_DIR, "1.json"), "utf-8")
        );
        expect(updatedData.name).toBe("Updated Sonic");
        done();
      }, 200);
    }, 200);
  });

  it("debería no actualizar un Funko si no existe", function (done: () => void) {
    const consoleSpy = vi.spyOn(console, "log");
    collection.updateFunko(testFunko);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(/Funko not found/)
      );
      done();
    }, 200);
  });

  it("debería eliminar un Funko de la colección", function (done: () => void) {
    collection.addFunko(testFunko);
    setTimeout(() => {
      collection.removeFunko(testFunko.id);
      setTimeout(() => {
        expect(fs.existsSync(path.join(TEST_DIR, "1.json"))).toBe(false);
        done();
      }, 200);
    }, 200);
  });

  it("debería no eliminar un Funko si no existe", function (done: () => void) {
    const consoleSpy = vi.spyOn(console, "log");
    collection.removeFunko(testFunko.id);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(/Funko not found/)
      );
      done();
    }, 200);
  });

  it("debería leer un Funko existente", function (done: () => void) {
    collection.addFunko(testFunko);
    setTimeout(() => {
      const consoleSpy = vi.spyOn(console, "log");
      collection.readFunko(testFunko.id);
      setTimeout(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          expect.stringMatching(/Classic Sonic/)
        );
        done();
      }, 200);
    }, 200);
  });

  it("debería no leer un Funko si no existe", function (done: () => void) {
    const consoleSpy = vi.spyOn(console, "log");
    collection.readFunko(testFunko.id);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(/Funko not found/)
      );
      done();
    }, 200);
  });

  it("debería listar todos los Funkos", function (done: () => void) {
    collection.addFunko(testFunko);
    setTimeout(() => {
      const consoleSpy = vi.spyOn(console, "log");
      collection.listFunko();
      setTimeout(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          expect.stringMatching(/Classic Sonic/)
        );
        done();
      }, 200);
    }, 200);
  });

  it("debería mostrar un mensaje si no hay Funkos en la colección", function (done: () => void) {
    const consoleSpy = vi.spyOn(console, "log");
    collection.listFunko();
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(/No Funkos found/)
      );
      done();
    }, 200);
  });
});
