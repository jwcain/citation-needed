import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage.js";

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Main />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function Main() {
  return (
    <main>
      <Container className="mt-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </main>
  );
}

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Citation Needed</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto w-100 justify-content-end">
              <a href="/admin" className="nav-link" target="_blank">
                Admin
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto">
      <div className="text-center">In Development. All Rights Reserved.</div>
    </footer>
  );
}
