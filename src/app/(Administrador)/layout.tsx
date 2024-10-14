"use client";
import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from '@/components/Header/Header';
import { Can } from "@/components/Can/Can";
import "../../app/globals.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Can tipo={["ADMINISTRADOR"]}>
      <Header />
      <main>
      <ToastContainer />
        <AuthProvider>{children}</AuthProvider>
      </main>
    </Can>
  );
}
