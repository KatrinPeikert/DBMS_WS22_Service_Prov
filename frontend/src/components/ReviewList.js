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
        return <div >{probs.list.map( (r, key) => <p class="card" key={key}><div class="card-body"><h4 class="card-header">{r.login_user} wrote:</h4><p class="card-text">{r.text}</p></div>
         <div class="card-footer text-muted"><Counter r_id={r.rid} usefulness_rate={r.usefulness_rate}/> <CounterButton r_id={r.rid} user_id={probs.token} usefulness_rate={r.usefulness_rate} rating_id={id}/> </div></p>
        )}
        </div>
    } 
    catch (error) {
        return <div>No reviwes given.</div>
    }
       
    

}
export default ReviewList;