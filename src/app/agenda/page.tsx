import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from './img/image.png';
import Logo from './img/icon.png';
import User from './img/usuario.png';
import './styles.css';

const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <span>Prontuário</span>
          <Image src={Logo} alt="Logo" width={30} height={30} layout="intrinsic" />
        </div>
        <ul className="nav-links">
          <li><Link href="/agenda"><span>Agenda</span></Link></li>
          <li><Link href="/cursos">Cursos</Link></li>
          <li><Link href="/programas">Programas</Link></li>
        </ul>
        <div className="profile">
          <Image src={User} alt="User Icon" width={60} height={60} layout="intrinsic"
          />
        </div>
      </nav>

      <div className="title-section">
        <div className="text-container">
          <h2>
            Verifique seus atendimentos agendados do{' '}
            <span className="highlight">dia, semana e mês</span>
          </h2>
          <p>Gerencie eficientemente seus compromissos <br /> e consultas agendadas</p>
        </div>
        <div className="image-container">
          <Image src={logoImage} alt="Main Logo" width={400} height={300} />
        </div>
      </div>
    </header>
  );
};

export default Header;
