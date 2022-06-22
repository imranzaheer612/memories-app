import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import './style.scss'

import {
  Typography,
  Paper,
  Grid,
  CssBaseline,
} from '@material-ui/core';


export default function NewStory({handleBack}) {

    const defaultValues = {
      title: "none",
      note: "none",
      imageFiles: [], 
      date : ''
    };

   

    const [formValues, setFormValues] = useState(defaultValues);


    /**
     * date of uploading image
    */
    const current = new Date();
    const currentDate = `${current. getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;



    const handleSubmit = (event) => {
        event.preventDefault();
        
        let values = formValues;
        values['date'] = currentDate;
        setFormValues(values)
    
        console.log(formValues);
    };

    /**
     * if event is file then value = filesList
     * else value = target.value
    */
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        value = (e.target.files ? e.target.files : e.target.value)

        let values = formValues;
        values[name] = value;
        setFormValues(values);
        // console.log(formValues);
      };


  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>

      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        📷 Save your Memories
      </Typography>
      <Typography paragraph>
        Add your story here.
      </Typography>

      
        <form onSubmit={handleSubmit}>

            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={4}>
                
                <Grid item xs={12}>
                  <TextField required fullWidth name="title" multiline label="Story Title" variant='outlined' onChange={handleInputChange}/>
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth name="note" multiline minRows={4} label="Note" variant='outlined' onChange={handleInputChange} />
                </Grid>

                <Grid item xs={12}>
                  <label htmlFor="contained-button-file">
                    <input required name='imageFiles' accept="image/*" id="contained-button-file" multiple type="file" onChange={handleInputChange} />
                    <br/>
                    {/* <Button variant="contained" component="span"  onChange={handleInputChange}> */}
                      {/* Upload
                    </Button> */}
                  </label>
                </Grid>
                
                <Grid item style={{ marginTop: 16 }}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
                
                <Grid item style={{ marginTop: 16 }}>
                  <Button variant="outlined" color="secondary" type="button" onClick={handleBack}>
                    Back
                  </Button>
                </Grid>

              </Grid>
            </Paper>

        </form>
    </div>
  );
}