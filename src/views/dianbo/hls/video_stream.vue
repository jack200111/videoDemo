<template>
  <div>
    <div id="dplayer" ref="player" class="video-dplayer" />
    <div id="dplayer2" ref="player2" class="video-dplayer" />
    <div>
      <p>
        <a href="https://dplayer.diygod.dev/zh/guide.html#special-thanks">文档地址: https://dplayer.diygod.dev/zh/guide.html#special-thanks</a>
      </p>
    </div>
  </div>
</template>

<script>
import Hls from "hls.js";
import DPlayer from "dplayer";

export default {
  data() {
    return {
      dp: null,
      dp2: null,
      video: {},
      video2: {}
    };
  },
  mounted() {
    // getVideo: ajax request for getting videoInfo
    /*   getVideo().then(res => {
        this.video = res.data.video
        this.laodVideo(this.video)
      }) */
    this.video = {
      // 封面
      // img: "https://cn.bing.com/th?id=OHR.MeotoIwa_ZH-CN3126370410_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
      video:
        '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8',
      // "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
      // "http://192.168.0.219:8080/hls/0_1.m3u8"
    };
    this.video2 = {
      // 封面
      // img: "https://cn.bing.com/th?id=OHR.MeotoIwa_ZH-CN3126370410_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
      video:
        // "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
        "//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8"
    };
    this.loadVideo(this.video);
    this.loadVideo2(this.video2);
  },
  methods: {
    loadVideo(videoInfo) {
      this.dp = new DPlayer({
        element: this.$refs.player,
        video: {
          //  pic: videoInfo.img, // 视频封面
          url: videoInfo.video,
          type: "customHls",
          customType: {
            customHls: function(video, player) {
              const hls = new Hls();
              hls.loadSource(video.src);
              hls.attachMedia(video);
            }
          }
        }
      });
    },
    loadVideo2(videoInfo) {
      this.dp2 = new DPlayer({
        element: this.$refs.player2,
        video: {
          //  pic: videoInfo.img, // 视频封面
          url: videoInfo.video,
          type: "customHls",
          customType: {
            customHls: function(video, player) {
              const hls = new Hls();
              hls.loadSource(video.src);
              hls.attachMedia(video);
            }
          }
        }
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.video-dplayer {
  width: 50%;
  max-width: 400px;
  max-height: 400px;
}
</style>
