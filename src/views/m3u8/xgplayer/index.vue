<template>
  <div class="xgplayer-page">
    <div>
      西瓜视频依赖包："xgplayer": "^3.0.16", "xgplayer-hls":
      "^3.0.10"。其他版本貌似会报错
    </div>

    <div class="xgplayer-box">
      <h3>mp3</h3>
      <div id="mse"></div>
      <div class="btn">
        <el-button type="primary" @click="onDestroy('player')">销毁</el-button>
        <el-button type="primary" @click="onReload('player')">重新加载</el-button>
      </div>
    </div>
    <div class="xgplayer-box">
      <h3>m3u8</h3>
      <div id="mse1"></div>
      <div class="btn">
        <el-button type="primary" @click="onDestroy('player1')">销毁</el-button>
        <el-button type="primary" @click="onReload('player1')">重新加载</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import XgPlayer from "xgplayer";
import Player, { Events } from "xgplayer";
import "xgplayer/dist/index.min.css";
import HlsPlugin from "xgplayer-hls";
export default {
  name: "XgplayerPage",
  components: {},
  data() {
    return {
      player: null,
      player1: null,
    };
  },
  computed: {},
  watch: {},
  created() {
    // console.log("西瓜视频");
  },
  mounted() {
    this.init();
    this.init1();
  },
  methods: {
    init() {
      this.player = new XgPlayer({
        id: "mse",
        url: "//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
        // url: 'http://192.168.0.219:8080/hls/0_1.m3u8',
        width: "100%",
        // url: "",
        // width: window.innerWidth,
        // height: window.innerHeight,
        autoplay: true,
        autoplayMuted: true,
        playsinline: true,
        fitVideoSize: "auto",
      });
    },

    init1() {
      const url =
        "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8";
        // '//192.168.0.219:8080/hls/0_1.m3u8'

      // "http://192.168.0.219:8080/hls/0_1.m3u8";
      // "//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8";
      this.player1 = new Player({
        id: "mse1",
        url: url,
        isLive: true,
        playbackRate: false, // 隐藏倍数播放
        autoplay: true, // 自动播放
        autoplayMuted: true,
        playsinline: true,
        // width: "100%",
        // height: "100%",
        volume: 0.6, // 初始音量
        plugins: [HlsPlugin],
      });
      this.player1.on(Events.ERROR, (error) => {
        console.log("error", error);
        // 判断报错类型
        if (error.errorType === "network") {
          console.log("网络链接");
          this.init1(); // 重新请求
          console.log("重新打开", this.player1);
        }
      });
    },
    beforeDestroy() {
      console.log("组件销毁");
      const that = this;
      console.log("player ==== 1", that.player);
      that.player.destroy(true);
      console.log("player ==== 2", that.player);
      // that.player1.once("destroy", () => {
      //   console.log("player1 ==========> destroy");
      // });
      console.log("player1 ==== 1", that.player1);
      that.player1.destroy();
      console.log("player1 ==== 2", that.player1);
    },
    // 销毁
    onDestroy(type) {
      console.log("销毁前", this[type]);
      this[type] && this[type].destroy();
      console.log("销毁后", this[type]);
    },
    // 重新加载
    onReload(type) {
      if (type === "player") {
        console.log("重新加载", this[type]);
        this.init();
      } else if (type === "player1") {
        console.log("重新加载", this[type]);
        this.init1();
      }
      this[type].once("ready", () => {
        setTimeout(function() {
          console.log("ready");
        }, 1000);
      });
      console.log("重新加载后", this[type]);
    },
  }
};
</script>
<style lang="scss" scoped>
.xgplayer-page {
  .xgplayer-box {
    width: 600px;
    margin: 20px auto;
    text-align: center;
    border: 1px solid #ccc;
    box-shadow: 0 0 14px 0 rgba(221, 221, 221, 0.5);
    .btn {
      display: flex;
      padding: 10px;
    }
  }
}
</style>
