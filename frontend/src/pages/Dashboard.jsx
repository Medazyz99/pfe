import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">
          Bonjour, {user?.prenom} {user?.nom} 👋
        </h1>
        <p className="text-slate-500 mt-1">
          Bienvenue sur votre tableau de bord.
        </p>
        <p className="text-sm text-slate-400 mt-2">
          Rôle connecté : <span className="font-medium capitalize">{user?.role}</span>
        </p>
      </div>

      {/* Message de test */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <p className="text-blue-800">
          ✅ Félicitations ! Le dashboard s'affiche correctement.
        </p>
        <p className="text-blue-600 text-sm mt-2">
          Prochaine étape : ajouter les composants de statistiques.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;