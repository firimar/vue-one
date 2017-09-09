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
      if (state.cacheData.length) {
        state.cacheData.forEach(item => {
          if (item.date === result.data.date) {
            a = true
          }
        })
      }
      if (!a) {
        state.cacheData.push(result.data)
      }
    },
    getToDay(state, result) {
      state.date = result.data.date
      state.showDate = result.data.date
      state.toDay.datas = result.data.content_list
      state.toDay.menu = result.data.menu
      state.toDay.content = result.data.content_list[0]
    },
    getYesterDay(state) {
      state.yesterDay.datas = state.oneDay.datas
      state.yesterDay.menu = state.oneDay.menu
      state.yesterDay.content = state.oneDay.content
    },
    getOneDay(state) {
      state.oneDay.datas = state.cacheData[state.nextShowIndex].content_list
      state.oneDay.menu = state.cacheData[state.nextShowIndex].menu
      state.oneDay.content = state.cacheData[state.nextShowIndex].content_list[0]
      let n = state.cacheData[state.nextShowIndex].content_list.length - 1
      state.radioSrc = state.cacheData[state.nextShowIndex].content_list[n].audio_url
      state.defaultAudios = state.cacheData[state.nextShowIndex].content_list[n].default_audios
    },
    setPrev(state) {
      state.toDay.datas = state.cacheData[state.nextShowIndex].content_list
      state.toDay.menu = state.cacheData[state.nextShowIndex].menu
      state.toDay.content = state.cacheData[state.nextShowIndex].content_list[0]
      let n = state.cacheData[state.nextShowIndex].content_list.length - 1
      state.radioSrc = state.cacheData[state.nextShowIndex].content_list[n].audio_url
      state.defaultAudios = state.cacheData[state.nextShowIndex].content_list[n].default_audios
    },
    setYDay(state) {
      state.yesterDay.datas = state.toDay.datas
      state.yesterDay.menu = state.toDay.menu
      state.yesterDay.content = state.toDay.content
    },
    setP(state, res) {
      var n = 0
      state.cacheData.forEach((item, index) => {
        let d = item.date.substr(0, 10)
        if (d == res) {
          n = index - 1
          n = n <= 0 ? 0 : n
          state.toDay.datas = state.cacheData[n].content_list
          state.toDay.menu = state.cacheData[n].menu
          state.toDay.content = state.cacheData[n].content_list[0]
        }
      })
    },
    setN(state, res) {
      var n = 0
      state.cacheData.forEach((item, index) => {
        let d = item.date.substr(0, 10)
        if (d == res) {
          n = index
          state.oneDay.datas = state.cacheData[n].content_list
          state.oneDay.menu = state.cacheData[n].menu
          state.oneDay.content = state.cacheData[n].content_list[0]
        }
      })
    },
    setShowDate(state, res) {
      if (res) {
        state.showDate = state.cacheData[state.nextShowIndex - 1].date
      } else {
        state.showDate = state.cacheData[state.nextShowIndex].date
      }

    },
    getTopBarList(state, result) {
      state.topBarList.push(result.data)
      state.topBarList.reverse()
    },
    setEmpty(state) {
      state.topBarList = []
      //state.nextShow = []
    },
    getNextShow(state) {
      let date = new Date()
      let d = date.toLocaleDateString().split('/')
      d[1] = d[1] < 10 ? '0' + d[1] : "" + d[1]
      d[2] = d[2] < 10 ? '0' + d[2] : "" + d[2]
      d = d.join('-')
      let h = date.getHours()
      state.topBarList.forEach(item => {
        item.forEach(el => {
          state.nextShow.push(el.date)
          state.nextShow = [...new Set(state.nextShow)]
        })
      });
      if (state.nextShow[0] === d && h < 6) {
        state.nextShow.shift()
      }
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
      state.nextShowIndex = state.nextShowIndex <= 0 ? 0 : state.nextShowIndex
      console.log(state.nextShowIndex, 'num')
    },
    setNextShowI(state) {
      //state.nextShowIndex++
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