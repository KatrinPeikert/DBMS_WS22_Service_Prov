import React, { useState, useEffect } from "react";
import axios from "axios";



const Counter = (probs) =>{
    const [num, setNum] = useState(0)
   
    /*const getNum = async () =>{
    try {
        const request = 'http://127.0.0.1:5000/api/get_usefulness_rate/?' + new URLSearchParams({
            r_id: probs.r_id, ////////////////
          });
        console.log(request, probs.r_id)
        const respone = await axios.get(request);
        console.log("r rating", respone);
        setNum(respone.data.rate)
        }
    catch (error){
        console.log(error);
        setNum(400)
    
        }
    }*/
    useEffect(() => {
        setNum(probs.usefulness_rate.length)


    },[])
    return <>{num} user found this comment usefull.</>

}

export default Counter;