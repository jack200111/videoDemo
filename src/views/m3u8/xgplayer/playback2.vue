<template>
  <!-- class="dashboard-container" -->
  <!-- panel-group -->
  <div class="dashboard-editor-container">
    <!-- 左侧窗口 -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="18">
        <div class="chart-wrapper card_box left_box">
          <!-- 窗口显示区域 -->
          <!-- @destroyed="handleDestroyed" -->
          <!-- 默认自动播放 :autoplay="true" -->
          <!-- 默认直播 :islive="true" -->
          <!-- :videoid="videoid" -->
          <div class="top_box">
            <videos-all-videos
              ref="videoBox"
              style="width: 100%; height: 100%"
              :src="videoUrl"
              :islive="false"
              :checkVideoList="checkVideoList"
              :layoutNum="layoutNum"
              @core-event="handleCoreEvent"
              @error="handleError"
              @reloading="handleReloading"
            />
          </div>
          <!-- 选择窗口数目 -->
          <div class="bottom_box">
            <div
              v-for="(item, index) in setImgs"
              :key="index"
              class="margin_right"
              @click="changeLayout(item)"
            >
              <el-button size="mini">{{ item.name }}</el-button>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 右侧选择 -->
      <el-col :xs="24" :sm="24" :lg="6">
        <div class="chart-wrapper chart-wrapper2 card_box">
          <span class="title">
            <span>
              <img src="~@/assets/img/left-border.png" class="img" alt="">
              <span class="text">视频回放列表</span>
            </span>
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
          <div class="entrance-main">
            <div class="item">
              <!-- <el-input
                v-model="filterText"
                placeholder="输入关键字进行过滤"
              /> -->
              <!-- <el-tree
                ref="tree"
                :data="data1"
                show-checkbox
                default-expand-all
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                :props="defaultProps"
                :filter-node-method="filterNode"
              /> -->
              {{ checkDeviceInfoList.map((item) => {
                return {
                  userId: item.userId,
                  sessionID: item.sessionID,
                  isChecked: item.isChecked,
                  videoid: item.videoid,
                }
              }) }}
              <p />
              <div> {{ checkVideoList.map((item) => {
                return {
                  userId: item.userId,
                  sessionID: item.sessionID,
                  isChecked: item.isChecked,
                  videoid: item.videoid,
                }
              }) }}</div>
              <el-checkbox-group v-model="checkDeviceInfoList" :min="0" :max="layoutNum">
                <div v-for="(video) in deviceInfoList" :key="video.label" class="line_checkbox">
                  <el-checkbox v-model="video.isChecked" :disabled="video.isChecked" :label="video" @change="changeVideoIndex(video, $event)">
                    <div class="video-label">{{ video.hlsUrl }}</div>
                  </el-checkbox>
                </div>
              </el-checkbox-group>
              {{ checkVideoList.map((item) => {
                return {
                  userId: item.userId,
                  sessionID: item.sessionID,
                  isChecked: item.isChecked,
                  videoid: item.videoid,
                }
              }) }}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import videoApi from "@/api/video";
