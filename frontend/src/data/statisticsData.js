export const monthlyStats = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  missions: [42, 38, 45, 48, 52, 49],
  km: [4200, 3800, 5100, 4800, 5300, 4900],
  couts: [12500, 11800, 13200, 12800, 14500, 13800],
  carburant: [380, 350, 420, 400, 450, 430]
};

export const quarterlyStats = {
  Q1: {
    missions: 125,
    km: 13100,
    couts: 37500,
    carburant: 1150
  },
  Q2: {
    missions: 149,
    km: 15000,
    couts: 41100,
    carburant: 1280
  }
};

export const vehicleStats = {
  parMarque: [
    { marque: 'Renault', count: 2, km: 78500, couts: 2450 },
    { marque: 'Peugeot', count: 1, km: 38900, couts: 1850 },
    { marque: 'Citroën', count: 1, km: 51200, couts: 2100 },
    { marque: 'Ford', count: 1, km: 62300, couts: 1950 },
    { marque: 'Toyota', count: 1, km: 28700, couts: 1650 }
  ],
  parStatut: [
    { statut: 'Disponible', count: 3 },
    { statut: 'En mission', count: 2 },
    { statut: 'Maintenance', count: 1 }
  ],
  consommation: [
    { vehicule: '123TUN789', moyenne: 9.2, total: 1250 },
    { vehicule: '456TUN123', moyenne: 10.5, total: 980 },
    { vehicule: '789TUN456', moyenne: 8.9, total: 1120 },
    { vehicule: '321TUN654', moyenne: 11.2, total: 1350 },
    { vehicule: '654TUN987', moyenne: 9.8, total: 890 }
  ]
};

export const driverStats = {
  topPerformers: [
    { nom: 'Ahmed Ben Salem', missions: 45, km: 2450, satisfaction: 98 },
    { nom: 'Mohamed Ali', missions: 38, km: 2100, satisfaction: 95 },
    { nom: 'Sami Trabelsi', missions: 32, km: 1850, satisfaction: 92 },
    { nom: 'Karim Jaziri', missions: 28, km: 1420, satisfaction: 88 },
    { nom: 'Hichem Gharbi', missions: 22, km: 980, satisfaction: 96 }
  ],
  incidents: [
    { nom: 'Ahmed Ben Salem', incidents: 0 },
    { nom: 'Mohamed Ali', incidents: 1 },
    { nom: 'Sami Trabelsi', incidents: 0 },
    { nom: 'Karim Jaziri', incidents: 2 },
    { nom: 'Hichem Gharbi', incidents: 0 }
  ],
  conges: [
    { mois: 'Jan', jours: 12 },
    { mois: 'Fév', jours: 8 },
    { mois: 'Mar', jours: 15 },
    { mois: 'Avr', jours: 10 },
    { mois: 'Mai', jours: 18 },
    { mois: 'Juin', jours: 14 }
  ]
};

export const maintenanceStats = {
  parType: [
    { type: 'Vidange', count: 3, cout: 1150 },
    { type: 'Pneus', count: 2, cout: 1150 },
    { type: 'Freins', count: 1, cout: 450 },
    { type: 'Contrôle technique', count: 1, cout: 150 }
  ],
  parGarage: [
    { garage: 'Garage Central', interventions: 3, cout: 1100 },
    { garage: 'Pneus Plus', interventions: 2, cout: 1150 },
    { garage: 'Toyota Service', interventions: 1, cout: 400 },
    { garage: 'CT Tunis', interventions: 1, cout: 150 }
  ],
  delais: [
    { garage: 'Garage Central', delai: 2.5 },
    { garage: 'Pneus Plus', delai: 1.0 },
    { garage: 'Toyota Service', delai: 2.0 },
    { garage: 'CT Tunis', delai: 0.5 }
  ]
};

export const costStats = {
  total: 123456,
  parCategorie: [
    { categorie: 'Carburant', montant: 45678, pourcentage: 37 },
    { categorie: 'Maintenance', montant: 23456, pourcentage: 19 },
    { categorie: 'Assurances', montant: 12345, pourcentage: 10 },
    { categorie: 'Amendes', montant: 2345, pourcentage: 2 },
    { categorie: 'Autres', montant: 39632, pourcentage: 32 }
  ],
  evolution: [
    { mois: 'Jan', montant: 18500 },
    { mois: 'Fév', montant: 17200 },
    { mois: 'Mar', montant: 19800 },
    { mois: 'Avr', montant: 18900 },
    { mois: 'Mai', montant: 21500 },
    { mois: 'Juin', montant: 20500 }
  ]
};