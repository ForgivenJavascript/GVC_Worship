<template>
  <div id="body">
    <router-view :key="$route.path" />
    ver {{version}}
  </div>
  <!--img alt="Vue logo" src="./assets/logo.png"-->
</template>

<script>
import Login from './modules/authentication/Login.vue';

export default {
  name: 'App',
  components: {
    Login
  },
  data() {
    return {
      version: ''
    }
  },
  created() {
    this.version = require('@/../package.json').version;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
