<template>
  <div>
    <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="24">
          <el-input v-model="searchModel.search_key.name" placeholder="名称" clearable @clear="searchModel.search_key.name = ''" />
          <el-input v-model="searchModel.search_key.mobile" placeholder="手机号" clearable @clear="searchModel.search_key.mobile = ''" />
          <el-input
            v-model="searchModel.search_key.openid"
            placeholder="微信openid"
            clearable
            @clear="searchModel.search_key.openid = ''"
          />
          <el-select v-model="searchModel.search_key.sex" placeholder="性别" clearable @clear="searchModel.search_key.sex = null">
            <el-option
              v-for="item in gender"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="searchModel.search_key.status" placeholder="状态" clearable @clear="searchModel.search_key.status = null">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-date-picker
            v-model="searchModel.search_key.created_at"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="创建开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
          <el-date-picker
            v-model="searchModel.search_key.updated_at"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="更新开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
          <!-- <el-input
            v-model="searchModel.memo"
            placeholder="备注"
            clearable
          /> -->
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getUserMemberList"
          >查询</el-button>
          <el-button
            icon="el-icon-refresh"
            @click="clearSearchParams"
          >重置</el-button>
        </el-col>
        <!-- <el-col :span="4" align="right">
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            @click="openEditUI(null)"
          />
        </el-col> -->
      </el-row>
    </el-card>

    <!-- 结果列表 -->
    <el-card>
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">
            <!-- (page-1) * pageSize + index + 1 -->
            {{
              (searchModel.page - 1) * searchModel.pageSize + scope.$index + 1
            }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="id" width="63" />
        <el-table-column label="性别" width="63">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 0">未知</span>
            <span v-if="scope.row.sex == 1">男</span>
            <span v-if="scope.row.sex == 2">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="90" />
        <el-table-column prop="mobile" label="电话" width="110" />

        <el-table-column prop="openid" label="openid" width="186" />
        <el-table-column prop="birthday" label="出生日期" width="110" />
        <el-table-column prop="created_at" label="注册时间" width="150" />
        <el-table-column prop="updated_at" label="更新时间" width="150" />
        <el-table-column prop="free_parking_expire_at" label="免费停车有效期" width="150" />
        <el-table-column prop="status" label="用户状态" width="76" @change="changeStatus">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1">正常</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="车辆进出记录" width="110">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="$router.push(`/member-car/inout-record?id=${scope.row.id}`)"
            >查看记录</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="account" label="描述"> </el-table-column> -->
        <el-table-column label="操作" width="90" header-align="center" align="center" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              @click="$router.push(`/member-car/inout-record?id=${scope.row.id}`)"
            >进出记录</el-button> -->
            <!-- <el-button
              type="text"
              @click="$router.push(`/member-car/inout-record?id=${scope.row.id}`)"
            >查看记录</el-button> -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="openEditUI(scope.row.id)"
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="deleteUser(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="searchModel.page"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="searchModel.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 用户信息编辑对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      @close="clearForm"
    >
      <el-form ref="userFormRef" :model="userForm" :rules="rules">
        <!-- <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="userForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="userForm.id == null || userForm.id == undefined" label="登录密码" prop="password" :label-width="formLabelWidth">
          <el-input
            type="password"
            v-model="userForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="userForm.mobile" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="用户状态" :label-width="formLabelWidth">
          <el-switch
            v-model="userForm.status"
            :active-value="1"
            :inactive-value="0"
            @change="changeStatus"
          />
        </el-form-item>
        <el-form-item label="免费停车有效期" prop="free_parking_expire_at" :label-width="formLabelWidth">
          <!-- <el-input v-model="userForm.free_parking_expire_at" autocomplete="off"><el-input> -->
          <!-- format="yyyy 年 MM 月 dd 日 " -->
          <el-date-picker
            v-model="userForm.free_parking_expire_at"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期"
          />
        </el-form-item>
        <!-- {{ userForm.free_parking_expire_at }} -->
        <!-- <el-form-item label="描述" prop="account" :label-width="formLabelWidth">
          <el-input v-model="userForm.account" autocomplete="off"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import userApi from "@/api/userManage";
import userApi from "@/api/memberCar";
export default {
  data() {
    const checkaccount = (rule, value, callback) => {
      var reg =
        /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
      if (!reg.test(value)) {
        return callback(new Error("邮箱格式错误"));
      }
      callback();
    };
    return {
      gender: [
        {
          value: 1,
          label: "男",
        },
        {
          value: 2,
          label: "女",
        },
        {
          value: 0,
          label: "未知",
        }
        // {
        //   value: null,
        //   label: '不限'
        // },
      ],
      status: [
        {
          value: 1,
          label: "启用",
        },
        {
          value: 0,
          label: "禁用",
        }
        // {
        //   value: -1,
        //   label: 'null'
        // }
      ],
      formLabelWidth: "130px",
      userForm: {},
      myUserForm: {},
      dialogFormVisible: false,
      title: "",
      total: 0,
      searchModel: {
        page: 1,
        pageSize: 5,
        search_key: {
        }
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      userList: [],
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登录初始密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
        account: [
          { required: true, message: "请输入描述", trigger: "blur" },
          { validator: checkaccount, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getUserMemberList();
  },
  methods: {
    // 修改启用状态
    changeStatus(e) {
      console.log(e, 'status')
      // 确认吗
    },
    deleteUser(user) {
      this.$confirm(`您确认删除用户 ${user.name} ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          userApi.deleteUserById(user.id).then((response) => {
            this.$message({
              type: "success",
              message: response.msg,
            });
            this.getUserMemberList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    saveUser() {
      // 触发表单验证
      this.$refs.userFormRef.validate((valid) => {
        if (valid) {
          // 提交请求给后台
          // 修改状态
          const item = { ...this.userList.filter((item) => item.id === this.userForm.id)[0] }
          if (item.status !== this.userForm.status) {
            userApi.updateMemberStatus(this.userForm)
          }
          // 保存
          userApi.saveUser(this.userForm).then((response) => {
            // 成功提示
            this.$message({
              message: '保存成功',
              type: "success",
            });
            // 关闭对话框
            this.dialogFormVisible = false;
            // 刷新表格
            this.getUserMemberList();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    clearForm() {
      this.userForm = {};
      this.$refs.userFormRef.clearValidate();
    },
    openEditUI(id) {
      if (id == null) {
        this.title = "新增用户";
      } else {
        this.title = "修改用户";
        // 根据id查询用户数据
        // userApi.getUserById(id).then((response) => {
        //   this.userForm = response.data;
        // });
        // 根据分页筛选
        const item = { ...this.userList.filter((item) => item.id === id)[0] }
        this.userForm = item
      }
      this.dialogFormVisible = true;
    },
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getUserMemberList();
    },
    handleCurrentChange(page) {
      this.searchModel.page = page;
      this.getUserMemberList();
    },
    getUserMemberList() {
      userApi.getUserMemberList(this.searchModel).then((response) => {
        //
        this.userList = response.data.data;
        this.total = response.data.total;
      });
    },
    // 重置
    clearSearchParams() {
      this.searchModel = {
        page: 1,
        pageSize: 5,
        search_key: {
        }
      }
      this.getUserMemberList()
    }
  }
};
</script>

<style scoped>
/* #search {
  display: flex;
  flex-wrap: wrap;
  .el-input {
    width: 200px;
    margin-right: 15px;
    margin-bottom: 10px;
  }
  .el-date-editor {
    margin-bottom: 12px;
  }
}
 */

#search {
  display: flex;
  flex-wrap: wrap;
  .el-input {
    width: 200px;
    margin-right: 12px;
    margin-bottom: 12px;
  }
  .el-date-editor {
    margin-right: 15px;
  }
}
.el-dialog .el-input {
  width: 75%;
}
</style>
