<template lang="html">
<div class="loginPage">
	<div>
		<movie-index-header></movie-index-header><!-- 展示引入的header组件 -->
	</div>
	<div>
		<div class="btn_box">
			<div class="form">
						<label>用户名：</label>
						<input v-model="username" class="edit" type="" name="">

						<label>密码：</label> 
						<input v-model="password" class="edit" type="password" name="">
					
						<div class="box">
							<button v-on:click=userLogin() class="btn">登录</button>
							<button v-on:click=userRegister() class="btn">注册</button>
							<a @click=findBackPassword() href="#">忘记密码</a>
							<!-- ！！！链接的href不能乱填，填为空也会自动导向主页 -->
						</div>
			</div>
		</div>
	</div>
</div>

</template>

<script type="text/javascript">
//header组件
import MovieIndexHeader from '../components/MovieIndexHeader'
import VueResource from 'vue-resource'
	export default {
		data(){
			return{
				username:'',
				password:''
			}
		},
		components:{
			MovieIndexHeader,
		},
		methods:{
			userLogin:function(event){
				this.$http.post('http://localhost:3000/users/login',{
					username:this.username,password:this.password
				})
				.then((data)=>{
					if(data.body.status==1){
						alert(data.body.message)
					}else{
						let save_token={
							token:data.body.data.token,
							username:this.username
						}
						localStorage.setItem('token',data.body.data.token);
						localStorage.setItem('username',data.body.data.user[0].username);
						localStorage.setItem('_id',data.body.data.user[0]._id);
						this.$router.replace('/')
					}
				})
			},
			userRegister:function(event){
				this.$router.push({path:'register'})
			},
			findBackPassword:function(event){
				this.$router.push({path:'findPassword'})
			}
		}
	}
</script>

<style type="text/css" scoped>
.form{
	margin-top: 100px;
	width: 300px;
	
}
.loginPage{
/*position: absolute;
top:150px;
left:38%*/
/*display: flex;
justify-content: center;
align-items: center;
padding-top: 100px;*/
}
label{
	position: relative;
	left: 12px;
}
.edit{
    display:block;
    width:280px;
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
  input:focus{
    box-shadow: 0 0 5px rgb(127, 187, 255);/*重要*/
    border-color:rgb(127, 187, 255);
/*输入框聚焦变色*/
  }
.btn_box{
	width: 300px;
	margin:30px auto;
}
.btn{
	margin:8px 20px;
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
  label{
  	margin-left: 1px
  }
</style>