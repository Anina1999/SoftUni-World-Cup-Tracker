# World Cup Tracker

## Initial Setup
 - [x] Create repository
 - [x] Initialize Project
 - [x] Config start and dev script
 - [x] Add Express Server and Express Handlebars  `npm i express express-handlebars`
 - [x] Add .gitignore
 - [x] Add resources
 - [x] Setup express handlebars
 - [x] Add Layout
 - [x] Render Home Page
 - [x] Setup Static files

## Architecture and dynamic rendering
 - [x] Add Home Controller
 - [x] Add routes
 - [x] Add Auth Controller

 - [x] Add Match Controller
 - [x] Add Match Page
 - [x] Add Match Service

 - [x] Add Dashboard Page
 - [x] Add Details Page

## Authentication and Authorization
### Register 
 - [x] Add register page
 - [x] Add Body Parser Middleware
 - [x] Add validation to register using Zod `npm i zod`
 - [x] Add Error Handling and show error to user
 - [x] Hash password with zod transform and bcrypt `npm i bcrypt`
 - [x] Setup prisma orm database https://www.prisma.io/docs/prisma-orm/quickstart/prisma-postgres
 - [x] Change node with tsx
 - [x] Add user model
 - [x] Fix prisma client path
 - [x] Add Auth service
 - [x] Register user in database
 - [x] Install JWT `npm i jsonwebtoken`
 - [x] Install Cookie Parser `npm i cookie-parser`
 - [x] Redirect to home page after successful registration      

### Login
- [x] Add Login Page
- [x] Add Login function in Auth Service
- [x] Add Login Post action

### Logout
- [x] Add Logout Function in Auth Service

### Middlewares
- [x] Add Auth Middleware
- [x] Add isAuth Middleware
- [x] Add isAuth, isGuest guard to routes
- [x] Use auth middleware in index.js

## Create Match
- [x] Add isAuth to Match Page
- [x] Validate Match Data

## Show Dashboard Page
- [x] Render Dynamic Matches

## Show Details Page
- [x] Render Dynamic Details Page