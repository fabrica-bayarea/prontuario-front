import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
