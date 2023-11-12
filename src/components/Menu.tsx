import { Button, Col, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './style.css'
import { ImExit } from 'react-icons/im';

function Menu() {
  return (
    <Navbar expand="lg" className="text-white bg-danger">
      <Container>
        <Navbar.Brand href="/home" className="text-white">Prontuario Eletrônico</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home" className="text-white">Home</Nav.Link>
            <Nav.Link href="/cursos" className="text-white">Cursos</Nav.Link>
            <Nav.Link href="/programas" className="text-white">Programas Sociais</Nav.Link>
            <NavDropdown title="Cadastro">
              <NavDropdown.Item href="/auth/singup/beneficiario">Cadastro Beneficiário</NavDropdown.Item>
              <NavDropdown.Item href="/auth/singup/usuario">Cadastro Usuário</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Col xs="auto" className='margin-icon'>
        <Button variant='dark' href="/auth/singin/beneficiario"> <ImExit className="text-white" /> </Button>
      </Col>
    </Navbar>
  );
}

export default Menu;