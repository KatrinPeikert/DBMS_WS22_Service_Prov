import React from "react";
import Counter from "../components/Counter"
import CounterButton from "../components/CounterButton"




const ReviewList =  (probs) =>{

    try {
        return <div>{probs.list.map( (r, key) => <p key={key}>"{r.text}", by {r.login_user} (with user_id: {r.user_id})<br />
        <Counter r_id={r.rid} usefulness_rate={r.usefulness_rate}/> <CounterButton r_id={r.rid} user_id={probs.token}/><br /> </p>
        )}
        </div>
    } 
    catch (error) {
        return <div>No reviwes given.</div>
    }
       
    

}
export default ReviewList;