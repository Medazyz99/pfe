import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Truck, 
  Calendar, 
  Wrench,
  DollarSign,
  TrendingUp,
  TrendingDown,
  UserPlus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Shield,
  Activity,
  BarChart3,
  PieChart,
  Download,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area,
  BarChart, Bar, PieChart as RePieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Statistiques globales
  const globalStats = {
    utilisateurs: 24,
    vehicules: 18,
    chauffeurs: 15,
    missionsMois: 48,
    coutMensuel: 45678,
    economie: 5234,
    alertes: 7,
    satisfaction: 94
  };

  // Évolution mensuelle
  const monthlyData = [
    { mois: 'Jan', utilisateurs: 20, vehicules: 15, missions: 42, couts: 38500 },
    { mois: 'Fév', utilisateurs: 21, vehicules: 16, missions: 38, couts: 37200 },
    { mois: 'Mar', utilisateurs: 22, vehicules: 17, missions: 45, couts: 39800 },
    { mois: 'Avr', utilisateurs: 23, vehicules: 17, missions: 48, couts: 41200 },
    { mois: 'Mai', utilisateurs: 24, vehicules: 18, missions: 52, couts: 43500 },
    { mois: 'Juin', utilisateurs: 24, vehicules: 18, missions: 49, couts: 42800 }
  ];

  // Répartition par rôle
  const roleData = [
    { name: 'Administrateurs', value: 3, color: '#ef4444' },
    { name: 'Chefs de parc', value: 2, color: '#f59e0b' },
    { name: 'Chauffeurs', value: 15, color: '#3b82f6' },
    { name: 'Opérateurs', value: 4, color: '#10b981' }
  ];

  // Activité récente
  const recentActivities = [
    { id: 1, user: 'admin@agil.tn', action: 'Nouvel utilisateur créé', target: 'Ahmed Ben Salem', time: '5 min', type: 'create' },
    { id: 2, user: 'chef@agil.tn', action: 'Mission planifiée', target: 'M001 - Sfax', time: '15 min', type: 'mission' },
    { id: 3, user: 'system', action: 'Alerte maintenance', target: 'Véhicule 123TUN789', time: '1h', type: 'alert' },
    { id: 4, user: 'admin@agil.tn', action: 'Document uploadé', target: 'Assurance 456TUN123', time: '2h', type: 'document' },
    { id: 5, user: 'chef@agil.tn', action: 'Congé approuvé', target: 'Sami Trabelsi', time: '3h', type: 'approve' }
  ];

  // Utilisateurs récents
  const recentUsers = [
    { id: 1, name: 'Ahmed Ben Salem', role: 'Chauffeur', status: 'Actif', lastLogin: '2026-03-15 09:30' },
    { id: 2, name: 'Mohamed Ali', role: 'Chauffeur', status: 'Actif', lastLogin: '2026-03-15 08:45' },
    { id: 3, name: 'Sami Trabelsi', role: 'Chauffeur', status: 'En congé', lastLogin: '2026-03-14 16:20' },
    { id: 4, name: 'Karim Jaziri', role: 'Chauffeur', status: 'Actif', lastLogin: '2026-03-15 10:15' },
    { id: 5, name: 'Hichem Gharbi', role: 'Chauffeur', status: 'Actif', lastLogin: '2026-03-15 07:50' }
  ];

  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Tableau de bord administrateur
          </h1>
          <p className="text-slate-500 mt-1">
            Bonjour, {user?.prenom} • Vue d'ensemble du système
          </p>
        </div>
        <div className="flex gap-2">
          <select 
            className="border border-slate-200 rounded-lg px-3 py-2 bg-white"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Download size={18} />
            Rapport
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-green-600">+4 ce mois</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{globalStats.utilisateurs}</h3>
          <p className="text-sm text-slate-500">Utilisateurs totaux</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-green-600">+3 ce mois</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{globalStats.vehicules}</h3>
          <p className="text-sm text-slate-500">Véhicules actifs</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-green-600">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{globalStats.missionsMois}</h3>
          <p className="text-sm text-slate-500">Missions ce mois</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-orange-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-green-600">{globalStats.economie} DT</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{globalStats.coutMensuel} DT</h3>
          <p className="text-sm text-slate-500">Coûts mensuels</p>
        </div>
      </div>

      {/* Alertes */}
      {globalStats.alertes > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-medium text-amber-800">Alertes système</h4>
              <p className="text-sm text-amber-700 mt-1">
                {globalStats.alertes} alertes nécessitent votre attention
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Évolution */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Évolution mensuelle</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="mois" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="utilisateurs" stroke="#3b82f6" />
              <Line type="monotone" dataKey="missions" stroke="#10b981" />
              <Line type="monotone" dataKey="couts" stroke="#f59e0b" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition des rôles */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Répartition des rôles</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RePieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {roleData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-600">{item.name}</span>
                <span className="text-xs font-medium text-slate-800 ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activité récente et utilisateurs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activité récente */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-800">Activité récente</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="px-6 py-4 hover:bg-slate-50">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'create' ? 'bg-green-50' :
                    activity.type === 'mission' ? 'bg-blue-50' :
                    activity.type === 'alert' ? 'bg-red-50' :
                    'bg-purple-50'
                  }`}>
                    {activity.type === 'create' && <UserPlus className="w-4 h-4 text-green-600" />}
                    {activity.type === 'mission' && <Calendar className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'alert' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                    {activity.type === 'document' && <Settings className="w-4 h-4 text-purple-600" />}
                    {activity.type === 'approve' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.target}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400">{activity.user}</span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs text-slate-400">{activity.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Utilisateurs récents */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Utilisateurs récents</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">Voir tout</button>
          </div>
          <div className="divide-y divide-slate-200">
            {recentUsers.map((user) => (
              <div key={user.id} className="px-6 py-4 hover:bg-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.role}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {user.status}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">{user.lastLogin}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistiques système */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Uptime</p>
          <p className="text-xl font-bold text-slate-800">99.8%</p>
          <p className="text-xs text-green-600">+0.2% ce mois</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Temps de réponse</p>
          <p className="text-xl font-bold text-slate-800">245 ms</p>
          <p className="text-xs text-green-600">-12 ms</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Stockage</p>
          <p className="text-xl font-bold text-slate-800">2.4 GB</p>
          <p className="text-xs text-slate-500">/ 10 GB</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">API calls</p>
          <p className="text-xl font-bold text-slate-800">12.4k</p>
          <p className="text-xs text-green-600">+8%</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;