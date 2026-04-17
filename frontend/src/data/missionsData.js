export const missionsData = [
  {
    id: 'M001',
    titre: 'Livraison matériel médical Sfax',
    chauffeur: 'Ahmed Ben Salem',
    vehicule: '123TUN789',
    dateDepart: '2026-03-15',
    dateRetour: '2026-03-16',
    destination: 'Sfax',
    distance: 280,
    statut: 'Planifiée',
    priorite: 'Haute',
    description: 'Livraison de matériel médical à l\'hôpital de Sfax',
    feuilleRoute: ['Tunis', 'Sousse', 'Sfax']
  },
  {
    id: 'M002',
    titre: 'Transport marchandises Nabeul',
    chauffeur: 'Mohamed Ali',
    vehicule: '456TUN123',
    dateDepart: '2026-03-15',
    dateRetour: '2026-03-15',
    destination: 'Nabeul',
    distance: 120,
    statut: 'En cours',
    priorite: 'Moyenne',
    description: 'Transport de produits frais vers Nabeul',
    feuilleRoute: ['Tunis', 'Hammamet', 'Nabeul']
  },
  {
    id: 'M003',
    titre: 'Maintenance équipements Bizerte',
    chauffeur: 'Sami Trabelsi',
    vehicule: '789TUN456',
    dateDepart: '2026-03-14',
    dateRetour: '2026-03-15',
    destination: 'Bizerte',
    distance: 150,
    statut: 'Terminée',
    priorite: 'Basse',
    description: 'Maintenance des équipements à l\'usine de Bizerte',
    feuilleRoute: ['Tunis', 'Utique', 'Bizerte']
  },
  {
    id: 'M004',
    titre: 'Livraison pièces détachées Sousse',
    chauffeur: 'Karim Jaziri',
    vehicule: '321TUN654',
    dateDepart: '2026-03-13',
    dateRetour: '2026-03-14',
    destination: 'Sousse',
    distance: 200,
    statut: 'Annulée',
    priorite: 'Moyenne',
    description: 'Livraison de pièces détachées',
    feuilleRoute: ['Tunis', 'Sousse']
  },
  {
    id: 'M005',
    titre: 'Mission commerciale Monastir',
    chauffeur: 'Hichem Gharbi',
    vehicule: '654TUN987',
    dateDepart: '2026-03-16',
    dateRetour: '2026-03-17',
    destination: 'Monastir',
    distance: 180,
    statut: 'Planifiée',
    priorite: 'Haute',
    description: 'Visite clients à Monastir',
    feuilleRoute: ['Tunis', 'Monastir']
  },
  {
    id: 'M006',
    titre: 'Transfert véhicule Gabès',
    chauffeur: null,
    vehicule: '987TUN321',
    dateDepart: '2026-03-18',
    dateRetour: '2026-03-19',
    destination: 'Gabès',
    distance: 350,
    statut: 'Planifiée',
    priorite: 'Basse',
    description: 'Transfert de véhicule vers concession Gabès',
    feuilleRoute: ['Tunis', 'Sfax', 'Gabès']
  }
];

export const missionsStats = {
  total: 6,
  planifiees: 3,
  enCours: 1,
  terminees: 1,
  annulees: 1,
  distanceTotale: 1280,
  missionsHautePriorite: 2
};

export const chauffeursDisponibles = [
  { id: 1, nom: 'Ahmed Ben Salem', disponible: true },
  { id: 2, nom: 'Mohamed Ali', disponible: false },
  { id: 3, nom: 'Sami Trabelsi', disponible: true },
  { id: 4, nom: 'Karim Jaziri', disponible: true },
  { id: 5, nom: 'Hichem Gharbi', disponible: false },
];

export const vehiculesDisponibles = [
  { id: 1, matricule: '123TUN789', disponible: true },
  { id: 2, matricule: '456TUN123', disponible: false },
  { id: 3, matricule: '789TUN456', disponible: false },
  { id: 4, matricule: '321TUN654', disponible: true },
  { id: 5, matricule: '654TUN987', disponible: true },
];