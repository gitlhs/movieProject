<template lang="html">
<div class="container">
	<div>
		<movie-index-header></movie-index-header><!-- 展示引入的header组件 -->
	</div>
<!-- 	<div class="userMessage">
		<user-message></user-message>
	</div> -->
	<div class="contentPic">
		<index-header-pic></index-header-pic><!-- 展示引入的大图组件 -->
	</div>
	<div class="contentMain">

		
			<div class="contentLeft">
				<ul class="cont-ul">
					<movies-list></movies-list><!-- 展示引入的MovieList组件 -->
				</ul>
			</div>
		
	

		
			<div class="contentRight">
				<ul class="cont-ul">
					<news-list></news-list><!-- 展示引入的nes-list组件 -->
				</ul>
			</div>
		

	</div>
	<common-footer></common-footer><!-- 展示引入的footer组件 -->


</div>

</template>

<script type="text/javascript">
//header组件
import MovieIndexHeader from '../components/MovieIndexHeader'
//footer组件
import CommonFooter from '../components/CommonFooter'
//新闻列表组件
import NewsList from '../components/NewsList'
//推荐电影列表组件
import MoviesList from '../components/MoviesList'
//大图推荐组件
import IndexHeaderPic from '../components/IndexHeaderPic'
//用户模块组件
import UserMessage from '../components/UserMessage'

	export default {
		data(){
			return{

			}
		},
		components:{
			MovieIndexHeader,
			CommonFooter,
			NewsList,
			MoviesList,
			IndexHeaderPic,
			UserMessage
		}
	}
</script>

<style type="text/css" scoped>
.contentMain {
	width: 1160px;
	margin:0 auto;
}
.contentLeft{
	display: inline-block;
	width: calc(100% - 306px);
}
.contentRight{
	display: inline-block;
}


</style>