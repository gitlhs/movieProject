<!-- 主页大图 -->
<template lang="html">
	<div class="headerPic">
<!-- 		<div>
			<p class="imgTitle">{{recommendTitle}}</p>
		</div> -->
			<a>
				<img :src=imgUrl class="headerImg">
			</a>

	</div>
</template>

<script type="text/javascript">
	export default {
		props:['recommendSrc','recommendImg','recommendTitle'],
		data (){
			return{
				imgUrl:'https://image14.m1905.cn/uploadfile/2019/0807/thumb_1_1380_460_20190807020556393759.jpg'
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