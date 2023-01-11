import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchPage = () => {
  const navigate =useNavigate()
  const [query, setQuery] = useState({
    name:"", sector:""});

  const changeHandler = (e) =>{
    setQuery(prev=>({...prev, [e.target.name]: e.target.value }))
  };


  const handleSubmitName =  (event) => {
    //build api request from form
    event.preventDefault();
    navigate("/query/name/" +query.name )
  

  }
  const handleSubmitSector=  (event) => {
    event.preventDefault();
    navigate("/query/sector/" +query.sector )

  }

return (
  <Container className="Form">
 
   
      <Row>
        <Col>
        <h2> Search by name:</h2>

     <Form onSubmit={handleSubmitName}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Control type="text" required name="name" value={query.name} onChange={changeHandler}/>
        <Form.Text className="text-muted" >
        </Form.Text>
      </Form.Group>
      <Button variant="btn btn-secondary" type="submit">
        Search
      </Button>
    </Form>
  </Col>
  <Col>
    <h2> Search by sector:</h2>
    <Form onSubmit={handleSubmitSector}>

      <Form.Group className="mb-3" controlId="formSector">
        <Form.Control type="text" required name="sector" value={query.sector} onChange={changeHandler} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
       <Button variant="btn btn-secondary" type="submit">
        Search
      </Button>
    </Form>
    </Col>
    </Row>

  </Container>
);
}

export default SearchPage;