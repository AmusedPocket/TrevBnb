import { csrfFetch } from "./csrf";

// Action constants

const POPULATE = "spots/POPULATE";
const SINGLESPOT = "spots/SINGLESPOT"

//Action Creators

// Populate with spots
const populate = spots => ({
    type: POPULATE,
    payload: spots
});

//Set spot by id
const setSpotById = (spot) => {
    return {
        type: SINGLESPOT,
        payload: spot
    }
}

//Thunk
export const populateSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`);

    if(response.ok){
        const allSpots = await response.json();
        dispatch(populate(allSpots.Spots))
    }

    return response;
}
//Get a spot by ID
export const getSpotById = (spotId) => async (dispatch) => {
    const url = `/api/spots/${spotId}`;
    const response = await csrfFetch(url);
    if(response.ok){
        const data = await response.json();
        dispatch(setSpotById(data))
    }
    return response;
}

//Reducer
const initialState = {
    allSpots: {},
    singleSpot: {},
}

export default function spotReducer(state = initialState, action){
    switch(action.type){
        case POPULATE:{
            const newState = {...state};
            const allSpots = {};
            action.payload.forEach(spot => {
                allSpots[spot.id] = {...spot}
            })
            newState.allSpots = allSpots;
            return newState;
        }
        case SINGLESPOT:{
            const newState = {...state};
            const singleSpot = {...action.payload};
            newState.singleSpot = singleSpot;
            return newState;
        }
        default:{
            return state
        }
    }
}