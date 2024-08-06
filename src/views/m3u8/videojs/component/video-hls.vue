<template>
  <!-- 容器用于容纳多个视频播放单元  黑色背景-->
  <div class="video-fens">
    <!-- <div class=""> -->
    <!-- 使用v-for循环创建视频播放单元格  白色框-->
    <div class="cell-players">
      <!-- 视频播放区域 -->
      <!-- video-div -->
      <!-- <div class="tab-mb" /> -->
      <!-- 绿色边框代表选中蒙层，层级8 -->
      <!-- <div v-show="i - 1 == chooseIndex && layoutNum != 1" class="tab-mb-active" /> -->
      <!-- m3u8的视频播放方式 -->
      <template v-for="i in Number(layoutNum)">
        <div :key="i" :class="[cellClass(i)]" @click="videoTap(i - 1)">
          <!-- v-if="checkVideoList[i - 1] && checkVideoList[i - 1].videoid"  -->
          <video v-if="checkVideoList[i - 1] && (checkVideoList[i - 1].userId + checkVideoList[i - 1].sessionID)" :id="checkVideoList[i - 1] && ('videoPlayer' + checkVideoList[i - 1].userId + checkVideoList[i - 1].sessionID)" :ref="checkVideoList[i - 1] && ('videoPlayer' + checkVideoList[i - 1].userId + checkVideoList[i - 1].sessionID)" loop muted controls autoplay preload="auto" class="video-js" />
        </div>
      </template>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
