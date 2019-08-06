<!-- 定义公用的头部组件 -->
<template lang="html">
	<div class="header">
		<div class="inner">
		<router-link to="/">
			<div class="header_menu" style="color:white">主页</div>
		</router-link>
		<router-link to="/moviesList">
			<div class="header_menu" style="color:white">电影</div>
		</router-link>
		<div style="clear:both"></div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {

	}
</script>

<style type="text/css" scoped>
.header{
	background-color: black;
	height: 60px;
	margin-bottom: 10px
}
.inner{
	width: 1160px;
	margin:0 auto;
}
.header_menu{
	float:left;
	position: relative;
	top:18px;
	width:50px;
}
</style>