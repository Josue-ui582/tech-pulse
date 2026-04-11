"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getUser } from "@/utils/auth";
import { logOutUser } from "@/services/api";

export type User = {
  id: string;
  name: string;
  role: string;
  email?: string;
  bio?: string;
  profileImage?: string;
  [key: string]: any;
};

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    try {
      const userData = await getUser();
      setUser(userData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const logout = useCallback(async () => {
    try {
      await logOutUser();
    } catch {
      // Keep the local state consistent even if server logout fails.
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: Boolean(user), refreshUser, logout, setUser }),
    [user, loading, refreshUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}