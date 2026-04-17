import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, TrendingDown, Users, Truck, Calendar, 
  Wrench, AlertTriangle, FileText, Fuel, Clock,
  ChevronRight, Bell, Search, Settings, LogOut,
  UserCircle, Activity, PieChart, BarChart3,
  ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Download, Filter, Calendar as CalendarIcon,
  MapPin, Phone, Mail, Star, RefreshCw
} from 'lucide-react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  PieChart as RePieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, RadialBarChart, RadialBar
} from 'recharts';

const ChefParcDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showNotifications, setShowNotifications] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  // Charger les véhicules depuis l'API
  const fetchVehicles = async () => {
    try {
      setLoadingVehicles(true);
      const response = await fetch('http://localhost:8080/vehicules');
      const data = await response.json();
      setVehicles(data);
      // Filtrer les véhicules dont le kilométrage dépasse le seuil de 10000 km depuis la dernière maintenance
      const alerts = data.filter(v => 
        v.kilometrage && v.derniereMaintenanceKm && 
        (v.kilometrage - v.derniereMaintenanceKm) >= 10000
      );
      setMaintenanceAlerts(alerts);
      setLastRefresh(Date.now());
    } catch (error) {
      console.error("Erreur chargement véhicules:", error);
    } finally {
      setLoadingVehicles(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
    // Rafraîchissement automatique toutes les 30 secondes
    const interval = setInterval(() => {
      fetchVehicles();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Données statiques pour les graphiques (inchangées)
  const monthlyData = [
    { month: 'Jan', km: 4200, missions: 45, cout: 12500 },
    { month: 'Fév', km: 3800, missions: 42, cout: 11800 },
    { month: 'Mar', km: 5100, missions: 48, cout: 13200 },
    { month: 'Avr', km: 4800, missions: 46, cout: 12800 },
    { month: 'Mai', km: 5300, missions: 52, cout: 14500 },
    { month: 'Juin', km: 4900, missions: 49, cout: 13800 },
  ];

  const vehicleTypeData = [
    { name: 'Utilitaires', value: 12, color: '#3b82f6' },
    { name: 'Camions', value: 5, color: '#10b981' },
    { name: 'Berlines', value: 4, color: '#f59e0b' },
    { name: '4x4', value: 3, color: '#ef4444' },
  ];

  const driverPerformanceData = [
    { name: 'Ahmed B.', missions: 45, km: 2450, satisfaction: 98 },
    { name: 'Mohamed A.', missions: 38, km: 2100, satisfaction: 95 },
    { name: 'Sami T.', missions: 32, km: 1850, satisfaction: 92 },
    { name: 'Karim J.', missions: 28, km: 1420, satisfaction: 88 },
    { name: 'Hichem G.', missions: 22, km: 980, satisfaction: 96 },
  ];

  const recentActivities = [
    { id: 1, type: 'mission', title: 'Mission #M001 terminée', time: '5 min', user: 'Ahmed B.', icon: Calendar, color: 'blue' },
    { id: 2, type: 'maintenance', title: 'Maintenance #MNT003 planifiée', time: '15 min', user: 'Sami T.', icon: Wrench, color: 'yellow' },
    { id: 3, type: 'alert', title: 'Document expirant - 123TUN789', time: '1h', user: 'Système', icon: FileText, color: 'red' },
    { id: 4, type: 'fuel', title: 'Consommation anormale détectée', time: '2h', user: '456TUN123', icon: Fuel, color: 'orange' },
    { id: 5, type: 'congé', title: 'Demande de congé approuvée', time: '3h', user: 'Karim J.', icon: Users, color: 'green' },
  ];

  const upcomingMaintenance = [
    { vehicule: '123TUN789', type: 'Vidange', date: '15/03/2026', priorite: 'Haute', garage: 'Garage Central' },
    { vehicule: '456TUN123', type: 'Pneus', date: '18/03/2026', priorite: 'Moyenne', garage: 'Pneus Plus' },
    { vehicule: '789TUN456', type: 'Freins', date: '20/03/2026', priorite: 'Haute', garage: 'Garage Central' },
  ];

  const expiringDocuments = [
    { vehicule: '123TUN789', type: 'Assurance', date: '01/04/2026', jours: 17 },
    { vehicule: '456TUN123', type: 'Carte grise', date: '25/03/2026', jours: 10 },
    { chauffeur: 'Ahmed B.', type: 'Permis', date: '18/03/2026', jours: 3 },
  ];

  const notifications = [
    { id: 1, message: '3 missions planifiées aujourd\'hui', time: 'Il y a 5 min', read: false },
    { id: 2, message: 'Maintenance urgente pour 123TUN789', time: 'Il y a 15 min', read: false },
    { id: 3, message: '2 documents expirent cette semaine', time: 'Il y a 1h', read: true },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const StatCard = ({ title, value, icon: Icon, color, trend, trendValue, subtitle }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div className="flex items-center gap-1">
          {trend === 'up' ? (
            <ArrowUpRight className="w-4 h-4 text-green-600" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-600" />
          )}
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trendValue}
          </span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-1">{value}</h3>
      <p className="text-sm text-slate-500 mb-2">{title}</p>
      {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600',
      yellow: 'bg-yellow-50 text-yellow-600',
      red: 'bg-red-50 text-red-600',
      orange: 'bg-orange-50 text-orange-600',
      green: 'bg-green-50 text-green-600'
    };

    return (
      <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
        <div className={`p-2 rounded-lg ${colorClasses[activity.color]}`}>
          <activity.icon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-800">{activity.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-400">{activity.user}</span>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs text-slate-400">{activity.time}</span>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const statsData = {
    vehicles: { total: vehicles.length || 24, actifs: 22, variation: '+12%', evolution: 'up' },
    missions: { enCours: 8, aujourdhui: 12, variation: '+8%', evolution: 'up' },
    chauffeurs: { total: 15, disponibles: 12, variation: '+5%', evolution: 'up' },
    alertes: { total: maintenanceAlerts.length, urgentes: maintenanceAlerts.length, variation: '-3%', evolution: 'down' },
    maintenance: { prevues: 6, urgentes: 2, variation: '+15%', evolution: 'up' },
    carburant: { consommation: 1250, budget: 1100, variation: '+13%', evolution: 'down' }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Agil
            </h1>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-slate-400">/</span>
              <span className="text-sm font-medium text-slate-600">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-64">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Rechercher..."
                className="bg-transparent border-none focus:outline-none ml-2 text-sm w-full"
              />
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <h3 className="font-semibold text-slate-800">Notifications</h3>
                  </div>
                  {notifications.map(notif => (
                    <div key={notif.id} className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm text-slate-800">{notif.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-slate-800">{user?.prenom} {user?.nom}</p>
                <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
              </div>
              <img 
                src={user?.photo} 
                alt="Profile" 
                className="w-10 h-10 rounded-xl border-2 border-slate-200"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Welcome Section avec bouton refresh */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Bonjour, {user?.prenom} 👋
            </h2>
            <p className="text-slate-500 mt-1">
              Voici ce qui se passe dans votre parc aujourd'hui.
              {loadingVehicles && <span className="ml-2 text-blue-500">(Chargement...)</span>}
            </p>
          </div>
          <button 
            onClick={fetchVehicles}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition"
            title="Rafraîchir les données"
          >
            <RefreshCw size={16} className={`text-slate-600 ${loadingVehicles ? 'animate-spin' : ''}`} />
            <span className="text-sm text-slate-600 hidden sm:inline">Rafraîchir</span>
          </button>
        </div>

        {/* Stats Grid (6 cartes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <StatCard 
            title="Véhicules" 
            value={statsData.vehicles.total} 
            icon={Truck} 
            color="blue"
            trend={statsData.vehicles.evolution}
            trendValue={statsData.vehicles.variation}
            subtitle={`${statsData.vehicles.actifs} actifs`}
          />
          <StatCard 
            title="Missions" 
            value={statsData.missions.enCours} 
            icon={Calendar} 
            color="green"
            trend={statsData.missions.evolution}
            trendValue={statsData.missions.variation}
            subtitle={`${statsData.missions.aujourdhui} aujourd'hui`}
          />
          <StatCard 
            title="Chauffeurs" 
            value={statsData.chauffeurs.total} 
            icon={Users} 
            color="purple"
            trend={statsData.chauffeurs.evolution}
            trendValue={statsData.chauffeurs.variation}
            subtitle={`${statsData.chauffeurs.disponibles} disponibles`}
          />
          <StatCard 
            title="Alertes" 
            value={statsData.alertes.total} 
            icon={AlertTriangle} 
            color="red"
            trend={statsData.alertes.evolution}
            trendValue={statsData.alertes.variation}
            subtitle={`${statsData.alertes.urgentes} urgentes`}
          />
          <StatCard 
            title="Maintenance" 
            value={statsData.maintenance.prevues} 
            icon={Wrench} 
            color="orange"
            trend={statsData.maintenance.evolution}
            trendValue={statsData.maintenance.variation}
            subtitle={`${statsData.maintenance.urgentes} urgentes`}
          />
          <StatCard 
            title="Carburant" 
            value={`${statsData.carburant.consommation}L`} 
            icon={Fuel} 
            color="yellow"
            trend={statsData.carburant.evolution}
            trendValue={statsData.carburant.variation}
            subtitle={`Budget: ${statsData.carburant.budget}L`}
          />
        </div>

        {/* Widget Alertes Maintenance */}
        {!loadingVehicles && maintenanceAlerts.length > 0 && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Maintenances urgentes (kilométrage)
            </h2>
            <div className="space-y-3">
              {maintenanceAlerts.map(vehicle => (
                <div key={vehicle.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div>
                    <p className="font-medium text-gray-800">{vehicle.matricule} - {vehicle.marque} {vehicle.modele}</p>
                    <p className="text-sm text-gray-500">
                      Km actuel: {vehicle.kilometrage} km • Dernière maintenance: {vehicle.derniereMaintenanceKm} km
                    </p>
                    <p className="text-sm text-red-600">
                      {vehicle.kilometrage - vehicle.derniereMaintenanceKm} km depuis la dernière maintenance (seuil 10000 km)
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/dashboard/maintenance', { state: { vehicleId: vehicle.id } })}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Planifier maintenance
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Charts Row (inchangé) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-800">Évolution mensuelle</h3>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg">Km</button>
                <button className="px-3 py-1 text-sm hover:bg-slate-50 rounded-lg">Missions</button>
                <button className="px-3 py-1 text-sm hover:bg-slate-50 rounded-lg">Coûts</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorKm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="km" stroke="#3b82f6" fill="url(#colorKm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-6">Répartition véhicules</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={vehicleTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vehicleTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {vehicleTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-600">{item.name}</span>
                  <span className="text-xs font-medium text-slate-800 ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Grid (Activities, Maintenance, Documents) – inchangé */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-800">Activités récentes</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">Voir tout</button>
            </div>
            <div className="space-y-1">
              {recentActivities.map(activity => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-800">Maintenances à venir</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">Planifier</button>
            </div>
            <div className="space-y-4">
              {upcomingMaintenance.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">{item.vehicule}</p>
                    <p className="text-sm text-slate-500">{item.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">{item.date}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.priorite === 'Haute' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.priorite}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-800">Documents expirant</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">Voir tout</button>
            </div>
            <div className="space-y-4">
              {expiringDocuments.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">{item.vehicule || item.chauffeur}</p>
                    <p className="text-sm text-slate-500">{item.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">{item.date}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.jours <= 7 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      J-{item.jours}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Driver Performance Table (inchangé) */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-800">Performance des chauffeurs</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <Download className="w-4 h-4 text-slate-600" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <Filter className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 text-sm font-medium text-slate-500">Chauffeur</th>
                  <th className="text-left py-3 text-sm font-medium text-slate-500">Missions</th>
                  <th className="text-left py-3 text-sm font-medium text-slate-500">Kilométrage</th>
                  <th className="text-left py-3 text-sm font-medium text-slate-500">Satisfaction</th>
                  <th className="text-left py-3 text-sm font-medium text-slate-500">Performance</th>
                </tr>
              </thead>
              <tbody>
                {driverPerformanceData.map((driver, index) => (
                  <tr key={index} className="border-b border-slate-100 last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-medium text-sm">
                          {driver.name.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-800">{driver.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-600">{driver.missions}</td>
                    <td className="py-3 text-slate-600">{driver.km} km</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-slate-600">{driver.satisfaction}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                          style={{ width: `${driver.satisfaction}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChefParcDashboard;