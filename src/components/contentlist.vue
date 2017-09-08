<template>
  <div>
    <section v-if="item.category!=8" v-for="(item,index) in datas" :key="index" class="contentlist mt20">
      <div class="illustr">
        <p class="title">- {{titles[index]}} -</p>
        <p class="author" v-if="item.author">{{item.author.user_name}}</p>
        <div v-if="item.category==4" class="music">
          <span :class="playIcon" @click="playMusic"></span>
          <img class="picture" v-if="item.img_url" :src="item.img_url" :style="{transform:'rotate('+timerCount+'deg)'}">
        </div>
        <div v-else>
          <img class="picture" v-if="item.img_url" :src="item.img_url">
        </div>
        <p class="text">{{item.forward}}</p>
      </div>
      <div class="fn">
        <p class="reporter">
          <span>{{times[1]}}月{{times[2]}}日</span>
        </p>
        <p class="share">
          <img src="../assets/img/share_gray@2x.png">
        </p>
        <p class="great">
          <img src="../assets/img/like_gray@2x.png">
          <span>{{item.like_count}}</span>
        </p>
      </div>
    </section>
    <section v-if="item.category==8" v-for="(item,index) in datas" :key="index" class="contentlist mt20 radiocontent">
      <div class="illustr">
        <div v-if="item.volume">
          <span class="logo"></span>
          <span class="play" :class="audioplayIcon" @click="playRadio" ref="playradio"></span>
          <p class="title">
            <span>{{item.volume}}</span>
            {{item.title}}
          </p>
        </div>
        <p v-if="!item.volume" class="name">{{item.title}}</p>
        <div class="radio">
          <img class="picture" :src="item.img_url">
        </div>
      </div>
      <div class="fn">
        <p @click="playRadio" v-if="!item.volume" class="reporter">
          <img src="../assets/img/user_center_voice@2x.png">
        </p>
        <p v-if="item.volume" class="reporter">
          <img :src="item.author.web_url">
          <span>{{item.author.user_name}}</span>
        </p>
        <p class="share">
          <img src="../assets/img/share_gray@2x.png">
        </p>
        <p class="great">
          <img src="../assets/img/like_gray@2x.png">
          <span>{{item.like_count}}</span>
        </p>
      </div>
    </section>
    <audio :src="audioSrc" ref="audio"></audio>
    <div class="feeds" @click.stop="prevDatas(times[0], times[1])">
      <img src="../assets/img/feedsBottomPlaceHolder@2x.png">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { getMenuList, getNowDatas, getDateDatas } from '@/assets/api/getdata'
export default {
  name: 'contentList',
  props: ['datas', 'titles'],
  data() {
    return {
      musicPlaying: false,
      audioPlay: false,
      timerCount: 0,
      timerInterval: null,
      n: 0,
    }
  },
  computed: {
    ...mapGetters([
      'times',

    ]),
    ...mapState({
      nextShow: state => state.nextShow,
      defaultAudios: state => state.defaultAudios,
      radioSrc: state => state.radioSrc,
      nextShowIndex: state => state.nextShowIndex
    }),
    audioSrc() {
      return this.radioSrc ? this.radioSrc : this.defaultAudios[this.n]
    },
    playIcon() {
      return this.musicPlaying ? 'pauseicon' : 'playicon'
    },
    audioplayIcon() {
      return this.audioPlay ? 'pauseicon' : 'playicon'
    }
  },
  watch: {

  },
  methods: {
    prevDatas(years, month) {
      this.$nextTick(() => {
        getMenuList(years, month).then(result => {
          this.$store.commit('getTopBarList', result)
          this.$store.commit('getNextShow')
          this.$store.commit('getNextShowIndex', 1)
          if (this.nextShowIndex > this.nextShow.length - 1) {
            this.$store.commit('setNextShowI')
            this.$store.commit('setEmpty')
            this.prevDatas(years, month - 1)
            return
          }
          getDateDatas(this.nextShow[this.nextShowIndex]).then(result => {
            this.$store.commit('getToDay', result)
          })
        })
        this.musicPlaying = this.audioPlay = false
      })
    },
    viewDatas(years, month) {

    },
    playMusic() {
      this.$nextTick(() => {
        if (this.musicPlaying) {
          this.$refs.audio.pause()
          clearInterval(this.timerInterval)
        } else {
          this.timerInterval = setInterval(() => {
            this.timerCount++;
          }, 32)
          this.$refs.audio.play()
        }
        this.musicPlaying = !this.musicPlaying
      })

    },
    playRadio() {
      if (this.radioSrc) {
        if (this.audioPlay) {
          this.$refs.audio.pause()
        } else {
          this.$refs.audio.play()
        }
      } else {
        this.n = Number(Math.abs(Math.ceil(Math.random() * 10 - this.defaultAudios.length - 1)))
        this.$nextTick(() => {
          if (this.audioPlay) {
            this.$refs.audio.pause()
          } else {
            this.$refs.audio.play()
          }
        })
      }
      this.audioPlay = !this.audioPlay
    },

  }
}
</script>

