#Vettr


####Your Followers Will Thank You

##Technologies Used:
1. Express
2. Node.js
3. Mongoose 
4. Javascript
5. Jquery
6. HTML/CSS
7. OAuth
8. Passport

## General Approach Taken:
With the idea for the Vettr Application coming from our very own davidmashe, we began to wireframe our UI and 
develop our user stories. As an application intended to save people from running their mouths on twitter or making 
regretable statements, Vettr had to have an easily navigable user expierience that displayed "flags" surrounding potential 
career-ruiners cleanly and explicitly. Vettr also had to include a button that would send the vetted tweet straight
to Twitter; a certain crowd-pleasure, but also an immense challenge to hook-up successfully on the back-end. Setting up the OAuth
to do this proved to be one of the biggest hurdles of the development. 

Once the brainstorming and wireframing phase of the development was complete, the group quickly set up a database and
routes for the application. Using Node.js as a server-side JS environment, Express as the server framwork, and Mongoose for 
Mongodb object mapping, the group strove to mirror the simplicity of the intended front-end in the development of the back-end.
With successful routes, a database, and server created, a controller was developed to take in the user's tweet and match it 
against an array filled with keywords that flag the tweet as inappropriate or downright idiotic to post. 

**Oauth/log-in paragraph - David/Brandon may be able to give more detail for this**

For the front-end, a much more familar challenge than Oauth, jquery was used to search in the database for "flagged" phrases and bring them to the user-facing portion of 
the application. A simple, clean CSS pallete was used with the HTML structure to enhance the aesthetics of the user experience. 




## Dependency Installation Instructions:
Please run "npm install" in the command line. Then, start your app locally using the Heroku local command.

##Link to User Stories:
https://github.com/davidhickey/vettr_app/issues

##Link to Wireframes:
https://github.com/davidhickey/vettr_app/issues/40

##Unsolved Problems and Major Hurdles:

1. Using handlebars to connect front-end to backend. We ended up using Jquery which worked great.
2. **Oauth?**

