import React from 'react';
import './Header.css'
import logo from '../../image/logo.png'
import { Link, useHistory } from 'react-router-dom';
const Header = () => {
    const history = useHistory();
    const menuLogin = () => {
        history.push('/login')
    }
    return (
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="logo-container col-md-4 d-flex justify-content-start">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="nav-bar col-md-8 d-flex justify-content-end">
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/">Destination</Link>
                            <Link to="/">Blog</Link>
                            <Link to="/">Contact</Link>

                            <button onClick={menuLogin} className="login-btn">Log In</button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Header;