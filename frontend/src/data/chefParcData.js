// Données simulées pour le dashboard du chef de parc

export const statsData = {
  vehiclesCount: 24,
  activeMissions: 8,
  driversCount: 15,
  pendingRequests: 3,
  maintenanceDue: 5,
  fuelConsumption: 1250.5, // litres ce mois
  totalKm: 4850, // km ce mois
  incidentsMonth: 2
};

export const recentMissions = [
  { id: 'M001', driver: 'Ahmed Ben Salem', vehicle: '123TUN789', destination: 'Sfax', date: '2026-03-10', status: 'En cours' },
  { id: 'M002', driver: 'Mohamed Ali', vehicle: '456TUN123', destination: 'Nabeul', date: '2026-03-09', status: 'Terminée' },
  { id: 'M003', driver: 'Sami Trabelsi', vehicle: '789TUN456', destination: 'Bizerte', date: '2026-03-09', status: 'Terminée' },
  { id: 'M004', driver: 'Karim Jaziri', vehicle: '321TUN654', destination: 'Sousse', date: '2026-03-08', status: 'Annulée' },
  { id: 'M005', driver: 'Hichem Gharbi', vehicle: '654TUN987', destination: 'Monastir', date: '2026-03-10', status: 'En cours' },
];

export const pendingRequests = [
  { id: 'R001', type: 'Congé', driver: 'Ahmed Ben Salem', date: '2026-03-15', reason: 'Personnel', status: 'En attente' },
  { id: 'R002', type: 'Excuse mission', driver: 'Mohamed Ali', date: '2026-03-12', reason: 'Urgence familiale', status: 'En attente' },
  { id: 'R003', type: 'Congé', driver: 'Sami Trabelsi', date: '2026-03-20', reason: 'Maladie', status: 'En attente' },
];

export const upcomingMaintenance = [
  { id: 'MNT001', vehicle: '123TUN789', type: 'Vidange', dueDate: '2026-03-15', km: 45230, priority: 'Haute' },
  { id: 'MNT002', vehicle: '456TUN123', type: 'Pneus', dueDate: '2026-03-18', km: 38900, priority: 'Moyenne' },
  { id: 'MNT003', vehicle: '789TUN456', type: 'Freins', dueDate: '2026-03-20', km: 51200, priority: 'Haute' },
  { id: 'MNT004', vehicle: '321TUN654', type: 'Contrôle technique', dueDate: '2026-03-25', km: 62300, priority: 'Basse' },
  { id: 'MNT005', vehicle: '654TUN987', type: 'Vidange', dueDate: '2026-03-12', km: 28700, priority: 'Urgente' },
];

export const expiringDocuments = [
  { id: 'DOC001', vehicle: '123TUN789', type: 'Assurance', expiryDate: '2026-04-01', daysLeft: 22 },
  { id: 'DOC002', vehicle: '456TUN123', type: 'Carte grise', expiryDate: '2026-03-25', daysLeft: 15 },
  { id: 'DOC003', driver: 'Ahmed Ben Salem', type: 'Permis', expiryDate: '2026-03-18', daysLeft: 8 },
  { id: 'DOC004', vehicle: '789TUN456', type: 'Visite technique', expiryDate: '2026-03-10', daysLeft: 0 }, // Aujourd'hui
];

export const fuelAlerts = [
  { id: 'F001', vehicle: '123TUN789', consumption: 12.5, average: 10.2, difference: '+2.3 L/100km' },
  { id: 'F002', vehicle: '456TUN123', consumption: 11.8, average: 9.5, difference: '+2.3 L/100km' },
];

export const driverPerformance = [
  { name: 'Ahmed Ben Salem', missions: 12, km: 2450, incidents: 0, fuelEfficiency: 9.2 },
  { name: 'Mohamed Ali', missions: 10, km: 2100, incidents: 1, fuelEfficiency: 10.5 },
  { name: 'Sami Trabelsi', missions: 8, km: 1850, incidents: 0, fuelEfficiency: 8.9 },
  { name: 'Karim Jaziri', missions: 7, km: 1420, incidents: 2, fuelEfficiency: 11.2 },
  { name: 'Hichem Gharbi', missions: 5, km: 980, incidents: 0, fuelEfficiency: 9.8 },
];