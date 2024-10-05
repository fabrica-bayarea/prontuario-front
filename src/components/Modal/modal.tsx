import style from "./style.module.css";

interface Modal {
    isOpen: boolean;
    setOpen:(isOpen:boolean) => void;
}

const Modal = ({isOpen, setOpen}: Modal) =>{
    if(isOpen) {
        return (
            <div className = {style.container}>
                <div className = {style.modal}>

                    <div className={style.envolveButton}>
                        <button onClick={()=>setOpen(!isOpen)}>X</button>
                    </div>

                    <div className = {style.conteudoSobre}>
                        <h1>Imformações Sobre o Projeto</h1>
                        <ul>
                            <li>Contribuir para a formação de cidadãos aptos a intervir no aperfeiçoamento da gestão;</li>
                            <li>Palestras, lives, cursos, minicursos e pesquisas.</li>
                        </ul>
                    </div>

                    <div className = {style.conteudoSobre}>
                        <h1>Cursos</h1>
                        <ul>
                            <li>Administração</li>
                            <li>Ciências Contábeis</li>
                            <li>Gestão Pública e Gestão de Recursos Humanos.</li>
                        </ul>
                    </div>

                    <div className = {style.conteudoSobre}>
                        <h1>Público</h1>
                        <ul>
                            <li>Discentes e comunidade externa.</li>
                        </ul>
                    </div>
                    
                    
                </div>
            </div>
        )
    } else {
        return <></>
    }
}

export default Modal;