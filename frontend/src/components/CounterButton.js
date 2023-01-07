import React from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";

const CounterButton = (probs) =>{
    const sendVoting = async (r_id, user_id ) =>{
        try {
            const request = 'http://127.0.0.1:5000/api/addUsefullness/?' + new URLSearchParams({
                user_id: user_id, ////////////////
                r_id: r_id,
              });
            await axios.post(request);
            window.location.reload();

            }
        catch (error){
            console.log(error);

    }}

    return <Button onClick={() =>{sendVoting(probs.r_id, probs.user_id)}}>you found this usefull?</ Button >
}

export default CounterButton;