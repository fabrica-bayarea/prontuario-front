import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ToastContainer />
      <body className={inter.className}>
        <nav>
          <ul>
            <li>
              <Link href="/">Programa</Link>
            </li>
            <li>
              <Link href="/pagCurso">Curso</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
