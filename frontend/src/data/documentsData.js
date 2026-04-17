export const documentsData = [
  {
    id: 'DOC001',
    type: 'Carte grise',
    vehicule: '123TUN789',
    numero: '12345678A',
    dateEmission: '2024-03-15',
    dateExpiration: '2027-03-15',
    statut: 'Valide',
    fichier: 'carte_grise_123TUN789.pdf',
    joursRestants: 365
  },
  {
    id: 'DOC002',
    type: 'Assurance',
    vehicule: '123TUN789',
    compagnie: 'ASTREE',
    numero: 'ASS-2024-1234',
    dateEmission: '2024-04-01',
    dateExpiration: '2025-04-01',
    statut: 'Expire bientôt',
    fichier: 'assurance_123TUN789.pdf',
    joursRestants: 17
  },
  {
    id: 'DOC003',
    type: 'Carte grise',
    vehicule: '456TUN123',
    numero: '87654321B',
    dateEmission: '2024-02-20',
    dateExpiration: '2027-02-20',
    statut: 'Valide',
    fichier: 'carte_grise_456TUN123.pdf',
    joursRestants: 340
  },
  {
    id: 'DOC004',
    type: 'Assurance',
    vehicule: '456TUN123',
    compagnie: 'MAGHREBIA',
    numero: 'ASS-2024-5678',
    dateEmission: '2024-05-20',
    dateExpiration: '2025-05-20',
    statut: 'Valide',
    fichier: 'assurance_456TUN123.pdf',
    joursRestants: 65
  },
  {
    id: 'DOC005',
    type: 'Permis',
    chauffeur: 'Ahmed Ben Salem',
    numero: 'TN12345678',
    dateEmission: '2022-05-15',
    dateExpiration: '2027-05-15',
    statut: 'Valide',
    fichier: 'permis_ahmed.pdf',
    joursRestants: 425
  },
  {
    id: 'DOC006',
    type: 'Permis',
    chauffeur: 'Mohamed Ali',
    numero: 'TN23456789',
    dateEmission: '2023-02-10',
    dateExpiration: '2026-11-20',
    statut: 'Expire bientôt',
    fichier: 'permis_mohamed.pdf',
    joursRestants: 250
  },
  {
    id: 'DOC007',
    type: 'Visite technique',
    vehicule: '789TUN456',
    centre: 'CT Tunis',
    dateEmission: '2024-01-15',
    dateExpiration: '2025-01-15',
    statut: 'Expiré',
    fichier: 'visite_789TUN456.pdf',
    joursRestants: -60
  },
  {
    id: 'DOC008',
    type: 'Carte grise',
    vehicule: '789TUN456',
    numero: '13579246C',
    dateEmission: '2024-01-10',
    dateExpiration: '2027-01-10',
    statut: 'Valide',
    fichier: 'carte_grise_789TUN456.pdf',
    joursRestants: 300
  }
];

export const documentsStats = {
  total: 8,
  valides: 5,
  expireBientot: 2,
  expires: 1,
  parType: {
    carteGrise: 3,
    assurance: 2,
    permis: 2,
    visiteTechnique: 1
  }
};

export const amendesData = [
  {
    id: 'AM001',
    vehicule: '123TUN789',
    date: '2026-02-15',
    lieu: 'Avenue Habib Bourguiba, Tunis',
    montant: 120,
    infraction: 'Excès de vitesse',
    statut: 'Payée',
    photo: '/images/amende1.jpg'
  },
  {
    id: 'AM002',
    vehicule: '456TUN123',
    date: '2026-02-28',
    lieu: 'Route de la Marsa',
    montant: 80,
    infraction: 'Stationnement interdit',
    statut: 'En attente',
    photo: '/images/amende2.jpg'
  },
  {
    id: 'AM003',
    vehicule: '654TUN987',
    date: '2026-03-05',
    lieu: 'Autoroute A1',
    montant: 180,
    infraction: 'Non respect feu rouge',
    statut: 'En attente',
    photo: '/images/amende3.jpg'
  }
];