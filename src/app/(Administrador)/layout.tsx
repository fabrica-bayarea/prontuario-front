"use client";
import { AuthProvider } from '@/contexts/AuthContext';
import { HeaderAdmin } from '@/components/HeaderAdmin/Header';
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
      <HeaderAdmin/>
      <main>
      <ToastContainer />
        <AuthProvider>{children}</AuthProvider>
      </main>
    </Can>
  );
}
