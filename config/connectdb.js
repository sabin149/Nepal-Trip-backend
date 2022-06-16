const mongoose= require("mongoose");

const connectDb=(URI)=>{

        mongoose.connect(URI, {
            useNewUrlParser: true,  
            useUnifiedTopology: true 
        }, err => { 
            if(err) throw err;
            console.log('Connected to mongodb...')
        })
}
 
module.exports=connectDb 