import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

import ReviewList from "../components/ReviewList"
import WriteComment from "../components/WriteComment"
import StarRatingButton from "../components/StarRatingbutton"
import Rating from "../components/Rating"  


const ServicePage =  (probs) =>{
    const navigate =useNavigate()

    //const [state, setState] = useState(1)
    const {id} = useParams(); //given params to perform query
    const [service, setService] = useState({   
        sid: "",
        name: "",
        sector: "",
        address: [
            
        ],
        ratings:[
            
        ],
        reviews:[

        ],
        ip_hash:""


    }); //Database response
    //const [reviews, setReviews] = useState([])
    useEffect(() => {

        const fetchService = async () => {
            try {
                const request = 'http://127.0.0.1:5000/api/getServiceById?' + new URLSearchParams({
                service_id: id,
                });
                console.log("Api request: ", request);
                const res = await axios.get(request,{
                    headers: {
                       authorization: null , //das kann glaub ich raus
                       'Content-Type': 'application/json'
                    }}) ;

                setService(res.data)
            } catch (error) {
                console.log("error", error); 
                navigate("/error")

            }

        }
        fetchService();
        
        }
    ,[id] ); //state

    console.log("service:", service)
    try {
        return <>
        <h2>{service.name}</h2>
        <Rating service_id={id} ratings={service.ratings}/>
        
        <h3>Address:</h3>
        <div>
        {service.address[0].street} {service.address.number}, {service.address[0].area_code} {service.address[0].city}
        </div>
        <div>
        <StarRatingButton serviceId={id} user_id={probs.token}  ratings={service.ratings}/>
        </div>
        <h3>User comments :</h3>
        <ReviewList list ={service.reviews} token={probs.token} ipHash = {service.ip_hash}/>
        <WriteComment service_id={id} user_id={probs.token}/>
        </>


        
    } catch (error) {
        return <h2>Page not found.</h2>
    }


}

export default ServicePage;