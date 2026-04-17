package com.parc.service;

import com.parc.dto.VehiculeDTO;
import com.parc.domain.entity.Parc;
import com.parc.domain.entity.Vehicule;
import com.parc.repository.ParcRepository;
import com.parc.repository.VehiculeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehiculeService {

    private final VehiculeRepository vehiculeRepository;
    private final ParcRepository parcRepository;

    // Constructeur explicite (remplace @RequiredArgsConstructor)
    public VehiculeService(VehiculeRepository vehiculeRepository, ParcRepository parcRepository) {
        this.vehiculeRepository = vehiculeRepository;
        this.parcRepository = parcRepository;
    }

    // Conversion entité -> DTO
    private VehiculeDTO toDTO(Vehicule vehicule) {
        VehiculeDTO dto = new VehiculeDTO();
        dto.setId(vehicule.getId());
        dto.setMatricule(vehicule.getMatricule());
        dto.setNumeroChassis(vehicule.getNumeroChassis());
        dto.setMarque(vehicule.getMarque());
        dto.setModele(vehicule.getModele());
        dto.setTypeCarburant(vehicule.getTypeCarburant());
        dto.setCouleur(vehicule.getCouleur());
        dto.setKilometre(vehicule.getKilometre());
        dto.setCapaciteReservoir(vehicule.getCapaciteReservoir());
        dto.setDateMiseEnService(vehicule.getDateMiseEnService());
        dto.setDateExpirationVisiteTechnique(vehicule.getDateExpirationVisiteTechnique());
        dto.setDateExpirationCarteGrise(vehicule.getDateExpirationCarteGrise());
        dto.setPuissanceFiscale(vehicule.getPuissanceFiscale());
        dto.setStatut(vehicule.getStatut());
        dto.setNomSocieteAssurance(vehicule.getNomSocieteAssurance());
        dto.setDateExpirationAssurance(vehicule.getDateExpirationAssurance());
        dto.setMontantAssurance(vehicule.getMontantAssurance());

        if (vehicule.getParc() != null) {
            dto.setParcId(vehicule.getParc().getId());
            dto.setParcNom(vehicule.getParc().getNom());
        }

        return dto;
    }

    // Conversion DTO -> entité
    private Vehicule toEntity(VehiculeDTO dto) {
        Vehicule vehicule = new Vehicule();
        vehicule.setMatricule(dto.getMatricule());
        vehicule.setNumeroChassis(dto.getNumeroChassis());
        vehicule.setMarque(dto.getMarque());
        vehicule.setModele(dto.getModele());
        vehicule.setTypeCarburant(dto.getTypeCarburant());
        vehicule.setCouleur(dto.getCouleur());
        vehicule.setKilometre(dto.getKilometre());
        vehicule.setCapaciteReservoir(dto.getCapaciteReservoir());
        vehicule.setDateMiseEnService(dto.getDateMiseEnService());
        vehicule.setDateExpirationVisiteTechnique(dto.getDateExpirationVisiteTechnique());
        vehicule.setDateExpirationCarteGrise(dto.getDateExpirationCarteGrise());
        vehicule.setPuissanceFiscale(dto.getPuissanceFiscale());
        vehicule.setStatut(dto.getStatut());
        vehicule.setNomSocieteAssurance(dto.getNomSocieteAssurance());
        vehicule.setDateExpirationAssurance(dto.getDateExpirationAssurance());
        vehicule.setMontantAssurance(dto.getMontantAssurance());

        if (dto.getParcId() != null) {
            Parc parc = parcRepository.findById(dto.getParcId())
                    .orElseThrow(() -> new RuntimeException("Parc non trouvé avec id : " + dto.getParcId()));
            vehicule.setParc(parc);
        }

        return vehicule;
    }

    // Création
    public VehiculeDTO createVehicule(VehiculeDTO dto) {
        if (vehiculeRepository.existsByMatricule(dto.getMatricule())) {
            throw new RuntimeException("Un véhicule avec cette immatriculation existe déjà.");
        }
        if (vehiculeRepository.existsByNumeroChassis(dto.getNumeroChassis())) {
            throw new RuntimeException("Un véhicule avec ce numéro de châssis existe déjà.");
        }
        Vehicule vehicule = toEntity(dto);
        Vehicule saved = vehiculeRepository.save(vehicule);
        return toDTO(saved);
    }

    // Récupérer tous les véhicules
    public List<VehiculeDTO> getAllVehicules() {
        return vehiculeRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Récupérer un véhicule par ID
    public VehiculeDTO getVehiculeById(Long id) {
        return vehiculeRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Véhicule non trouvé avec id : " + id));
    }

    // Récupérer les véhicules d’un parc
    public List<VehiculeDTO> getVehiculesByParc(Long parcId) {
        return vehiculeRepository.findByParcId(parcId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Mise à jour
    public VehiculeDTO updateVehicule(Long id, VehiculeDTO dto) {
        Vehicule existing = vehiculeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Véhicule non trouvé avec id : " + id));

        existing.setMatricule(dto.getMatricule());
        existing.setNumeroChassis(dto.getNumeroChassis());
        existing.setMarque(dto.getMarque());
        existing.setModele(dto.getModele());
        existing.setTypeCarburant(dto.getTypeCarburant());
        existing.setCouleur(dto.getCouleur());
        existing.setKilometre(dto.getKilometre());
        existing.setCapaciteReservoir(dto.getCapaciteReservoir());
        existing.setDateMiseEnService(dto.getDateMiseEnService());
        existing.setDateExpirationVisiteTechnique(dto.getDateExpirationVisiteTechnique());
        existing.setDateExpirationCarteGrise(dto.getDateExpirationCarteGrise());
        existing.setPuissanceFiscale(dto.getPuissanceFiscale());
        existing.setStatut(dto.getStatut());
        existing.setNomSocieteAssurance(dto.getNomSocieteAssurance());
        existing.setDateExpirationAssurance(dto.getDateExpirationAssurance());
        existing.setMontantAssurance(dto.getMontantAssurance());

        if (dto.getParcId() != null) {
            Parc parc = parcRepository.findById(dto.getParcId())
                    .orElseThrow(() -> new RuntimeException("Parc non trouvé avec id : " + dto.getParcId()));
            existing.setParc(parc);
        } else {
            existing.setParc(null);
        }

        Vehicule updated = vehiculeRepository.save(existing);
        return toDTO(updated);
    }

    // Suppression
    public void deleteVehicule(Long id) {
        Vehicule existing = vehiculeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Véhicule non trouvé avec id : " + id));
        vehiculeRepository.delete(existing);
    }
}