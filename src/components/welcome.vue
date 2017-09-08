<template>
  <div class="welcome">
    <img class="logo" src="../assets/img/ad_logo@2x.png" alt="">
    <img class="date" :src="'../../static/' +imgs[date] + '.png'">
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data() {
    return {
      imgs: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    }
  },
  computed: {
    date() {
      let date = new Date()
      return date.getDay()
    }
  }
}
</script>

<style scoped>
.welcome {
  position: fixed;
  left: 0;
  top: 0;
  height: 13.34rem;
  width: 7.5rem;
  z-index: 999;
  background: #fff;
}

.welcome .logo {
  position: absolute;
  left: calc( 50% - 1.2rem);
  top: 2.6rem;
  width: 2.04rem;
  height: 0.8rem;
}

.welcome .date {
  position: absolute;
  left: calc( 50% - 2.51rem);
  top: 3.62rem;
  width: 5.02rem;
  height: 5.9rem;
}
</style>
