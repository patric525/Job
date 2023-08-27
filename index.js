const express = require('express')
const app = express()

require('./db/connection')
app.use(express.json())
app.get('/' , (req,res)=>{
    res.send('Rest Api created using nodejs , express and mongodb ')
})

app.use(require('./routes/jobauth'))

app.listen('5000' , ()=>{
    console.log('Server started on port 5000');
})