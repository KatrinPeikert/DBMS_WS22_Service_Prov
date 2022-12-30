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
  };
  const clickHander = async(e) =>{
    e.preventDefault();
    try {
      const request = 'http://127.0.0.1:5000/api/addServices?' + new URLSearchParams({
        name: Service.name,
        sector: Service.sector,
        });
      await axios.post(request);
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