import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const Services = () =>{
    const [services, setServices] = useState([]);
    useEffect(() => {
            const fetchAllServices = async () => {
                try {
                    const res = await axios.get("http://localhost:5000/api/getServices/");
                    console.log(res)
                } catch (error) {
                    console.log(error); 
                }

            }
            fetchAllServices();
    }, [])

}