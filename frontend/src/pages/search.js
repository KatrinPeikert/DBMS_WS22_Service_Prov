import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

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
    /*
    const request = 'http://127.0.0.1:5000/api/getServices?' + new URLSearchParams({
    name: query.name,
    sector: query.sector,
    });
    console.log(request);
    try {
      await axios.get(request)
    } catch (error) {
      console.log("error: ", error);
      
    }
    */

  }
  const handleSubmitSector=  (event) => {
    event.preventDefault();
    navigate("/query/sector/" +query.sector )

  }

return (
  <>
     <h2> Search by name:</h2>
     <Form onSubmit={handleSubmitName}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" required name="name" value={query.name} onChange={changeHandler}/>
        <Form.Text className="text-muted" >
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
    <h2> Search by sector:</h2>
    <Form onSubmit={handleSubmitSector}>

      <Form.Group className="mb-3" controlId="formSector">
        <Form.Label>Sector</Form.Label>
        <Form.Control type="text" required name="sector" value={query.sector} onChange={changeHandler} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
       <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  </>
);
}

export default SearchPage;