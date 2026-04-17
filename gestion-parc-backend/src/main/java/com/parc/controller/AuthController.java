package com.parc.controller;

import com.parc.domain.entity.Utilisateur;
import com.parc.repository.UtilisateurRepository;
import com.parc.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (!passwordEncoder.matches(password, utilisateur.getMotDePasse())) {
            throw new RuntimeException("Mot de passe incorrect");
        }

        String token = jwtUtil.generateToken(utilisateur.getEmail(), utilisateur.getRole().name());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
            "id", utilisateur.getId(),
            "email", utilisateur.getEmail(),
            "role", utilisateur.getRole().name(),
            "nom", utilisateur.getNom(),
            "prenom", utilisateur.getPrenom(),
            "photo", "https://ui-avatars.com/api/?name=" + utilisateur.getPrenom() + "+" + utilisateur.getNom()
        ));
        return response;
    }
}