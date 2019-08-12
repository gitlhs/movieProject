<template lang="html">

	<div>
	<div>
		<movie-index-header></movie-index-header><!-- 展示引入的header组件 -->
	</div>
		<div class="form">
			<div class="box">
				<label>用户名</label>
				<input v-model="username" class="edit"  type="" name="">
			</div>

			<div class="box">
				<label>输入邮箱</label>
				<input v-model="userMail" class="edit"  type="" name="">
			</div>

			<div class="box">
				<label>输入手机号</label>
				<input v-model="userPhone" class="edit"   type="" name="">
			</div>

			<div class="box1">
				<button @click=checkUser() class="btn">找回密码</button>
			</div>
				<div v-show="showRePassword">
					<div class="box">
						<label>输入新密码</label>
						<input v-model="repassword" class="edit"  type="password" name="">
					</div>

					<div class="box1">
						<button @click=changeUserPassword() class="btn">修改密码</button>
					</div>
				</div>	
		</div>
		
	</div>


</template>

<script type="text/javascript">
import axios from 'axios'
//header组件
import MovieIndexHeader from '../components/MovieIndexHeader'
	export default {
		components:{
			MovieIndexHeader,
		},
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
				axios.post('/users/findPassword',{username:this.username,userMail:this.userMail,userPhone:this.userPhone})
				.then((data)=>{
					if(data.data.status==1){
						alert(data.data.message)
					}else{
						alert(data.data.message)
						this.showRePassword=true
						this.showUserInfo=false
						console.log(this.showRePassword)
					}
				})
			},
			changeUserPassword:function(event){
				axios.post('/users/findPassword',{
					username:this.username,userMail:this.userMail,userPhone:this.userMail,userPhone:this.userPhone,repassword:this.repassword
				})
				.then((res)=>{
					if(res.data.status==1){
						alert(res.data.message)
					}else{
						alert(res.data.message)
					}
				})
			},
		}
	}
</script>

<style type="text/css" scoped>
.box1{
margin:5px 0 20px 0;
}
.form{
	width: 300px;
/*	width: 25%;
	position: absolute;
	top:50px;
	right: 38%;*/
/*	display: flex;
	justify-content: center;
	align-items: center;*/
	padding-top: 80px;
	margin:0 auto;
}
label{
	position: relative;
	left: 20px;
}
.edit{
    display:block;
    width:260px;
    height:35px;
    line-height: 35px;
    margin:10px auto;
    box-sizing: border-box;
    padding-left:4px;
    border-radius: 4px;
    border:1px solid #ccc;  /*重要*/
    outline:0;
    box-shadow: 0 0 5px #ccc;/*重要*/
}

.btn{
	margin:8px 38px;
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
  btn:active{
   -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125); 
    /*重要，点击后产生凹陷阴影  */
  }
  input:focus{
    box-shadow: 0 0 5px rgb(127, 187, 255);/*重要*/
    border-color:rgb(127, 187, 255);
/*输入框聚焦变色*/
  }
  label{
  	margin-left: 5px
  }
</style>