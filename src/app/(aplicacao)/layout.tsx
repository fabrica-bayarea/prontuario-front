"use client";
import { Header } from "@/components/Header/Header";
// import { AuthContextProvider } from "@/state/authContext";
import { AuthProvider } from '../../contexts/AuthContext';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        <AuthProvider>{children}</AuthProvider>
      </main>
    </>
  );
}
