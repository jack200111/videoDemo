<template>
  <div>
    <div class="parent_box">
      <div v-for="i in num" :key="i" class="children_box" :class="i - 1 === chooseIndex ? 'active' : ''" @click="chooseIndex = i - 1">
        <div v-if="urlList[i - 1] && urlList[i -1].id" :id="urlList[i -1].id" class="video_box">
          <div style="position: absolute; right: 20px; top: 20px;z-index: 2;">
            {{ urlList[i - 1].id }}
          </div>
          <vue-aliplayer-v2
            :ref="urlList[i - 1].id"
            :key="urlList[i - 1].id"
            class="multiple-player"
            :source="urlList[i - 1].url"
            :options="options"
          />
        </div>
      </div>
    </div>
    <p>
      <el-button @click="deleteFn">删除所选项</el-button>
    </p>
    <p>
      输入id <el-input v-model="addId" style="width: 50px;" />
      输入url <el-select v-model="addUrl" style="width: 400px;">
        <el-option
          v-for="item in urlListOld"
          :key="item.id"
          :label="item.url"
          :value="item.url"
        />
      </el-select>
    </p>
    <p>
      <el-button @click="addFn">增加所选项</el-button>
    </p>
    <div v-if="urlList[chooseIndex] && urlList[chooseIndex].id">
      <p>选择的id: {{ urlList[chooseIndex].id }}</p>
    </div>
    <div v-else>
      <p>选择的id: 空</p>
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
      num: 4,
      chooseIndex: 0,
      addId: 4,
      addUrl: '',
      urlList: [
        {
          id: '1',
          url: 'http://192.168.0.219:8080/hls/0_1.m3u8'
        },
        {
          id: '2',
          url: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8",
        },
        {
          id: '3',
          url: "//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8",
        },
      ],
      urlListOld: [
        {
          id: '1',
          url: 'http://192.168.0.219:8080/hls/0_1.m3u8'
        },
        {
          id: '2',
          url: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8",
        },
        {
          id: '3',
          url: "//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8",
        },
      ],
      options: {
        // source: '//player.alicdn.com/video/aliyunmedia.mp4',
        source: 'http://192.168.0.219:8080/hls/0_1.m3u8',
        isLive: false, // 切换为直播流的时候必填
        format: 'm3u8' // 切换为直播流的时候必填
      }
    }
  },
  methods: {
    deleteFn() {
      // this.urlList.splice(this.chooseIndex, 1)
      // 删除当前选中的视频
      this.urlList.splice(this.chooseIndex, 1);

      // 如果删除的是当前选中的视频，调整chooseIndex
      if (this.chooseIndex >= this.urlList.length) {
        // this.chooseIndex = this.urlList.length - 1; // 更新选择索引，避免越界
        this.chooseIndex = Math.max(0, this.chooseIndex - 1);
      }

      // 如果列表变为空，重置chooseIndex
      if (!this.urlList.length) {
        this.chooseIndex = 0;
      }
    },
    addFn() {
      if (this.urlList.length >= this.num) {
        this.$message('视频数量已达上限', 'error')
        return
      }
      this.urlList.push({
        id: this.addId,
        url: this.addUrl
      })
      this.addId = this.urlList.length + 1; // 重置输入
      this.addUrl = ''; // 重置输入
    }
  }
}
</script>

<style scoped lang="scss">
.parent_box {
  width: 600px;
  height: 600px;
  background-color: #000;
  display: flex;
  flex-wrap: wrap;
  .children_box{
    width: 50%;
    height: 50%;
    border: 1px solid #fff;
    color: #fff;
    .video_box {
      width: 100%;
      height: 100%;
      position: relative;
      .multiple-player{
        width: 100%;
        height: 100%;
      }
    }
  }
  .active {
    border: 2px solid green;
  }
}
</style>
