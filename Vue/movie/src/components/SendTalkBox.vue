<!-- 站内信对话框组件 -->
<template lang="html">
	<div>
		 <el-divider></el-divider>
		<h3>&nbsp发送站内信:</h3>

		<div class="edit-tools">
			<textarea  class="email-area" v-model="context" placeholder="信件内容"></textarea>
			<button class="btn" @click="send_mail">发送</button>
		</div>
		<div>
			<input class="edit" v-model="toUserName" placeholder="收信人" type="" name="">
		</div>
		<div>
			<input class="edit" v-model="title" placeholder="发送标题" type="" name="">
		</div>	
		<div>
			
		</div>	
	</div>
</template>

<script type="text/javascript">
import	VueResource from 'vue-resource'
	export default {
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
				this.$http.post('/users/sendEmail',send_data)
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
.btn{
	background-color: #00a1d6;
	width: 70px;
	height: 64px;
	vertical-align: top;
	margin-left: 20px;
    color: white;
    display: inline-block;
    padding: 6px 12px;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    background-image: none;
    border-radius: 6px;
    outline: none;
}
  .btn:hover{
    opacity: 0.8;
    /*重要，鼠标移上去变灰色*/
    border-color: #adadad;
  }
  .btn:active{
   -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125); 
    /*重要，点击后产生凹陷阴影  */
  }
  .email-area{
	width: 705px;
	height: 65px;
	padding: 5px 10px;
	border-radius: 5px;
	margin-top: 10px;
	display: inline-block;
	border:1px solid #e5e9ef;
	resize: none;/*去掉右下角的三角*/
	outline: none;
	vertical-align: top;
	background-color: #f4f5f7;
}
  textarea:focus{
    box-shadow: 0 0 5px rgb(127, 187, 255);/*重要*/
    border-color:rgb(127, 187, 255);
/*输入框聚焦变色*/
  }
.edit{
	margin-top: 10px;	
    display:block;
    width:60px;
    height:35px;
    line-height: 35px;
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