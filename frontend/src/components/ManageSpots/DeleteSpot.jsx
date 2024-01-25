import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getCurrentUserSpots } from "../../store/spots";
import { deleteSpotById } from "../../store/spots";

const DeleteSpot = ({spot}) => {
    const {closeModal} = useModal();
    const dispatch = useDispatch();

    const yesButtonClicked = async () => {
        const response = await dispatch(deleteSpotById(spot.id));
        if(response.ok){
            await dispatch(getCurrentUserSpots());
            closeModal();
        }
    }

    const noButtonClicked = () => {
        closeModal();
    }

    return(<div className="delete-modal">
        <h2>Confirm Delete</h2>
        <p>Please confirm if you want to delete this spot.</p>
    </div>)
}

export default DeleteSpot;