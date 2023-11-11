import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Menu() {
  return (
    <Navbar expand="lg" className="text-white bg-danger">
      <Container>
        <Navbar.Brand href="#home" className="text-white">Prontuario Eletrônico</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="text-white">Home</Nav.Link>
            <Nav.Link href="#link" className="text-white">Cursos</Nav.Link>
            
            <NavDropdown title="Cadastro" className="text-white">
              <NavDropdown.Item href="">Cadastro Beneficiário</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Cadastro Usuário</NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;