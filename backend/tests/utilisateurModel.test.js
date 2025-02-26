const { createUtilisateur } = require("../Models/utilisateurModel");

// 🔹 Mock Supabase (évite d'appeler la vraie base de données)
jest.mock("../config/supabaseClient", () => ({
    from: jest.fn(() => ({
        insert: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
                single: jest.fn().mockResolvedValue({
                    data: { id_utilisateur: 1, nom: "Dupont", prenom: "Jean", email: "jean.dupont@example.com", role: "professeur" },
                    error: null
                })
            })
        })
    }))
}));

describe("Test Unitaire - Modèle Utilisateur", () => {
    test("Créer un utilisateur sans toucher à l'API", async () => {
        const mockUtilisateur = {
            nom: "Dupont",
            prenom: "Jean",
            email: "jean.dupont@example.com",
            motdepasse: "MotDePasse123!",
            role: "professeur"
        };

        const utilisateur = await createUtilisateur(mockUtilisateur);

        expect(utilisateur).toHaveProperty("id_utilisateur");
        expect(utilisateur.nom).toBe("Dupont");
        expect(utilisateur.email).toBe("jean.dupont@example.com");
    });
});
