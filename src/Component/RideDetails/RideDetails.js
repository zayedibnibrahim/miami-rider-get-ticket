import React, { useState } from 'react';
import { useParams } from 'react-router'
import rideData from '../../rider-data'
import map from '../../image/map.png'
import './RideDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'

const RideDetails = () => {

    const { rideKey } = useParams();

    const getRide = rideData.find(ride => ride.id == rideKey);

    const [showDetails, setShowDetails] = useState(false);
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
                                <input id="pickFrom" type="text" />
                                <br />
                                <label htmlFor="pickTo">Pick To</label>
                                <br />
                                <input id="pickTo" type="text" />
                                <input type="submit" value="Search" />
                            </form> : <div className="got-ride-data">
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
                        }
                    </div>
                </div>
                <div className="col-md-9">
                    <img src={map} alt="" className="w-75" />
                </div>
            </div>
        </div>
    );
};

export default RideDetails;