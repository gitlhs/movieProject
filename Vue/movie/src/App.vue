<template>
  <div id="app">
<!--     <img src="./assets/logo.png"> -->
    <router-view/><!-- 路由文件配置的组件或页面都在router-view上显示 -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  margin:0;
  padding:0;

}
</style>
