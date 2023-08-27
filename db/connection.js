const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const db=process.env.DATABASE

const connect = async()=>{
    try {
        const connect = await mongoose.connect(db)
        if(connect){
            console.log('Database Connected');
        }
        else{
            console.log('not connected');
        }
    } catch (error) {
        console.log(error);
    }
}

connect()