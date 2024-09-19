import axios from "axios";
import { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  accessToken: string | null;
  login: (url: string, body: usuarioType) => void;
  logout: (access_token: string) => void;
}
type usuarioType = {
  email: string;
  senha: string;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType | never {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async (url: string, body: usuarioType) => {
    try {
      const res = await axios.post(url, body);
      setAccessToken(res.data.access_token);
    } catch (error: any) {
      throw error?.response.data.message;
    }
  };

  const logout = async (accessToken: string) => {
    try {
      setAccessToken(null);
    } catch (error) {
      console.log("Error removing access_token");
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
