import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";
import {Link} from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import './Header.css';

const Header = () => {
  return (
      
    <Navbar bg="light" expand="lg">
        <Container>
      <Navbar.Brand><Link className = "reformed-link" to = "/">Stream.ME</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link className = "enlarged reformed-link">All Streams</Nav.Link>
        <Nav.Link>
         <GoogleAuth/>
        </Nav.Link>
        </Nav>
  
      </Navbar.Collapse>
      </Container>
    </Navbar>
   
  );
};
export default Header;
