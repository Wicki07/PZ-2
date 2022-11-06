import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Header() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Projekt PZ-2
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="/#about">O projekcie</Nav.Link>
            <Nav.Link href="/#features">Możliwości</Nav.Link>
            <Nav.Link href="/#join">Dołącz już teraz!</Nav.Link>
          </Nav>
          <Navbar.Text>
            Zalogowany jako: <a href="/login">Username</a>
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;