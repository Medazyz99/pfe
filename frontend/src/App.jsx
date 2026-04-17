import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';  // ← AJOUT
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import ChefParcDashboard from './pages/ChefParcDashboard';
import Vehicules from './pages/Vehicules';
import Missions from './pages/Missions';
import Drivers from './pages/Drivers';
import Maintenance from './pages/Maintenance';
import Documents from './pages/Documents';
import Fuel from './pages/Fuel';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>  {/* ← AJOUT - ENTOURE TOUTES LES ROUTES */}
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            
            {/* Routes dashboard */}
            <Route path="/dashboard/*" element={<DashboardLayout />}>
              <Route index element={<ChefParcDashboard />} />
              <Route path="chef" element={<ChefParcDashboard />} />
              <Route path="vehicules" element={<Vehicules />} />
              <Route path="missions" element={<Missions />} />
              <Route path="drivers" element={<Drivers />} />
              <Route path="maintenance" element={<Maintenance />} />
              <Route path="documents" element={<Documents />} />
              <Route path="fuel" element={<Fuel />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* Routes admin */}
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Route 404 - doit être en dernier */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NotificationProvider>  {/* ← AJOUT - FERMETURE */}
      </AuthProvider>
    </Router>
  );
}

export default App;