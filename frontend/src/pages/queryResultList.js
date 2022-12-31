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
const GetServices = () =>{
    cors()

    const {  name, sector} = useParams(); //given params to perform query
    const [services, setServices] = useState([]); //Database response


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
                           authorization: null , //das kann glaub ich raus
                           'Content-Type': 'application/json'
                        }}) ;

                    console.log(res)
                    setServices(res.data.result)
                } catch (error) {
                    console.log(error); 
                }

            }
            fetchAllServices();
    },[name, sector] ); //evtl muss hier ein [] ans ende
    console.log("services: ", services)
    console.log(services)
    if (services.result===0){
        return <p>No Services found.<br />
        <Link to ="/search">go back</Link><br />
        Or <Link to ="/addService">create a new service</Link><br />
        </p> 
    }
    else{
    return <div>
        <h1>Result:</h1>
        Serched service with name ={name} and sector={sector}.<br />
        <div>
        <table>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Sector</th>
                </tr>
        {services.map((s, key) => <tr key={key}><td>{s.sid}</td><td>{s.name}</td><td>{s.sector}</td></tr>)}
    </table>
    </div>
    

    </div>
}
}
export default GetServices;
      