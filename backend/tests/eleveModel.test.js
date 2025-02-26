// 📂 tests/eleveModel.test.js
const { getEleveById, getNotesByEleve, getDevoirsByEleve } = require("../Models/eleveModel");

test("Récupération d'un élève existant", async () => {
    const idEleve = 1; // ⚠️ Assure-toi qu'il existe dans ta base
    const data = await getEleveById(idEleve);

    expect(data).toHaveProperty("id_eleve");
    expect(data).toHaveProperty("id_classe");
    expect(data).toHaveProperty("id_utilisateur");
});

test("Récupération des notes d'un élève", async () => {
    const idEleve = 1;
    const data = await getNotesByEleve(idEleve);

    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
        expect(data[0]).toHaveProperty("id_note_");
        expect(data[0]).toHaveProperty("valeur");
    }
});

test("Récupération des devoirs d'un élève", async () => {
    const idEleve = 1;
    const data = await getDevoirsByEleve(idEleve);

    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
        expect(data[0]).toHaveProperty("id__devoir"); // ✅ Correction ici (double underscore)
        expect(data[0]).toHaveProperty("titre");
        expect(data[0]).toHaveProperty("description");
        expect(data[0]).toHaveProperty("datelimite");
        expect(data[0]).toHaveProperty("id_matiere");
    }
});
