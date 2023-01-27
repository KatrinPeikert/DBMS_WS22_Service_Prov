//implemented according to https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6
import "./StarRating.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import {ChangableStar} from "./Stars"
import { useNavigate, useParams } from "react-router-dom";

const StarRatingButton = (probs) =>{
    const navigate =useNavigate()

    const serviceId = probs.serviceId;
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    useEffect(() => {

      const getUserRating = async () => {
          try {
              const request = 'http://127.0.0.1:5000/api/getUserRating?' + new URLSearchParams({
              user_id: probs.user_id,
              s_id: probs.serviceId
              });
              console.log("Api request: ", request);
              const res = await axios.get(request,{
                  headers: {
                     'Content-Type': 'application/json'
                  }}) ;
                  console.log("rating", res.data.rating)
                  setRating(res.data.rating)
          } catch (error) {
              console.log("error", error); 
              navigate("/error")
          }

      }
      getUserRating();
    },[probs.user_id, probs.serviceId,navigate] )


    const StarClickhandler = async (index) =>{
        setRating(index);
        console.log(hover)
        try {
            const request = 'http://127.0.0.1:5000/api/addStarRating/?' + new URLSearchParams({
                user_id: probs.user_id, 
                service_id: serviceId,
                rating: hover
              });
            const res = await axios.post(request);
            console.log("rating response", res.data)
            probs.switch()

            }
        catch (error){
            console.log(error);
            navigate("/error")

        
    }

    }

    return (
      <div className="star-rating">
        <b>Make a rating:</b>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            
            <button 
            type="button"
              key={index }
              className={index <= (hover || rating) ? "btn btn-link on" : "btn btn-link off"}
              onClick={() => StarClickhandler(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
             <ChangableStar />
            </button>
          );
        })}
      </div>
    );
}

export default StarRatingButton;