import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom"
import React from 'react'
import SlideShow from '../../components/SlideShow/SlideShow'
import "./story.scss"

function Story() {
  let title = 'No Title Found!'; 
  let text = 'no text found!';
  let date = "null";
  let images = ['https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'];
  
  let navigate = useNavigate();
  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className='story-container'>

      <SlideShow images={images}></SlideShow>
      
      <div className='flex-item text-content'>
        <div className='story-container--content'>
          <Typography variant="h6" gutterBottom component="div">
            {title}
          </Typography>

          <Typography variant="caption" display="block" gutterBottom>
          <Box sx={{ fontStyle: 'oblique', m: 1 }}>{`Date ${date}`}</Box>
          </Typography>

          <Typography variant="body1" gutterBottom>
            {text}
          </Typography>
      
        <Button 
          style={{marginTop: 10}}
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
  )
}

export default Story