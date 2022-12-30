import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const Services = () =>{
    const [services, setServices] = useState([]);
    useEffect(() => {
            const fetchAllServices = async () => {
                try {
                    const request = 'http://127.0.0.1:5000/api/getServices?' + new URLSearchParams({
                    name: "J",
                    sector: "ector",
                    });
                    console.log("Api request: ", request);
                    const res = await axios.get(request);
                    //console.log(res)
                    setServices(res.data)
                } catch (error) {
                    console.log(error); 
                }

            }
            fetchAllServices();
    }, []);
    return <div>
        <h1>Result:</h1>
    {services.name}, {services.sector}

    </div>
}

export default Services;