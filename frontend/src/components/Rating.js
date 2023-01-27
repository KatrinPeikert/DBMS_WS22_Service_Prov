import * as React from "react";
import {BlackStar, WhiteStar, HalfStar} from "./Stars"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Rating = (probs) => {
    //const [time, setTime] = useState(new Date());
    const [rating, setRating] = useState(0);    
    const navigate = useNavigate();

    useEffect(() => {
        //if called with loaded state
        if (probs.hasOwnProperty('ratings')){
                            var s = 0;
                            try{
                                var divisor = probs.ratings.length;
                                if (divisor> 0){
                                    var ratings = probs.ratings;
                                    ratings = ratings.map((val) => val.rating )
                                    ratings = ratings.reduce((a, b) => a + b, 0);
                                    s = ratings / divisor;
                                }
                            }
                            catch (error){
                                navigate("/error")

                            }

                            setRating(s);}
        else{
            const fetchRatings = async () => {
                try {
                    const request = 'http://127.0.0.1:5000/api/getStarRatingByID?' + new URLSearchParams({
                                    service_id: probs.service_id})
        
                                    console.log("Api request: ", request);
                    const res = await axios.get(request,{
                                        headers: {
                                           authorization: null , //das kann glaub ich raus
                                           'Content-Type': 'application/json'
                                        }}) ;
                                   
                console.log("star rating response", res)  
                setRating(res.data.rating)                      
                                    }      
                catch (error){
                    console.log("error fetching stars", error)
                    navigate("/error")
                }
            
                
            }
            fetchRatings(); 


        }
    }, [probs, navigate])
    
    console.log(rating);
    try {
            if (rating === 0){
                return <>no ratings given</>
            }
            const stars = parseInt(rating); //number of full stars


            //var result = String.fromCodePoint(9733).repeat(stars)//"\u2605".repeat(stars);
            var wStars = 5 -stars;
            var halfStar = 0;
            if (rating - stars >= 0.5){
                halfStar = 1; // 	"\u2BE8" //String.fromCodePoint(11243);
                wStars =wStars -1;
            }
            const BStarMap = Array(stars).fill(0); 
            const HStarMap = Array(halfStar).fill(0); 
            const WStarMap = Array(wStars).fill(0);     

            //result = result + "\u2606".repeat(wStars);
            try{
            return <>
            {BStarMap.map((item,index)=>{return <span key={index}><BlackStar /></span>})}
            {HStarMap.map((item,index)=>{return <span key={index}><HalfStar /></span>})}
            {WStarMap.map((item,index)=>{return <span key={index}><WhiteStar /></span>})}
            <p ><small>{probs.ratings.length} user(s) rated.</small></p>
            </>
            }
            catch (error){
                return <>
                {BStarMap.map((item,index)=>{return <span key={index}><BlackStar /></span>})}
                {HStarMap.map((item,index)=>{return <span key={index}><HalfStar /></span>})}
                {WStarMap.map((item,index)=>{return <span key={index}><WhiteStar /></span>})}
                </>
            }
           
            
       
            
            
          
           

        }
    catch (error){
        console.log(error)
        return <>No ratings</>
    }}
export default Rating