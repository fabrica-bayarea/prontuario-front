"use client";

import { useAuth } from "@/state/authContext";

import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Programas() {
  const { accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/auth/signin/usuario");
    }
  }, [accessToken, router]);
  return (
    <div>
      <h1>Página de Programas Sociais</h1>
    </div>
  );
}
