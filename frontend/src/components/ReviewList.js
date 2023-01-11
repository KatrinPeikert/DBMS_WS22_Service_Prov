import React from "react";
import Counter from "../components/Counter"
import CounterButton from "../components/CounterButton"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const ReviewList =  (probs) =>{
    //check if this user has given a rating to a comment:
    var id= probs.token;
    if (probs.token===1){
        id = probs.ipHash
    }
    console.log(id)

    try {
        return  <Container ><Row>{probs.list.map( (r, key) => <Col md={4}><p class="card" key={key}><div class="card-body"><h4 class="card-header">{r.login_user} wrote:</h4><p class="card-text">{r.text}</p></div>
         <div class="card-footer text-muted"><Counter r_id={r.rid} usefulness_rate={r.usefulness_rate}/> <CounterButton r_id={r.rid} user_id={probs.token} usefulness_rate={r.usefulness_rate} rating_id={id}/> </div></p></Col>
        )}
       </Row></Container>
    } 
    catch (error) {
        return <div>No reviwes given.</div>
    }
       
    

}
export default ReviewList;