import { useState } from 'react';
import { exportToCSV, exportToPDF } from '../utils/exportUtils';
import { 
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Filter,
  Truck,
  Users,
  Wrench,
  DollarSign,
  Fuel,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
  Printer,
  Mail,
  X
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area,
  BarChart, Bar, PieChart as RePieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  monthlyStats, 
  vehicleStats, 
  driverStats, 
  maintenanceStats, 
  costStats 
} from '../data/statisticsData';

const Statistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('year');
  const [selectedView, setSelectedView] = useState('global');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // Données pour les graphiques
  const monthlyData = monthlyStats.labels.map((label, index) => ({
    mois: label,
    missions: monthlyStats.missions[index],
    km: monthlyStats.km[index],
    couts: monthlyStats.couts[index],
    carburant: monthlyStats.carburant[index]
  }));

  const vehicleTypeData = vehicleStats.parStatut.map(item => ({
    name: item.statut,
    value: item.count
  }));

  const costData = costStats.parCategorie.map(item => ({
    name: item.categorie,
    value: item.montant
  }));

  const maintenanceTypeData = maintenanceStats.parType.map(item => ({
    name: item.type,
    value: item.count
  }));

  // KPIs globaux
  const globalKPIs = [
    {
      title: 'Missions totales',
      value: '274',
      evolution: '+8%',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      title: 'Kilométrage total',
      value: '28 100 km',
      evolution: '+12%',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Coûts totaux',
      value: '123 456 DT',
      evolution: '+5%',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Consommation',
      value: '2 430 L',
      evolution: '-2%',
      icon: TrendingDown,
      color: 'orange'
    }
  ];

  const reports = [
    { id: 1, title: 'Rapport mensuel - Mars 2026', type: 'PDF', date: '15/03/2026', size: '2.4 MB' },
    { id: 2, title: 'Rapport trimestriel Q1 2026', type: 'PDF', date: '01/04/2026', size: '3.8 MB' },
    { id: 3, title: 'Analyse consommation carburant', type: 'Excel', date: '10/03/2026', size: '1.2 MB' },
    { id: 4, title: 'Rapport maintenance', type: 'PDF', date: '05/03/2026', size: '1.8 MB' },
    { id: 5, title: 'Performance chauffeurs', type: 'PDF', date: '01/03/2026', size: '2.1 MB' }
  ];

  // Fonctions d'export
  const handleExportCSV = () => {
    const dataToExport = monthlyData.map(item => ({
      Mois: item.mois,
      Missions: item.missions,
      Kilométrage: item.km,
      Coût: item.couts,
      Carburant: item.carburant
    }));
    exportToCSV(dataToExport, 'statistiques_agil');
  };

  const handleExportPDF = () => {
    // Convertir les données pour le PDF
    const pdfData = monthlyData.map(item => ({
      Mois: item.mois,
      Missions: item.missions,
      'Km': item.km,
      'Coût (DT)': item.couts,
      'Carburant (L)': item.carburant
    }));
    exportToPDF(pdfData, 'statistiques_agil');
  };

  // Fonction d'impression réelle
  const handlePrint = () => {
    window.print();
  };

  // Fonction d'impression avec contenu spécifique
  const handlePrintReport = (reportTitle) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${reportTitle} - Agil</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .header { text-align: center; margin-bottom: 30px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
            @media print {
              body { margin: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Agil - Gestion de Parc Automobile</h1>
            <h2>${reportTitle}</h2>
            <p>Date d'impression: ${new Date().toLocaleString()}</p>
          </div>
          <h3>Statistiques mensuelles</h3>
          <table>
            <thead>
              <tr>
                <th>Mois</th>
                <th>Missions</th>
                <th>Kilométrage (km)</th>
                <th>Coût (DT)</th>
                <th>Carburant (L)</th>
              </tr>
            </thead>
            <tbody>
              ${monthlyData.map(item => `
                <tr>
                  <td>${item.mois}</td>
                  <td>${item.missions}</td>
                  <td>${item.km}</td>
                  <td>${item.couts}</td>
                  <td>${item.carburant}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="footer">
            <p>Agil - Application de gestion de parc automobile</p>
          </div>
          <script>
            window.onload = function() { window.print(); setTimeout(function() { window.close(); }, 500); };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Statistiques & Rapports</h1>
          <p className="text-slate-500 mt-1">
            Analysez la performance de votre parc automobile
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <FileText size={18} />
            Générer rapport
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50"
            title="Exporter en CSV"
          >
            <Download size={18} />
            CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50"
            title="Exporter en PDF"
          >
            <FileText size={18} />
            PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50"
            title="Imprimer la page"
          >
            <Printer size={18} />
            Imprimer
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {globalKPIs.map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${kpi.color}-50`}>
                <kpi.icon className={`w-5 h-5 text-${kpi.color}-600`} />
              </div>
              <span className={`text-sm font-medium ${
                kpi.evolution.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.evolution}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">{kpi.value}</h3>
            <p className="text-sm text-slate-500">{kpi.title}</p>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex gap-2">
            <button
              onClick={() => setSelectedView('global')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedView === 'global' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Vue globale
            </button>
            <button
              onClick={() => setSelectedView('vehicules')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedView === 'vehicules' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Par véhicule
            </button>
            <button
              onClick={() => setSelectedView('chauffeurs')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedView === 'chauffeurs' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Par chauffeur
            </button>
          </div>
          <div className="flex gap-2">
            <select 
              className="border border-slate-200 rounded-lg px-3 py-2 bg-white"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
              <option value="custom">Personnalisé</option>
            </select>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
              <Filter size={18} className="text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution mensuelle */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-blue-600" />
            Évolution mensuelle
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="mois" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="missions" stroke="#3b82f6" />
              <Line type="monotone" dataKey="km" stroke="#10b981" />
              <Line type="monotone" dataKey="couts" stroke="#f59e0b" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition des coûts */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <PieChart size={18} className="text-purple-600" />
            Répartition des coûts
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={costData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {costData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        {/* Consommation par véhicule */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Fuel size={18} className="text-green-600" />
            Consommation par véhicule
          </h3>
          <div className="space-y-4">
            {vehicleStats.consommation.map((v, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">{v.vehicule}</span>
                  <span className="font-medium text-slate-800">{v.moyenne} L/100km</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(v.moyenne / 15) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top chauffeurs */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Users size={18} className="text-orange-600" />
            Top chauffeurs
          </h3>
          <div className="space-y-4">
            {driverStats.topPerformers.map((chauffeur, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-medium text-sm">
                    {chauffeur.nom.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{chauffeur.nom}</p>
                    <p className="text-xs text-slate-500">{chauffeur.missions} missions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-800">{chauffeur.km} km</p>
                  <p className="text-xs text-green-600">{chauffeur.satisfaction}% satisfaction</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistiques détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Maintenance */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Wrench size={18} className="text-red-600" />
            Maintenance
          </h3>
          <div className="space-y-3">
            {maintenanceStats.parType.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-sm text-slate-600">{item.type}</span>
                <span className="text-sm font-medium text-slate-800">{item.count} ({item.cout} DT)</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-slate-700">Total</span>
              <span className="text-sm font-bold text-slate-800">
                {maintenanceStats.parType.reduce((acc, i) => acc + i.cout, 0)} DT
              </span>
            </div>
          </div>
        </div>

        {/* Performance garages */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle size={18} className="text-green-600" />
            Performance garages
          </h3>
          <div className="space-y-3">
            {maintenanceStats.parGarage.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">{item.garage}</span>
                  <span className="font-medium text-slate-800">{item.interventions} int.</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-600 rounded-full"
                    style={{ width: `${(item.interventions / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incidents */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-600" />
            Incidents par chauffeur
          </h3>
          <div className="space-y-3">
            {driverStats.incidents.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-slate-600">{item.nom}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.incidents === 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {item.incidents} incident(s)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rapports récents */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Rapports récents</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">Voir tout</button>
        </div>
        <div className="divide-y divide-slate-200">
          {reports.map((report) => (
            <div key={report.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  report.type === 'PDF' ? 'bg-red-50' : 'bg-green-50'
                }`}>
                  <FileText className={`w-5 h-5 ${
                    report.type === 'PDF' ? 'text-red-600' : 'text-green-600'
                  }`} />
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">{report.title}</h4>
                  <p className="text-sm text-slate-500">{report.date} • {report.size}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handlePrintReport(report.title)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                  title="Imprimer le rapport"
                >
                  <Printer size={18} className="text-slate-600" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg">
                  <Download size={18} className="text-slate-600" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg">
                  <Mail size={18} className="text-slate-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Générer rapport */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Générer un rapport</h2>
              <button onClick={() => setIsReportModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Type de rapport
                </label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>Rapport mensuel</option>
                  <option>Rapport trimestriel</option>
                  <option>Rapport annuel</option>
                  <option>Analyse carburant</option>
                  <option>Performance chauffeurs</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Période
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" className="px-3 py-2 border rounded-lg" />
                  <input type="date" className="px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Format
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="format" defaultChecked /> PDF
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="format" /> Excel
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="format" /> CSV
                  </label>
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Inclure les graphiques
                </label>
                <label className="flex items-center gap-2 mt-2">
                  <input type="checkbox" /> Inclure les détails par véhicule
                </label>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button 
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-slate-50"
              >
                Annuler
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Générer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;