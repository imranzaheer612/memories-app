# Memobooks

Building a MERN app that helps you save your memories (stories).

You can **take a look** at the [https://memobooks.herokuapp.com/](https://memobooks.herokuapp.com/)

## Description

Tools used build the project are listed here.

- Material UI & SCSS.
- Backend (Node, Express, MongoDB, Firebase, Multer).
- Heroku for Deployment
- Firebase is used as middleware for uploading images.
- Viewport image rendering applied.

## Overview

Home UI showing all uploaded stories. The main home page route will be available for all the users. We can take a look at all the stories people uploaded.

![home-ui](./images/home-ui.jpg)

Take a look at the whole app working. The UI shown in the GIF has been updated a lot.

![home](./images/memories-ui.gif)

Once a user is logged in or Signed up he or she can now upload their stories and memories to our app. Just add some title and a note and select the images you wanna upload and done 🚀.

![mui form](./images/add-story.jpg)

### Adding story

Clicking on a story card in the home screen will take you to this page. You can slide between the images. react-slideshow-image library is used here to make a slide show you can take a look at the client package.json file.

![slide show](./images/story-view.jpg)

![slide show](./images/story-view2.jpg)

### Authentication

A user must have to sign up or log in to upload stories. Users will use/signup or /login routes to do so.

![auth](./images/login.jpg)

![auth](./images/signup.jpg)

JWT authentication is used and the JWT-Token is saved in the HTTP-Only cookie. Users can now be logged in automatically when next time accessing the protected routes.

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details
