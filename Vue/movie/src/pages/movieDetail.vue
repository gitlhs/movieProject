<template lang="html">
<div class="container">
	<div>
		<movie-index-header></movie-index-header>
	</div>

	<div class="contentMain">
		<div class="">
			<h1>电影名称</h1>
			<div class="viewNum">下载次数：</div>
		</div>

		<div class="">
			<button>点击下载</button>
		</div>

		<div>
			<img class="headerImg" src="">
		</div>

		<div class="SupportBtn">点赞</div>
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
		}
	}
</script>

<style type="text/css" scoped>

</style>