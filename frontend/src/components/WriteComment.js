import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const WriteComment =(probs) =>{
    const navigate =useNavigate()

    const [comment, setComment] = useState({
        commentText:""
      });
    const changeHandler = (e) =>{

                setComment(prev=>({...prev, [e.target.name]: e.target.value }))

      };
    const clickHander = async(e) =>{
        e.preventDefault();    
        try {
            const request = 'http://127.0.0.1:5000/api/addReview?' + new URLSearchParams({
                text: comment.commentText,     
                service_id: probs.service_id,
                user_id: probs.user_id 
                });
                console.log(request)
              const respone = await axios.post(request);
              console.log(respone);
              window.location.reload();

        }
        catch (error) {
            console.log(error);
            navigate("/error")
        }
    }
    return    <>      
    <h3>Write new comment</h3>
    
      <form>
      <Container className="Form">
      <Row>
        <Col md={4}>
      <input class="form-control" type="text" placeholder="" name="commentText" required onChange={changeHandler}/></Col><Col><Button variant="btn btn-secondary" type="submit" onClick={clickHander}>Send</Button></Col>
      </Row>
    </Container>
    
    </form>

    </> 

}

export default WriteComment;