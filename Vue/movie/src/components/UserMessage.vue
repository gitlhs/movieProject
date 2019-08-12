<!-- 用户登录组件 -->
<template lang="html">
	<div v-if=!isLogin class="header">

				<router-link to="/loginPage">

					<span class="header_menu" ><i class="el-icon-s-custom"></i>请登录</span><!-- 用户未登录时显示登录按钮 -->
				</router-link>

	</div>

	<div v-else class="header header2">

				
				<router-link :to="{path:'/userInfo',query:{id:id}}">
				<span class="header_menu menu2" style="color:white">
					您好：{{username}}</span>
				</router-link>
				<button @click=logout() class="logout" >退出</button>

	</div>
</template>	

<script type="text/javascript">
	export default {
		data(){
			return {
				isLogin:false,
				username:''
			}
		},
		created(){
			let token=localStorage.getItem('token')
			if(token){
				this.isLogin=true
				this.username=localStorage.getItem('username')
				this.id=localStorage.getItem('_id')
			}else{
				console.log('用户登录失败');//跳转信息或者返回错误信息
			}
		},
		methods:{
			logout:function(event){
				window.localStorage.clear();
				// window.localStorage.removeItem("token");
				// this.$router.replace('/');
				// this.$router.go(-1)

    			// this.$router.push("/index")
    			window.location.href="/"
				
			}
		}
	}
</script>

<style type="text/css" scoped>
.el-icon-s-custom{
	font-size: 25px;
	vertical-align: middle;
}
.header{
display: inline-block;
/*float: right;
position: relative;
right: 130px;
bottom: 50px;*/
background-color: transparent;
float: right;
margin-right: 10px;
margin-top: 19px;
}
/*.header[data-v-10089542]{
	background-color: transparent;
}*/
.header_menu{
	color: white;
	font-size: 14px;
}
.header2{
	margin-top:16px;

}
.logout{
	margin-left: 10px;
	padding:4px 6px 4px 6px;
}
a{
	color: transparent!important;
	text-decoration: none;
}
.logout{

    display: inline-block;

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
    border-radius: 5px;
    outline: none;
}
  .logout:hover{
    background-color: #e6e6e6;/*重要，鼠标移上去变灰色*/
    border-color: #adadad;
  }
  .logout:active{
   -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125); /*重要，点击后产生凹陷阴影  */
  }
</style>