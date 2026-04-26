package com.parc.service;

import com.parc.dto.VehiculeDTO;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class VehiculeService {

    private List<VehiculeDTO> vehicules = new ArrayList<>();

    public List<VehiculeDTO> getAllVehicules() {
        // Si la liste est vide, ajoute des données de test
        if (vehicules.isEmpty()) {
            VehiculeDTO v = new VehiculeDTO();
            v.setId(1L);
            v.setMatricule("123TUN789");
            v.setMarque("Renault");
            v.setModele("Trafic");
            v.setStatut("Disponible");
            v.setKilometre(45230.0);
            v.setTypeCarburant("Diesel");
            v.setDateProchaineMaintenance(java.time.LocalDate.now().plusDays(30));
            v.setDateExpirationAssurance(java.time.LocalDate.now().plusMonths(6));
            v.setDateExpirationCarteGrise(java.time.LocalDate.now().plusYears(1));
            vehicules.add(v);
        }
        return vehicules;
    }

    public VehiculeDTO getVehiculeById(Long id) {
        return vehicules.stream()
                .filter(v -> v.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public VehiculeDTO createVehicule(VehiculeDTO dto) {
        Long newId = (long) (vehicules.size() + 1);
        dto.setId(newId);
        vehicules.add(dto);
        return dto;
    }

    public VehiculeDTO updateVehicule(Long id, VehiculeDTO dto) {
        for (int i = 0; i < vehicules.size(); i++) {
            if (vehicules.get(i).getId().equals(id)) {
                dto.setId(id);
                vehicules.set(i, dto);
                return dto;
            }
        }
        return null;
    }

    public void deleteVehicule(Long id) {
        vehicules.removeIf(v -> v.getId().equals(id));
    }

    public List<VehiculeDTO> getVehiculesByParc(Long parcId) {
        return getAllVehicules(); // version simplifiée
    }
}