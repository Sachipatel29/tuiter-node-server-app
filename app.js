import express from 'express';
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js" 
import TuitsController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import cors from 'cors'
const app = express();
import mongoose from "mongoose";


const CONNECTION_STRING = "mongodb+srv://sachipatel9629:Jayambema22@cluster0.ylwoukd.mongodb.net/tuiter?retryWrites=true&w=majority";
mongoose.connect(MONGODB_CONNECTION_STRING);

//mongoose.connect("mongodb://127.0.0.1:27017/tuiter");


app.use((req, res, next) => {

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use(
  session({
    secret: "any string",
    resave: false,
    proxy:true,
    saveUninitialized: false,
    cookie: {
      sameSite : "none",
      secure : true
    }
  })
 );

app.set("trust proxy", 1);
app.use
cors({
    credentials: true,
    origin: "https://beamish-kelpie-afb7cb.netlify.app/",
    //origin: "http://localhost:3000",
  })

app.use(express.json());

const port = process.env.PORT || 4000;
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);

app.listen(port);

