require ("dotenv").config();
const express=require("express");
const cookieParser=require("cookie-parser");
const cors=require("cors")
const morgan=require("morgan");
const bodyParser=require("body-parser");
const connectDb=require("./config/connectdb")

const app=express();


app.use(express.urlencoded({extended:true})); 
app.use(bodyParser.json());
app.use(cors()); 
app.use(cookieParser())
app.use(morgan("dev"));

//Routes
app.use("/api",require("./routes/authRouter"))
app.use("/api",require("./routes/hotelRouter"))
app.use("/api",require("./routes/roomRouter"))
app.use("/api",require("./routes/userRouter"))

 
app.use("/api",require("./routes/reviewRouter"))
app.use("/api",require("./routes/bookingRouter"))


const DATABASE_URL=process.env.DATABASE_URL;
connectDb(DATABASE_URL);

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
}); 