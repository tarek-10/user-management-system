import React, { useContext } from 'react'
import { Container, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../AuthContext/AuthContext';
import "./Navbar.css";
export default function NavBar() {
  const {userData} = useContext(AuthContext);
  return (
    <>
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home"> UMS </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <span className="d-flex flex-row ">
          <Nav.Link href="#home" className="mx-2">Hello</Nav.Link>
          <Nav.Link href="#link">{userData?.firstName || "treak"}</Nav.Link>
        </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}
