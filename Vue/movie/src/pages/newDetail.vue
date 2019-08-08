<template lang="html">
<div class="container">
	<div>
		<movie-index-header></movie-index-header>
	</div>

	<div class="contentMain">
		<h1>{{detail.articleTitle}}</h1>
		<div>{{detail.articleTime}}</div>
		<div class="contentText">{{detail.articleContext}}</div>
    	<comment v-bind:movie_id="article_id"></comment>

    </div>


			<common-footer></common-footer>

</div>

</template>

<script type="text/javascript">

	import VueResource from "vue-resource"
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
			article_id=this.$route.query.id
			this.article_id=article_id
			this.$http.post('http://localhost:3000/articleDetail',{
				article_id:article_id
			})
			.then((data)=>{
				this.detail=data.body.data[0];
				this.detail.articleTime=new Data(parseInt(this.detail.articleTime)).toLocaleString();
			})

		}
	}
</script>

<style type="text/css" scoped>
.contentMain{
	min-height: 600px;
}
</style>