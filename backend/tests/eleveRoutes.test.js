const request = require("supertest");
const app = require("../server"); // ✅ Vérifie que le chemin est correct

describe("Tests des routes des élèves", () => {
  test("Récupérer les élèves d'une classe", async () => {
    const res = await request(app).get("/api/eleves/classe/1");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("utilisateur"); // ✅ Vérifie que l'objet `utilisateur` existe
    expect(res.body[0].utilisateur).toHaveProperty("nom"); // ✅ Vérifie le nom
    expect(res.body[0].utilisateur).toHaveProperty("prenom"); // ✅ Vérifie le prénom
    expect(res.body[0].utilisateur).toHaveProperty("email"); // ✅ Vérifie l'email
    
  });
});
