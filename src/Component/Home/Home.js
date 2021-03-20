import React, { useEffect, useState } from 'react';
import Rides from '../Rides/Rides';
import './Home.css'
import riderData from '../../rider-data'
const Home = () => {
    const [rides, setRides] = useState([]);
    useEffect(() => {
        setRides(riderData)
    }, [])
    return (
        <div className="container-fluid home-main d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="riders d-flex justify-content-between align-items-center">
                    {
                        rides.map(ride => <Rides key={ride.id} rideData={ride}></Rides>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;