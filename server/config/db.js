const mongoose = require('mongoose');
const config = require('config'),
    db = config.get('mongoURI');

const connectDB = async ()=>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
        console.log(`mongo connected :)`);
        
    }catch(err){
        console.log(err.message);
        process.exit(1);
        
    }

}
module.exports = connectDB