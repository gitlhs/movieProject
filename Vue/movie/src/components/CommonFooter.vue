<!-- 公用的footer组件 -->
<template lang="html">
<!-- 	<div class="footer">
		<div class="foot">
			<p class="text">Vue.js尾部</p>
		</div>

	</div>	 -->
<Menu class="footer" mode="horizontal" theme='dark' active-name="1">
	<router-link to="/">
		<MenuItem name='1'>
			<Icon type="ios-papaer"></Icon>
				返回主页
		</MenuItem>
	</router-link>
<!-- 	<router-link to="/movieList">
		<MenuItem name="2">
			<Icon type="ios-people"></Icon>
				电影
		</MenuItem>
	</router-link> -->
	<div class="userMessage">
	<user-message></user-message>
	</div>
</Menu>
</template>

<script type="text/javascript">
	export default {

	}
</script>

<style type="text/css" scoped>
.footer{
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 60px;
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