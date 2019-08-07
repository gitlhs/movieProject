<!-- 定义公用的头部组件 -->
<template lang="html">
	<Menu mode="horizontal" theme='dark' active-name="1">
		<router-link to="/">
			<MenuItem name='1'>
				<Icon type="ios-papaer"></Icon>
					主页
			</MenuItem>
		</router-link>
		<router-link to="/movieList">
			<MenuItem name="2">
				<Icon type="md-videocam" size="18"/>
					电影
			</MenuItem>
		</router-link>
		<div class="userMessage">
		<user-message></user-message>
		</div>
	</Menu>
</template>

<script type="text/javascript">
//用户模块组件
import UserMessage from '../components/UserMessage'
	export default {
		components:{
			UserMessage
		}
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