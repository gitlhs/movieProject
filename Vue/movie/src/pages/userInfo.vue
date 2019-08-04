<!-- 用户个人信息详情页 -->
<template lang="html">
<div class="container">
		<div>
			<movie-index-header></movie-index-header>
		</div>
	<div class="content">
		登录状态：
		<div class="userMessage">
			<user-message></user-message>
		</div>


		<div>
			<div class="box">
			<label>用户名：</label>
			</div>
		</div>

		<div>
			<div class="box">
			<label>邮箱：</label>
			</div>
		</div>

		<div>
			<div class="box">
			<label>电话：</label>
			</div>
		</div>
		<div>
			<div class="box">
				用户状态：正常/封号
			</div>
		</div>
		<div>
			<button>修改密码</button>
		</div>
		<hr>
		<div>
			<router-link to="/sendEmail">
				<button>发送站内信</button>
			</router-link>

		</div>



		<div style="display:none">

			<div class="box">
				<label>输入旧密码</label>
				<input placeholder="输入旧密码" type="" name="">
			</div>

			<div class="box">
				<label>输入新密码</label>
				<input placeholder="输入旧密码" type="" name="">
			</div>

			<div class="box">
				<button>修改密码</button>
			</div>

		</div>

	</div>

	<div>
	<common-footer></common-footer>
	</div>
</div>

</template>


<script type="text/javascript">

import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/CommonFooter'
import UserMessage from '../components/UserMessage'

	export default {
		data(){
			return{

			}
		},
		components:{
			MovieIndexHeader,
			CommonFooter,
			UserMessage
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