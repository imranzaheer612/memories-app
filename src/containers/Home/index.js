import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";

import "./style.scss";

export default function Stories() {
  const [stories, setStories] = useState([])

  const getStories = async () => {
    const response  = await fetch(`/api/story`);
    setStories(await response.json())
  }

  useEffect(() => {
    getStories()
  }, []);


  return (
    <>
      <Navbar></Navbar>
      <div className="stories-row">
      {
        stories.map((story) => (
          <Card
            key={story.id}
            images={story.images}
            date={story.date}
            title={story.title}
            text={story.text}
          />
        ))
      }
      </div>
    </>
  );
}
