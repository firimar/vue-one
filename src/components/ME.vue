<template>
  <div class="ME">
    <div class="login">
      <span></span>
      <p>点击登录</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ME',
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.ME {
  height: 12.35rem;
  overflow: hidden;
  background: url(../assets/img/colored_bg_image.png) no-repeat;
  background-size: cover;
}

.login {
  margin: 3.36rem auto 0;
  width: 2rem;
  height: 2rem;
  text-align: center;
}

.login>span {
  margin: 0 auto;
  display: block;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background: url(../assets/img/userDefault@2x.png) no-repeat;
  background-size: 1.2rem;
}

.login>p {
  font-size: 0.3rem;
  line-height: 0.8rem;
  color: #fff;
}
</style>
