import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotById } from '../../store/spots';
import ReviewStats from './ReviewStats';
import ReviewsIndex from '../ReviewsIndex/ReviewsIndex';


const SpotPage = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const spot = useSelector(state => state.spots.singleSpot);
    const {
        address,
        avgStarRating,
        city,
        country,
        description,
        Owner,
        id,
        lat,
        lng,
        name,
        numReviews,
        ownerId,
        price,
        state } = spot;

    useEffect(() => {
        dispatch(getSpotById(spotId)).then(() => setIsLoaded(true));

    }, [dispatch]);

    const reserveButtonPress = (e) => {
        alert("Feature coming soon...")
    }

    return (isLoaded && <div className='spot-page'>

        <h1>{name}</h1>
        <p>{city}, {state}, {country}</p>
        <div className='spot-show-images'>
            {spot.SpotImages.map(image => {
                const imageClassName = image.preview ? "spot-show-image spot-show-preview" : "spot-show-image";
                return (<img className={imageClassName} key={image.url} src={image.url} alt={image.url} />)
            })}
        </div>
        <div className='spot-show-info'>
            <div className='spot-show-description'>
                <h3>Hosted by {Owner.firstName} {Owner.lastName} </h3>
                <p>{description}</p>
            </div>
        </div>
        <div className='spot-show-order'>
            <div className='spot-show-card-first-line'>
                <p><span className='spot-show-price'>${price}</span> per night</p>
                <div className='review-card'>
                    <ReviewStats
                        avgStarRating={avgStarRating}
                        numReviews={numReviews}
                    />
                </div>
            </div>
            <button onClick={reserveButtonPress}>Reserve</button>
        </div>
        <ReviewStats
            avgStarRating={avgStarRating}
            numReviews={numReviews}
        />
        <ReviewsIndex spot={spot} spotId={spotId} ownerId={ownerId} numReviews={numReviews} />
    </div>
    )
}

export default SpotPage;