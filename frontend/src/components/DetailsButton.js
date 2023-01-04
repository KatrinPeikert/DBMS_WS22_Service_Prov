import * as React from "react";
import Button from 'react-bootstrap/Button';
import { 
    Link,
    useParams
  } from "react-router-dom";

export default function DetailsButton(probs) {
    const l = "/service/" +probs.id;
    return <Link to ={l}>Ratings</Link>



}