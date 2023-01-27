import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddService = () => {
  const navigate = useNavigate()

  const [Service, setService] = useState({
    name: "", sector: "", street: "", no: "", city: "", zip: "",additionalInfo: []
  });
  const [exists, setExists] = useState(false)  //to display status msg
  const changeHandler = (e) => {
    setService(prev => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(Service)

  };
  const clickHander = async (e) => {
    e.preventDefault();

    try {
      console.log("add info", Service.additionalInfo)
      var additionalInfo_cleaned = Service.additionalInfo.filter((elem) => {return elem.name !== undefined && elem.value !== undefined});
      additionalInfo_cleaned = additionalInfo_cleaned.map((elem) =>{
        return String(elem.name) + "|~|" + String(elem.value)

      }).join('~~~');
      console.log("cleanded", additionalInfo_cleaned);

      const request = 'http://127.0.0.1:5000/api/addServices?' + new URLSearchParams({
        name: Service.name,
        sector: Service.sector,
        street: Service.street,
        no: Service.no,
        city: Service.city,
        zip: Service.zip,
        additional_info: additionalInfo_cleaned
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

  //Build fields for additional infos and set state:
  const addFieldChangeHandler = (event) =>{

      var index =  event.target.id.split("_")[1]
      console.log(index)

      if (event.target.name ==="Fieldname"){
        Service.additionalInfo[index].name = event.target.value;        
      }
      else{
        Service.additionalInfo[index].value = event.target.value;   
      }
      console.log(Service.additionalInfo)
      setService(Service)
      
      
  }
  const removeField = (event) =>{
    var index =  event.target.id.split("_")[1]

    document.getElementById("formgroup_"+ index).remove()
    Service.additionalInfo[index].name = undefined
    Service.additionalInfo[index].value = undefined
    setService(Service)


  }

  //dynamic fields for additional infos:
  const [fields, setFields] = useState(0);
  var fieldList = [];
  for (let i=0; i<fields; i++){
      Service.additionalInfo[i] = {id:i, name: undefined, value: undefined}
      fieldList.push(<Form.Group key={i} onChange={addFieldChangeHandler} id={"formgroup_"+i}><span><Form.Control type="text" num={i} placeholder="Fieldname" name="Fieldname" id={"additinalNameField_"+i} required  /><Form.Control id={"additinalValueField_"+i}type="text" placeholder="value" name="value" required />
    <Button  variant="btn btn-light" id={"delete_" +i}onClick={removeField}>removeField</Button></span>

    <br/><br/></ Form.Group >)
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

            <Col md={4}>

            {fieldList}

            <Form.Group className="mb-3" controlId="formName">
            <Button variant="btn btn-secondary" onClick={() =>{setFields(fields + 1)}}>Add a new Field</ Button >
            </Form.Group>

            </Col>
  
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