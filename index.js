import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRouters from "./routes/post.js";

const app = express();


app.use(bodyParser.json({ limt:"30mb", extended : "true"}));
app.use(bodyParser.urlencoded({ limit: "30mb " , extended : "true"}));
app.use(cors());

    
app.use("/post" , postRouters)
dotenv.config();
const port = process.env.PORT || 8000

dotenv.config();
mongoose.connect(process.env.URL, { useNewUrlParser : true , useUnifiedTopology: true  } )
.then(() => {
    app.listen(port , () => { 
        console.log(`server is running ${port}`);
    })
}).catch((err)=> {
    console.log( "error-->" , err.message )
}); 

















// app.listen(port,()=>{
//     console.log(`server is ruuning ${port}`);
// })