import * as React from "react";


export default function Rating() {
    const rating = 3.5;
    if (rating === 0){
        return <>no ratings given</>
    }
    const stars = parseInt(rating / 1);
    var result = String.fromCodePoint(9733).repeat(stars)//"\u2605".repeat(stars);
    var wStars = 5 -stars;
    if (rating - stars >= 0.5){
        result = result +  	"\u2BE8" //String.fromCodePoint(11243);
        wStars =wStars -1;
    }
    result = result + "\u2606".repeat(wStars);
    return <>{result}</>

}
//&#9733;