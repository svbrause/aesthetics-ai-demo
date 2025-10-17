"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Provider {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  specialty: string;
}

interface ProviderContextType {
  provider: Provider | null;
  isAuthenticated: boolean;
  login: (provider: Provider) => void;
  logout: () => void;
  loading: boolean;
}

const ProviderContext = createContext<ProviderContextType | undefined>(
  undefined
);

export function ProviderProvider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored provider data on mount
    const storedProvider = localStorage.getItem("provider");
    if (storedProvider) {
      try {
        setProvider(JSON.parse(storedProvider));
      } catch (error) {
        console.error("Error parsing stored provider data:", error);
        localStorage.removeItem("provider");
      }
    }
    setLoading(false);
  }, []);

  const login = (providerData: Provider) => {
    setProvider(providerData);
    localStorage.setItem("provider", JSON.stringify(providerData));
  };

  const logout = () => {
    setProvider(null);
    localStorage.removeItem("provider");
  };

  const value = {
    provider,
    isAuthenticated: !!provider,
    login,
    logout,
    loading,
  };

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
}

export function useProvider() {
  const context = useContext(ProviderContext);
  if (context === undefined) {
    throw new Error("useProvider must be used within a ProviderProvider");
  }
  return context;
}
