import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import getStories from "../../services/stories/getStories";

import "./style.scss";

export default function Stories() {
  const [stories, setStories] = useState([]);

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
      <Navbar></Navbar>
      <div className="stories-row">
        {stories.map((story) => (
          <Card
            key={story.id}
            images={story.images}
            date={story.date}
            title={story.title}
            text={story.note}
          />
        ))}
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}
