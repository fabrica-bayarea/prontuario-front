import { useCan } from "@/hooks/useCan/useCan";
import { ReactNode } from "react";

interface CanProps {
    children: ReactNode;
    tipo: string[];
}

export function Can({children, tipo}: CanProps){
    const useCanSeeComponent = useCan({tipo});

    if(!useCanSeeComponent) {
        return null;
    }
    
    return (
        <>
            {children}
        </>
    )
}