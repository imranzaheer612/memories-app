import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import getStories from "../../services/stories/getStories";
import { useNavigate } from "react-router-dom";
import "./style.scss";

export default function Home() {

  let navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [navClicked, setNavClicked] = useState(false)

  /**
   * event handlers
  */
   const handleNewStory = (e) => {
    setNavClicked(true);
     navigate('/home/newStory')
  }

  const handleSignUp = (e) => {
    setNavClicked(true);
    navigate('/signup')
  }

  /**
   * fetching stories data on component mount
   */
  useEffect(() => {
    getStories().then((data) => {
      setStories(data);
      console.log(data);
    });
  }, []);

  return (
    <>
      <Navbar isClicked={navClicked} handleNewStory={handleNewStory} handleSignUp={handleSignUp}></Navbar>
      <div className={`stories-row ${navClicked ? 'hide--home' : ''}`}>
        {
        stories.map((story) => (
          <Card
            key={story.id}
            images={story.images}
            date={story.date}
            title={story.title}
            text={story.note}
          />
          ))
        }
      </div>
    </>
  );
}
