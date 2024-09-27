"use client"
import Image from "next/image";
import Link from "next/link";
import style from "./style.module.css";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const Menu = ['Conta', 'Sair'];

  function HandleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className={style.navbarBody}>

      <div className={style.navbarTitle}>
        <Link href="/home" className={style.Title}>
          Prontuario
          <Image src="/logoTitulo.svg" width={50} height={50} alt="Icon" />
        </Link>
      </div>

      <div className={style.containerNavbar}>

        <div className={`${style.navbarLinks} ${menuOpen ? style.active : ''}`}> 
          <Link href="/agenda" className={style.Link}>
            Agenda
          </Link>

          <Link href="/cursos" className={style.Link}>
            Cursos
          </Link>

          <Link href="/programas" className={style.Link}>
            Programas
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
                <Link className = {style.dropdownMenuButtonLink} href={menu === 'Conta' ? '/conta' : '/auth/signin/usuario'} passHref key={index}>
                <li className={style.dropdownMenuButton}>
                  {menu}
                </li>
                </Link>
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
