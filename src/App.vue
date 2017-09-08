<template>
  <div id="app">
    <welcome v-if="is"></welcome>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <footer class="footer"></footer>
  </div>
</template>

<script>
document.documentElement.addEventListener('touchstart', function(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, false);

var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function(event) {
  var now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);
var html = document.documentElement;
var width = html.clientWidth;
html.style.fontSize = width / 7.5 + "px";

import welcome from './components/welcome'
export default {
  name: 'app',
  data() {
    return {
      is: true,
    }
  },
  components: {
    welcome
  },

  methods: {
    setwelcome() {
      setTimeout(() => {
        this.is = false
      }, 2000)
    }
  },
  created() {
    this.setwelcome()
  },
}
</script>

<style>
body {
  font-family: PingFangSC-Regular, MicrosoftYaHeiLight
}

body,
p {
  margin: 0
}

h1,
h2,
h3,
h4 {
  margin: 0;
  font-weight: normal;
}

a {
  text-decoration: none;
}

img {
  vertical-align: top;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

body {
  background: #eee;
}

.footer {
  height: 0.98rem;
}

.mt20 {
  margin-top: 0.2rem;
}
</style>
