import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './authConfig'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const Login = () => {
    return (
        <div>
            <h3>This us login</h3>
        </div>
    );
};

export default Login;