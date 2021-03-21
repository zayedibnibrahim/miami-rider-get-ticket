import React, { useContext } from 'react';
import './Header.css'
import logo from '../../image/logo.png'
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
const Header = () => {
    const history = useHistory();
    const menuLogin = () => {
        history.push('/login')
    }
    const [isLoggedIn, setIsLoggedIn] = useContext(userContext);

    const { name, email } = isLoggedIn;
    const logoutHandler = () => {
        setIsLoggedIn({});
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

                            {
                                name || email ? <p><FontAwesomeIcon icon={faUser} /> {name} <span onClick={logoutHandler} className="logout-btn">| Logout</span></p> : <button onClick={menuLogin} className="login-btn">Log In</button>
                            }
                        </nav>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Header;