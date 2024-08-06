<template>
  <div>
    videojs
    <video id="videoPlayer" class="video" muted width="100%" height="380px" />
  </div>
</template>

<script>
import Videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
  data() {
    return {
      player: null,
      options: {
        controls: true, // 是否显示控制条
        muted: true, // 是否静音
        autoplay: false, // 自动播放
        loop: true, // 是否循环
        fluid: false, // 自适应宽高
        language: "zh-CN", // 设置语言
        // aspectRatio: '3:1',
        inactivityTimeout: false,
        controlBar: {
          // 设置控制条组件
          /* 设置控制条里面组件的相关属性及显示与否
		    'currentTimeDisplay':true,
		    'timeDivider':true,
		    'durationDisplay':true,
		    'remainingTimeDisplay':false,
		    volumePanel: {
		      inline: false,
		    }
		    */
          /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
          children: [
            { name: "playToggle" }, // 播放按钮
            { name: "currentTimeDisplay" }, // 当前已播放时间
            { name: "progressControl" }, // 播放进度条
            { name: "durationDisplay" }, // 总时间
            {
              // 倍数播放
              name: "playbackRateMenuButton",
              playbackRates: [0.5, 1, 1.5, 2, 2.5],
            },
            {
              name: "volumePanel", // 音量控制
              inline: false, // 不使用水平方式
            },
            { name: "FullscreenToggle" }, // 全屏
          ],
        },
        poster: '', // 播放前显示的视频画面，播放开始之后自动移除
        preload: 'auto', // 预加载
        width: 100,
        height: 100,
        techOrder: ['html5', 'flvjs'], // 兼容顺序
        flvjs: {
          mediaDataSource: {
            isLive: false,
            cors: true,
            withCredentials: false,
          },
        },
        sources: [],
      }
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose() // Removing Players,该方法会重置videojs的内部状态并移除dom
    }
  },
  activated() {
    if (this.player) {
      this.player.play()
    }
  },
  deactivated() {
    if (this.player) {
      this.player.pause()
    }
  },
  mounted() {
    this.initVideo('//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8')
    // this.initVideo('http://192.168.0.219:8080/hls/0_1.m3u8')
    // this.initVideo('rtmp://192.168.2.165:1935/live/0_1')
  },
  methods: {
    initVideo(url) {
      if (!this.player) {
        // this.player = Videojs('videoPlayer', {
        //   autoplay: true, // 设置自动播放
        //   muted: true, // 设置了它为true，才可实现自动播放,同时视频也被静音 （Chrome66及以上版本，禁止音视频的自动播放）
        //   preload: 'auto', // 预加载
        //   controls: false // 显示播放的控件
        // })
        this.player = Videojs('videoPlayer', {
          ...this.options
        })
      }
      this.player.src([{
        src: url,
        type: 'application/x-mpegURL' // 告诉videojs,这是一个hls流
      }])
      // this.player.src([{
      //   src: url,
      //   type: 'rtmp/flv' // 告诉videojs这是一个rtmp流视频
      // }])
    }
  }
}
</script>

<style lang="scss" scoped>
// .video, video {
//   width: 100%;
//   height: 580px;
// }
// ::v-deep .vjs-loading-spinner {
//   position: relative;
//   .vjs-control-text {
//     opacity: 0;
//   }
// }
</style>
