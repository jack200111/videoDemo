<template>
  <!-- class="dashboard-container" -->
  <div>
    <!-- panel-group -->
    <div class="dashboard-editor-container">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="24" :lg="14">
          <div class="chart-wrapper card_box">
            <span class="title">
              <span>
                <img src="~@/assets/img/left-border.png" class="img" alt="">
                <span style="margin-left: 10px">东进会员分析表</span>
              </span>
            </span>
            <div class="flex_member">
              <div class="member">
                <memberBox
                  ref="memberBox"
                  :chart-data="memberBox"
                  refname="memberBox"
                />
              </div>
              <div class="member_txt_box">
                <div class="flex">
                  <div class="item">
                    <div class="num">
                      <count-to
                        :start-val="0"
                        :end-val="memberObj.member"
                        :duration="1500"
                      />
                    </div>
                    <div>已注册会员</div>
                  </div>
                  <div class="item">
                    <div class="num">
                      <count-to
                        :start-val="0"
                        :end-val="memberObj.car"
                        :duration="1500"
                      />
                    </div>
                    <div>注册车辆数</div>
                  </div>
                  <div class="item">
                    <div class="num">
                      <count-to
                        :start-val="0"
                        :end-val="memberObj.car_not_out"
                        :duration="1500"
                      />
                    </div>
                    <div>目前在场车辆</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="10">
          <div class="chart-wrapper card_box">
            <span class="title">
              <span>
                <img src="~@/assets/img/left-border.png" class="img" alt="">
                <span style="margin-left: 10px">进出场车次</span>
              </span>
              <span class="date">
                <el-date-picker
                  v-model="timePeriod"
                  type="daterange"
                  size="small"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions2"
                  @change="ChangeMemberTime"
                />
              </span>
            </span>
            <div class="entrance-main">
              <div class="item">
                <div class="num">
                  <count-to
                    :start-val="0"
                    :end-val="memberObj.car_in"
                    :duration="1500"
                  />
                </div>
                <div>进场车次</div>
              </div>
              <div class="item">
                <!-- <div class="num">{{ memberObj.car_out }}</div> -->
                <div class="num">
                  <count-to
                    :start-val="0"
                    :end-val="memberObj.car_out"
                    :duration="1500"
                  />
                </div>
                <div>离场车次</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row
        style="background: #fff; padding: 14px 14px 0; margin-bottom: 24px"
        class="card_box"
      >
        <span class="title">
          <span>
            <img src="~@/assets/img/left-border.png" class="img" alt="">
            <span style="margin-left: 10px">月度注册统计(总)</span>
          </span>
          <span class="date">
            <el-date-picker
              v-model="monthTime"
              type="month"
              size="small"
              placeholder="选择日期时间"
              format="yyyy - MM 月"
              align="right"
              @change="getMonthMember"
            />
          </span>
        </span>
        <monthMember ref="monthMember" :chart-data="monthMember" refname="monthMember" />
      </el-row>
      <el-row
        style="background: #fff; padding: 14px 14px 0; margin-bottom: 24px"
        class="card_box"
      >
        <span class="title">
          <span>
            <img src="~@/assets/img/left-border.png" class="img" alt="">
            <span style="margin-left: 10px">各出入口通行情况</span>
          </span>
          <span class="date">
            <el-date-picker
              v-model="timePeriod2"
              type="daterange"
              size="small"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions2"
              @change="changeInout"
            />
          </span>
        </span>
        <inOutNum ref="inOutNum" :chart-data="inOutNum" refname="inOutNum" />
      </el-row>
      <el-row
        style="background: #fff; padding: 14px 14px 0; margin-bottom: 24px"
        class="card_box"
      >
        <span class="title">
          <span>
            <img src="~@/assets/img/left-border.png" class="img" alt="">
            <span style="margin-left: 10px">24小时通行统计(总)</span>
          </span>
          <span class="date">
            <el-date-picker
              v-model="dayTime"
              type="date"
              size="small"
              placeholder="选择日期时间"
              align="right"
              @change="getDayData"
            />
          </span>
        </span>
        <timeBox ref="timeBox" :chart-data="timeBox" refname="timeBox" />
      </el-row>
      <el-row
        style="background: #fff; padding: 14px 14px 0; margin-bottom: 24px"
        class="card_box"
      >
        <span class="title">
          <span>
            <img src="~@/assets/img/left-border.png" class="img" alt="">
            <span style="margin-left: 10px">月度通行统计(总)</span>
          </span>
          <span class="date">
            <el-date-picker
              v-model="monthTime"
              type="month"
              size="small"
              placeholder="选择日期时间"
              format="yyyy - MM 月"
              align="right"
              @change="getMonthData"
            />
          </span>
        </span>
        <monthBox ref="monthBox" :chart-data="monthBox" refname="monthBox" />
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper card_box">
            <span class="title">
              <span>
                <img src="~@/assets/img/left-border.png" class="img" alt="">
                <span style="margin-left: 10px">每日停留时长分析</span>
              </span>
              <span class="date">
                <el-date-picker
                  v-model="day"
                  type="date"
                  size="small"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions"
                  @change="changeDay"
                />
              </span>
            </span>
            <stopHoursBox
              ref="stopHoursBox"
              :chart-data="stopHoursBox"
              refname="stopHoursBox"
            />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper card_box">
            <span class="title">
              <span>
                <img src="~@/assets/img/left-border.png" class="img" alt="">
                <span style="margin-left: 10px">每周停留时长分析</span>
              </span>
              <span class="date">
                <el-date-picker
                  v-model="week"
                  type="week"
                  size="small"
                  placeholder="选择周"
                  format="yyyy 第 WW 周"
                  align="right"
                  :picker-options="{ firstDayOfWeek: 1 }"
                  @change="changeWeek"
                />
              </span>
            </span>
            <stopWeekBox
              ref="stopWeekBox"
              :chart-data="stopWeekBox"
              refname="stopWeekBox"
            />
          </div>
        </el-col>
      </el-row>
      <!-- gutter边距  lg份量-->
      <el-row :gutter="24">
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper card_box">
            <span class="title">
              <span>
                <img src="~@/assets/img/left-border.png" class="img" alt="">
                <span style="margin-left: 10px">每月停留时长分析</span>
              </span>
              <span class="date">
                <el-date-picker
                  v-model="month"
                  type="month"
                  size="small"
                  placeholder="选择月"
                  format="yyyy - MM 月"
                  align="right"
                  @change="changeMonth"
                />
              </span>
            </span>
            <stopMouthBox
              ref="stopMouthBox"
              :chart-data="stopMouthBox"
              refname="stopMouthBox"
            />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper card_box">
            <span class="title">
              <span>
                <img src="~@/assets/img/left-border.png" class="img" alt="">
                <span style="margin-left: 10px">每年停留时长分析</span>
              </span>
              <span class="date">
                <el-date-picker
                  v-model="year"
                  type="year"
                  size="small"
                  placeholder="选择周"
                  format="yyyy 年"
                  align="right"
                  @change="changeYear"
                />
              </span>
            </span>
            <stopYearBox
              ref="stopYearBox"
              :chart-data="stopYearBox"
              refname="stopYearBox"
            />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import inOutNum from "./dashboard/inOutNum";
