import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AddService = () => {
  const navigate =useNavigate()

  const [Service, setService] = useState({
    name:"", sector:"", street:"", no:"", city:"", zip:"",  
  });
  const [exists, setExists] =useState(false)
  const changeHandler = (e) =>{
    setService(prev=>({...prev, [e.target.name]: e.target.value }))
  };
  const clickHander = async(e) =>{
    e.preventDefault();

    try {
      const request = 'http://127.0.0.1:5000/api/addServices?' + new URLSearchParams({
        name: Service.name,
        sector: Service.sector,
        street: Service.street,
        no :Service.no,
        city: Service.city,
        zip: Service.zip
        });
        console.log(request)
      const response = await axios.post(request);
      console.log(response.data);
      if (response.data.status=== "Service allready exists"){
        setExists(true);
      }
      else{
        setExists(false);
        if (response.data.status=== "OK")
        try{
          const link = "/service/" + response.data.service_id
          navigate(link);
        }
        catch (error){

        }
      }
    } catch (error) {
      console.log(error);
      navigate("/error")
      
    }

  }

  return (
    <>      
    <h2>Add a new service</h2>
    <div className="Form">
      <form>
    <input type="text" placeholder="name" name="name" required onChange={changeHandler}/>
    <input type="text" placeholder="sector" name="sector" required onChange={changeHandler}/>
    <input type="text" placeholder="street" name="street" required onChange={changeHandler}/>
    <input type="number" placeholder="street number" name="no" min="0" required onChange={changeHandler}/>
    <input type="text" placeholder="city" name="city" required onChange={changeHandler}/>
    <input type="number" placeholder="zip code" name="zip" min="0" required onChange={changeHandler}/>

    <button type="submit" onClick={clickHander}>Add to Database</button>
    </form>
    {exists && <b>This Service allready exists.</b>}
    </div>


    </>
  );
}

export default AddService;