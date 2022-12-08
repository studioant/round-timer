import { Navbar, Nav } from 'react-bootstrap';

function NavBar() {
    return (
      <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand className="navbar-brand" href="#home">Time & Round</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="nav-link" href="#features">Clock</Nav.Link>
            <Nav.Link className="nav-link" href="#pricing">Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

export default NavBar