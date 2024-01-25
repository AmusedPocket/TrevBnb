import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { populateReviewsInAGivenSpot } from '../../store/review';
import OpenModalButton from '../OpenModalButton';

const ReviewsIndex = ({review, spotId, userName, ownerId: spotOwnerId, numReviews}) => {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const reviews = useSelector(state => state.reviews.spot);
    const user = useSelector(state => state.session.user);
    const [postReview, setPostReview] = useState(false);

    useEffect(()=> {
        dispatch(populateReviewsInAGivenSpot(spotId)).then(()=>setLoaded(true));
    }, [dispatch]);

    useEffect(()=> {
        if(user === null){
            setPostReview(false);
            return;
        }

        if(spotOwnerId === user.id){
            setPostReview(false);
            return;
        }

        for(let review of Object.values(reviews)){
            if(review.User.id === user.id){
                setPostReview(false);
                return;
            }
        }

        setPostReview(true);
    }, [spotOwnerId, user, reviews]);

    return(
        <>
        <h1>Reviews are here</h1>
        </>
    )
}

export default ReviewsIndex;