import memberBox from "./dashboard/memberBox";
import monthBox from "./dashboard/monthBox";
import monthMember from "./dashboard/monthMember";
import timeBox from "./dashboard/timeBox";
import stopHoursBox from "./dashboard/stopHoursBox";
import stopWeekBox from "./dashboard/stopWeekBox";
import stopYearBox from "./dashboard/stopYearBox";
import stopMouthBox from "./dashboard/stopMouthBox";
import CountTo from "vue-count-to";

import { dateFormat } from "@/utils";
import chartApi from "@/api/chart";
const lineChartData = {
  inOutNum: {
    columns_in: [0],
    columns_out: [0],
    rows: ["一号岗", "二号岗", "三号岗"],
  },
  // 会员
  memberBox: {
    man: 0,
    woman: 0,
  },
  // 月份
  monthBox: {
    columns_in: [0],
    columns_out: [0],
    rows: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
    ],
  },
  // 月度会员注册
  monthMember: {
    count: [0],
    rows: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
    ],
  },
  // 24小时
  timeBox: {
    columns_in: [0],
    columns_out: [0],
    rows: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
    ],
  },
  // 停留小时
  stopHoursBox: {
    columns_time: [0],
    rows: ["1小时内", "1-3小时", "3-5小时", "5小时以上"],
  },
  // 停留周
  stopWeekBox: {
    columns_time: [0],
    rows: ["1小时内", "1-3小时", "3-5小时", "5小时以上"],
  },
  // 停留月
  stopMouthBox: {
    columns_time: [0],
    rows: ["1小时内", "1-3小时", "3-5小时", "5小时以上"],
  },
  // 停留年
  stopYearBox: {
    columns_time: [0],
    rows: ["1小时内", "1-3小时", "3-5小时", "5小时以上"],
  },
};

