// header with react bootstrap
import * as React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header() {  

    return ( <header>
        <Navbar bg="primary" variant="bright">
        <Container>
   
              <Nav variant="tabs">    
            <h1>Site-Title</h1>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>

          </Nav>
         

        </Container>
      </Navbar>

      </header>)}


