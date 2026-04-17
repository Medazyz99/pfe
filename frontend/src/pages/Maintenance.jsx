import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Filter, Download, Edit, Trash2, Eye,
  Calendar, Wrench, Truck, Building2, Phone, MapPin,
  AlertTriangle, CheckCircle, Clock, DollarSign,
  ChevronLeft, ChevronRight, X, Fuel, Gauge, Star
} from 'lucide-react';

const Maintenance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vehicleId = location.state?.vehicleId || null;
  
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showNewMaintenanceForm, setShowNewMaintenanceForm] = useState(false);
  const [formData, setFormData] = useState({
    vehiculeId: '',
    type: 'Vidange',
    datePrevue: '',
    garage: '',
    description: '',
    priorite: 'Moyenne'
  });
  const [loading, setLoading] = useState(false);
  const [maintenances, setMaintenances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [selectedType, setSelectedType] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const itemsPerPage = 5;

  // Charger les véhicules depuis l'API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await fetch('http://localhost:8080/vehicules');
        const data = await res.json();
        setVehicles(data);
        if (vehicleId) {
          const vehicle = data.find(v => v.id === vehicleId);
          if (vehicle) {
            setSelectedVehicle(vehicle);
            setFormData(prev => ({ ...prev, vehiculeId: vehicle.id }));
            setShowNewMaintenanceForm(true);
          }
        }
      } catch (error) {
        console.error("Erreur chargement véhicules:", error);
      }
    };
    fetchVehicles();
  }, [vehicleId]);

  // Charger les maintenances existantes (simulées)
  useEffect(() => {
    const mockMaintenances = [
      { id: 'MNT001', vehicule: '123TUN789', type: 'Vidange', datePrevue: '2026-03-15', statut: 'Planifiée', priorite: 'Haute', garage: 'Garage Central', cout: 350 },
      { id: 'MNT002', vehicule: '456TUN123', type: 'Pneus', datePrevue: '2026-03-18', statut: 'Planifiée', priorite: 'Moyenne', garage: 'Pneus Plus', cout: 600 },
      { id: 'MNT003', vehicule: '789TUN456', type: 'Freins', datePrevue: '2026-03-10', statut: 'Terminée', priorite: 'Haute', garage: 'Garage Central', cout: 450 },
    ];
    setMaintenances(mockMaintenances);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulation d'envoi (à remplacer par un vrai POST)
    setTimeout(() => {
      const newMaintenance = {
        id: `MNT${String(maintenances.length + 1).padStart(3, '0')}`,
        vehicule: vehicles.find(v => v.id === parseInt(formData.vehiculeId))?.matricule || 'Inconnu',
        ...formData,
        statut: 'Planifiée',
        cout: 0
      };
      setMaintenances(prev => [newMaintenance, ...prev]);
      setShowNewMaintenanceForm(false);
      setFormData({
        vehiculeId: '',
        type: 'Vidange',
        datePrevue: '',
        garage: '',
        description: '',
        priorite: 'Moyenne'
      });
      setLoading(false);
      alert('Maintenance planifiée avec succès');
      // Rediriger vers le dashboard chef de parc pour voir l'alerte disparaître
      navigate('/dashboard/chef');
    }, 500);
  };

  // Filtrer les maintenances
  const filteredMaintenances = maintenances.filter(m => {
    const matchSearch = m.vehicule.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        m.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        m.garage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = selectedStatus === 'Tous' || m.statut === selectedStatus;
    const matchType = selectedType === 'Tous' || m.type === selectedType;
    return matchSearch && matchStatus && matchType;
  });

  const totalPages = Math.ceil(filteredMaintenances.length / itemsPerPage);
  const paginatedMaintenances = filteredMaintenances.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (statut) => {
    const styles = {
      'Planifiée': 'bg-blue-100 text-blue-700',
      'Terminée': 'bg-green-100 text-green-700',
      'Annulée': 'bg-red-100 text-red-700'
    };
    return styles[statut] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityBadge = (priorite) => {
    const styles = {
      'Urgente': 'bg-red-100 text-red-700',
      'Haute': 'bg-orange-100 text-orange-700',
      'Moyenne': 'bg-yellow-100 text-yellow-700',
      'Basse': 'bg-green-100 text-green-700'
    };
    return styles[priorite] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion de la Maintenance</h1>
          <p className="text-slate-500 mt-1">
            {maintenances.length} interventions • {maintenances.filter(m => m.statut === 'Planifiée').length} planifiées
          </p>
        </div>
        <button 
          onClick={() => setShowNewMaintenanceForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Nouvelle intervention
        </button>
      </div>

      {/* Alerte si une maintenance urgente est demandée */}
      {vehicleId && selectedVehicle && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-red-800">Maintenance urgente requise</h4>
              <p className="text-sm text-red-700 mt-1">
                Le véhicule {selectedVehicle.matricule} ({selectedVehicle.marque} {selectedVehicle.modele}) a dépassé le seuil de 10 000 km depuis sa dernière maintenance.
                Veuillez planifier une intervention.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Formulaire de nouvelle maintenance (modale) */}
      {showNewMaintenanceForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Nouvelle intervention</h2>
              <button onClick={() => setShowNewMaintenanceForm(false)} className="p-1 hover:bg-slate-100 rounded">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Véhicule</label>
                  <select
                    name="vehiculeId"
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    value={formData.vehiculeId}
                    onChange={handleInputChange}
                  >
                    <option value="">Sélectionner</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.matricule} - {v.marque} {v.modele}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Type d'intervention</label>
                  <select
                    name="type"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="Vidange">Vidange</option>
                    <option value="Pneus">Pneus</option>
                    <option value="Freins">Freins</option>
                    <option value="Contrôle technique">Contrôle technique</option>
                    <option value="Diagnostic">Diagnostic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date prévue</label>
                  <input
                    type="date"
                    name="datePrevue"
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    value={formData.datePrevue}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Garage</label>
                  <input
                    type="text"
                    name="garage"
                    placeholder="Nom du garage"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    value={formData.garage}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Priorité</label>
                  <select
                    name="priorite"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    value={formData.priorite}
                    onChange={handleInputChange}
                  >
                    <option value="Basse">Basse</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Haute">Haute</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
                <button type="button" onClick={() => setShowNewMaintenanceForm(false)} className="px-4 py-2 border rounded-lg">
                  Annuler
                </button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {loading ? 'Planification...' : 'Planifier'}
                </button>
              </div>
            </form>
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
              placeholder="Rechercher par véhicule, type ou garage..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg"
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
              <option value="Terminée">Terminée</option>
            </select>
            <select 
              className="border border-slate-200 rounded-lg px-3 py-2 bg-white"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="Tous">Tous types</option>
              <option value="Vidange">Vidange</option>
              <option value="Pneus">Pneus</option>
              <option value="Freins">Freins</option>
              <option value="Contrôle technique">Contrôle technique</option>
            </select>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
              <Filter size={18} className="text-slate-600" />
            </button>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
              <Download size={18} className="text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Tableau des maintenances */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Véhicule</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Date prévue</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Garage</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Priorité</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Coût</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedMaintenances.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => { setSelectedMaintenance(m); setIsDetailModalOpen(true); }}>
                  <td className="px-4 py-3 font-medium text-slate-800">{m.vehicule}</td>
                  <td className="px-4 py-3 text-slate-600">{m.type}</td>
                  <td className="px-4 py-3 text-slate-600">{m.datePrevue}</td>
                  <td className="px-4 py-3 text-slate-600">{m.garage}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(m.statut)}`}>
                      {m.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityBadge(m.priorite)}`}>
                      {m.priorite}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{m.cout} DT</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-slate-100 rounded"><Eye size={16} className="text-slate-600" /></button>
                      <button className="p-1 hover:bg-slate-100 rounded"><Edit size={16} className="text-blue-600" /></button>
                      <button className="p-1 hover:bg-slate-100 rounded"><Trash2 size={16} className="text-red-600" /></button>
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
            Affichage {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, filteredMaintenances.length)} sur {filteredMaintenances.length} interventions
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-4 py-2 border border-slate-200 rounded-lg">
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Détails */}
      {isDetailModalOpen && selectedMaintenance && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Détails de la maintenance</h3>
              <button onClick={() => setIsDetailModalOpen(false)}><X size={20} /></button>
            </div>
            <div className="space-y-2">
              <p><strong>Véhicule :</strong> {selectedMaintenance.vehicule}</p>
              <p><strong>Type :</strong> {selectedMaintenance.type}</p>
              <p><strong>Date prévue :</strong> {selectedMaintenance.datePrevue}</p>
              <p><strong>Garage :</strong> {selectedMaintenance.garage || 'Non spécifié'}</p>
              <p><strong>Statut :</strong> {selectedMaintenance.statut}</p>
              <p><strong>Priorité :</strong> {selectedMaintenance.priorite}</p>
              <p><strong>Coût :</strong> {selectedMaintenance.cout} DT</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setIsDetailModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;