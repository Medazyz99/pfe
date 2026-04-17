package com.parc.service;

import com.parc.domain.entity.*;
import com.parc.domain.enums.StatutNotification;
import com.parc.domain.enums.TypeNotification;
import com.parc.dto.NotificationDTO;
import com.parc.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final MissionRepository missionRepository;
    private final MaintenanceRepository maintenanceRepository;
    private final VehiculeRepository vehiculeRepository;
    private final ChauffeurRepository chauffeurRepository;
    private final SmsService smsService;
    private final PushNotificationService pushService;

    // Constructeur explicite (remplace @RequiredArgsConstructor)
    public NotificationService(NotificationRepository notificationRepository,
                               UtilisateurRepository utilisateurRepository,
                               MissionRepository missionRepository,
                               MaintenanceRepository maintenanceRepository,
                               VehiculeRepository vehiculeRepository,
                               ChauffeurRepository chauffeurRepository,
                               SmsService smsService,
                               PushNotificationService pushService) {
        this.notificationRepository = notificationRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.missionRepository = missionRepository;
        this.maintenanceRepository = maintenanceRepository;
        this.vehiculeRepository = vehiculeRepository;
        this.chauffeurRepository = chauffeurRepository;
        this.smsService = smsService;
        this.pushService = pushService;
    }

    // Conversion DTO
    private NotificationDTO toDTO(Notification n) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(n.getId());
        dto.setTitre(n.getTitre());
        dto.setMessage(n.getMessage());
        dto.setLien(n.getLien());
        dto.setType(n.getType());
        dto.setStatut(n.getStatut().name());
        dto.setDateEnvoi(n.getDateEnvoi());
        if (n.getDestinataire() != null) {
            dto.setDestinataireId(n.getDestinataire().getId());
            dto.setDestinataireNom(n.getDestinataire().getNom() + " " + n.getDestinataire().getPrenom());
        }
        if (n.getMission() != null) dto.setMissionId(n.getMission().getId());
        if (n.getMaintenance() != null) dto.setMaintenanceId(n.getMaintenance().getId());
        return dto;
    }

    // Méthode générique d'envoi
    @Transactional
    public NotificationDTO envoyerNotification(Long destinataireId, String titre, String message,
                                                TypeNotification type, String lien,
                                                Long missionId, Long maintenanceId) {
        Utilisateur destinataire = utilisateurRepository.findById(destinataireId)
                .orElseThrow(() -> new RuntimeException("Destinataire non trouvé"));

        Notification notif = new Notification();
        notif.setTitre(titre);
        notif.setMessage(message);
        notif.setLien(lien);
        notif.setType(type);
        notif.setDestinataire(destinataire);
        notif.setStatut(StatutNotification.NON_LUE);
        notif.setDateEnvoi(LocalDateTime.now());

        if (missionId != null) {
            missionRepository.findById(missionId).ifPresent(notif::setMission);
        }
        if (maintenanceId != null) {
            maintenanceRepository.findById(maintenanceId).ifPresent(notif::setMaintenance);
        }

        Notification saved = notificationRepository.save(notif);

        // Envoi push si disponible
        if (destinataire instanceof Chauffeur && ((Chauffeur) destinataire).getFcmToken() != null) {
            pushService.sendPush(((Chauffeur) destinataire).getFcmToken(), titre, message);
        }

        return toDTO(saved);
    }

    // Notifications pour missions
    public void notifierMissionAssignee(Long chauffeurId, Mission mission) {
        envoyerNotification(chauffeurId,
            "Nouvelle mission",
            "Une nouvelle mission vous a été assignée : " + mission.getDestination(),
            TypeNotification.MISSION_ASSIGNEE,
            "/missions/" + mission.getId(),
            mission.getId(), null);
    }

    public void notifierMissionModifiee(Long chauffeurId, Mission mission) {
        envoyerNotification(chauffeurId,
            "Mission modifiée",
            "La mission vers " + mission.getDestination() + " a été modifiée",
            TypeNotification.MISSION_MODIFIEE,
            "/missions/" + mission.getId(),
            mission.getId(), null);
    }

    public void notifierMissionAnnulee(Long chauffeurId, Mission mission) {
        envoyerNotification(chauffeurId,
            "Mission annulée",
            "La mission vers " + mission.getDestination() + " a été annulée",
            TypeNotification.MISSION_ANNULEE,
            "/missions",
            mission.getId(), null);
    }

    // Notifications pour maintenance
    public void notifierMaintenanceProgrammee(Long garageId, Maintenance maintenance) {
        Garage garage = maintenance.getGarage();
        if (garage != null && garage.getFcmToken() != null) {
            pushService.sendPush(garage.getFcmToken(),
                "Maintenance programmée",
                "Une maintenance est prévue pour le " + maintenance.getDatePrevue());
        }
        if (maintenance.getVehicule() != null && maintenance.getVehicule().getParc() != null) {
            envoyerNotification(maintenance.getVehicule().getParc().getChef().getId(),
                "Maintenance programmée",
                "Le véhicule " + maintenance.getVehicule().getMatricule() + " sera en maintenance le " + maintenance.getDatePrevue(),
                TypeNotification.MAINTENANCE_PROGRAMMEE,
                "/maintenances/" + maintenance.getId(),
                null, maintenance.getId());
        }
    }

    public void notifierMaintenanceImminente(Long maintenanceId) {
        Maintenance m = maintenanceRepository.findById(maintenanceId).orElse(null);
        if (m == null) return;
        if (m.getGarage() != null && m.getGarage().getFcmToken() != null) {
            pushService.sendPush(m.getGarage().getFcmToken(),
                "Maintenance imminente",
                "La maintenance prévue le " + m.getDatePrevue() + " approche");
        }
    }

    // Alertes expiration
    public void alerterExpirationAssurance(Vehicule vehicule) {
        envoyerNotification(vehicule.getParc().getChef().getId(),
            "Expiration assurance imminente",
            "L'assurance du véhicule " + vehicule.getMatricule() + " expire le " + vehicule.getDateExpirationAssurance(),
            TypeNotification.EXPIRATION_ASSURANCE,
            "/vehicules/" + vehicule.getId(),
            null, null);
    }

    public void alerterExpirationCarteGrise(Vehicule vehicule) {
        envoyerNotification(vehicule.getParc().getChef().getId(),
            "Expiration carte grise imminente",
            "La carte grise du véhicule " + vehicule.getMatricule() + " expire le " + vehicule.getDateExpirationCarteGrise(),
            TypeNotification.EXPIRATION_CARTE_GRISE,
            "/vehicules/" + vehicule.getId(),
            null, null);
    }

    public void alerterExpirationVisiteTechnique(Vehicule vehicule) {
        envoyerNotification(vehicule.getParc().getChef().getId(),
            "Expiration visite technique imminente",
            "La visite technique du véhicule " + vehicule.getMatricule() + " expire le " + vehicule.getDateExpirationVisiteTechnique(),
            TypeNotification.EXPIRATION_VISITE_TECHNIQUE,
            "/vehicules/" + vehicule.getId(),
            null, null);
    }

    // Alerte consommation
    public void alerterDepassementConsommation(Vehicule vehicule, double consommation, double seuil) {
        envoyerNotification(vehicule.getParc().getChef().getId(),
            "Dépassement de consommation",
            "Le véhicule " + vehicule.getMatricule() + " a une consommation anormale : " + consommation + " L/100km (seuil: " + seuil + ")",
            TypeNotification.DEPASSEMENT_CONSOMMATION,
            "/vehicules/" + vehicule.getId() + "/consommation",
            null, null);
    }

    // Notifications accidents/amendes
    public void notifierAccidentDeclare(Long chefParcId, Accident accident) {
        envoyerNotification(chefParcId,
            "Accident déclaré",
            "Accident déclaré pour le véhicule " + accident.getVehicule().getMatricule() +
            " par " + accident.getChauffeur().getNom() + " " + accident.getChauffeur().getPrenom(),
            TypeNotification.ACCIDENT_DECLARE,
            "/accidents/" + accident.getId(),
            null, null);
    }

    public void notifierAmendeDeclaree(Long chefParcId, Amende amende) {
        envoyerNotification(chefParcId,
            "Amende déclarée",
            "Amende déclarée pour le véhicule " + amende.getVehicule().getMatricule() +
            " - Montant: " + amende.getMontant() + " TND",
            TypeNotification.AMENDE_DECLAREE,
            "/amendes/" + amende.getId(),
            null, null);
    }

    // Notifications congés
    public void notifierNouvelleDemandeConge(Long chefParcId, Conge conge) {
        envoyerNotification(chefParcId,
            "Nouvelle demande de congé",
            "Le chauffeur " + conge.getChauffeur().getNom() + " " + conge.getChauffeur().getPrenom() +
            " a demandé un congé du " + conge.getDateDebut() + " au " + conge.getDateFin(),
            TypeNotification.CONGE_DEMANDE,
            "/conges/" + conge.getId(),
            null, null);
    }

    public void notifierCongeApprouve(Long chauffeurId, Conge conge) {
        envoyerNotification(chauffeurId,
            "Congé approuvé",
            "Votre demande de congé du " + conge.getDateDebut() + " au " + conge.getDateFin() + " a été approuvée",
            TypeNotification.CONGE_APPROUVE,
            "/conges",
            null, null);
    }

    public void notifierCongeRefuse(Long chauffeurId, Conge conge, String motif) {
        envoyerNotification(chauffeurId,
            "Congé refusé",
            "Votre demande de congé du " + conge.getDateDebut() + " au " + conge.getDateFin() +
            " a été refusée. Motif : " + motif,
            TypeNotification.CONGE_REFUSE,
            "/conges",
            null, null);
    }

    public void envoyerNotificationChauffeur(Long chauffeurId, String message) {
        envoyerNotification(chauffeurId, "Notification", message, TypeNotification.ALERTE_GENERALE, null, null, null);
    }

    // Récupération des notifications
    public List<NotificationDTO> getMesNotifications(Long utilisateurId) {
        return notificationRepository.findByDestinataireIdOrderByDateEnvoiDesc(utilisateurId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public long getNonLuesCount(Long utilisateurId) {
        return notificationRepository.countByDestinataireIdAndStatut(utilisateurId, StatutNotification.NON_LUE);
    }

    @Transactional
    public void marquerCommeLue(Long notificationId) {
        notificationRepository.updateStatut(notificationId, StatutNotification.LUE);
    }

    @Transactional
    public void marquerToutesCommeLues(Long utilisateurId) {
        List<Notification> notifications = notificationRepository.findByDestinataireIdAndStatutOrderByDateEnvoiDesc(
                utilisateurId, StatutNotification.NON_LUE);
        notifications.forEach(n -> n.setStatut(StatutNotification.LUE));
        notificationRepository.saveAll(notifications);
    }

    public void envoyerNotificationChefParc(String message) {
        // Correction : Utilisation de findByRole (supposant que le repository a cette méthode)
        // Si la méthode n'existe pas, il faudra créer une méthode dans le repository : List<Utilisateur> findByRole(String role);
        List<Utilisateur> chefs = utilisateurRepository.findByRole("CHEF");
        if (chefs.isEmpty()) {
            throw new RuntimeException("Aucun chef de parc trouvé");
        }
        Utilisateur chef = chefs.get(0);
        envoyerNotification(chef.getId(), "Notification", message, TypeNotification.ALERTE_GENERALE, null, null, null);
    }
}