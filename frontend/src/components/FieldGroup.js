import React from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';

const FieldGroup = (probs) =>{
    const [FieldState, setFieldState] = useState({
        Fieldname: "", value: ""
      });
      const changeHandler = (e) => {
        setFieldState(prev => ({ ...prev, [e.target.name]: e.target.value }))
      };

    return <><Col md={12}><Form.Control type="text" placeholder="Fieldname" name="Fieldname" id={"additinalNameField"+probs.id} required onChange={changeHandler} /></Col><Col md={12}><Form.Control id={"additinalValueField"+probs.id}type="text" placeholder="value" name="value" required onChange={changeHandler} />
</Col></>
    
   
}

export default FieldGroup;