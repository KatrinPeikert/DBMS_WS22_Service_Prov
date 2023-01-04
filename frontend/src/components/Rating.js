import * as React from "react";


export default function Rating() {
    const rating = 3.5;
    if (rating === 0){
        return <>no ratings given</>
    }
    const stars = parseInt(rating / 1);
    var result = "\u2605".repeat(stars);
    var wStars = 5 -stars;
    if (rating - stars >= 0.5){
        result = result + "x";
        wStars =wStars -1;
    }
    result = result + "\u2606".repeat(wStars);
    return <>{result}</>

}
