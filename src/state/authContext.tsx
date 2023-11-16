import axios from "axios";
import { createContext, useState, ReactNode } from "react";

const AuthContext = createContext({
  userId: null,
  logado: false,
});

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState({
    userId: null,
    logado: false,
  });

  const context = {
    userId: currentUser.userId,
    logado: currentUser.logado,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
