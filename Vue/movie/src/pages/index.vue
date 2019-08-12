<template lang="html">
<div class="container">
	<div>
		<movie-index-header></movie-index-header><!-- 展示引入的header组件 -->
	</div>
		<!-- banner -->

		<el-row>
		  <el-col :span="24">
		  		<div class="block">
			    <span class="demonstration"> &nbsp</span>

			    <el-carousel  height="60vh">
			      <el-carousel-item v-for="imgUrl in recommendSrc" >
			        <router-link to="/newDetail">
							<img :src=imgUrl class="headerImg">
					</router-link>
			      </el-carousel-item>
			    </el-carousel>

			  </div>
		  </el-col>
		</el-row>
	  

		<br>

</el-row>
<br>

	<el-row >	
		<el-col :span="24">
		
				<!-- movieList -->
					<div class=inner>

						<div class="movie-list">
							<div class="movie-card">
						  		<h2 slot="title">
						  		<i class="el-icon-film"></i>
									电影推荐
								</h2>
								<!-- //这里使用slice可以限制v-for的遍历数量 -->
								<movies-list  v-for="item in movieItems.slice(0,10)" :key="item._id" :id="item._id" :movieName="item.movieName" :movieTime="item.movieTime" :movieImg="item.movieImg">
								</movies-list>
							</div>

									

						</div>

					</div>
				<!-- movieComment -->

				<div class="contentRight">
								  		<h2 slot="title">
										<i class="el-icon-chat-line-round"></i>
												最新短评
										
										</h2>
										<div class="data-list">
											<news-list v-for="item in newsItems.slice(0,12)" :key="item._id" :id="item._id" :articleTitle="item.articleTitle" :articleTime="item.articleTime">
											</news-list>
										</div>
							  		</div>
			
		</el-col>
	</el-row>
			<el-col :span="24">
				<common-footer></common-footer>
			</el-col>		
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
				movieItems:[], //主页电影列表
				recommendSrc:[],//主页推荐里的图片链接 ?如何同时把movieSrc和movieImg(豆瓣Url数据)的内容都保存进这个数组
				movieImg:[],
				imgHeight:""


			}
		},
		created(){ //created钩子，此时已可以访问到之前不能访问到的数据，但是这时候组件还没被挂载，所以是看不到的
			// this.$http.get('/showIndex').then((data)=>{
			// 	this.headerItems=data.body.data;
			// 	//使用map方法过滤出需要的同属性/key数据
			// 	this.recommendSrc=this.headerItems.map(x=>{return x.recommendSrc})//用于显示banner图片
			// 	//recommendImg用于保存链接
			// 	console.log(this.recommendSrc)
			// })
			axios.get('/showIndex').then((res)=>{
				this.headerItems=res.data.data;
				this.recommendSrc=this.headerItems.map(x=>{return x.recommendSrc})
				console.log(this.recommendSrc)
			})

			axios.get('/showArticle').then((res)=>{
				this.newsItems=res.data.data;
			})

			// this.$http.get('/showArticle').then((data)=>{
			// 	this.newsItems=data.body.data;
				
			// })
			axios.get('/showRanking').then((res)=>{
				this.movieItems=res.data.data;
			})

			// this.$http.get('/showRanking').then((data)=>{
			// 	this.movieItems=data.body.data;
				
			// })
		},
		beforeMount:function(){
         this.height = (window.innerWidth)*460/1440 + 'px';
		},
		mounted(){


		},
		components:{
			MovieIndexHeader,
			CommonFooter,
			NewsList,
			MoviesList,
			IndexHeaderPic,
			UserMessage,
		},
		methods:{
			imgLoad(){
				this.$nextTick(function(){
					this.imgHeight = this.$refs.imagee[0].height;

				});
			},
		}
	}
</script>

<style type="text/css" scoped>

.inner{
/*	display: flex;	*/
}
h2{
	font-size: 32px;
	margin-bottom: 24px;

}
.inner{
	display: inline-block;
	margin-left: 80px;
	width: 66% /*重要啊啊啊啊*/
	/*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
}
.movie-card{ 
	min-height: 500px;
	display: inline-block;
	margin:0 auto;


}	
.movieList{ /*电影海报块*/

	vertical-align: top;/*重要*//*注意是在海报块中使用而不是在父元素用*/
	width: 174px;
	height: 254px;
	margin: 8px;
	padding:0 16px 24px 0;
	display: inline-block;
	background-color: white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.movieList:hover{
	z-index:2;
/*	-webkit-box-shadow:0 15px 30px rgba(0,0,0,0.1);
	box-shadow: 0 15px 30px rgba(0,0,0,0.1);*/
/*	-webkit-transform:translate3d(0,-3px,0);
	transform: translate3d(0,-3px,0);*/
	transform: scale(1.1);
	transition:all 0.4s;
	/*重要，	表示所有的属性变化在0.4s的时间段内完成*/
}
.contentRight{
	float: right;
	padding-left: 5px;
	margin-right: 26px;
	display: inline-block;
	/*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)	*/
}
.goods-list:hover{
	transform: scale(1.3);
}
.data-list{
/*	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)*/
}

.headerImg{
	display: block;/*重要，img默认是内联标签*/
	margin:auto;
	max-width:100%; /*重要，使图片自适应*/
	max-height: 100%;

}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
.el-carousel__item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

}
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
     margin:0;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #99a9bf;
  }
    .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>