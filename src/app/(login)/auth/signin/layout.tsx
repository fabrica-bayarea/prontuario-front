"use client";
import { AuthContextProvider } from "@/Context/authContext";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <AuthContextProvider>{children}</AuthContextProvider>
      </main>
    </>
  );
}
