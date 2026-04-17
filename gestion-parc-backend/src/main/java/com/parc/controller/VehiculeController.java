package com.parc.controller;

import com.parc.dto.VehiculeDTO;
import com.parc.service.VehiculeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicules")
@CrossOrigin(origins = "*")
public class VehiculeController {

    private final VehiculeService vehiculeService;

    // Constructeur explicite (remplace @RequiredArgsConstructor)
    public VehiculeController(VehiculeService vehiculeService) {
        this.vehiculeService = vehiculeService;
    }

    @PostMapping
    public ResponseEntity<VehiculeDTO> create(@RequestBody VehiculeDTO dto) {
        return ResponseEntity.ok(vehiculeService.createVehicule(dto));
    }

    @GetMapping
    public ResponseEntity<List<VehiculeDTO>> getAll() {
        return ResponseEntity.ok(vehiculeService.getAllVehicules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehiculeDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(vehiculeService.getVehiculeById(id));
    }

    @GetMapping("/parc/{parcId}")
    public ResponseEntity<List<VehiculeDTO>> getByParc(@PathVariable Long parcId) {
        return ResponseEntity.ok(vehiculeService.getVehiculesByParc(parcId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VehiculeDTO> update(@PathVariable Long id, @RequestBody VehiculeDTO dto) {
        return ResponseEntity.ok(vehiculeService.updateVehicule(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        vehiculeService.deleteVehicule(id);
        return ResponseEntity.noContent().build();
    }
}