const request = require("supertest");
const app = require("../server");

let id_utilisateur_test; // Variable pour stocker un utilisateur créé durant les tests

describe("Gestion des utilisateurs", () => {

    // 🔹 Test d'ajout d'un utilisateur
    test("Ajout d'un nouvel utilisateur", async () => {
        const res = await request(app).post("/api/utilisateur").send({
            nom: "Dupont",
            prenom: "Jean",
            email: "jean.dupont@example.com",
            motdepasse: "MotDePasse123!",
            role: "professeur"
        });

        console.log("📌 Réponse du serveur :", res.body); // ✅ Voir si l'utilisateur est bien ajouté

        expect(res.status).toBe(201); // ✅ Vérifie si le statut est 201 (Créé)
        expect(res.body.utilisateur).toHaveProperty("id_utilisateur"); // ✅ Vérifie que l'ID est retourné
        id_utilisateur_test = res.body.utilisateur.id_utilisateur; // ✅ Stocke l'ID du nouvel utilisateur
    });

    // 🔹 Test de récupération des utilisateurs
    test("Récupération des utilisateurs", async () => {
        const res = await request(app).get("/api/utilisateur");

        expect(res.status).toBe(200); // ✅ Vérifie si le statut est 200 (OK)
        expect(Array.isArray(res.body)).toBe(true); // ✅ Vérifie si c'est un tableau
        expect(res.body.length).toBeGreaterThan(0); // ✅ Vérifie qu'il y a au moins un utilisateur
        expect(res.body[0]).toHaveProperty("id_utilisateur"); // ✅ Vérifie que chaque utilisateur a un ID
        expect(res.body[0]).toHaveProperty("nom"); // ✅ Vérifie que chaque utilisateur a un nom
        expect(res.body[0]).toHaveProperty("prenom"); // ✅ Vérifie que chaque utilisateur a un prénom
        expect(res.body[0]).toHaveProperty("email"); // ✅ Vérifie que chaque utilisateur a un email
    });

    // 🔹 Test de suppression d'un utilisateur
    test("Suppression d'un utilisateur", async () => {
        if (!id_utilisateur_test) {
            console.warn("Aucun utilisateur n'a été créé pour tester la suppression !");
            return;
        }

        const res = await request(app).delete(`/api/utilisateur/${id_utilisateur_test}`);

        expect(res.status).toBe(200); // ✅ Vérifie si le statut est 200 (OK)
        expect(res.body.message).toBe("Utilisateur supprimé avec succès"); // ✅ Vérifie le message de confirmation
    });
});
