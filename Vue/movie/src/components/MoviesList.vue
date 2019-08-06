<!-- 电影列表组件 -->
<template lang="html">
	<div class="movieList">
		<router-link :to="{path:'/movieDetail',query:{id:id}}" class="goods-list-link">
			{{movieName}}{{movieTimeShow}}
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
		'id','movieName','movieTime'
		],
		created(){
			this.movieTimeShow=new Date(parseInt(this.movieTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
			//显示用户阅读的时间数据
		}
	}
</script>

<style type="text/css" scoped>
.movieList{
	height: 100px;
	color:#2db7f5;
}

</style>