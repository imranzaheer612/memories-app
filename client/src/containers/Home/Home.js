import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { getAllStories } from "../../services/story";
import { useNavigate } from "react-router-dom";
import "./home.scss";

export default function Home() {
  let navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [navClicked, setNavClicked] = useState(false);
  const [user, setUser] = useState("");

  /**
   * event handlers
   */
  const handleNewStory = (e) => {
    setNavClicked(true);
    navigate("/home/newStory");
  };

  const handleLogin = (e) => {
    setNavClicked(true);
    navigate("/login");
  };

  /**
   * fetching stories data on component mount
   */
  useEffect(() => {
    const userItem = JSON.parse(localStorage.getItem("user"));
    if (userItem) {
      setUser(userItem);
    }

    getAllStories().then((res) => {
      setStories(res.data.stories);
      console.log(res);
    });
  }, []);

  return (
    <>
      <Navbar
        isClicked={navClicked}
        handleNewStory={handleNewStory}
        handleLogin={handleLogin}
        user={user}
      ></Navbar>
      <div className={`stories-row ${navClicked ? "hide--home" : ""}`}>
        {stories.map((story) => (
          <Card
            key={story._id}
            id={story._id}
            images={story.images}
            date={story.date}
            title={story.title}
            text={story.note}
          />
        ))}
      </div>
    </>
  );
}
