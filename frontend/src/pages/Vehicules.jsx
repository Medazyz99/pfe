import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Edit,
  Trash2,
  Eye,
  Truck,
  Fuel,
  Calendar,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { vehicleService } from '../services/vehicleService';
import { exportToCSV } from '../utils/exportUtils';

const Vehicules = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const itemsPerPage = 5;

  // Charger les véhicules depuis l'API
  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await vehicleService.getAll();
      setVehicles(response.data);
    } catch (err) {
      console.error("Erreur chargement véhicules", err);
      setError("Impossible de charger les véhicules. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  // Calcul des statistiques à partir des données réelles
  const vehicleStats = {
    total: vehicles.length,
    disponibles: vehicles.filter(v => v.statut === 'Disponible').length,
    enMission: vehicles.filter(v => v.statut === 'En mission').length,
    enMaintenance: vehicles.filter(v => v.statut === 'Maintenance').length,
    assuranceExpiree: vehicles.filter(v => new Date(v.dateExpirationAssurance) < new Date()).length,
    carteGriseExpiree: vehicles.filter(v => new Date(v.dateExpirationCarteGrise) < new Date()).length,
    maintenanceImminente: vehicles.filter(v => {
      const maintenanceDate = new Date(v.dateProchaineMaintenance);
      const today = new Date();
      const diffDays = Math.ceil((maintenanceDate - today) / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays >= 0;
    }).length
  };

  // Filtrage
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.matricule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.marque?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehicle.chauffeur && vehicle.chauffeur.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = selectedStatus === 'Tous' || vehicle.statut === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Disponible': 'bg-green-100 text-green-700',
      'En mission': 'bg-blue-100 text-blue-700',
      'Maintenance': 'bg-orange-100 text-orange-700',
    };
    return statusStyles[status] || 'bg-gray-100 text-gray-700';
  };

  const handleExportCSV = () => {
    const dataToExport = vehicles.map(v => ({
      Matricule: v.matricule,
      Marque: v.marque,
      Modèle: v.modele,
      Carburant: v.typeCarburant,
      Kilométrage: v.kilometrage,
      Statut: v.statut,
      Chauffeur: v.chauffeur || '—',
      'Prochaine maintenance': v.dateProchaineMaintenance
    }));
    exportToCSV(dataToExport, 'vehicules_agil');
  };

  const handleDelete = async () => {
    if (!selectedVehicle) return;
    try {
      await vehicleService.delete(selectedVehicle.id);
      await loadVehicles(); // recharger la liste
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Erreur suppression", err);
      alert("Erreur lors de la suppression");
    }
  };

  // Stats cards (valeurs dynamiques)
  const statsCards = [
    { label: 'Total véhicules', value: vehicleStats.total, icon: Truck, color: 'blue' },
    { label: 'Disponibles', value: vehicleStats.disponibles, icon: Truck, color: 'green' },
    { label: 'En mission', value: vehicleStats.enMission, icon: Truck, color: 'purple' },
    { label: 'Maintenance', value: vehicleStats.enMaintenance, icon: Truck, color: 'orange' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
        <p className="text-red-600">{error}</p>
        <button onClick={loadVehicles} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">Réessayer</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion des Véhicules</h1>
          <p className="text-slate-500 mt-1">
            Gérez votre parc automobile • {vehicleStats.total} véhicules
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={18} />
          Nouveau véhicule
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

      {/* Alertes */}
      {(vehicleStats.assuranceExpiree > 0 || vehicleStats.carteGriseExpiree > 0 || vehicleStats.maintenanceImminente > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-amber-800">Alertes actives</h4>
              <p className="text-sm text-amber-700 mt-1">
                {vehicleStats.assuranceExpiree > 0 && `• ${vehicleStats.assuranceExpiree} assurance(s) expirée(s) `}
                {vehicleStats.carteGriseExpiree > 0 && `• ${vehicleStats.carteGriseExpiree} carte(s) grise(s) expirée(s) `}
                {vehicleStats.maintenanceImminente > 0 && `• ${vehicleStats.maintenanceImminente} maintenance(s) imminente(s)`}
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
              placeholder="Rechercher par matricule, marque ou chauffeur..."
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
              <option value="Disponible">Disponible</option>
              <option value="En mission">En mission</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
              <Filter size={18} className="text-slate-600" />
            </button>
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

      {/* Tableau des véhicules */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Matricule</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Véhicule</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Carburant</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Kilométrage</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Chauffeur</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Prochaine maintenance</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{vehicle.matricule}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-800">{vehicle.marque}</p>
                      <p className="text-sm text-slate-500">{vehicle.modele}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Fuel size={14} className="text-slate-400" />
                      <span className="text-sm text-slate-600">{vehicle.typeCarburant}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{vehicle.kilometrage?.toLocaleString()} km</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(vehicle.statut)}`}>
                      {vehicle.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{vehicle.chauffeur || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-sm text-slate-600">{vehicle.dateProchaineMaintenance}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setIsDetailModalOpen(true);
                        }}
                        className="p-1 hover:bg-slate-100 rounded"
                      >
                        <Eye size={16} className="text-slate-600" />
                      </button>
                      <button className="p-1 hover:bg-slate-100 rounded">
                        <Edit size={16} className="text-blue-600" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-1 hover:bg-slate-100 rounded"
                      >
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
            Affichage {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, filteredVehicles.length)} sur {filteredVehicles.length} véhicules
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

      {/* Modal Détails */}
      {isDetailModalOpen && selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Détails du véhicule</h2>
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
                  <p className="text-sm text-slate-500">Matricule</p>
                  <p className="font-medium text-slate-800">{selectedVehicle.matricule}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Statut</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(selectedVehicle.statut)}`}>
                    {selectedVehicle.statut}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Marque</p>
                  <p className="font-medium text-slate-800">{selectedVehicle.marque}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Modèle</p>
                  <p className="font-medium text-slate-800">{selectedVehicle.modele}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Carburant</p>
                  <p className="font-medium text-slate-800">{selectedVehicle.typeCarburant}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Kilométrage</p>
                  <p className="font-medium text-slate-800">{selectedVehicle.kilometrage?.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Chauffeur</p>
                  <p className="font-medium text-slate-800">{selectedVehicle.chauffeur || 'Non assigné'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Prochaine maintenance</p>
                  <p className="font-medium text-slate-800">{selectedVehicle.dateProchaineMaintenance}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Expiration carte grise</p>
                  <p className="font-medium text-slate-800">{selectedVehicle.carteGriseExpiration}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Expiration assurance</p>
                  <p className="font-medium text-slate-800">{selectedVehicle.assuranceExpiration}</p>
                </div>
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

      {/* Modal Suppression */}
      {isDeleteModalOpen && selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertTriangle size={24} />
                <h3 className="text-lg font-bold">Confirmer la suppression</h3>
              </div>
              <p className="text-slate-600">
                Êtes-vous sûr de vouloir supprimer le véhicule <span className="font-medium">{selectedVehicle.matricule}</span> ? Cette action est irréversible.
              </p>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicules;