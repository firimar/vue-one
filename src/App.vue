<template>
  <div id="app">
    <router-view></router-view>
    <footer id="footer"></footer>
  </div>
</template>

<script>
var html = document.documentElement;
var width = html.clientWidth;
html.style.fontSize = width / 7.5 + "px";
export default {
  name: 'app'
}
</script>

<style>
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

#footer {
  height: 0.98rem;
}

.mt20 {
  margin-top: 0.2rem;
}
</style>
