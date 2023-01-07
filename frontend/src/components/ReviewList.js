import React from "react";
import Counter from "../components/Counter"
import CounterButton from "../components/CounterButton"




const ReviewList =  (probs) =>{
    //check if this user has given a rating to a comment:
    var id= probs.token;
    if (probs.token===1){
        id = probs.ipHash
    }
    console.log(id)

    try {
        return <div>{probs.list.map( (r, key) => <p key={key}>"{r.text}", by {r.login_user} (with user_id: {r.user_id})<br />
        <Counter r_id={r.rid} usefulness_rate={r.usefulness_rate}/> <CounterButton r_id={r.rid} user_id={probs.token} usefulness_rate={r.usefulness_rate} rating_id={id}/><br /> </p>
        )}
        </div>
    } 
    catch (error) {
        return <div>No reviwes given.</div>
    }
       
    

}
export default ReviewList;