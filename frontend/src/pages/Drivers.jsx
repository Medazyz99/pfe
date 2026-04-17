import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Edit,
  Trash2,
  Eye,
  User,
  Truck,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Award,
  MapPin,
  FileText,
  X
} from 'lucide-react';
import { driversData, driversStats, congesData } from '../data/driversData';
import { exportToCSV } from '../utils/exportUtils';   // <--- Ajout

const Drivers = () => {
  const [drivers, setDrivers] = useState(driversData);
  const [conges, setConges] = useState(congesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCongesModalOpen, setIsCongesModalOpen] = useState(false);
  const [isNewDriverModalOpen, setIsNewDriverModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('liste'); // 'liste' ou 'conges'
  
  const itemsPerPage = 5;

  // Données pour le nouveau chauffeur
  const [newDriver, setNewDriver] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    numeroPermis: '',
    dateExpirationPermis: '',
    dateEmbauche: '',
    disponible: true
  });

  // Données pour nouvelle demande de congé
  const [newConge, setNewConge] = useState({
    chauffeurId: '',
    dateDebut: '',
    dateFin: '',
    type: 'Congé annuel',
    raison: ''
  });

  // Filtrage des chauffeurs
  const filteredDrivers = drivers.filter(driver => {
    const fullName = `${driver.prenom} ${driver.nom}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.telephone.includes(searchTerm);
    
    const matchesStatus = selectedStatus === 'Tous' || 
      (selectedStatus === 'Disponible' && driver.disponible) ||
      (selectedStatus === 'En mission' && !driver.disponible);
    
    return matchesSearch && matchesStatus;
  });

  // Filtrage des congés
  const filteredConges = conges.filter(conge => {
    if (searchTerm) {
      return conge.chauffeurNom.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  const paginatedDrivers = filteredDrivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistiques rapides
  const statsCards = [
    { label: 'Total chauffeurs', value: driversStats.total, icon: User, color: 'blue' },
    { label: 'Disponibles', value: driversStats.disponibles, icon: CheckCircle, color: 'green' },
    { label: 'En mission', value: driversStats.enMission, icon: Truck, color: 'purple' },
    { label: 'Total missions', value: driversStats.totalMissions, icon: Award, color: 'orange' },
  ];

  const getStatusBadge = (disponible) => {
    return disponible 
      ? 'bg-green-100 text-green-700' 
      : 'bg-blue-100 text-blue-700';
  };

  const getStatusText = (disponible) => {
    return disponible ? 'Disponible' : 'En mission';
  };

  const getCongeStatusBadge = (statut) => {
    const styles = {
      'Approuvé': 'bg-green-100 text-green-700',
      'En attente': 'bg-yellow-100 text-yellow-700',
      'Refusé': 'bg-red-100 text-red-700'
    };
    return styles[statut] || 'bg-gray-100 text-gray-700';
  };

  // --- Fonction d'export CSV ---
  const handleExportCSV = () => {
    const dataToExport = drivers.map(d => ({
      Nom: `${d.prenom} ${d.nom}`,
      Email: d.email,
      Téléphone: d.telephone,
      Permis: d.numeroPermis,
      'Expiration permis': d.dateExpirationPermis,
      Statut: d.disponible ? 'Disponible' : 'En mission',
      Missions: d.missionsEffectuees,
      Kilométrage: d.kilometresParcourus,
      Incidents: d.incidents,
      'Congés restants': d.congesRestants,
      'Véhicule actuel': d.vehiculeActuel || '—',
      'Date embauche': d.dateEmbauche
    }));
    exportToCSV(dataToExport, 'chauffeurs_agil');
  };
  // --- Fin ajout ---

  const handleNewDriverSubmit = (e) => {
    e.preventDefault();
    const newId = drivers.length + 1;
    const driverToAdd = {
      id: newId,
      ...newDriver,
      missionsEffectuees: 0,
      kilometresParcourus: 0,
      incidents: 0,
      congesRestants: 25,
      photo: `https://ui-avatars.com/api/?name=${newDriver.prenom}+${newDriver.nom}&background=3b82f6&color=fff&size=128`
    };
    
    setDrivers([...drivers, driverToAdd]);
    setIsNewDriverModalOpen(false);
    setNewDriver({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      numeroPermis: '',
      dateExpirationPermis: '',
      dateEmbauche: '',
      disponible: true
    });
  };

  const handleNewCongeSubmit = (e) => {
    e.preventDefault();
    const chauffeur = drivers.find(d => d.id === parseInt(newConge.chauffeurId));
    const newId = conges.length + 1;
    const congeToAdd = {
      id: newId,
      chauffeurId: parseInt(newConge.chauffeurId),
      chauffeurNom: `${chauffeur.prenom} ${chauffeur.nom}`,
      ...newConge,
      statut: 'En attente'
    };
    
    setConges([...conges, congeToAdd]);
    setIsCongesModalOpen(false);
    setNewConge({
      chauffeurId: '',
      dateDebut: '',
      dateFin: '',
      type: 'Congé annuel',
      raison: ''
    });
  };

  const handleApproveConge = (congeId) => {
    setConges(conges.map(c => 
      c.id === congeId ? {...c, statut: 'Approuvé'} : c
    ));
  };

  const handleRejectConge = (congeId) => {
    setConges(conges.map(c => 
      c.id === congeId ? {...c, statut: 'Refusé'} : c
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion des Chauffeurs</h1>
          <p className="text-slate-500 mt-1">
            Gérez votre équipe • {driversStats.total} chauffeurs, {driversStats.totalMissions} missions effectuées
          </p>
        </div>
        <button 
          onClick={() => setIsNewDriverModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Nouveau chauffeur
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
      {driversStats.permisExpireBientot > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-amber-800">Permis de conduire expirant bientôt</h4>
              <p className="text-sm text-amber-700 mt-1">
                {driversStats.permisExpireBientot} chauffeur(s) ont un permis qui expire dans moins de 3 mois
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('liste')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'liste' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Liste des chauffeurs
          </button>
          <button
            onClick={() => setActiveTab('conges')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'conges' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Demandes de congé
          </button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={activeTab === 'liste' 
                ? "Rechercher par nom, email ou téléphone..." 
                : "Rechercher par nom du chauffeur..."
              }
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {activeTab === 'liste' && (
            <div className="flex gap-2">
              <select 
                className="border border-slate-200 rounded-lg px-3 py-2 bg-white"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="Tous">Tous les statuts</option>
                <option value="Disponible">Disponible</option>
                <option value="En mission">En mission</option>
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
          )}
          {activeTab === 'conges' && (
            <button 
              onClick={() => setIsCongesModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus size={18} />
              Nouvelle demande
            </button>
          )}
        </div>
      </div>

      {/* Contenu selon l'onglet */}
      {activeTab === 'liste' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Chauffeur</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Contact</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Permis</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Statut</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Véhicule</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Missions</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Km</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {paginatedDrivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={driver.photo} 
                          alt={`${driver.prenom} ${driver.nom}`}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-slate-800">{driver.prenom} {driver.nom}</p>
                          <p className="text-xs text-slate-500">Embauché le {driver.dateEmbauche}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <Mail size={12} className="text-slate-400" />
                          <span className="text-sm text-slate-600">{driver.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone size={12} className="text-slate-400" />
                          <span className="text-sm text-slate-600">{driver.telephone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-slate-600">{driver.numeroPermis}</p>
                        <p className="text-xs text-slate-500">Exp: {driver.dateExpirationPermis}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(driver.disponible)}`}>
                        {getStatusText(driver.disponible)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {driver.vehiculeActuel ? (
                        <div className="flex items-center gap-1">
                          <Truck size={14} className="text-slate-400" />
                          <span className="text-sm text-slate-600">{driver.vehiculeActuel}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">Aucun</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{driver.missionsEffectuees}</td>
                    <td className="px-4 py-3 text-slate-600">{driver.kilometresParcourus} km</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setSelectedDriver(driver);
                            setIsDetailModalOpen(true);
                          }}
                          className="p-1 hover:bg-slate-100 rounded"
                        >
                          <Eye size={16} className="text-slate-600" />
                        </button>
                        <button className="p-1 hover:bg-slate-100 rounded">
                          <Edit size={16} className="text-blue-600" />
                        </button>
                        <button className="p-1 hover:bg-slate-100 rounded">
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
              Affichage {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, filteredDrivers.length)} sur {filteredDrivers.length} chauffeurs
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
      )}

      {activeTab === 'conges' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Chauffeur</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Période</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Raison</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Statut</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredConges.map((conge) => (
                  <tr key={conge.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{conge.chauffeurNom}</td>
                    <td className="px-4 py-3 text-slate-600">{conge.type}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600">
                          {conge.dateDebut} → {conge.dateFin}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{conge.raison}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getCongeStatusBadge(conge.statut)}`}>
                        {conge.statut}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {conge.statut === 'En attente' && (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleApproveConge(conge.id)}
                            className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                            title="Approuver"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button 
                            onClick={() => handleRejectConge(conge.id)}
                            className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                            title="Refuser"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Nouveau Chauffeur */}
      {isNewDriverModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Nouveau chauffeur</h2>
              <button 
                onClick={() => setIsNewDriverModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleNewDriverSubmit}>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newDriver.nom}
                      onChange={(e) => setNewDriver({...newDriver, nom: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newDriver.prenom}
                      onChange={(e) => setNewDriver({...newDriver, prenom: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newDriver.email}
                      onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newDriver.telephone}
                      onChange={(e) => setNewDriver({...newDriver, telephone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Numéro de permis
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newDriver.numeroPermis}
                    onChange={(e) => setNewDriver({...newDriver, numeroPermis: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Date expiration permis
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newDriver.dateExpirationPermis}
                      onChange={(e) => setNewDriver({...newDriver, dateExpirationPermis: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Date d'embauche
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newDriver.dateEmbauche}
                      onChange={(e) => setNewDriver({...newDriver, dateEmbauche: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newDriver.disponible}
                      onChange={(e) => setNewDriver({...newDriver, disponible: e.target.checked})}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">Disponible immédiatement</span>
                  </label>
                </div>
              </div>
              <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewDriverModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Ajouter le chauffeur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Nouvelle demande de congé */}
      {isCongesModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Nouvelle demande de congé</h2>
              <button 
                onClick={() => setIsCongesModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleNewCongeSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Chauffeur
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newConge.chauffeurId}
                    onChange={(e) => setNewConge({...newConge, chauffeurId: e.target.value})}
                  >
                    <option value="">Sélectionner</option>
                    {drivers.map(driver => (
                      <option key={driver.id} value={driver.id}>
                        {driver.prenom} {driver.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Date début
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newConge.dateDebut}
                      onChange={(e) => setNewConge({...newConge, dateDebut: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Date fin
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newConge.dateFin}
                      onChange={(e) => setNewConge({...newConge, dateFin: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Type de congé
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newConge.type}
                    onChange={(e) => setNewConge({...newConge, type: e.target.value})}
                  >
                    <option value="Congé annuel">Congé annuel</option>
                    <option value="Maladie">Maladie</option>
                    <option value="Personnel">Personnel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Raison
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newConge.raison}
                    onChange={(e) => setNewConge({...newConge, raison: e.target.value})}
                  />
                </div>
              </div>
              <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCongesModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Envoyer la demande
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Détails Chauffeur */}
      {isDetailModalOpen && selectedDriver && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Détails du chauffeur</h2>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={selectedDriver.photo} 
                  alt={`${selectedDriver.prenom} ${selectedDriver.nom}`}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {selectedDriver.prenom} {selectedDriver.nom}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(selectedDriver.disponible)}`}>
                    {getStatusText(selectedDriver.disponible)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium text-slate-800">{selectedDriver.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Téléphone</p>
                  <p className="font-medium text-slate-800">{selectedDriver.telephone}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Numéro de permis</p>
                  <p className="font-medium text-slate-800">{selectedDriver.numeroPermis}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Expiration permis</p>
                  <p className="font-medium text-slate-800">{selectedDriver.dateExpirationPermis}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Date d'embauche</p>
                  <p className="font-medium text-slate-800">{selectedDriver.dateEmbauche}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Véhicule actuel</p>
                  <p className="font-medium text-slate-800">{selectedDriver.vehiculeActuel || 'Aucun'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Missions effectuées</p>
                  <p className="font-medium text-slate-800">{selectedDriver.missionsEffectuees}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Kilomètres parcourus</p>
                  <p className="font-medium text-slate-800">{selectedDriver.kilometresParcourus} km</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Incidents</p>
                  <p className="font-medium text-slate-800">{selectedDriver.incidents}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Congés restants</p>
                  <p className="font-medium text-slate-800">{selectedDriver.congesRestants} jours</p>
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
    </div>
  );
};

export default Drivers;