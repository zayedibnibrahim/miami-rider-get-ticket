import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './authConfig'
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
            <button onClick={facebookLoginHandler}>Facebook</button>
            <button onClick={googleLoginHandler}>Google</button>
        </div>
    );
};

export default Login;