#for the FrontEnd setup
1. Overview => This document explains how to set up and run the frontend of the Project Management System.
The frontend is built using React, TypeScript, Redux, and Tailwind CSS, and it communicates with the backend API for authentication, project, and task management.

2. Tech used
  a. React + Vite
  b. TypeScript
  c. Redux Toolkit
  d. Axios
  e. Tailwind CSS
  f. React Router DOM

3. Make sure you have the following installed on your system
  a. Node.js (user 20 above version)
  b. npm 

4. installation setup
 a. make sure you are on root project which you clone.
 b. cd frontend

5. install Dependencies (npm install)
6. Setup Environment Variables 
  1.Create a .env file in the root directory and add the following: VITE_API_URL=http://localhost:3000
7. after adding the env file run the app using command : npm run dev


#for Backend set
 
1. This document explains how to set up and run the backend API for the Project Management System.
The backend is built using NestJS, MongoDb .
It provides APIs for authentication, user management, projects, and tasks.

2. Tech stack
 a. NestJS – Node.js framework
 b. MongoDB or Mongoose – ORM for database operations
 c. JWT Authentication
 d. dotenv for environment configuration

3. make sure you have node and npm in your system
 a.Node.js
 b. npm
 c. mongodb compass or you have mongodb database url
 d. nest cli
    - npm install -g @nestjs/cli

4. installation setup
 a. make sure you are on root project which you clone.
 b. cd backend

 5. Install Dependencies - (npm install)
 6. Setup Environment Variables - 
   a. Create a .env file in the root directory and add:
     MongoDB_URL = "mongoDBurl"
   b. in the place of mongoDBurl paste your mongodb database url.
   c. if you dont have mongoDb you can install mongoDb compass on your local system
   d. then add thier database connection string in the place of "mongoDBurl".
7. run the application used command => nest start --watch

# for Seed script
1. to run the script run command => npm run seed.




