<template>
	<div id=''><p>提问：<input v-model="question" type="" name=""></p><p>{{answer}}</p></div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			question:'',
			answer:'你还没有问人家问题哦～'
		}
	},
	watch:{
		question:function(){

			this.getAnswer()
		}
	},
	mothods:{
		getAnswer:function(){
			if(this.question.indexOf('? ') !== -1){
				this.answer = '思考中...'
				let that = this
				axios.post('http://robottest.uneedzf.com/api/talk2Robot',{
					token:'6921ce8f9f28a9f038ff478e1433c19b',message:that.question
				}).then(function(response){
					if(res.data.code === 0){
						that.answer = res.data.data
					}else{
						that.answer = res.data.message
					}
				})
			}else{
				this.answer = '一个问题一般由一个？结尾哦'
				return 0;
			}
		}
	}

}
</script>
<style type="text/css"></style>