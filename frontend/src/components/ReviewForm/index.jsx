import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSpotById } from "../../store/spots";
import { createReview, editReview, getAllReviewsOfUser, populateReviewsInAGivenSpot } from "../../store/review";


const ReviewForm = ({review, spotId, spotName, formType, updateType}) => {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const [reviewText, setReviewText] = useState(review.review);
    const [stars, setStars] = useState(review.stars);
    const [disable, setDisable] = useState(true);
    const [error, setError] = useState(null);
    const buttonText = formType === 'create' ? "Submit Your Review" : "Update Your Review";

    const submitForm = async (e) => {
        e.preventDefault();
        const newReview = {
            review: reviewText,
            stars
        }
        if(formType==='create'){
            const response = await dispatch(createReview(spotId, review))
            if(response.ok){
                await dispatch(getSpotById(spotId));
                await dispatch(populateReviewsInAGivenSpot(spotId))
                closeModal();
            } else {
                const errorMessage = await response.json();
                setError(errorMessage.message)
            }
        } else if (formType === "update"){
            const response = await dispatch(editReview(review.id, newReview));
            if(response.ok){
                if(updateType === "spot"){
                    await dispatch(getSpotById(spotId));
                    await dispatch(populateReviewsInAGivenSpot(spotId))
                } else if (updateType === "user"){
                    await dispatch(getAllReviewsOfUser())
                }
                closeModal();
            } else {
                const data = await response.json();
                setError(data.message);
            }
        }
    }


    useEffect(()=> {
        if(reviewText.length >= 10 && stars > 0){
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [reviewText, stars])

    return (<div className="review-box">
        <h2 className="review-box-heading">How was your stay?</h2>
        <form className="review-box-form" onSubmit={submitForm}>
            {error && <p className="review-box-error">{error}</p>}
            <textArea 
            value={reviewText}
            placeHolder="Leave your review here..."
            onChange={(e)=> setReviewText(e.target.value)}
            />
        {/* <StarInput stars={stars} setStars={setStars}/> */}
        <button onSubmit={submitForm}>Submit Your Review</button>
        </form>
    </div>)
}

export default ReviewForm;