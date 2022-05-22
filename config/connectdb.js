const mongoose= require("mongoose");

const connectDb=async(DATABASE_URL)=>{
    try {
        const DB_OPTIONS={
            dbName:"nepaltriptest"
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log("Database Connected Successfully....");
    } catch (error) { 
        console.log(error);
    }
}
 
module.exports=connectDb