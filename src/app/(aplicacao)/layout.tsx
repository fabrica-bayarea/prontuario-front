"use client";
import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from "@/components/Header/Header";
import { Can } from "@/components/Can/Can";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Can tipo={["BENEFICIARIO"]}>
      <Header />
      <main>
        <AuthProvider>{children}</AuthProvider>
      </main>
    </Can>
  );
}
