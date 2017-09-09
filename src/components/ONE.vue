<template>
  <div class="ONE">
    <content-header :times="times"></content-header>
    <div v-show="isTap" ref="Wrap" class="wrap  swiper-container">
      <div ref="oneli" class="onewrap swiper-wrapper">
        <scroll class="swiper-slide onelistwrap" ref="scrollT">
          <div class="onelist">
            <content-index :datas="todayPage"></content-index>
            <content-menu :menu="todayMenu" :titles="title"></content-menu>
            <content-list :datas="todayDatas" :titles="title"></content-list>
          </div>
        </scroll>
        <scroll class="swiper-slide onelistwrap" ref="scrollY">
          <div class="onelist" ref="oneList">
            <content-index :datas="yesterdayPage"></content-index>
            <content-menu :menu="yesterdayMenu" :titles="title"></content-menu>
            <content-list :datas="yesterdayDatas " :titles="title"></content-list>
          </div>
        </scroll>
        <div class="swiper-slide onelistwrap">
          <div class="onelist">
            <content-index :datas="onedayPage"></content-index>
            <content-menu :menu="onedayMenu" :titles="title"></content-menu>
            <content-list :datas="onedayDatas" :titles="title"></content-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import { getMenuList, getNowDatas, getDateDatas } from '@/assets/api/getdata'
import scroll from '@/base/scroll/scroll';
import contentHeader from './contentheader';
import contentIndex from './contentIndex';
import contentMenu from './contentMenu';
import contentList from './contentlist';
import '@/assets/css/swiper-3.4.2.min.css';
import '@/assets/js/swiper-3.4.2.min.js';

export default {
  name: 'ONE',
  data() {
    return {
      first: true
    }
  },
  components: {

    scroll,
    contentHeader,
    contentIndex,
    contentMenu,
    contentList,
  },
  computed: {

    ...mapGetters([
      'times',
      'todayDatas',
      'onedayDatas',
      'yesterdayDatas'
    ]),
    ...mapState({
      date: state => state.date,
      todayPage: state => state.toDay.content,
      onedayPage: state => state.oneDay.content,
      yesterdayPage: state => state.yesterDay.content,
      todayMenu: state => state.toDay.menu,
      onedayMenu: state => state.oneDay.menu,
      yesterdayMenu: state => state.yesterDay.menu,
      title: state => state.titles,
      isTap: state => state.isTap,
      nextShow: state => state.nextShow,
      nextShowIndex: state => state.nextShowIndex,
      cacheData: state => state.cacheData,
      topBarList: state => state.topBarList
    }),
  },
  created() {
    getNowDatas().then(result => {
      this.$store.commit('getToDay', result)
      this.$store.commit('getCacheData', result)
      this.showList(this.times[0], this.times[1])
      setTimeout(() => {
        this.nextDatas(true)
        this.$refs.scrollT.refresh()
        var mySwiper = new Swiper('.swiper-container', {
          direction: 'horizontal',
          loop: false,
          speed: 200,
          //observer: true,
          // observeParents: true,
          onTouchMove: function(swiper) {
            if (swiper.activeIndex == 0 || swiper.activeIndex == 2) {
              swiper.lockSwipeToPrev();
            } else {
              swiper.unlockSwipeToPrev();
            }
          },
          onTransitionEnd: swiper => {
            let v = swiper.touches.currentX - swiper.touches.startX
            let l = this.$refs.Wrap.offsetWidth
            if (swiper.isBeginning && v > 0 && Math.abs(v) > l / 2) {
              this.$store.commit('setShowDate')
              this.prevDatas()
            } else if (v < 0 && Math.abs(v) > l / 2) {
              this.$store.commit('setShowDate')
              this.nextDatas()

            }
            swiper.activeIndex = 1
            this.$refs.oneli.style.transform = 'translate3d(-' + l + 'px, 0px, 0px)'
            this.$refs.oneList.style.transform = 'transform:translate(0px, 0px)translateZ(0px)'
            this.$refs.scrollY.refresh()
          },
        })
      }, 1000)

    })
  },
  mounted() {
  },
  methods: {
    showList(years, month) {
      getMenuList(years, month).then(result => {
        this.$store.commit('getTopBarList', result)
        this.$store.commit('getNextShow')
      })
    },
    prevDatas() {
      this.$store.commit('setYDay')
      this.$store.commit('getNextShowIndex', -1)
      this.$store.commit('setPrev')
      this.$store.commit('setP', this.nextShow[this.nextShowIndex - 1])
      this.$store.commit('setN', this.nextShow[this.nextShowIndex])
      this.$store.commit('setShowDate', true)
    },
    nextDatas(flag) {
      this.$store.commit('getYesterDay')
      this.$store.commit('setP', this.nextShow[this.nextShowIndex])
      this.$store.commit('getNextShowIndex', 1)
      if (this.nextShowIndex == this.nextShow.length - 1) {
        this.showList(this.times[0], this.times[1] * 1 - 1)
      }
      getDateDatas(this.nextShow[this.nextShowIndex]).then(result => {
        this.$store.commit('getCacheData', result)
        this.$store.commit('getOneDay')
        if (flag) {
          this.$store.commit('getYesterDay')
        }
      })
    },
  },
}

</script>
<style scoped>
.ONE {
  width: 7.5rem;
  overflow: hidden;
}

.wrap {
  position: fixed;
  top: 0.88rem;
  left: 0rem;
  bottom: 0.98rem;
  width: 7.5rem;
  overflow: hidden;
}

.onewrap {
  position: relative;
  width: 22.5rem;
  transition: transform 0.5s ease-out;
}







































































































































/* .onelist1 {
  left: 0rem;
}

.onelist2 {
  left: 7.5rem;
}

.onelist3 {
  left: 15rem
} */

.onelistwrap {
  /* position: absolute;
  top: 0;
  overflow: hidden; */
  height: 11.48rem;
  width: 7.5rem;
}
</style>
