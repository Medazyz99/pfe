import { Link } from 'react-router-dom';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden text-center">
        <div className="bg-blue-600 p-8 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <AlertTriangle size={64} className="mx-auto text-white relative z-10 animate-bounce" />
        </div>
        <div className="p-8">
          <h1 className="text-7xl font-bold text-slate-800 mb-2">404</h1>
          <p className="text-xl text-slate-600 mb-4">Page non trouvée</p>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-slate-500 mb-8">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/dashboard/chef"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Home size={18} />
              Dashboard
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 border border-slate-300 px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft size={18} />
              Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;