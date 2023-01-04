import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import cors from "cors";
import { 
    Link,
    useParams
  } from "react-router-dom";

import Rating from "../components/Rating"  
import DetailsButton from "../components/DetailsButton"  

const GetServices = () =>{
    cors()

    const {type, keyword} = useParams(); //given params to perform query
    const [services, setServices] = useState([]); //Database response
    console.log(type, keyword)
    useEffect(() => {
            const fetchAllServices = async () => {
                try {
                    var request = ""
                    if (type==="name"){
                        request = 'http://127.0.0.1:5000/api/getServices?' + new URLSearchParams({
                            name: keyword,
                            });                    
                    }

                    else if (type==="sector") {
                        request = 'http://127.0.0.1:5000/api/getServicesBySector?' + new URLSearchParams({
                            sector: keyword,
                            });

                        }
         
                    console.log("Api request: ", request);
                    const res = await axios.get(request,{
                        headers: {
                           authorization: null , //das kann glaub ich raus
                           'Content-Type': 'application/json'
                        }}) ;

                    console.log("res", res)
                    setServices(res)}
                    
                     
                 catch (error) {
                    console.log("error", error); 
                }

            }
            fetchAllServices();
    },[type, keyword] ); //evtl muss hier ein [] ans ende
    console.log("services: ", services)
    console.log(services)

    try{  
            return <div>
                <h1>Result:</h1>
                <br />
                <p>It can be foud at:</p>
                <div>
                <table>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Sector</th>
                        <th>Address</th>
                        <th>Rating</th>
                        <th>Details</th>
                        </tr>
                </thead>
                <tbody>
                {services.data[0].map((s) =><tr><td>{s.sid}</td><td>{s.name}</td><td>{s.sector}</td><td>{s.address[0].street} {s.address[0].number}, {s.address[0].city}</td><td><Rating /></td><td><DetailsButton id={s.sid}/></td></tr>  )}
                </tbody>
                </table>
                </div> 
                </div>
    }
    catch {
        return <p>No Services found.<br />
        <Link to ="/search">go back</Link><br />
        Or <Link to ="/addService">create a new service</Link><br />
        </p> 
    }
    }
//{services.data.sid}
export default GetServices;
//
//{services.data[0].map((s) =><tr><td>{s.sid}</td><td>{s.name}</td><td>{s.sector}</td><td>{s.address[0].street} {s.address[0].number}, {s.address[0].city}</td>asd<td></td></tr>  )}