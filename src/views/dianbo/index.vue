<template>
  <div>
    <div v-loading="loading">
      <video id="video2" controls width="400px" height="300px" />
    </div>
    <!-- <video id="video" controls /> -->
  </div>
</template>

<script>
import Hls from 'hls.js';
import videoApi from "@/api/video";

export default {
  data() {
    return {
      loading: true,
      videoSrc: null,
    };
  },
  mounted() {
    // this.fetchVideoUrl();
    this.videoSrc = '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8';
    // this.videoSrc = 'http://192.168.0.219:8080/hls/0_1.m3u8';
    this.initHlsPlayer();
  },
  methods: {
    fetchVideoUrl() {
      videoApi.getLiveList().then((data) => {
      //  hls.loadSource('http://192.168.0.219:8080/hls/0_1.m3u8');
        this.videoSrc = 'http://192.168.0.219:8080/hls/0_1.m3u8';
        // this.videoSrc = '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8';
        this.loading = false;
        this.initHlsPlayer();
      })
        .catch(error => {
          console.error('Error fetching video URL:', error);
          this.loading = false;
        });
    },
    initHlsPlayer() {
      if (Hls.isSupported()) {
        const video = document.getElementById('video2');
        video.muted = true; // 静音才可以播放
        // const hls = new Hls();
        const hls = new Hls({
          live: true, // 设置为直播模式
          // startPosition: -1,
          // liveSyncPositionShift: true, // 同步直播流的时间戳
        });
        // 加载M3U8源
        hls.loadSource(this.videoSrc);
        // 绑定视频元素到Hls实例
        hls.attachMedia(video);
        // 监听直播相关事件
        this.loading = false;
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.loading = false;
          video.play(); // 静音才可以播放
        });
      }
    },
  },
}
</script>
