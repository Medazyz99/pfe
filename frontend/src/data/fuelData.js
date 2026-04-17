export const fuelData = [
  {
    id: 'CRB001',
    vehicule: '123TUN789',
    chauffeur: 'Ahmed Ben Salem',
    date: '2026-03-15',
    quantite: 45.5,
    prix: 2.35,
    montant: 106.93,
    station: 'STAR - Tunis',
    carte: 'CARTE001',
    type: 'Diesel',
    kilometrage: 45230,
    consommation: 9.2
  },
  {
    id: 'CRB002',
    vehicule: '456TUN123',
    chauffeur: 'Mohamed Ali',
    date: '2026-03-14',
    quantite: 38.2,
    prix: 2.35,
    montant: 89.77,
    station: 'SHELL - La Marsa',
    carte: 'CARTE002',
    type: 'Essence',
    kilometrage: 38900,
    consommation: 10.5
  },
  {
    id: 'CRB003',
    vehicule: '789TUN456',
    chauffeur: 'Sami Trabelsi',
    date: '2026-03-13',
    quantite: 52.0,
    prix: 2.35,
    montant: 122.20,
    station: 'TOTAL - Sousse',
    carte: 'CARTE003',
    type: 'Diesel',
    kilometrage: 51200,
    consommation: 8.9
  },
  {
    id: 'CRB004',
    vehicule: '321TUN654',
    chauffeur: 'Karim Jaziri',
    date: '2026-03-12',
    quantite: 41.8,
    prix: 2.35,
    montant: 98.23,
    station: 'STAR - Nabeul',
    carte: 'CARTE004',
    type: 'Diesel',
    kilometrage: 62300,
    consommation: 11.2
  },
  {
    id: 'CRB005',
    vehicule: '654TUN987',
    chauffeur: 'Hichem Gharbi',
    date: '2026-03-11',
    quantite: 33.5,
    prix: 2.35,
    montant: 78.73,
    station: 'AGIL - Bizerte',
    carte: 'CARTE005',
    type: 'Diesel',
    kilometrage: 28700,
    consommation: 9.8
  }
];

export const fuelStats = {
  totalLiters: 211,
  totalMontant: 495.86,
  moyenneConsommation: 9.92,
  vehicules: 5,
  cartesActives: 5,
  anomalies: 2
};

export const fuelAlerts = [
  {
    id: 'AL001',
    vehicule: '456TUN123',
    type: 'Consommation anormale',
    valeur: 10.5,
    moyenne: 9.2,
    difference: '+14%',
    date: '2026-03-14'
  },
  {
    id: 'AL002',
    vehicule: '321TUN654',
    type: 'Consommation anormale',
    valeur: 11.2,
    moyenne: 9.2,
    difference: '+22%',
    date: '2026-03-12'
  }
];

export const fuelCards = [
  {
    id: 'CARTE001',
    numero: '1234-5678-9012-3456',
    vehicule: '123TUN789',
    plafond: 500,
    utilise: 325.50,
    reste: 174.50,
    statut: 'Active',
    dateExpiration: '2027-12-31'
  },
  {
    id: 'CARTE002',
    numero: '2345-6789-0123-4567',
    vehicule: '456TUN123',
    plafond: 500,
    utilise: 412.80,
    reste: 87.20,
    statut: 'Active',
    dateExpiration: '2027-12-31'
  },
  {
    id: 'CARTE003',
    numero: '3456-7890-1234-5678',
    vehicule: '789TUN456',
    plafond: 500,
    utilise: 278.90,
    reste: 221.10,
    statut: 'Active',
    dateExpiration: '2027-12-31'
  },
  {
    id: 'CARTE004',
    numero: '4567-8901-2345-6789',
    vehicule: '321TUN654',
    plafond: 500,
    utilise: 456.20,
    reste: 43.80,
    statut: 'Active',
    dateExpiration: '2027-12-31'
  },
  {
    id: 'CARTE005',
    numero: '5678-9012-3456-7890',
    vehicule: '654TUN987',
    plafond: 500,
    utilise: 234.60,
    reste: 265.40,
    statut: 'Active',
    dateExpiration: '2027-12-31'
  }
];