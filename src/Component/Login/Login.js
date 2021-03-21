import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './authConfig'
import './Login.css'
import gitBtn from '../../image/git-btn.png'
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

    // Social Buttons
    const googleLoginHandler = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then(result => {
                console.log(result)
                const { displayName, email } = result.user;
                const loggedInUserData = {
                    isSignedIn: true,
                    name: displayName,
                    email: email
                }
                setIsLoggedIn(loggedInUserData)
                history.replace(from)
            }).catch(error => {
                console.log(error)
            });
    }
    const githubLoginHandler = () => {
        var provider = new firebase.auth.GithubAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(result => {
                console.log(result)
                const { displayName, email } = result.user;
                const loggedInUserData = {
                    isSignedIn: true,
                    name: displayName,
                    email: email
                }
                setIsLoggedIn(loggedInUserData)
                history.replace(from)
            }).catch(error => {
                console.log(error)
            });
    }//End Social buttons


    //custom sign in and out
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: ''

    })
    const updateUserInfo = name => {
        //update userInfo
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log("name updated successfully")
        }).catch(function (error) {
            console.log(error)
        });
    }
    const handleBothForm = (e) => {
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(userCredential => {
                    const newUsersInfo = { ...user }
                    newUsersInfo.error = '';
                    newUsersInfo.success = true;
                    setUser(newUsersInfo)
                    setIsLoggedIn(newUsersInfo);
                    history.replace(from);
                    console.log(userCredential)
                })
                .catch(error => {
                    console.log(error.code, error.message);
                });
        }
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(userCredential => {
                    const newUsersInfo = { ...user }
                    newUsersInfo.error = '';
                    newUsersInfo.success = true;
                    newUsersInfo.name = user.name;

                    updateUserInfo(user.name)
                    setUser(newUsersInfo)
                    setIsLoggedIn(newUsersInfo);

                    history.replace(from);
                    console.log(userCredential)
                })
                .catch(error => {
                    const errorMessage = error.message;
                    const newUsersInfo = { ...user }
                    newUsersInfo.error = errorMessage;
                    newUsersInfo.success = false;
                    setUser(newUsersInfo);

                });
        }

        e.preventDefault();
    }

    //form switcher
    const [newUser, setNewUser] = useState(false)
    const switchForm = () => {
        setNewUser(!newUser)
    }

    //Validator and push to user state
    const inputHandler = (event) => {
        // console.log(event.target.name, event.target.value)
        let validUser = true;
        if (event.target.name === "email") {
            validUser = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value);
        }
        if (event.target.name === "password") {
            const passLength = event.target.value.length > 6;
            const passType = /\d{1}/.test(event.target.value);
            validUser = passLength && passType;
        }
        if (validUser) {
            const addNewUser = { ...user }
            addNewUser[event.target.name] = event.target.value;
            setUser(addNewUser)
        }
    }


    return (
        <div className="container">
            <div className="custom-signInSignUp w-50 m-auto">
                <div className="custom-login">
                    <form onSubmit={handleBothForm} className="d-flex flex-column">
                        <h4 style={{ fontWeight: "bold" }}>{!newUser ? "Login" : "Create an account"}</h4>
                        {
                            newUser && <input onBlur={inputHandler} name="name" type="text" placeholder="Name" required />
                        }
                        <input name="email" onBlur={inputHandler} type="email" placeholder="Email" required />
                        <input name="password" onBlur={inputHandler} type="password" placeholder="Password" required />
                        <input type="submit" value={!newUser ? "Login" : "Create an account"} />
                    </form>
                    <p>{!newUser ? "Don't have an account?" : "Already have an account?"} <span className="switchForm" onClick={switchForm}>{!newUser ? "Create an account" : "Login"}</span></p>
                    {
                        !user.success && <p style={{color: "red"}}>Invalid Email and Password</p>
                    }
                    
                </div>
            </div>
            <div className="d-flex flex-column social-login-btn">
                <h6>Or</h6>
                <button className="social-btn" onClick={googleLoginHandler}><img src={glBtn} alt="" /> Continue with Google</button>
                <button className="social-btn" onClick={githubLoginHandler}><img src={gitBtn} alt="" /> Continue with Github</button>
            </div>
        </div>
    );
};

export default Login;