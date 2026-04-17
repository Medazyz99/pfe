import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  User,
  Truck,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  X               // <--- Ajout : icône pour fermer les modales
} from 'lucide-react';
import { missionsData, missionsStats, chauffeursDisponibles, vehiculesDisponibles } from '../data/missionsData';
import { exportToCSV } from '../utils/exportUtils';   // <--- Ajout

const Missions = () => {
  const [missions, setMissions] = useState(missionsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [selectedPriority, setSelectedPriority] = useState('Toutes');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMission, setSelectedMission] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFeuilleRouteOpen, setIsFeuilleRouteOpen] = useState(false);
  const [isNewMissionModalOpen, setIsNewMissionModalOpen] = useState(false);
  
  const itemsPerPage = 5;

  // Données pour le formulaire de nouvelle mission
  const [newMission, setNewMission] = useState({
    titre: '',
    chauffeur: '',
    vehicule: '',
    dateDepart: '',
    dateRetour: '',
    destination: '',
    description: '',
    priorite: 'Moyenne'
  });

  // Filtrage des missions
  const filteredMissions = missions.filter(mission => {
    const matchesSearch = 
      mission.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mission.chauffeur && mission.chauffeur.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = selectedStatus === 'Tous' || mission.statut === selectedStatus;
    const matchesPriority = selectedPriority === 'Toutes' || mission.priorite === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMissions.length / itemsPerPage);
  const paginatedMissions = filteredMissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistiques rapides
  const statsCards = [
    { label: 'Total missions', value: missionsStats.total, icon: Calendar, color: 'blue' },
    { label: 'En cours', value: missionsStats.enCours, icon: Clock, color: 'green' },
    { label: 'Planifiées', value: missionsStats.planifiees, icon: Calendar, color: 'purple' },
    { label: 'Terminées', value: missionsStats.terminees, icon: CheckCircle, color: 'gray' },
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Planifiée': 'bg-blue-100 text-blue-700',
      'En cours': 'bg-green-100 text-green-700',
      'Terminée': 'bg-gray-100 text-gray-700',
      'Annulée': 'bg-red-100 text-red-700',
    };
    return statusStyles[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityBadge = (priority) => {
    const priorityStyles = {
      'Haute': 'bg-red-100 text-red-700',
      'Moyenne': 'bg-yellow-100 text-yellow-700',
      'Basse': 'bg-green-100 text-green-700',
    };
    return priorityStyles[priority] || 'bg-gray-100 text-gray-700';
  };

  // --- Fonction d'export CSV ---
  const handleExportCSV = () => {
    const dataToExport = missions.map(m => ({
      ID: m.id,
      Titre: m.titre,
      Destination: m.destination,
      Chauffeur: m.chauffeur || '—',
      Véhicule: m.vehicule,
      'Départ': m.dateDepart,
      'Retour': m.dateRetour,
      Statut: m.statut,
      Priorité: m.priorite,
      Description: m.description
    }));
    exportToCSV(dataToExport, 'missions_agil');
  };
  // --- Fin ajout ---

  const handleNewMissionSubmit = (e) => {
    e.preventDefault();
    // Générer un ID unique
    const newId = `M${String(missions.length + 1).padStart(3, '0')}`;
    
    const missionToAdd = {
      id: newId,
      ...newMission,
      distance: 0, // À calculer plus tard
      statut: 'Planifiée',
      feuilleRoute: [newMission.destination]
    };
    
    setMissions([missionToAdd, ...missions]);
    setIsNewMissionModalOpen(false);
    setNewMission({
      titre: '',
      chauffeur: '',
      vehicule: '',
      dateDepart: '',
      dateRetour: '',
      destination: '',
      description: '',
      priorite: 'Moyenne'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion des Missions</h1>
          <p className="text-slate-500 mt-1">
            Gérez toutes les missions • {missionsStats.total} missions, {missionsStats.distanceTotale} km parcourus
          </p>
        </div>
        <button 
          onClick={() => setIsNewMissionModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Nouvelle mission
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alertes missions haute priorité */}
      {missionsStats.missionsHautePriorite > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-red-800">Missions haute priorité</h4>
              <p className="text-sm text-red-700 mt-1">
                {missionsStats.missionsHautePriorite} mission(s) haute priorité nécessitent votre attention
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher par titre, destination ou chauffeur..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select 
              className="border border-slate-200 rounded-lg px-3 py-2 bg-white"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="Tous">Tous les statuts</option>
              <option value="Planifiée">Planifiée</option>
              <option value="En cours">En cours</option>
              <option value="Terminée">Terminée</option>
              <option value="Annulée">Annulée</option>
            </select>
            <select 
              className="border border-slate-200 rounded-lg px-3 py-2 bg-white"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="Toutes">Toutes priorités</option>
              <option value="Haute">Haute</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
              <Filter size={18} className="text-slate-600" />
            </button>
            {/* Bouton Export CSV modifié */}
            <button 
              onClick={handleExportCSV}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"
              title="Exporter en CSV"
            >
              <Download size={18} className="text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Tableau des missions */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Mission</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Chauffeur</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Véhicule</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Dates</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Destination</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Priorité</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedMissions.map((mission) => (
                <tr key={mission.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-800">{mission.titre}</p>
                      <p className="text-xs text-slate-500">{mission.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {mission.chauffeur ? (
                      <div className="flex items-center gap-1">
                        <User size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600">{mission.chauffeur}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400">Non assigné</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {mission.vehicule ? (
                      <div className="flex items-center gap-1">
                        <Truck size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600">{mission.vehicule}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col text-sm">
                      <span className="text-slate-600">Départ: {mission.dateDepart}</span>
                      <span className="text-slate-500">Retour: {mission.dateRetour}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-slate-400" />
                      <span className="text-sm text-slate-600">{mission.destination}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(mission.statut)}`}>
                      {mission.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityBadge(mission.priorite)}`}>
                      {mission.priorite}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setSelectedMission(mission);
                          setIsFeuilleRouteOpen(true);
                        }}
                        className="p-1 hover:bg-slate-100 rounded"
                        title="Voir feuille de route"
                      >
                        <FileText size={16} className="text-blue-600" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedMission(mission);
                          setIsDetailModalOpen(true);
                        }}
                        className="p-1 hover:bg-slate-100 rounded"
                        title="Voir détails"
                      >
                        <Eye size={16} className="text-slate-600" />
                      </button>
                      <button className="p-1 hover:bg-slate-100 rounded" title="Modifier">
                        <Edit size={16} className="text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-slate-100 rounded" title="Supprimer">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Affichage {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, filteredMissions.length)} sur {filteredMissions.length} missions
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-4 py-2 border border-slate-200 rounded-lg">
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Nouvelle Mission */}
      {isNewMissionModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Nouvelle mission</h2>
              <button 
                onClick={() => setIsNewMissionModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleNewMissionSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Titre de la mission
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMission.titre}
                    onChange={(e) => setNewMission({...newMission, titre: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Chauffeur
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newMission.chauffeur}
                      onChange={(e) => setNewMission({...newMission, chauffeur: e.target.value})}
                    >
                      <option value="">Sélectionner</option>
                      {chauffeursDisponibles.filter(c => c.disponible).map(c => (
                        <option key={c.id} value={c.nom}>{c.nom}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Véhicule
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newMission.vehicule}
                      onChange={(e) => setNewMission({...newMission, vehicule: e.target.value})}
                    >
                      <option value="">Sélectionner</option>
                      {vehiculesDisponibles.filter(v => v.disponible).map(v => (
                        <option key={v.id} value={v.matricule}>{v.matricule}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Date départ
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newMission.dateDepart}
                      onChange={(e) => setNewMission({...newMission, dateDepart: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Date retour
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newMission.dateRetour}
                      onChange={(e) => setNewMission({...newMission, dateRetour: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMission.destination}
                    onChange={(e) => setNewMission({...newMission, destination: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Priorité
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMission.priorite}
                    onChange={(e) => setNewMission({...newMission, priorite: e.target.value})}
                  >
                    <option value="Haute">Haute</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Basse">Basse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMission.description}
                    onChange={(e) => setNewMission({...newMission, description: e.target.value})}
                  />
                </div>
              </div>
              <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewMissionModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Créer la mission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Détails Mission */}
      {isDetailModalOpen && selectedMission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Détails de la mission</h2>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Titre</p>
                  <p className="font-medium text-slate-800">{selectedMission.titre}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">ID Mission</p>
                  <p className="font-medium text-slate-800">{selectedMission.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Chauffeur</p>
                  <p className="font-medium text-slate-800">{selectedMission.chauffeur || 'Non assigné'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Véhicule</p>
                  <p className="font-medium text-slate-800">{selectedMission.vehicule || 'Non assigné'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Destination</p>
                  <p className="font-medium text-slate-800">{selectedMission.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Distance</p>
                  <p className="font-medium text-slate-800">{selectedMission.distance} km</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Date départ</p>
                  <p className="font-medium text-slate-800">{selectedMission.dateDepart}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Date retour</p>
                  <p className="font-medium text-slate-800">{selectedMission.dateRetour}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Statut</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(selectedMission.statut)}`}>
                    {selectedMission.statut}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Priorité</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityBadge(selectedMission.priorite)}`}>
                    {selectedMission.priorite}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-2">Description</p>
                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">
                  {selectedMission.description}
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Fermer
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Feuille de Route */}
      {isFeuilleRouteOpen && selectedMission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Feuille de route</h2>
              <button 
                onClick={() => setIsFeuilleRouteOpen(false)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="font-medium text-slate-800 mb-4">{selectedMission.titre}</p>
              <div className="relative">
                {selectedMission.feuilleRoute.map((etape, index) => (
                  <div key={index} className="flex items-start gap-3 mb-4 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow"></div>
                      {index < selectedMission.feuilleRoute.length - 1 && (
                        <div className="w-0.5 h-8 bg-blue-200"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{etape}</p>
                      <p className="text-sm text-slate-500">
                        {index === 0 ? 'Départ' : index === selectedMission.feuilleRoute.length - 1 ? 'Arrivée' : `Étape ${index}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setIsFeuilleRouteOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Missions;