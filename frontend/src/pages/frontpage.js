import React, { useState, useEffect  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";



const  FrontPage = (probs) => {
  const [username, setUsername] = useState("");
  const navigate =useNavigate();

  useEffect(() => {
  const getUserRating = async () => {
    try {
      const request = 'http://127.0.0.1:5000/api/getUserName?' + new URLSearchParams({
        user_id: probs.token,
        });
        const res = await axios.get(request,{
          headers: {
             'Content-Type': 'application/json'
          }}) ;
     
          setUsername(res.data.username)

    } catch (error) {
      console.log("error", error); 
      navigate("/error")
  }

  }
getUserRating();
}, [])

return (
  <>
  <h2>Hello {username}!</h2>
  </>
);
}

export default FrontPage;