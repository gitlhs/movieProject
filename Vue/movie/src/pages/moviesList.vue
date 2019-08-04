<!-- [HMR] Waiting for update signal from WDS... -->

<template lang="html">
<div class="container">
			<div>
				<movie-index-header></movie-index-header>
			</div>

			<div class="contentMain">
				<div>
					<div class="contentLeft">
						<ul class="cont-ul">
							<movies-list></movies-list>
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
	}

}
</script>

<style>
</style>
