import React from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CounterButton = (probs) =>{
    const navigate =useNavigate()

    //heck if rating is given by user
    var used = false;
    if (probs.usefulness_rate.includes(probs.rating_id)){
        used = true;

    }
    console.log("used", used)


    const sendVoting = async (r_id, user_id ) =>{
        try {
            const request = 'http://127.0.0.1:5000/api/addUsefullness/?' + new URLSearchParams({
                user_id: user_id, 
                r_id: r_id,
              });
            await axios.post(request);
            probs.switch()

            }
        catch (error){
            console.log(error);
            navigate("/error")


    }}
    if ( used=== false){
        return <Button variant="btn btn-secondary" onClick={() =>{sendVoting(probs.r_id, probs.user_id)}}>You found this usefull?</ Button >
    }
    else{
        return <Button variant="light" className="notUsefullButton"  onClick={() =>{sendVoting(probs.r_id, probs.user_id)}}>You found this usefull.</ Button >

    }
}

export default CounterButton;