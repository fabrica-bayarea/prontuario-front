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
        src={require(`../../public/assets/${props.url}`).default}
        alt={`${props.nome}`}
      />
      <p style={{ textDecoration: "none", color: "black" }}>
        Cadastrar {props.nome}
      </p>
    </div>
  );
}
