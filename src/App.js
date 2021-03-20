
import { Route, Router, Switch } from 'react-router';
import './App.css';
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';


function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
