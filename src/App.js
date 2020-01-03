import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import Navbar from './components/NavBar/Navbar';
import Home from './components/homepage/Home'
import './App.css';
import './components/NavBar/navbar.css'
import './components/task/task.css'
import Register from './components/register/Register';




function App() {
  return (

    <Router>

      <Navbar title={"TASKIFY"} />


      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/home' component={Home} />
        <Route path='/register' component={Register} />

      </Switch>

    </Router>


  );

}

export default App;
