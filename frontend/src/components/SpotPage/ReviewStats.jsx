import React from 'react';

const ReviewStats = ({avgStarRating, numReviews}) => {
    const reviewWord = numReviews === 1 ? "Review" : "Reviews"
    if(numReviews === 0 || numReviews === "0"){
        return(<>
            <p><span><i className="fa-solid fa-star"></i></span>New</p>
        </>)
    } else {
        return (<>
        <p><span><i className="fa-solid fa-star"></i></span>{Number(avgStarRating).toFixed(1)}</p>
        <p>·</p>
        <p>{numReviews} {reviewWord}</p>
        </>)
    } 
  
}

export default ReviewStats;