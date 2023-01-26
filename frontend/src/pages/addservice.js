import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AddFields from "../components/AddFields"

const AddService = () => {
  const navigate = useNavigate()

  const [Service, setService] = useState({
    name: "", sector: "", street: "", no: "", city: "", zip: "",additionalInfo: []
  });
  const [exists, setExists] = useState(false)
  const changeHandler = (e) => {
    setService(prev => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(Service)

  };
  const clickHander = async (e) => {
    e.preventDefault();

    try {
      const request = 'http://127.0.0.1:5000/api/addServices?' + new URLSearchParams({
        name: Service.name,
        sector: Service.sector,
        street: Service.street,
        no: Service.no,
        city: Service.city,
        zip: Service.zip,
        additional_info:Service.additionalInfo
      });
      console.log(request)
      const response = await axios.post(request);
      console.log(response.data);
      if (response.data.status === "Service already exists") {
        setExists(true);
      }
      else {
        setExists(false);
        if (response.data.status === "OK")
          try {
            const link = "/service/" + response.data.service_id
            navigate(link);
          }
          catch (error) {

          }
      }
    } catch (error) {
      console.log(error);
      navigate("/error")

    }

  }

  return (
    <Container>
      <Row>
        <h2>Add a new service</h2>
      </Row>
      <Row className="Form">
        <Form onSubmit={clickHander}>
          <Form.Group className="mb-3" controlId="formName">

            <Col md={4}>
              <Form.Control type="text" placeholder="name" name="name" required onChange={changeHandler} />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Col md={4}>
              <Form.Control type="text" placeholder="sector" name="sector" required onChange={changeHandler} />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Col md={4}>
              <Form.Control type="text" placeholder="street" name="street" required onChange={changeHandler} />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Col md={4}>
              <Form.Control type="number" placeholder="street number" name="no" min="0" required onChange={changeHandler} />

            </Col>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">

            <Col md={4}>
              <Form.Control type="text" placeholder="city" name="city" required onChange={changeHandler} />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">

            <Col md={4}>
              <Form.Control type="number" placeholder="zip code" name="zip" min="0" required onChange={changeHandler} />
            </Col>
          </Form.Group>
          <Form.Group>
          <Col md={4}>
            <AddFields name="additionalInfo" onChange={changeHandler}/>
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">

            <Col md={4}>
              <Button type="submit" variant="btn btn-secondary" >Add to Database</Button>
            </Col>
          </Form.Group>
        
        </Form>
        {exists && <b>This Service already exists.</b>}
      </Row>


    </Container>
  );
}

export default AddService;