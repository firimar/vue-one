<template>
  <div class="ALL">
    <header class="header">
      <img src="../assets/img/all_title_view@2x.png" alt="">
      <span></span>
    </header>
    <div class="banner"></div>
    <section class="navwrap">
      <h2 class="navtitle">分类导航</h2>
      <nav class="nav">
        <a href="#">图文</a>
        <a href="#">问答</a>
        <a class="read" href="#">阅读</a>
        <a href="#">连载</a>
        <a href="#">影视</a>
        <a href="#">音乐</a>
        <a href="#">电台</a>
      </nav>
    </section>
    <section class="special">
      <a href="#"><img src="../assets/img/img.png" alt=""></a>
      <p class="text">文字文字文字文字文字,文字文字文字文字文字文字文字文字文字,文字文字文字文字</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ALL',
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
  text-align: center;
  padding-top: 0.5rem;
  width: 100%;
  height: 0.78rem;
  background: #fefefe;
}

.header img {
  width: 2.68rem;
  height: 0.28rem;
}

.header>span {
  position: absolute;
  right: 0.35rem;
  top: 0.4rem;
  width: 0.4rem;
  height: 0.4rem;
  background: url(../assets/img/search_gray@2x.png) no-repeat;
  background-size: 0.4rem
}

.navwrap {
  margin-top: 0.2rem;
  height: 4.8rem;
  background: #fff;
}

.navtitle {
  margin-left: 0.4rem;
  height: 0.8rem;
  font-size: 0.26rem;
  line-height: 0.8rem;
}

.banner {
  height: 4.48rem;
  background: #ccc;
}

.nav {
  margin: 0 auto;
  height: 3.44rem;
  width: 6.8rem;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
}

.nav>a {
  float: left;
  margin: 0.05rem;
  width: 1.6rem;
  padding-top: 0.94rem;
  font-size: 0.26rem;
  line-height: 0.66rem;
  background: #ccc;
  color: #fff;
  text-shadow: 1px 1px rgba(0, 0, 0, .5);
}

.nav>.read {
  width: 3.3rem;
}

.special {
  margin-top: 0.2rem;
  padding: 0.4rem;
  background: #fff;
}

.special img {
  width: 6.7rem;
  height: 4rem;
  background: #ccc;
}

.special .text {
  padding-top: 0.42rem;
  font-size: 0.32rem;
  line-height: 0.52rem
}
</style>
