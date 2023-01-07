import React from "react";
import Counter from "../components/Counter"
import CounterButton from "../components/CounterButton"




const ReviewList =  (probs) =>{

    try {
        return <p>{probs.list.map( (r) => <p>"{r.text}", by {r.login_user} (with user_id: {r.user_id})<br />
        <Counter r_id={r.rid}/> <CounterButton r_id={r.rid} user_id={probs.token}/><br /> </p>
        )}
        </p>
    } 
    catch (error) {
        return <p>No reviwes given.</p>
    }
       
    

}
export default ReviewList;