<template>
  <div class="">
    <span>1</span>
    <!-- <div id="mse"></div> -->
    <div class="xgplayer-page">
      <div class="xgplayer-box">
        <h3>m3u8</h3>
        <div id="mse1" ref="mse1" />
        <div class="btn">
          <el-button type="primary" @click="onDestroy('player1')">销毁</el-button>
          <el-button type="primary" @click="onReload('player1')">重新加载</el-button>
        </div>
      </div>
    </div>
    <div class="xgplayer-page">
      <div class="xgplayer-box">
        <h3>m3u8</h3>
        <div id="mse2" ref="mse2" />
        <div class="btn">
          <el-button type="primary" @click="onDestroy('player2')">销毁</el-button>
          <el-button type="primary" @click="onReload('player2')">重新加载</el-button>
        </div>
      </div>
    </div>
    <div>
      <p>
        <a href="https://h5player.bytedance.com/plugins/extension/xgplayer-hls.html#%E5%AE%89%E8%A3%85">hls3.0文档地址: https://h5player.bytedance.com/plugins/extension/xgplayer-hls.html#%E5%AE%89%E8%A3%85</a>
      </p>
      <a href="https://h5player.bytedance.com/examples/">hls示例地址: https://h5player.bytedance.com/examples/</a>
      <p>
        <a href="https://v2.h5player.bytedance.com/plugins/#xgplayer-hls">hls2.0文档地址: https://v2.h5player.bytedance.com/plugins/#xgplayer-hls</a>
      </p>
    </div>
  </div>
</template>

<script>
import Player, { Events } from 'xgplayer'
import HlsPlugin from 'xgplayer-hls'

export default {
  data() {
    return {
      muted: true,
      player1: null,
      player2: null,
    };
  },
  mounted() {
    this.init1()
    this.init2()
    this.onCanPlay()
  },
  methods: {

    init1() {
      const playerConfig = {
        url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8',
        // url: '//192.168.0.219:8080/hls/0_1.m3u8',
        autoplay: true, // 自动播放
        id: "mse1",
        hls: {
          targetLatency: 10, // 直播目标延迟，默认 10 秒
          maxLatency: 20, // 直播允许的最大延迟，默认 20 秒
          disconnectTime: 0 // 直播断流时间，默认 0 秒，（独立使用时等于 maxLatency）
        },
        on: {
          'core_event': ({ eventName, ...rest }) => {
            console.log(eventName, 'eventName 事件名');
            console.log(rest, 'hls 事件回调函数参数');
          },
          ERROR: (error) => {
            console.warn(error, 'error');
          }
        }
      };

      if (document.createElement('video').canPlayType('application/vnd.apple.mpegurl')) {
        // 原生支持 HLS 播放
        playerConfig.isLive = true;
      } else if (HlsPlugin.isSupported()) {
        playerConfig.plugins = [HlsPlugin];
        playerConfig.isLive = false;
      }
      this.player1 = new Player(playerConfig);
    },
    onCanPlay() {
      // 当视频可以播放时，检查是否需要取消静音
      if (!this.muted) {
        this.$refs.mse.muted = false;
        this.$refs.mse.play();
      }
    },
    playVideo() {
      // 用户交互后播放视频，取消静音
      this.muted = false;
      this.$nextTick(() => {
        this.$refs.mse.play().catch(error => {
          console.error('播放视频时发生错误:', error);
        });
      });
    },
    init2() {
      // this.player1 = new Player({
      //   // url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8',
      //   // url: '//192.168.0.219:8080/hls/0_1.m3u8',
      //   plugins: [HlsPlugin],
      //   isLive: true, // 直播
      //   autoplay: true, // 自动播放
      //   hls: {
      //     targetLatency: 10, // 直播目标延迟，默认 10 秒
      //     maxLatency: 20, // 直播允许的最大延迟，默认 20 秒
      //     disconnectTime: 0 // 直播断流时间，默认 0 秒，（独立使用时等于 maxLatency）
      //   }
      //   // 网络请求
      //   // hls: {
      //   //   retryCount: 3, // 重试 3 次，默认值
      //   //   retryDelay: 1000, // 每次重试间隔 1 秒，默认值
      //   //   loadTimeout: 10000, // 请求超时时间为 10 秒，默认值
      //   //   fetchOptions: {
      //   //     // 该参数会透传给 fetch，默认值为 undefined
      //   //     mode: 'cors'
      //   //   }
      //   // }
      // })
      if (document.createElement('video').canPlayType('application/vnd.apple.mpegurl')) {
        // 原生支持 hls 播放
        this.player2 = new Player({
          id: "mse2",
          autoplay: true, // 自动播放
          url: '//192.168.0.219:8080/hls/0_1.m3u8',
        })
      } else if (HlsPlugin.isSupported()) { // 第一步
        this.player2 = new Player({
          id: "mse2",
          // el: document.querySelector('.player1'),
          autoplay: true, // 自动播放
          isLive: true, // false
          playbackRate: false,
          url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8', // hls 流地址
          // url: '//192.168.0.219:8080/hls/0_1.m3u8',
          plugins: [HlsPlugin] // 第二步
        })
      }
      this.player2.on('core_event', ({ eventName, ...rest }) => { // eventName: hls 事件名; rest: hls 事件回调函数参数
        console.log(eventName, 'eventName 事件名');
        console.log(rest, 'hls 事件回调函数参数');
      })
      this.player2.on(Events.ERROR, (error) => {
        // xgplayer 中的 Errors 对象
        console.warn(error, 'error');
      })
    },
    // 销毁
    onDestroy(type) {
      console.log("销毁前", this[type]);
      this[type] && this[type].destroy();
      console.log("销毁后", this[type]);
    },
    // 重新加载
    onReload(type) {
      if (type === "player1") {
        console.log("重新加载", this[type]);
        this.init();
      } else if (type === "player2") {
        console.log("重新加载1", this[type]);
        this.init2();
      }
      this[type].once("ready", () => {
        setTimeout(function() {
          console.log("ready");
        }, 1000);
      });
      console.log("重新加载后", this[type]);
    },
  }
}
</script>

<style scoped lang="scss">
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
