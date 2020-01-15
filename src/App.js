import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import Navbar from './components/NavBar/Navbar';
import './App.css';
import './components/NavBar/navbar.css'
import './components/task/task.css'
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen';
import { Link } from 'react-router-dom';




function App() {

  const logOut = () => {
    localStorage.removeItem('UserID')
    localStorage.removeItem('UserName')
    console.log('navLogout');

  }

  return (

    <Router>

      <Navbar title={"TASKIFY"} logOut={logOut} />


      <Switch>
        <Route exact path='/' component={LoginScreen} />
        <Route path='/home' component={MainScreen} />
        <Route path='/register' component={RegisterScreen} />

      </Switch>

    </Router>


  );

}

export default App;
