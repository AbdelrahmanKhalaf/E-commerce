import express, { Application } from "express";

import path from "path";
import mongoose from "mongoose";
import users from "./routers/user.router";
import login from "./routers/auth.router";
import prodacts from "./routers/prodacts.router";
import categories from "./routers/categories.routers";
import subcategories from "./routers/sub.catgeory.router";
import history from "./routers/history.router";
import inventaries from "./routers/inventary.router";
import orders from "./routers/order.routers";
import socketIo from "socket.io";
import bodyParser from "body-parser";
import http from "http";
import config from "./config/config";
import cros from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import morgan from 'morgan'
import colors from "colors"
import {errorHandler} from "./errors/error"
import chackoutSession from "./payment/checkout.router"
mongoose
  .connect(
    ``,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to mongoDB...");
  })
  .catch((err) => console.log(`Could not connect to mongoDB...${err.message}`));
const app: Application = express();
app.set('views', path.join(__dirname, 'views')) 
app.set("view engine","ejs")
const server = http.createServer(app);
const io: any = socketIo(server);
app.use(morgan('dev'))
.use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Access-Control-Allow-Headers, Authentication, X-Requested-With");
    next();
  })
  .use(cros())
  .use(cookieParser())
  .use(session({secret:config.secretSession,resave:false,saveUninitialized:false,}))
  .use(express.json())
  .use("/uploads", express.static("./uploads"))
  .use("/assets", express.static("./assets"))
  .use("/e-commerc/api/", users)
  .use("/e-commerc/api/auth/login", login)
  .use("/e-commerc/api/prodact", prodacts)
  .use("/e-commerc/api/categories", categories)
  .use("/e-commerc/api/subcategories", subcategories)
  .use("/e-commerc/api/orders", orders)
  .use("/e-commerc/api/history", history)
  .use("/e-commerc/api/inventaries", inventaries)
  .use("/e-commerc/api/checkout", chackoutSession)
  .use(errorHandler)
const PORT: any = config.port
server.listen(PORT, () => {  
  console.log(`listing now to PORT ${PORT}...`);
});
process.on('unhandelRejection',(err,promise)=>{
  console.log(`Error : ${err.message}`);
  //close server & exit process
  server.close(()=>process.exit(1))
  

})
/// becrypt.compare => to Comparison encrypt
