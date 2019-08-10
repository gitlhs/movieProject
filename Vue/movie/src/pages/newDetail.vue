<template lang="html">
<div class="container">
	<div>
		<movie-index-header></movie-index-header>
	</div>

	<div class="contentMain">
		<h1>文章标题：{{detail.articleTitle}}</h1>
		<br>
		<h3>发布时间：{{detail.articleTime}}</h3>
		<br>
		<div class="contentText">文章内容：{{detail.articleContext}}</div>
		<br>
		网友评论：
		<br>
<!-- 		评论组件 -->
    	<comment v-bind:movie_id="article_id"></comment>

    </div>
			<common-footer></common-footer>
</div>

</template>

<script type="text/javascript">

	import VueResource from "vue-resource"
	import axios from 'axios'
	import MovieIndexHeader from '../components/MovieIndexHeader'
	import CommonFooter from '../components/CommonFooter'
	import Comment from '../components/Comment'

	export default {
		name:'NewDetail',
		data(){
			return{
				detail:[],
				article_id:''
			}
		},
		components:{
			MovieIndexHeader,
			CommonFooter,
			Comment
		},
		created(){
			this.article_id=this.$route.query.id
			
			this.$http.post('http://localhost:3000/articleDetail',{
				article_id:this.article_id
			})
			.then((data)=>{
				console.log(data)
				this.detail=data.body.data[0];
				this.detail.articleTime=new Data(parseInt(this.detail.articleTime)).toLocaleString();
			})

		}
	}
</script>

<style type="text/css" scoped>
h1{
	margin-top: 12px;
	font-size: 35px;
}
.contentMain{
	margin:0 100px;
	min-height: 600px;
}
</style>