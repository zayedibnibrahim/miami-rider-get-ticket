import React, { useState } from 'react';
import { useParams } from 'react-router'
import rideData from '../../rider-data'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './RideDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 23.786793,
    lng: 90.376404
};
const RideDetails = () => {

    const { rideKey } = useParams();
    const getRide = rideData.find(ride => ride.id == rideKey);

    const [showDetails, setShowDetails] = useState(false);
    const [fromTo, setFromTo] = useState({
        from: '',
        to: ''
    });
    const fromToInput = (e) => {
        
            const newFromTo = { ...fromTo }
            newFromTo[e.target.name] = e.target.value;
            setFromTo(newFromTo)
        
    }
    const handleDestination = (e) => {
        setShowDetails(!showDetails)
        e.preventDefault();
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="destination-search">

                        {
                            showDetails === false ? <form onSubmit={handleDestination}>
                                <label htmlFor="pickFrom">Pick Form</label>
                                <br />
                                <input onBlur={fromToInput} id="pickFrom" type="text" name="from" />
                                <br />
                                <label htmlFor="pickTo">Pick To</label>
                                <br />
                                <input onBlur={fromToInput} id="pickTo" type="text" name="to" />
                                <input type="submit" value="Search" />
                            </form> : <div className="got-ride-data">
                                <div style={{backgroundColor: 'tomato', color: '#fff', padding: '10px'}}>
                                    <h5>From: {fromTo.from}</h5>
                                    <h5>To: {fromTo.to}</h5>
                                </div>
                                <div>
                                    <table>
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <td><img src={getRide.image} alt="" /></td>
                                                <td><span>{getRide.vehicle}</span></td>
                                                <td className="d-flex"><FontAwesomeIcon icon={faUserFriends} /> <h6> 4</h6></td>
                                                <td><h6>$65</h6></td>
                                            </tr>
                                            <tr>
                                                <td><img src={getRide.image} alt="" /></td>
                                                <td><span>{getRide.vehicle}</span></td>
                                                <td className="d-flex"><FontAwesomeIcon icon={faUserFriends} /> <h6> 4</h6></td>
                                                <td><h6>$65</h6></td>
                                            </tr>
                                            <tr>
                                                <td><img src={getRide.image} alt="" /></td>
                                                <td><span>{getRide.vehicle}</span></td>
                                                <td className="d-flex"><FontAwesomeIcon icon={faUserFriends} /> <h6> 4</h6></td>
                                                <td><h6>$65</h6></td>
                                            </tr>
                                        </tbody>
                                        <tfoot></tfoot>
                                    </table>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="col-md-9 mt-4 p-2">
                    <LoadScript
                        googleMapsApiKey="AIzaSyCU3T_h7ouNRKlMF9y_UPgdk9MgCdHm4TA"
                    >
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                        >
                            <></>
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
        </div>
    );
};

export default RideDetails;