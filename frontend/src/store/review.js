import { csrfFetch } from "./csrf";

const POPULATE = "reviews/POPULATE";

const populateReviews = (reviews) => {
    return {
        type: POPULATE,
        payload: reviews
    }
}

export const populateReviewsInAGivenSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(response.ok){
        const data = await response.json();
        dispatch(populateReviews(data.Reviews))
    }
    return response;
}

const initialState = {
    spot: {},
    user: {}
}

export default function reviewReducer(state = initialState, action){
    switch(action.type){
        case POPULATE: {
            const newState = {...state};
            const spot = {};
            action.payload.forEach(review => {
                spot[review.id] = review;
            })
            newState.spot = spot;
            return newState;
        }
        default:
            return state;
    }
}