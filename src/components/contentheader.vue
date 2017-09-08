<template>
  <section>
    <header class="header">
      <div class="date" @click="tap">
        <p>{{times[0]}}</p>
        <span>/</span>
        <p>{{times[1]}}</p>
        <span>/</span>
        <p>{{times[2]}}</p>
      </div>
      <i class="arrow" :style="{transform:'rotate('+rotate+')'}"></i>
      <i class="search"></i>
      <!-- <p class="local " v-show="isTap "><span>地球</span><span>对流层</span><span>-275℃</span></p> -->
    </header>
    <scroll v-show="!isTap" class="menu" ref="scroll" :data="topBarList">
      <div>
        <div v-for="(item,index) in topBarList" :key="index" class="wrap">
          <p class="month ">{{times[1]}}月</p>
          <div v-for="(el,index) in item " :key="index" class="cover mt20" @click="go(el.date)">
            <img @load="loadImg" :src="el.cover">
            <div class="date">
              <p>{{el.date.replace(/-/g, "/")}}</p>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div v-show="!isTap " class="select">
      <p>{{times[0]}} 年 {{times[1]}}</p>
      <i class="arrow "></i>
    </div>
  </section>
</template>
<script>
import { getMenuList, getDateDatas } from '@/assets/api/getdata'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import scroll from '../base/scroll/scroll'
export default {
  name: 'header',
  props: ['times'],
  data() {
    return {

    }
  },
  components: {
    scroll
  },
  computed: {
    rotate() {
      return this.isTap ? '0deg' : '-180deg'
    },
    ...mapGetters([
      'nextShowDate',
      'topBarList',
      'getDate'
    ]),
    ...mapState({
      topBarList: state => state.topBarList,
      isTap: state => state.isTap,
      cacheData: state => state.cacheData
    }),
  },
  methods: {
    ...mapMutations([

    ]),
    tap() {
      if (this.isTap) {
        this.$store.commit('setEmpty')
        getMenuList(this.times[0], this.times[1]).then(result => {
          this.$store.commit('getTopBarList', result)
          this.$store.commit('getNextShow')
        })
      }
      this.$store.commit('setIsTap')
    },
    go(date) {
      getDateDatas(date).then(result => {
        this.$store.commit('getToDay', result)
        this.$store.commit('setIsTap')
        this.$store.commit('setNextShowIndex')
        this.$store.commit('getCacheData', result)
        console.log(this.cacheData)
      })

    },
    loadImg() {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  height: 0.88rem;
  width: 7.5rem;
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
}

.header .date {
  width: 5rem;
  margin: 0 auto;
  text-align: center;
  font-size: 0.4rem;
  line-height: 0.88rem;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.date>span {
  margin: 0 0.2rem;
}

.date>p {
  display: inline-block;
  letter-spacing: 0.05rem;
}

.arrow {
  position: absolute;
  bottom: 0.1rem;
  left: calc( 50% - 0.1rem);
  width: 0.2rem;
  height: 0.1rem;
  background: url(../assets/img/nav_arrow@2x.png) no-repeat;
  background-size: 0.21rem 0.1rem;
  transition: 0.5s
}

.search {
  position: absolute;
  right: 0.35rem;
  top: 0.28rem;
  width: 0.4rem;
  height: 0.4rem;
  background: url(../assets/img/search_gray@2x.png) no-repeat;
  background-size: 0.4rem
}

.local {
  text-align: center;
  font-size: 0.20rem;
}

.menu {
  position: fixed;
  z-index: 98;
  left: 0;
  top: 0.8rem;
  bottom: 0.8rem;
  width: 7.5rem;
  background: #fff;
}

.month {
  font-size: 0.2rem;
  line-height: 0.8rem;
  text-align: center;
}

.cover {
  display: inline-block;
  box-sizing: border-box;
  width: 3.16rem;
  height: 3.16rem;
  border: 2px solid #eeeeee;
  overflow: hidden;
  margin-left: 0.4rem;
}

.cover img {
  width: 3.12rem;
  height: 2.08rem;
}

.cover .date {
  font-size: 0.32rem;
  line-height: 1.04rem;
  text-align: center;
  color: #808080;
}

.select {
  position: fixed;
  z-index: 99;
  left: 0;
  bottom: 0;
  height: 0.8rem;
  width: 7.5rem;
  border-top: 1px solid #eeeeee;
  background: #fbfbfb;
  font-size: 0.26rem;
  line-height: 0.8rem;
  text-align: center;
}

.select>p {
  display: inline-block;
}

.select .arrow {
  vertical-align: text-bottom;
}
</style>
