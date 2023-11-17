"use client";
import Menu from "@/components/Menu";
import { AuthContextProvider } from "@/state/authContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Menu />
      <main>
        <AuthContextProvider>{children}</AuthContextProvider>
      </main>
    </>
  );
}
