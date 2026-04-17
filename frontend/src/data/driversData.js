export const driversData = [
  {
    id: 1,
    nom: 'Ben Salem',
    prenom: 'Ahmed',
    email: 'ahmed.bensalem@fleetpro.tn',
    telephone: '98 765 432',
    numeroPermis: 'TN12345678',
    dateExpirationPermis: '2027-05-15',
    dateEmbauche: '2023-02-10',
    disponible: true,
    vehiculeActuel: '123TUN789',
    missionsEffectuees: 45,
    kilometresParcourus: 12450,
    incidents: 0,
    congesRestants: 15,
    photo: 'https://ui-avatars.com/api/?name=Ahmed+Ben+Salem&background=3b82f6&color=fff&size=128'
  },
  {
    id: 2,
    nom: 'Ali',
    prenom: 'Mohamed',
    email: 'mohamed.ali@fleetpro.tn',
    telephone: '97 654 321',
    numeroPermis: 'TN23456789',
    dateExpirationPermis: '2026-11-20',
    dateEmbauche: '2023-05-15',
    disponible: false,
    vehiculeActuel: '456TUN123',
    missionsEffectuees: 38,
    kilometresParcourus: 11200,
    incidents: 1,
    congesRestants: 12,
    photo: 'https://ui-avatars.com/api/?name=Mohamed+Ali&background=10b981&color=fff&size=128'
  },
  {
    id: 3,
    nom: 'Trabelsi',
    prenom: 'Sami',
    email: 'sami.trabelsi@fleetpro.tn',
    telephone: '96 543 210',
    numeroPermis: 'TN34567890',
    dateExpirationPermis: '2026-08-30',
    dateEmbauche: '2023-08-20',
    disponible: true,
    vehiculeActuel: '789TUN456',
    missionsEffectuees: 32,
    kilometresParcourus: 9850,
    incidents: 0,
    congesRestants: 18,
    photo: 'https://ui-avatars.com/api/?name=Sami+Trabelsi&background=f59e0b&color=fff&size=128'
  },
  {
    id: 4,
    nom: 'Jaziri',
    prenom: 'Karim',
    email: 'karim.jaziri@fleetpro.tn',
    telephone: '95 432 109',
    numeroPermis: 'TN45678901',
    dateExpirationPermis: '2027-02-28',
    dateEmbauche: '2023-11-05',
    disponible: true,
    vehiculeActuel: '321TUN654',
    missionsEffectuees: 28,
    kilometresParcourus: 8420,
    incidents: 2,
    congesRestants: 10,
    photo: 'https://ui-avatars.com/api/?name=Karim+Jaziri&background=ef4444&color=fff&size=128'
  },
  {
    id: 5,
    nom: 'Gharbi',
    prenom: 'Hichem',
    email: 'hichem.gharbi@fleetpro.tn',
    telephone: '94 321 098',
    numeroPermis: 'TN56789012',
    dateExpirationPermis: '2026-12-10',
    dateEmbauche: '2024-01-15',
    disponible: false,
    vehiculeActuel: '654TUN987',
    missionsEffectuees: 22,
    kilometresParcourus: 6780,
    incidents: 0,
    congesRestants: 22,
    photo: 'https://ui-avatars.com/api/?name=Hichem+Gharbi&background=8b5cf6&color=fff&size=128'
  }
];

export const driversStats = {
  total: 5,
  disponibles: 3,
  enMission: 2,
  enConges: 0,
  totalMissions: 165,
  totalKilometres: 48700,
  permisExpireBientot: 2,
  incidentsTotal: 3
};

export const congesData = [
  {
    id: 1,
    chauffeurId: 1,
    chauffeurNom: 'Ahmed Ben Salem',
    dateDebut: '2026-04-01',
    dateFin: '2026-04-07',
    type: 'Congé annuel',
    statut: 'Approuvé',
    raison: 'Vacances familiales'
  },
  {
    id: 2,
    chauffeurId: 2,
    chauffeurNom: 'Mohamed Ali',
    dateDebut: '2026-03-20',
    dateFin: '2026-03-22',
    type: 'Maladie',
    statut: 'En attente',
    raison: 'Maladie avec certificat'
  },
  {
    id: 3,
    chauffeurId: 4,
    chauffeurNom: 'Karim Jaziri',
    dateDebut: '2026-03-25',
    dateFin: '2026-03-26',
    type: 'Personnel',
    statut: 'Approuvé',
    raison: 'Urgence personnelle'
  },
  {
    id: 4,
    chauffeurId: 3,
    chauffeurNom: 'Sami Trabelsi',
    dateDebut: '2026-04-10',
    dateFin: '2026-04-15',
    type: 'Congé annuel',
    statut: 'En attente',
    raison: 'Vacances'
  }
];