<style scoped>
.contentlist {
  padding: 0 0.4rem;
  background: #fff;
}

.contentlist .title {
  text-align: center;
  font-size: 0.24rem;
  line-height: 0.7rem;
  color: #b3b3b3;
}

.contentlist .name {
  font-size: 0.38rem;
  line-height: 0.7rem;
}

.contentlist .author {
  color: #ccc;
  font-size: 0.26rem;
  line-height: 0.7rem;
}

.contentlist .picture {
  width: 6.7rem;
  height: 4rem;
}

.contentlist .music {
  position: relative;
  width: 4rem;
  height: 4rem;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%
}

.contentlist .music>span {
  position: absolute;
  left: calc( 50% - .4rem);
  top: calc( 50% - .4rem);
  width: .8rem;
  height: .8rem;
  border-radius: 50%;
  z-index: 99;
}

.contentlist .music .playicon {
  background: rgba(0, 0, 0, .5) url('../assets/img/audioPlayIcon@2x.png') no-repeat .25rem;
  background-size: .3rem
}

.contentlist .music .pauseicon {
  background: rgba(0, 0, 0, .5) url('../assets/img/audioPauseIcon@2x.png') no-repeat .25rem;
  background-size: .3rem
}

.contentlist .music img {
  width: 100%;
  height: 100%;
}

.contentlist .text {
  color: #808080;
  width: 5.9rem;
  font-size: 0.28rem;
  line-height: 0.56rem;
}

.radiocontent {
  position: relative;
  padding: 0;
}

.radiocontent .picture {
  width: 7.5rem;
  height: 4.8rem;
}

.radiocontent .logo {
  position: absolute;
  left: 0.4rem;
  top: 0.34rem;
  width: 0.6rem;
  height: 0.7rem;
  background: url(../assets/img/logo_FM_white@2x.png) no-repeat;
  background-size: 0.6rem 0.7rem
}

.radiocontent .play {
  position: absolute;
  left: 0.4rem;
  top: 2.8rem;
  width: 0.6rem;
  height: 0.6rem;
}

.radiocontent .playicon {
  background: url(../assets/img/music_list_play@2x.png) no-repeat;
  background-size: 0.6rem
}

.radiocontent .pauseicon {
  background: url(../assets/img/music_list_pause@2x.png) no-repeat;
  background-size: 0.6rem
}

.radiocontent .fn {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 7.5rem;
  padding: 0 0.4rem;
  border-top: 1px solid rgba(255, 255, 255, .5);
}

.radiocontent .title {
  position: absolute;
  left: 1.2rem;
  bottom: 1rem;
  font-size: 0.40rem;
  color: rgba(255, 255, 255, .8);
  width: 5.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.radiocontent .title>span {
  font-size: 0.24rem;
  text-align: left;
  display: block
}

.radiocontent .name {
  position: absolute;
  left: calc( 50% - 1.25rem);
  bottom: 0.84rem;
  width: 2.5rem;
  font-size: 0.22rem;
  text-align: center;
  color: rgba(255, 255, 255, .8);
}

.radiocontent .reporter {
  margin-top: 0;
  height: 0.8rem;
}

.radiocontent .reporter>img {
  width: 0.48rem;
  height: 0.48rem;
  border-radius: 50%;
  margin-top: 0.15rem;
}

.radiocontent .reporter>span {
  line-height: 0.8rem;
}

.fn {
  margin-top: 0.24rem;
  height: 0.8rem;
  font-size: 0.22rem;
  overflow: hidden;
}

.fn .reporter {
  float: left;
  font-size: 0.22rem;
}

.fn>p {
  color: #ccc;
  float: right;
  padding: 0;
  height: 0.4rem;
  margin-top: 0.26rem;
}

.fn .great {
  width: 1rem;
  position: relative;
}

.fn .great>span {
  position: absolute;
  top: 0;
  font-size: 0.20rem;
  line-height: 1;
  color: #ccc;
}

.fn>p>img {
  width: 0.32rem;
  height: 0.32rem;
  margin-right: 0.05rem;
}

.feeds {
  height: 4rem;
  width: 7.5rem;
  text-align: center;
  margin-bottom: 0.98rem;
}

.feeds img {
  margin-top: 1rem;
  height: 2rem;
}
</style>
