const express = require('express');
const app = express();
const certificateModel = require('./certificateModel');
const loginModel = require('./loginModel');
require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcrypt');


app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('welcome to cheemdiya api!');
});

app.post('/api/upload', async (req, res) => {
    if(req.body.secret === process.env.SECRET){
    await certificateModel.create({
      img: req.body.image,
    })
    res.send('Uploaded Successfully!');
  } else{
    res.send('lol hacker!');
  }
});

app.get('/api/view', async (req, res) => {
  let certificates = await certificateModel.find();
  res.send(certificates); 
});

app.post('/api/login', async (req, res) => {
  let user = await loginModel.findOne({username: req.body.username});
  if(!user){
    return res.status(400).send('Something went wrong');
  }

  bcrypt.compare(req.body.password, user.password, function(err, result){
    // console.log(result);
    if(result===true){
      res.status(299).send("login successful")
    }else{
      res.status(298).send("login failed")
    }
  })
});


app.listen(4000);

console.log('Server is running on port 4000');