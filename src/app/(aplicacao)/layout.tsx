"use client";
import Menu from "@/components/Menu";
import { AuthContextProvider } from "@/Context/authContext";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Menu />
      <main>
        <AuthContextProvider>{children}</AuthContextProvider>
      </main>
    </>
  );
}
