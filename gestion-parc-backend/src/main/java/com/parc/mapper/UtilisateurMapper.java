package com.parc.mapper;

import com.parc.domain.entity.Utilisateur;
import com.parc.dto.UtilisateurDTO;

public class UtilisateurMapper {

    // 🔄 Entity ➜ DTO
    public static UtilisateurDTO toDTO(Utilisateur user) {
        if (user == null) {
            return null;
        }

        UtilisateurDTO dto = new UtilisateurDTO();
        dto.setId(user.getId());
        dto.setNom(user.getNom());
        dto.setEmail(user.getEmail());
        dto.setTelephone(user.getTelephone());
        dto.setRole(user.getRole());
        dto.setActif(user.isActif());

        return dto;
    }

    // 🔄 DTO ➜ Entity
    public static Utilisateur toEntity(UtilisateurDTO dto) {
        if (dto == null) {
            return null;
        }

        Utilisateur user = new Utilisateur();
        user.setId(dto.getId());
        user.setNom(dto.getNom());
        user.setEmail(dto.getEmail());
        user.setTelephone(dto.getTelephone());
        user.setRole(dto.getRole());
        user.setActif(dto.isActif());

        return user;
    }

    // 🔄 Update Entity (important pour PUT)
    public static void updateEntity(Utilisateur user, UtilisateurDTO dto) {
        if (user == null || dto == null) {
            return;
        }

        user.setNom(dto.getNom());
        user.setEmail(dto.getEmail());
        user.setTelephone(dto.getTelephone());
        user.setRole(dto.getRole());
        user.setActif(dto.isActif());
    }
}