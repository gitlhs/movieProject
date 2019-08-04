<template>
  <div>用户路由解隅页面，Hello{{id}}</div>
    <!-- 浏览器url上填的参数id与组件里$route.params.id绑定 -->
</template>

<script>
export default {
	props:['id']
}
</script>

<style>
</style>
