<template lang="html">
	<li class="goods-list">
		<div class="newsList">
			<router-link :to="{path:'/newDetail',query:{id:id}}" class="goods-list-link">
				{{articleTitle}}
				{{articleTimeShow}}
			</router-link>
		</div>
	</li>
</template>

<script type="text/javascript">
	export default {
		data(){
			return{
				articleTimeShow:''
			}
		},
		props:[
		'id','articleTitle','articleTime'
		],
		created(){
			this.articleTimeShow=new Date(parseInt(this.articleTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
			//显示用户阅读的时间数据
		}
	}
</script>

<style type="text/css" scoped>
.newsList{

}
</style>