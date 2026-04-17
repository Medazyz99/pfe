import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.href = '/dashboard/chef';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center p-6">
      <div className="bg-black rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header avec logo */}
        <div className="bg-yellow-400 p-8 text-black text-center">
          <div className="mx-auto w-20 h-20 bg-black rounded-2xl flex items-center justify-center shadow-inner mb-4">
            <img 
              src="/images/logo-agil.jpeg" 
              alt="Agil Logo" 
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-black">Agil</h1>
        </div>

        {/* Formulaire de connexion */}
        <div className="p-8 bg-black">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-yellow-400 mb-2">
                Email professionnel
              </label>
              <input 
                type="email" 
                placeholder="exemple@entreprise.tn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-yellow-400 bg-black text-white focus:border-yellow-300 focus:ring-4 focus:ring-yellow-400/20 outline-none transition-all placeholder:text-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-yellow-400 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-yellow-400 bg-black text-white focus:border-yellow-300 focus:ring-4 focus:ring-yellow-400/20 outline-none transition-all placeholder:text-gray-500"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-yellow-400 hover:text-yellow-300"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 rounded-2xl text-lg transition-all active:scale-95"
            >
              Se connecter
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-8">
            Mot de passe oublié ?{' '}
            <span className="text-yellow-400 cursor-pointer hover:underline">
              Réinitialiser
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}