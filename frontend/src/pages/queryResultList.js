import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import cors from "cors";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
const Services = () =>{
    const { name, sector} = useParams();                             
    cors()
    const [services, setServices] = useState([]);
    useEffect(() => {
            const fetchAllServices = async () => {
                try {
                    const request = 'http://127.0.0.1:5000/api/getServices?' + new URLSearchParams({
                    name: name,
                    sector: sector,
                    });
                    console.log("Api request: ", request);
                    const res = await axios.get(request,{
                        headers: {
                           authorization: null ,
                           'Content-Type': 'application/json'
                        }}) ;

                    console.log(res)
                    setServices(res.data)
                } catch (error) {
                    console.log(error); 
                }

            }
            fetchAllServices();
    },[] ); //evtl muss hier ein [] ans ende
    console.log(services)
    if (services.length===0){
        return <p>No Services found.<br />
        <Link to ="/search">go back</Link><br />
        Or <Link to ="/addService">create a new service</Link><br />
        </p> 
    }
    return <div>
        <h1>Result:</h1>
        Serched service with name ={name} and sector={sector}.<br />
    {services.name}, {services.sector}
    {services}

    </div>
}

export default Services;