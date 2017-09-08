import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
import { getlist, getdatas } from '@/assets/api/getdata'
const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  state: {
    dataId: [],
    cacheData: [],
    toDay: {
      datas: [],
      menu: '',
      content: [],
    },
    oneDay: {
      datas: [],
      menu: '',
      content: [],
    },
    yesterDay: {
      datas: [],
      menu: '',
      content: [],
    },
    titles: [{
      content_type: 1,
      title: "ONE STORY"
    }, {
      content_type: 1,
      title: "阅读"
    }, {
      content_type: 2,
      title: "连载"
    }, {
      content_type: 3,
      title: "问答"
    }, {
      content_type: 4,
      title: "音乐"
    }, {
      content_type: 5,
      title: "影视"
    }, {
      content_type: 8,
      title: "电台"
    }],
    showDate: '0000-00-00  06:00:00', //顶部显示日期
    date: '2012-10-07',
    topBarList: [], //顶部菜单
    nextShow: [], //控制下一张显示内容
    nextShowIndex: 0,
    isTap: true,
    num: 0, //
    radioSrc: '', //电台音频src
    defaultAudios: [],//电台默认音频src
  },
  mutations: {
    getIdList(state, result) {
      state.dataId = result.data
    },
    getCacheData(state, result) {
      let a = false;
      if (state.cacheData.length > 0) {
        state.cacheData.forEach(item => {
          if (item.date === result.data.date) {
            a = true
          }
        })
      }
      if (!a) {
        state.cacheData.push(result.data)
      }
      let n = state.cacheData[state.nextShowIndex].content_list.length - 1
      state.radioSrc = state.cacheData[state.nextShowIndex].content_list[n].audio_url
      state.defaultAudios = state.cacheData[state.nextShowIndex].content_list[n].default_audios || '#'
    },
    getToDay(state, result) {
      state.date = result.data.date
      state.showDate = result.data.date
      state.toDay.datas = result.data.content_list
      state.toDay.menu = result.data.menu
      state.toDay.content = result.data.content_list[0]
    },
    getYesterDay(state) {
      state.date = state.cacheData[state.nextShowIndex].date
      state.yesterDay.datas = state.oneDay.datas
      state.yesterDay.menu = state.oneDay.menu
      state.yesterDay.content = state.oneDay.content
    },
    getOneDay(state) {

      state.oneDay.datas = state.cacheData[state.nextShowIndex].content_list
      state.oneDay.menu = state.cacheData[state.nextShowIndex].menu
      state.oneDay.content = state.cacheData[state.nextShowIndex].content_list[0]

    },
    setShowDate(state) {
      state.showDate = state.cacheData[state.nextShowIndex].date
    },
    getTopBarList(state, result) {
      state.topBarList.push(result.data)
      state.topBarList.reverse()
    },
    setEmpty(state) {
      state.topBarList = []
      state.nextShow = []
    },
    getNextShow(state) {
      state.topBarList.forEach(item => {
        item.forEach(el => {
          state.nextShow.push(el.date)
          state.nextShow = [...new Set(state.nextShow)]
        })
      });
    },
    setNextShowIndex(state) {
      let n = state.showDate.substr(0, 10)
      state.nextShow.forEach((item, index) => {
        if (n == item) {
          state.nextShowIndex = index
        }
      })
    },
    getNextShowIndex(state, num) {
      state.nextShowIndex = state.nextShowIndex + num
    },
    setNextShowI(state) {
      state.nextShowIndex = 0
    },
    getAudioSrc(state) {

    },
    setIsTap(state) {
      state.isTap = !state.isTap
    },
  },
  actions: {
    nextPage() {

    }
  },
  getters: {
    times(state) {
      return state.showDate.substr(0, 10).split('-')
    },
    getDate(state) {
      return state.date.substr(0, 10)
    },
    todayDatas(state) {
      return state.toDay.datas.slice(1)
    },
    onedayDatas(state) {
      return state.oneDay.datas.slice(1)
    },
    yesterdayDatas(state) {
      return state.yesterDay.datas.slice(1)
    },
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
export default store