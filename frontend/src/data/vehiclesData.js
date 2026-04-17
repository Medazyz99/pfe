export const vehiclesData = [
  {
    id: 1,
    matricule: '123TUN789',
    marque: 'Renault',
    modele: 'Trafic',
    typeCarburant: 'Diesel',
    kilometrage: 45230,
    statut: 'Disponible',
    chauffeur: 'Ahmed Ben Salem',
    dateProchaineMaintenance: '2026-03-15',
    carteGriseExpiration: '2026-12-31',
    assuranceExpiration: '2026-04-01',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    matricule: '456TUN123',
    marque: 'Peugeot',
    modele: 'Partner',
    typeCarburant: 'Essence',
    kilometrage: 38900,
    statut: 'En mission',
    chauffeur: 'Mohamed Ali',
    dateProchaineMaintenance: '2026-03-18',
    carteGriseExpiration: '2026-10-15',
    assuranceExpiration: '2026-05-20',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    matricule: '789TUN456',
    marque: 'Citroën',
    modele: 'Jumpy',
    typeCarburant: 'Diesel',
    kilometrage: 51200,
    statut: 'Maintenance',
    chauffeur: null,
    dateProchaineMaintenance: '2026-03-20',
    carteGriseExpiration: '2026-08-30',
    assuranceExpiration: '2026-03-25',
    image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    matricule: '321TUN654',
    marque: 'Ford',
    modele: 'Transit',
    typeCarburant: 'Diesel',
    kilometrage: 62300,
    statut: 'Disponible',
    chauffeur: null,
    dateProchaineMaintenance: '2026-03-25',
    carteGriseExpiration: '2026-07-12',
    assuranceExpiration: '2026-06-18',
    image: 'https://images.unsplash.com/photo-1580903077665-3b4981c5b9e8?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    matricule: '654TUN987',
    marque: 'Toyota',
    modele: 'Hilux',
    typeCarburant: 'Diesel',
    kilometrage: 28700,
    statut: 'En mission',
    chauffeur: 'Hichem Gharbi',
    dateProchaineMaintenance: '2026-03-12',
    carteGriseExpiration: '2027-01-05',
    assuranceExpiration: '2026-09-14',
    image: 'https://images.unsplash.com/photo-1583264799786-3c4b3a9e7b9d?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    matricule: '987TUN321',
    marque: 'Volkswagen',
    modele: 'Caddy',
    typeCarburant: 'Essence',
    kilometrage: 15400,
    statut: 'Disponible',
    chauffeur: null,
    dateProchaineMaintenance: '2026-04-05',
    carteGriseExpiration: '2027-02-28',
    assuranceExpiration: '2026-11-10',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop'
  }
];

export const vehicleStats = {
  total: 6,
  disponibles: 3,
  enMission: 2,
  enMaintenance: 1,
  assuranceExpiree: 1,
  carteGriseExpiree: 0,
  maintenanceImminente: 2
};