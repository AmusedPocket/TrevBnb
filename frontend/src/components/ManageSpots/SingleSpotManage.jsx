import { useNavigate } from "react-router";
import IndexItem from "../SpotsIndex/IndexItem";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import DeleteSpot from "./deletespot";



const SingleSpotManage = ({spot}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateButton = () => {
        navigate(`/spots/${spot.id}/edit`)
    }

    return(
        <div className="single-spot-manage">
            <IndexItem spot={spot} />
            <div className="manage-spot-buttons">
                <button className="update-button" onClick={updateButton}>Update Spot</button>
                <OpenModalButton buttonText="Delete" modalComponent={<DeleteSpot spot={spot}/>}/>
            </div>
        </div>
    )
}

export default SingleSpotManage;