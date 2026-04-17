package com.parc.controller;

import com.parc.dto.UtilisateurDTO;
import com.parc.service.UtilisateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UtilisateurController {

    private final UtilisateurService service;

    // ✅ CREATE
    @PostMapping
    public UtilisateurDTO create(@RequestBody UtilisateurDTO dto) {
        return service.create(dto);
    }

    // ✅ GET ALL
    @GetMapping
    public List<UtilisateurDTO> getAll() {
        return service.getAll();
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public UtilisateurDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public UtilisateurDTO update(@PathVariable Long id,
                                 @RequestBody UtilisateurDTO dto) {
        return service.update(id, dto);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}