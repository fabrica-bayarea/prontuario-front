// import styles from "./page.module.css";
// import usuario from "./image/Dropdowm Menu User (1).svg";
// import Image from "next/image";
// import heart from "./image/Logo_Vetorizada.svg";

// export default function pront() {
//   return (
//     <header className={styles.cabeca}>
//       <h1>prontuário</h1>
//       <Image className="coracao" src={heart} alt="coração" />
//       <nav>
//         <ul className="ul">
//           <li>
//             <a href="">Programas</a>
//           </li>
//           <li>
//             <a href="">cursos</a>
//           </li>
//         </ul>
//       </nav>
//       <Image className="usuario" src={usuario} alt="usuario" />
//     </header>
//   );
// }

import Image from "next/image";
import usuario from './image/Dropdowm Menu User (1).svg'
import logo from './image/Logo_Vetorizada.svg'
import styles from "./page.module.css";

export default function Head() {
  return (

    <header className={styles.header}>
      <div className={styles.header_left}>
        <h2>Prontuário</h2>
        <Image
          src={logo}
          alt="Coração"
          width={40}
          height={60}
        />
      </div>

      <div className={styles.header_right}>
        <h3>Programas</h3>
        <h3>Cursos</h3>
        <Image
          src={usuario}
          alt="Menu de usuário"
          width={40}
          height={60}
        />
      </div>
    </header>

    
  );
}
