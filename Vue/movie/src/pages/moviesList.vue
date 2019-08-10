
<template lang="html">
<div class="container">
			<div>
				<movie-index-header></movie-index-header>
			</div>

	<div class="contentMain">

			

						<div class="inner">

							<movies-list v-for="item in movieItems" :key="item._id" :id="item._id" :movieName="item.movieName" :movieTime="item.movieTime" :movieImg="item.movieImg">
							</movies-list>

						</div>
			

	</div>

			<div>
				<common-footer></common-footer>	
			</div>
</div>
</template>

<script>
import axios from 'axios'
//header组件
import MovieIndexHeader from '../components/MovieIndexHeader'
//footer组件
import CommonFooter from '../components/CommonFooter'
//推荐电影列表组件
import MoviesList from '../components/MoviesList'

export default {
	components:{
		MovieIndexHeader,
		CommonFooter,
		MoviesList
	},
	data(){
		return{
			movieItems:[],
			movieSrc:[]
		}
	},
	created(){
	//主页推荐
	axios.get('http://localhost:3000/showRanking') //该API还未实现
	  .then((response)=> {
	    console.log(response);
	    this.movieItems = response.data.data;
	  })
	  .catch(function (error) {
	    console.log(error);
	  });

	}

}
</script>

<style type="text/css" scoped> /*scoped很重要*/
.contentMain{
	min-height: 540px;
}

.movie-item{

}
.inner{
	margin:30px 90px 0 90px;
}
.movieList{
	display: inline-block;
	margin-top: 10px;
	padding:0 10px 0 10px;
	border-radius:8px;
	height: 246.38px;
	vertical-align: top; /*！注意是在海报块！！！中使用而不是父元素inner*/

}


.movieList:hover{
	z-index:3;
	-webkit-box-shadow:0 15px 30px rgba(0,0,0,0.1);
	box-shadow: 0 15px 30px rgba(0,0,0,0.1);
/*	-webkit-transform:translate3d(0,-3px,0);
	transform: translate3d(0,-3px,0);*/
	transform: scale(1.1);
	transition:all 0.4s;
	/*重要，	表示所有的属性变化在0.4s的时间段内完成*/
}
</style>
