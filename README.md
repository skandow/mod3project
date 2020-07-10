# Welcome to Feelings Friday Everyday!

This SPA is designed to allow individuals to create a daily log and events to the log.
The user will be able to attach a particular feeling to that event to see the emotional
journey the user takes through a particular day.  Feelings Friday Everyday allows users
to also review analytics related to the number of events they've logged in that correspond
to one of six emotions:

# Basic Emotions: 
  1.  Joy
  2.  Sadness
  3.  Anger
  4.  Disgust
  5.  Fear
  6.  Surprise

The log-in screen allows users to log in with a username. If the username has not been 
created yet, this action will automatically create a new account for that user.

Users have access to their profile, which displays the following information:

# Profile Highlights:
  1.  User Name rendered in welcome greeting
  2.  An option to create a log for that particular day
        a. Users can create a log for a particular day only if they haven't already submitted one
        b. Users can add new events to their day and assign an emotion to the event
        c. Each of these events can be edited and deleted as long as the user hasn't saved the log
        d. Anayltics are rendered as these events are created, updated, or deleted
        e. Once a log is saved, it is added to the user's previous log library
  3.  The ability to review previous logs
  4.  Analytics that show how many events a user has submitted through their log history that correspond
      to each of the six basic emotions
  5.  A 'log-out' button

# Installation:
  1.  Clone this repo
  2.  In your terminal, go to the 'mod-3-project-back-end' directory and run 'bundle install'
  3.  Run 'rails db:create'
  4.  Run 'rails db:migrate'
  5.  Run 'rails db:seed'
  6.  Run 'rails s' to start the server
  7.  In your terminal, go to the 'mod-3-project-front-end' directory and run 'open index.html' 