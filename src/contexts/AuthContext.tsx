'use client';
import { api } from "@/services/api";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useState} from "react";

type User = {
  email: string;
  access_token: string;
}

type SignInCredentials = {
  email: string;
  senha: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User | null;
  isAuthenticated: boolean;
  signOut:() => void;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({
} as AuthContextData)

export function signOut(){
  destroyCookie(undefined, 'access_token');
    
  Router.push('/auth/signin/usuario');
}

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  async function signIn({email, senha}: SignInCredentials){
    try {
      const response = await api.post('auth/signin/usuario', {
        email,
        senha
      });

      const { access_token } = response.data;

      setCookie(undefined, 'access_token', access_token,{
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      setUser({
        email,
        access_token,
      })

      api.defaults.headers['Authorization'] = `Bearer ${access_token}`;

      console.log("Usuário autenticado:", { email, access_token });
    } catch (err){
      console.log(err)
    }
  }
  
  return (
    <AuthContext.Provider value={{signIn, signOut, isAuthenticated, user}}>
      {children}
    </AuthContext.Provider>
  )
}