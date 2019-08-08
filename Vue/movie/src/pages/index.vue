<template lang="html">
<div class="container">
	<div>
		<movie-index-header></movie-index-header><!-- 展示引入的header组件 -->
	</div>
<!-- 	<div class="userMessage">
		<user-message></user-message>
	</div> -->
	<div class="contentMain">
	<Row>
		<i-col span="24" offset="">
			<div class="contentPic">
				<index-header-pic v-for="item in headerItems" :key="item._id" :recommendTitle="item.recommendTitle"></index-header-pic>  <!-- 展示引入的大图组件 -->
				</div> 
		</i-col>
	</Row>

	




	

		<Row>
			<i-col span="11	" offset="1">
				<Card>
					<p slot="title">
						<Icon type="ios-film-outline" size="18"></Icon>
						电影
					</p>
					<ul class="cont-ul">
						<movies-list></movies-list>
					</ul>
				</Card>
			</i-col>


			<i-col span="11" offset="1">
				<Card>
					<p slot="title">
						<Icon type="ios-chatbubbles-outline" size="18"/>
						短评
					</p>
					<ul class="">
						<news-list v-for="item in newsItems" :key="item._id" :id="item._id" :articleTitle="item.articleTitle" :articleTime="item.articleTime">
						</news-list>
					</ul>
				</Card>

			</i-col>

		</Row>
		<Row>
			<i-col span="24">
				<common-footer></common-footer>
			</i-col>		
		</Row>

	</div>
	


</div>

</template>

<script type="text/javascript">

import axios from 'axios'
import VueResource from 'vue-resource'
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
		data(){ //定义变量
			return{
				headerItems:[], //主页推荐
				newsItems:[], //主页新闻列表
				movieItems:[] //主页电影列表
			}
		},
		created(){ //created钩子，此时已可以访问到之前不能访问到的数据，但是这时候组件还没被挂载，所以是看不到的
			this.$http.get('http://localhost:3000/showIndex').then((data)=>{
				this.headerItems=data.body.data;
				console.log(data.body.data)
			})
			this.$http.get('http://localhost:3000/showArticle').then((data)=>{
				this.newsItems=data.body.data;
				console.log(data.body.data)
			})
			this.$http.get('http://localhost:3000/showRanking').then((data)=>{
				this.movieItems=data.body.data;
				console.log(data.body.data)
			})
			//	主页推荐
			// axios.get('http://localhost:3000/showIndex')
			//   .then((response)=> {
			//     console.log(response);
			//     this.headerItems = response.data.data;
			//   })
			//   .catch(function (error) {
			//     console.log(error);
			//   });
			// //获取新闻
			// axios.get('http://localhost:3000/showArticle')
			//   .then((response)=> {
			//     console.log(response);
			//     this.newsItems = response.data.data;
			//   })
			//   .catch(function (error) {
			//     console.log(error);
			//   });			
			// //获取所有电影
			// axios.get('http://localhost:3000/showRanking')
			//   .then((response)=> {
			//     console.log(response);
			//     this.movieItems = response.data.data;
			//   })
			//   .catch(function (error) {
			//     console.log(error);
			//   });

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
/*	width: 1160px;
	margin:0 auto;*/
min-height: 100 %;
margin-bottom: -60px;
}
.contentLeft{
	display: inline-block;
	width: calc(100% - 306px);
}
.contentRight{
	display: inline-block;
	width:306px;
	float:right;
}
ul{
	list-style: none;
}

</style>