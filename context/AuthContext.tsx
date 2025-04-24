"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { User } from "../types";

// API URLs
const API_URL = "http://127.0.0.1:8000/api";
const TOKEN_REFRESH_URL = `${API_URL}/token/refresh/`;
const USER_INFO_URL = `${API_URL}/auth/user/`;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<string | null>;
  getAccessToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        
        if (accessToken) {
          await fetchUserInfo(accessToken);
        }
      } catch (err) {
        console.error("Authentication check failed:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch(USER_INFO_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const userData = await response.json();
      
      // Create user object from API response
      const user: User = {
        id: userData.pk.toString(),
        name: `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.username,
        email: userData.email,
      };

      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      setError("Failed to fetch user information");
      throw error;
    }
  };

  const login = async (accessToken: string, refreshToken: string) => {
    try {
      // Store tokens
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      
      // Fetch user info with the new token
      await fetchUserInfo(accessToken);
    } catch (err) {
      setError("Login failed");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async (): Promise<string | null> => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch(TOKEN_REFRESH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.access);
      
      return data.access;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      return null;
    }
  };

  const getAccessToken = (): string | null => {
    return localStorage.getItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        login,
        logout,
        refreshToken,
        getAccessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};