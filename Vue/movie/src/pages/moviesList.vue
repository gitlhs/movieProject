
<template lang="html">
<div class="container">
			<div>
				<movie-index-header></movie-index-header>
			</div>

	<div class="contentMain">
		<div>
			<div class="contentLeft">

						<ul class="cont-ul">
							<movies-list v-for="item in movieItems" :key="item._id" :id="item._id" :movieName="item.movieName" :movieTime="item.movieTime"></movies-list>
						</ul>
			</div>
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
			movieItems:[]
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

<style>
</style>
