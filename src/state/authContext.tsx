import axios from "axios";
import { createContext, useState, ReactNode } from "react";

const AuthContext = createContext({
  userId: null,
  logado: false,
  loginUsuario: (email: string, senha: string) => {},
});

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState({
    userId: null,
    logado: false,
  });

  async function loginUsuario(email: string, senha: string) {
    await axios
      .post(email, senha)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.message));
  }

  const context = {
    userId: currentUser.userId,
    logado: currentUser.logado,
    loginUsuario,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
