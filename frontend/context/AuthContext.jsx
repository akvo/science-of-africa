import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getMe } from '@/lib/strapi-forum';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('forum_token');
    const savedUser = localStorage.getItem('forum_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));

      // Verify token is still valid
      getMe(savedToken)
        .then(userData => {
          setUser(userData);
          localStorage.setItem('forum_user', JSON.stringify(userData));
        })
        .catch(() => {
          // Token invalid, clear storage
          logout();
        });
    }

    setLoading(false);
  }, []);

  const login = async (identifier, password) => {
    const response = await apiLogin(identifier, password);
    setToken(response.jwt);
    setUser(response.user);
    localStorage.setItem('forum_token', response.jwt);
    localStorage.setItem('forum_user', JSON.stringify(response.user));
    return response.user;
  };

  const register = async (username, email, password) => {
    const response = await apiRegister(username, email, password);
    setToken(response.jwt);
    setUser(response.user);
    localStorage.setItem('forum_token', response.jwt);
    localStorage.setItem('forum_user', JSON.stringify(response.user));
    return response.user;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('forum_token');
    localStorage.removeItem('forum_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
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
