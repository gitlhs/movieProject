<template lang="html">
<div>
	<div>
		
			<div class="box">
				<label>用户名</label>
				<input v-model="username" placeholder="用户名" type="" name="">
			</div>

			<div class="box">
				<label>输入邮箱</label>
				<input v-model="userMail" placeholder="邮箱" type="" name="">
			</div>

			<div class="box">
				<label>输入手机号</label>
				<input v-model="userPhone" placeholder="手机号" type="" name="">
			</div>

			<div class="box">
				<button @click=checkUser()>找回密码</button>
			</div>

			<div class="box">
				<label>输入新密码</label>
				<input v-model="repassword" placeholder="输入新密码" type="password" name="">
			</div>

			<div class="box">
				<button @click=changeUserPassword()>修改密码</button>
			</div>

		
	</div>
</div>

</template>

<script type="text/javascript">
import VueResource from 'vue-resource'
	export default {
		data(){
			return{
				userMail:'',
				userPhone:'',
				username:'',
				repassword:'',
				showRePassword:false,
				showUserInfo:true
			}
		},
		methods:{
			checkUser:function(event){
				this.$http.post('http://localhost:3000/users/findPassword',{username:this.username,userMail:this.userMail,userPhone:this.userPhone})
				.then((data)=>{
					if(data.body.status==1){
						alert(data.body.message)
					}else{
						alert(data.body.message)
						this.showRePassword=true
						this.showUserInfo=false
						console.log(this.showRePassword)
					}
				})
			},
			changeUserPassword:function(event){
				this.$http.post('http://localhost:3000/users/findPassword',{
					username:this.username,userMail:this.userMail,userPhone:this.userMail,userPhone:this.userPhone,repassword:this.repassword
				})
				.then((data)=>{
					if(data.body.status==1){
						alert(data.body.message)
					}else{
						alert(data.body.message)
					}
				})
			},
		}
	}
</script>

<style type="text/css" scoped>
.box{

}
</style>