import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainHeader from './components/MainHeader/MainHeader';
import './App.css';
import AddPlayer from './components/Users/AddPlayer';
import UsersList from './components/Users/UsersList';

 function App() {
    return (
      <div>
      <MainHeader />
      <main>
       
        <Route path='/welcome' >
        <AddPlayer />
        </Route>
        <Route path='/products'>
          <UsersList />
        </Route>
        
      </main>
    </div>
    );
  }

  export default App;




