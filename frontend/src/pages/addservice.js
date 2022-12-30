import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AddService = () => {
  const navigate =useNavigate()

  const [Service, setService] = useState({
    name:"", sector:""
  });
  const changeHandler = (e) =>{
    setService(prev=>({...prev, [e.target.name]: e.target.value }))
    navigate("/");
  };
  const clickHander = async(e) =>{
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/addService/", Service)
    } catch (error) {
      console.log(error);
      
    }

  }

  return (
    <>      
    <h2>Add a new service</h2>
    <div className="Form">
    <input type="text" placeholder="name" name="name" onChange={changeHandler}/>
    <input type="text" placeholder="sector" name="sector"  onChange={changeHandler}/>
    <button onClick={clickHander}>Add to Database</button>
    </div>


    </>
  );
}

export default AddService;