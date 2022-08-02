import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Typography, Paper, Grid, CssBaseline, TextField } from "@mui/material";
import "./newStory.scss";

import { postStory } from "../../services/story";
import configData from "../../config.json";



export default function NewStory() {
  
  let navigate = useNavigate()

  const goBack = (e) => {
    navigate(-1);
  }

  const defaultValues = {
    title: "none",
    note: "none",
    imageFiles: [],
    date: "",
  };

  const uploadingStates = {
    success : "success",
    error : "error",
    none : "none",
    uploading : "uploading"
  }

  const [formValues, setFormValues] = useState(defaultValues);
  const [uploading, setUploading] = useState(uploadingStates.none);
  const [imgNames, setImgNames] = useState([]);


  /**
   * Handlers
  */
  const handleSubmit = (event) => {
    event.preventDefault();

    formValues['date'] = currentDate();
    setFormValues(formValues);

    setUploading(uploadingStates.uploading)
    postData(event); 
  };

    /**
   * if event is file then value = filesList
   * else value = target.value
   */
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    value = e.target.value;

    if (e.target.files) {
      let files = e.target.files;
      let file_names = [];
      for (let i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
      }
      setImgNames(file_names);
      value = files;
    }

    formValues[name] = value;
    setFormValues(formValues);
  };

  /**
   * Post data to api
   * */
  const postData = async (event) => {
    try 
    {
      console.log(formValues);
      const res = await postStory(formValues)
      
      console.log(res.statusText);
      console.log('Posted: ', res.data);
      console.log('Posted: ', res);

      setUploading(uploadingStates.success)
      event.target.reset();
      setFormValues(defaultValues);
      setImgNames([]);
      
    }
    catch (error) 
    {
      setUploading(uploadingStates.error)
      console.log('An error occurred while posting: ' + error);
    }
  }

  /**
   * Story uploading date
   */
     const currentDate = () => {
      let current = new Date();
      return`${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    }


  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        {configData.form_pg_title}
      </Typography>
      <Typography paragraph>{configData.form_pg_desc}.</Typography>

      <form onSubmit={handleSubmit} style={{ padding: 16, margin: 20 }}>
        <Paper style={{ padding: 16 }}>
          <Grid container alignItems="flex-start" spacing={4}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="title"
                multiline
                label="Story Title"
                variant="outlined"
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
                variant="outlined"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span"  onChange={handleInputChange}>
                <input
                  required
                  name="imageFiles"
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  hidden
                  onChange={handleInputChange}
                />Select images
                </Button>
              </label>
              <br/>
              <span>
                <ol>
                {imgNames.map((name, index) => 
                  <li key={index}>{name}</li>
                )}
                </ol>
              </span>
              {/* <img src={URL.createObjectURL(formValues.imageFiles[0])} alt='img-preview'></img> */}
            </Grid>
            
            { 
            uploading !== uploadingStates.none &&
            <Grid item xs={12}>
              {uploading === uploadingStates.error &&
              <Alert severity="error">Some error occurred. Try Later.</Alert>}
              
              {uploading === uploadingStates.uploading && 
              <Alert severity="info">Uploading data. Please wait!</Alert>}
              
              {uploading === uploadingStates.success && 
              <Alert severity="success">Posted Successfully!</Alert>}
            </Grid>
            }

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
                onClick={goBack}
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
