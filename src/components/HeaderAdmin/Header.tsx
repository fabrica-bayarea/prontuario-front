"use client"
import Image from "next/image";
import Link from "next/link";
import style from "./style.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export function HeaderAdmin() {
  const { signOut } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const Menu = ['Conta', 'Sair'];

  function HandleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className={style.navbarBody}>

      <div className={style.navbarTitle}>
        <Link href="/Administrador/dashboard-programas" className={style.Title}>
          Prontuario
          <Image src="/logoTitulo.svg" width={50} height={50} alt="Icon" />
        </Link>
      </div>

      <div className={style.containerNavbar}>

        <div className={`${style.navbarLinks} ${menuOpen ? style.active : ''}`}> 

        <Link href="/Administrador/dashboard-programas" className={style.Link}>
            Programas
          </Link>

          <Link href="/Administrador/dashboard-cursos" className={style.Link}>
            Cursos
          </Link>
        </div>

        <div className={style.buttonUserContainer}>
        <div className={style.butonUser}>
          <Image
            onClick={() => setOpen(!open)}
            src="/logoUser.svg"
            alt="Imagem do usuário"
            className={style.userIcon}
            width={42}
            height={42}
          />
        </div>
        {open && (
          <div className={style.dropdownMenuContainer}>
            <ul className={style.dropdownMenu}>
                {Menu.map((menu, index) => (
                  <li
                    key={index}
                    className={style.dropdownMenuButton}
                    onClick={menu === 'Sair' ? signOut : undefined}
                  >
                    {menu === 'Conta' ? (
                      <Link href="/profille" className={style.dropdownMenuButtonLink}>
                        {menu}
                      </Link>
                    ) : (
                      menu
                    )}
                  </li>
                ))}
              </ul>
          </div>
        )}
        </div>
      </div>

      <div className={style.menuIcon}>
        <Image
          src="/IconOpenMenu.svg"
          alt="Imagem do menu"
          width={30}
          height={30}
          onClick={HandleMenu}
        />
      </div>
    </div>
  );
}
