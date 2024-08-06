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
              :checkVideoList="checkVideoList"
              :layoutNum="layoutNum"
              @core-event="handleCoreEvent"
              @error="handleError"
              @reloading="handleReloading"
            />
          </div>
          <!-- 选择窗口数目 -->
          <div class="bottom_box">
            <div class="">
              <!-- <el-button class="margin_right" size="mini" @click="changeLive">切换视频模式</el-button> -->
              <el-button class="margin_right" size="mini" @click="testPlay">暂停所选视频</el-button>
              <el-button class="margin_right" size="mini" @click="testPause">播放所选视频</el-button>
              <el-button class="margin_right" size="mini" @click="disposePlay">销毁所选视频</el-button>
              <!-- <el-button class="margin_right" size="mini" @click="replayPlay">重播所选视频</el-button> -->
              <!-- <el-button class="margin_right" size="mini" @click="getStatus">获取播放器状态</el-button> -->
              <el-button class="margin_right" size="mini" @click="replacePlay">替换所选视频</el-button>
              <el-select v-model="replace_play" class="margin_right" placeholder="请选择视频" size="mini">
                <el-option
                  v-for="(item) in replaceVideoList"
                  :key="item.hlsUrl"
                  :label="item.hlsUrl"
                  :value="item.userId + item.sessionID"
                />
              </el-select>
            </div>
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
              <span class="">视频列表</span>
            </span>
            <!-- <span class="date">
              <el-date-picker
                v-model="timePeriod"
                type="daterange"
                size="small"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions2"
                @change="ChangeMemberTime"
              />
            </span> -->
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
              <!-- <p> -->
              <!-- isChecked: item.isChecked, -->
              <!-- 中间checkVideoList: {{ checkVideoList.map((item) => {
                  return {
                    userId: item.userId,
                    sessionID: item.sessionID,
                    videoid: item.userId + item.sessionID,
                  }
                }) }} -->
              <!-- </p> -->
              <p>
                <!-- isChecked: item.isChecked, -->
                <!-- 选中checkDeviceInfoList: {{ checkDeviceInfoList.map((item) => {
                  return {
                    userId: item.userId,
                    sessionID: item.sessionID,
                    videoid: item.videoid,
                  }
                }) }} -->
              </p>
              <!--  :max="layoutNum" -->
              <el-checkbox-group v-model="checkDeviceInfoList" :min="0">
                <div v-for="video in deviceInfoList" :key="video.label" class="line_checkbox">
                  <!-- v-model="video.isChecked"  -->
                  <el-checkbox :label="video" @change="changeVideoIndex(video, $event)">
                    <div class="video-label">{{ video.userId + video.sessionID + ': ' + video.hlsUrl }}</div>
                  </el-checkbox>
                </div>
              </el-checkbox-group>
              <p>
                <!-- isChecked: item.isChecked, -->
                <!-- 列表deviceInfoList {{ deviceInfoList.map((item) => {
                  return {
                    userId: item.userId,
                    sessionID: item.sessionID,
                    videoid: item.videoid,
                  }
                }) }} -->
              </p>
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
// import videosAllVideos from "@/views/m3u8/components/xgplayer-hls.vue";
import videosAllVideos from "@/views/m3u8/aliplayer/component/video-aliplayer_dianbo.vue";
// import videosAllVideos from "@/views/m3u8/components/hls.vue";
export default {
  name: "Dashboard",
  components: { videosAllVideos },
  data() {
    return {
      videoUrl: '', // http://192.168.0.219:8080/hls/0_1.m3u8
      // 子组件ref实例
      playerRefs: {}, // 用于存储所有子组件实例的引用
      // 选择要替换的视频
      replace_play: null,
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
          // hlsUrl: '{"FD":"//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8","OD":"//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8"}', // 清晰度配置
          // hlsUrl: JSON.stringify({ // 清晰度配置
          //   FD: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8',
          //   OD: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8'
          // }),
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
        {
          userId: "1",
          hlsUrl: "http://ivi.bupt.edu.cn/hls/cctv1.m3u8",
          sessionID: 4,
          channel: "1",
          rtmpUrl: "4444",
        },
        {
          hlsUrl: `http://192.168.0.221:85/live?port=1935&app=live&stream=1921683045-1`,
          cameraName: '办公区2',
          userId: "2",
          channel: "1",
          rtmpUrl: "4444",
          sessionID: 8
        },
        {
          hlsUrl: `http://192.168.0.221:85/live?port=1935&app=live&stream=1921683037-1`,
          cameraName: '研发办公区1',
          userId: "2",
          channel: "1",
          rtmpUrl: "4444",
          sessionID: 9
        }
      ],
      // 视频页面的分栏设置
      layoutNum: 1,
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
      ],
      // video1: null,
      // oldVideo: null,
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
  computed: {
    // 获取所有视频实例
    allPlayerInstances() {
      return this.$refs.videoBox.playerInstances;
    },
    // 自动改变布局
    calculateLayoutNum() {
      const length = this.checkDeviceInfoList.length;
      if (length === 1) {
        return 1;
      } else if (length > 1 && length < 4) {
        return 4;
      } else if (length > 4 && length < 9) {
        return 9;
      } else if (length > 9 && length < 16) {
        return 16;
      } else if (length > 16) {
        return 16;
      } else {
        return 4;
      }
    },
    // 替换视频集合
    replaceVideoList() {
      // 过滤掉当前已选择的视频
      return this.deviceInfoList.filter((item) => {
        return !this.checkDeviceInfoList.some((checkItem) => {
          return checkItem.userId === item.userId && checkItem.sessionID === item.sessionID;
        })
      });
      // return this.checkDeviceInfoList.map((item) => {
      //   return {
      //     userId: item.userId,
      //     sessionID: item.sessionID,
      //     isChecked: item.isChecked,
      //     videoid: item.videoid,
      //   }
      // })
    },
  },
  watch: {
    // 监听deviceInfoList的长度变化 由于改变布局
    'checkDeviceInfoList.length': {
      immediate: true,
      handler(newValue) {
        this.layoutNum = this.calculateLayoutNum;
      }
    }
    // filterText(val) {
    //   this.$refs.tree.filter(val);
    // }
  },
  mounted() {
    this.getStartPush();
    // this.checkVideoList.push({ ... this.deviceInfoList[0], options: { ...this.$refs.videoBox.options }}, { ... this.deviceInfoList[1], options: { ...this.$refs.videoBox.options }})
  },
  methods: {
    returnVideo() {
      const parDom = this.$refs.videoBox
      const i = parDom.chooseIndex
      if (i >= this.checkVideoList.length) return { videoid: null, i, parDom }
      const videoid = this.checkVideoList[i].userId + this.checkVideoList[i].sessionID
      return { videoid, parDom, i }
    },
    // 提示函数
    testFn(videoid, msg = '未选择视频') {
      if (!videoid) {
        this.$message.warning(msg)
        return true
      }
    },
    // 测试暂停
    testPlay() {
      const { videoid, parDom } = this.returnVideo()
      if (this.testFn(videoid)) return // 未选择终止
      const dom = parDom.playerRefs[videoid][0]
      dom.pause()
    },
    // 测试播放
    testPause() {
      const { videoid, parDom } = this.returnVideo()
      if (this.testFn(videoid)) return // 未选择终止
      const dom = parDom.playerRefs[videoid][0]
      dom.play()
    },
    // 切换直播或普通模式
    // changeLive() {
    //   const { videoid, parDom } = this.returnVideo()
    //   if (!videoid) {
    //     this.$message('未选择视频', 'error')
    //     return
    //   }
    //   const dom = parDom.playerRefs[videoid][0]
    //   if (dom.options.isLive) {
    //     // 直播模式
    //     dom.options.isLive = !dom.options.isLive
    //     dom.options.skinLayout = this.$refs.videoBox.dianbo_skinLayout
    //   } else {
    //     dom.options.isLive = !dom.options.isLive
    //     dom.options.skinLayout = this.$refs.videoBox.liveSkinLayout
    //   }
    //   console.log(dom.options, 'dom.options');
    //   // this.$message.success()
    // },
    // 重播所选视频
    replayPlay() {
      const { videoid, parDom } = this.returnVideo()
      if (this.testFn(videoid)) return // 未选择终止
      const dom = parDom.playerRefs[videoid][0]
      dom.replay();
      // this.$message.success()
    },
    // 销毁所选视频
    disposePlay() {
      const { videoid } = this.returnVideo()
      if (this.testFn(videoid)) return // 未选择终止
      // const dom = parDom.playerRefs[videoid][0]
      // dom && dom.dispose()
      // 中间播放视频的数组 减去一条视频
      this.checkVideoList = this.checkVideoList.filter((item) => item.userId + item.sessionID !== videoid)
      // 修改右侧选中复选框列表
      this.checkDeviceInfoList = this.checkDeviceInfoList.filter((item) => item.userId + item.sessionID !== videoid)
    },
    // 替换所选视频
    replacePlay() {
      if (!this.replace_play) {
        this.$message.warning('请选择要替换的视频')
        return
      }
      const place_play = this.replaceVideoList.find(item => item.userId + item.sessionID === this.replace_play)
      // this.disposePlay()
      // 是否要销毁?
      // videoid, parDom,
      const { i } = this.returnVideo()
      // 为空直接添加
      if (i >= this.checkVideoList.length) {
        this.checkDeviceInfoList.push(place_play)
        this.checkVideoList.push({ ... place_play })
        return
      }
      // const dom = parDom.playerRefs[videoid][0]
      // 销毁视频
      // dom && dom.dispose()
      // 替换原有视频
      // const changeVideo = place_play
      const oldVideo = this.checkVideoList[i] // 被替换的原视频
      // this.oldVideo = { ...oldVideo }// 替换的旧视频
      const replaceVideoId = oldVideo.userId + oldVideo.sessionID // 保存被替换的原视频id
      // this.video1 = { ...changeVideo }// 替换的原视频
      oldVideo.hlsUrl = place_play.hlsUrl
      oldVideo.rtmpUrl = place_play.rtmpUrl
      oldVideo.userId = place_play.userId
      oldVideo.sessionID = place_play.sessionID
      // 更新右侧checkDeviceInfoList
      this.checkDeviceInfoList = this.checkDeviceInfoList.filter(item => item.userId + item.sessionID !== replaceVideoId) // 右侧取消勾选 被替换的原视频选项
      this.checkDeviceInfoList = [...this.checkDeviceInfoList, this.deviceInfoList.find((item) => item.userId + item.sessionID === place_play.userId + place_play.sessionID)]// 右侧增加勾选 替换的原视频选项

      // 初始化下拉框视频
      this.replace_play = null
    },
    // 获取播放器状态
    getStatus() {
      const { videoid, parDom } = this.returnVideo()
      if (!videoid) {
        this.$message('未选择视频', 'error')
        return
      }
      const dom = parDom.playerRefs[videoid][0]
      const status = dom.getStatus();
      console.log(`getStatus:`, status);
      this.$message.success('播放器状态:' + status)
    },
    // 切换显示视频数量
    changeLayout({ nums }) {
      // 处理显示视频数
      if (nums < this.checkVideoList.length) {
        // 收集中间播放视频的数组 要销毁的视频id
        // const destroyVideoIdList = this.checkVideoList.slice(nums, this.checkVideoList.length).map((item) => item.videoid);
        // 右侧渲染的视频列表 改为可选
        // destroyVideoIdList.forEach((videoid) => {
        //   const item = this.deviceInfoList.find((item) => 'videoPlayer' + item.userId + item.sessionID === videoid);
        //   item.isChecked = false
        // })
        // 销毁视频
        // destroyVideoIdList.forEach((id) => {
        //   this.$refs.videoBox.onDestroy(id);
        // });
        // 删除中间播放视频的数组 超过显示窗口的视频
        this.checkVideoList = this.checkVideoList.filter((item, index) => index < nums)
        // 修改右侧选中复选框列表
        this.checkDeviceInfoList = this.checkDeviceInfoList.filter((item, index) => index < nums)
      }
      // 修改显示视频数量
      this.layoutNum = nums;
      // 修改索引
      this.$refs.videoBox.chooseIndex = this.checkVideoList.length - 1
    },
    // 点击单选框
    async changeVideoIndex(video, event) {
      console.log(video, event);
      // 右侧渲染的视频列表 选中添加
      // const videoid = 'videoPlayer' + video.userId + video.sessionID
      const videoid = video.userId + video.sessionID
      if (event) {
        const isExist = this.checkVideoList.filter((item) => item.hlsUrl === video.hlsUrl)[0];
        // 判断中间播放视频的数组 是否有该视频
        if (isExist) {
          // this.$refs.videoBox.initPlayer(item.userId + item.sessionID, item.hlsUrl)
          // 修改右侧选中复选框列表
          this.checkDeviceInfoList = this.checkDeviceInfoList.filter((item) => item.userId + item.sessionID !== video.userId + video.sessionID)
          this.$message('此视频已存在', 'error')
          return
        }
        // const videoid = item.userId + item.sessionID
        // 中间播放视频的数组 添加一条视频 并手动添加videoid
        this.checkVideoList = [...this.checkVideoList, ({ ...video, videoid: videoid, options: { ...this.$refs.videoBox.options }})]
        // 添加视频实例
        // this.$refs.videoBox.initPlayer(videoid, video.hlsUrl)
        // 修改右侧选中复选框
        // video.isChecked = true
        // 修改索引
        this.$refs.videoBox.chooseIndex = this.checkVideoList.length - 1
      } else {
        // 取消勾选
        // this.disposePlay(videoid)
        // promise模拟睡眠函数等待2秒
        // await new Promise((resolve) => setTimeout(resolve, 4000));
        // 中间播放视频的数组 减去一条视频
        this.checkVideoList = this.checkVideoList.filter((item) => item.userId + item.sessionID !== videoid)
        // this.$refs.videoBox.onDestroy(videoid); // 销毁播放视频的数组
        // 修改右侧选中复选框列表
        this.checkDeviceInfoList = this.checkDeviceInfoList.filter((item) => item.userId + item.sessionID !== videoid)
        // 修改索引
        this.$refs.videoBox.chooseIndex = this.$refs.videoBox.chooseIndex - 1
      }
    },
    // 请求右侧渲染的视频列表
    getStartPush() {
      videoApi.getLiveList().then((response) => {
        if (response.data.length > 0) {
          // 右侧渲染的视频列表
          this.deviceInfoList = [...this.deviceInfoList, ...response.data].map((item) => {
            return {
              ...item,
              options: { ...this.$refs.videoBox.options }
            }
          })
          this.checkDeviceInfoList.push(this.deviceInfoList[0], this.deviceInfoList[1])
          this.checkVideoList.push({ ...this.deviceInfoList[0] }, { ...this.deviceInfoList[1] })
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

// 右侧复选框
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
// 右侧时间
.el-date-editor.el-input__inner {
  width: 330px;
}
// 父级容器
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
    .date {
      margin-top: 5px;
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
  .chart-wrapper2 {
    padding: 14px 14px 0;
  }
  // 卡片背景色
  .chart-wrapper {
    background: #fff;
  }
  // 背景
  .card_box {
    // border-radius: 12px;
    // border-radius: 0px;
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
        // border: 0px;
      }
      .el-button{
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
      }
      ::v-deep .el-input__inner{
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>
