"use client";
import "./globals.css";

import { Inter } from "next/font/google";
import { AuthContextProvider } from "@/state/authContext";
import Head from "./head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head/>
      <html className={inter.className} lang="pt-br">
        <body className={inter.className}>
          <main>
            <AuthContextProvider>{children}</AuthContextProvider>
          </main>
        </body>
      </html>
    </>
  );
}
