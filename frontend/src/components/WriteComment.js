import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



const WriteComment =(probs) =>{
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
        }
    }
    return    <>      
    <h3>Write new comment</h3>
    <div className="Form">
      <form>
      <input type="text" placeholder="commentText" name="commentText" required onChange={changeHandler}/>
      <button type="submit" onClick={clickHander}>Send</button>
    </form>
    </div>
    </> 

}

export default WriteComment;