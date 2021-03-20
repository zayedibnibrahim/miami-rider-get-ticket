import React from 'react';
import { Link } from 'react-router-dom';
import './Rides.css'
const Rides = (props) => {
    const { id, vehicle, image } = props.rideData;
    return (
        <Link to={"/ride/" + id}>
            <div className="ride-box">
                <img src={image} alt="" />
                <h4>{vehicle}</h4>
            </div>
        </Link>

    );
};

export default Rides;