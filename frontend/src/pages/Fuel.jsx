import { useState } from 'react';
import { 
  Fuel as FuelIcon,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CreditCard,
  Calendar,
  Truck,
  User,
  MapPin,
  DollarSign,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Gauge,
  BarChart3,
  PieChart,
  Clock
} from 'lucide-react';
import { fuelData, fuelStats, fuelAlerts, fuelCards } from '../data/fuelData';

const Fuel = () => {
  const [activeTab, setActiveTab] = useState('consommations');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedVehicle, setSelectedVehicle] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [isNewRefuelModalOpen, setIsNewRefuelModalOpen] = useState(false);
  
  const itemsPerPage = 5;

  // Statistiques
  const stats = [
    {
      title: 'Total litres',
      value: fuelStats.totalLiters,
      icon: FuelIcon,
      color: 'blue',
      evolution: '+8%',
      trend: 'up'
    },
    {
      title: 'Montant total',
      value: `${fuelStats.totalMontant} DT`,
      icon: DollarSign,
      color: 'green',
      evolution: '+12%',
      trend: 'up'
    },
    {
      title: 'Consommation moyenne',
      value: `${fuelStats.moyenneConsommation} L/100km`,
      icon: Gauge,
      color: 'purple',
      evolution: '-2%',
      trend: 'down'
    },
    {
      title: 'Cartes actives',
      value: fuelStats.cartesActives,
      icon: CreditCard,
      color: 'orange',
      evolution: '5/5',
      trend: 'stable'
    }
  ];

  // Filtrage
  const filteredFuel = fuelData.filter(f => {
    const matchesSearch = 
      f.vehicule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.chauffeur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.station.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesVehicle = selectedVehicle === 'Tous' || f.vehicule === selectedVehicle;
    
    return matchesSearch && matchesVehicle;
  });

  const totalPages = Math.ceil(filteredFuel.length / itemsPerPage);
  const paginatedFuel = filteredFuel.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Véhicules uniques pour le filtre
  const vehicles = ['Tous', ...new Set(fuelData.map(f => f.vehicule))];

  const [newRefuel, setNewRefuel] = useState({
    vehicule: '',
    chauffeur: '',
    date: '',
    quantite: '',
    station: '',
    carte: '',
    kilometrage: ''
  });

  const handleNewRefuelSubmit = (e) => {
    e.preventDefault();
    // Logique d'ajout
    setIsNewRefuelModalOpen(false);
    setNewRefuel({
      vehicule: '',
      chauffeur: '',
      date: '',
      quantite: '',
      station: '',
      carte: '',
      kilometrage: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion Carburant</h1>
          <p className="text-slate-500 mt-1">
            {fuelStats.totalLiters} L consommés • {fuelStats.totalMontant} DT • {fuelStats.moyenneConsommation} L/100km
          </p>
        </div>
        <button 
          onClick={() => setIsNewRefuelModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Nouveau plein
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-start justify-between">
              <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <div className="flex items-center gap-1">
                {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                {stat.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-slate-600'
                }`}>
                  {stat.evolution}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mt-2">{stat.value}</h3>
            <p className="text-sm text-slate-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Alertes anomalies */}
      {fuelAlerts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-amber-800">Anomalies de consommation</h4>
              <div className="text-sm text-amber-700 mt-1">
                {fuelAlerts.map((alert, index) => (
                  <p key={index}>
                    {alert.vehicule} : {alert.difference} au-dessus de la moyenne
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('consommations')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'consommations' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Consommations
          </button>
          <button
            onClick={() => setActiveTab('cartes')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'cartes' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Cartes carburant
          </button>
          <button
            onClick={() => setActiveTab('statistiques')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'statistiques' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Statistiques
          </button>
        </div>
      </div>

      {/* Filtres */}
      {activeTab === 'consommations' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher par véhicule, chauffeur ou station..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select 
                className="border border-slate-200 rounded-lg px-3 py-2 bg-white"
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
              >
                {vehicles.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
              <select 
                className="border border-slate-200 rounded-lg px-3 py-2 bg-white"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Contenu */}
      {activeTab === 'consommations' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Véhicule</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Chauffeur</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Quantité</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Montant</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Station</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Km</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Conso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {paginatedFuel.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">{f.date}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{f.vehicule}</td>
                    <td className="px-4 py-3 text-slate-600">{f.chauffeur}</td>
                    <td className="px-4 py-3 text-slate-600">{f.quantite} L</td>
                    <td className="px-4 py-3 text-slate-600">{f.montant} DT</td>
                    <td className="px-4 py-3 text-slate-600">{f.station}</td>
                    <td className="px-4 py-3 text-slate-600">{f.kilometrage} km</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        f.consommation > fuelStats.moyenneConsommation + 1 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {f.consommation} L
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Affichage {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, filteredFuel.length)} sur {filteredFuel.length} relevés
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
      )}

      {activeTab === 'cartes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fuelCards.map((carte) => (
            <div key={carte.id} className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-slate-800">Carte {carte.numero.slice(-4)}</h3>
                  <p className="text-sm text-slate-500">Véhicule {carte.vehicule}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  {carte.statut}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Plafond mensuel</span>
                    <span className="font-medium text-slate-800">{carte.utilise}/{carte.plafond} DT</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(carte.utilise / carte.plafond) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Reste</span>
                  <span className="font-medium text-green-600">{carte.reste} DT</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Expiration</span>
                  <span className="text-slate-600">{carte.dateExpiration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'statistiques' && (
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Consommation par véhicule</h3>
            <div className="space-y-3">
              {fuelData.map((f) => {
                const vehicle = f.vehicule;
                const avg = fuelData
                  .filter(f => f.vehicule === vehicle)
                  .reduce((acc, f) => acc + f.consommation, 0) / 
                  fuelData.filter(f => f.vehicule === vehicle).length;
                
                return (
                  <div key={vehicle}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{vehicle}</span>
                      <span className="font-medium text-slate-800">{avg.toFixed(1)} L/100km</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          avg > fuelStats.moyenneConsommation + 1 
                            ? 'bg-red-500' 
                            : avg < fuelStats.moyenneConsommation - 1 
                            ? 'bg-green-500' 
                            : 'bg-blue-500'
                        }`}
                        style={{ width: `${(avg / 15) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Répartition des coûts</h3>
            <div className="space-y-3">
              {['Diesel', 'Essence'].map((type) => {
                const total = fuelData
                  .filter(f => f.type === type)
                  .reduce((acc, f) => acc + f.montant, 0);
                const pourcentage = (total / fuelStats.totalMontant) * 100;
                
                return (
                  <div key={type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{type}</span>
                      <span className="font-medium text-slate-800">{total.toFixed(2)} DT</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${pourcentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal Nouveau plein */}
      {isNewRefuelModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Nouveau plein</h2>
              <button onClick={() => setIsNewRefuelModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleNewRefuelSubmit}>
              <div className="p-6 space-y-4">
                <select
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newRefuel.vehicule}
                  onChange={(e) => setNewRefuel({...newRefuel, vehicule: e.target.value})}
                >
                  <option value="">Sélectionner véhicule</option>
                  {vehicles.filter(v => v !== 'Tous').map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Chauffeur"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newRefuel.chauffeur}
                  onChange={(e) => setNewRefuel({...newRefuel, chauffeur: e.target.value})}
                />

                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newRefuel.date}
                  onChange={(e) => setNewRefuel({...newRefuel, date: e.target.value})}
                />

                <input
                  type="number"
                  placeholder="Quantité (L)"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newRefuel.quantite}
                  onChange={(e) => setNewRefuel({...newRefuel, quantite: e.target.value})}
                />

                <input
                  type="text"
                  placeholder="Station"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newRefuel.station}
                  onChange={(e) => setNewRefuel({...newRefuel, station: e.target.value})}
                />

                <input
                  type="text"
                  placeholder="Carte utilisée"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newRefuel.carte}
                  onChange={(e) => setNewRefuel({...newRefuel, carte: e.target.value})}
                />

                <input
                  type="number"
                  placeholder="Kilométrage"
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newRefuel.kilometrage}
                  onChange={(e) => setNewRefuel({...newRefuel, kilometrage: e.target.value})}
                />
              </div>
              <div className="p-6 border-t flex justify-end gap-3">
                <button type="button" onClick={() => setIsNewRefuelModalOpen(false)}>
                  Annuler
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fuel;