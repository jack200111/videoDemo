<template>
  <div v-if="isShow" class="flex flex_ju_sb videos-page">
    <template v-if="treeData.length">
      <!-- 左边列表 -->
      <div class="lefts">
        <div class="flex flex_a_c titles">
          <span class="title-line" />
          <span class="font_16 c_45 bold">视频列表</span>
        </div>
        <div class="video-trees">
          <el-tree
            ref="trees"
            :data="treeData"
            :props="defaultProps"
            highlight-current
            node-key="id"
            @node-click="handleNodeClickS"
          >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span v-if="data.videos && data.videos.length">{{
                  node.label
                }}</span>
                <span v-else :class="{'video-choose-active': playUrlList.indexOf(data.vurl) > -1,}">{{ node.label }}</span>
              </span>
            </template>
          </el-tree>
        </div>
      </div>
      <!-- 中间播放 -->
      <div class="centers">
        <div v-if="isShowVideos" class="videos">
          <videos-all-videos
            ref="hlsVideoPlayer"
            style="width: 100%; height: 100%"
            @changeVideoIndex="changeVideoIndex"
          />
        </div>
        <div v-else class="videos flex flex_col flex_a_c flex_ju_c play-error">
          <div class="table-emptyword">请选择视频</div>
        </div>
      </div>
      <!-- 右边视频分栏操作 -->
      <div class="rights">
        <div class="flex flex_a_c titles">
          <span class="title-line" />
          <span class="font_16 c_45 bold">视频分栏</span>
        </div>
        <div class="control-wrap">
          <div class="sets-wrap">
            <div
              v-for="(item, index) in setImgs"
              :key="index"
              class="t_c cursor set_div"
              :class="{ 'set-div-active': item.name == layoutName }"
              @click="changeLayout(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="noSheBei">
      <div class="table-emptyword">暂无数据</div>
    </div>
  </div>
</template>

<script>
/**
 * @description 视频九宫格/分栏demo
 */
