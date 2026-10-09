import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USERS = {
  customer: {
    id: 'user-cust-01',
    name: 'Priya Tiwari',
    phone: '+91 98391 22840',
    email: 'priya.tiwari@example.com',
    role: 'customer',
    locality: 'Golghar, Gorakhpur',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  artist: {
    id: 'user-art-01',
    artistProfileId: 'gkp-art-01',
    name: 'Pooja Verma',
    studioName: 'Pooja Verma Bridal Henna Studio',
    phone: '+91 98380 11422',
    email: 'pooja.verma@example.com',
    role: 'artist',
    locality: 'Betiahata, Gorakhpur',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  admin: {
    id: 'user-adm-01',
    name: 'Rajnish Kumar (Ops Lead)',
    phone: '+91 94500 00100',
    email: 'ops.gorakhpur@mehndiconnect.in',
    role: 'admin',
    locality: 'Gorakhpur Central Hub',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('mehndiconnect_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.customer;
  });

  useEffect(() => {
    localStorage.setItem('mehndiconnect_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const switchPersona = (role) => {
    if (DEMO_USERS[role]) {
      setCurrentUser(DEMO_USERS[role]);
    }
  };

  const loginCustom = (userData) => {
    setCurrentUser({
      id: 'user-' + Date.now(),
      role: 'customer',
      ...userData
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchPersona, loginCustom, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
