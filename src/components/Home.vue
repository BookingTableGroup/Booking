<!--by linzeyun 2018-04-->

<template>
    <div id="homePage" v-show="showHome">
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-home" mode="horizontal">
            <el-menu-item index="1"><router-link to="/"><p id="topInfo_home">主页</p></router-link></el-menu-item>
            <el-menu-item index="2" :style="{float: 'right'}">
                <router-link v-show="!user.phone" to="/">登录</router-link>
                <el-dropdown @command="loginOut">
                <span :style="{color:'#FFF'}" v-show="user.phone">
                {{user.phone}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="logOut" command>登出</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-menu-item>
        </el-menu>
        <!--top information:including the title and userInfo-->
        <br/>
        <div id="line_home"></div>
        <!--show pictures gallery about the restaurant dynamically-->
        <img src="../assets/left.png" id="left_home" v-on:click="moveLeft" v-bind:onmouseover ="clearAuto"
             v-bind:onmouseout="slideAuto">
        <ul id="photo-list_home" >
            <li v-for="(v,index) in items" :key="index">
                <img v-bind:src="items[(cur + index) % 8].src" class="pic_home">
            </li>
        </ul>
        <img src="../assets/right.png" id="right_home" v-on:click="moveRight" v-bind:onmouseover="clearAuto"
             v-bind:onmouseout="slideAuto">
        <div id="line_home"></div>
        <br/>
        <!--choose things to do -->
        <div id="menu_home">
            <div class="selection_home">
                <div class="ellipse_home">
                    <img src="../assets/query.png">
                </div>
                <button v-text="query" id="btn_home" @click="goQuery"></button>
            </div>

            <div class="selection_home">
                <div class="ellipse_home">
                    <img src="../assets/table.png">
                </div>
                <button v-text="bookTable" id="btn_home" @click="goBook"></button>
            </div>
            <div class="selection_home">
                <div class="ellipse_home">
                    <img src="../assets/food.png">
                </div>
                <button v-text="bookFood" id="btn_home" @click="goFood"></button>
            </div>
        </div>
        <br/>
        <!--bottom information-->
        <div id="homeBottom">
            <div class="homeBottomInfo">
                <img src="../assets/time.png">
                <p v-text="time" class="bottomInfo_home"></p>
            </div>
            <div class="homeBottomInfo">
                <img src="../assets/user.png">
                <p v-text="manager" class="bottomInfo_home"></p>
            </div>
            <div class="homeBottomInfo">
                <img src="../assets/phone.png">
                <p v-text="tel" class="bottomInfo_home"></p>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'Home',
    data: function () {
      return {
        activeIndex:'1',
        user:{
          phone:localStorage.getItem('user')
        },
        showHome: true,
        title: '餐厅预订系统',
        admin: '管理员',
        login: '登录',
        register: '注册',
        time: '开放时间：8:00-22:00',
        manager: '经理：XXX',
        tel: '客服：1234567890',
        query: '查看订单',
        bookTable: '预订餐桌',
        bookFood: '预订菜品',
        phone: '',
        password: '',
        errorPhone: '',
        errorPassword: '',
        beforeLogin: true,
        afterLogin: false,
        cur: 0,
        items: [
          {
            src: '../../static/newtable.jpg'
          },
          {
            src: '../../static/beef.jpg'
          },
          {
            src: '../../static/10.png'
          },
          {
            src: '../../static/drink.jpg'
          },
          {
            src: '../../static/sweet.jpg'
          },
          {
            src: '../../static/soup.jpg'
          },
          {
            src: '../../static/16.png'
          },
          {
            src: '../../static/chicken.jpg'
          }
        ]
      }
    },
    components: {},
    methods: {
      ...mapActions(['userLoginOut']),
      // 登出loginOut
      loginOut(){
        this.userLoginOut();
        this.user.phone = null;
        this.$http.get('/api/delsession')
          .then(res => {
            console.dir(res.data)
            if (res.data.message) {
              this.$message.success(res.data.message);
              this.$router.push('/');
              return false;
            }
          })
          .catch(err => {
              this.$message.error(`${err.message}`)
          })
      },
      moveLeft: function () {
        this.cur = (this.cur + 1) % 8
      },
      clearAuto: function () {
        clearInterval(this.timer)
      },
      // 注意这里的this.moveLeft不要写成this.moveLeft(),因为需要getter和setter函数
      slideAuto: function () {
        this.timer = setInterval(this.moveLeft, 2000)
      },
      moveRight: function () {
        this.cur = (this.cur + 7) % 8
      },
      goQuery: function () {
        this.$router.push('/query')
      },
      goBook: function () {
        this.$router.push('/book')
      },
      goFood: function () {
        this.$router.push('/food')
      },
      goAdmin: function () {
        this.$router.push('/list')
      }
    },
    mounted: function () {
      this.slideAuto()
    }
  }
