package com.parc.service;

import com.parc.domain.entity.Utilisateur;
import com.parc.dto.UtilisateurDTO;
import com.parc.mapper.UtilisateurMapper;
import com.parc.repository.UtilisateurRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UtilisateurService implements UserDetailsService {

    private final UtilisateurRepository repository;

    // Constructeur explicite (remplace @RequiredArgsConstructor)
    public UtilisateurService(UtilisateurRepository repository) {
        this.repository = repository;
    }

    // ✅ CREATE
    public UtilisateurDTO create(UtilisateurDTO dto) {
        Utilisateur user = UtilisateurMapper.toEntity(dto);
        return UtilisateurMapper.toDTO(repository.save(user));
    }

    // ✅ GET ALL
    public List<UtilisateurDTO> getAll() {
        return repository.findAll()
                .stream()
                .map(UtilisateurMapper::toDTO)
                .collect(Collectors.toList());
    }

    // ✅ GET BY ID
    public UtilisateurDTO getById(Long id) {
        Utilisateur user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        return UtilisateurMapper.toDTO(user);
    }

    // ✅ UPDATE
    public UtilisateurDTO update(Long id, UtilisateurDTO dto) {
        Utilisateur user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // 🔥 utilisation mapper update
        UtilisateurMapper.updateEntity(user, dto);

        return UtilisateurMapper.toDTO(repository.save(user));
    }

    // ✅ DELETE
    public void delete(Long id) {
        repository.deleteById(id);
    }

    // ✅ UserDetailsService (pour Spring Security)
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Utilisateur user = repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec email : " + email));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getMotDePasse())
                .authorities("ROLE_" + user.getRole().name())
                .build();
    }
}