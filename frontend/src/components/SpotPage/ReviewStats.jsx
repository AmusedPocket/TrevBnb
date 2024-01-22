import React from 'react';

const ReviewStats = ({avgStarRating, numReviews}) => {
    if(numReviews === 0 || numReviews === "0"){
        return(<>
            <p><span><i className="fa-solid fa-star"></i></span>New</p>
        </>)
    } else {
        return (<>
        <p><span><i className="fa-solid fa-star"></i></span>{avgStarRating.toFixed(1)}</p>
        <p>·</p>
        <p>{numReviews} review</p>
        </>)
    } 
  
}

export default ReviewStats;