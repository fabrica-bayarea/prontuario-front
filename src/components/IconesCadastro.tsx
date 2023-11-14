import Image from "next/image";

interface Props {
  url: string;
  nome: string;
}

export default function IconesCadastro(props: Props) {
  return (
    <div>
      <Image
        className="icon-size"
        src={require(`../app/cadastro/${props.url}`).default}
        alt={`${props.nome}`}
      />
      <p>Cadastrar {props.nome}</p>
    </div>
  );
}
