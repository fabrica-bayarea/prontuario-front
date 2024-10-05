import { api } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import {useRouter} from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState} from "react";

type User = {
  access_token: string;
  tipo: string;
}

type SignInCredentials = {
  email: string;
  senha: string;
}

type SignUpCredentials = {
  cpf: string;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  cidade: string;
  cep: string;
  endereco: string;
  confirmaSenha: string;
  telefone: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>; 
  user: User | null;
  isAuthenticated: boolean;
  signOut:() => void;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({
} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps){
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { access_token } = parseCookies();

    if (access_token) {
      const decodedToken: any = jwtDecode(access_token);
      const { tipo } = decodedToken;

      setUser({access_token, tipo });
    }
  }, []);

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

      const decodedToken: any = jwtDecode(access_token);
      const { tipo } = decodedToken;

      setUser({
        tipo,
        access_token,
      })

      api.defaults.headers['Authorization'] = `Bearer ${access_token}`;

    } catch (err){
      console.log(err)
    }
  }

  async function signUp({ nome, sobrenome, email, senha, cpf, cidade, cep, endereco, confirmaSenha,telefone }: SignUpCredentials) {
    try {
      const response = await api.post('auth/signup/usuario', {
        cpf,
        nome,
        sobrenome,
        email,
        senha,
        cidade,
        cep,
        endereco,
        confirmaSenha,
        telefone,
      });
  
      const { access_token } = response.data;
  
      setCookie(undefined, 'access_token', access_token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
  
      const decodedToken: any = jwtDecode(access_token);
      const { tipo } = decodedToken;
  
      setUser({
        tipo,
        access_token,
      });
  
      api.defaults.headers['Authorization'] = `Bearer ${access_token}`;
  
      router.push('/Administrador/dashboard');
    } catch (err) {
      console.error(err);
    }
  }
  

  function signOut(){
    destroyCookie(undefined, 'access_token', {path: '/'});
    
    router.push('/auth/signin/usuario');
  }
  
  return (
    <AuthContext.Provider value={{signIn, signUp, signOut, isAuthenticated, user}}>
      {children}
    </AuthContext.Provider>
  )
}