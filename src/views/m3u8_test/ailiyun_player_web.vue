<template>
  <div class="">
    <span>1</span>
    <div id="J_prismPlayer" />
    <!-- 增加一项容器 -->
    <el-button @click="add">增加一个视频</el-button>
    <div :id="id2" />
    <div>
      <p>
        <a href="https://help.aliyun.com/zh/vod/developer-reference/api-operations?spm=a2c4g.11186623.6.1085.36fc6fc57WKZ5P">阿里云接口地址: https://help.aliyun.com/zh/vod/developer-reference/api-operations?spm=a2c4g.11186623.6.1085.36fc6fc57WKZ5P</a>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      id2: 'J_prismPlayer' + Math.floor(Math.random() * 1000)
    }
  },
  mounted() {
    new Aliplayer({
      id: 'J_prismPlayer',
      source: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8', // 播放地址，可以是第三方点播地址，或阿
    });
  },
  methods: {
    add() {
      new Aliplayer({
        id: this.id2,
        source: '//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8', // 播放地址，可以是第三方点播地址，或阿里云点播服务中的播放地址。
        // isLive: true, // 是否为直播，默认为false
      })
    }
  }
}
</script>
