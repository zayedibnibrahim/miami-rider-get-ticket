import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './authConfig'
import './Login.css'
import fbLogo from '../../image/fb-btn.png'
import glBtn from '../../image/google-btn.png'
import { useHistory, useLocation } from 'react-router';
import { userContext } from '../../App';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const facebookLoginHandler = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(result => {
                console.log(result)
                const { displayName, email } = result;
                const loggedInUserData = {
                    isSignedIn: true,
                    name: displayName,
                    email: email
                }
                setIsLoggedIn(loggedInUserData)
                history.replace(from)
            })
            .catch(error => {
                console.log(error)
            });
    }
    const googleLoginHandler = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then(result => {
                console.log(result)
                const { displayName, email, photoURL } = result.user;
                const loggedInUserData = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setIsLoggedIn(loggedInUserData)
                history.replace(from)
            }).catch(error => {
                console.log(error)
            });
    }
    return (
        <div className="container">
            
            <div className="d-flex flex-column social-login-btn">
                <h6>Or</h6>
                <button className="social-btn" onClick={facebookLoginHandler}><img src={fbLogo} alt="" /> Continue with Facebook</button>
                <button className="social-btn" onClick={googleLoginHandler}><img src={glBtn} alt="" /> Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;