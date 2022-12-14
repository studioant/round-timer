import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom"


function NavBar() {
    return (
      <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark">
        <Navbar.Brand >
            <Link className="navbar-brand" to="/">Time & Round</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/clock">Clock</Link>
            <Link className="nav-link" to="/settings">Settings</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

export default NavBar