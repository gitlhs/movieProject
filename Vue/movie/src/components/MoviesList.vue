<!-- 电影列表组件 -->
<template lang="html">
	<div class="movieList">
		<router-link  :to="{path:'/movieDetail',query:{id:id}}" class="goods-list-link">
		<img class="m_img" :src="movieImg"> <!-- 这里忘了加：绑定数据，捂脸🤦‍♂️ -->
			<br>《{{movieName}}》<!-- {{movieTimeShow}} -->
		</router-link>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return{
				movieTimeShow:''
			}
		},
		props:[
		'id','movieName','movieTime','movieImg'
		],
		created(){
			this.movieTimeShow=new Date(parseInt(this.movieTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
			//显示用户阅读的时间数据
		}
	}
</script>

<style type="text/css" scoped>
.m_img{
	width: 154.8px;
	min-height: 206.39px;
	display: block;
	border-radius: 5px;
}
a {
	font-size: 13px;
}
.movieList{
	text-align: center;
}

</style>