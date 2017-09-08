<template>
  <div v-if="menu.length" class="column">
    <p class="title">一个VOL.{{menu.vol}}</p>
    <ul class="list">
      <li v-for="(item,index) in menu.list" :key="index">
        <span>{{titles[index]}}</span>
        <p class="text">{{item.title}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'column',
  props: ['menu', 'titles'],
}
</script>

<style scoped>
.column {
  margin-top: 0.2rem;
  line-height: 0.8rem;
  background: #fff;
}

.column .title {
  text-align: center;
  height: 0.8rem;
  font-size: 0.26rem;
  color: #ccc;
}

.list>li {
  height: 1.1rem;
  padding-left: 0.82rem;
}

.list>li>span {
  font-size: 0.24rem;
  line-height: 0.28rem;
  display: block;
}

.list>li>.text {
  font-size: 0.26rem;
  line-height: 0.5rem;
}
</style>
