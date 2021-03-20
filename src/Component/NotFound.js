import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '100vh',  fontFamily: `'Poppins', sans-serif`}}>
            <h3 className="text-danger">Error 404 ! Page Not Found</h3>
            <h4>Go to <Link to="/"> Home</Link></h4>
        </div>
    );
};

export default NotFound;