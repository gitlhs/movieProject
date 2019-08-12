<!-- 公用的footer组件 -->
<template lang="html">
<el-menu
  class="el-menu-demo"
  mode="horizontal"
  
  background-color="#515a6e"
  text-color="#fff" router>
	<el-menu-item index="/">返回主页</el-menu-item><!-- 注意el-menu标签打开router属性，将default-active绑定为$route.path -->
		
</el-menu>
</template>

<script type="text/javascript">
	export default {

	}
</script>

<style type="text/css" scoped>
.footer{
	position: relative;
	bottom: 0;
	width: 100%;
	height: 60px;
	margin-top: 10px;
}
.foot{
	color:white;
	width: 1160px;
	margin:0 auto;
}
.text{
	text-align: center
}
</style>