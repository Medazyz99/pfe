package com.parc.controller;

import com.parc.dto.FeuilleDeRouteDTO;
import com.parc.service.FeuilleDeRouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feuilles")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FeuilleDeRouteController {

    private final FeuilleDeRouteService feuilleDeRouteService;

    // Créer une feuille de route pour une mission
    @PostMapping("/mission/{missionId}")
    public ResponseEntity<FeuilleDeRouteDTO> createForMission(@PathVariable Long missionId,
                                                              @RequestBody FeuilleDeRouteDTO dto) {
        return ResponseEntity.ok(feuilleDeRouteService.createFeuilleDeRoute(missionId, dto));
    }

    // Récupérer la feuille de route d'une mission
    @GetMapping("/mission/{missionId}")
    public ResponseEntity<FeuilleDeRouteDTO> getByMission(@PathVariable Long missionId) {
        return ResponseEntity.ok(feuilleDeRouteService.getFeuilleByMission(missionId));
    }

    // Récupérer toutes les feuilles de route
    @GetMapping
    public ResponseEntity<List<FeuilleDeRouteDTO>> getAll() {
        return ResponseEntity.ok(feuilleDeRouteService.getAllFeuilles());
    }

    // Mettre à jour une feuille de route par son ID
    @PutMapping("/{id}")
    public ResponseEntity<FeuilleDeRouteDTO> update(@PathVariable Long id,
                                                    @RequestBody FeuilleDeRouteDTO dto) {
        return ResponseEntity.ok(feuilleDeRouteService.updateFeuilleDeRoute(id, dto));
    }

    // Supprimer une feuille de route
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        feuilleDeRouteService.deleteFeuilleDeRoute(id);
        return ResponseEntity.noContent().build();
    }
}