package com.parc.service;

import com.parc.dto.AccidentDTO;
import com.parc.domain.entity.Accident;
import com.parc.domain.entity.Chauffeur;
import com.parc.domain.entity.Vehicule;
import com.parc.dto.MaintenanceDTO;
import com.parc.domain.enums.StatutMaintenance;
import com.parc.repository.AccidentRepository;
import com.parc.repository.ChauffeurRepository;
import com.parc.repository.VehiculeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccidentService {

    private final AccidentRepository accidentRepository;
    private final ChauffeurRepository chauffeurRepository;
    private final VehiculeRepository vehiculeRepository;
    private final MaintenanceService maintenanceService;
    private final NotificationService notificationService;

    // Constructeur explicite (remplace @RequiredArgsConstructor)
    public AccidentService(AccidentRepository accidentRepository,
                           ChauffeurRepository chauffeurRepository,
                           VehiculeRepository vehiculeRepository,
                           MaintenanceService maintenanceService,
                           NotificationService notificationService) {
        this.accidentRepository = accidentRepository;
        this.chauffeurRepository = chauffeurRepository;
        this.vehiculeRepository = vehiculeRepository;
        this.maintenanceService = maintenanceService;
        this.notificationService = notificationService;
    }

    // ========== MAPPING ==========
    private AccidentDTO toDTO(Accident accident) {
        AccidentDTO dto = new AccidentDTO();
        dto.setId(accident.getId());
        dto.setLieuAccident(accident.getLieuAccident());
        dto.setPersonnesImpliquees(accident.getPersonnesImpliquees());
        dto.setDescription(accident.getDescription());
        dto.setPhoto(accident.getPhoto());
        dto.setDateDeclaration(accident.getDateDeclaration());

        if (accident.getChauffeur() != null) {
            dto.setChauffeurId(accident.getChauffeur().getId());
            dto.setChauffeurNom(accident.getChauffeur().getNom() + " " + accident.getChauffeur().getPrenom());
        }
        if (accident.getVehicule() != null) {
            dto.setVehiculeId(accident.getVehicule().getId());
            dto.setVehiculeMatricule(accident.getVehicule().getMatricule());
        }
        return dto;
    }

    private Accident toEntity(AccidentDTO dto) {
        Accident accident = new Accident();
        accident.setLieuAccident(dto.getLieuAccident());
        accident.setPersonnesImpliquees(dto.getPersonnesImpliquees());
        accident.setDescription(dto.getDescription());
        accident.setPhoto(dto.getPhoto());
        // La date de déclaration est générée automatiquement
        if (dto.getChauffeurId() != null) {
            Chauffeur chauffeur = chauffeurRepository.findById(dto.getChauffeurId())
                    .orElseThrow(() -> new RuntimeException("Chauffeur non trouvé avec id : " + dto.getChauffeurId()));
            accident.setChauffeur(chauffeur);
        }
        if (dto.getVehiculeId() != null) {
            Vehicule vehicule = vehiculeRepository.findById(dto.getVehiculeId())
                    .orElseThrow(() -> new RuntimeException("Véhicule non trouvé avec id : " + dto.getVehiculeId()));
            accident.setVehicule(vehicule);
        }
        return accident;
    }

    // ========== CRUD ==========
    @Transactional
    public AccidentDTO create(AccidentDTO dto) {
        // Validation : le chauffeur et le véhicule doivent exister
        Accident accident = toEntity(dto);
        accident = accidentRepository.save(accident);

        // 1. Notification au chef de parc
        String message = String.format(
            "Accident déclaré pour le véhicule %s par %s %s. Lieu : %s",
            accident.getVehicule().getMatricule(),
            accident.getChauffeur().getNom(),
            accident.getChauffeur().getPrenom(),
            accident.getLieuAccident()
        );
        notificationService.envoyerNotificationChefParc(message);

        // 2. Déclenchement automatique d'une maintenance corrective
        MaintenanceDTO maintenanceDTO = new MaintenanceDTO();
        maintenanceDTO.setType("Accident");
        maintenanceDTO.setStatut(StatutMaintenance.PLANIFIEE);
        maintenanceDTO.setDatePrevue(LocalDate.now().plusDays(2));
        maintenanceDTO.setOperateur("À assigner");
        maintenanceDTO.setVehiculeId(accident.getVehicule().getId());
        maintenanceService.create(maintenanceDTO);

        return toDTO(accident);
    }

    public List<AccidentDTO> getAll() {
        return accidentRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public AccidentDTO getById(Long id) {
        return accidentRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Accident non trouvé avec id : " + id));
    }

    public List<AccidentDTO> getByChauffeur(Long chauffeurId) {
        return accidentRepository.findByChauffeurId(chauffeurId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<AccidentDTO> getByVehicule(Long vehiculeId) {
        return accidentRepository.findByVehiculeId(vehiculeId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public AccidentDTO update(Long id, AccidentDTO dto) {
        Accident existing = accidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Accident non trouvé avec id : " + id));

        existing.setLieuAccident(dto.getLieuAccident());
        existing.setPersonnesImpliquees(dto.getPersonnesImpliquees());
        existing.setDescription(dto.getDescription());
        existing.setPhoto(dto.getPhoto());

        if (dto.getChauffeurId() != null) {
            Chauffeur chauffeur = chauffeurRepository.findById(dto.getChauffeurId())
                    .orElseThrow(() -> new RuntimeException("Chauffeur non trouvé"));
            existing.setChauffeur(chauffeur);
        } else {
            existing.setChauffeur(null);
        }

        if (dto.getVehiculeId() != null) {
            Vehicule vehicule = vehiculeRepository.findById(dto.getVehiculeId())
                    .orElseThrow(() -> new RuntimeException("Véhicule non trouvé"));
            existing.setVehicule(vehicule);
        } else {
            existing.setVehicule(null);
        }

        return toDTO(accidentRepository.save(existing));
    }

    @Transactional
    public void delete(Long id) {
        Accident existing = accidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Accident non trouvé avec id : " + id));
        accidentRepository.delete(existing);
    }
}