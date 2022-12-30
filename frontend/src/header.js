// header with react bootstrap
import * as React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header() {  

    return ( <header>        <Container>
              <h1 >Site-Title</h1>

        <Navbar bg="primary" variant="bright">
            <Nav variant="tabs">    
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>

          </Nav>
         

      </Navbar>
      </Container>

      </header>)}


