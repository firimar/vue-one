<template>
  <div class="index">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <ul v-show="isTap" class="navTabs">
      <li v-for="(item,index) in nav" :key="item">
        <router-link :to="'/'+item" :class="item">{{item}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'index',
  data() {
    return {
      nav: ['ONE', 'ALL', 'ME'],
    }
  },
  computed: {
    ...mapState({
      isTap: state => state.isTap
    }),
  },
}
</script>

<style scoped>
.navTabs {
  position: fixed;
  z-index: 90;
  left: 0;
  bottom: 0;
  border-top: 1px solid #b2b2b2;
  height: 0.98rem;
  width: 7.5rem;
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
  background: url(../assets/img/homeUnselectedV4@2x.png) no-repeat center;
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

.navTabs .ONE.router-link-active {
  background: url(../assets/img/homeSelectedV4@2x.png) no-repeat center;
  background-size: 0.8rem
}

.navTabs .ALL.router-link-active {
  background: url(../assets/img/allSelectedV4@2x.png) no-repeat center;
  background-size: 0.8rem
}

.navTabs .ME.router-link-active {
  background: url(../assets/img/meSelectedV4@2x.png) no-repeat center;
  background-size: 0.8rem
}
</style>
