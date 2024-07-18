require("dotenv").config();
const app = require('./app');
const  {dbConnect}  = require('./db/connection');

//Types of requests -> GET, PUT, POST, DELETE 
// a dynamic route -> for ex- when we send a user id in the URL

//connections and listeners

dbConnect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server started and Connected to Database !!");
    });
}).catch((error) => {
    console.log(error);
});
