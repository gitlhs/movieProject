<!-- 主页大图  -->

<!-- <template lang="html">
	<div class="headerPic"> -->
<!-- 		<div>
			<p class="imgTitle">{{recommendTitle}}</p>
		</div> -->
<!-- 			<a :href="recommendSrc">
				<img :src=imgUrl class="headerImg">
			</a> -->
<!-- 此组件暂时作废 -->

<!-- 	</div>
</template>

<script type="text/javascript">
	export default {
		props:['recommendSrc','recommendImg','recommendTitle'],
		data (){
			return{
			}
		}
 
	}
</script>

<style type="text/css" scoped>
.headerPic{
margin-top:5px;
margin-bottom: 10px;
}
.headerImg{
display: block;
margin:0 auto;
}

.imgTitle{
	float:left;
}
</style>