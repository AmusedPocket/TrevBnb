import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { getSpotById } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import SpotPage from "../SpotPage";

const EditSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        dispatch(getSpotById(spotId)).then(()=>setIsLoaded(true))
    }, [dispatch]);

    return (
        <div className="spot-form-page">
            {isLoaded && <SpotPage spot={spot} formType="update"/>}
        </div>
    )
}

export default EditSpot;