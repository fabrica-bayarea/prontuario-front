import { api } from "@/services/api";
import { createContext, ReactNode} from "react";

type SignInCredentials = {
  email: string;
  senha: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({
} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps){
  const isAuthenticated = false;

  async function signIn({email, senha}: SignInCredentials){
    try {
      const response = await api.post('auth/signin/usuario', {
        email,
        senha
      });
      console.log(response.data);
    } catch (err){
      console.log(err)
    }

  }
  
  return (
    <AuthContext.Provider value={{signIn, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}