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

    const {id} = useParams(); //given params to perform query

    //save quer results:
    const [sid, setSid] = useState();
    const [name, setName] = useState();
    const [sector, setSector] = useState();
    const [ip_hash, setIphash] = useState();
    const [address, setAddres] = useState([])
    const [ratings, setRatings] = useState([])
    const [reviews, setReviews] = useState([])
    const [additional_data, setAdditional_data] = useState([])
    const [reloader, setReloader] = useState(true)

    //switch state to be calles by child-components to trigger page reload
    const reloadFkt =() =>{
        setReloader(!reloader)
    }

    //Api request
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

                //setService(res.data)
                setSid(res.data.sid)
                setName(res.data.name)
                setSector(res.data.sector)
                setIphash(res.data.ip_hash)
                setAddres(res.data.address)
                setRatings(res.data.ratings)
                setReviews(res.data.reviews)

                setAdditional_data(res.data.additional_data)
            } catch (error) {
                console.log("error", error); 
                navigate("/error")

            }

        }
        fetchService();
        
        }
    ,[id, navigate, reloader] ); 

    try {
        return <>
        <h2>{name}</h2>
        <b>Sector: {sector}</b><br />
        <Rating service_id={id} ratings={ratings}/>
        
       
        <h3>Address:</h3>
        <div>
        {address[0].street} {address.number}, {address[0].area_code} {address[0].city}
        </div>
        <div>
        {additional_data.map((entry, key) => <p key={key}>{Object.keys(entry)[0]}: {entry[Object.keys(entry)[0]]}</p>)}
        </div>
        <div>
        <StarRatingButton switch={reloadFkt} serviceId={id} user_id={probs.token}  ratings={ratings}/>
        </div>
        <h3>User comments :</h3>
        <ReviewList switch={reloadFkt} list ={reviews} token={probs.token} ipHash = {ip_hash}/>
        <WriteComment switch={reloadFkt} service_id={id} user_id={probs.token}/>
        </>


        
    } catch (error) {
        return <h2>Page not found.</h2>
    }


}

export default ServicePage;