// 引入视频子组件
import videosAllVideos from "@/views/m3u8/xgplayer/component/xgplayer-hls.vue";
// import videosAllVideos from "@/views/m3u8/videojs/component/video-hls.vue";
// import videosAllVideos from "@/views/m3u8/components/hls.vue";
import { dateFormat } from "@/utils";
export default {
  name: "Dashboard",
  components: { videosAllVideos },
  data() {
    const startTime = dateFormat("YYYY-mm-dd", new Date()) + " 00:00:00";
    let endTime = new Date();
    endTime = dateFormat("YYYY-mm-dd", endTime) + " 23:59:59";
    return {
      timePeriod: [startTime, endTime],
      videoUrl: '', // http://192.168.0.219:8080/hls/0_1.m3u8
      // 中间播放视频的数组
      checkVideoList: [
        // {
        //   videoid: "01",
        //   userId: "0",
        //   hlsUrl: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8",
        //   sessionID: 1,
        //   channel: "1",
        //   rtmpUrl: "rtmp://192.168.2.165:1935/live/0_1",
        // },
        // {
        //   videoid: "02",
        //   userId: "0",
        //   hlsUrl: "//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8",
        //   sessionID: 2,
        //   channel: "1",
        //   rtmpUrl: "rtmp://192.168.2.165:1935/live/0_1",
        // },
        // {
        //   videoid: "03",
        //   userId: "0",
        //   hlsUrl: "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
        //   sessionID: 3,
        //   channel: "1",
        //   rtmpUrl: "rtmp://192.168.2.165:1935/live/0_1",
        // },
      ],
      // 右侧选中复选框列表
      checkDeviceInfoList: [],
      // 右侧渲染的视频列表
      deviceInfoList: [
        {
          userId: "1",
          hlsUrl: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8",
          sessionID: 1,
          channel: "1",
          rtmpUrl: "1111",
        },
        {
          userId: "1",
          hlsUrl: "//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8",
          sessionID: 2,
          channel: "1",
          rtmpUrl: "2222",
        },
        {
          userId: "1",
          hlsUrl: "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
          sessionID: 3,
          channel: "1",
          rtmpUrl: "3333",
        },
      ],
      // 视频页面的分栏设置
      layoutNum: 4,
      setImgs: [
        {
          name: "1 × 1",
          nums: 1,
        },
        {
          name: "2 × 2",
          nums: 4,
        },
        {
          name: "1 + 5",
          nums: 6,
        },
        {
          name: "1 + 7",
          nums: 8,
        },
        {
          name: "3 × 3",
          nums: 9,
        },
        {
          name: "4 × 4",
          nums: 16,
        },
      ]
      // filterText: '', // 过滤
      // data1: [{
      //   id: 0,
      //   label: '视频列表',
      //   children: [
      //     // {
      //     //   id: 5,
      //     //   label: '二级 2-1'
      //     // }, {
      //     //   id: 6,
      //     //   label: '二级 2-2'
      //     // }
      //   ]
      // }
      // // , {
      // //   id: 3,
      // //   label: '一级 3',
      // //   children: [{
      // //     id: 7,
      // //     label: '二级 3-1'
      // //   }, {
      // //     id: 8,
      // //     label: '二级 3-2'
      // //   }]
      // // }
      // ],
      // defaultProps: {
      //   children: 'children',
      //   label: 'label'
      // }
    };
  },
  watch: {
    // filterText(val) {
    //   this.$refs.tree.filter(val);
    // }
  },
  mounted() {
    this.getStartPush();
  },
  methods: {
    // 切换显示视频数量
    changeLayout({ nums }) {
      // 处理显示视频数
      if (nums < this.checkVideoList.length) {
        // 收集中间播放视频的数组 要销毁的视频id
        const destroyVideoIdList = this.checkVideoList.slice(nums, this.checkVideoList.length).map((item) => item.videoid);
        // 右侧渲染的视频列表 改为可选
        destroyVideoIdList.forEach((videoid) => {
          const item = this.deviceInfoList.find((item) => 'videoPlayer' + item.userId + item.sessionID === videoid);
          item.isChecked = false
        })
        // 销毁视频
        destroyVideoIdList.forEach((id) => {
          this.$refs.videoBox.onDestroy(id);
        });
        // 删除中间播放视频的数组 超过显示窗口的视频
        this.checkVideoList = this.checkVideoList.filter((item, index) => index < nums)
        // 修改右侧选中复选框列表
        this.checkDeviceInfoList = this.checkDeviceInfoList.filter((item) => item.isChecked)
      }
      // 修改显示视频数量
      this.layoutNum = nums;
    },
    // 点击单选框
    changeVideoIndex(video, event) {
      console.log(video, event);
      // 右侧渲染的视频列表 选中添加
      const videoid = 'videoPlayer' + video.userId + video.sessionID
      if (event) {
        // 判断中间播放视频的数组 是否有该视频
        const isExist = this.checkVideoList.filter((item) => item.hlsUrl === video.hlsUrl)[0];
        if (isExist) {
          // this.$refs.videoBox.initPlayer(item.userId + item.sessionID, item.hlsUrl)
          this.$message('此视频已存在', 'error')
          return
        }
        // const videoid = item.userId + item.sessionID
        // 中间播放视频的数组 添加一条视频 并手动添加videoid
        this.checkVideoList = [...this.checkVideoList, ({ ...video, videoid: videoid })]
        // 添加视频实例
        this.$refs.videoBox.initPlayer(videoid, video.hlsUrl)
        // 修改右侧选中复选框
        video.isChecked = true
      } else {
        // 取消勾选
        // 中间播放视频的数组 减去一条视频
        this.checkVideoList = this.checkVideoList.filter((item) => item.videoid !== videoid)
        this.$refs.videoBox.onDestroy(videoid); // 销毁播放视频的数组
      }
    },
    // 请求右侧渲染的视频列表
    getStartPush() {
      videoApi.getLiveList().then((response) => {
        if (response.data.length > 0) {
          // 右侧渲染的视频列表
          this.deviceInfoList = [...this.deviceInfoList, ...response.data]
          return
        }
      });
    },
    // 监听子组件 视频播放
    handleCoreEvent($event) {
      // 处理来自 HlsPlayer 的核心事件
    },
    // 监听子组件 错误
    handleError(error) {
      console.log(error);
      // 处理来自 HlsPlayer 的错误事件
    },
    // 监听子组件 重新加载
    handleReloading() {
      // 处理 HlsPlayer 重新加载事件
    },
    // filterNode(value, data) {
    //   if (!value) return true;
    //   return data.label.indexOf(value) !== -1;
    // }
  },
};
</script>

<style lang="scss" scoped>
.line_checkbox {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 98%; /* 或者根据实际需求调整宽度 */
  .video-label {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle; /* 确保文本垂直居中显示 */
  }
}

.dashboard-editor-container {
  padding: 14px 20px 14px;
  background-color: rgb(240, 242, 245);
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
    .text {
      display: inline-block;
      width: 120px;
    }
    .date {
      margin-top: 5px;
      width: 100%;
      flex: 1;
    }
    span {
      display: flex;
      align-items: center;
      span {
        // margin-top: 3px;
        margin-left: 5px;
      }
    }
    .img {
      margin-left: 10px;
    }
  }
  // 日期选择
  .el-date-editor.el-input__inner {
    // width: 230px;
    width: 100%;
    margin-bottom: 4px;
  }
  .chart-wrapper2 {
    padding: 12px 12px 0;
  }
  // 卡片背景色
  .chart-wrapper {
    background: #fff;
  }
  // 背景
  .card_box {
    // border-radius: 12px;
    border-radius: 0px;
    box-shadow: 0 2px 6px #0000001a;
    height: calc(100vh - (85px + 14px + 14px ));
  }
  .card_box:hover {
    box-shadow: 0 4px 14px hsla(0, 0%, 0%, 0.100);
    // box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    transition: all ease 0.3s;
  }
  .left_box {
    display: flex;
    flex-direction: column;
    // border: 2px solid #1890ff;
    .top_box {
      // background-color: #000;
      flex: 1;
      // width: 100%;
      // height: 100%;
    }
    .bottom_box {
      // height: 30px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .margin_right {
        margin-right: 10px;
        margin-top: 7px;
        margin-bottom: 7px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>
