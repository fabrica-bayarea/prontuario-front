"use client";
import { Header } from "@/components/Header/Header";
import { AuthContextProvider } from "@/state/authContext";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        <AuthContextProvider>{children}</AuthContextProvider>
      </main>
    </>
  );
}
