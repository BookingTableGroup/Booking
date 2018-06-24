<template>
  <div id="container">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1"><router-link to="/home">主页</router-link></el-menu-item>
    </el-menu>
    <div id="dishes">
      <div class="dish" v-for="item in items" v-bind:key="item.foodId">
        <img class="picture" :src="item.image"/>
        <img class="star" src="../assets/2.png"/>
        <span class="price">¥ {{item.price}}</span>
        <div class="iteminfo">
          <input type="checkbox" class="check" :checked="item.isChosen" v-model="item.isChosen">
          <span class="name">{{item.name}}</span>
        </div>
      </div>
    </div>
    <span id="amount">总计 ¥ {{items[0].isChosen * items[0].price + items[1].isChosen * items[1].price + items[2].isChosen * items[2].price + items[3].isChosen * items[3].price + items[4].isChosen * items[4].price + items[5].isChosen * items[5].price + items[6].isChosen * items[6].price +　items[7].isChosen * items[7].price + items[8].isChosen * items[8].price + items[9].isChosen * items[9].price + items[10].isChosen * items[10].price + items[11].isChosen * items[11].price}}</span>
    <div>
      <button type="button" id = "tableButton1" v-on:click="postData">确认订单</button>
      <button type="button" id = "tableButton2" v-on:click="reset">重置订单</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Food',
  data () {
    return {
      items: [{foodId: 1, price: 10, isChosen: false, name: '降龙爪爪', image: require('../assets/jizhua.jpg')},
        {foodId: 2, price: 10, isChosen: false, name: '香辣鸡腿', image: require('../assets/jitui.jpg')},
        {foodId: 3, price: 20, isChosen: false, name: '炸鸡汉堡', image: require('../assets/zhajihanbao.jpg')},
        {foodId: 4, price: 20, isChosen: false, name: '巨无霸', image: require('../assets/juwuba.jpg')},
        {foodId: 5, price: 20, isChosen: false, name: '羊肉泡馍', image: require('../assets/yangrou.jpg')},
        {foodId: 6, price: 25, isChosen: false, name: '酱骨架', image: require('../assets/jianggujia.jpg')},
        {foodId: 7, price: 30, isChosen: false, name: '可乐鸡翅', image: require('../assets/jichi.jpg')},
        {foodId: 8, price: 30, isChosen: false, name: '白切鸡', image: require('../assets/baiqieji.jpg')},
        {foodId: 9, price: 30, isChosen: false, name: '水煮牛肉', image: require('../assets/niurou.jpg')},
        {foodId: 10, price: 20, isChosen: false, name: '鱼香肉丝', image: require('../assets/yuxiang.jpg')},
        {foodId: 11, price: 35, isChosen: false, name: '清蒸鳜鱼', image: require('../assets/guiyu.jpg')},
        {foodId: 12, price: 35, isChosen: false, name: '夫妻肺片', image: require('../assets/fuqi.jpg')}]
    }
  },
  methods: {
    postData: function () {
      var foodList = new Array()
      // 获取被选中的菜品，存入foodList
      this.items.forEach(element => {
        if (element.isChosen == true) {
          foodList.push({foodId: element.foodId, price: element.price, name: element.name})
        }
      })
      // 获取缓存中的user
      let user = localStorage.getItem('user')
      this.$confirm("是否确认菜品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 确认是否有选中菜品
        if (foodList.length > 0) {
          this.$http.post('/api/food', {
            user: user,
            foods: foodList
          })
          this.$message({
            type: "success",
            message: "预定菜品成功!"
          })
          this.$router.push('/home')
        } else {
          this.$message({
            type: "error",
            message: "预定菜品失败，请选择您的菜品!"
          })
        }
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消预定菜品!"
          })
        })
    },
    reset: function () {
      this.items.forEach(element => {
        element.isChosen = false
      })
      this.$message({
        type: "info",
        message: "预定菜品已清空！"
      })
    }
  }
}
</script>

<style>
#container {
  height: 400px;
  position: relative;
}
#container .el-menu-demo {
  margin-bottom: 15px;
}
#sidebar {
  float: left;
  height: 400px;
  width: 20%;
}
#dishes {
  float: right;
  width: 100%;
  height: 400px;
  position: relative;
}
#amount {
  float: center;
  position: relative;
  font-size: 30px;
  color: red;
  left: 100px;
  font-family: Microsoft Yahei;
  border: 1px solid black;
  position: relative;
  border: none;
  margin-top: 30px;
}
.select {
  width: 99%;
  height: 50px;
  line-height: 41px;
  border-radius: 9px;
  background-color: rgb(000, 188, 212);
  color: white;
  font-size: 28px;
  text-align: center;
  font-family: "Microsoft YaHei";
  position: relative;
  outline: none;
  box-shadow: #666 0px 0px 10px;
}
.check, .star, .price {
  float: right;
  position: relative;
}
.check {
  width: 10%;
  height: 48%;
  background: none;
  border: none;
  position: relative;
  top: 30%;
  outline: none;
  content: "\a0";
  display: inline-block;
  vertical-align: .2em;
  margin-right: .2em;
  border-radius: .2em;
  background-color: silver;
  text-indent: .15em;
  line-height: .65;
}
.picture {
  width: 45%;
  height: 60%;
  position: relative;
}
.star {
  right: 3%;
  top: 15%;
  width: 25px;
  height: 25px;
  background: none;
  border: none;
  position: relative;
}
.dish {
  width: 22%;
  height: 30%;
  line-height: 20px;
  text-align: left;
  float: left;
  border: 1px solid rgba(187, 187, 187, 1);
  position: relative;
  margin-left: 1.4%;
  margin-right: 1.4%;
  margin-top: 0.5%;
  margin-bottom: 0.5%;
  box-shadow: #666 0px 0px 10px;
}
.iteminfo {
  width: 98%;
  height: 34%;
  float: center;
  color: rgba(16, 16, 16, 1);
  border: 1px solid rgba(187, 187, 187, 1);
  position: relative;
}
.name {
  float: left;
  font-size: 120%;
  font-family: Microsoft Yahei;
  position: relative;
  border: none;
  top: 30%;
  left: 10%;
}
.price {
  width: 60px;
  height: 20px;
  color: rgba(229, 28, 35, 1);
  font-size: 100%;
  font-family: Roboto;
  align-content: center;
  border: none;
  margin-top: 15%;
  margin-bottom: 6%;
  margin-right: 5%;
}
#tableButton1 {
    background-color:rgb(000, 188, 212);
    border: none;
    color: white;
    padding: 8px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: #666 0px 0px 5px;
    margin-top: 15px;
  }
  #tableButton2 {
    background-color:rgb(000, 188, 212);
    border: none;
    color: white;
    padding: 8px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    margin-left:100px;
    box-shadow: #666 0px 0px 5px;
  }
</style>