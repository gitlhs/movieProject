<!-- [HMR] Waiting for update signal from WDS... -->
<!-- ajax请求api:/users/showEmail -->
<template lang="html">
<div class="container">
	<div>
		<movie-index-header></movie-index-header>
	</div>

	<div class="content">


			<h3>我发送的信件:</h3>
			<div class="message-box">
				<email-list v-for="item in receive_items" :title="item.title" :fromUser="item.fromUser" :context="item.context"></email-list>
			</div>
			<br>
			<h3>我收到的信件:</h3>
			<div class="edit-message">
				<email-list v-for="item in send_items" :title="item.title" :fromUser="item.fromUser" :context="item.context"></email-list>
			</div>
			<send-talk-box></send-talk-box>
	</div>

<!-- 	<common-footer></common-footer> -->
</div>
</template>

<script>
import axios from 'axios'
import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/CommonFooter'
import UserMessage from '../components/UserMessage'
import EmailList from '../components/EmailList'
import SendTalkBox from '../components/SendTalkBox'
import MoviesList from '../components/MoviesList'

export default {
	data(){
		return{
			receive_items:[],
			send_items:[],
			detail:[]
		}
	},
	components:{
		MovieIndexHeader,
		CommonFooter,
		UserMessage,
		EmailList,
		SendTalkBox
	},
	created(){
		let userId=localStorage._id

		let send_data={
			token:localStorage.token,
			user_id:localStorage._id,
			receive:0
		}
		let receive_data={
			token:localStorage.token,
			user_id:localStorage._id,
			receive:1
		}
		if(userId){
			axios.post('/users/showEmail',send_data)
			.then((data)=>{
				if(data.data.status==1){
					// alert(data.body.message)
				}else{
					this.send_items=data.data.data;
				}
				console.log(data.data.data)
			})
			axios.post('/users/showEmail',receive_data)
			.then((data)=>{
				if(data.data.status==1){
					// alert(data.body.message)
				}else{
					this.receive_items=data.data.data;
				}
				console.log(data.data.data)
			})
		}else{
			alert("请先登录 ")
		}
	},

}
</script>

<style lang="css" scoped>
.box {

}
.content {
	min-height: 590px;

	width: 1143px;
	margin:0 auto;
	margin-top: 30px;
}
.message-box{

}
.message{
	width: 360px;
	height: 162px;
	padding: 20px;
	margin:20px 20px 0 0;
	background-color: #f4f5f7;
	overflow: hidden;
	display: inline-block;
	border-radius: 8px;
	border:1px solid #e5e9ef;
}
.message:hover{
	z-index:2;
/*	-webkit-box-shadow:0 15px 30px rgba(0,0,0,0.1);
	box-shadow: 0 15px 30px rgba(0,0,0,0.1);*/
/*	-webkit-transform:translate3d(0,-3px,0);
	transform: translate3d(0,-3px,0);*/
	transform: scale(1.1);
	transition:all 0.4s;
	/*重要，	表示所有的属性变化在0.4s的时间段内完成*/
}


</style>











