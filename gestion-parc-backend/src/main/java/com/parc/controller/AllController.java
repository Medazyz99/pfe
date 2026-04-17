package com.parc.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class AllController {

    // ========== AUTH ==========
    @PostMapping("/api/auth/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<>();
        response.put("token", "fake-jwt-token-123456");
        response.put("user", Map.of(
            "id", 1,
            "nom", "Ben Ali",
            "prenom", "Mohamed",
            "email", body.get("email"),
            "role", "chef de parc"
        ));
        return response;
    }

    // ========== VEHICULES ==========
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

    @PostMapping("/api/vehicules")
    public Map<String, Object> createVehicule(@RequestBody Map<String, Object> body) {
        body.put("id", new Random().nextInt(1000));
        return body;
    }

    @PutMapping("/api/vehicules/{id}")
    public Map<String, Object> updateVehicule(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        body.put("id", id);
        return body;
    }

    @DeleteMapping("/api/vehicules/{id}")
    public Map<String, String> deleteVehicule(@PathVariable Long id) {
        return Map.of("message", "Véhicule supprimé");
    }

    // ========== MISSIONS ==========
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

    @PostMapping("/api/missions")
    public Map<String, Object> createMission(@RequestBody Map<String, Object> body) {
        body.put("id", "M00" + new Random().nextInt(100));
        return body;
    }

    // ========== CHAUFFEURS ==========
    @GetMapping("/api/chauffeurs")
    public List<Map<String, Object>> getChauffeurs() {
        List<Map<String, Object>> list = new ArrayList<>();
        Map<String, Object> c = new HashMap<>();
        c.put("id", 1);
        c.put("nom", "Ben Salem");
        c.put("prenom", "Ahmed");
        c.put("email", "ahmed@agil.tn");
        c.put("telephone", "98 765 432");
        c.put("disponible", true);
        list.add(c);
        return list;
    }

    // ========== STATISTIQUES ==========
    @GetMapping("/api/statistics/monthly")
    public Map<String, Object> getMonthlyStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("labels", List.of("Jan", "Fév", "Mar", "Avr", "Mai", "Juin"));
        stats.put("missions", List.of(42, 38, 45, 48, 52, 49));
        stats.put("km", List.of(4200, 3800, 5100, 4800, 5300, 4900));
        return stats;
    }
}