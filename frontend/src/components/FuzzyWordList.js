import React from "react";
import { Link } from "react-router-dom";
const FuzzyWordList = (probs) =>{    
    if (probs.queryType ==="name"){
        try {
            return <>Did you mean one of this keywords?
            <ul class="list-group">
            {probs.response.map((s) =>{
                const link = "/query/name/" + s;
                return<li class="list-group-item list-group-item-dark"><Link class="link-dark" to={link}>{s}</Link></li>})}
            </ul>
            </>
        } catch (error) {
            return <></>
        }      
    }
}
export default FuzzyWordList;