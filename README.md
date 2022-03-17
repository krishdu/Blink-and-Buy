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
+ created an Authetication middleware, which will verify the user from JWT and addd the user to request pipeline
+ created an Authorization middleware to protect API endpoints based on user role (e.g. normal user, admin)

```
Phase - 4: Reset password functionality (send reset password mail)
```
+ created a moongoose Schema method on userModel, which will store a resetPasswordToken  in Schema and save the state in DB along with expiry time by using sha-256 cryptography.
+ created an API endpoint to send the reset token
    + which will call the Schema method to get reset token
    + then it will call sendMail function (created using `nodemailer` npm package)
    + if there is any error it will clear the resetPasswordToken from schema and save the state in DB
+ created API endpoint to reset password from reset token link
 + hash the token with same Algorithm
 + compare token with db stored reset token and expiry time greater than present time
    + reset the password

```
Phase - 5: Update Password and Some extra endpoint for Admin
```
+ update password will perform if the user is logged in and given old password matched with db saved password
    + then only password will update

+ created endpoints like `all user`, `update user role`, `delete user`

```
Phase - 6: Order Schema and CRUD operations
```
+ Created an Order Schema model
+ created route like placeOrder, getAllOrder, UpdateProductOrderStatus, deleteOrderByAdmin, getMyOrders etc.

```
Phase - 7: UI
```
+ packages `npm i axios react-alert react-alert-template-basic react-helmet react-redux redux redux-thunk redux-devtools-extension react-router-dom overlay-navbar react-icons@3`
+ build header and footer component, then completed featured product component using Dummy data

```
Phase 8: Redux store | product components
```
+ create a store to combine all reducers
    + `Product`
        + created a reducer and define it's action ( e.g. get all product)
        + created product details reducer and define route for it
            + Create a product details page component (added Carousel using `react-material-ui-carousel`)
                + Added review card component for product reviews
        + create a Product Search component
        + added pagination using `react-js-pagination` package
        + added price filter using `@material-ui/core/Slider`