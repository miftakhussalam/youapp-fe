"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  username: string;
  interests?: string[];
  avatar?: string;
  about?: string;
  gender?: string;
  name?: string;
  birthday?: string;
  horoscope?: string;
  zodiac?: string;
  height?: number;
  weight?: number;
}

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = (jwtToken: string) => {
    setToken(jwtToken);
    localStorage.setItem("authToken", jwtToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const setUserProfile = (userData: User) => {
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, setUser: setUserProfile, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used inside AuthProvider");
  return context;
};
