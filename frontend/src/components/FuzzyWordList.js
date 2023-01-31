import React from "react";
import { Link } from "react-router-dom";

// if no servive is found, a list iof similar words is displayed:
const FuzzyWordList = (probs) =>{    
    if (probs.queryType ==="name"){
        try {
            return <>Did you mean one of this keywords?
            <ul className="list-group">
            {probs.response.map((s, key) =>{
                const link = "/query/name/" + s;
                return<li key={key} className="list-group-item list-group-item-dark"><Link className="link-dark" to={link}>{s}</Link></li>})}
            </ul>
            </>
        } catch (error) {
            return <></>
        }      
    }
}
export default FuzzyWordList;