package com.parc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class UserDetailsServiceConfig {

    private final PasswordEncoder passwordEncoder;

    // Constructeur explicite (remplace @RequiredArgsConstructor)
    public UserDetailsServiceConfig(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        // Administrateur avec email complet
        UserDetails admin = User.withUsername("admin@agil.com")
                .password(passwordEncoder.encode("admin123"))
                .roles("ADMIN")
                .build();

        // Administrateur avec simple "admin" (optionnel)
        UserDetails adminSimple = User.withUsername("admin")
                .password(passwordEncoder.encode("admin123"))
                .roles("ADMIN")
                .build();

        // Opérateur maintenance
        UserDetails operateur = User.withUsername("karim@garage.com")
                .password(passwordEncoder.encode("default123"))
                .roles("OPERATEUR_MAINTENANCE")
                .build();

        // Chef de parc (à ajouter pour tester)
        UserDetails chefParc = User.withUsername("chef@agil.com")
                .password(passwordEncoder.encode("chef123"))
                .roles("CHEF_PARc")
                .build();

        // Chauffeur (à ajouter pour tester)
        UserDetails chauffeur = User.withUsername("chauffeur@agil.com")
                .password(passwordEncoder.encode("chauffeur123"))
                .roles("CHAUFFEUR")
                .build();

        return new InMemoryUserDetailsManager(admin, adminSimple, operateur, chefParc, chauffeur);
    }
}