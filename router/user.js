
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const User = require("../models/userSchema");



// 登录
router.post("/login", (req, res) => {

  let userLogin = new User({
    phone: req.body.phone,
    password: req.body.password
  })
  User.findOne({
    phone: userLogin.phone
    })
    .then(user => {
      if (!user) {
        res.json({
          success: false,
          message: "账号不存在"
        })
      } else if (userLogin.password === user.password) {
        var phone = req.body.phone;
        // 用户信息写入 session
        //user.password = null;
        req.session.user = user;
        console.log("登录成功");
        console.log(user);
        res.json({
          success: true,
          message: "登录成功",
          phone: user.phone
        })
      } else {
        res.json({
          success: false,
          message: "密码错误"
        })
      }
    })
    .catch(err => res.json(err))
});

// 注册
router.post("/register", (req, res) => {
  let userRegister = new User({
    phone: req.body.phone,
    password: req.body.password, 
    table: "",
    time: ""
  })

  User.findOne({
    phone: userRegister.phone
    })
    .then(user => {
      if (user) {
        res.json({
          success: false,
          error: '该账户已注册'
        })
      } else {
        userRegister.save((err, user) => {
          if (err) {
            res.json(err)
          } else {
            res.json({
              success: true,
              message: "注册成功",
            })
          }
        })
      }
    })
    .catch(err => res.json(err))
});

// 查询所有用户信息路由
router.get("/user", (req, res) => {
  User.find({})
    .sort({ update_at: -1 })
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.log(2);
      res.json(err);
    });
});



// 通过ObjectId查询单个用户信息路由
router.get("/user/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

// 添加一个用户信息路由
router.post("/user", (req, res) => {
  //使用User model上的create方法储存数据
  User.create(req.body, (err, user) => {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

//更新一条用户信息数据路由
router.put("/user/:id", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        phone: req.body.phone,
        password: req.body.password,
        table: req.body.table,
        time: req.body.time
      }
    },
    {
      new: true
    }
  )
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

//管理员删除某用户订单
router.put("/deleteOrder/:id", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        table: "",
        time: "",
        foods:[]
      }
    },
    {
      new: true
    }
  )
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

//用户删除订单
router.put("/deleteMyOrder/:phone", (req, res) => {
  User.findOneAndUpdate(
    { phone: req.params.phone },
    {
      $set: {
        table: "",
        time: "",
        foods:[]
      }
    },
    {
      new: true
    }
  )
    .then(user => res.json(user))
    .catch(err => res.json(err));
});
//删除一条用户信息路由
router.delete("/user/:id", (req, res) => {
  User.findOneAndRemove({
    _id: req.params.id
  })
    .then(user => res.send(`${user.title}删除成功`))
    .catch(err => res.json(err));
});

// 删除 session
router.get("/delsession", (req, res) => {
  req.session.user = null;
  res.json({
    message: '登出成功'
  })
});

// 添加菜品
router.post("/food", (req, res) => {
  console.log(req.body.user)
  User.findOneAndUpdate(
    { phone: req.body.user },
    {
      $set: {
        foods: req.body.foods
      }
    },
    {
      new: true
    }
  )
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// 桌子预定
router.post("/book", (req, res) => {
  User.findOneAndUpdate(
    { phone: req.body.phone },
    {
      $set: {
        table: req.body.table,
        time: req.body.time
      }
    },
    {
      new: true
    }
  )
    .then(user => res.send('预定成功'))
    .catch(err => res.json(err));
});



// 查询某个用户的food
router.post("/getFood", (req, res) => {
  User.findOne({phone: req.body.phone})
    .then(users => {
      res.json(users);
  })
    .catch(err => {
      res.json(err);
  });   
});

module.exports = router;




















