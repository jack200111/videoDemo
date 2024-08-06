<template>
  <div id="app">
    <template v-if="!isShowMultiple && show">
      <vue-aliplayer-v2
        ref="VueAliplayerV2"
        :source="source"
        :options="options"
      />
    </template>
    <div v-if="isShowMultiple && show" class="show-multiple">
      <template v-for="x in 5">
        <vue-aliplayer-v2
          ref="VueAliplayerV2"
          :key="x"
          class="multiple-player"
          :source="source"
          :options="options"
        />
      </template>
    </div>
    <p v-if="!show" class="remove-text">播放器已销毁!</p>
    <div class="player-btns">
      <template v-if="!isShowMultiple && show">
        <span @click="play()">播放</span>
        <span @click="pause()">暂停</span>
        <span @click="replay()">重播</span>
        <span @click="getCurrentTime()">播放时刻</span>
        <span @click="getStatus()">获取播放器状态</span>
      </template>
      <span @click="show = !show">{{ show ? "销毁" : "重载" }}</span>
      <span @click="options.isLive = !options.isLive">{{
        options.isLive ? "切换普通模式" : "切换直播模式"
      }}</span>
      <span @click="showMultiple()">{{
        isShowMultiple ? "显示1个播放器" : "显示多个播放器"
      }}</span>
    </div>
    <div class="source-box">
      <span class="source-label">选择播放源(支持动态切换):</span>
      <select id="source" v-model="source" name="source">
        <!-- <option value="//192.168.0.219:8080/hls/0_1.m3u8">
          m3u8
        </option> -->
        <option value="//yunqivedio.alicdn.com/user-upload/nXPDX8AASx.mp4">
          mp4
        </option>
        <option value="//ivi.bupt.edu.cn/hls/cctv1.m3u8">直播播放源4</option>
        <option value="//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8">m3u8直播</option>
      </select>
    </div>
    <div class="source-box">
      <span class="source-label">输入播放源(支持动态切换):</span>
      <input v-model="source" class="source-input" type="text">
    </div>
    <div>
      <p>
        <a href="https://github.com/langyuxiansheng/vue-aliplayer-v2?tab=readme-ov-file">video github地址: https://github.com/langyuxiansheng/vue-aliplayer-v2?tab=readme-ov-file</a>
      </p>
    </div>
  </div>
</template>
<script>
import VueAliplayerV2 from "vue-aliplayer-v2";

export default {
  components: {
    VueAliplayerV2
  },
  data() {
    return {
      options: {
        source: '//player.alicdn.com/video/aliyunmedia.mp4',
        // source: '//192.168.0.219:8080/hls/0_1.m3u8',
        isLive: true, // 切换为直播流的时候必填
        format: 'm3u8' // 切换为直播流的时候必填
      },
      source: "//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8",
      // source: '//192.168.0.219:8080/hls/0_1.m3u8',
      // source: "//player.alicdn.com/video/aliyunmedia.mp4",
      // source: '//ivi.bupt.edu.cn/hls/cctv1.m3u8',
      show: true,
      isShowMultiple: false,
    };
  },
  methods: {
    play() {
      this.$refs.VueAliplayerV2.play();
    },

    pause() {
      this.$refs.VueAliplayerV2.pause();
    },

    replay() {
      this.$refs.VueAliplayerV2.replay();
    },

    getCurrentTime() {
      // this.$refs.VueAliplayerV2.getCurrentTime();
      // this.source = "http://ivi.bupt.edu.cn/hls/cctv1.m3u8";
      this.source = "http://192.168.0.219:8080/hls/0_1.m3u8";
    },

    getStatus() {
      const status = this.$refs.VueAliplayerV2.getStatus();
      console.log(`getStatus:`, status);
      alert(`getStatus:${status}`);
    },

    showMultiple() {
      this.isShowMultiple = !this.isShowMultiple;
    },
  },
};
</script>
<!-- <style lang="less"> -->
<style lang="scss" scoped>

* {
  margin: 0;
  padding: 0;
}
.remove-text {
  text-align: center;
  padding: 20px;
  font-size: 24px;
}
.show-multiple {
  display: flex;
  .multiple-player {
    width: calc(100% / 4);
    margin: 20px;
  }
}
.player-btns {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  span {
    margin: 0 auto;
    display: inline-block;
    padding: 5px 10px;
    width: 150px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #eee;
    background: #e1e1e1;
    border-radius: 10px;
    text-align: center;
    margin: 5px;
    cursor: pointer;
  }
}
.source-box {
  padding: 5px 10px;
  margin-bottom: 20px;
  .source-label {
    margin-right: 20px;
    font-size: 16px;
    display: block;
  }
  #source {
    margin-top: 10px;
  }
  .source-input {
    margin-top: 10px;
    padding: 5px 10px;
    width: 80%;
    border: 1px solid #ccc;
  }
}
</style>
