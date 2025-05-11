const express=require("express");
const {connectmongo}=require("./connection");
const URL = require("./Models/url");
const path=require("path");
const cookieParser=require('cookie-parser');
const urlRoute = require("./Routes/routes");
const staticRouter=require("./Routes/staticRouter");
const userRoute=require("./Routes/user");
const {restrictToLoggedinUserOnly} =require('./Middleware/auth');
connectmongo("mongodb://127.0.0.1:27017/ShortenerId").then(()=>{
    console.log("MongoDb is connected");
});


const app=express();

app.set("view engine","ejs");
app.set("views",path.resolve("./View"));
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
const port=8001;

app.use("/user",userRoute);
app.use("/url", restrictToLoggedinUserOnly ,urlRoute);
app.use("/",staticRouter);

app.get("/:shortId",async(req, res)=>{
    const shortId = req.params.shortId;

   const entry= await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    return res.redirect(entry.redirectURL);
});

app.listen(port,()=>console.log(`Server started at port: ${port}`));