/**
 * 分屏视频
 */
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
export default {
  name: 'HlsPlayer',
  props: {
    // 视频地址
    // 默认自动播放
    autoplay: {
      type: Boolean,
      default: true,
    },
    // 默认直播
    islive: {
      type: Boolean,
      default: true,
    },
    // 控制倍数
    playbackRate: {
      type: Boolean,
      default: false,
    },
    // 视频播放数组
    checkVideoList: {
      type: Array,
      required: true,
    },
    // 小窗口数量
    layoutNum: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      // chooseIndex: 0, // 选中值   从 0 开始
      // 用于销毁播放器
      playerArr: [
        // {
        //   id: '',
        //   player: ''
        // },
      ],
      options: {
        controls: true, // 是否显示控制条
        muted: true, // 是否静音
        autoplay: false, // 自动播放
        loop: true, // 是否循环
        fluid: false, // 自适应宽高
        language: 'zh-CN', // 设置语言
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
            { name: 'playToggle' }, // 播放按钮
            { name: 'currentTimeDisplay' }, // 当前已播放时间
            { name: 'progressControl' }, // 播放进度条
            { name: 'durationDisplay' }, // 总时间
            {
              // 倍数播放
              name: 'playbackRateMenuButton',
              playbackRates: [0.5, 1, 1.5, 2, 2.5],
            },
            {
              name: 'volumePanel', // 音量控制
              inline: false, // 不使用水平方式
            },
            { name: 'FullscreenToggle' }, // 全屏
          ],
        },
        poster: '', // 播放前显示的视频画面，播放开始之后自动移除
        preload: 'auto', // 预加载
        // width: 650,
        // height: 330,
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
    };
  },
  computed: {
    // 改变视频显示 布局模式
    cellClass() {
      return function(index) {
        switch (Number(this.layoutNum)) {
          case 1:
            return ['cell-player-1']
          case 4:
            return ['cell-player-4']
          case 6:
            if (index === 1) return ['cell-player-6-1']
            if (index === 2) return ['cell-player-6-2']
            if (index === 3) return ['cell-player-6-3']
            return ['cell-player-6']
          case 8:
            if (index === 1) return ['cell-player-8-1']
            if (index === 2) return ['cell-player-8-2']
            if (index === 3) return ['cell-player-shu cell-player-8-3']
            if (index === 4) return ['cell-player-shu cell-player-8-4']
            return ['cell-player-8']
          case 9:
            return ['cell-player-9']
          case 16:
            return ['cell-player-16']
          default:
            break
        }
      }
    },
  },
  beforeDestroy() {
    // 确保组件销毁时，播放器也被销毁
    if (this.playerArr.length > 0) {
      this.playerArr.forEach((item) => {
        item.player.dispose();
      })
      // 重置playerArr播放器数组
      this.playerArr = []
    }
  },
  mounted() {
    // if (this.checkVideoList.length > 0) {
    //   this.checkVideoList.forEach((item) => {
    //     this.initPlayer(item.videoid, item.hlsUrl)
    //   })
    // }
  },
  methods: {
    // 点击选择第几个 指定索引的视频窗口
    videoTap(index) {
      if (this.chooseIndex === index) return
      // 判断选中的中间是否其余是未填充的
      // if (index > this.thisCodeLength) {
      //   this.$message('此窗口暂不可选择', 'error')
      //   return
      // }
      // 赋值点击选中框
      this.chooseIndex = index
    },
    // 创建视频实例
    initPlayer(id, url) {
      let player = null
      console.log(id, url);
      // 创建一个新的视频对象
      // const videoUrl = {
      //   url: url,
      //   code: id,
      //   name: id,
      //   isPlay: true,
      //   isError: false, // 是否播放出错
      //   isEdit: true, // 是否可以直接进行编辑操作
      // }
      // const _this = this
      // options 深层拷贝，防止有更改的时候相互影响
      const options = JSON.parse(JSON.stringify(this.options))
      // 据reloadUrl创建一个播放源
      options.sources = [this.makeUrlSource(url)]
      // const playerOldLength = this.playerArr.length
      this.$nextTick(() => {
        player = videojs(
          id,
          {
            ...options,
          },
          // function onPlayerReady() {
          //   this.on('loadstart', function() {
          //     _this.$set(_this.playerArr[playerOldLength - 1].player, 'isError', false)
          //     _this.$set(_this.playerArr[playerOldLength - 1].player, 'isPlaying', false)
          //   })
          //   this.on('playing', function() {
          //     _this.$set(_this.playerArr[playerOldLength - 1].player, 'isPlaying', true)
          //   })
          //   this.on('error', function() {
          //     _this.$set(_this.playerArr[playerOldLength - 1].player, 'isError', true)
          //     _this.$set(_this.playerArr[playerOldLength - 1].player, 'isPlaying', false)
          //   })
          // }
        )
        // 存播放实例
        this.playerArr.push({ id, player })
      // 修改索引
      // this.chooseIndex = this.chooseIndex + 1
      })
    },
    // 根据视频URL创建播放源
    makeUrlSource(reloadUrl) {
      const url = reloadUrl.replace(/\s+/g, '')
      let sources = {}
      if (url.indexOf('rtmp') > -1) {
        // rtmp格式视频
        sources = [{ src: reloadUrl, type: 'rtmp/flv' }]
      } else if (url.lastIndexOf('.') > -1) {
        var playurl = url.substring(url.lastIndexOf('.') + 1)
        //  console.log(playurl.split('?')[0])
        if (playurl === 'flv') {
          // console.log('flv格式视频')
          // flv格式视频
          sources = [{ src: reloadUrl, type: 'video/x-flv' }]
        } else if (playurl.split('?')[0] === 'flv') {
          // 对**直播平台flv地址做特殊处理
          //  console.log('flv格式视频')
          // flv格式视频
          sources = [{ src: reloadUrl, type: 'video/x-flv' }]
        } else if (playurl === 'm3u8') {
          // m3u8格式视频
          //  console.log('m3u8格式视频')
          sources = [{ src: reloadUrl, type: 'application/x-mpegURL' }]
        } else {
          //  console.log('其他格式视频')
          // 其他格式视频
          sources = [{ src: reloadUrl, type: 'video/mp4' }]
        }
        return sources
      }
    },
    // 播放指定索引的视频
    play(i) {
      this.playerList[i].player.play()
    },
    // 暂停指定索引的视频
    pause(i) {
      this.playerList[i].player.pause()
    },
    // 视频事件 回调函数参数
    handleCoreEvent({ eventName, ...rest }) {
      // console.log(eventName, 'eventName 事件名');
      // console.log(rest, 'hls 事件回调函数参数');
      // 可以在这里发射自定义事件，让父组件可以监听
      this.$emit('core-event', { eventName, ...rest });
    },
    // 监听播放
    handlePlay(player) {
      // console.log(player, 'handlePlay');
      // 可以在这里发射自定义事件，让父组件可以监听
      // this.$emit('play-error', error);
    },
    // 视频错误 监听函数
    handleError(error) {
      console.warn(error, 'error');
      // 可以在这里发射自定义事件，让父组件可以监听
      // this.$emit('error', error);
    },
    // 监听销毁
    handleDestroy(player) {
      console.log('监听销毁', player);
      // 可以在这里发射自定义事件，通知父组件播放器已销毁
    },
    // 销毁视频
    onDestroy(id) {
      // 找到要销毁的一项
      const player = this.playerArr.filter(item => item.id === id)[0]
      console.log('销毁前', id, this.playerArr, player);
      // 包括它们的索引和 videoid 等属性
      player && player.player.dispose();
      this.playerArr.splice(this.playerArr.indexOf(player), 1)
      console.log('销毁后', id, this.playerArr, player);
      // 可以在这里发射自定义事件，通知父组件播放器已销毁
      this.$emit('destroyed');
    },
    onReload(id, url) {
      console.log('重新加载前', this.player);
      this.onDestroy(id); // 销毁当前播放器
      this.initPlayer(id, url); // 重新初始化播放器
      // 可以在这里发射自定义事件，通知父组件播放器正在重新加载
      this.$emit('reloading');
    },
  }
};
</script>

<style scoped lang="scss">

