<template>
  <div class="ONE">
    <content-header :times="times"></content-header>
    <div v-show="isTap" class="wrap  swiper-container" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
      <div ref="oneli" class="onewrap swiper-wrapper" :style="{transform: 'translate3d('+n+'px, 0px, 0px)'}">
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
        <!-- <div class="swiper-slide onelistwrap onelist3" ref="onelistprev">
                                                333
            <div class="onelist">
              <content-index :datas="onedayPage"></content-index>
              <content-menu :menu="onedayMenu" :titles="title"></content-menu>
              <content-list :datas="onedayDatas" :titles="title"></content-list>
            </div>
          </div> -->
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
      startX: 0,
      startY: 0,
      disX: 0,
      disY: 0,
      n: 0,
      l: 0
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
      this.showList(this.times[0], this.times[1])
      setTimeout(() => {

        this.nextDatas('getYesterDay')

        var mySwiper = new Swiper('.swiper-container', {
          direction: 'horizontal',
          loop: false,
          observer: true,
          observeParents: true,
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
            this.nextDatas('getYesterDay')
          },
          onSlideChangeEnd: swiper => {
            //if (swiper.activeIndex == 1) {
            this.nextDatas('getToDay')

            //  }

          },
          onTransitionEnd: swiper => {
            //mySwiper.wrapper.transitionEnd(() => {
            console.log(1)
            this.$refs.oneli.style.transform = 'translate3d(0px, 0px, 0px)'
            // })
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
        // this.$store.commit('getNextShowIndex')
      })
    },
    prevDatas(container, num) {
      this.$store.commit('getNextShowIndex', num || -1)
      if (this.nextShowIndex == 0) {
        this.$store.commit('setNextShowI')
        this.$store.commit('setEmpty')
        this.showList(this.times[0], this.times[1] * 1 + 1)
      }
      getDateDatas(this.nextShow[this.nextShowIndex]).then(result => {
        this.$store.commit(container, result)
      })
    },
    nextDatas(container) {
      this.$store.commit('getNextShowIndex', 1)
      console.log(this.nextShowIndex)
      if (this.nextShowIndex > this.nextShow.length - 1) {
        this.$store.commit('setNextShowI')
        this.$store.commit('setEmpty')
        this.showList(this.times[0], this.times[1] * 1 - 1)
      }
      getDateDatas(this.nextShow[this.nextShowIndex]).then(result => {
        this.$store.commit(container, result)
      })
    },
    touchstart($event) {
      this.startX = $event.changedTouches[0].pageX;
      this.startY = $event.changedTouches[0].pageY;


    },
    touchmove($event) {
      this.disX = $event.changedTouches[0].pageX - this.startX;
      this.disY = $event.changedTouches[0].pageY - this.startY;


    },
    touchend($event) {
      let x = this.disX
      let y = this.disY
      if (x > 0 && Math.abs(x) > Math.abs(y)) {
        console.log('右划')
        //this.n++
        // this.prevDatas()
      } else if (x < 0 && Math.abs(x) > Math.abs(y)) {
        console.log('左划')
        // this.n--
        //this.nextDatas()
      } else if (y > 0 && Math.abs(y) > Math.abs(x)) {
        console.log('上划')
      } else if (y < 0 && Math.abs(y) > Math.abs(x)) {
        console.log('下划')
      }
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
