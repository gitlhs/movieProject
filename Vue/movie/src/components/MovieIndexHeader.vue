<!-- 定义公用的头部组件 -->
<template lang="html">
	<div class="header">
		<div class="inner">
		<router-link to="/">
			<div class="header_menu">主页</div>
		</router-link>
		<router-link to="/movieList">
			<div class="header_menu">电影</div>
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
	background-color: #DDDDDD;
	height: 60px;
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