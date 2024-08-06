<template>
  <div class="component-upload-image">
    <video
      id="my-video"
      class="video-js vjs-default-skin"
      controls
      autoplay
      preload="auto"
    >
      <!-- <source src="http://192.168.0.219:8080/hls/0_1.m3u8" type="application/x-mpegURL"> -->
      <source src="//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8" type="application/x-mpegURL">
    </video>
    <div>
      <p>
        <a href="https://github.com/videojs/video.js">video github地址: https://github.com/videojs/video.js</a>
      </p>
      <a href="https://videojs.com/getting-started/#source-code">videojs使用地址: https://videojs.com/getting-started/#source-code</a>
      <p>
        <a href="https://docs.videojs.com/">videojs英文文档地址: https://docs.videojs.com/</a>
      </p>
      <a href="https://gitcode.gitcode.host/docs-cn/video.js-docs-cn/docs/guides/plugins.html">videojs中文文档地址: https://gitcode.gitcode.host/docs-cn/video.js-docs-cn/docs/guides/plugins.html</a>
      <p>
        <a href="https://videojs.com/guides/options/">videojs配置地址: https://videojs.com/guides/options/</a>
      </p>
    </div>
  </div>
</template>
<script>
// import "video.js/dist/video-js.css";
import videojs from "video.js";
// import "videojs-contrib-hls"; // 全局引入了
export default {
  name: "M3u8Play",
  components: {
  },
  data() {
    return {
      player: null
    };
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  mounted() {
    this.getVideo();
  },
  methods: {
    getVideo() {
      this.player = videojs(
        "my-video",
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true,
        },
        function() {
          // this.play();
        }
      );
    },
  },
};
</script>
<style scoped lang="scss">
.video-js {
  width: 50%;
  /* height: auto; */
  height: 400px;
}
</style>
