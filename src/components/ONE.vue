<template>
  <div class="ONE">
    <content-header :times="times"></content-header>
    <div v-show="isTap" ref="Wrap" class="wrap  swiper-container">
      <div ref="oneli" class="onewrap swiper-wrapper">
        <div class="swiper-slide onelistwrap onelistn1" ref="onelistnext">
          111
          <div class="onelist">
            <content-index :datas="todayPage"></content-index>
            <content-menu :menu="todayMenu" :titles="title"></content-menu>
            <content-list :datas="todayDatas" :titles="title"></content-list>
          </div>
        </div>
        <div class="swiper-slide onelistwrap onelist2" ref="onelistcent">
          222
          <div class="onelist">
            <content-index :datas="yesterdayPage"></content-index>
            <content-menu :menu="yesterdayMenu" :titles="title"></content-menu>
            <content-list :datas="yesterdayDatas " :titles="title"></content-list>
          </div>
        </div>
        <div class="swiper-slide onelistwrap onelist3" ref="onelistprev">
          <div class="onelist">
            333
            <content-index :datas="onedayPage"></content-index>
            <content-menu :menu="onedayMenu" :titles="title"></content-menu>
            <content-list :datas="onedayDatas" :titles="title"></content-list>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="swiper-pagination"></div>
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
        var mySwiper = new Swiper('.swiper-container', {
          direction: 'horizontal',
          loop: false,
          //observer: true,
          // observeParents: true,
          // onTouchMove: function(swiper) {
          //   if (swiper.activeIndex == 1) {
          //     swiper.lockSwipeToPrev();
          //   } else {
          //     swiper.unlockSwipeToPrev();
          //   }
          // },
          // 如果需要分页器
          pagination: '.swiper-pagination',

          onSlideChangeStart: swiper => {

          },
          onSlideChangeEnd: swiper => {

          },
          onTransitionEnd: swiper => {
            this.$store.commit('setShowDate')
            let v = swiper.touches.currentX - swiper.touches.startX
            let l = this.$refs.Wrap.offsetWidth / 2
            console.log(v, l)
            if (swiper.isBeginning && v > 0 && Math.abs(v) > l) {
              this.prevDatas()
              this.$refs.oneli.style.transform = 'translate3d(-7.5rem, 0px, 0px)'
              console.log("1234")
            } else if (v < 0 && Math.abs(v) > l) {
              this.nextDatas()
              this.$refs.oneli.style.transform = 'translate3d(-7.5rem, 0px, 0px)'
              console.log("4321")
            }

          }
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
      this.$store.commit('getNextShowIndex', -1)
      if (this.nextShowIndex == 0) {
        this.$store.commit('setNextShowI')
        this.$store.commit('setEmpty')
        this.showList(this.times[0], this.times[1] * 1 + 1)
      }
      getDateDatas(this.nextShow[this.nextShowIndex]).then(result => {
        this.$store.commit('getCacheData', result)
        this.$store.commit('getToDay')
      })
    },
    nextDatas(flag) {
      this.$store.commit('getYesterDay')
      this.$store.commit('getNextShowIndex', 1)
      if (this.nextShowIndex > this.nextShow.length - 1) {
        this.$store.commit('setNextShowI')
        this.$store.commit('setEmpty')
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

.onelistwrap {
  /* position: absolute;
  top: 0;
  overflow: hidden; */
  height: 11.48rem;
  width: 7.5rem;
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
</style>
