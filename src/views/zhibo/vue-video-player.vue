<template>
  <div>
    <div>1111</div>
    <!-- width="300" -->
    <!-- height="150" -->
    <video
      id="video"
      ref="video"
      class="video-js vjs-default-skin"
      controls
      preload="auto"
    />
  </div>
</template>

<script>
// import 'video.js/dist/video-js.css';
// import 'vue-video-player/src/custom-theme.css';
import videojs from 'video.js';
// import 'videojs-contrib-hls'; //全局引入了

export default {
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
    this.getVideo()
  },
  methods: {
    getVideo() {
      this.player = videojs(
        // this.$refs.video,
        "video",
        {
          autoplay: true,
          controls: true,
          sources: [
            {
              // src: 'http://192.168.0.219:8080/hls/0_1.m3u8',
              src: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8',
              type: 'application/x-mpegURL' // 告诉videojs,这是一个hls流
            }
          ]
        },
        function() {
        });
    },
  }
};
</script>

<style scoped>
.video-js {
  width: 50%;
  /* height: auto; */
  height: 400px;
}
</style>
