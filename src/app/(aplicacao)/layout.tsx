"use client";
import Menu from "@/components/Menu";
import { useAuth } from "@/state/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAuth();
  const router = useRouter();

  //Ativar em produção
  // useEffect(() => {
  //   if (!accessToken) {
  //     router.push("/auth/signin/usuario");
  //   }
  // }, [accessToken, router]);

  return (
    <>
      <Menu />
      <main>{children}</main>
    </>
  );
}