// 黑色背景
.video-fens {
  width: 100%;
  height: 100%;
  background-color: #000;
  // 白色框
  .cell-players {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border: 1px solid #fff;
    position: relative;
    .active {
      border: 1px solid #38aaa7 !important;
    }
    .hidden {
      width: 0px !important;
      height: 0px !important;
      display: none;
    }
    // 视频播放区域盒子
  //   .video-div {
  //     width: 100%;
  //     height: 100%;
  //     position: relative;
  //     // 1.遮罩层
  //     .tab-mb {
  //       position: absolute;
  //       width: 100%;
  //       height: calc(100% - 40px);
  //       background-color: rgba($color: #000000, $alpha: 0);
  //       top: 0;
  //       left: 0;
  //       z-index: 7;
  //     }
  //     // 选中的图层
  //     .tab-mb-active {
  //       position: absolute;
  //       width: 100.3%;
  //       height: 100.4%;
  //       background-color: rgba($color: #000000, $alpha: 0);
  //       top: -0.2%;
  //       left: -0.1%;
  //       border: 3px solid #38aaa7;
  //       z-index: 8;
  //     }
  //     // 视频播放图层
  //     .video-divs {
  //       // video容器
        .video-js {
          width: 100%;
          height: 100%;
        }

  //       // 播放出错蒙层
  //       .play-error {
  //         position: absolute;
  //         width: 100%;
  //         height: 100%;
  //         top: 0;
  //         left: 0;
  //         background-color: #000;
  //         z-index: 4;

  //         .img_noplay {
  //           width: 76rem;
  //           height: 64px;
  //           margin-bottom: 46px;
  //         }
  //       }

  //       // 视频名称图层
  //       .video-name {
  //         // font-size: 0.2rem;
  //         color: #fff;
  //         font-weight: bold;
  //         position: absolute;
  //         padding: 20px 25px;
  //         top: 0;
  //         right: 0;
  //         z-index: 5;
  //       }

  //     }
  // }
  }
  // 1 * 1
 .cell-player-1 {
    // width: 100% !important;
    // height: 100% !important;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #fff;
}
  // 2 * 2
.cell-player-4 {
  width: 50%;
  height: 50% !important;
  // width: 100%;
  // height: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #fff;
  }
  // 1 + 5
  .cell-player-6-1 {
    width: 66.66%;
    height: 66.66% !important;
    box-sizing: border-box;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
  }
  .cell-player-6-2 {
    width: 33.33%;
    height: 33.33% !important;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;

    .error-word {
      font-size: 0.17rem;
    }
  }
  .cell-player-6-3 {
    position: absolute;
    right: 0;
    top: 33.33%;
    width: 33.33%;
    height: 33.33%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;

    .error-word {
      font-size: 0.17rem;
    }
  }
  .cell-player-6 {
    width: 33.33%;
    height: 33.33% !important;
    box-sizing: border-box;
    border-left: 1px solid #fff;

    .error-word {
      font-size: 0.17rem;
    }
  }

  // 1 + 7
  .cell-player-8-1 {
    width: 75%;
    height: 75% !important;
    box-sizing: border-box;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
  }
  .cell-player-8-2 {
    width: 25%;
    height: 25% !important;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;

    .img_noplay {
      width: 0.63rem !important;
      height: auto !important;
    }

    .error-word {
      font-size: 0.13rem;
    }
  }
  .cell-player-shu {
    width: 25%;
    height: 25% !important;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    right: 0;
    position: absolute;

    .img_noplay {
      width: 0.63rem !important;
      height: auto !important;
    }

    .error-word {
      font-size: 0.13rem;
    }
  }
  .cell-player-8-3 {
    top: 25%;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
  }
  .cell-player-8-4 {
    top: 50%;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
  }
   .cell-player-8 {
    width: 25%;
    height: 25% !important;
    box-sizing: border-box;
    border-left: 1px solid #fff;

    .img_noplay {
      width: 0.63rem !important;
      height: auto !important;
    }

    .error-word {
      font-size: 0.13rem;
    }
  }

  // 3 * 3
  .cell-player-9 {
    width: 33.33%;
    height: 33.33% !important;
    box-sizing: border-box;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }
  // 4 * 4
  .cell-player-16 {
    width: 25%;
    height: 25% !important;
    box-sizing: border-box;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
  }
}
.hls-player-component {
  // width: 100%;
  // height: 100%;
  // background-color: #000;
  .xgplayer-box {
      // width: 600px;
      // .video_box {
      //   width: 100% !important;
      //   height: 100% !important;
      // }
      // width: 100%;
      // height: 100%;
      // text-align: center;
      // border: 1px solid #ccc;
      // box-shadow: 0 0 14px 0 rgba(221, 221, 221, 0.5);
      // .btn {
      //   display: flex;
      //   padding: 10px;
      // }
  }
}

</style>
