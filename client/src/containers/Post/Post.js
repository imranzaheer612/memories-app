import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import SlideShow from "../../components/SlideShow/SlideShow";
import "./story.scss";
import { getStory } from "../../services/stories.service";
import { useState } from "react";

function Post() {
  let defaultPost = {
    images: [
      "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg",
    ],
    title: "No Title Found!",
    note: "no text found!",
    date: "null",
  };

  let navigate = useNavigate();
  let { id } = useParams();

  const [post, setPost] = useState(defaultPost);

  /**
   * fetching stories data on component mount
   */
  useEffect(() => {
    getStory(id).then((res) => {
      setPost(res.data.data);
      console.log(res);
    });
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="story-container">
      <SlideShow images={post.images.slice(1)}></SlideShow>

      <div className="flex-item text-content">
        <div className="story-container--content">
          <Typography variant="h6" gutterBottom component="div">
            {post.title}
          </Typography>

          <Typography variant="caption" display="block" gutterBottom>
            <Box sx={{ fontStyle: "oblique", m: 1 }}>{`Date ${post.date}`}</Box>
          </Typography>

          <Typography variant="body1" gutterBottom>
            {post.note}
          </Typography>

          <Button
            style={{ marginTop: 10 }}
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={goBack}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Post;
