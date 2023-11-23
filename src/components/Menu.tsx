import { Button, Col, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./style.css";
import { ImExit } from "react-icons/im";
import Link from "next/link";
import { useAuth } from "@/state/authContext";
import { useRouter } from "next/navigation";

function Menu() {
  const { logout, accessToken } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (accessToken) {
      await logout(accessToken);
      router.push("/auth/signin/usuario");
    }
  };

  return (
    <Navbar expand="lg" className="text-white bg-danger">
      <Container>
        <Navbar.Brand>
          <Link href={"/home"} className="text-white nav-link">
            Prontuario Eletrônico
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/home" className="text-white nav-link">
              Home
            </Link>
            <Link href="/cursos" className="text-white nav-link">
              Cursos
            </Link>
            <Link href="/programas" className="text-white nav-link">
              Programas Sociais
            </Link>
            <Link href="/cadastro" className="text-white nav-link">
              Cadastro
            </Link>
            {/* <NavDropdown title="Cadastro">
              <NavDropdown.Item href="/auth/singup/beneficiario">
                Cadastro Beneficiário
              </NavDropdown.Item>
              <NavDropdown.Item href="/auth/singup/usuario">
                Cadastro Usuário
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
        <Col xs="auto" className="margin-icon">
          <Button
            variant="dark"
            href="/auth/signin/usuario"
            onClick={handleLogout}
          >
            <ImExit className="text-white" />
          </Button>
        </Col>
      </Container>
    </Navbar>
  );
}

export default Menu;
