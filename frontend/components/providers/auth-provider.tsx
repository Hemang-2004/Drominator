"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  user: any
  login: (userData: any) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const login = (userData: any) => {
    setIsAuthenticated(true)
    setUser(userData)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
