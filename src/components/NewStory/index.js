import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@mui/material/Button';

import './style.scss'

import {
  Typography,
  Paper,
  Grid,
  CssBaseline,
} from '@material-ui/core';



const defaultValues = {
    title: "none",
    note: "none",
    imageFiles: []
  };


export default function NewStory({handleBack}) {

    const [formValues, setFormValues] = useState(defaultValues);


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
    };

    /**
     * if event is file then value = filesList
     * else value = target.value
    */
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        e.target.files ? value = e.target.files : value = e.target.value

        setFormValues({
          ...formValues,
          [name]: value,
        });

        console.log(formValues);
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

      
        <form onSubmit={handleSubmit} noValidate>

            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="title"
                    multiline
                    label="Title"
                    variant='outlined'
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="note"
                    multiline
                    minRows={4}
                    label="Note"
                    variant='outlined'
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                    <input
                    accept="image/*"
                    // style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    name="imageFiles"
                    onChange={handleInputChange}
                    />          
                </Grid>
                
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    type="button"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Paper>

        </form>
    </div>
  );
}