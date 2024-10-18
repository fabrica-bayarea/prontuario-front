import { api } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import {useRouter} from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type User = {
  access_token: string;
  tipo: string;
  nome?: string;
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
      const response = await api.post('auth/signin', {
        email,
        senha
      });

      const { access_token, usuario } = response.data;
      const { nome } = usuario;

      setCookie(undefined, 'access_token', access_token,{
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      setCookie(undefined, "nome", nome, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      const decodedToken: any = jwtDecode(access_token);
      const { tipo } = decodedToken;

      setUser({
        nome,
        tipo,
        access_token,
      })

      api.defaults.headers['Authorization'] = `Bearer ${access_token}`;

      const loadingToast = toast.loading("Redirecionando para a página inicial...");
      setTimeout(() => {
        toast.dismiss(loadingToast);
        
        if (tipo === 'ADMINISTRADOR') {
          router.push('/Administrador/dashboard-programas');
        }
        
        if (tipo === 'BENEFICIARIO') {
          router.push('/home');
        }
      }, 2000);

    } catch (err){
      console.log(err)

      throw err
    }
  }

  async function signUp(dataToSend: any) {
    try {
      const response = await api.post('auth/signup', dataToSend);
  
      const { access_token, usuario} = response.data;
      const { nome } = usuario;
  
      setCookie(undefined, 'access_token', access_token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setCookie(undefined, "nome", nome, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })
  
      const decodedToken: any = jwtDecode(access_token);
      const { tipo } = decodedToken;
  
      setUser({
        nome,
        tipo,
        access_token,
      });
  
      api.defaults.headers['Authorization'] = `Bearer ${access_token}`;
  
      const loadingToast = toast.loading("Redirecionando para a página inicial...");
      setTimeout(() => {
        toast.dismiss(loadingToast);

        if (tipo === 'ADMINISTRADOR') {
          router.push('/Administrador/dashboard-programas');
        } 
        
        if (tipo === 'BENEFICIARIO') {
          router.push('/home');
        }
  
      }, 2000);

    } catch (err) {
      console.error(err);

      throw err
    }
  }
  

  function signOut(){
    destroyCookie(undefined, 'access_token', {path: '/'});
    localStorage.removeItem("toastShown");
    
    router.push('/auth/signin/usuario');
  }
  
  return (
    <AuthContext.Provider value={{signIn, signUp, signOut, isAuthenticated, user}}>
      {children}
    </AuthContext.Provider>
  )
}