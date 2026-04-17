import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const ROLES = {
  ADMIN: 'administrateur',
  CHEF_PARc: 'chef de parc',
  CHAUFFEUR: 'chauffeur',
  OPERATEUR: 'opérateur maintenance'
};

const mockUsers = {
  admin: {
    id: 1,
    nom: 'Admin',
    prenom: 'System',
    email: 'admin@fleetpro.tn',
    role: ROLES.ADMIN,
    photo: 'https://ui-avatars.com/api/?name=Admin+System&background=0D9488&color=fff&size=128',
    actif: true
  },
  chef: {
    id: 2,
    nom: 'Ben Ali',
    prenom: 'Mohamed',
    email: 'chef@fleetpro.tn',
    role: ROLES.CHEF_PARc,
    photo: 'https://ui-avatars.com/api/?name=Mohamed+Ben+Ali&background=0D9488&color=fff&size=128',
    actif: true
  },
  chauffeur: {
    id: 3,
    nom: 'Selmi',
    prenom: 'Aziz',
    email: 'aziz.selmi@fleetpro.tn',
    role: ROLES.CHAUFFEUR,
    photo: 'https://ui-avatars.com/api/?name=Aziz+Selmi&background=0D9488&color=fff&size=128',
    actif: true
  },
  operateur: {
    id: 4,
    nom: 'Trabelsi',
    prenom: 'Sami',
    email: 'operateur@fleetpro.tn',
    role: ROLES.OPERATEUR,
    photo: 'https://ui-avatars.com/api/?name=Sami+Trabelsi&background=0D9488&color=fff&size=128',
    actif: true
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(mockUsers.chef);
  const [loading, setLoading] = useState(false);

  const switchRole = (roleKey) => {
    setUser(mockUsers[roleKey]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      logout,
      switchRole,
      hasRole: (roles) => {
        if (!user) return false;
        if (Array.isArray(roles)) {
          return roles.includes(user.role);
        }
        return user.role === roles;
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};