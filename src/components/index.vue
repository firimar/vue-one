<template>
  <div class="index">
    <ul class="navTabs">
      <li v-for="(item,index) in nav" :key="item">
        <router-link :to="'/'+item" :class="item">{{item}}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'index',
  data() {
    return {
      nav: ['ONE', 'ALL', 'ME']
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.navTabs {
  position: fixed;
  z-index: 999;
  left: 0;
  bottom: 0;
  border-top: 1px solid #b2b2b2;
  height: 0.98rem;
  width: 100%;
  background: #fefefe;
}

.navTabs>li {
  display: inline-block;
  width: 33.3%;
}

.navTabs>li>a {
  display: inline-block;
  width: 100%;
  height: 0;
  padding-top: 0.98rem;
  vertical-align: top;
  overflow: hidden;
}

.navTabs .ONE {
  background: url(../assets/img/homeSelectedV4@2x.png) no-repeat center;
  background-size: 0.8rem
}

.navTabs .ALL {
  background: url(../assets/img/allUnselectedV4@2x.png) no-repeat center;
  background-size: 0.8rem
}

.navTabs .ME {
  background: url(../assets/img/meUnselectedV4@2x.png) no-repeat center;
  background-size: 0.8rem
}
</style>
