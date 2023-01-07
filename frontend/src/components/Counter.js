import React, { useState, useEffect } from "react";
import axios from "axios";



const Counter = (probs) =>{
    const [num, setNum] = useState(0)
   
    useEffect(() => {
        setNum(probs.usefulness_rate.length)


    },[])
    return <>{num} user found this comment usefull.</>

}

export default Counter;