import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';
import ReactDOM from 'react-dom/client';

export default function SearchPage() {
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle submit!")
      const request = 'http://127.0.0.1:5000/api/getServices?' + new URLSearchParams({
      name: name,
      sector: sector,
      });
      console.log(request);
      var response = fetch(request)
      .then((res) =>{
        return res.json();
      }).then((a) => {
        console.log(a.name, a.sector);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

return (
  <>
     <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <Form.Text className="text-muted" >
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSector">
        <Form.Label>Sector</Form.Label>
        <Form.Control type="text" value={sector} onChange={(e) => setSector(e.target.value)} />
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