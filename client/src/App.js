import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from './containers/Home';
import SignUp from './containers/SignUp';
import NewStory from './containers/NewStory';
import Post from './containers/Post';
import Login from './containers/Login';

import './App.css';


function App() {
    return(
      <>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />}>
                <Route path="newStory" element={ <NewStory/> }/>
              </Route>
              
              <Route path="/story/:id" element={<Post />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<SignUp />}/>
            </Routes>
        </BrowserRouter>
      </>
    );
}

export default App;
