'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '@/services/api/auth.service';
// import axios from 'axios';
 

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // useEffect(() => {
  //   const init = async () => {
  //     if (authService.isAuthenticated()) {
  //       const userData = await authService.getUser();
  //       if (userData) setUser(userData);
  //     }
  //   };
  //   init();
  // }, []);

  // const login = async (token: string) => {
  //   if (token != null){

  //     localStorage.setItem('token', token);
  //   }
  //   const userData = await authService.getUser();
  //   if (userData) setUser(userData);
  // };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };
  
  //bo sung
        const login = async (token: string) => {
  if (token != null) {
    localStorage.setItem('token', token);

    // ✅ Lấy user từ localStorage (đã được authService lưu sẵn sau login)
    const userData = authService.getUser();
  
    
    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      console.warn("Không tìm thấy user trong localStorage.");
    }
  }
};
//bo sung
useEffect(()=>{
const userData = authService.getUser();
  if (userData) {
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      console.warn("Không tìm thấy user trong localStorage.");
    }
},[user])


  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};


// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
