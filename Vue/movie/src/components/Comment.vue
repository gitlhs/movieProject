<template lang="html">
<div>
<!-- <label>电影评论:{{item.context}}</label> -->
<div class="box">
	<div class="comment_item" v-for="item in items"><h3>{{item.username}}：</h3><div class="comment-text">{{item.context}}</div></div>
</div>
<br>
发表评论：

<div>
	<textarea class="comment-area" v-model="context" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"></textarea>
</div>
<div>
	<button class="btn" v-on:click="send_comment"><a>发表</a></button>
</div>
</div>
 <!-- 获取所有的评论，并且可以发布评论，对于文章详情页也可以使用 -->
</template>

<script type="text/javascript">

import axios from 'axios'
export default {
		props:['movie_id'],
		data(){
			return{
				//目的：用数据源填充这两个对象
				items:[],
				context:'',
			}
		},
		created(){
			//初始化后用 传来的电影id去请求（对应的评论）数据 并填入网页
			axios.post('/movie/comment',{ //api正常
				movie_id:this.movie_id})
			.then((data)=>{
				console.log(data)
				if(data.data.status==0){
					this.items=data.data.data
					console.log('获取到数据了')
				}else{
					console.log('获取评论失败或该电影评论不存在')
				}
			})

		},
		methods:{
			send_comment(event){
				let send_data;
				if(typeof(localStorage.username)!="undefined"){
					send_data={
						movie_id:this.movie_id,
						context:this.context,
						username:localStorage.username}
					}else{
						send_data={
							movie_id:this.movie_id,
							context:this.context,
						}
					}
					axios.post('/users/postComment',send_data)
					.then((data)=>{
						alert(data.data.message)
					})
				}
			},
}
	
</script>

<style type="text/css" scoped>

.comment-area{
	width: 705px;
	height: 65px;
	padding: 5px 10px;
	border-radius: 5px;
	margin-top: 10px;
	margin-bottom: 10px;
	border:1px solid #e5e9ef;
	resize: none;/*去掉右下角的三角*/
	outline: none;
}
.box{

}
.comment_item{
	width: 350px;
	height: 162px;
	padding: 20px;
	margin-right: 36px;
	background-color: #f4f5f7;
	overflow: hidden;
	display: inline-block;
	border-radius: 8px;
}
.comment_item:hover{
	z-index:2;
/*	-webkit-box-shadow:0 15px 30px rgba(0,0,0,0.1);
	box-shadow: 0 15px 30px rgba(0,0,0,0.1);*/
/*	-webkit-transform:translate3d(0,-3px,0);
	transform: translate3d(0,-3px,0);*/
	transform: scale(1.1);
	transition:all 0.4s;
	/*重要，	表示所有的属性变化在0.4s的时间段内完成*/
}
.comment-text{
	height: 90px;
	overflow: hidden;
}
.btn{
	
    color: rgb(127, 187, 255);
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    background-image: none;
    border: 1px solid grow;
    border-radius: 4px;
    outline: none;
}
  .btn:hover{
    background-color: #e6e6e6;
    /*重要，鼠标移上去变灰色*/
    border-color: #adadad;
  }
  .btn:active{
   -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125); 
    /*重要，点击后产生凹陷阴影  */
  }
  textarea:focus{
    box-shadow: 0 0 5px rgb(127, 187, 255);/*重要*/
    border-color:rgb(127, 187, 255);
/*输入框聚焦变色*/
  }


</style>