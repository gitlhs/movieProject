<!-- 站内信对话框组件 -->
<template lang="html">
	<div>
		<div>
			<input v-model="toUserName" placeholder="发送用户名" type="" name="">
		</div>
		<div>
			<input v-model="title" placeholder="发送标题" type="" name="">
			<div><textarea v-model="context" placeholder="内容"></textarea></div>
		</div>	
		<div>
			<button @click="send_mail">发送站内信</button>
		</div>	
	</div>
</template>

<script type="text/javascript">
import	VueResource from 'vue-resource'
	export default {
		props:[],
		data(){
			return{
				toUserName:'',
				context:'',
				title:''
			}
		},
		methods:{
			send_mail(event){
				let send_data={
					token:localStorage.token,
					user_id:localStorage._id,
					toUserName:this.toUserName,
					title:this.title,
					context:this.context
				}
				this.$http.post('http://localhost:3000/users/sendEmail',send_data)
				.then((data)=>{
					if(data.body.status==1){
						alert(data.body.message)
					}else{
						alert('发送成功')
					}
				})
			}
		}
	}
</script>

<style type="text/css" scoped>
.headerPic{

}
.headerImg{
	
}
.imgTitle{
	
}
</style>