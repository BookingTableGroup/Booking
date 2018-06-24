<template lang="html">

  <div class="list">
      <el-table
    :data="tableData"
    stripe
    element-loading-text="拼命加载中"
    header-row-class-name="tableHeader"
    v-loading.fullscreen.lock="loading"
    empty-text="亲，暂时没有数据哦"
    border
    align="center"
    style="width: 100%">
            <el-table-column
           
            prop="phone"
            label="电话"
            align="center"
            width="250">
            </el-table-column>

            <el-table-column
            prop="password"
            label="密码"
            align="center"
            width="250">
            </el-table-column>

            <el-table-column
            prop="table"
            label="桌号"
            align="center"
            width="200">
            </el-table-column>

            <el-table-column
            prop="time"
            label="预定时间"
            align="center"
            width="250">
            </el-table-column>
            
            <el-table-column
            label="操作"
            align="center"
            width="400">
              <template slot-scope="scope">
                  <el-button  size="small" type="success" @click="checkFood(scope.row['_id'])">查看菜品</el-button>
                  <el-button  size="small" type="success" @click="modify(scope.row)">修改</el-button>
                  <el-button type="danger" size="small" @click="deleteDate(scope.row['_id'])">删除</el-button>
              </template>
            </el-table-column>
  </el-table>

    <!-- 新增数据 -->
  <el-dialog title="新增数据" :visible.sync="addFormVisible" class="addArea" modal custom-class="addFormArea" @close="closeAdd">
  <el-form :model="addForm" class="addForm">

    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="addForm.phone" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="addForm.password" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="桌子大小" :label-width="formLabelWidth">
      <el-select v-model="addForm.table" placeholder="请选择桌号" class="tableArea">
        <el-option label="8人桌" value="8"></el-option>
        <el-option label="12人桌" value="12"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="预定时间" :label-width="formLabelWidth">
      <el-select v-model="addForm.time" placeholder="请选择预定时间" class="tableArea">
        <el-option label="11:00-14:00" value="11:00-14:00"></el-option>
        <el-option label="17:00-21:00" value="17:00-21:00"></el-option>
      </el-select>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSure">确 定</el-button>
  </div>
</el-dialog>

<!-- 修改数据 -->
  <el-dialog title="修改数据" :visible.sync="modifyFormVisible" class="addArea" modal custom-class="addFormArea">
  <el-form :model="modifyForm" class="addForm">

    <el-form-item label="电话" :label-width="formLabelWidth">
      <el-input v-model="modifyForm.phone" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="modifyForm.password" auto-complete="off"></el-input>
    </el-form-item>


    <el-form-item label="桌子大小" :label-width="formLabelWidth">
      <el-select v-model="modifyForm.table" placeholder="请选择桌号" class="sexArea">
        <el-option label="8人桌" value="8"></el-option>
        <el-option label="12人桌" value="12"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="预定时间" :label-width="formLabelWidth">
      <el-select v-model="modifyForm.time" placeholder="请选择预定时间" class="tableArea">
        <el-option label="11:00-14:00" value="11:00-14:00"></el-option>
        <el-option label="17:00-21:00" value="17:00-21:00"></el-option>
      </el-select>
    </el-form-item>


  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="modifyFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifySure">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="查看菜品" :visible.sync="foodVisible" size="tiny">
  <el-table :data="foodData.foods">
    <el-table-column property="name" label="菜名" align="center" width="257"></el-table-column>
    <el-table-column property="price" label="价格" align="center" width="257"></el-table-column>
  </el-table>
</el-dialog>

<el-button type="primary" class="addBtn" @click="add" icon="el-icon-plus">添加</el-button>
  
  </div>
</template>

<script>
export default {
  name: "list",
  data: function() {
    return {
      total: 0,
      tableData: [],
      foodData: [],
      addFormVisible: false,
      modifyFormVisible: false,
      addpicVisible: false,
      foodVisible: false,
      modifyId: "",
      addForm: {
        phone: "",
        password: "",
        table: "",
        time:""
      },
      modifyForm: {
        phone: "",
        password: "",
        table: "",
        time:""
      },
      formLabelWidth: "120px",
      loading: false
    };
  },
  methods: {
    add: function() {
      this.addFormVisible = true;
    },
    addSure: function() {
      var that = this;

      this.addFormVisible = false;
      //调新增接口,在回调函数中刷新一次

      var addObj = this.addForm;

      this.$http.post("/api/user", addObj).then(
        function(response) {
          if (response.ok) {
            this.$message({
              message: "添加成功",
              type: "success",
              onClose: function() {
                that.getAll();
              }
            });
          }
        },
        function() {
          // this.loading = false;
        }
      );
    },
    // 关闭dialog的函数
    closeAdd: function() {
      this.addForm.phone = "";
      this.addForm.password = "";
      this.addForm.table = "";
      this.addForm.time = ""
    },
    //修改操作
    modify: function(row) {
      this.modifyFormVisible = true;
      this.modifyForm = Object.assign({}, row);
      this.modifyId = row["_id"];
    },
    modifySure: function() {
      var that = this;
      this.$http
        .put(`/api/user/${this.modifyId}`, this.modifyForm, {
          emulateJSON: true
        })
        .then(
          function(response) {
            if (response.ok) {
              this.modifyFormVisible = false;
              this.$message({
              message: "修改成功",
              type: "success",
              onClose: function() {
                that.getAll();
              }
            });
            }
          },
          function() {
            // this.loading = false;
          }
        );
    },
    // 删除操作
    deleteDate: function(id) {
      var that = this;
      var deleteId = id;

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`/api/user/${deleteId}`).then(
            function(response) {
              if (response.ok) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                that.getAll();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            },
            function() {
              // this.loading = false;
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //查看菜品
    checkFood: function(id) {
      this.foodVisible = true;
      var checkId = id;
      this.$http.get(`/api/user/${checkId}`).then(
            function(response) {
              if (response.ok) {
                this.foodData = response.body;
                for (let index = 0; index <  this.foodData.foods.length; index++) {
                    this.total = this.foodData.foods[index].price + this.total;
                }
              } else {
                this.$message({
                  type: "error",
                  message: "查询失败!"
                });
              }
            }
      );
    },
    // 获取全部数据
    getAll: function() {
      this.loading = true;
      this.$http.get("/api/user").then(
        function(response) {
          this.loading = false;
          this.tableData = response.body;
        },
        function() {
          this.loading = false;
          console.log("error");
        }
      );
    },
    //跳转至详情页面
    toDetail: function(id) {
      //通过这种方式也可以实现跳转
      this.$router.push(`/league/${id}`);
    }

  },

  //页面初始化进来查询数据
  mounted: function() {
    this.getAll();
  }
};
</script>

<style lang="css">
.tableHeader {
  color: #000;
}
div.list {
  width: 73.7%;
  margin: 0 auto;
}
.addBtn {
  margin: 50px auto 0;
  display: block;
}
.addArea .el-input {
  width: 200px;
}
.addPicArea .el-input {
  width: 500px;
}
.addForm {
  overflow: hidden;
}
.addForm .el-form-item {
  float: left;
}
.tableArea {
  width: 200px;
}
.addFormArea .el-dialog__header .el-dialog__title {
  text-align: left;
}
</style>
