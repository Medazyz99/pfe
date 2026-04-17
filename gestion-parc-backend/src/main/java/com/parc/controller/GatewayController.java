package com.parc.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class GatewayController {

    // ===== AUTH =====
    @PostMapping("/api/auth/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<>();
        response.put("token", "fake-token-123");
        response.put("user", Map.of(
            "id", 1,
            "nom", "Ben Ali",
            "prenom", "Mohamed",
            "email", body.get("email"),
            "role", "chef de parc",
            "photo", "https://ui-avatars.com/api/?name=Mohamed+Ben+Ali"
        ));
        return response;
    }

    // ===== VEHICULES =====
    @GetMapping("/api/vehicules")
    public List<Map<String, Object>> getVehicules() {
        List<Map<String, Object>> list = new ArrayList<>();
        Map<String, Object> v = new HashMap<>();
        v.put("id", 1);
        v.put("matricule", "123TUN789");
        v.put("marque", "Renault");
        v.put("modele", "Trafic");
        v.put("typeCarburant", "Diesel");
        v.put("kilometrage", 45230);
        v.put("statut", "Disponible");
        v.put("chauffeur", "Ahmed Ben Salem");
        v.put("dateProchaineMaintenance", "2026-03-15");
        list.add(v);
        return list;
    }

    // ===== MISSIONS =====
    @GetMapping("/api/missions")
    public List<Map<String, Object>> getMissions() {
        List<Map<String, Object>> list = new ArrayList<>();
        Map<String, Object> m = new HashMap<>();
        m.put("id", "M001");
        m.put("titre", "Livraison Sfax");
        m.put("destination", "Sfax");
        m.put("chauffeur", "Ahmed Ben Salem");
        m.put("vehicule", "123TUN789");
        m.put("dateDepart", "2026-03-15");
        m.put("dateRetour", "2026-03-16");
        m.put("statut", "Planifiée");
        m.put("priorite", "Haute");
        list.add(m);
        return list;
    }

    // ===== CHAUFFEURS =====
    @GetMapping("/api/drivers")
    public List<Map<String, Object>> getDrivers() {
        List<Map<String, Object>> list = new ArrayList<>();
        Map<String, Object> d = new HashMap<>();
        d.put("id", 1);
        d.put("nom", "Ben Salem");
        d.put("prenom", "Ahmed");
        d.put("email", "ahmed@agil.tn");
        d.put("telephone", "98 765 432");
        d.put("disponible", true);
        d.put("missionsEffectuees", 45);
        d.put("kilometresParcourus", 12450);
        list.add(d);
        return list;
    }

    // ===== STATISTIQUES =====
    @GetMapping("/api/statistics/monthly")
    public Map<String, Object> getMonthlyStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("labels", List.of("Jan", "Fév", "Mar", "Avr", "Mai", "Juin"));
        stats.put("missions", List.of(42, 38, 45, 48, 52, 49));
        stats.put("km", List.of(4200, 3800, 5100, 4800, 5300, 4900));
        stats.put("couts", List.of(12500, 11800, 13200, 12800, 14500, 13800));
        stats.put("carburant", List.of(380, 350, 420, 400, 450, 430));
        return stats;
    }
}