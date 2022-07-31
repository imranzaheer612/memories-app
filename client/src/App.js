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
import Story from './containers/Story';

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
              
              <Route path="/story" element={<Story />}/>
              <Route path="/signup" element={<SignUp />}/>
            </Routes>
        </BrowserRouter>
      </>
    );
}

export default App;
