import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { getSpotById } from "../../store/spots";
import { deleteReview, populateReviewsInAGivenSpot} from "../../store/review";
import { useDispatch } from "react-redux";

export default function DeleteReviewForm ({review, spotId, updateType}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const yesButtonClick = async () => {
        const response = await dispatch(deleteReview(review.id));
        if(response.ok){
            if(updateType === "spot"){
                await dispatch(populateReviewsInAGivenSpot(spotId));
                await dispatch(getSpotById(spotId))
            }
            closeModal();
        }
    }

    const noButtonClick = () => closeModal();

    return(<div className="delete-popup">
        <h2 className="review-popup-heading">Confirm Delete</h2>
        <p>Are you sure you want to delete this review?</p>
        <div className="delete-popup-buttons">
            <button className="delete-popup delete-yes" onClick={yesButtonClick}>Yes (Delete Review)</button>
            <button className="delete-popup delete-no" onClick={noButtonClick}>No (Keep Review)</button>
        </div>
    </div>)
}