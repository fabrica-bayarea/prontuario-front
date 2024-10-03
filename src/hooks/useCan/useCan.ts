//Hook para verificar permissão do usuario
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

type useCanParams = {
    tipo: string[];
}

export function useCan({tipo}: useCanParams) {
    const {user, isAuthenticated} = useContext(AuthContext);

    if(!isAuthenticated) {
        return false;
    }

    if(tipo?.length > 0) {

        const hasPermission = tipo.every(tipo => {
            return user?.tipo.includes(tipo)
        });

        if(!hasPermission) {
            return false;
        }
    }

    return true;
}