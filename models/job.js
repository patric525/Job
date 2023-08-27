const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    avatar:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profile:{
        type:String,
        required:true
    },
    skills:[
        {
            skill:{
                type:String,
                required:true
            }
        }
    ],
    location:[
        {
            location:{
                type:String,
                required:true
            }
        }
    ],
    active:{
        type:Boolean,
        required:true,
        default:false
    },
})

const job = mongoose.model("job" , jobSchema)
module.exports=job