import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(path => path);

  const getPathName = (path) => {
    const names = {
      'dashboard': 'Dashboard',
      'chef': 'Chef de Parc',
      'vehicules': 'Véhicules',
      'missions': 'Missions',
      'drivers': 'Chauffeurs',
      'maintenance': 'Maintenance',
      'documents': 'Documents',
      'fuel': 'Carburant',
      'statistics': 'Statistiques',
      'settings': 'Paramètres'
    };
    return names[path] || path;
  };

  return (
    <nav className="flex items-center gap-2 text-sm mb-4">
      <Link to="/dashboard/chef" className="text-slate-500 hover:text-blue-600">
        <Home size={16} />
      </Link>
      {paths.map((path, index) => {
        const url = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;

        return (
          <div key={path} className="flex items-center gap-2">
            <ChevronRight size={14} className="text-slate-400" />
            {isLast ? (
              <span className="font-medium text-slate-800">
                {getPathName(path)}
              </span>
            ) : (
              <Link to={url} className="text-slate-500 hover:text-blue-600">
                {getPathName(path)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;