<!-- 用户个人信息详情页 -->
<template lang="html">
<div class="container">
		<div>
			<movie-index-header></movie-index-header>
		</div>

<div class="content">
			<div class="info">
				<div class="box">
					<h2>用户名：{{detail.username}}</h2>
				</div>

				<div class="box">
					<h2>邮箱：{{detail.userMail}}</h2>
				</div>

				<div class="box">
					<h2>电话：{{detail.userPhone}}</h2>
				</div>

				<div class="box">
					<h2>用户状态：{{userStatus}}</h2>
				</div>
			</div>



			<div>
				<button @click=ShowChangeUserPassword() class="btn">修改密码</button>
			</div>
			<div v-show="showRePassword">
				<div class="box1">
					<label>输入旧密码</label>
					<input v-model="password" class="edit" type="password" name="">
					<label>输入新密码</label>
					<input v-model="repassword" class="edit" type="password" name="">
					<button @click=changeUserPassword() class="btn">提交修改</button>
				</div>
			</div>
			 <el-divider></el-divider>
			<div>
				<router-link to="/sendEmail">
					<button class="btn">站内邮件</button>
				</router-link>
				<Icon type="ios-mail-open-outline" size="32" />

			</div>
	
</div>
	<common-footer></common-footer>

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
				repassword:'',


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
.container {

}
.content{
	min-height: 590px;
	margin:0 300px 0 300px;
}
.info{
	margin-top: 25px;
	margin-bottom: 20px;
}

.btn{
    color: rgb(127, 187, 255);
    display: inline-block;

    padding: 6px 8px;
    font-size: 8px;
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
  label {
  	display: block;
  	margin:4px;
  }
.edit{
	display: block;
    width:180px;
    height:35px;
    line-height: 35px;
    margin-top:5px;
    margin-bottom:5px;
    box-sizing: border-box;
    padding-left:4px;
    border-radius: 4px;
    border:1px solid #ccc;  /*重要*/
    outline:0;
    box-shadow: 0 0 5px #ccc;/*重要*/
}
  input:focus{
    box-shadow: 0 0 5px rgb(127, 187, 255);/*重要*/
    border-color:rgb(127, 187, 255);
/*输入框聚焦变色*/
  }


</style>