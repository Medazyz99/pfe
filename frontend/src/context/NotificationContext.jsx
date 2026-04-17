import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simuler des notifications en temps réel (toutes les 30 secondes)
  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        { titre: 'Maintenance imminente', message: 'Véhicule 123TUN789 nécessite une vidange dans 500 km' },
        { titre: 'Document expirant', message: 'Assurance du véhicule 456TUN123 expire dans 7 jours' },
        { titre: 'Mission assignée', message: 'Nouvelle mission pour le chauffeur Ahmed Ben Salem' },
        { titre: 'Consommation anormale', message: 'Véhicule 321TUN654 consommation élevée détectée' },
        { titre: 'Alerte carburant', message: 'Carte carburant presque épuisée' },
        { titre: 'Rappel visite technique', message: 'Véhicule 789TUN456 visite technique dans 15 jours' },
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      
      const newNotification = {
        id: Date.now(),
        titre: randomMsg.titre,
        message: randomMsg.message,
        type: 'warning',
        date: new Date().toLocaleTimeString(),
        lu: false
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Garde max 20 notifications
      setUnreadCount(prev => prev + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, lu: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, lu: true }))
    );
    setUnreadCount(0);
  };

  const addNotification = (notification) => {
    setNotifications(prev => [{ ...notification, id: Date.now(), lu: false }, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};