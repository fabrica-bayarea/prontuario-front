'use client'
import { ReactNode, createContext, useState } from "react";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function signIn({ email, password }: SignInCredentials) {
    if (email === "gmail@gmail.com" && password === "Teste8181_") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      throw new Error("Email ou senha incorretos");
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
