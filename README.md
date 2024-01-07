# My Movies Websoftware project

Original website was built using React.js + Node.js, this is an updated version that uses .NET instead of Node.js and the API is hosted in Azure.
  
The URL for the website is -> [My Movies](https://azure-mymovies-react.netlify.app/movies)

# What is My Movies?
This software is a web application that uses a REST API that utilizes The Movie Databases API to present movies and informations about them.  
You can view some movies, their trailers and some information related to them.   

# What can I do with this application?
The main focus of this application is to select movies that you've seen and add them to your "watched list" which is called "My Movies" in the application.  
The application provides information about how many movies you've seen so far (at least according to how many you've added to your list) and how much time you've spent on them in total.  


# Technicalities
Backend:
    - .NET WEB APP
    - Hosted at Azure
    - Github: [Github API](https://github.com/tatukristiani/azure-mymovies-api)
Frontend:
    - React.js
    - Hosted at Netlify
Database:
    - Azure SQL Server

Azure DevOps was also used during the development and later on CI/CD pipelines will be added (for education).

# Some of the functionalities of the software

1. **Browse**
Here you can browse movies by genre.     
The application shows the movies posters/images and by clicking on them it will take you to a page where you can view some details about the movie and the trailer of the movie.     
Here you can also add the movie to your list IF you are logged in, since adding movies is only for possible when logged in.
Movies can be also added when browsing with the "Add to My Movies" button.

2. **My Movies**
Here you can view all the movies you've seen/added to your list.    
It will tell the spent hours and how many movies you've added to your list.  

3. **Search**
Here you can search movies by their title.     
If there are movies available with the title you've provided they'll show up on the screen and this page follows the same principle as in **Browse** -> click the movie etc.   

4. **Sign In**
Here you can Sign In or Register a new account.   
The page displays these options clearly, just follow the normal steps as you would on any other website that has a Sign In/Register. 

5. **Logout**
After you've logged in a "Logout" button will appear and by clicking it you will be logged out. 

6. **Forgot Password**
In case you forgot your password there is a button located at **Sign In**.    
First you'll need to provide your accounts email, then you'll receive an email containing a link that will take you to another page on the website where you can reset your password.
**NOTE! THIS EMAIL MIGHT BE LOCATED IN YOU SPAM SECTION**  

