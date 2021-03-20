import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import Login from "./Component/Login/Login";
import NotFound from "./Component/NotFound";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import RideDetails from "./Component/RideDetails/RideDetails";

export const userContext = createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState({});
  return (
    <userContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <PrivateRoute path="/ride/:rideKey">
          <RideDetails></RideDetails>
        </PrivateRoute>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="*">
          <NotFound></NotFound>
        </Route>
      </Switch>
    </Router>
    </userContext.Provider>
  );
}

export default App;
