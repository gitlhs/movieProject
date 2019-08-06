<!-- 主页大图 -->
<template lang="html">
	<div class="headerPic">
		<div>
			<p class="imgTitle">{{recommendTitle}}<!-- {{recommendTitle}} --></p>
		</div>
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
				imgUrl:'https://thumbs.dreamstime.com/z/%E7%BD%91%E7%94%B5%E5%BD%B1%E7%9A%84%E7%BD%91%E4%B8%8A%E6%88%8F%E9%99%A2%E6%A8%AA%E5%B9%85-%E4%B9%9Fcorel%E5%87%B9%E9%81%93%E4%BE%8B%E8%AF%81%E5%90%91%E9%87%8F-137779005.jpg'
			}
		}
 
	}
</script>

<style type="text/css" scoped>
.headerPic{

	height: 380px;
	color:#f7f7f7;
}
.headerImg{
		height: 380px;
}

.imgTitle{
	float:left;
}
</style>