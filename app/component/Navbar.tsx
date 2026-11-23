"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavScrollExample() {
  return (
    <Navbar expand="lg" sticky="top" className="main-navbar">
      <Container>
        <Navbar.Brand href="#" className="brand-name">
          Dapur Manis
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto align-items-lg-center gap-lg-2" navbarScroll>
            <Nav.Link href="#">Beranda</Nav.Link>
            <Nav.Link href="#produk">Produk</Nav.Link>
            <Nav.Link href="#tentang">Tentang Kami</Nav.Link>
            <Nav.Link href="#kontak" className="nav-contact">
              Hubungi
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;

