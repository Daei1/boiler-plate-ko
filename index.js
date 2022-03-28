const express = require('express')
const app = express()
const port = 5000
const bodyParser = require("body-parser");
const {User} = require("./models/User");
const config = require('./config/key');


// aplication / x-www-form-urllencoded
app.use(bodyParser.urlencoded({extended:true}));
// aplication/json
app.use(bodyParser.json());


const mongoose = require('mongoose')

mongoose.connect(config.mongoURI,{
    
}).then(()=> console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하신가요 ')
})


app.post('/register', (req,res)=> {
 
  const user= new User(req.body);
  console.log(req.body);
  user.save((err,userInfo)=>{
    if(err) return res.json({sucess:false, err})
    return res.status(200).json({sucess:true})
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})