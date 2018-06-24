const express = require('express');
const user = require('./router/user')
const mongoose = require("mongoose");
const session = require('express-session')
const bodyParser = require("body-parser")




//这一句是连接上数据库
 var db = mongoose.connect('mongodb://localhost:27017/my');

//这里的my是数据库的名字，不是表的名字



const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// session
app.use(session({
    secret: 'usersession',
    key: 'usersession',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10000 // 设置返回的cookie时效为30秒，测试用
    }
  }))

app.use('/api',user)
app.listen(3000,() => {
    console.log('app listening on port 3000.')
})


