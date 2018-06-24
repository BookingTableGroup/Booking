<template>
  <section class="container"> <!-- 最外层容器 -->
    <div>
        <div id= "space"></div>
       
        <div>
          <div id="curOrder">
          <img id="menu_icon" src="../assets/food.png">
          当前订单
          <img id="menu_icon" src="../assets/food.png">
          </div>
        </div>
        <div id= "space"></div>
    </div>
    <div id="line_query"></div>
    <section class="content-container"><!-- 内容容器 -->
      <div id="container">
        <div id="tableInfo">
          <div id="ellipse_query">
            <img src="../assets/query.png">
          </div>
          <p id="tableTime">用餐时间：{{tableData.time}}</p>
          <p id="tablePhone">联系电话： {{tableData.phone}}</p>
        </div>
        <div id="table_type_query">
          <div id="ellipse_query">
            <img src="../assets/querychair.png">
          </div>
          <div id="tableMem">
            <p id="tableId">桌型：{{tableData.table}} 人桌</p>
          </div>
        </div>
        <div id="table_food_query">
          <div id="ellipse_query">
            <img src="../assets/food.png">
          </div>
          <div id="foodInfo">
            <div class="foodList">
              <el-table :data="tableData.foods">
                <el-table-column
                  v-for="{ prop, label } in colConfigs"
                  :key="prop"
                  :prop="prop"
                  :label="label">
                </el-table-column>
              </el-table>
              <div class="totalPrice">
                总价：{{total}}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    <br/>
  </section>
</template>

<script>
import item from './item.vue'
export default {
  components: {
    item
  },
  data () {
    this.colConfigs = [
      { prop: 'price', label: '价格' },
      { prop: 'name', label: '菜名' }
    ]
    return {
      total: 0,
      tableData: [],
      loading: false
    }
  },
  methods: {
    getAll: function () {
      this.loading = true;
      let phone = localStorage.getItem('user');
      this.$http.post("/api/getFood",{phone}).then(
        function(response) {
          this.loading = false;
          this.tableData = response.body;
          this.computeTotal();
        },
        function() {
          this.loading = false;
          console.log("error");
        }
      );
    },
    computeTotal: function () {
       for (let index = 0; index <  this.tableData.foods.length; index++) {
        this.total = this.tableData.foods[index].price + this.total;
      }
    }
  },
    //页面初始化进来查询数据
  mounted: function() {
    this.getAll();
  }
}
</script>

<style>
  #space {
    float: right;
    width: 80%;
    /* border: 2px solid rgb(110, 86, 7); */
  }
  *{
    margin: 0;
    padding: 0;
  }
  #menu_icon {
    height: 50px;
    width: 50px;
  }
  #line_query {
    margin-top:80px;
    margin-left: 200px;
    width:80%;
    height:3px;
    background:rgb(000, 188, 212);
  }

  #ellipse_query {
    width: 150px;
    height: 150px;
    margin-top: 30px;
    margin-left: 150px;
    border: 4px solid rgb(000, 188, 212);
    border-radius: 50%;
  }

  #ellipse_query img {
    width: 100%;
    height:100%;
  }

  #container {
    height: 400px;
    /* border: 1px solid blue; */
  }
  #menu {
    margin-left:-35px;
    height: 400px;
    width: 20%;
  }
  #curOrder {
    margin-left: 450px;
    height: 40px;
    width: 60%;
    color: rgb(000, 188, 212);
    font-size: 40px;
    font-family: Roboto;
    margin-top: 30px;
  }
  #table_type_query {
    margin-top: 40px;
    margin-left: 100px;
    background-color: white;
    float: left;
    height: 600px;
    width: 20%;
    box-shadow: #666 0px 0px 10px;
    border:  3px solid rgb(000, 188, 212);
  }
  #tableInfo {
    margin-top: 40px;
    margin-left: 350px;
    background-color: white;
    float: left;
    height: 600px;
    width: 20%;
    box-shadow: #666 0px 0px 10px;
    border:  3px solid rgb(000, 188, 212);
  }
  #table_food_query {
    margin-top: 40px;
    margin-left: 100px;
    background-color: white;
    float: left;
    height: 600px;
    width: 20%;
    box-shadow: #666 0px 0px 10px;
    border:  3px solid rgb(000, 188, 212);
  }
  #deleteIcon{
    width: 30px;
  }
  #tableMem {
    color: rgb(000, 188, 212);
    font-size: 35px;
    font-family: Roboto;
    margin-top: 50px;
    margin-left: -10px;
    text-decoration: underline;
  }
  #tableId{
    color: rgb(000, 188, 212);
    font-size: 35px;
    font-family: Roboto;
    margin-top: 100px;
    margin-left: -10px;
    text-decoration: underline;
  }
  #tableTime {
    color: rgb(000, 188, 212);
    font-size: 35px;
    font-family: Roboto;
    margin-top: 50px;
    margin-left: -10px;
    text-decoration: underline;
  }
  #tablePhone {
    color: rgb(000, 188, 212);
    font-size: 35px;
    font-family: Roboto;
    margin-top: 50px;
    margin-left: 20px;
    text-decoration: underline;
  }
  #foodInfo {
    float:left;
    margin-top: 40px;
    margin-left: -15px;
    height: 500px;
    width: 100%;
    color:rgb(000, 188, 212);
    font-family: Roboto;
  }
  .foodList {
    font-size: 25px;
    margin-left: 85px;
    width: 70%;
    height: 300px;
    /*box-shadow: #666 0px 0px 5px;*/
    border:  3px solid rgb(000, 188, 212);
  }

</style>