import React, { useState, useEffect } from "react";



//counts the number of users which ratet a comment usefull
//probs.usefulness_rate : array of users who rated this comment
const Counter = (probs) =>{
    const [num, setNum] = useState(0)
   
    useEffect(() => {
        setNum(probs.usefulness_rate.length)


    },[probs])
    return <>{num} user found this comment usefull.</>

}

export default Counter;