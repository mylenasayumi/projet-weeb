// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

import authService from "../services/AuthService";
import authTokenService from "../services/AuthTokenService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveUser = (currentUser) => {
    setUser(currentUser);
    localStorage.setItem("user", JSON.stringify(currentUser));
  };

  const clearAuth = () => {
    authTokenService.clearSession();
    setUser(null);
  };

  // Load user on app start
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (!authTokenService.isAuthenticated()) {
          // Fetch current user
          clearAuth();
          return;
        }
        const currentUser = await authService.getCurrentUser();
        saveUser(currentUser);
      } catch (error) {
        console.error("Auth init failed:", error);
        clearAuth();
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
    saveUser(currentUser);
    return currentUser;
  };

  const logout = async () => {
    await authTokenService.logout();
    setUser(null);
  };

  // Refresh user (ex.: after update)
  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      saveUser(currentUser);
      return currentUser;
    } catch (error) {
      console.error("Failed to refresh user:", error);
      clearAuth();
      return null;
    }
  };

  const setAuthenticatedUser = (currentUser) => {
    saveUser(currentUser);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    refreshUser,
    clearAuth,
    setAuthenticatedUser,
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