</script>

<style>
    .el-menu-home {
        padding-bottom: 30px;
    }
    #topInfo_home {
        color:white;
        font-size:150%;
        margin-top: 10px;
        width:80%;
        height:80%;
    }
    #h1_home {
        color:white;
        font-size:400%;
        text-align: left;
        padding-top:1%;
        padding-left:2%;
        width:80%;
        height:80%;
    }
    #user_home {
        margin-left:50%;
        width: 40%;
        margin-top:-95px;
    }

    #user_home p {
        width: 80px;
        text-align:right;
        margin-top:1%;
        margin-left: 75%;
        float: left;
        color: white;
        font-size: 16px;
    }
    .userIcon_home {
        width:7%;
        height:7%;
        margin-bottom : -9px;
    }
    input {
        width: 45%;
        height:32px;
        font-size: 17px;
    }
    #admin_home {
        width: 15%;
        margin-left:85%;
    }

    #adminIcon_home {
        height:45%;
        width:45%;
        margin-top:-40px;
    }

    #admin_home p {
        color:white;
        margin-top: -5px;
        padding-left: 18px;
        font-size:100%;
    }
    #userInfo_home {
        height: 120px;
        margin-left: 89%;
        margin-top: -120px;
    }
    #userInfo_home p {
        float: left;
        width: 78%;
        top: 14px;
        font-size: 20px;
        color:#FAD59D;
    }
    #userInfo_home img {
        width: 20%;
        height: 20%;
        top: -150px;
    }
    /*photo-list*/
    #line_home {
        margin-top:0.5%;
        width:100%;
        height:1%;
        border:solid 2px  rgb(051, 069, 091);
        background: rgb(051, 069, 091);
    }
    #photo-list_home {
        margin-left: 58px;
        margin-right: 58px;
        height: 155px;
        overflow:hidden;
    }
    ul {
        display: block;
    }
    #photo-list_home li {
        display: inline-block;
        list-style: none;
        width: 22%;
    }
    #left_home,#right_home {
        padding-top: 50px;
        width: 40px;
        height:90px;
    }
    #left_home {
        float: left;
        padding-left:2px;
    }
    #right_home {
        margin-top: -180px;
        float: right;
    }
    .pic_home {
        margin-top:2px;
        width: 100%;
        height: 153px;
        float: left;
        overflow: hidden;
        display: inline-block;
        box-shadow: #666 0px 0px 10px;
    }

    #menu_home {
        background-image: url('../assets/bg1.png');
        background-size:cover;
        height: 450px;
        box-shadow: #666 0px 0px 10px;
    }
    #homePage {
      height: 100px;
      background-color: rgb(051, 069, 091);
    }
    #homeBottom{
      background-size:cover;
      height: 100px;
      background-color: rgb(051, 069, 091);
    }
    #homeBottom {
        background-color:rgb(051, 069, 091);
    }
    .homeBottomInfo {
        float:left;
        width:33.3%;
    }
    .selection_home {
        margin-top:3%;
        margin-left:6%;
        height:20%;
        width: 25%;
        float: left;
    }
    .ellipse_home {
        box-shadow: #666 0px 0px 10px;        
        width: 80%;
        height: 250%;
        margin-top: 15%;
        margin-bottom: 16px;
        margin-left: 7.5%;
        border: 4px solid rgb(051, 069, 091);
        border-radius: 50%;

    }
    .ellipse_home img {
        width: 80%;
        margin-left: 9%;
        margin-top:16px;
        height:80%;
        vertical-align: center;
    }
    #menu__home {
        background-color:rgb(051, 069, 091);
        color:white;
        border-radius: 10px;
        width: 70%;
        height:35px;
        font-size:18px;
        margin-left:8%;
    }
    #btn_home {
        background-color:rgb(051, 069, 091);
        color:white;
        border-radius: 10px;
        width: 70%;
        height:70%;
        font-size:18px;
    }
    #homeBottom .homeBottomInfo img {
      width: 40px;
      height: 40px;
    }
    .bottomInfo_home {
      color:white;
      text-align:center;
      padding-top:5px;
    }
    .logOut {
        width:80%;
    }
</style>
