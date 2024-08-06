import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import { http } from '@/utils/ruien_request'
// import "video.js/dist/video-js.css"; // 引入video.js的css
// import flash from "videojs-flash"; // 播放rtmp流需要的插件
// Vue.use(flash);
// import VueClipboards from 'vue-clipboards';
// Vue.use(VueClipboards);
// import plugins from './plugins' // plugins
// import { download } from '@/utils/request'

// 全局注册vue-aliplayer-v2
// import VueAliplayerV2 from "vue-aliplayer-v2";
// Vue.use(VueAliplayerV2);

// import VueVideoPlayer from 'vue-video-player'
// Vue.use(VueVideoPlayer)
// window.videojs = VueVideoPlayer.videojs

// import VueCoreVideoPlayer from 'vue-core-video-player'
// Vue.use(VueCoreVideoPlayer)
// 统一接口管理
// echarts图表
import 'element-ui/lib/theme-chalk/index.css'
// element-ui组件模块
import '@/ele.js'
import 'animate.css'

// import 'videojs-flash'
// import 'videojs-contrib-hls'
// import 'videojs-flvjs-es6'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  // const { mockXHR } = require('../mock')
  // mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 挂载全局
Vue.prototype.$http = http
// 下载
// Vue.prototype.download = download
// Vue.use(plugins)

import DictTag from '@/components/dict/DictTag.vue';
// 注册全局自定义标签组件
Vue.component('DictTag', DictTag);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
