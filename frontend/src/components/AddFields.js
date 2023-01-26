import React from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import FieldGroup from "./FieldGroup"
const AddFieldButton = (probs) =>{
    const [fields, setFields] = useState(0);
    var fieldList = [];
    for (let i=0; i<fields; i++){
        fieldList.push(<p><FieldGroup id={i}/></p>)
    }


        return <p>{fieldList}<Button variant="btn btn-secondary" onClick={() =>{setFields(fields + 1)}}>Add a new Field</ Button >
   </ p>
}

export default AddFieldButton;