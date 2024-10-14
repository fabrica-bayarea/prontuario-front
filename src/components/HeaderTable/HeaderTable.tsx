import styles from "./style.module.css";

interface HeaderTableProps {
    titulo: string;
    placeholder: string;
    searchTerm: string;
    onSearchChange: (e:any)=> void;
}

export default function HeaderTable({titulo, placeholder, searchTerm, onSearchChange}: HeaderTableProps){
    return (
        <div className={styles.tableTitulo}>
          <h2>{titulo}</h2>
          
          <div className = {styles.envolveSearch}>
            
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={onSearchChange}
            />
            
            <a className = {styles.buttonVisualizaAgenda} href="/agenda">
                Visualizar <br /> agenda
            </a>

          </div>

        </div>
    )
}