package com.parc.service;

import com.parc.dto.MaintenanceDTO;
import com.parc.domain.entity.*;
import com.parc.domain.enums.StatutMaintenance;
import com.parc.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;
    private final VehiculeRepository vehiculeRepository;
    private final GarageRepository garageRepository;
    private final SmsService smsService;
    private final PushNotificationService pushService;

    // Constructeur explicite (remplace @RequiredArgsConstructor)
    public MaintenanceService(MaintenanceRepository maintenanceRepository,
                              VehiculeRepository vehiculeRepository,
                              GarageRepository garageRepository,
                              SmsService smsService,
                              PushNotificationService pushService) {
        this.maintenanceRepository = maintenanceRepository;
        this.vehiculeRepository = vehiculeRepository;
        this.garageRepository = garageRepository;
        this.smsService = smsService;
        this.pushService = pushService;
    }

    private MaintenanceDTO toDTO(Maintenance m) {
        MaintenanceDTO dto = new MaintenanceDTO();
        dto.setId(m.getId());
        dto.setType(m.getType());
        dto.setStatut(m.getStatut());
        dto.setDatePrevue(m.getDatePrevue());
        dto.setCout(m.getCout());
        dto.setOperateur(m.getOperateur());
        dto.setRapportProbleme(m.getRapportProbleme());
        dto.setDateRealisation(m.getDateRealisation());
        if (m.getVehicule() != null) {
            dto.setVehiculeId(m.getVehicule().getId());
            dto.setVehiculeMatricule(m.getVehicule().getMatricule());
        }
        if (m.getGarage() != null) {
            dto.setGarageId(m.getGarage().getId());
            dto.setGarageNom(m.getGarage().getSpecialite() + " - " + m.getGarage().getAdresse());
        }
        return dto;
    }

    private Maintenance toEntity(MaintenanceDTO dto) {
        Maintenance m = new Maintenance();
        m.setType(dto.getType());
        m.setStatut(dto.getStatut() != null ? dto.getStatut() : StatutMaintenance.PLANIFIEE);
        m.setDatePrevue(dto.getDatePrevue());
        m.setCout(dto.getCout());
        m.setOperateur(dto.getOperateur());
        m.setRapportProbleme(dto.getRapportProbleme());
        m.setDateRealisation(dto.getDateRealisation());
        if (dto.getVehiculeId() != null) {
            Vehicule vehicule = vehiculeRepository.findById(dto.getVehiculeId())
                    .orElseThrow(() -> new RuntimeException("Véhicule non trouvé"));
            m.setVehicule(vehicule);
        }
        if (dto.getGarageId() != null) {
            Garage garage = garageRepository.findById(dto.getGarageId())
                    .orElseThrow(() -> new RuntimeException("Garage non trouvé"));
            m.setGarage(garage);
        }
        return m;
    }

    @Transactional
    public MaintenanceDTO create(MaintenanceDTO dto) {
        Maintenance maintenance = toEntity(dto);
        maintenance = maintenanceRepository.save(maintenance);

        Garage garage = maintenance.getGarage();
        if (garage != null && garage.getTelephone() != null && !garage.getTelephone().isEmpty()) {
            String message = String.format(
                "Maintenance prévue pour le véhicule %s le %s. Type: %s",
                maintenance.getVehicule().getMatricule(),
                maintenance.getDatePrevue(),
                maintenance.getType()
            );
            smsService.sendSms(garage.getTelephone(), message);
        }
        if (garage != null && garage.getFcmToken() != null && !garage.getFcmToken().isEmpty()) {
            String title = "Nouvelle maintenance";
            String body = String.format(
                "Maintenance prévue pour le véhicule %s le %s.\nType: %s",
                maintenance.getVehicule().getMatricule(),
                maintenance.getDatePrevue(),
                maintenance.getType()
            );
            pushService.sendPush(garage.getFcmToken(), title, body);
        }
        return toDTO(maintenance);
    }

    public List<MaintenanceDTO> getAll() {
        return maintenanceRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public MaintenanceDTO getById(Long id) {
        return maintenanceRepository.findById(id).map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Maintenance non trouvée"));
    }

    public List<MaintenanceDTO> getByVehicule(Long vehiculeId) {
        return maintenanceRepository.findByVehiculeId(vehiculeId).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public List<MaintenanceDTO> getByGarage(Long garageId) {
        return maintenanceRepository.findByGarageId(garageId).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public MaintenanceDTO update(Long id, MaintenanceDTO dto) {
        Maintenance existing = maintenanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Maintenance non trouvée"));
        existing.setType(dto.getType());
        existing.setStatut(dto.getStatut());
        existing.setDatePrevue(dto.getDatePrevue());
        existing.setCout(dto.getCout());
        existing.setOperateur(dto.getOperateur());
        existing.setRapportProbleme(dto.getRapportProbleme());
        existing.setDateRealisation(dto.getDateRealisation());
        if (dto.getVehiculeId() != null) {
            Vehicule vehicule = vehiculeRepository.findById(dto.getVehiculeId())
                    .orElseThrow(() -> new RuntimeException("Véhicule non trouvé"));
            existing.setVehicule(vehicule);
        } else {
            existing.setVehicule(null);
        }
        if (dto.getGarageId() != null) {
            Garage garage = garageRepository.findById(dto.getGarageId())
                    .orElseThrow(() -> new RuntimeException("Garage non trouvé"));
            existing.setGarage(garage);
        } else {
            existing.setGarage(null);
        }
        return toDTO(maintenanceRepository.save(existing));
    }

    @Transactional
    public void delete(Long id) {
        Maintenance existing = maintenanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Maintenance non trouvée"));
        maintenanceRepository.delete(existing);
    }
}