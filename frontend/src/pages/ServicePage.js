import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

import ReviewList from "../components/ReviewList"
import WriteComment from "../components/WriteComment"
import StarRatingButton from "../components/StarRatingbutton"
import Rating from "../components/Rating"  


const ServicePage =  (probs) =>{

    const {id} = useParams(); //given params to perform query
    const [service, setService] = useState([]); //Database response
    const [reviews, setReviews] = useState([])
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

                console.log("service response:", res)
                setService(res)
            } catch (error) {
                console.log("error", error); 
            }

        }
        fetchService();
        const fetchReviews =async () =>{
            try {
                const request = 'http://127.0.0.1:5000/api/getReviewsByID?' + new URLSearchParams({
                    service_id: id,
                    });
                    console.log("Api request: ", request);
                    const res = await axios.get(request,{
                        headers: {
                           authorization: null , //das kann glaub ich raus
                           'Content-Type': 'application/json'
                        }}) ;
                    console.log("review response:", res)

                    setReviews(res);
            } catch (error) {
                console.log(error);
            }
        }
        fetchReviews();

        }
    ,[id] );  


    try {
        return <>
        <h2>{service.data[0].name}</h2>
        <h2><Rating service_id={id}/></h2>
        <p>
        <h3>Address:</h3>
        {service.data[0].address[0].street} {service.data[0].address[0].number}, {service.data[0].address[0].area_code} {service.data[0].address[0].city}
        </p>
        <p>
            <StarRatingButton serviceId={id} user_id={probs.token}/>
        </p>
        <h3>User comments :</h3>
        <ReviewList list ={reviews.data} token={probs.token}/>
        <WriteComment service_id={id} user_id={probs.token}/>
        </>


        
    } catch (error) {
        return <h2>Page not found.</h2>
    }


}

export default ServicePage;