import videosAllVideos from "./component/videosAllVideos.vue";
// import '@/api/px'
export default {
  components: { videosAllVideos },
  data() {
    return {
      isShow: true,
      // 左侧树形监控列表
      treeData: [
        {
          vname: "视频列表",
          videos: [
            {
              id: "1",
              vcode: "1",
              vname: "m3u8视频1-1",
              vurl: "http://192.168.0.219:8080/hls/0_1.m3u8",
              // vurl: "//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8",
              // vurl: "//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8",
            },
            {
              id: "2",
              vcode: "2",
              vname: "m3u8视频1-2",
              vurl: "//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
            },
            {
              id: "3",
              vcode: "3",
              vname: "m3u8视频1-3",
              vurl: "//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8",
            },
            {
              id: "4",
              vcode: "4",
              vname: "mp4视频1-4",
              vurl: "//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4",
            },
            {
              id: "5",
              vcode: "5",
              vname: "mp4视频1-5",
              vurl: "//vjs.zencdn.net/v/oceans.mp4",
            },
          ],
        },
      ],
      defaultProps: {
        children: "videos",
        label: "vname",
      },
      // 视频页面的分栏设置
      setImgs: [
        {
          name: "1 × 1",
          nums: 1,
        },
        {
          name: "2 × 2",
          nums: 4,
        },
        {
          name: "1 + 5",
          nums: 6,
        },
        {
          name: "1 + 7",
          nums: 8,
        },
        {
          name: "3 × 3",
          nums: 9,
        },
        {
          name: "4 × 4",
          nums: 16,
        },
      ],
      layoutName: "1 × 1", // 分栏管理的选中值
      layoutNum: 1, // 分栏窗口数
      oldLayoutNum: 1, // 旧的分栏窗口数
      isShowVideos: true,
      playCodeList: [], // 选中的视频集合
      playUrlList: [], // 选中播放视频的地址
      playNameList: [], // 选中播放视频的名称
      chooseIndex: 0, // 当前选中的第几个
      chooseMaxIndex: 0, // 分栏切换时，最多切换到了几个分栏
    };
  },
  mounted() {
    for (let index = 0; index < 14; index++) {
      this.treeData[0].videos.push({
        id: 12 + index,
        vcode: "1212" + index,
        vname: "视频1-" + (index + 3),
        vurl: "//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8",
      })
    }
    // 默认加载
    this.changeLayout(this.setImgs[0])
  },
  beforeDestroy() {
    this.isShow = false;
    // window.pxoveEventListener(this.resizeEvent, this.recalc);
  },
  methods: {
    // 监控列表数被点击
    // handleNodeClickS(data) {
    //   // 说明点击的是第一层，拦截点击事件
    //   if (data.videos && data.videos.length) return;
    //   // 点击的数据
    //   const nodes = this.$refs.trees.getCurrentNode();
    //   // 获取点击数据的视频地址
    //   const vurl = nodes.vurl || "";
    //   const vcode = nodes.vcode || "";
    //   const vname = nodes.vname || ""; // 视频名称

    //   // 判断视频为空
    //   if (vurl && vurl !== "" && vurl !== " ") {
    //     // 视频显示
    //     this.isShowVideos = true;

    //     this.$nextTick(() => {
    //       // 视频已选中播放
    //       if (this.playCodeList.indexOf(vcode) > -1) {
    //         this.$message("该视频已选中播放", "error");
    //         return;
    //       }
    //       // 判断分栏情况
    //       // 只有一栏 ==== 没有数据进行添加，有数据进行编辑替换
    //       if (this.layoutNum === 1) {
    //         if (!this.playCodeList.length) {
    //           // 则直接添加视频
    //           this.$refs.hlsVideoPlayer.handelVideoUrl(vcode, vurl, vname, 0);
    //           // 把当前的链接放进去
    //           this.playCodeList.push(vcode);
    //           this.playUrlList.push(vurl);
    //           this.playNameList.push(vname);
    //         } else {
    //           // 如果已经有正在播放的视频，进行视频的替换
    //           this.playCodeList = [vcode];
    //           this.playUrlList = [vurl];
    //           this.playNameList = [vname];
    //           this.$refs.hlsVideoPlayer.editUrl(vcode, vurl, vname, 0);
    //         }
    //       } else {
    //         // 多栏情况
    //         // 还有播放窗口：当选选中窗口数大于已选中播放的列表
    //         if (this.layoutNum > this.playCodeList.length) {
    //           // 选中切换的是正在播放的，直接编辑替换
    //           if (this.chooseIndex < this.playCodeList.length) {
    //             this.$refs.hlsVideoPlayer.editIsPlay(this.chooseIndex, true);
    //             this.$set(this.playCodeList, this.chooseIndex, vcode);
    //             this.$set(this.playUrlList, this.chooseIndex, vurl);
    //             this.$set(this.playNameList, this.chooseIndex, vname);
    //             this.$refs.hlsVideoPlayer.resetEdit(
    //               vcode,
    //               vurl,
    //               vname,
    //               this.chooseIndex
    //             );
    //           } else {
    //             // 判断是否是已经添加过的
    //             // 没有添加过，直接添加
    //             if (this.chooseIndex > this.chooseMaxIndex) {
    //               this.playCodeList.push(vcode);
    //               this.playUrlList.push(vurl);
    //               this.playNameList.push(vname);
    //               this.$refs.hlsVideoPlayer.handelVideoUrl(vcode, vurl, vname);
    //             } else {
    //               this.$refs.hlsVideoPlayer.editIsPlay(this.chooseIndex, true);
    //               this.$set(this.playCodeList, this.chooseIndex, vcode);
    //               this.$set(this.playUrlList, this.chooseIndex, vurl);
    //               this.$set(this.playNameList, this.chooseIndex, vname);
    //               this.$refs.hlsVideoPlayer.resetEdit(
    //                 vcode,
    //                 vurl,
    //                 vname,
    //                 this.chooseIndex
    //               );
    //             }
    //           }
    //         } else {
    //           // 添加到最后一个的时候，判断是否是从少窗口切换来的
    //           this.$refs.hlsVideoPlayer.editIsPlay(this.chooseIndex, true);
    //           this.$set(this.playCodeList, this.chooseIndex, vcode);
    //           this.$set(this.playUrlList, this.chooseIndex, vurl);
    //           this.$set(this.playNameList, this.chooseIndex, vname);
    //           this.$refs.hlsVideoPlayer.resetEdit(
    //             vcode,
    //             vurl,
    //             vname,
    //             this.chooseIndex
    //           );
    //         }

    //         this.$refs.hlsVideoPlayer.thisCodeLength = this.playCodeList.length;
    //       }
    //     });
    //   } else {
    //     if (this.layoutNum === 1) {
    //       this.isShowVideos = false;
    //     }
    //     this.$message("请先添加自己的视频", "error");
    //   }
    // },
    // 处理节点点击事件
    handleNodeClickS(data) {
      // 如果点击的是视频列表项，则不执行任何操作
      if (data.videos && data.videos.length) return;

      // 获取当前树节点组件的引用，并获取当前节点
      const nodes = this.$refs.trees.getCurrentNode();
      // 从节点中提取视频信息
      const vurl = nodes.vurl || "";
      const vcode = nodes.vcode || "";
      const vname = nodes.vname || ""; // 视频名称

      // 如果视频地址为空，则提示用户添加视频
      if (!vurl.trim()) {
        this.isShowVideos = false;
        this.$message("请先添加自己的视频", "error");
        return;
      }

      // 视频显示标志设为true
      // this.isShowVideos = true;

      // 等待DOM更新完成
      this.$nextTick(() => {
        // 检查视频是否已经在播放列表中
        if (this.playCodeList.includes(vcode)) {
          this.$message("该视频已选中播放", "error");
          return;
        }

        // 处理单栏和多栏布局的视频播放逻辑
        if (this.layoutNum === 1) {
          // 单栏布局下的视频播放逻辑
          this.handleSingleLayout(vcode, vurl, vname);
        } else {
          // 多栏布局下的视频播放逻辑
          this.handleMultiLayout(vcode, vurl, vname);
        }
        // 更新当前页面展示的视频数数据
        this.$refs.hlsVideoPlayer.thisCodeLength = this.playCodeList.length;
      });
    },
    // 处理单栏布局下的视频播放逻辑
    handleSingleLayout(vcode, vurl, vname) {
      // 如果当前没有正在播放的视频，则直接添加视频
      if (!this.playCodeList.length) {
        this.addToPlayList(vcode, vurl, vname, 0);
      } else {
        // 如果已经有正在播放的视频，则替换当前播放的视频
        this.replaceCurrentVideo(vcode, vurl, vname, 0);
      }
    },
    // 处理多栏布局下的视频播放逻辑
    handleMultiLayout(vcode, vurl, vname) {
      // 如果当前选中的播放窗口数layoutNum > 现播放数playCodeList，则添加视频或替换原有视频
      if (this.layoutNum > this.playCodeList.length) {
        console.log(this.chooseIndex, this.playCodeList.length);
        if (this.chooseIndex < this.playCodeList.length) {
          // 如果选中的是正在播放的视频，则替换它
          this.replacePlayingVideo(vcode, vurl, vname, this.chooseIndex);
          // this.replaceCurrentVideo(vcode, vurl, vname, this.chooseIndex);
        } else {
          // 否则，添加新视频到播放列表
          this.addToPlayList(vcode, vurl, vname);
        }
      } else {
        // 如果已经达到布局窗口数，则替换最后一个视频
        this.replaceCurrentVideo(vcode, vurl, vname, this.chooseIndex);
      }
    },

    // 添加视频到播放列表，并播放
    addToPlayList(vcode, vurl, vname, index) {
      this.playCodeList.push(vcode);
      this.playUrlList.push(vurl);
      this.playNameList.push(vname);
      this.$refs.hlsVideoPlayer.handelVideoUrl(vcode, vurl, vname, index);
    },

    // 替换当前播放的视频，并播放
    replaceCurrentVideo(vcode, vurl, vname, index) {
      console.log('换当前播放的视频，并播放', vcode, vurl, vname, index);
      this.playCodeList.splice(index, 1, vcode);
      this.playUrlList.splice(index, 1, vurl);
      this.playNameList.splice(index, 1, vname);
      this.$refs.hlsVideoPlayer.editUrl(vcode, vurl, vname, index);
    },

    // 替换正在播放的视频
    replacePlayingVideo(vcode, vurl, vname, index) {
      console.log('---替换正在播放的视频', vcode, vurl, vname, index);
      this.$refs.hlsVideoPlayer.editIsPlay(index, true);
      this.$set(this.playCodeList, index, vcode);
      this.$set(this.playUrlList, index, vurl);
      this.$set(this.playNameList, index, vname);
      this.$refs.hlsVideoPlayer.resetEdit(vcode, vurl, vname, index);
    },
    // 切换高亮索引
    changeVideoIndex({ chooseIndex, maxIndex }) {
      this.chooseIndex = chooseIndex;
      // 修改最大值
      if (this.chooseMaxIndex < maxIndex) {
        this.chooseMaxIndex = maxIndex;
      }
    },
    // 分栏管理选中改变
    changeLayout({ name, nums }) {
      // 当前分栏重复选择
      if (this.layoutName === name) return;
      // 没有选中视频的时候，不允许切换分栏
      if (!this.playCodeList.length) {
        this.$message("请先添加视频");
        return
      }
      // 赋值上一个分栏窗口数，用作对比
      this.oldLayoutNum = this.layoutNum;
      // 赋值页面的窗口数
      this.$refs.hlsVideoPlayer.layoutNum = nums;

      let hadCodeList = [];
      let hadUrlList = [];
      let hadNameList = [];
      // TODO 暂时没必要进行，无链接的视频添加时已进行了判断处理，此步骤无用
      this.playCodeList.forEach((item, index) => {
        // 剔除为空的情况，进行数据重新添加
        if (item !== "") {
          hadCodeList.push(item);
          hadUrlList.push(this.playUrlList[index]);
          hadNameList.push(this.playNameList[index]);
        }
      });

      // 如果选中切换的窗口屏幕小于当前展示的屏幕数，直接替换已经存在的，把多余的隐藏播放
      // 说明：为什么是隐藏而不是直接销毁删除
      // 答：直接删除会造成再次赋值视频无法播放的问题
      if (nums < this.layoutNum) {
        // 截取当前展示的前几个
        hadCodeList = hadCodeList.slice(0, nums);
        hadUrlList = hadUrlList.slice(0, nums);
        hadNameList = hadNameList.slice(0, nums);
        // 赋值当前
        this.playCodeList = [...hadCodeList];
        this.playUrlList = [...hadUrlList];
        this.playNameList = [...hadNameList];
        this.$refs.hlsVideoPlayer.thisCodeLength = hadCodeList.length;

        setTimeout(() => {
          let chooseMaxIndex = this.chooseMaxIndex;
          chooseMaxIndex = chooseMaxIndex + 1;
          if (
            chooseMaxIndex === 3 ||
            chooseMaxIndex === 5 ||
            chooseMaxIndex === 7
          ) {
            chooseMaxIndex = chooseMaxIndex + 1;
          }
          for (let i = 0; i < chooseMaxIndex; i++) {
            if (hadCodeList[i] && hadCodeList[i] !== "") {
              // 修改赋值
              this.$refs.hlsVideoPlayer.editIsPlay(i, true);
            } else {
              this.$refs.hlsVideoPlayer.editIsPlay(i, false);
            }
          }
        }, 400);
      } else {
        this.playCodeList = hadCodeList;
        this.playUrlList = hadUrlList;
        this.playNameList = hadNameList;
        this.$refs.hlsVideoPlayer.thisCodeLength = hadCodeList.length;

        for (let i = 0; i < hadCodeList.length; i++) {
          this.$refs.hlsVideoPlayer.editIsPlay(i, true);
        }
      }
      if (nums === this.playCodeList.length) {
        this.$refs.hlsVideoPlayer.chooseIndex = this.playCodeList.length - 1;
        this.chooseIndex = this.playCodeList.length - 1;
      } else {
        this.$refs.hlsVideoPlayer.chooseIndex = this.playCodeList.length;
        this.chooseIndex = this.playCodeList.length;
      }

      this.layoutName = name;
      this.layoutNum = nums;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/global.scss';
.videos-page {
  // height: 100%;
  text-align: left;
  background-color: #ecf1f4;
  padding: 10px;
  height: calc(100vh - (85px ));
  .titles {
    padding: 25px 28px;
    .title-line {
      display: inline-block;
      width: 5px;
      height: 18px;
      background: #6196f6;
      margin-right: 19px;
    }
  }
  .lefts {
    width: 20%;
    // height: 98.6%;
    // height: 580px;
    height: 100%;
    overflow: auto;

    background: #ffffff;
    border-radius: 15px;
    .titles {
      border-bottom: 1px solid #f1f1f1;
    }
    .video-choose-active {
      color: #6196f6;
    }
  }
  .centers {
    width: 60%;
    // height: 98.6%;
    height: 100%;
    // min-height: 580px;
    background: #ffffff;
    // border-radius: 15px;
    .videos {
      // width: 13.49px;
      width: 100%;
      // height: 560px;
      height: 100%;
      // height: 9.54px;
      // height: 95.5%;
      // margin: 22px auto 0;
    }
    .play-error {
      .table-noimg {
        width: 13px;
      }
      .table-emptyword {
        margin-top: 75px;
        font-size: 2px;
        color: #797979;
      }
    }
  }
  .rights {
    // width: 2.92px;
    width: 18%;
    // height: 98.6%;
    min-height: 580px;
    background: #ffffff;
    border-radius: 15px;
    .titles {
      border-bottom: 1px solid #f1f1f1;
    }
    .control-wrap {
      margin-top: 19px;
    }
    .sets-wrap {
      margin-top: 4px;
      .set_div {
        width: 85px;
        height: 50px;
        margin-top: 4px;
        margin-left: 42px;
        color: #6196f6;
        font-size: 20px;
        text-align: center;
        line-height: 50px;
        background-color: #dce5f6;
        &:hover {
          background-color: #8eade5;
          color: #fff;
        }
      }
      .set-div-active {
        background-color: #8eade5;
        color: #fff;
      }
    }
  }
}

// 暂无数据
.noSheBei {
  position: relative;
  width: 100%;
  height: 9.375px;
  border-radius: 15px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .table-emptyword {
    margin-top: 75px;
    color: #797979;
    font-size: 17px;
  }
}
</style>
<style lang="scss">
.video-trees {
  height: 91%;
  overflow-y: scroll;
  .el-tree-node__content {
    height: 44px;
    color: #454545;
    font-size: 17px;
  }
  .el-tree-node.is-current > .el-tree-node__content {
    background-color: #e7f1f3 !important;
  }
}
</style>
