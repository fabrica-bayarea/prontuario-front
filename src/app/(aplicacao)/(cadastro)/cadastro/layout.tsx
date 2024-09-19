import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../(aplicacao)/glo"

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
        {/* <nav>
          <ul>
            <li>
              <Link href="/">Programa</Link>
            </li>
            <li>
              <Link href="/pagCurso">Curso</Link>
            </li>
          </ul>
        </nav> */}
        {children}
      </body>
    </html>
  );
}
