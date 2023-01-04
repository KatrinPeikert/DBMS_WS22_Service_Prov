import React from "react";





const ReviewList =  (probs) =>{

    try {
        return <p>{probs.list.map( (r) => <p>"{r.text}", by {r.login_user} (with user_id: {r.user_id})</p>)}</p>
    } 
    catch (error) {
        return <p>No reviwes given.</p>
    }
       
    

}
export default ReviewList;