const express = require('express')
const app = express()
const port = 5000
const bodyParser = require("body-parser");
const {User} = require("./models/User");
const config = require('./config/key');
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth');
// aplication / x-www-form-urllencoded
app.use(bodyParser.urlencoded({extended:true}));
// aplication/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')

mongoose.connect(config.mongoURI,{
    
}).then(()=> console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하신가요 ')
})


app.post('/api/users/register', (req,res)=> {
 
  const user= new User(req.body);
  console.log(user);
  user.save((err,userInfo)=>{
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    
    })
    
  })
  
})

app.post('/api/users/login', (req,res) => {

  //이메일 찾기 
  User.findOne({email:req.body.email}, (err,user)=>{

    //console.log('user',user)
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "이메일이 해당하는 유저가 없습니다."
      })
    }
  //이메일 ok 비밀번호 ok 체크  
user.comparePassword(req.body.password,(err,isMatch)=> {
  if(!isMatch)
  return res.json({
    loginSuccess : false, message: "비밀번호가 틀렸습니다. "  })

    user.generatedToken((err,user)=>{
      if(err) return res.status(400).send(err);

      // 토큰을 저장한다. 쿠키 application 로컬 스토리지 세션 
        res.cookie('x_auth',user.token)
        .status(200)
        .json({loginSuccess:true, userId: user._id})
      //

    })
  

})







  })



   

})

app.get('/api/users/auth',auth,(req,res) =>{

  //여기까지 미들웨어를 통과해 왔다는 애기는 Auth가 트루라는 말 
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false: true,
    isAuth:true,
    email: req.user.email,
    name: req.user.name,
    lastname : req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })

})

app.get('/api/users/logout',auth, (req,res)=>{
  User.findOneAndUpdate({_id: req.user._id},
    {token: ""},
    (err,user) => {
    if(err) return res.json({success:false,err});
    return res.status(200).json({
      success:true
    })  
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/api/hello', (req,res)=>{

  res.send("안녕하세요")
})