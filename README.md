# BLINK & BUY -  A JS full-stack E-commerce MERN application 
> Developed this project to get a full-fledged knowledge about JS full-stack application.  

```
(MVP)
```
+ User can create their profile with profile picture
+ User/Admin Login with Authentication
+ User: 
    + Can add product to cart and buy
    + Rate product
+ Admin:
    + add, update, delete any product
    + view sales

+ ### Learnings:
    + handle `unhandledRejection`, `uncaughtException` in server
    + error handling using middleware and handle aync task exception by creating async wrapper.


## ✨ Phases ✨

```
Phase - 1: Initials & Build route for Products
```
+ Setup Express server and handle servers errors
+ Setup MongoDB (handle connections, errors), created a schema for Product
+ create basic CRUD operation on Products Schema
+ built an ApiFeatures class to handle all kind of operation on APIs, e.g search, filter, pagination

```
Phase - 2: Create User Schema & Authentication (Email & Password)
```
+ create user using userSchema
+ while registering, hash the password by using schema event `pre` and use `bcryptjs` npm package for hashing. 
+ while login compare normal password with hased password by creating a schema method which will also use `bcryptjs` npm package.
+ upon successfully login/register return `JWTwebToken` by creating schema mothed which will use `jsonwebtoken` npm package.
+ save the token in cookie by defining some options( e.g cookie expiry time)

```
Phase - 3: Protect API endpoints 
```