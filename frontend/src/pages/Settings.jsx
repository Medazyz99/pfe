import { useState } from 'react';
import { 
  User, 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  Lock,
  Mail,
  Phone,
  Camera,
  Save,
  X,
  Check,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('fr');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    missions: true,
    maintenance: true,
    documents: true,
    carburant: false
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Paramètres</h1>

      {/* Success message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <Check className="text-green-600" size={20} />
          <p className="text-green-700">Modifications enregistrées avec succès !</p>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium ${
              activeTab === 'profile' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <User size={18} />
            Profil
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium ${
              activeTab === 'notifications' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <Bell size={18} />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium ${
              activeTab === 'preferences' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <Globe size={18} />
            Préférences
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium ${
              activeTab === 'security' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <Lock size={18} />
            Sécurité
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img 
                  src={user?.photo} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-xl border-2 border-slate-200"
                />
                <button className="absolute bottom-0 right-0 p-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Camera size={16} />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{user?.prenom} {user?.nom}</h3>
                <p className="text-sm text-slate-500 capitalize">{user?.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Prénom</label>
                <input 
                  type="text" 
                  defaultValue={user?.prenom}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nom</label>
                <input 
                  type="text" 
                  defaultValue={user?.nom}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input 
                  type="email" 
                  defaultValue={user?.email}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
                <input 
                  type="tel" 
                  defaultValue="98 765 432"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="p-6 space-y-6">
            <h3 className="font-semibold text-slate-800">Canaux de notification</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">Email</p>
                  <p className="text-sm text-slate-500">Recevoir les notifications par email</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  className="w-5 h-5 text-blue-600"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">SMS</p>
                  <p className="text-sm text-slate-500">Recevoir les notifications par SMS</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                  className="w-5 h-5 text-blue-600"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">Push</p>
                  <p className="text-sm text-slate-500">Recevoir les notifications dans le navigateur</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifications.push}
                  onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  className="w-5 h-5 text-blue-600"
                />
              </label>
            </div>

            <h3 className="font-semibold text-slate-800 pt-4">Types de notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-800">Missions</span>
                <input 
                  type="checkbox" 
                  checked={notifications.missions}
                  onChange={(e) => setNotifications({...notifications, missions: e.target.checked})}
                  className="w-5 h-5 text-blue-600"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-800">Maintenance</span>
                <input 
                  type="checkbox" 
                  checked={notifications.maintenance}
                  onChange={(e) => setNotifications({...notifications, maintenance: e.target.checked})}
                  className="w-5 h-5 text-blue-600"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-800">Documents</span>
                <input 
                  type="checkbox" 
                  checked={notifications.documents}
                  onChange={(e) => setNotifications({...notifications, documents: e.target.checked})}
                  className="w-5 h-5 text-blue-600"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-800">Carburant</span>
                <input 
                  type="checkbox" 
                  checked={notifications.carburant}
                  onChange={(e) => setNotifications({...notifications, carburant: e.target.checked})}
                  className="w-5 h-5 text-blue-600"
                />
              </label>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Thème</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    theme === 'light' ? 'border-blue-600 bg-blue-50' : 'border-slate-200'
                  }`}
                >
                  <Sun size={18} className={theme === 'light' ? 'text-blue-600' : 'text-slate-600'} />
                  <span className={theme === 'light' ? 'text-blue-600' : 'text-slate-600'}>Clair</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    theme === 'dark' ? 'border-blue-600 bg-blue-50' : 'border-slate-200'
                  }`}
                >
                  <Moon size={18} className={theme === 'dark' ? 'text-blue-600' : 'text-slate-600'} />
                  <span className={theme === 'dark' ? 'text-blue-600' : 'text-slate-600'}>Sombre</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Langue</label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              >
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fuseau horaire</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg">
                <option value="africa/tunis">Afrique/Tunis (GMT+1)</option>
                <option value="europe/paris">Europe/Paris (GMT+1)</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-5 h-5 text-blue-600" />
                <span className="text-slate-800">Réduire les animations</span>
              </label>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Mot de passe actuel</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Nouveau mot de passe</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Confirmer le mot de passe</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
              />
            </div>

            <div className="pt-4">
              <h3 className="font-semibold text-slate-800 mb-3">Authentification à deux facteurs</h3>
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Activer la 2FA</p>
                    <p className="text-sm text-slate-500">Sécurisez votre compte avec Google Authenticator</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Activer
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-semibold text-slate-800 mb-3">Sessions actives</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">Chrome - Windows</p>
                    <p className="text-sm text-slate-500">Dernière activité : il y a 5 minutes</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Actuelle</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">Safari - iPhone</p>
                    <p className="text-sm text-slate-500">Dernière activité : il y a 2 heures</p>
                  </div>
                  <button className="text-red-600 hover:text-red-800 text-sm">Déconnecter</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="p-6 border-t border-slate-200 flex justify-end">
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            <Save size={18} />
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;