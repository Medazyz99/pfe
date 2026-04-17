export const maintenanceData = [
  {
    id: 'MNT001',
    vehicule: '123TUN789',
    marque: 'Renault Trafic',
    type: 'Vidange',
    datePrevue: '2026-03-15',
    dateReelle: null,
    kilometrage: 45230,
    prochainKilometrage: 55230,
    statut: 'Planifiée',
    priorite: 'Haute',
    garage: 'Garage Central',
    cout: 350,
    description: 'Vidange moteur + filtres'
  },
  {
    id: 'MNT002',
    vehicule: '456TUN123',
    marque: 'Peugeot Partner',
    type: 'Pneus',
    datePrevue: '2026-03-18',
    dateReelle: null,
    kilometrage: 38900,
    prochainKilometrage: 48900,
    statut: 'Planifiée',
    priorite: 'Moyenne',
    garage: 'Pneus Plus',
    cout: 600,
    description: 'Remplacement 4 pneus + équilibrage'
  },
  {
    id: 'MNT003',
    vehicule: '789TUN456',
    marque: 'Citroën Jumpy',
    type: 'Freins',
    datePrevue: '2026-03-10',
    dateReelle: '2026-03-10',
    kilometrage: 51200,
    prochainKilometrage: 61200,
    statut: 'Terminée',
    priorite: 'Haute',
    garage: 'Garage Central',
    cout: 450,
    description: 'Changement plaquettes + disques'
  },
  {
    id: 'MNT004',
    vehicule: '321TUN654',
    marque: 'Ford Transit',
    type: 'Contrôle technique',
    datePrevue: '2026-03-25',
    dateReelle: null,
    kilometrage: 62300,
    prochainKilometrage: 72300,
    statut: 'Planifiée',
    priorite: 'Basse',
    garage: 'CT Tunis',
    cout: 150,
    description: 'Contrôle technique périodique'
  },
  {
    id: 'MNT005',
    vehicule: '654TUN987',
    marque: 'Toyota Hilux',
    type: 'Vidange',
    datePrevue: '2026-03-12',
    dateReelle: '2026-03-12',
    kilometrage: 28700,
    prochainKilometrage: 38700,
    statut: 'Terminée',
    priorite: 'Urgente',
    garage: 'Toyota Service',
    cout: 400,
    description: 'Vidange + révision 30000 km'
  },
  {
    id: 'MNT006',
    vehicule: '123TUN789',
    marque: 'Renault Trafic',
    type: 'Diagnostic',
    datePrevue: '2026-03-20',
    dateReelle: null,
    kilometrage: 45230,
    prochainKilometrage: 55230,
    statut: 'Planifiée',
    priorite: 'Moyenne',
    garage: 'Garage Central',
    cout: 200,
    description: 'Voyant moteur allumé'
  }
];

export const maintenanceStats = {
  total: 6,
  planifiees: 4,
  terminees: 2,
  urgentes: 1,
  hautesPriorite: 2,
  coutTotal: 2150,
  prochainesMaintenances: 3
};

export const garagesData = [
  {
    id: 1,
    nom: 'Garage Central',
    adresse: '15 Avenue Habib Bourguiba, Tunis',
    telephone: '71 234 567',
    specialite: 'Généraliste',
    interventions: 45,
    note: 4.5
  },
  {
    id: 2,
    nom: 'Pneus Plus',
    adresse: '8 Rue de Marseille, Tunis',
    telephone: '71 345 678',
    specialite: 'Pneumatiques',
    interventions: 28,
    note: 4.2
  },
  {
    id: 3,
    nom: 'Toyota Service',
    adresse: '42 Avenue de Carthage, Tunis',
    telephone: '71 456 789',
    specialite: 'Toyota',
    interventions: 32,
    note: 4.8
  },
  {
    id: 4,
    nom: 'CT Tunis',
    adresse: '5 Route de la Marsa, Tunis',
    telephone: '71 567 890',
    specialite: 'Contrôle technique',
    interventions: 120,
    note: 4.0
  }
];

export const historiqueMaintenance = [
  {
    id: 'H001',
    vehicule: '123TUN789',
    date: '2026-02-15',
    type: 'Vidange',
    garage: 'Garage Central',
    cout: 350,
    kilometrage: 43200
  },
  {
    id: 'H002',
    vehicule: '456TUN123',
    date: '2026-02-10',
    type: 'Freins',
    garage: 'Garage Central',
    cout: 400,
    kilometrage: 37500
  },
  {
    id: 'H003',
    vehicule: '789TUN456',
    date: '2026-02-05',
    type: 'Pneus',
    garage: 'Pneus Plus',
    cout: 550,
    kilometrage: 49800
  }
];