<!-- 用户个人信息详情页 -->
<template lang="html">
<div class="container">
		<div>
			<movie-index-header></movie-index-header>
		</div>
	<div class="content">
		
		<div class="userMessage">
			<user-message></user-message>
		</div>


		<div>
			<div class="box">
			<label>用户名：{{detail.username}}</label>
			</div>
		</div>

		<div>
			<div class="box">
			<label>邮箱：{{detail.userMail}}</label>
			</div>
		</div>

		<div>
			<div class="box">
			<label>电话：{{detail.userPhone}}</label>
			</div>
		</div>
		<div>
			<div class="box">
				用户状态：{{userStatus}}
			</div>
		</div>
		<div>
			<button @click=ShowChangeUserPassword()>修改密码</button>
		</div>
		<hr>
		<div>
			<router-link to="/sendEmail">
				<button>发送站内信</button>
			</router-link>

		</div>



		<div v-show="showRePassword">

			<div class="box">
				<label>输入旧密码</label>
				<input v-model="password" placeholder="输入旧密码" type="password" name="">
			</div>

			<div class="box">
				<label>输入新密码</label>
				<input v-model="repassword" placeholder="输入旧密码" type="password" name="">
			</div>

			<div class="box">
				<button @click=changeUserPassword()>修改密码</button>
			</div>

		</div>

	</div>

	<div>
	<common-footer></common-footer>
	</div>
</div>

</template>


<script type="text/javascript">
import VueResource from 'vue-resource'

import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/CommonFooter'
import UserMessage from '../components/UserMessage'

	export default {
		data(){
			return{
				items:[],
				detail:[],
				userStatus:'',
				showRePassword:false,
				password:'',
				repassword:''
			}
		},
		components:{
			MovieIndexHeader,
			CommonFooter,
			UserMessage
		},
		created(){
			let userId=this.$route.query.id
			if(userId){
				this.$http.post('http://localhost:3000/showUser',{user_id:userId})
				.then((data)=>{
					if(data.body.status==1){
						alert(data.body.message)
					}else{
						this.detail=data.body.data;
						if(data.body.data.userStop){
							this.userStatus="用户已经被封停"
						}else{
							this.userStatus="用户状态正常"
						}
					}
					console.log(data.body.data)
				})
			}else{
				alert('用户信息错误')
			}
		},
		methods:{
			//在登录状态修改密码
			ShowChangeUserPassword(event){
				this.showRePassword=true
			},
			changeUserPassword(event){
				let token=localStorage.token
				let user_id=localStorage._d
				this.$http.post('http://localhost:3000/users/findPassword',{
					token:token,user_id:user_id,repassword:this.repassword,password:this.password
				})
				.then((data)=>{
					if(data.body.status==1){
						alert(data.body.message)
					}else{
						alert(data.body.message)
						// this.$router.go(-1)
					}
				})
			},
		}
	}
</script>

<style type="text/css" scoped>
.box{
	display: inline-flex;
}
.container {
	width: 100%;
	margin:0 auto;
}
.content {
	width:1160px;
	margin:0 auto;
}



</style>