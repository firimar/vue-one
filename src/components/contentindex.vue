<template>
  <section class="content">
    <div class="illustr">
      <img class="picture" :src="datas.img_url" alt="">
      <p class="name">{{datas.title}}
        <span>|</span>{{datas.pic_info}}</p>
      <p class="text">{{datas.forward}}</p>
      <p class="author">{{datas.words_info}}</p>
    </div>
    <div class="fn">
      <p class="reporter">
        <img src="../assets/img/note_dark@2x.png" alt="">小记
      </p>
      <p class="share">
        <img src="../assets/img/share_gray@2x.png" alt="">
      </p>
      <p class="collect">
        <img src="../assets/img/collect_gray@2x.png" alt="">
      </p>
      <p class="great">
        <img src="../assets/img/like_gray@2x.png" alt="">
        <span>{{datas.like_count}}</span>
      </p>
    </div>
  </section>
</template>
<script>
export default {
  name: 'contentindex',
  props: ['datas'],
}
</script>

<style scoped>
.content {
  width: 7.5rem;
  height: auto;
  background: #fff;
}

.content .picture {
  width: 100%;
}

.content .name {
  text-align: center;
  font-size: 0.24rem;
  line-height: 0.7rem;
  color: #ccc;
}

.content .name>span {
  margin: 0 5px
}

.content .text {
  width: 5.9rem;
  margin: 0.26rem 0.8rem 0;
  font-size: 0.28rem;
  line-height: 0.56rem;
}

.content .author {
  text-align: center;
  font-size: 0.24rem;
  line-height: 0.96rem;
  color: #ccc;
}

.fn {
  margin-top: 0.24rem;
  height: 0.74rem;
  font-size: 0.22rem;
  overflow: hidden;
}

.fn>p {
  color: #ccc;
  float: right;
  height: 0.4rem;
}

.fn>p>img {
  width: 0.32rem;
  height: 0.32rem;
}

.fn .reporter {
  float: left;
  padding-left: 0.5rem;
}

.fn .great {
  width: 1rem;
  position: relative;
}

.fn .collect {
  margin: 0 0.3rem
}

.fn .share {
  margin: 0 0.3rem
}

.fn .great>span {
  position: absolute;
  top: 0;
  font-size: 0.20rem;
  line-height: 1;
  color: #ccc;
}
</style>
