// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import authTokenService from "../services/AuthTokenService";
import authService from "../services/AuthService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on app start
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authTokenService.isAuthenticated()) {
          // Fetch current user
          const currentUser = await authService.getCurrentUser();
          localStorage.setItem("user", JSON.stringify(currentUser));
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Auth init failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    // Login and token retrieval
    await authTokenService.login(email, password);
    // Fetch current user
    const currentUser = await authService.getCurrentUser();
    localStorage.setItem("user", JSON.stringify(currentUser));
    setUser(currentUser);
    return currentUser;
  };

  const logout = async () => {
    authTokenService.logout();
    setUser(null);
  };

  // Refresh user (ex.: after update)
  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      logout();
    }
  };

  const clearAuth = () => {
    authTokenService.clearSession();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    refreshUser,
    clearAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook custom
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
