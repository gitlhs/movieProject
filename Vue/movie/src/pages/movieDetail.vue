ajax请求api：/movie/detail
<template lang="html">
<div class="container">
	<div>
		<movie-index-header></movie-index-header>
	</div>

	<div class="contentMain">
		<div class="">
			<h1>{{detail.movieName}}</h1>
			<div class="viewNum">下载次数：{{detail.movieNumDownload}}</div>
		</div>

		<div class="">
			<button v-on:click="movieDownload()">点击下载</button>
		</div>

		<div>
			<img class="headerImg" :src="detail.movieImg">
		</div>
		<div v-on:click="support()" class="btnPosition"></div>

		<div class="SupportBtn">点赞数为：<div>{{detail.movieNumsuppose}}</div></div>
	</div>
	<comment v-bind:movie_id="movie_id"></comment>


	<div>
		<div>
			<common-footer></common-footer>
		</div>
	</div>

</div>

</template>

<script type="text/javascript">
	import axios from 'axios'
	import MovieIndexHeader from '../components/MovieIndexHeader'
	import CommonFooter from '../components/CommonFooter'
	import Comment from '../components/Comment'

	export default {
		name:'MovieDetail',
		data(){
			return{
				detail:[],
			}
		},
		components:{
			MovieIndexHeader,
			CommonFooter,
			Comment
		},
		created(){
			//初始化后获取电影内容
			this.movie_id=this.$route.query.id
			movie_id=this.$route.query.id
			this.$http.post('http://localhost:3000/movie/detail',{id:movie_id}).then((data)=>{
				this.detail=data.body.data;
			})

		},
		methods:{
			//点赞
			support:function(event){
				this.$http.post('http://localhost:3000/movie/support',{id:movie_id})
				.then((data1)=>{
					let data_temp=data1.body
					let that=this
					console.log(data_temp)
					if(data_temp.status===0){
						this.$http.post('http://localhost:3000/movie/showNumber',{id:movie_id})
						.then((data2)=>{
							that.detail['movieNumsuppose']=data2.body.data.movieNum 
						}) //后面的Suppose不知道干什么用
					}else{
						alert(data_temp.message)
					}
				})
			},
			//电影下载
			movieDownload:function(event){
			axios.post('http://localhost:3000/movie/download', {
			    movie_id: 'movie_id',
			  })
			  .then(function (response) {
			    console.log(response);
			    if(response.status==1){
			    	alert(response.message)
			    }else{
			    	//跳转至下载链接
			    	window.location = response.data;
			    }
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
			}
		},
	}
</script>

<style type="text/css" scoped>

</style>