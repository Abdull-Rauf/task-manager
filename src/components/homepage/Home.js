import React from 'react';
//import { Redirect } from 'react-router-dom';
import UserTasksLists from '../usertasklists/UserTasksLists'
import HomeScreen from '../../screens/homeScreen'
import '../../App.css'




function Home() {


  return (

    <div className='main'>
      <UserTasksLists />
      <HomeScreen />
    </div>

  );


}

export default Home;
