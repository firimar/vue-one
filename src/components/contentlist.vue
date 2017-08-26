<template>
  <div>
    <section v-for="(item,index) in datas.content_list.slice(1)" :key="index" class="contentlist mt20">
      <div class="illustr">
        <p class="title">- {{titles[index]}} -</p>
        <p class="name">{{item.title}}</p>
        <p class="author">{{item.author.user_name}}</p>
        <div v-if="item.category==4" class="music">
          <span :class="{'playicon':isPlay,'pauseicon':!isPlay}" @click="playMusic"></span>
          <img class="picture" :src="item.img_url" :style="{transform:'rotate('+timerCount+'deg)'}">
          <audio src="#"></audio>
        </div>
        <div v-else>
          <img class="picture" :src="item.img_url" alt="">
        </div>
        <p class="text">{{item.forward}}</p>
      </div>
      <div class="fn">
        <p class="reporter">今天</p>
        <p class="share">
          <img src="../assets/img/share_gray@2x.png" alt="">

        </p>
        <p class="great">
          <img src="../assets/img/like_gray@2x.png" alt="">
          <span>{{item.like_count}}</span>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'contentList',
  props: ['datas', 'titles'],
  data() {
    return {
      isPlay: true,
      timerCount: 0,
      timerInterval: null
    }
  },
  methods: {
    playMusic() {
      let music = document.querySelector('.music');
      let audio = music.querySelector('audio');
      let img = music.querySelector('.picture');
      if (this.isPlay) {
        audio.play();
        this.timerInterval = setInterval(() => {
          this.timerCount++;
          //img.style.transform = `rotate(${this.timerCount}deg)`;
        }, 32)
      } else {
        audio.pause();
        clearInterval(this.timerInterval);
      }
      this.isPlay = !this.isPlay
      console.log(audio)
    }
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
  font-size: 0.28rem;
  line-height: 0.7rem;
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

.contentlist img {
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
  z-index: 999;
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

.fn {
  margin-top: 0.24rem;
  height: 0.74rem;
  font-size: 0.22rem;
  overflow: hidden;
}

.fn .reporter {
  float: left;
  padding-left: 0.5rem;
}

.fn .great {
  width: 1rem;
  position: relative;
}

.fn>p {
  color: #ccc;
  float: right;
  height: 0.4rem;
}

.fn .great>span {
  position: absolute;
  top: 0;
  font-size: 0.12rem;
  line-height: 1;
  color: #ccc;
}

.fn>p>img {
  width: 0.32rem;
  height: 0.32rem;
}

.contentlist .fn>p {
  padding: 0;
  margin: 0
}

.rotation-enter-active {
  transition: all 1s linear;
  transform: rotate(60deg);
}
</style>
