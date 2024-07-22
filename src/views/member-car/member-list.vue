<template>
  <div class="member_list">
    <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="24">
          <el-input v-model="searchModel.search_key.name" placeholder="名称" clearable @change="getUserMemberList" @clear="searchModel.search_key.name = ''" />
          <el-input v-model="searchModel.search_key.plate_number" placeholder="车牌号" clearable @change="getUserMemberList" @clear="searchModel.search_key.plate_number = ''" />
          <el-input v-model="searchModel.search_key.mobile" placeholder="手机号" clearable @change="getUserMemberList" @clear="searchModel.search_key.mobile = ''" />
          <el-input
            v-model="searchModel.search_key.openid"
            placeholder="微信openid"
            clearable
            @change="getUserMemberList"
            @clear="searchModel.search_key.openid = ''"
          />
          <el-input
            v-model="searchModel.search_key.openid_mp"
            placeholder="小程序openid"
            clearable
            @change="getUserMemberList"
            @clear="searchModel.search_key.openid_mp = ''"
          />
          <el-select v-model="searchModel.search_key.sex" placeholder="性别" clearable @change="getUserMemberList" @clear="searchModel.search_key.sex = null">
            <el-option
              v-for="item in gender"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="searchModel.search_key.status" placeholder="状态" clearable @change="getUserMemberList" @clear="searchModel.search_key.status = null">
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
            @change="getUserMemberList"
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
            @change="getUserMemberList"
          />
          <el-date-picker
            v-model="searchModel.search_key.free_parking_expire_at"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="有效期截至日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2"
            @change="getUserMemberList"
          />
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getUserMemberList"
          >查询</el-button>
          <el-button
            icon="el-icon-refresh"
            @click="clearSearchParams"
          >重置</el-button>
          <el-button
            type="warning"
            plain
            icon="el-icon-search"
            @click="exportExcel"
          >导出</el-button>
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
        <el-table-column prop="id" label="会员id" width="76"/>
        <!-- <el-table-column prop="name" label="名称" /> -->
        <el-table-column prop="name" label="名称" width="106">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.name" placement="top-start">
              <div>{{ scope.row.name }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="member_car_plate_number" label="车牌号" width="96" />
        <el-table-column label="性别" width="50">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 0">未知</span>
            <span v-if="scope.row.sex == 1">男</span>
            <span v-if="scope.row.sex == 2">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="106" />
        <!-- <el-table-column prop="openid" label="openid" width="160" /> -->
        <!-- 160 -->
        <el-table-column prop="openid" label="微信openid" width="104">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.openid" placement="top-start">
              <div>{{ scope.row.openid }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="openid_mp" label="小程序openid" width="108">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.openid_mp" placement="top-start">
              <div>{{ scope.row.openid_mp }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="created_at" label="注册时间" width="150" /> -->
        <el-table-column prop="created_at" label="注册时间" width="106">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.created_at" placement="top-start">
              <div>{{ scope.row.created_at }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="updated_at" label="更新时间" width="150" /> -->
        <el-table-column prop="updated_at" label="更新时间" width="106">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.updated_at" placement="top-start">
              <div>{{ scope.row.updated_at }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="free_parking_expire_at" label="会员有效期" width="150" /> -->

        <el-table-column label="历史绑定车牌" width="110">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              @click="open(scope.row.id)"
            >查看车牌({{ scope.row.member_car_log_count }})</el-button> -->
            <el-tooltip effect="dark" :content="'绑定过' + scope.row.member_car_log_count + '个车牌'" placement="top-start">
              <span style="color: #1890ff;cursor: pointer;" @click="open(scope.row.id)">
                查看车牌({{ scope.row.member_car_log_count }})
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="进出场记录" width="110">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              @click="$router.push(`/member-car/inout-record?id=${scope.row.id}`)"
            >查看记录({{ 9999999 | scope.row.member_car_in_out_record_count }})</el-button> -->
            <el-tooltip effect="dark" :content="scope.row.member_car_in_out_record_count + '条进出场记录'" placement="top-start">
              <span style="color: #1890ff;cursor: pointer;" @click="$router.push(`/member-car/inout-record?id=${scope.row.id}`)">
                查看记录({{ scope.row.member_car_in_out_record_count }})
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="用户状态" @change="changeStatus" width="90">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1">正常</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="birthday" label="出生日期" /> -->
        <el-table-column prop="birthday" label="出生日期">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.birthday" placement="top-start">
              <div>{{ scope.row.birthday }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="free_parking_expire_at" label="会员有效期" width="106">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.free_parking_expire_at" placement="top-start">
              <div>{{ scope.row.free_parking_expire_at }}</div>
            </el-tooltip>
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
            <!-- <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="deleteUser(scope.row)"
            /> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="searchModel.page"
      :page-sizes="[5, 10, 20, 50, 100]"
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
    <!-- 车牌号 -->
    <el-dialog
      title="历史车牌号"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div v-for="(item, index) in carList" :key="item.plate_number">
        <div class="carItem">
          <div>
            <span>车牌号{{ index + 1 }}: </span>
            {{ item.plate_number }}</div>
          <div>
            <span>添加时间: </span>
            {{ item.created_at }}</div>
          <!-- <div>
            <span>更新时间: </span>
            {{ item.updated_at }}</div> -->
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import memberApi from "@/api/userManage";
import memberApi from "@/api/memberCar";
import exportUtil from "@/excel/ExportExcel";

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
      status: [
        {
          value: 1,
          label: "启用",
        },
        {
          value: 0,
          label: "禁用",
        },
      ],
      dialogVisible: false,
      carList: [],
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
      ],
      check_car_out: [
        {
          value: 1,
          label: "开启",
        },
        {
          value: 0,
          label: "关闭",
        }
      ],
      formLabelWidth: "130px",
      userForm: {},
      myUserForm: {},
      dialogFormVisible: false,
      title: "",
      total: 0,
      searchModel: {
        page: 1,
        pageSize: 10,
        search_key: {
        }
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              // 重置 start 的时间部分为 00:00:00
              start.setHours(0, 0, 0, 0);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近2天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近3天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit('pick', [start, end]);
            }
          },
          {
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
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '未来1年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 365); // 假设一年为365天
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '未来3年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 365 * 3); // 假设一年为365天
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '未来5年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 365 * 5); // 假设一年为365天
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '未来10年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 365 * 10); // 假设一年为365天
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '未来20年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 365 * 20); // 假设一年为365天
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '未来30年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 365 * 30); // 假设一年为365天
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '未来40年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 365 * 40); // 假设一年为365天
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '未来50年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 365 * 50); // 假设一年为365天
              picker.$emit('pick', [start, end]);
            }
          }
        ]
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
    open(id) {
      // 请求
      memberApi.getCarList(id).then((res) => {
        console.log(res.data);
        // const arr = res.data.map((item) => item.plate_number)
        // const html =
        this.carList = res.data
        this.dialogVisible = true
        // this.$alert(arr.join('、'), '历史车牌号', {
        //   confirmButtonText: '确定',
        //   callback: action => {
        //     // this.$message({
        //     //   type: 'info',
        //     //   message: `action: ${ action }`
        //     // });
        //   }
        // })
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    // 导出
    exportExcel() {
      require.ensure([], () => {
        const fieldName = ["序号", "名称", "车牌号", "性别", "电话", "微信openid", "小程序openid", "注册时间", "更新时间", "会员有效期", '用户状态', "出生日期"];
        const filterVal = ["index", "name", "member_car_plate_number", "sex", "mobile", "openid", "openid_mp", "created_at", "updated_at", "free_parking_expire_at", 'status', "birthday"];
        // const data = this.userList.map(v => filterVal.map(j => v[j]));
        const data = this.userList.map((v, i) => filterVal.map(j => {
          if (j === 'index') {
            return i
          } else if (j === 'sex') {
            return v[j] === 0 ? '未知' : v[j] === 1 ? '男' : '女'
          } else if (j === 'status') {
            return v[j] === 0 ? '禁用' : '正常'
          } else {
            return v[j]
          }
        }));
        const item = this.userList[0]
        console.log(fieldName, data, `${item.name}`);
        exportUtil.export_json_to_excel(fieldName, data, `${item.name} - ${new Date().toLocaleString().replaceAll('/', '-')}`);
        // exportUtil.export_json_to_excel(fieldName, data, `${item.name} - ${new Date().toLocaleDateString().replaceAll('/', '-')}`);
      });
    },
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
          console.log(11);
          memberApi.deleteUserById(user.id).then((response) => {
            this.$message({
              type: "success",
              message: response.msg,
            });
            this.getUserMemberList();
          });
        })
        .catch(() => {
          console.log(22);
          // this.$message({
          //   type: "info",
          //   message: "已取消删除",
          // });
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
            memberApi.updateMemberStatus(this.userForm)
          }
          // 保存
          memberApi.saveUser(this.userForm).then((response) => {
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
        // memberApi.getUserById(id).then((response) => {
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
      memberApi.getUserMemberList(this.searchModel).then((response) => {
        //
        this.userList = response.data.data;
        this.total = response.data.total;
        const { current_page, data, last_page } = response.data;
        // 如果请求的页面超出范围，重新请求最后一页数据
        if (data.length === 0 && current_page > last_page) {
          this.searchModel.page = last_page
          memberApi.getUserMemberList(this.searchModel).then((response) => {
            this.userList = response.data.data;
            this.total = response.data.total;
          })
        }
      });
    },
    // 重置
    clearSearchParams() {
      this.searchModel = {
        page: 1,
        pageSize: 10,
        search_key: {
        }
      }
      this.getUserMemberList()
    }
  }
};
</script>

<style lang="scss" scoped>
.carItem{
  margin-bottom: 12px;
  div{
    margin-bottom: 4px;
    span{
      width: 76px;
      display: inline-block;
    }
  }
}
.member_list{
  .el-table__row .el-table__cell, .el-tooltip, .el-button .cell{
      white-space: nowrap;
      /* width: 50px; */
      overflow: hidden;
      text-overflow: ellipsis;   /* 显示省略号 */
  }
}

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
    width: 190px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .el-date-editor {
    margin-right: 12px;
    /*margin-bottom: 10px; */
  }
}
.el-dialog .el-input {
  width: 75%;
}
</style>
