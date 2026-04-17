package com.parc.domain.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "parcs")
public class Parc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String adresse;
    private Integer capacite;

    @OneToMany(mappedBy = "parc")
    private List<Vehicule> vehicules;

    @OneToMany(mappedBy = "parc")
    private List<Chauffeur> chauffeurs;

    @OneToOne(mappedBy = "parc") // ← ADDED
    private ChefDeParc chef;

    public Parc() {}

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public Integer getCapacite() { return capacite; }
    public void setCapacite(Integer capacite) { this.capacite = capacite; }

    public List<Vehicule> getVehicules() { return vehicules; }
    public void setVehicules(List<Vehicule> vehicules) { this.vehicules = vehicules; }

    public List<Chauffeur> getChauffeurs() { return chauffeurs; }
    public void setChauffeurs(List<Chauffeur> chauffeurs) { this.chauffeurs = chauffeurs; }

    public ChefDeParc getChef() { return chef; }               // ← ADDED
    public void setChef(ChefDeParc chef) { this.chef = chef; } // ← ADDED
}