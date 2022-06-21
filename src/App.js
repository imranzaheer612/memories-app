import React from 'react';
import './App.css';
import Slideshow from './components/Card/SlideShow';
import Navbar from './components/Navbar';
import Stories from './containers/Home';

function App() {
    return(
      <>
        {/* <Navbar/> */}
        <Stories/>
        {/* <Slideshow/> */}
      </>
    );
}

export default App;
