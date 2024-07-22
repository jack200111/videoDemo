<template>
  <div>
    <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="24">
          <el-input
            v-model="myUserForm.member_id"
            placeholder="会员id"
            clearable
            @change="searchMemberInOut"
            @clear="searchModel.search_key.member_id = ''"
          />
          <el-input
            v-model="searchModel.search_key.name"
            placeholder="名称"
            clearable
            @change="searchMemberInOut"
            @clear="searchModel.search_key.name = ''"
          />
          <el-input
            v-model="searchModel.search_key.plate_number"
            placeholder="车牌号"
            clearable
            @change="searchMemberInOut"
            @clear="searchModel.search_key.plate_number = ''"
          />
          <!-- <el-input v-model="searchModel.search_key.car_in_equip_name" placeholder="入场设备名称" clearable @change="searchMemberInOut" @clear="searchModel.search_key.car_in_equip_name = ''" /> -->
          <!-- :trigger-on-focus="false" -->
          <el-autocomplete
            v-model="searchModel.search_key.car_in_equip_name"
            :fetch-suggestions="querySearch"
            placeholder="入场设备名称"
            clearable
            @select="handleSelect"
            @change="searchMemberInOut"
            @clear="searchModel.search_key.car_in_equip_name = ''"
          />
          <!-- <el-input v-model="searchModel.search_key.car_out_equip_name" placeholder="出场设备名称" clearable @change="searchMemberInOut" @clear="searchModel.search_key.car_out_equip_name = ''" /> -->
          <el-autocomplete
            v-model="searchModel.search_key.car_out_equip_name"
            :fetch-suggestions="querySearch2"
            placeholder="出场设备名称"
            clearable
            @select="handleSelect2"
            @change="searchMemberInOut"
            @clear="searchModel.search_key.car_out_equip_name = ''"
          />
          <!-- <el-input v-model="searchModel.search_key.name" placeholder="名称" clearable @change="searchMemberInOut" @clear="searchModel.search_key.name = ''" /> -->
          <el-input
            v-model="searchModel.search_key.mobile"
            placeholder="手机号"
            clearable
            @change="searchMemberInOut"
            @clear="searchModel.search_key.mobile = ''"
          />
          <el-input
            v-model="searchModel.search_key.openid"
            placeholder="微信openid"
            clearable
            @change="searchMemberInOut"
            @clear="searchModel.search_key.openid = ''"
          />
          <el-input
            v-model="searchModel.search_key.openid_mp"
            placeholder="小程序openid"
            clearable
            @change="searchMemberInOut"
            @clear="searchModel.search_key.openid_mp = ''"
          />
          <el-select
            v-model="searchModel.search_key.sex"
            placeholder="性别"
            clearable
            @change="searchMemberInOut"
            @clear="searchModel.search_key.sex = null"
          >
            <el-option
              v-for="item in gender"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input
            v-model="searchModel.search_key.car_out_manual_memo"
            placeholder="备注"
            clearable
            @change="searchMemberInOut"
            @clear="searchModel.search_key.car_out_manual_memo = ''"
          />
          <el-select
            v-model="searchModel.search_key.check_car_out"
            placeholder="车辆离场检查"
            clearable
            @change="searchMemberInOut"
            @clear="searchModel.search_key.check_car_out = null"
          >
            <el-option
              v-for="item in check_car_out"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- <el-select v-model="searchModel.search_key.status" placeholder="状态" clearable @clear="searchModel.search_key.status = null">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select> -->
          <el-date-picker
            v-model="searchModel.search_key.car_in_at"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="车辆进场开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="searchMemberInOut"
          />
          <el-date-picker
            v-model="searchModel.search_key.car_out_at"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="车辆出场开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="searchMemberInOut"
          />
          <!-- <el-date-picker
            v-model="searchModel.search_key.free_parking_expire_at"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="有效期开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          /> -->
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="searchMemberInOut"
            >查询</el-button
          >
          <el-button icon="el-icon-refresh" @click="clearSearchParams"
            >重置</el-button
          >
          <el-button
            type="warning"
            plain
            icon="el-icon-search"
            @click="exportExcel"
            >导出</el-button
          >
        </el-col>
        <!-- <el-col :span="2" align="right">
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
      <el-table id="out-table" :data="userList" stripe style="width: 100%">
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">
            <!-- (page-1) * pageSize + index + 1 -->
            <span
              v-clipboard:copy="
                (searchModel.page - 1) * searchModel.pageSize + scope.$index + 1
              "
            >
              {{
                (searchModel.page - 1) * searchModel.pageSize + scope.$index + 1
              }}
            </span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="member_car_id" label="id" width="63" /> -->
        <!-- <el-table-column label="性别" width="63">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 0">未知</span>
            <span v-if="scope.row.sex == 1">男</span>
            <span v-if="scope.row.sex == 2">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="90" />
        <el-table-column prop="mobile" label="电话" width="120" />
        <el-table-column prop="plate_number" label="车牌号" width="120" />
        <el-table-column prop="birthday" label="出生日期" width="100" />
        <el-table-column prop="openid" label="openid" width="190" />
        <el-table-column prop="car_in_at" label="进场时间" />
        <el-table-column prop="car_out_at" label="出场时间" /> -->

        <!-- <el-table-column prop="id" label="推送id" width="63" /> -->
        <el-table-column prop="member_id" label="会员id" width="63" />
        <!-- <el-table-column prop="name" label="用户名" /> -->
        <el-table-column prop="name" label="用户名" width="86">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              :content="scope.row.name"
              placement="top-start"
            >
              <div>{{ scope.row.name }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="plate_number" label="车牌号" width="100" />
        <el-table-column
          prop="car_in_equip_name"
          label="入场设备名称"
          width="112"
        />
        <el-table-column
          prop="car_out_equip_name"
          label="出场设备名称"
          width="112"
        />
        <el-table-column prop="car_in_at" label="入场时间" width="150" />
        <el-table-column prop="car_out_at" label="出场时间" width="150" />
        <!-- <el-table-column prop="name" label="用户名" /> -->
        <el-table-column prop="mobile" label="手机号" width="120" />
        <el-table-column label="性别" width="70">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 0">未知</span>
            <span v-if="scope.row.sex == 1">男</span>
            <span v-if="scope.row.sex == 2">女</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="car_out_manual_memo"
          label="备注"
          width="85"
        />
        <el-table-column
          prop="car_in_equip_code"
          label="入场设备编号"
          width="105"
        />
        <el-table-column
          prop="car_out_equip_code"
          label="出场设备编号"
          width="105"
        />
        <!-- <el-table-column prop="openid" label="openid" width="190" /> -->
        <el-table-column prop="openid" label="微信openid" width="110">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              :content="scope.row.openid"
              placement="top-start"
            >
              <div>{{ scope.row.openid }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="openid_mp" label="小程序openid" width="120">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              :content="scope.row.openid_mp"
              placement="top-start"
            >
              <div>{{ scope.row.openid_mp }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="birthday" label="出生日期" />

        <el-table-column
          label="操作"
          width="90"
          header-align="center"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.car_out_at"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="openEditUI(scope.row.id)"
            />
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
        <el-form-item
          label="出场时间"
          prop="free_parking_expire_at"
          :label-width="formLabelWidth"
        >
          <!-- <el-input v-model="userForm.free_parking_expire_at" autocomplete="off"><el-input> -->
          <!-- format="yyyy 年 MM 月 dd 日 " -->
          <el-date-picker
            v-model="userForm.car_out_at"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期"
          />
          <el-button style="margin-left: 6px" size="small" type="primary" plain @click="userForm.car_out_at=userForm.car_in_at">
           获取入场时间</el-button
          >
        </el-form-item>
        <el-form-item label="备注" prop="memo" :label-width="formLabelWidth">
          <el-input v-model="userForm.memo" autocomplete="off" clearable></el-input>
        </el-form-item>
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
      restaurants: [], // 输入建议
      restaurants2: [], // 输入建议出
      check_car_out: [
        {
          value: 1,
          label: "开启",
        },
        {
          value: 0,
          label: "关闭",
        },
      ],
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
        },
        // {
        //   value: null,
        //   label: '不限'
        // },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              // 重置 start 的时间部分为 00:00:00
              start.setHours(0, 0, 0, 0);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近2天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近3天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近7天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "本周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              const today = start.getDay(); // 获取今天是星期几

              // 计算距离上周一的天数差
              const daysToMonday = (today + 6) % 7;
              start.setTime(start.getTime() - (3600 * 1000 * 24 * (daysToMonday)));

              picker.$emit("pick", [start, end]);
            },
          },
          // {
          //   text: '上一周',
          //   onClick(picker) {
          //     const today = new Date();
          //     const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()); // 上周周日
          //     const start = new Date(end.getTime() - 3600 * 1000 * 24 * 6); // 上周周一
          //     picker.$emit('pick', [start, end]);
          //   }
          // },
          {
            text: "上一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              const today = start.getDay(); // 获取今天是星期几

              // 计算距离上周一的天数差
              const daysToMonday = (today + 6) % 7;
              start.setTime(start.getTime() - (3600 * 1000 * 24 * (7 + daysToMonday)));
              end.setTime(end.getTime() - (3600 * 1000 * 24 * (daysToMonday + 1)));

              picker.$emit("pick", [start, end]);
            },
          },

          {
            text: "前两周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              const today = start.getDay(); // 获取今天是星期几

              // 计算距离上周一的天数差
              const daysToMonday = (today + 6) % 7;
              start.setTime(start.getTime() - (3600 * 1000 * 24 * (14 + daysToMonday)));
              end.setTime(end.getTime() - (3600 * 1000 * 24 * (1 + daysToMonday)));

              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      formLabelWidth: "130px",
      userForm: {
        memo: ''
      },
      myUserForm: {
        member_id: null,
      },
      dialogFormVisible: false,
      title: "",
      total: 0,
      // searchModel: {
      //   page: 1,
      //   pageSize: 10,
      // },
      searchModel: {
        page: 1,
        pageSize: 10,
        search_key: {
          // check_car_out: 0
        },
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
  // watch: {
  //   'searchModel.search_key.member_id'(newId) {
  //     if (newId && newId !== 'undefined') {
  //       // this.searchModel.search_key.member_id = newId;
  //       // this.getCarInOutRecord();
  //       console.log(newId, 'newId');
  //       // this.$router.push(`/member-car/inout-record?id=` + newId)
  //     }
  //   },
  //   '$route.query.id'(newRouteId) {
  //     if (newRouteId && newRouteId !== 'undefined') {
  //       console.log(newRouteId, 'newRouteId');
  //       // this.searchModel.search_key.member_id = newRouteId;
  //       // this.getCarInOutRecord();
  //     }
  //   }
  // },
  mounted() {
    const id = this.$route.query.id;
    if (id && id !== "undefined") {
      this.searchModel.search_key.member_id = id;
      this.getCarInOutRecord();
    } else {
      // this.searchModel.search_key.member_id = ""
      // this.$router.push(`/member-car/inout-record`)
      this.getCarInOutRecord();
    }

    //
    this.restaurants = this.loadAll(); //
    this.restaurants2 = this.loadAll2(); //
  },
  methods: {
    //     onCopy(e){ // 复制成功
    // 　　　　this.$message({
    // 　　　　　　message:'复制成功！',
    // 　　　　　　type:'success'
    // 　　　　})
    // 　　},
    // 　　onError(e){　　 // 复制失败
    // 　　　　this.$message({
    // 　　　　　　message:'复制失败！',
    // 　　　　　　type:'error'
    // 　　　　})
    // 　　},
    // 输入建议
    querySearch(queryString, cb) {
      const restaurants = this.restaurants;
      const results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch2(queryString, cb) {
      const restaurants2 = this.restaurants2;
      const results = queryString
        ? restaurants2.filter(this.createFilter(queryString))
        : restaurants2;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    loadAll() {
      return [
        { value: "1号岗入口" },
        { value: "2号岗入口" },
        { value: "3号岗入口" },
        { value: "4号岗入口" },
        { value: "4号岗露天入口" },
        { value: "5号岗左入口" },
        { value: "5号岗右入口" },
      ];
    },
    loadAll2() {
      return [
        { value: "1号岗出口" },
        { value: "2号岗出口" },
        { value: "3号岗出口" },
        { value: "4号岗出口" },
        { value: "4号岗露天出口" },
        { value: "5号岗左出口" },
        { value: "5号岗右出口" },
      ];
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
      this.searchModel.search_key.car_in_equip_name = item.value;
      this.searchMemberInOut();
    },
    handleSelect2(item) {
      console.log(item);
      this.searchModel.search_key.car_out_equip_name = item.value;
      this.searchMemberInOut();
    },
    // 修改启用状态
    changeStatus(e) {
      console.log(e, "status");
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
            this.getCarInOutRecord();
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
          // 保存
          userApi.updateMemberCarOutManual(this.userForm).then((response) => {
            // 成功提示
            this.$message({
              message: "保存成功",
              type: "success",
            });
            // 关闭对话框
            this.dialogFormVisible = false;
            // 刷新表格
            this.getCarInOutRecord();
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
        // this.title = "新增用户";
      } else {
        this.title = "手动出场";
        // 根据id查询用户数据
        // userApi.getUserById(id).then((response) => {
        //   this.userForm = response.data;
        // });
        // 根据分页筛选
        const item = { ...this.userList.filter((item) => item.id === id)[0] };
        this.userForm = item;
        // this.userForm.memo = '手动出场';
        this.userForm = Object.assign({}, this.userForm, { memo: '手动出场' })
      }
      this.dialogFormVisible = true;
    },
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize;
      this.getCarInOutRecord();
    },
    handleCurrentChange(page) {
      this.searchModel.page = page;
      this.getCarInOutRecord();
    },
    // 查询按钮
    searchMemberInOut() {
      // 方式1
      this.searchModel.search_key.member_id = this.myUserForm.member_id;
      // this.$router.push('/member-car/inout-record?id=' + this.searchModel.search_key.member_id)
      this.searchModel.page = 1;
      this.getCarInOutRecord();
      // console.log(this.userForm.member_id);
      // console.log(this.searchModel);
      // const params = { ...this.searchModel, member_id: this.userForm.member_id }
    },
    // 重置
    clearSearchParams() {
      this.searchModel = {
        page: 1,
        pageSize: 10,
        search_key: {
          // check_car_out: 0
        },
      };
      this.getCarInOutRecord();
      // this.$router.push('/member-car/inout-record')
    },
    // 导出
    exportExcel() {
      require.ensure([], () => {
        const fieldName = [
          "序号",
          "用户名",
          "车牌号",
          "入场设备名称",
          "出场设备名称",
          "入场时间",
          "出场时间",
          "入场设备编号",
          "出场设备编号",
          "性别",
          "手机号",
        ];
        const filterVal = [
          "index",
          "name",
          "plate_number",
          "car_in_equip_name",
          "car_out_equip_name",
          "car_in_at",
          "car_out_at",
          "car_in_equip_code",
          "car_out_equip_code",
          "sex",
          "mobile",
        ];
        // const data = this.userList.map(v => filterVal.map(j => v[j]));
        const data = this.userList.map((v, i) =>
          filterVal.map((j) => {
            if (j === "index") {
              return i;
            } else if (j === "sex") {
              return v[j] === 0 ? "未知" : v[j] === 1 ? "男" : "女";
            } else {
              return v[j];
            }
          })
        );
        const item = this.userList[0];
        console.log(fieldName, data, `${item.name}`);
        exportUtil.export_json_to_excel(
          fieldName,
          data,
          `${item.name} - ${new Date().toLocaleString().replaceAll("/", "-")}`
        );
        // exportUtil.export_json_to_excel(fieldName, data, `${item.name} - ${new Date().toLocaleDateString().replaceAll('/', '-')}`);
      });
    },
    // 查询请求
    getCarInOutRecord(e, params) {
      // const queryParams = params || this.searchModel
      // let queryParams
      // console.log(e, params);
      // if (params) {
      //   queryParams = params;
      // } else {
      //   queryParams = this.searchModel
      // }
      userApi.getCarInOutRecord(this.searchModel).then((response) => {
        //
        this.userList = response.data.data;
        this.total = response.data.total;
        const { current_page, data, last_page } = response.data;
        if (data.length === 0 && current_page > last_page) {
          this.searchModel.page = last_page
          userApi.getCarInOutRecord(this.searchModel).then((response) => {
            this.userList = response.data.data;
            this.total = response.data.total;
          })
        }
      });
    },
  },
};
</script>

<style scoped>
/* #search .el-input {
  width: 200px;
  margin-right: 10px;
}

.el-dialog .el-input {
  width: 85%;
} */
.el-table__row .el-table__cell,
.el-tooltip,
.el-button .cell {
  white-space: nowrap;
  /* width: 50px; */
  overflow: hidden;
  text-overflow: ellipsis; /* 显示省略号 */
}
#search {
  display: flex;
  flex-wrap: wrap;
  .el-input {
    width: 190px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .el-date-editor {
    /*margin-bottom: 10px; */
  }
}
.el-dialog .el-input {
  width: 75%;
}
</style>
