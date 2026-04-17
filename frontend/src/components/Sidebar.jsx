import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Truck, 
  Calendar, 
  Users, 
  Wrench,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Fuel,
  AlertTriangle,
  UserCircle,
  ClipboardList,
  Building2
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Menu items pour le chef de parc
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/chef' },
    { name: 'Véhicules', icon: Truck, path: '/dashboard/vehicules' },
    { name: 'Missions', icon: Calendar, path: '/dashboard/missions' },
    { name: 'Chauffeurs', icon: Users, path: '/dashboard/drivers' },
    { name: 'Maintenance', icon: Wrench, path: '/dashboard/maintenance' },
    { name: 'Documents', icon: FileText, path: '/dashboard/documents' },
    { name: 'Carburant', icon: Fuel, path: '/dashboard/fuel' },
    { name: 'Statistiques', icon: BarChart3, path: '/dashboard/statistics' },
    { name: 'Paramètres', icon: Settings, path: '/dashboard/settings' },
  ];

  if (!user) return null;

  return (
    <aside className={`bg-white border-r border-slate-200 h-screen transition-all duration-300 flex flex-col ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 text-black p-2 rounded-lg">
            <Truck size={24} />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-slate-800">Agil</span>
          )}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg hover:bg-slate-100"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-6 px-3">
        <p className={`text-xs text-gray-400 uppercase mb-4 ${collapsed ? 'text-center' : 'px-3'}`}>
          {!collapsed && 'MENU PRINCIPAL'}
        </p>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-yellow-400 text-black' 
                      : 'text-slate-600 hover:bg-slate-100'
                  } ${collapsed ? 'justify-center' : ''}`
                }
              >
                <item.icon size={20} />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User info et déconnexion */}
      {!collapsed ? (
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={user?.photo || `https://ui-avatars.com/api/?name=${user?.prenom}+${user?.nom}&background=0D9488&color=fff`}
              alt={`${user?.prenom} ${user?.nom}`}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">
                {user?.prenom} {user?.nom}
              </p>
              <p className="text-xs text-slate-500 truncate capitalize">
                {user?.role}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      ) : (
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={logout}
            className="w-full flex justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg"
            title="Déconnexion"
          >
            <LogOut size={20} />
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;