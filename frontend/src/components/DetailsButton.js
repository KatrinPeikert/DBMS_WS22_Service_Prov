import * as React from "react";
import { 
    Link,
  } from "react-router-dom";

//link to service page
export default function DetailsButton(probs) {
    const l = "/service/" +probs.id;
    return <Link to ={l}><button type="button" class="btn btn-light">See reviews and details</button></Link>



}