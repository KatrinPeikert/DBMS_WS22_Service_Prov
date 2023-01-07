//implemented according to https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6
import "./StarRating.css"
import React, { useState } from "react";
import axios from "axios";
import {ChangableStar} from "./Stars"

const StarRatingButton = (probs) =>{
    const serviceId = probs.serviceId;
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [click_num, setClick_num] = useState(1)

    const StarClickhandler = async (index) =>{
        setRating(index);
        console.log(hover)
        try {
            const request = 'http://127.0.0.1:5000/api/addStarRating/?' + new URLSearchParams({
                user_id: probs.user_id, ////////////////
                service_id: serviceId,
                rating: hover
              });
              console.log(request)
            const respone = await axios.post(request);
            console.log(respone);
            setClick_num(click_num +1)
            }
        catch (error){
            console.log(error);
        
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
              className={index <= (hover || rating) ? "on" : "off"}
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