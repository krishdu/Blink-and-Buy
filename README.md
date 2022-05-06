## BLINK & BUY -  A JS full-stack E-commerce MERN application 
> Developed this project to get a full-fledged knowledge about JS full-stack application.  


+ ### Learnings:
    + handle `unhandledRejection`, `uncaughtException` in server
    + error handling using middleware and handle aync task exception by creating async wrapper.
    + how to use third-party packages (e.g materialui)
    + how to use local-storage in combination with redux-reducer
    + use of `switch` in react-router-dom (resolve the conflict of two same path)
        + i.e. /order/confirm vs /order/:id

| [Live Application (👆)](https://krish-ecommerce-blink-buy.herokuapp.com/) |
| ----- |

```sh
```
<p align="center">
<img alt="GIF" src="https://github.com/krishdu/Blink-and-Buy/blob/master/e-com-blink-buy-v1.gif?raw=true" width="800" height="400"/>
</p>

 ### Testing payment Gateway
+ Card number -  such as 4242 4242 4242 4242. Ente the card numbr in the payment form.
+ Expiry Date - Use a valid future date, such as 12/34.
+ CVV - Any 3 digit number
> ##### OR 
[Payment Gateway Documentation (👆)](https://stripe.com/docs/testing)


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
        + added category and ratings filter
        + added a submit review Dialog in ProductDetails Component (using `Dialog from material-ui`)
    + `User`
        + Create a component for Login and Register user
        + build redux store for user and define login action
        + created  register action with profile picture upload feature (using `cloudinary` in backend);
        + add SpeedDial component from `@material-ui/lab` for showing dashboard, logout btn, profile btn etc.
        + added update profile component
        + added update password Component.
        + added a component for sending reset password link using email id
        + added a component so that user can reset their password using the sent reset link
    + `Cart`
        + Created a cart and cartItemCard component with Cart Reducer
        + Created reducer action for remove item from cart
        + added the total price and break price logic for each product
        + added a Shipping Details Component
            + used `country-state-city` package to populate state with respect to coutries 
            + save shipping address in local storage (reducer action)
            + if user loggedIn go for confirmOrder otherwise redirect to login page
        + added a step visulizer `(Stepper)` from `materialUI`
        + added Confirm Order component where user can see their whole summary about order.
            + stored the entire order details in session storage.
        + added a Payment Component
            + added a backend route for process payment (using `Stripe` payment gateway- test mode), which will return a client secret key on the paticular payment intent.
                + then from Payment Component we can make the payment (using the generated client secret key).
                + On succesful payment go to OrderSucess Component.
        + Added myOrders component using `material-ui data-grid`(to show all orders as a table) package.
        + Added orderDetails Component to view a paticular order.
    + `Admin Dashboard`
        + Added a Dashboard component
            + seperated the page from vertically (left: control menu, right: respective content)
            + added a sidebar component to hold all menu (used `TreeView` `TreeItem` from `@material-ui/lab`).
            + added chart (doughnut, line) from `chartjs` and `react-chartjs-2`
            + added product list view for admin.
            + added product create component.
            + added delete functionality.
            + added product update component.
            + added order list component (including create and delete).
            + added process order component (e.g. shipping to delivered)
            + added user list component [including edit(like update role) and delete]
            + added review list component [delete functionality]
            

            
        
            
        