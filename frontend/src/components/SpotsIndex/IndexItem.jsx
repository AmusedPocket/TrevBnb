import { useNavigate } from "react-router-dom";


const IndexItem = ({spot}) => {
    const navigate = useNavigate();

    const clickOnSpot = () => {
        const url = `/spots/${spot.id}`;
        navigate(url)
    }

    return(<>
        <div onClick={clickOnSpot} className="spot-tile">
            <img className='spot-tile-image' src={`${spot.previewImage}`} alt={`${spot.previewImage}`}/>
            <span className='spot-tile-name'>{spot.name}</span>
            <div className='spot-tile-info'>
                <div className='spot-tile-info-first-line'>
                    <p>{spot.city}, {spot.state}</p>
                    <p><span><i className="fa-solid fa-star"></i></span>{spot.avgRating ? spot.avgRating.toFixed(1) : "New"}</p>
                </div>
                <p><span className='spot-tile-price'>${spot.price}</span> per night</p>
            </div>

        </div>
    </>)
}

export default IndexItem;