export default {
  name: "Dashboard",
  components: {
    memberBox,
    inOutNum,
    monthBox,
    monthMember,
    timeBox,
    stopHoursBox,
    stopWeekBox,
    stopMouthBox,
    stopYearBox,
    CountTo,
  },
  data() {
    const startTime = dateFormat("YYYY-mm-dd", new Date()) + " 00:00:00";
    let endTime = new Date();
    endTime = dateFormat("YYYY-mm-dd", endTime) + " 23:59:59";
    return {
      timePeriod: [startTime, endTime],
      timePeriod2: [startTime, endTime],
      memberObj: {
        statistic_name: "东进会员分析",
        member: 888, // 已注册会员
        member_man: 247, // 男
        member_woman: 19, // 女
        car: 1055, // 注册车辆数
        car_in: 125, // 进场车次
        car_out: 88, // 出场车次
        car_not_out: 40, // 目前在场车辆数
      },
      inOutNum: lineChartData.inOutNum,
      memberBox: lineChartData.memberBox,
      monthBox: lineChartData.monthBox,
      monthMember: lineChartData.monthMember,
      timeBox: lineChartData.timeBox,
      stopHoursBox: lineChartData.stopHoursBox,
      stopWeekBox: lineChartData.stopWeekBox,
      stopMouthBox: lineChartData.stopMouthBox,
      stopYearBox: lineChartData.stopYearBox,
      date: new Date(),
      dayTime: new Date(),
      monthTime: new Date(),
      day: new Date(),
      week: new Date(),
      month: new Date(),
      year: new Date(),
      pickerOptions2: {
        disabledDate(time) {
          // return time.getTime() < new Date("2023-12-21").getTime();
          // 原来的禁用逻辑
          const originalDisabled =
            time.getTime() < new Date("2023-12-20").getTime();

          // 新增的禁用条件：明天及以后不可选
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          const disableAfterTomorrow = time.getTime() >= tomorrow.getTime();

          // 返回两个条件的逻辑与
          return originalDisabled || disableAfterTomorrow;
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setHours(0, 0, 0, 0);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const start = new Date();
              start.setHours(0, 0, 0, 0); // 设置为当天的00:00:00
              const end = new Date(start.getTime() - 1); // 获取昨日的最后一毫秒
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "前天",
            onClick(picker) {
              const start = new Date();
              start.setHours(0, 0, 0, 0); // 设置为当天的00:00:00
              const end = new Date(start.getTime() - 1); // 获取昨日的最后一毫秒
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
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
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  mounted() {
    // 获取会员分析
    this.getMember(this.timePeriod[0], this.timePeriod[1]);
    // 获取出入口通行
    this.getInOutNum(this.timePeriod2[0], this.timePeriod2[1]);
    this.getMonthData(this.monthTime);
    this.getMonthMember(this.monthTime)
    this.getDayData(this.dayTime);
    // 初始化停留时长
    this.initGetDate();
  },
  methods: {
    // 获取会员分析
    getMember(begin_at, end_at) {
      chartApi.getChartMember(begin_at, end_at).then((response) => {
        console.log(response, "response");
        if (response.code === 0) {
          this.memberObj = response.data;
          this.memberBox.man = response.data.member_man;
          this.memberBox.woman = response.data.member_woman;
        }
      });
    },
    // 修改进场场时间
    ChangeMemberTime(val) {
      console.log(val, "val");
      if (!val) {
        // 初始化
        return;
      }
      var startTime = dateFormat("YYYY-mm-dd HH:MM:SS", val[0]);
      console.log(startTime, "startTime");
      var endTime = dateFormat("YYYY-mm-dd 23:59:59", val[1]);
      console.log(endTime, "endTime");
      this.getMember(startTime, endTime);
    },
    // 修改出入口通行
    changeInout(val) {
      console.log(val, "val");
      if (!val) {
        // 初始化
        return;
      }
      var startTime = dateFormat("YYYY-mm-dd HH:MM:SS", val[0]);
      console.log(startTime, "startTime");
      var endTime = dateFormat("YYYY-mm-dd 23:59:59", val[1]);
      console.log(endTime, "endTime");
      this.getInOutNum(startTime, endTime);
    },
    // 获取出入口通行
    getInOutNum(begin_at, end_at) {
      chartApi
        .getChartInout(begin_at, end_at)
        .then((response) => {
          if (response.code === 0) {
            this.inOutNum.rows = response.data.equip_name_list;
            this.inOutNum.columns_in = response.data.in;
            console.log(response.data.in, "response.data.in");
            this.inOutNum.columns_out = response.data.out;
          } else {
            // this.loading = false;
          }
        })
        .catch(() => {
          this.$refs.inOutNum.hiddenLoading();
          // this.loading = false;
        });
    },

    // 获取24小时
    getDayData(input_time) {
      console.log(input_time, "input_time");
      if (!input_time) {
        // 初始化
        return;
      }
      // 获取前一天的日期
      var endTime = new Date(input_time);
      endTime.setDate(endTime.getDate() + 1);
      endTime.setHours(0, 0, 0, 0);
      endTime = dateFormat("YYYY-mm-dd HH:MM:SS", endTime);
      this.$refs.timeBox.setLoading();
      chartApi
        .getChartInOutHour(endTime)
        .then((response) => {
          if (response.code === 0) {
            this.timeBox.rows = response.data.time_text_list.reverse();
            this.timeBox.columns_in = response.data.in.reverse();
            console.log(response.data.in, "response.data.in");
            this.timeBox.columns_out = response.data.out.reverse();
            this.$refs.timeBox.hiddenLoading();
          } else {
            this.$refs.timeBox.hiddenLoading();
            this.loading = false;
          }
        })
        .catch(() => {
          this.$refs.timeBox.hiddenLoading();
          // this.loading = false;
        });
    },
    // 获取1个月通行
    getMonthData(input_time) {
      console.log(input_time, "input_time");
      if (!input_time) {
        // 初始化
        return;
      }
      // this.timePeriod = val;
      // var endTime = dateFormat("YYYY-mm-dd HH:MM:SS", val);
      this.$refs.monthBox.setLoading();
      // 获取本月的日期范围
      var currentMonth = input_time;
      // 设置为当月第一天
      var firstDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
      );
      console.log(firstDayOfMonth, 'firstDayOfMonth');
      firstDayOfMonth = dateFormat("YYYY-mm-dd HH:MM:SS", firstDayOfMonth);
      // 结束时间
      chartApi
        .getChartInOutDay(firstDayOfMonth)
        .then((response) => {
          if (response.code === 0) {
            this.monthBox.rows = response.data.time_text_list;
            // this.monthBox.rows = response.data.time_text_list.reverse();
            this.monthBox.rows = this.monthBox.rows.map(function(element) {
              // return element.replace(/-/g, '/');
              return element;
            });
            this.monthBox.columns_in = response.data.in;
            // this.monthBox.columns_in = response.data.in.reverse();
            console.log(response.data.in, "response.data.in");
            this.monthBox.columns_out = response.data.out;
            // this.monthBox.columns_out = response.data.out.reverse();
            this.$refs.monthBox.hiddenLoading();
          } else {
            this.$refs.monthBox.hiddenLoading();
            this.loading = false;
          }
        })
        .catch(() => {
          this.$refs.monthBox.hiddenLoading();
          // this.loading = false;
        });
    },
    // 获取1个月会员注册
    getMonthMember(input_time) {
      console.log(input_time, "input_time");
      if (!input_time) {
        // 初始化
        return;
      }
      // this.timePeriod = val;
      // var endTime = dateFormat("YYYY-mm-dd HH:MM:SS", val);
      this.$refs.monthMember.setLoading();
      // 获取本月的日期范围
      var currentMonth = input_time;
      // 设置为当月第一天
      var firstDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
      );
      console.log(firstDayOfMonth, 'firstDayOfMonth');
      firstDayOfMonth = dateFormat("YYYY-mm-dd HH:MM:SS", firstDayOfMonth);
      // 结束时间
      chartApi
        .getChartMemberRegisterMonth(firstDayOfMonth)
        .then((response) => {
          if (response.code === 0) {
            this.monthMember.rows = response.data.time_text_list; // 行
            this.monthMember.count = response.data.count; // 列
            // console.log(response.data.count, "response.data.count");
            this.$refs.monthMember.hiddenLoading();
          } else {
            this.$refs.monthMember.hiddenLoading();
            this.loading = false;
          }
        })
        .catch(() => {
          this.$refs.monthMember.hiddenLoading();
          // this.loading = false;
        });
    },
    // 初始化停留时长
    initGetDate() {
      // 获取当前日期
      const currentDate = new Date();
      // 获取前一天的日期
      this.changeDay(currentDate);
      // ------ 获取前七天的日期
      // 获取当前日期是星期几
      let currentDay = currentDate.getDay();
      // 如果当前日期是星期天 (0)，调整为星期一 (1)
      if (currentDay === 0) {
        currentDay = 1;
      }
      let firstDayOfWeek = new Date(currentDate);
      firstDayOfWeek.setDate(currentDate.getDate() - currentDay + 1); // 将日期调整到本周的第一天（星期一为一周的第一天）
      firstDayOfWeek = dateFormat("YYYY-mm-dd HH:MM:SS", firstDayOfWeek); // 将日期调整到本周的第一天（星期一为一周的第一天）
      // 结束时间
      var dayBegin_at = currentDate;
      dayBegin_at.setDate(currentDate.getDate() + 7);
      dayBegin_at = dateFormat("YYYY-mm-dd HH:MM:SS", dayBegin_at);
      this.getTimeData(firstDayOfWeek, dayBegin_at, this.stopWeekBox);
      // ------ 获取前三十天的日期
      // 获取本月的日期范围
      var currentMonth = new Date();
      // 设置为当月第一天
      var firstDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
      );
      this.changeMonth(firstDayOfMonth);

      // ------ 获取前一年的日期
      var year = new Date(currentDate);
      // 设置为当年第一天
      var firstDayOfYear = new Date(year.getFullYear(), 0, 1);
      this.changeYear(firstDayOfYear);
    },
    // 修改年份停留时长
    changeYear(val) {
      if (!val) {
        return;
      }
      console.log(val, "changeYear");
      // 结束时间
      var dayBegin_at = new Date(val);
      dayBegin_at.setFullYear(val.getFullYear() + 1);
      dayBegin_at = dateFormat("YYYY-mm-dd HH:MM:SS", dayBegin_at);
      // 选择时间
      const selectTime = dateFormat("YYYY-mm-dd HH:MM:SS", new Date(val));
      this.getTimeData(selectTime, dayBegin_at, this.stopYearBox);
    },
    // 修改月份停留时长
    changeMonth(val) {
      if (!val) {
        return;
      }
      console.log(val);
      // const selectTime = dateFormat("YYYY-mm-dd", val);
      // this.month = val
      // var month = new Date(val);
      // month.setDate(val.getDate() - 30);
      // const monthBegin_at = dateFormat("YYYY-mm-dd", month);
      // this.getMonthData(monthBegin_at, selectTime, this.stopMouthBox)
      // 结束时间
      var dayBegin_at = new Date(val);
      dayBegin_at.setMonth(val.getMonth() + 1);
      dayBegin_at = dateFormat("YYYY-mm-dd HH:MM:SS", dayBegin_at);
      // 选择时间
      const selectTime = dateFormat("YYYY-mm-dd HH:MM:SS", new Date(val));
      this.getTimeData(selectTime, dayBegin_at, this.stopMouthBox);
    },
    // 修改周停留时长
    changeWeek(val) {
      if (!val) {
        return;
      }
      // 获取前七天的日期
      console.log(val);
      // 结束时间
      var dayBegin_at = new Date(val);
      dayBegin_at.setDate(val.getDate() + 6);
      dayBegin_at = dateFormat("YYYY-mm-dd HH:MM:SS", dayBegin_at);
      // 选择时间
      let selectTime = new Date(val);
      selectTime.setDate(val.getDate() - 1);
      selectTime = dateFormat("YYYY-mm-dd HH:MM:SS", selectTime);
      this.getTimeData(selectTime, dayBegin_at, this.stopWeekBox);
    },
    // 修改天停留时长
    changeDay(val) {
      //
      if (!val) {
        return;
      }
      var endTime = new Date(val);
      endTime.setDate(endTime.getDate() + 1);
      endTime.setHours(0, 0, 0, 0);
      endTime = dateFormat("YYYY-mm-dd HH:MM:SS", endTime);
      // 选择时间
      const selectTime = dateFormat(
        "YYYY-mm-dd HH:MM:SS",
        new Date(val.setHours(0, 0, 0, 0))
      );
      this.getTimeData(selectTime, endTime, this.stopHoursBox);
    },
    // 获取停留时长
    getTimeData(begin_at, end_at, obj) {
      // this.$refs.monthBox.loadingSet();
      // this.loading = true;
      // this.noneData = false
      // [400, 500, 600, 380]
      // this.loading = true;
      // this.noneData = false
      // setTimeout(() => {
      //   obj.series[0].data = [40, 116, 50, 100]
      // }, 2000)

      // if (this.loading) {
      //   // this.chartres.yAxis.data = response.data.equip_name_list;
      //   // console.log(response.data.in, "response.data.in");
      //   this.loading = false;
      //   return
      // }
      chartApi
        .getChartStayTime(begin_at, end_at)
        .then((response) => {
          // console.log(response, "response");
          if (response.code === 0) {
            // this.loading = false;
            // obj = response.data;
            // const a = obj;
            // obj.xAxis.data = response.data.time_text_list;
            obj.columns_time = response.data.stay_count;
            // console.log(response.data.in, "response.data.in");
            // obj.series[1].data = response.data.out;
            // obj.yAxis.data = response.data.equip_name_list;
            // const sum1 = obj.series[0].data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            // const sum2 = obj.series[1].data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            // if (sum1 + sum2 === 0) {
            //   obj.series[0].data = []
            //   obj.series[1].data = []
            //   this.noneData = true
            // }
            // noneData
            // const val1 = Math.max(...response.data.in);
            // const val2 = Math.max(...response.data.out);
            // const max = val1 > val2 ? val1 : val2
            // obj.xAxis.max = max
          } else {
            // this.$refs.monthBox.hiddenLoading();
            // this.loading = false;
          }
        })
        .catch(() => {
          // this.$refs.monthBox.hiddenLoading();
          // this.loading = false;
        });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-date-editor.el-input__inner {
  width: 330px;
}

.dashboard-editor-container {
  padding: 24px 24px 12px;
  background-color: rgb(240, 242, 245);
  position: relative;
  // 头部
  .title {
    color: #333;
    font-size: 18px;
    height: 20px;
    line-height: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-between;
    font-weight: 600;
    .date {
      margin-top: 5px;
    }
    span {
      display: flex;
      align-items: center;
      span {
        margin-top: 3px;
      }
    }
    .img {
      margin-left: 10px;
    }
  }
  // 卡片背景色
  .chart-wrapper {
    background: #fff;
    // padding: 12px 12px 0;
    padding: 14px 14px 0;
    margin-bottom: 24px;
  }
  // .chart-wrapper2 {
  //   background: #fff;
  //   padding: 12px 8px 0;
  //   border-radius: 4px;
  // }
  // 会员分析盒子
  .flex_member {
    display: flex;
    .member {
      width: 31%;
      padding-bottom: 10px;
    }
    .member_txt_box {
      flex: 1;
      margin-top: 20px;
    }
    // 文字盒子
    .flex {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding-top: 25px;
      .item {
        color: #333;
        width: 25%;
        text-align: center;
        font-size: 20px;
        .num {
          color: #2ab07a;
          font-size: 32px;
          margin-bottom: 20px;
          font-weight: 600;
        }
      }
    }
  }
  // 进出场
  .entrance-main {
    height: 170px;
    color: hsl(104, 53%, 63%);
    display: flex;
    justify-content: space-between;
    align-items: center;

    // margin-top: 46px;
    .item {
      // padding-top: 30px;
      color: #333;
      // flex: 1;
      width: 50%;
      // width: 16.6%;
      text-align: center;
      font-size: 20px;
      .num {
        color: #2ab07a;
        font-size: 32px;
        margin-bottom: 20px;
        font-weight: 600;
      }
    }
  }
  // 背景
  .card_box {
    border-radius: 12px;
    box-shadow: 0 2px 6px #0000001a;
  }
  .card_box:hover {
    box-shadow: 0 4px 14px hsla(0, 0%, 0%, 0.100);
    // box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    transition: all ease 0.3s;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
<!-- <style lang="scss" scoped>
.panel-group {
  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 200px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style> -->
